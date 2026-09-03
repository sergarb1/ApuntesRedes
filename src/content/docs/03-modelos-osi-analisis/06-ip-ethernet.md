---
title: 06 — IP y Ethernet
description: La cabecera del cerebro (IPv4) y la caja que viaja por el cable 📦
---

<p><small>La cabecera del cerebro (IPv4) y la caja que viaja por el cable 📦</small></p>

> 🗺️ **Estás en:** 📡 **U03 · Modelos OSI y análisis** → 06 · IP y Ethernet

---

## 📬 La idea en una frase

> **IP** (capa 3) pone el direccionamiento y decide la ruta; **Ethernet** (capa 2) mete el paquete en una trama con MACs y control de errores. Los dos juntos son el corazón de la pila de protocolos actual.

Aquí leemos los campos de esas cabeceras como si fueran la ficha técnica del paquete: lo que luego verás desplegado en [Wireshark](/ApuntesRedes/03-modelos-osi-analisis/08-wireshark).

---

## 🧠 La cabecera IPv4

IPv4 es el "protocolo del cerebro": direccionamiento, enrutamiento y fragmentación. Su cabecera mínima ocupa **20 bytes** (hasta 60 con opciones):

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
├─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┤
│Version│  IHL  │Type of Service│          Total Length           │
├─┬─┬─┬─┬─┬─┬─┬─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┤
│         Identification        │Flags│    Fragment Offset       │
├─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┤
│  Time to Live │   Protocol   │        Header Checksum           │
├─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┤
│                       Source Address                           │
├─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┤
│                    Destination Address                         │
└─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘
```

Los campos que te van a preguntar en entrevistas:

- **TTL (Time to Live):** evita bucles infinitos. Cada router lo decrementa en 1; si llega a 0, el paquete se **descarta** (y suele avisarse con un ICMP *Time Exceeded*).
- **Protocol:** indica qué lleva dentro: 6 = TCP, 17 = UDP, 1 = ICMP.
- **Checksum:** verifica **solo la cabecera IP** (no los datos; de eso se encarga TCP).
- **IHL / Total Length:** tamaño de cabecera y longitud total, imprescindibles para la fragmentación.

> 💡 **Cálculo mental de TTL:** con TTL inicial 64 (Linux) o 128 (Windows), el TTL que veas en Wireshark te dice a cuántos saltos estás. `64 - 49 = 15 saltos`, por ejemplo.

---

## 🔪 MTU y fragmentación

Una red Ethernet soporta tramas de hasta **MTU 1500 bytes**. Si un paquete IP es más grande, la capa 3 lo **fragmenta**:

**Ejemplo resuelto:** un paquete IP de 2500 bytes (cabecera 20 + datos 2480) por una red con MTU 1500.

- Fragmento 1: 20 (cabecera) + 1480 (datos) = **1500 bytes**, flag More Fragments=1.
- Fragmento 2: 20 (cabecera) + 1000 (datos restantes) = **1020 bytes**, MF=0.

**Solo 2 fragmentos** — el error clásico es dividir 2500/1500 y decir 3, pero hay que contar la cabecera de cada fragmento. El destino los reensambla con el campo **Identification** (igual en todos).

> ⚠️ La fragmentación es costosa y hoy se evita con **PMTUD** (*Path MTU Discovery*): los routers aseguran no fragmentar y dejan que el paquete "aprenda" el MTU del camino. Si lo ves en exámenes, quédate con el concepto del ejemplo.

---

## 📦 La trama Ethernet

La caja que viaja por el cable. Cabecera de **14 bytes** + **FCS** de 4:

```
 ┌─────────────────────────────────────────────────────────────────┐
 │  Dest MAC (6)  │  Src MAC (6)  │ EtherType (2) │ Payload (46-1500) │ FCS (4) │
 └─────────────────────────────────────────────────────────────────┘
```

- **EtherType:** qué protocolo de capa 3 lleva dentro: **0x0800** = IPv4, **0x86DD** = IPv6, **0x0806** = ARP.
- **FCS (Frame Check Sequence):** CRC de 4 bytes para detectar errores. Si no coincide → trama descartada.
- **El payload:** 46 a 1500 bytes (el MTU).

> 💡 **EtherType en Wireshark:** al expandir la cabecera Ethernet verás el campo *Type* con esos valores hexadecimales. Es lo que te confirma "esto es IPv4" frente a "esto es ARP".

---

## 🌍 ARP: la puerta entre IP y MAC

IP dice "mándame esto a 192.168.1.20", pero Ethernet necesita una **MAC**. Ese traductor es **ARP** (*Address Resolution Protocol*), que ya viste en el [punto 8 de U02](/ApuntesRedes/02-fundamentos-redes/08-conectividad-basica):

1. ¿Quién tiene 192.168.1.20? — pregunta **broadcast** (`FF:FF:FF:FF:FF:FF`).
2. El dueño responde **unicast**: "Esa IP es mi MAC".
3. La respuesta se **cachea** en la tabla ARP local (ver `arp -a`).

**¿Por qué ARP y no DNS?** DNS traduce nombres a IP (capa 7); ARP traduce IP a MAC (capa 2-3). Son los dos "carteros" de la red, pero en niveles distintos.

---

## 🧠 Mini-chequeo

1. ¿Qué campo de IP evita los bucles infinitos y cómo funciona?
2. Un paquete de 2500 bytes atraviesa una red con MTU 1500. ¿Cuántos fragmentos se generan y por qué?
3. ¿Qué EtherType esperas tras una cabecera Ethernet que lleva un ARP Request?

<details>
<summary>🔄 Respuestas</summary>

1. **TTL** — cada router lo decrementa en 1; si llega a 0, el paquete se descarta.
2. **2 fragmentos** — 2480 bytes de datos caben en 1480 (primer fragmento) + 1000 (último), contando la cabecera de 20 de cada fragmento.
3. **0x0806** — el EtherType de ARP (0x0800 es IPv4, 0x86DD es IPv6).
</details>

---

## ✅ Resumen en 3 frases

- IP (capa 3) direcciona y enruta; su cabecera mínima es de 20 bytes y el TTL evita bucles.
- Ethernet (capa 2) envuelve el paquete en una trama de 14+4 bytes con MACs, EtherType y FCS.
- ARP traduce IP a MAC y Ethernet a IP: el único puente entre las dos cabeceras.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| TTL | Contador de saltos del paquete IP |
| MTU | Máximo tamaño de payload de la trama (1500 en Ethernet) |
| Fragmentación | Partir un paquete grande para que quepa en el MTU |
| EtherType | Campo que dice qué lleva la trama (IPv4/ARP/IPv6) |
| FCS | CRC que detecta errores de la trama |
| ARP | Traductor IP → MAC dentro de la red local |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-modelos-osi-analisis) · **Anterior:** [05 · TCP y UDP](/ApuntesRedes/03-modelos-osi-analisis/05-tcp-y-udp) · **Siguiente:** [07 · Puertos y sockets](/ApuntesRedes/03-modelos-osi-analisis/07-puertos-y-sockets)