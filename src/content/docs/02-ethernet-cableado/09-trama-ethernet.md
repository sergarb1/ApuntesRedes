---
title: 9 — La trama Ethernet
description: El sobre de la capa 2, en cobre, fibra y en el aire 📦
---

<p><small>El sobre de la capa 2, en cobre, fibra y en el aire 📦</small></p>

> 🗺️ **Estás en:** 📡 **UD2 · Ethernet y cableado** → 9 · La trama Ethernet

---

## 📬 La idea en una frase

> La **trama** (*frame*) es la **PDU de la capa 2**: un "sobre" con **MACs de origen y destino**, un **EtherType** que dice qué lleva dentro y un **FCS** que comprueba que no se ha estropeado en el viaje — ya sea por **cable o por el aire**.

En el [punto anterior](/ApuntesRedes/02-ethernet-cableado/08-modelo-osi) viste que la capa 2 entrega en la red local. Aquí abrimos ese sobre como si fuera la ficha técnica que luego verás en [Wireshark](/ApuntesRedes/01-introduccion/04-paquetes-y-protocolos).

---

## 🧅 De bits a trama (capa 1 → capa 2)

Repaso del mapa OSI:

1. **Capa 1** convierte el trabajo de la capa 2 en **bits** (tensión en cobre, luz en fibra, onda en el aire).
2. **Capa 2** empaqueta esos bits en una **trama** para que otro equipo de la **misma red local** sepa: *¿es para mí? ¿de quién viene? ¿llegó entera?*

```
[ datos de las capas de arriba ]
        │  la capa 2 añade cabecera + FCS
        ▼
[ MAC dst | MAC src | EtherType | payload | FCS ]   ← trama
        │  la capa 1 lo convierte en bits
        ▼
  101100… por cobre / fibra / aire
```

---

## 📦 La trama Ethernet (medios guiados: cobre y fibra)

Sobre el **cobre (UTP)** y la **fibra**, Ethernet (IEEE 802.3) usa la trama clásica **Ethernet II**: cabecera de **14 bytes** + **FCS** de **4**.

```
 ┌─────────────────────────────────────────────────────────────────┐
 │  Dest MAC (6)  │  Src MAC (6)  │ EtherType (2) │ Payload (46-1500) │ FCS (4) │
 └─────────────────────────────────────────────────────────────────┘
```

| Campo | Tamaño | Qué hace |
|---|---|---|
| **Dest MAC** | 6 bytes | ¿Para quién es esta trama en la LAN? |
| **Src MAC** | 6 bytes | Quién la envió (el switch la aprende de aquí) |
| **EtherType** | 2 bytes | Qué protocolo hay dentro: **0x0800** = IPv4, **0x86DD** = IPv6, **0x0806** = ARP |
| **Payload** | 46–1500 bytes | El "carta" que viaja (el **MTU 1500** es el techo) |
| **FCS** | 4 bytes | CRC de integridad: si no cuadra → trama **descartada** |

- **MTU 1500:** no es magia de IP; es el **máximo payload que acepta la trama Ethernet**. Si los datos de arriba mandan más, la capa 3 (IPv4) **fragmenta**: lo verás en el [punto 1 de UD3](/ApuntesRedes/03-direccionamiento-ip/01-estructura-ipv4).
- **FCS:** un hash de 4 bytes. El switch y la NIC lo calculan al enviar y lo comprueban al recibir; un cable sucio o una interferencia = FCS malo = trama fuera.
- **EtherType `0x0806`:** significa *"dentro de esto hay un mensaje ARP"*. **ARP** (request broadcast, reply unicast, IP→MAC) se explica en el [punto 1 de UD3](/ApuntesRedes/03-direccionamiento-ip/01-estructura-ipv4); aquí solo nos interesa que **la trama ya sabe etiquetar su contenido**.

![Trama Ethernet (Ethernet II): MACs, EtherType, payload y FCS](/ApuntesRedes/diagrams/u02-trama-ethernet.svg)

> 💡 **EtherType en Wireshark:** al expandir la cabecera *Ethernet II* verás *Type* con esos valores hexadecimales. Es lo que confirma "esto va a IP" o "esto es ARP".

---

## 📶 La trama "en el aire" (medios no guiados)

El WiFi **también es capa 2**: sin trama no hay entrega local, con cable o sin él. Pero el aire no es un hilo punto a punto: aquí el estándar es **IEEE 802.11**, y su trama **no es idéntica** a la Ethernet de cobre.

| | **802.3 Ethernet** (guiado) | **802.11 WiFi** (no guiado) |
|---|---|---|
| Capa | 2 (la misma) | 2 (la misma) |
| Direcciones MAC | Origen y destino (2) | Hasta **4** (receptor, transmisor, receptor final…) |
| Cabecera | Corta (MACs + EtherType) | Más larga: *Frame Control*, duración, secuencias… |
| Campo tipo | **EtherType** (0x0800…) | *Type / Length* y tipos de trama (datos, management…) |
| Medio | Cobertura fija: cable | Canal de radio **compartido** (colisiones, interferencias) |
| Quién "cambia" la trama | El switch reenvía | El AP puede cifrar/descifrar (WPA2/WPA3) en el borde |

**Lo que no cambia:** al otro lado, la tarjeta de red (o el chip WiFi) **reconstruye una trama válida** para entregarla a la capa 3. Arriba de 802.11, el mundo IP ni se entera de si venías de un RJ45 o de una antena.

> 🔗 Los detalles de 802.11 (canales, asociación, seguridad) están en la [UD11 · Redes inalámbricas](/ApuntesRedes/11-redes-inalambricas/01-medio-inalambrico). Aquí solo te queda la idea: **misma capa  diferente trama**.

---

## 🔍 Cómo lo ves en vivo (Wireshark)

1. Captura en la interfaz de red.
2. Filtra `eth` (o `wlan` si estás en WiFi).
3. En cada trama mira, en este orden:
   - **Destination / Source** → MACs de la LAN.
   - **Type** → EtherType (`0x0800` IPv4, `0x0806` ARP…).
   - **Frame** → tamaño total; si pasas de 1518 bytes "en la red cableada", algo va raro (salvo jumbo frames en datacenter).

---

## 🧠 Mini-chequeo

1. ¿Qué tres campos "de dirección o tipo" lleva siempre una trama Ethernet II y para qué sirve cada uno?
2. Si Wireshark muestra EtherType `0x0806`, ¿qué protocolo hay dentro (sin abrirlo)?
3. En una tabla: ¿qué cambia y qué no pasa de cobre a WiFi en capa 2?

<details>
<summary>🔄 Respuestas</summary>

1. **Dest MAC** (para quién), **Src MAC** (quién), **EtherType** (qué va dentro).
2. **ARP** — la etiqueta lo dice; el detalle (request/reply y tabla ARP) está en el punto 1 de UD3.
3. **Cambia:** estándar (802.3 vs 802.11), cabecera, número de direcciones, medio compartido. **No cambia:** sigue siendo **capa 2**, entrega local por MAC y el resto de la pila ve "una trama".
</details>

---

## ✅ Resumen en 3 frases

- La trama es la **PDU de la capa 2**: MACs, EtherType y FCS sobre un payload de hasta **1500 bytes**.
- En **medios guiados** (cobre/fibra) manda **802.3 Ethernet**; en **no guiados** (aire), **802.11** con otra cabecera, **misma capa**.
- El EtherType etiqueta el contenido (IPv4, IPv6, ARP…); ARP se estudia a fondo en UD3.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Trama (*frame*) | PDU de la capa 2 |
| EtherType | Campo que dice qué protocolo hay dentro de la trama |
| FCS | CRC de 4 bytes que valida la trama |
| MTU | Tamaño máximo de payload de la trama (1500 en Ethernet) |
| 802.3 | Estándar Ethernet cableado |
| 802.11 | Estándar WiFi (trama distinta, capa 2 igual) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/02-ethernet-cableado) · **Anterior:** [8 · El modelo OSI](/ApuntesRedes/02-ethernet-cableado/08-modelo-osi) · **Siguiente:** [10 · Cierre: consolida lo aprendido](/ApuntesRedes/02-ethernet-cableado/10-cierre)
