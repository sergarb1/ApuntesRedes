---
title: Boletín de Capa de enlace y trama Ethernet — Avanzado (Resuelto)
description: Soluciones de los ejercicios avanzados de MAC, trama, encapsulación y diagnóstico
---

# 💪 Boletín de Capa de enlace y trama Ethernet — Avanzado (Resuelto)

---

## 1. Lectura de bits: ¿qué MAC es esta?

a) `02` = `00000010`: el primer bit (más significativo, bit I/G) es **0** → **unicast**.
b) El segundo bit (U/L) es **1** → **administrada localmente** (alguien la ha cambiado).
c) Binario: `0000 0010` → I/G = 0 (individual, una sola tarjeta) · U/L = 1 (local). Una MAC `02:…` es lo típico de una interfaz con spoofing activo.

## 2. La trama en hex

a) Destino `ff:ff:ff:ff:ff:ff` → **broadcast**: la reciben todas las tarjetas de la LAN.
b) Origen `00:1a:2b:…` → el OUI `00:1A:2B` corresponde al fabricante de esa tarjeta (según IEEE).
c) EtherType **`08 06` = ARP** (0x0806). Quien pregunta es el emisor (necesita una MAC); **responderá** quien tenga la IP consultada, en **unicast** hacia el emisor.

## 3. Diagnóstico por capas (OSI en acción)

- **Síntoma A — Capa 2 (trama), con posible raíz en capa 1.** El FCS erróneo lo detecta la capa 2, pero casi siempre la causa es física: señal marginal (atenuación, diafonía, EMI, crimpado flojo) que el tester de continuidad no mide. Herramientas: cable de prueba conocido, revisión del tramo, certificador de categoría; Wireshark para contar errores. **El tester al 100% NO descarta la capa 1:** solo mide continuidad, no calidad de señal.
- **Síntoma B — Capa 1 (física).** LED apagado = no hay enlace: sin negociación no hay bits. Revisa cable, conector, puerto y NIC.
- **Síntoma C — Capa 2 (dirección).** Dos equipos con la misma MAC: el switch no distingue a quién mandar (la tabla salta entre puertos). Herramienta: tabla MAC del switch (`show mac address-table`) + `ipconfig /all` / `ip link` en cada PC. Solución: quitar el clonado.

> 💡 **Clave de examen:** si no hay LED, ni mires Wireshark: capa 1. Y si hay LED, el tester pasa pero aparecen FCS erróneos o MACs duplicadas, el problema es de la trama (capa 2).

## 4. El viaje con sus MACs

| Tramo | MAC origen → destino | IP origen → destino |
|---|---|---|
| PC → router | `AAAA…01` → `BBBB…01` | `10.0.0.5` → `93.184.216.34` |
| Router → ISP | `BBBB…02` → MAC del siguiente salto | `10.0.0.5` → `93.184.216.34` |

a) **Nunca.** La trama solo existe dentro de tu LAN: en cuanto sale del router, se rehace con otras MACs. El servidor solo ve la IP de origen, no tu MAC.
b) **ARP** (request broadcast: «¿quién tiene 192.168.1.1?» → reply unicast con su MAC).

## 5. Matemáticas de la trama

a) 14 (cabecera) + 100 (payload) + 4 (FCS) = **118 bytes**.
b) **Dos tramas** (1500 + 100). El **payload máximo de la trama es 1500 bytes** (MTU); lo que pasa de eso no cabe en una trama.
c) La **fragmentación de IP** (capa 3): si el paquete supera la MTU del enlace, el router lo parte en fragmentos. (Los routers de hoy evitan el clásico Path MTU Discovery bloqueado… y las redes IPv6 ya no fragmentan: avísalo con ICMPv6.)

## 6. Caso de laboratorio: el gateway que no responde

a) Quedan descartados: tu PC, el cable, el switch y la PC `192.168.1.60` (la LAN funciona). Siguen en pie: el router (`192.168.1.1`), su enlace hacia el ISP y lo que hay más allá.
b) **`arp -a`** (Windows/Linux): muestra la tabla IP ↔ MAC; para `192.168.1.1` debes ver la MAC del router.
c) Esperas **la MAC real del router** en la interfaz LAN. Si la tabla muestra `00:00:00:00:00:00` (o no hay entrada), **no se pudo completar el ARP**: sin MAC del gateway no hay trama hacia fuera, y por eso no sale nada aunque tu IP esté bien. Suele ser: gateway mal escrito en la IP, interfaz mal, o el router apagado.

## 7. 802.3 vs 802.11 en la práctica

a) **802.11** — la trama WiFi es la única de capa 2 que puede llevar hasta 4 direcciones (receptor, transmisor, receptor final, transmisor final).
b) **En el AP**, en la frontera con la LAN cableada: descifra la trama 802.11 y la reenvía como trama Ethernet (o la vuelve a cifrar si el destino también está en WiFi).
c) Porque el EtherType va **dentro de la trama**, y los dos estándares son **capa 2** con entregas locales equivalentes: arriba, la capa 3 recibe siempre "un paquete IPv4" sin importar si viajó por cobre, fibra o aire.
