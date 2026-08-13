---
title: Boletín U01 — Inicial (Resuelto)
description: Soluciones de los ejercicios básicos de Fundamentos de Redes
---

# ✅ Boletín U01 — Inicial (Resuelto)

---

## 1. Clasifica estas redes

a) **LAN** — Todo dentro del mismo hogar.
b) **LAN** — Sigue siendo local aunque tenga 200 PCs: un solo edificio.
c) **WAN** — Une dos ubicaciones geográficamente separadas (Madrid y Barcelona).
d) **MAN** — Cubre una ciudad (Metropolitan Area Network).

## 2. Verdadero o falso

a) **Falso.** El hub NO segmenta: todos sus puertos comparten un único dominio de colisión.
b) **Verdadero.** El switch construye su tabla MAC dinámicamente según el tráfico que ve.
c) **Falso.** El router trabaja en la capa 3 (Red). La capa 2 es cosa del switch/puente.
d) **Verdadero.** 48 bits representados en hexadecimal (ej. `AA:BB:CC:DD:EE:FF`).
e) **Falso.** La MAC va grabada de fábrica y es permanente; la que cambia con el reinicio o el DHCP es la IP.

## 3. Dibuja la topología

**Descripción:** topología en estrella extendida (o árbol).

- Router conectado a Switch1 y a Switch2 (un cable a cada uno).
- Switch1 conectado a PC1 y PC2.
- Switch2 conectado a PC3 y PC4.
- El router da la salida a Internet.

## 4. Empaca tu memoria: une cada PDU con su capa

1 → b (Bits · Física)
2 → c (Trama · Enlace)
3 → d (Paquete · Red)
4 → a (Segmento · Transporte)

>Truco: a medida que bajas capas, la PDU gana cabeceras (segmento → paquete → trama → bit).

## 5. ¿TCP o UDP?

a) **TCP** — El PDF debe llegar completo y en orden.
b) **UDP** — Prefiere fluidez; se tolera perder algún fotograma.
c) **TCP** — La web se apoya en una conexión fiable.
d) **UDP** — Una consulta puntual no necesita asegurar conexión.

## 6. Calcula: una red /24

a) **256** direcciones totales (2^8 = 256 porque 8 bits de host).
b) **254** utilizables (256 - la de red - la de broadcast).
c) La dirección de la red es **`192.168.1.0`** (hosts a 0).
d) La de broadcast es **`192.168.1.255`** (hosts a 1). Ninguna de las dos se asigna a equipos.

## 7. Sopa de letras conceptual

1 → b (Hub)
2 → e (Switch)
3 → a (Router)
4 → c (MAC)
5 → d (Protocolo)
6 → f (IP)

## 8. Ping mental guiado

1. PC-A consulta la tabla ARP: no tiene la MAC de `192.168.1.20`.
2. Lanza un **ARP Request** de difusión: "¿Quién tiene 192.168.1.20?" (MAC destino `FF:FF:FF:FF:FF:FF`).
3. El switch recibe la trama y la inunda por todos los puertos menos el de origen.
4. PC-B ve que el ARP pide su IP y responde con **ARP Reply** (unicast) dando su MAC.
5. El switch aprende que PC-B está en ese puerto y lo anota en su tabla MAC.
6. PC-A guarda la MAC de PC-B en su tabla ARP.
7. PC-A construye la trama Ethernet con MAC destino = MAC de PC-B e IP destino `192.168.1.20`.
8. Envía el **ICMP Echo Request** (el ping).
9. El switch lo reenvía solo por el puerto de PC-B (ya sabe dónde está).
10. PC-B responde con **ICMP Echo Reply**.
11. PC-A recibe la respuesta: **ping exitoso**.