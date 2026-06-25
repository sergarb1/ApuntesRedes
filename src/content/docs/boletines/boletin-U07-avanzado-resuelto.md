---
title: Boletín U07 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de VLANs
---

# ✅ Boletín U07 — Avanzado (Resuelto)

---

## 1. Configuración completa de VLANs

**Switch1:**
```bash
Switch1(config)# vlan 10
Switch1(config-vlan)# name Ventas
Switch1(config)# vlan 20
Switch1(config-vlan)# name RRHH
Switch1(config)# interface range fa0/1-5
Switch1(config-if-range)# switchport mode access
Switch1(config-if-range)# switchport access vlan 10
Switch1(config)# interface range fa0/6-10
Switch1(config-if-range)# switchport mode access
Switch1(config-if-range)# switchport access vlan 20
Switch1(config)# interface fa0/24
Switch1(config-if)# switchport mode trunk
```

**Switch2:** (configuración similar con los mismos VLAN IDs)

**Router:**
```bash
Router(config)# interface fa0/0
Router(config-if)# no shutdown
Router(config)# interface fa0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
Router(config)# interface fa0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0
```

## 2. Diagnóstico de native VLAN

a) **Problemas:** Las tramas sin etiquetar de VLAN nativa se interpretan en la VLAN equivocada en el otro extremo. Esto causa:
   - Tráfico de control (CDP, VTP) no funciona correctamente
   - Posibles problemas de conectividad en la native VLAN
   - Mensajes de error en el log: "native VLAN mismatch"

b) **Diagnóstico:** `show interface trunk` en ambos switches. Muestra la native VLAN de cada extremo y si hay discrepancia.

c) **Arreglo:** Configurar la misma native VLAN en ambos extremos:
   - Elegir una (ej. 99) y configurarla en ambos:
   ```bash
   Switch2(config-if)# switchport trunk native vlan 99
   ```
   **Sin pérdida de conectividad:** El cambio es inmediato. La native VLAN solo afecta a tramas sin etiquetar. Las VLANs etiquetadas (10,20,30) no se ven afectadas.

## 3. Diseño de VLANs corporativas

a) **Tabla de VLANs:**
   | VLAN | Nombre | Puertos |
   |------|--------|---------|
   | 10 | Recepción | Planta baja 1-5 |
   | 20 | Servidores | Planta baja 6-15 |
   | 30 | Ventas | Planta 1, puertos 1-30 |
   | 40 | Marketing | Planta 1, puertos 31-45 |
   | 50 | IT | Planta 2, puertos 1-20 |
   | 60 | Dirección | Planta 2, puertos 21-25 |

b) **Router-on-a-stick:** En la planta baja, cerca de los servidores. Alternativa: switch capa 3 como core en la sala de servidores, haciendo routing entre VLANs internamente.

c) **VLANs en trunks:** Todas (10,20,30,40,50,60). IT necesita acceso a todas, y las VLANs deben comunicarse.

d) **ACLs para limitar Dirección:**
   ```bash
   access-list 101 permit ip 192.168.60.0 0.0.0.255 192.168.20.0 0.0.0.255
   access-list 101 deny ip 192.168.60.0 0.0.0.255 any
   ```
   Aplicar en la subinterfaz de VLAN 60.

## 4. VTP disaster recovery

a) **Por qué:** VTP propaga la base de datos del switch con mayor **revision number**. El switch nuevo (rev 500) tiene número más alto que el server actual (rev 100). Al propagar su base de datos (posiblemente vacía), todas las VLANs se borran en la red.

b) **Recuperación:**
   1. Desconectar el switch problemático inmediatamente
   2. Reconfigurar VLANs manualmente en cada switch (o restaurar backup)
   3. Cambiar los switches a VTP transparent para evitar futuros incidentes

c) **Medidas preventivas:**
   - Usar **VTP transparent** (no propaga cambios)
   - En VTPv3, configurar contraseña y modo "off"
   - Siempre verificar el revision number antes de conectar un switch
   - Documentar la base de datos de VLANs

## 5. Router-on-a-stick: cuello de botella

a) **Cálculo:** 4 VLANs × 30 Mbps = **120 Mbps**. La interfaz FastEthernet (100 Mbps) NO puede manejar 120 Mbps. **Sí hay cuello de botella.**

b) **Alternativas:**
   - Usar interfaz **GigabitEthernet** (1000 Mbps) → 120/1000 = 12% de uso, sin cuello
   - Usar **switch capa 3** con SVIs (routing interno a velocidad de hardware)
   - Dividir el tráfico en dos interfaces del router (si tiene dos)

c) **Con GigabitEthernet:** 120 Mbps sobre 1000 Mbps = 12% de uso. Sin cuello de botella.

## 6. Seguridad en VLANs

| Riesgo | Mitigación |
|---|---|
| 1. **VLAN Hopping** (salto de VLAN): atacante negocia un trunk mediante DTP y accede a todas las VLANs | Deshabilitar DTP (`switchport nonegotiate`), configurar puertos no utilizados como access y deshabilitarlos (`shutdown`) |
| 2. **Native VLAN attack:** tráfico en native VLAN puede ser redirigido a otra VLAN si hay discrepancia | Usar una native VLAN diferente en ambos extremos del trunk (nunca VLAN 1) |
| 3. **Double tagging:** atacante envía trama con dos etiquetas 802.1Q, la primera la quita el switch y la segunda llega a otra VLAN | No usar native VLAN para datos, usar VLANs específicas para trunks, segmentar físicamente |
