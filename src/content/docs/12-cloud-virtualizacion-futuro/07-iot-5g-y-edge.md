---
title: 07 — IoT, 5G y edge computing
description: Millones de dispositivos, latencia mínima 📡
---

<p><small>Millones de dispositivos, latencia mínima 📡</small></p>

> 🗺️ **Estás en:** ☁️ U12 → 07 · IoT, 5G y edge computing

---

## 📬 La idea en una frase

> **IoT** conecta miles de millones de dispositivos, **5G** los enlaza con latencia mínima usando un core basado en SDN/NFV, y **edge computing** procesa los datos cerca de donde se generan para no saturar el cloud.

Estas tres tecnologías no son promesas: son la razón de que la red esté cambiando ahora mismo. Y encajan con lo que llevas visto: el core de 5G es, literalmente, SDN + NFV (tus puntos 4 y 5) montados sobre cloud (tus puntos 1 y 6). Es el momento de atar cabos.

---

## 📡 Las tres tecnologías de un vistazo

| Tecnología | Descripción | Implicaciones de red |
|---|---|---|
| **IoT** | Miles de millones de dispositivos conectados (sensores, wearables, electrodomésticos) | Necesitas **IPv6 sí o sí** |
| **5G** | Baja latencia (<1 ms), alta velocidad, muchos dispositivos por celda | **Core basado en SDN/NFV**, redes "cortadas" (network slicing) |
| **Edge computing** | Procesar datos cerca del origen, no en un cloud central lejano | Reduce tráfico hacia el cloud, baja latencia crítica |

---

## 📶 IoT: el agotamiento de direcciones vuelve a la carga

Hoy hay más dispositivos que direcciones IPv4 en el mundo. Cuando cada sensor, bombilla y grúa de obra necesita IP, la respuesta no es NAT en cascada: es **IPv6**, con sus 128 bits (recuerda la U05). Algunas consecuencias prácticas:

- Cada dispositivo IoT puede tener su **IP pública global** (fin del NAT como muleta).
- La gestión masiva necesita **autoconfiguración** (SLAAC) y **seguridad por diseño**: miles de dispositivos inseguros son un ejército de botnets.
- El **edge** decide qué procesar en el dispositivo y qué enviar al cloud: el sensor analiza localmente y solo sube lo relevante.

> ⚠️ **Ojo con el mito:** el IoT no "desborda Internet" por ancho de banda — un sensor envía 100 bytes cada hora. El problema es **escala y gestión**: millones de tablas, de sesiones, de dispositivos a configurar, actualizar y asegurar.

---

## 📡 5G: más que "más megas"

5G no es solo velocidad: es **latencia < 1 ms** y **densidad** (muchísimos dispositivos por celda). Para conseguirlo, el core de 5G abandona las cajas de la telefonía clásica y se monta sobre **SDN + NFV**:

- **NFV** despliega las funciones del core (autenticación, routing de sesiones) como VMs/contenedores en cloud.
- **SDN** programa los flujos de forma central para encaminar el tráfico de cada servicio.
- **Network slicing** crea "porciones" lógicas de la misma infraestructura: un slice para coches autónomos (latencia crítica), otro para streaming, otro para sensores — cada uno con sus garantías.

Es la combinación exacta de [punto 4 (SDN)](/ApuntesRedes/12-cloud-virtualizacion-futuro/04-sdn) y [punto 5 (NFV)](/ApuntesRedes/12-cloud-virtualizacion-futuro/05-nfv), aplicada a la telefonía.

---

## 🖥️ Edge computing: no todo viaja al centro

Si cada dispositivo enviara sus datos al datacenter central, las líneas se saturarían y la latencia dispararía. **Edge computing** acerca el cómputo al borde de la red: micro-datacenters en las ciudades, cerca de las antenas.

```
  Sensores / coches / cámaras
            │
   ┌────────▼────────┐
   │   EDGE (borde)  │  ← procesa y decide ya (latencia baja)
   │ micro-datacenter│
   └────────┬────────┘
            │  solo lo relevante
   ┌────────▼────────┐
   │  CLOUD central  │  ← análisis masivo, almacenamiento
   └─────────────────┘
```

El edge reduce el tráfico hacia el cloud central y permite aplicaciones donde **unos milisegundos importan**: coches autónomos, cirugía remota, realidad aumentada. Es la respuesta física al problema que planteaba [el punto 6](/ApuntesRedes/12-cloud-virtualizacion-futuro/06-cloud-networking): no todo puede vivir "en la nube" si la luz tarda demasiado en ir y volver.

---

## ⚖️ Cloud central vs edge: dónde se procesa

| Criterio | Cloud central | Edge computing |
|---|---|---|
| Latencia | Decenas/cientos de ms | **< 10 ms** (milisegundos) |
| Distancia al dato | Lejos (datacenter regional) | Cerca (antena, micro-datacenter) |
| Capacidad de cómputo | Enorme, escalable | Limitada pero suficiente |
| Uso ideal | Big data, backup, análisis masivo | Reacción inmediata, sensores, vehículos |

No compiten: **se complementan**. El edge decide y reacciona; el cloud central acumula y analiza en profundidad. Un semáforo inteligente decide localmente (edge) y sube resúmenes al datacenter (cloud). Lo que cambia es **qué se envía**: en vez de todo el dato crudo, solo lo relevante.

---

## 🧠 Mini-chequeo

1. ¿Por qué IoT obliga a usar IPv6 sí o sí?
2. ¿Qué tecnologías de los puntos 4 y 5 forman el core de 5G?
3. ¿Qué problema resuelve el edge computing respecto a un cloud central lejano?

<details>
<summary>🔄 Respuestas</summary>

1. Porque hay **miles de millones de dispositivos**: IPv4 se agotó y cada sensor necesita su propia dirección. IPv6 da espacio de sobra y autoconfiguración.
2. **SDN** (control centralizado de flujos) y **NFV** (funciones de red del core como software).
3. **Latencia y saturación**: procesar cerca del origen reduce el tráfico hacia el cloud y da respuesta en milisegundos.
</details>

---

## ✅ Resumen en 3 frases

- IoT multiplica los dispositivos y **obliga a IPv6** y a una gestión masiva.
- El **core de 5G se construye sobre SDN + NFV** y permite network slicing.
- **Edge computing** acerca el cómputo al origen para recortar latencia y descargar el cloud central.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| IoT | Internet de las cosas: dispositivos conectados masivos |
| 5G | Red móvil de baja latencia (<1 ms) con core SDN/NFV |
| Edge computing | Cómputo en el borde, cerca de los datos |
| Network slicing | Porciones lógicas de la red con garantías distintas |
| SLAAC | Autoconfiguración de direcciones IPv6 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-cloud-virtualizacion-futuro) · **Anterior:** [06 · Cloud networking](/ApuntesRedes/12-cloud-virtualizacion-futuro/06-cloud-networking) · **Siguiente:** [08 · El futuro de Internet](/ApuntesRedes/12-cloud-virtualizacion-futuro/08-el-futuro-de-internet)