---
title: 04 — Encapsulación
description: El viaje de los datos envueltos en cabeceras 📦
---

<p><small>El viaje de los datos envueltos en cabeceras 📦</small></p>

> 🗺️ **Estás en:** 📡 **U02 · Modelos OSI y análisis** → 04 · Encapsulación

---

## 📬 La idea en una frase

> La **encapsulación** es el proceso de envolver los datos en cabeceras sucesivas al bajar por las capas; la **desencapsulación** es el viaje inverso, quitando cabeceras al subir.

La muñeca rusa de la que hablábamos en el [punto 1](/ApuntesRedes/02-modelos-osi-analisis/01-modelo-osi), ahora en movimiento.

**Analogía:** envías un libro dentro de una caja de cartón, la caja dentro de un sobre de mensajería y el sobre pegado a una palet con etiquetas. En destino, cada empresa quita su capa: el mensajero retira su sobre, la oficina retira la caja, y tú recoges el libro. Cada capa solo entiende su parte del envoltorio.

---

## 📦 El viaje de encapsulación

Empieza en el navegador (capa 7) y termina como bits en el cable (capa 1):

```
[Datos de aplicación]           ← Capa 7 (HTTP: "GET /index.html")
     ↓
[TCP | Datos]                   ← Capa 4 (añade puertos, seq, ack) → SEGMENTO
     ↓
[IP | TCP | Datos]              ← Capa 3 (añade IPs origen/destino) → PAQUETE
     ↓
[Ethernet | IP | TCP | Datos | FCS]  ← Capa 2 (añade MACs + CRC) → TRAMA
     ↓
[1011010010111010...]           ← Capa 1 (bits en el cable)
```

El diagrama lo resume visualmente:

<img src="/ApuntesRedes/diagrams/flujo-encapsulacion.svg" alt="Proceso de encapsulación TCP/IP desde aplicación hasta bits" class="diagram-img" loading="lazy" />

**Puntos clave del viaje:**

- Cada capa **añade** información, nunca la quita (salvo en destino).
- El contenido viaja "protegido" de dentro hacia fuera: lo que es "datos" para una capa es apenas el *payload* de la capa inferior.
- Los **encabezados no se modifican** en ruta salvo campos concretos (p. ej. el TTL del IP, que decrementa router a router).

---

## 🪐 La desencapsulación: el viaje inverso

En el destino, cada capa quita su cabecera y pasa el interior a la capa superior:

```
Bits → Capa 1: reconstruye la trama
     → Capa 2: quita Ethernet, comprueba FCS → queda el PAQUETE IP
     → Capa 3: quita IP, comprueba checksum   → queda el SEGMENTO TCP
     → Capa 4: quita TCP, ordena los segmentos → quedan los DATOS
     → Capa 7: el navegador interpreta el GET
```

> 💡 **Detalle de examen:** el receptor comprueba la **integridad** antes de subir. Si el FCS (capa 2) o el checksum (capa 3) fallan, la trama/paquete se descarta y se pide retransmisión (solo si es TCP). La desencapsulación solo termina cuando el contenido supera la verificación.

---

## 📏 Tamaño real de las cabeceras

Para que esto no sea teoría vacía, estos son los tamaños que verás reflejados en [Wireshark](/ApuntesRedes/02-modelos-osi-analisis/08-wireshark):

| Cabecera | Tamaño | Campos principales |
|---|---|---|
| **Ethernet** | 14 bytes + 4 bytes FCS | MAC destino (6), MAC origen (6), EtherType (2) |
| **IPv4** | 20-60 bytes | Versión, TOS, longitud total, ID, TTL, protocolo, checksum, IP origen, IP destino |
| **TCP** | 20-60 bytes | Puerto origen, puerto destino, seq num, ack num, flags, window |
| **UDP** | 8 bytes | Puerto origen, puerto destino, longitud, checksum |

> 💡 **Overhead total:** un paquete HTTP típico lleva al menos 14 (Ethernet) + 20 (IP) + 20 (TCP) = **54 bytes de cabeceras** por paquete. En redes lentas ese "impuesto" puede ser significativo; el concepto es el mismo con IPv6 o con más opciones de capa 3.

**Ejemplo resuelto:** envías una página de 1000 bytes vía HTTP.

- La capa 4 la corta en segmentos que no superen el MTU de la red (p. ej. 1460 bytes de datos TCP).
- Cada segmento se envuelve en 40 bytes (IP+TCP); la trama añade 18 más (Ethernet).
- En el destino, TCP reordena los segmentos con los números de secuencia y reconstruye la página original.

---

## 🧠 Mini-chequeo

1. ¿Cuántas cabeceras tiene un paquete HTTP que viaja por Ethernet? Nómbralas de fuera a dentro.
2. ¿Qué ocurre con una trama cuyo FCS no coincide?
3. ¿Por qué un switch no ve las IPs mientras reenvía una trama?

<details>
<summary>🔄 Respuestas</summary>

1. **Tres** (más el contenido de aplicación): Ethernet → IP → TCP → HTTP.
2. La trama se **descarta**: la capa 2 detecta el error y no la entrega a la capa 3; TCP la recupera mediante retransmisión.
3. Porque el switch trabaja en **capa 2**: solo lee la cabecera Ethernet (MACs). Las direcciones IP viven más adentro y no le pertenecen.
</details>

---

## ✅ Resumen en 3 frases

- Encapsular = **añadir cabeceras** al bajar; desencapsular = **quitarlas** al subir.
- Las cabeceras básicas Ethernet (14), IP (20) y TCP (20) son el "impuesto" de cada paquete.
- La verificación de integridad (FCS/checksum) ocurre **antes** de entregar a la capa superior.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Encapsulación | Envolver datos en cabeceras al bajar de capa |
| Desencapsulación | Quitar cabeceras al subir de capa |
| Overhead | Bytes de cabecera que "paga" cada paquete |
| Payload | Los datos útiles dentro de una cabecera |
| MTU | Tamaño máximo de trama/payload que soporta el medio |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/02-modelos-osi-analisis) · **Anterior:** [03 · El modelo TCP/IP](/ApuntesRedes/02-modelos-osi-analisis/03-modelo-tcp-ip) · **Siguiente:** [05 · TCP y UDP](/ApuntesRedes/02-modelos-osi-analisis/05-tcp-y-udp)