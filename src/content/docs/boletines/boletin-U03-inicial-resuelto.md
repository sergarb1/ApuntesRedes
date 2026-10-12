---
title: Boletín de Capa de enlace y trama Ethernet — Inicial (Resuelto)
description: Soluciones de los ejercicios básicos de OSI, MAC, trama y encapsulación
---

# ✅ Boletín de Capa de enlace y trama Ethernet — Inicial (Resuelto)

---

## 1. Relaciona capa y PDU

1 → b (bits) · 2 → c (trama) · 3 → a (paquete) · 4 → d (segmento)

## 2. Anatomía de una MAC

a) **6 bytes (48 bits)** en hexadecimal.
b) El **OUI** son los 3 primeros bytes (`00:1A:2B`); lo asigna el **IEEE** al fabricante.
c) Los 3 bytes restantes los reparte el fabricante entre sus tarjetas (número de serie de la interfaz).

## 3. Unicast, multicast o broadcast

a) **Broadcast** — es la dirección "para todas" de la LAN.
b) **Unicast** (y global, porque el primer byte empieza par: bit I/G = 0, bit U/L = 0).
c) **Multicast** — el primer byte vale `01` (bit I/G = 1): va para un grupo.

## 4. Verdadero o falso (MAC e IP)

a) **Falso.** La MAC es la de la tarjeta y no cambia al mover de red; lo que cambia es la IP.
b) **Verdadero.** La IP de destino es la que permite enrutar hasta el final.
c) **Verdadero.** Cada enlace (router→router) tiene sus propias MACs de origen y destino.
d) **Falso.** El switch es capa 2: reenvía mirando la **MAC destino**; las IP solo las leen los routers.

## 5. Los campos de la trama Ethernet II

a) **Dest MAC (6 B), Src MAC (6 B) y EtherType (2 B)** — cabecera de 14 bytes.
b) **IPv4** (`0x0800`).
c) **Mínimo 46 bytes** de payload (64 de trama en total) y **máximo 1500** (MTU); con cabeceras, la trama clásica se queda en **1518 bytes**.
d) **FCS** = CRC de 4 bytes de integridad. Si no cuadra, la trama se **descarta** (errores CRC) y no se entrega.

## 6. Ordena la encapsulación

1. e) El navegador prepara los datos HTTP
2. c) Los datos se envuelven en una cabecera TCP (segmento)
3. b) El segmento recibe cabecera IP (paquete)
4. d) El paquete recibe cabecera Ethernet y FCS (trama)
5. a) La trama se convierte en bits y sale por el medio

## 7. MAC o IP: ¿cuál?

1 → b (MAC: de fábrica) · 2 → a (IP: destino final) · 3 → b (MAC: se rehace en cada salto) · 4 → a (IP: la configuras o DHCP)

> 💡 **La idea:** la MAC identifica *el próximo tramo*; la IP identifica *el destino del viaje*.

## 8. El sobre de la capa 2 (802.11 vs 802.3)

a) **Falso.** El WiFi **también es capa 2**: entrega local por MAC; solo cambia el medio (aire) y la trama.
b) **Verdadero** (receptor, transmisor, receptor final, transmisor final… hasta 4).
c) **Verdadero** (4 bytes de CRC al final de la trama).
d) **Falso.** Para decidir el puerto, el switch usa la **MAC destino** (y aprende de la MAC origen). El EtherType lo usan los equipos de capa superiores (por ejemplo, el router para saber que va un paquete IPv4).
