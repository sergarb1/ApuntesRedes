---
title: 05 — TCP y UDP
description: Fiable y ordenado vs rápido y ligero — el duelo del transporte ⚖️
---

<p><small>Fiable y ordenado vs rápido y ligero — el duelo del transporte ⚖️</small></p>

> 🗺️ **Estás en:** 📡 **U02 · Modelos OSI y análisis** → 05 · TCP y UDP

---

## 📬 La idea en una frase

> TCP es el transporte **fiable** (entrega garantizada y en orden) y UDP el **rápido** (sin garantías, pero ligero). Elegir entre ambos es elegir entre "debe llegar sí o sí" y "prefiero fluidez".

En [U01](/ApuntesRedes/01-fundamentos-redes/06-protocolos) viste el resumen con el árbol de decisión. Aquí entramos en la maquinaria: handshake, flags, ventana deslizante y la tabla comparativa definitiva.

---

## 🤝 TCP: fiable pero con trámites

TCP es **orientado a conexión**: antes de mandar datos, las dos partes negocian que se hablan. Ese saludo es el famoso **three-way handshake** (abreviado 3WHS):

```
CLIENTE                     SERVIDOR
   │                           │
   ├───────── SYN ────────────►│  Paso 1: cliente envía SYN (seq=x)
   │◄──────── SYN-ACK ────────┤  Paso 2: servidor responde SYN+ACK (seq=y, ack=x+1)
   ├───────── ACK ────────────►│  Paso 3: cliente confirma ACK (seq=x+1, ack=y+1)
   │◄════════ DATOS ═════════►│  ¡Conexión establecida! Comienza la transferencia
```

Cada paso tiene su misión:

1. **SYN** (synchronize): "¿Hablas TCP?" — el cliente pide abrir conexión y anuncia su número de secuencia inicial.
2. **SYN-ACK**: "Sí, ¿empezamos?" — el servidor confirma y pide a su vez.
3. **ACK**: "Vale, empezamos" — el cliente cierra el círculo y ya fluyen los datos.

> 💡 **En Wireshark lo verás así:** tres paquetes consecutivos con flags `[SYN]`, `[SYN, ACK]` y `[ACK]`. Es la secuencia que preguntan en todas partes.

### Flags TCP que debes conocer

| Flag | Nombre | Significado |
|---|---|---|
| **SYN** | Synchronize | Inicia una conexión |
| **ACK** | Acknowledgment | Confirma recepción correcta |
| **FIN** | Finish | Cierra la conexión amigablemente |
| **RST** | Reset | Corta la conexión forzosamente (error) |
| **PSH** | Push | Entrega los datos ya, sin esperar al buffer |
| **URG** | Urgent | Datos urgentes (rara vez usado) |

Si veo `[RST]` en una captura, sospecho un puerto cerrado o un corte brusco; si veo muchos `[FIN]`, cierres limpios de sesiones.

### La ventana deslizante (sliding window)

TCP no envía un paquete y espera: envia **varios a la vez**, tantos como permita la ventana que anuncia el receptor en cada ACK.

```
Emisor → [Paq1][Paq2][Paq3] → Receptor
         ← ACK(1) ←
         ← ACK(2) ←
Emisor: "Ventana de 3, puedo seguir"
```

Si un ACK tarda en llegar o faltan paquetes, la ventana se encoge: eso se ve en Wireshark como `TCP Window Update` o `[SYN] Retransmission` cuando algo se pierde. Es el mecanismo que convierte a TCP en "fiable": **cada trozo se numerada y se confirma**.

---

## ⚡ UDP: el mensajero sin papeleo

UDP (**User Datagram Protocol**) envía **datagramas** sin establecer conexión, sin confirmación y sin orden. Cabecera fija de **8 bytes**: el minimalismo hecho protocolo.

> **Analogía de la radio:** TCP es un correo certificado (firma el cartero, el paquete vuelve si no llega); UDP es un megáfono (emites y sigue, aunque alguien no te oyera).

Casos típicos de UDP — diles en una entrevista con seguridad:

- **Streaming y VoIP:** mejor perder un trocito que congelar la llamada.
- **Juegos online:** la rapidez manda y se tolera perder "ticks".
- **DNS:** una consulta y una respuesta; sin conexión que mantener (aunque algunas garantías sí usan TCP).
- **DHCP:** el cliente aún no tiene IP; manda broadcast y espera respuesta.

---

## ⚖️ La comparativa definitiva

| Característica | TCP | UDP |
|---|---|---|
| Conexión | Orientado a conexión (SYN, SYN-ACK, ACK) | Sin conexión |
| Fiabilidad | ACK + retransmisión automática | Sin confirmación |
| Orden | Los segmentos llegan en orden | Pueden llegar desordenados |
| Control de flujo | Sí (ventana deslizante) | No |
| Cabecera | 20-60 bytes | 8 bytes fijos |
| Velocidad | Más lento | Más rápido |
| Uso típico | Web (HTTP), email, FTP, SSH | Streaming, VoIP, DNS, gaming, DHCP |

> **Regla práctica:** si los datos deben llegar sí o sí y en orden → **TCP**. Si la velocidad importa y toleras perder un paquete → **UDP**.

---

## 🔬 Ejemplo resuelto: una videollamada

- Con **TCP**, si se pierde un trozo de vídeo, se reintenta y la llamada se **congela** esperando el dato.
- Con **UDP**, se **descarta** el trozo perdido y la llamada sigue (aunque oigas un chasquido de vez en cuando).

Por eso el audio y vídeo en vivo usan UDP: la conversación en tiempo real tolera micro-pérdidas, pero no congela nunca.

**Otro ejemplo resuelto — el cierre limpio:** TCP termina con `FIN` → `ACK` → `FIN` → `ACK` (un "handshake de despedida"). Si ese cierre se corrompe, el servidor acaba en estado `TIME_WAIT` hasta que expira; por eso a veces "los puertos se quedan ocupados" un rato tras cerrar un servicio.

---

## 🧠 Mini-chequeo

1. Enumera los 3 pasos del three-way handshake con sus flags.
2. ¿Por qué DNS usa UDP para consultas puntuales?
3. Una descarga de un PDF de 2 GB, ¿con qué protocolo? Justifica.

<details>
<summary>🔄 Respuestas</summary>

1. **SYN** (cliente) → **SYN-ACK** (servidor) → **ACK** (cliente).
2. Porque es una conversación breve: manda una pregunta y espera una respuesta; abrir conexión TCP sería armar todo un papeleo para dos mensajes.
3. Con **TCP**: el PDF debe llegar completo, sin corruptos y en orden; la fiabilidad compensa la lentitud.
</details>

---

## ✅ Resumen en 3 frases

- TCP garantiza entrega y orden mediante **handshake, numeración de segmentos y ACKs**.
- UDP es ligero (8 bytes de cabecera) y sin conexión: perfecto para tiempo real.
- Elige según la prioridad: **datos íntegros (TCP)** o **fluidez (UDP)**.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| 3WHS | Saludo de 3 pasos que abre toda conexión TCP |
| Segmento | PDU de TCP en capa 4 |
| Datagrama | PDU de UDP en capa 4 |
| Ventana deslizante | Cuántos paquetes puede enviar TCP sin esperar |
| ACK | Confirmación de recepción |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/02-modelos-osi-analisis) · **Anterior:** [04 · Encapsulación](/ApuntesRedes/02-modelos-osi-analisis/04-encapsulacion) · **Siguiente:** [06 · IP y Ethernet](/ApuntesRedes/02-modelos-osi-analisis/06-ip-ethernet)