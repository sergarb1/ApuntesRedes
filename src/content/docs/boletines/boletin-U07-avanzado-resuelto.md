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
Switch1(config-if)# switchport trunk native vlan 99
Switch1(config-if)# switchport trunk allowed vlan 10,20
```

**Switch2:** (configuración similar: mismas VLANs, mismos puertos access 1-5 → 10 y 6-10 → 20, y el mismo trunk en Fa0/24 con native 99 y `allowed vlan 10,20`).

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

a) **Problemas:** las tramas sin etiquetar (de la VLAN nativa, incluyendo tráfico de control CDP/VTP/DTP y datos de esa VLAN) se interpretan en la VLAN equivocada en el otro extremo.
   - Tráfico de control (CDP, VTP) no funciona correctamente entre switches.
   - Posibles problemas de conectividad en la native VLAN (va y viene a ratos).
   - Mensajes de error en el log de ambos switches: *"Native VLAN mismatch discovered on Fa0/24"*.

b) **Diagnóstico:** `show interfaces trunk` en ambos switches. Muestra la native VLAN de cada extremo y reporta directamente el mismatch.

c) **Arreglo sin pérdida:** configurar la **misma native VLAN en ambos extremos** — elegir un número (ej. 99) y ponerlo en ambos:
   ```bash
   Switch2(config-if)# switchport trunk native vlan 99
   ```
   El cambio es **inmediato**: la native VLAN solo afecta a tramas sin etiquetar. Las VLANs etiquetadas (10, 20, 30) no sufren interrupción durante el cambio.

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

b) **Router-on-a-stick:** en la planta baja, cerca de los servidores, conectado por un trunk a un puerto del core (puede enrutar todas las VLANs con subinterfaces). **Alternativa:** switch capa 3 como core en la sala de servidores, haciendo routing entre VLANs internamente con SVIs (se elimina el cuello de botella del router).

c) **VLANs en trunks:** todas (10, 20, 30, 40, 50, 60) en los trunks del core, con **native VLAN cambiada** (ej. 999) y **`allowed vlan`** cubriendo todas. IT necesita acceso a todas las VLANs para administrar.

d) **ACLs para limitar Dirección** (se aplican en la subinterfaz del router de la VLAN 60):
   ```bash
   access-list 101 permit ip 192.168.60.0 0.0.0.255 192.168.20.0 0.0.0.255
   access-list 101 deny ip 192.168.60.0 0.0.0.255 any
   ```
   Aplicar con `ip access-group 101 in` en la subinterfaz `Fa0/0.60`. (Detalles finos de ACLs en la U08.)

## 4. VTP disaster recovery

a) **Por qué:** VTP propaga la base de datos del switch con mayor **revision number**. El switch nuevo (rev 500) tiene número más alto que el server actual (rev 100). Al propagar su base de datos (posiblemente vacía), todas las VLANs se borran en la red. Basta un trunk para que el anuncio llegue a todos.

b) **Recuperación:**
   1. **Desconectar el switch problemático inmediatamente** (cable del trunk) para frenar la propagación.
   2. Reconfigurar las VLANs manualmente en cada switch (o restaurar un backup de la config).
   3. Cambiar los switches a **VTP transparent** (o VTPv3 mode off) para que ningún switch pueda volver a hacer esto.

c) **Medidas preventivas:**
   - Usar **VTP transparent** o **VTPv3 mode off** (no propaga ni procesa anuncios).
   - Verificar el **revision number** (`show vtp status`) de todo switch antes de enchufarlo.
   - **Resetear** la base de datos de cualquier equipo usado: `delete flash:vlan.dat` y reiniciar, antes de conectarlo.
   - Documentar la base de datos de VLANs (la config es tu backup).

## 5. Router-on-a-stick: cuello de botella

a) **Cálculo:** 4 VLANs × 30 Mbps = **120 Mbps**. La interfaz FastEthernet (100 Mbps) NO puede manejar 120 Mbps. **Sí hay cuello de botella** (pérdidas y saturación).

b) **Alternativas:**
   - **Interfaz GigabitEthernet** (1000 Mbps) → 120 Mbps es apenas el 12 % de capacidad.
   - **Switch capa 3 con SVIs** → routing en hardware interno, sin interfaz única de salida.
   - Dividir las VLANs entre **dos interfaces físicas** del router (proporcional al tráfico).

c) **Con GigabitEthernet:** 120 Mbps sobre 1000 Mbps = **12 % de uso**, sin cuello de botella. Si el tráfico se duplica (240 Mbps), seguimos al 24 %: holgado.

## 6. Seguridad en VLANs

| Riesgo | Mitigación |
|---|---|
| 1. **VLAN Hopping por DTP**: el atacante negocia un trunk (`dynamic desirable`) y recibe todas las VLANs | `switchport mode access` + `switchport nonegotiate`; puertos libres con `shutdown` |
| 2. **Double tagging en la native VLAN**: el atacante manda una trama con doble etiqueta 802.1Q y la segunda etiqueta llega a otra VLAN | Native VLAN **≠ 1** y **sin datos en la native**; segmentar físicamente zonas sensibles |
| 3. **VTP como arma**: un switch con revision number mayor anuncia su base de datos (vacía) y borra VLANs | VTP transparent / VTPv3 off, verificar `show vtp status` antes de conectar equipo |

## 7. VLAN hopping y hardening

a) **Tres vectores de ataque:**
   1. **Negociación de trunk por DTP:** un portátil conectado a un puerto en modo `dynamic desirable` (o `dynamic auto` si el portátil pide) tramita el protocolo DTP y consigue que el puerto se convierta en **trunk**. A partir de ahí, todas las VLANs que cruzan el trunk quedan a su alcance.
   2. **Double tagging:** el atacante envía una trama con **dos etiquetas 802.1Q** (a menudo con la native VLAN). El primer switch elimina la primera etiqueta (la trata como native) y la reenvía por el trunk; el segundo switch ve la segunda etiqueta y la entrega en la **VLAN objetivo**. El atacante nunca llega a ser trunk ni a hablar directamente: salta a la VLAN objetivo de forma encubierta.
   3. **Tráfico mislabeled / native VLAN vulnerable:** si la native VLAN transporta datos y es la VLAN 1, todo el tráfico sin etiquetar (o mal etiquetado) acaba en la VLAN por defecto, donde pueden mezclarse con otras VLANs mal configuradas (o con el double tagging del vector anterior gratuitamente).

b) **Tres mitigaciones concretas:**
   1. **Apagar DTP en puertos de usuario:** `switchport mode access` + `switchport nonegotiate` (y `shutdown` en los puertos no usados) → el atacante no puede negociar un trunk.
   2. **Cambiar la native VLAN y no usarla para datos:** `switchport trunk native vlan 99` (o 999) en TODOS los trunks, y usar VLANs de datos distintas de la native → el double tagging pierde su puerta de entrada.
   3. **Limitar y segmentar:** `switchport trunk allowed vlan 10,20,30` para restringir qué VLANs cruzan cada trunk, y **VTP transparent / VTPv3 off** para que un switch rogue no arrase la base de datos.

## 8. Inter-VLAN con SVI paso a paso

**(Se asume que los puertos access de las VLANs 10/20/30 ya están asignados.)**

a) **Creación de VLANs:**
```bash
Switch(config)# vlan 10
Switch(config-vlan)# name Ventas
Switch(config)# vlan 20
Switch(config-vlan)# name RRHH
Switch(config)# vlan 30
Switch(config-vlan)# name IT
```

b) **Activar el routing global:**
```bash
Switch(config)# ip routing
```

c) **SVIs (uno por VLAN):**
```bash
Switch(config)# interface vlan 10
Switch(config-if)# ip address 192.168.10.1 255.255.255.0
Switch(config-if)# no shutdown

Switch(config)# interface vlan 20
Switch(config-if)# ip address 192.168.20.1 255.255.255.0
Switch(config-if)# no shutdown

Switch(config)# interface vlan 30
Switch(config-if)# ip address 192.168.30.1 255.255.255.0
Switch(config-if)# no shutdown
```

d) **Gateway de cada PC:**

| VLAN | Subred | Gateway (IP del SVI) |
|---|---|---|
| 10 Ventas | 192.168.10.0/24 | 192.168.10.1 |
| 20 RRHH | 192.168.20.0/24 | 192.168.20.1 |
| 30 IT | 192.168.30.0/24 | 192.168.30.1 |

**Verificación:** comprueba que el SVI esté Up/Up (`show ip interface brief`), revisa que las VLANs existan en `show vlan brief` y prueba la conectividad con `ping` entre SVIs (ej. desde el SVI 10 contra 192.168.20.1). Si los SVIs están Up/Up pero no enrutan, el culpable es el comando `ip routing` olvidado.