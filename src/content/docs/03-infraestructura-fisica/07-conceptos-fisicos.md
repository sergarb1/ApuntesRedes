---
title: 07 — Conceptos físicos clave
description: Ancho de banda, throughput, latencia, atenuación y diafonía 📐
---

<p><small>Ancho de banda, throughput, latencia, atenuación y diafonía 📐</small></p>

> 🗺️ **Estás en:** 🔌 **U03 · Infraestructura física** → 07 · Conceptos físicos clave

---

## 📬 La idea en una frase

> La capa física no solo se mide en "va rápido o va lento": se gobierna con **ancho de banda** (capacidad teórica), **throughput** (capacidad real), **latencia** (el tiempo de viaje), **atenuación** (pérdida de señal con la distancia) y **diafonía** (interferencia entre hilos). Cinco conceptos que explican el 90% de los diagnósticos.

Estos conceptos son el puente entre la teoría y los [fallos del punto 4](/ApuntesRedes/03-infraestructura-fisica/04-crimpado-y-comprobacion) y el [cableado del edificio](/ApuntesRedes/03-infraestructura-fisica/08-cableado-estructurado). Si los dominas, todo lo demás encaja.

---

## 🚄 Ancho de banda: la capacidad máxima

Capacidad máxima de transmisión de un medio, medida en **bps** (bits por segundo):

```
1 Kbps = 10³ bps
1 Mbps = 10⁶ bps
1 Gbps = 10⁹ bps
10 Gbps = 10¹⁰ bps
```

> ⚠️ **No confundir con el ancho de banda en Hz.** El ancho de banda en Hertz mide el *rango de frecuencias* que puede transmitir un medio. Ambos se relacionan por el **teorema de Nyquist**: capacidad = 2 × ancho_de_banda × log₂(niveles). Pero en la práctica, cuando un admin dice "ancho de banda", habla de **velocidad máxima de transmisión**. Y una trampa recurrente: 100 Mbps = 12.5 MB/s (el byte son 8 bits).

---

## 📊 Throughput: lo que de verdad te llega

El **rendimiento (throughput)** es el ancho de banda real que obtienes. **Siempre menor** que el teórico, por:

- **Overhead de protocolos**: cabeceras, ACKs y reencuadres que comen ancho de banda útil.
- **Colisiones y retransmisiones**: cada descarte y reenvío resta trabajo útil.
- **Congestión de red**: cuando el ancho de banda se satura, las colas crecen y el tráfico se frena.
- **Limitaciones del hardware**: tarjetas de red, CPU del router o discos del servidor más lentos que el enlace.

> 💡 **La autopista vs la velocidad real:** el ancho de banda es el límite de la autopista; el throughput es lo que de verdad llegas a circular, teniendo en cuenta peajes (cabeceras), retenciones (congestión) y tramos en obras (interferencia).

---

## ⏱️ Latencia: el tiempo de viaje

Tiempo que tarda un paquete en ir del origen al destino. Se mide en **milisegundos (ms)**:

| Tipo | Latencia | Ejemplo |
|---|---|---|
| LAN | < 1 ms | Misma oficina |
| Campus | 1-5 ms | Misma universidad |
| WAN | 20-150 ms | España ↔ EE.UU. |
| Satélite | 250-600 ms | Internet vía satélite |

Importante: **latencia y ancho de banda son independientes.** Puedes tener 10 Gbps con 200 ms (el dato llega rápido pero tarda) o 10 Mbps con 1 ms. Para el ping o la videollamada manda la latencia; para las descargas, el ancho de banda.

---

## 📉 Atenuación: la señal que se apaga

Pérdida de intensidad de la señal con la distancia. En cables de cobre, la atenuación **aumenta con la frecuencia y la temperatura**, por eso los cables tienen una **distancia máxima** (100 m para UTP) y por eso la fibra (luz) aguanta kilómetros.

**Se mide en dB** y se calcula simple: potencia recibida = potencia transmitida − atenuación. Si la señal llega por debajo del umbral del receptor, los errores CRC e intermitencias hacen acto de presencia.

---

## 📳 Diafonía (Crosstalk): luz de gas entre pares

Interferencia de un par de hilos sobre otro par adyacente. Como viste con el [trenzado del punto 2](/ApuntesRedes/03-infraestructura-fisica/02-cable-utp), los pares se influyen entre sí. Los tipos que cita la normativa:

| Tipo | Qué mide |
|---|---|
| **NEXT (Near-End Crosstalk)** | Interferencia que un par provoca sobre otro, **medida en el extremo cercano** (el mismo lado que transmite) |
| **FEXT (Far-End Crosstalk)** | Interferencia **medida en el extremo lejano** (donde otro par transmite) |
| **PS NEXT (Power Sum NEXT)** | La **suma** de todas las interferencias que recibe un par desde todos los demás a la vez |

> ⚠️ **La jugada sucia del split pair:** si no respetas los pares cancelativos, la diafonía se dispara sin que el tester básico lo vea (hay continuidad). Es el motivo por el que un cable "ok" da errores intermitentes: la diafonía en niveles altos es veneno para Ethernet.

---

## 🧩 Jitter y SNR: los dos extras que lo cuentan todo

Dos conceptos más completan el cuadro de la capa física:

- **Jitter:** la **variación de la latencia**. Que un ping venga a 20 ms y el siguiente a 220 ms es peor que un ping constante a 60 ms. El jitter mata VoIP, gaming y videollamadas: el UDP (que usa VoIP) no retransmite, solo llora.
- **SNR (relación señal-ruido):** cuánta señal útil hay frente al ruido, en dB. Mucha señal pero mucho ruido (o al revés) = rendimiento pobre. Subir el SNR es el objetivo de apartar cables de interferencias, apantallar y usar fibra.

| Síntoma en la práctica | Concepto culpable |
|---|---|
| Descarga lenta aunque el enlace es "rápido" | Throughput < ancho de banda |
| Ping alto y estable | Latencia alta (sacudir: también jitter) |
| Ping que sube y baja sin control | **Jitter** |
| El cable pasa el tester pero hay CRC | **Diafonía** / SNR pobre |
| El cable funciona a 90 m y a 110 m no | **Atenuación** |

> 💡 **El combo del diagnóstico:** latencia mide el tiempo, jitter su irregularidad, SNR el margen de señal, atenuación la pérdida con la distancia y diafonía la interferencia entre pares. Con esos cinco, la capa física deja de esconder secretos.

---

## 🧠 Mini-chequeo

1. Un enlace anuncia 100 Mbps. ¿Cuánto tardaría en descargar 12.5 MB (asumiendo throughput perfecto)?
2. ¿Por qué la atenuación limita el cable UTP a 100 metros? ¿Y por qué no limita a la fibra?
3. Explica la diferencia entre NEXT, FEXT y PS NEXT con palabras simples.

<details>
<summary>🔄 Respuestas</summary>

1. **1 segundo** (o poco más con overhead): 12.5 MB × 8 = 100 Mbit, y 100 Mbps los cruza en 1 s con eficiencia perfecta. En la práctica, más (throughput < ancho de banda).
2. Porque en **cobre la señal eléctrica se atenúa con la distancia**, y a partir de 100 m cae por debajo del umbral del receptor. La **fibra transmite luz**, que se atenúa muchísimo menos, aguantando kilómetros sin repetidor.
3. **NEXT** mide la interferencia de un par sobre otro en el extremo cercano (el mismo lado que transmite); **FEXT**, en el extremo lejano; **PS NEXT** suma todas las interferencias que un par recibe de todos los demás a la vez.
</details>

---

## ✅ Resumen en 3 frases

- **Ancho de banda** es la capacidad teórica; **throughput**, la real, siempre menor por overhead, colisiones, congestión y hardware.
- **Latencia** es el tiempo de viaje (independiente del ancho de banda) y **atenuación** es la pérdida de señal con la distancia, causa del límite de 100 m en cobre.
- **Diafonía** (NEXT, FEXT, PS NEXT) es la interferencia entre pares: el culpable oculto de muchos cables con errores intermitentes.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Ancho de banda | Capacidad máx de transmisión en bps |
| Throughput | Capacidad real (11-byte, la realidad) |
| Latencia | Tiempo de viaje de un paquete (ms) |
| Atenuación | Pérdida de señal con la distancia (dB) |
| Diafonía / crosstalk | Interferencia entre pares (NEXT, FEXT, PS NEXT) |
| Jitter | Variación de la latencia (enemigo de VoIP) |
| SNR | Relación señal-ruido: margen de señal útil frente al ruido |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-infraestructura-fisica) · **Anterior:** [06 · WiFi](/ApuntesRedes/03-infraestructura-fisica/06-wifi) · **Siguiente:** [08 · Cableado estructurado](/ApuntesRedes/03-infraestructura-fisica/08-cableado-estructurado)