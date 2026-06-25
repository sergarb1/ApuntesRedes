---
title: Boletín U11 — Inicial (Resuelto)
description: Soluciones ejercicios básicos de Diagnóstico y monitorización
---

# ✅ Boletín U11 — Inicial (Resuelto)

---

## 1. Metodología de troubleshooting

Orden correcto (OSI de abajo arriba):
1. (2) Comprobar que el cable está conectado (Capa 1)
2. (3) Comprobar la tabla MAC del switch (Capa 2)
3. (1) Hacer ping al gateway (Capa 3)
4. (4) Hacer ping a 8.8.8.8 (Capa 3)
5. (5) Hacer nslookup del dominio (Capa 7)

## 2. Comandos de diagnóstico

| Comando | Función |
|---|---|
| ping | **B** — Prueba conectividad básica |
| traceroute | **A** — Muestra la ruta hasta un destino |
| nslookup | **D** — Resuelve nombres DNS |
| Wireshark | **C** — Captura paquetes en tiempo real |
| netstat | **E** — Muestra conexiones activas |

## 3. Interpreta un ping

a) **Sí.** Hay conectividad completa.
b) **Buena.** 14-16 ms es latencia excelente para Internet.
c) **TTL=117** significa que el paquete ha pasado por varios routers (TTL inicial típico 128 - 11 routers = 117).

## 4. Configura SNMP

```bash
R1(config)# snmp-server community monitor ro
R1(config)# snmp-server community admin rw
R1(config)# snmp-server location SalaServidores
R1(config)# snmp-server enable traps
R1(config)# snmp-server host 192.168.1.100 traps version 2c monitor
```

## 5. Verdadero o falso

a) **Verdadero.** SNMP v3 usa cifrado AES y autenticación SHA.
b) **Falso.** Wireshark funciona en Windows, Linux, macOS.
c) **Falso.** Si ping al gateway funciona, la LAN está bien. Si ping a 8.8.8.8 falla, el problema está más allá del gateway (WAN, ISP).
d) **Falso.** Nivel 0 (Emergency) es el más grave. Nivel 7 (Debug) es el menos grave.

## 6. Análisis de traceroute

a) **4 saltos** (el destino está en el salto 4).
b) **El router en el salto 3 no responde a ICMP.** Puede ser un firewall que bloquea ICMP, pero eso no significa que no esté funcionando (el salto 4 responde).
c) **Sí**, el destino final responde en el salto 4.
