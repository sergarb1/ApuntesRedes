---
title: Boletín U01 — Inicial (Resuelto)
description: Soluciones ejercicios básicos de Fundamentos de Redes
---

# ✅ Boletín U01 — Inicial (Resuelto)

---

## 1. Clasifica estas redes

a) **LAN** — Red de área local
b) **LAN** — Sigue siendo local aunque tenga 200 PCs
c) **WAN** — Conecta dos ubicaciones geográficamente separadas
d) **MAN** — Cubre una ciudad (Metropolitan Area Network)

## 2. Verdadero o falso

a) **Falso.** El hub NO segmenta dominios de colisión. Todos los puertos están en el mismo dominio.
b) **Verdadero.** El switch construye la tabla MAC dinámicamente.
c) **Falso.** El router trabaja en capa 3 (Red). Capa 2 es switch/puente.
d) **Verdadero.** 48 bits en hexadecimal (ej. AA:BB:CC:DD:EE:FF).
e) **Verdadero.** Si están en la misma VLAN y mismo switch, se comunican directamente.

## 3. Dibuja la topología

**Descripción:** Topología en estrella extendida (o árbol).
- Router conectado a Switch1 y Switch2 (un cable a cada uno).
- Switch1 conectado a PC1 y PC2.
- Switch2 conectado a PC3 y PC4.
- El router da salida a Internet.

## 4. Calcula

Red /24 = 256 direcciones totales.
- 1 dirección de red (la primera, .0)
- 1 dirección de broadcast (la última, .255)
- **254 direcciones utilizables para hosts.**

## 5. Sopa de letras conceptual

1 → b (Hub)
2 → e (Switch)
3 → a (Router)
4 → c (MAC)
5 → d (Protocolo)
6 → f (IP)

## 6. Ping paso a paso

1. PC-A consulta la tabla ARP para ver si tiene la MAC de PC-B.
2. No la tiene → lanza un **ARP Request** broadcast ("¿quién tiene 192.168.1.20?").
3. El switch recibe la trama, la inunda por todos los puertos (excepto el de origen).
4. PC-B recibe el ARP, ve que es para él, responde con **ARP Reply** (unicast) dando su MAC.
5. El switch aprende: "PC-B está en el puerto X" y añade entrada a la tabla MAC.
6. PC-A recibe el ARP Reply, guarda la MAC en su tabla ARP.
7. PC-A ya puede construir la trama Ethernet con MAC destino = MAC de PC-B.
8. PC-A envía el **ICMP Echo Request** (ping).
9. El switch lo reenvía solo al puerto de PC-B (ya sabe dónde está).
10. PC-B responde con **ICMP Echo Reply**.
11. PC-A recibe el reply. **Ping exitoso.**
