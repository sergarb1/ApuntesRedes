---
title: 03 — Estándares 802.11
description: De los 11 Mbps aburridos a los 46 Gbps prometidos 🚀
---

<p><small>De los 11 Mbps aburridos a los 46 Gbps prometidos 🚀</small></p>

> 🗺️ **Estás en:** 📶 **UD11 · Redes inalámbricas** → 03 · Estándares 802.11

---

## 📬 La idea en una frase

> La familia **802.11** ha pasado de 2 Mbps (1997) a los prometidos 46 Gbps de WiFi 7; cada generación añade técnicas para usar mejor el espectro, y tu trabajo como administrador es saber qué soporta cada cliente y qué esperar (y qué no) de la pegatina de la caja.

---

## 🚗 La familia 802.11, generación a generación

| Estándar | Nombre comercial | Año | Banda | Teórica | Idea clave |
|---|---|---|---|---|---|
| 802.11 (legacy) | — | 1997 | 2,4 | 2 Mbps | El abuelo; solo de museo |
| 802.11b | WiFi 1 | 1999 | 2,4 | 11 Mbps | Primera explosión de popularidad |
| 802.11a | WiFi 2 | 1999 | 5 GHz | 54 Mbps | Pionero en 5 GHz, poco despliegue |
| 802.11g | WiFi 3 | 2003 | 2,4 | 54 Mbps | 54 Mbps sobre 2,4 GHz |
| **802.11n** | **WiFi 4** | 2009 | 2,4 + 5 | 600 Mbps | MIMO, 40 MHz, 2 flujos espaciales |
| **802.11ac** | **WiFi 5** | 2014 | 5 GHz | 3,5 Gbps | Canales de 80/160 MHz, MU-MIMO downlink |
| **802.11ax** | **WiFi 6/6E** | 2019/2021 | 2,4 + 5 (+6) | 9,6 Gbps | OFDMA, BSS Coloring, eficiencia con muchos clientes |
| **802.11be** | **WiFi 7** | 2024 | 2,4 + 5 + 6 | 46 Gbps | 320 MHz, MLO (multi-enlace), 4K-QAM |

Dos apuntes prácticos:

- **WiFi 6E** = WiFi 6 + acceso a la banda de 6 GHz (la "E" de *extended*). En Europa se desplegó progresivamente según la regulación de cada país.
- El nombre comercial es tu amigo: "WiFi 6" vende más que "802.11ax", y en catálogos verás ambos. En las especificaciones de material de red, siempre aparece el estándar.

---

## 🧠 Las técnicas que hay detrás de los números

Los saltos de velocidad no son magia: son técnicas concretas que conviene reconocer:

| Técnica | Qué hace | Dónde brilla |
|---|---|---|
| **MIMO / flujos espaciales** | Varias antenas emiten en paralelo "por el mismo canal" | WiFi 4 en adelante: velocidad × nº de flujos |
| **Canales de 40/80/160 MHz** | Ensancha el canal como una autopista | WiFi 4/5/6; con canales anchos, menos red para todos |
| **MU-MIMO** | El AP habla a varios clientes a la vez | WiFi 5 (solo downlink) y WiFi 6 (bidireccional) |
| **OFDMA** | Divide el canal en subcanales para clientes pequeños (IoT) | WiFi 6: la gran mejora en oficinas llenas |
| **BSS Coloring** | Etiqueta las tramas de redes vecinas y las ignora antes de colisionar | WiFi 6 en entornos densos |
| **TWT** (Target Wake Time) | Acuerda con el cliente cuándo despertar | WiFi 6: ahorro de batería en IoT |
| **MLO** | Un cliente usa dos bandas a la vez (5 + 6 GHz) | WiFi 7: latencia y fiabilidad |

> 💡 **La regla de lectura de la pegatina:** "AX3000" = WiFi 6 (AX) y 3000 Mbps sumando todas las radios y flujos del AP. Tu móvil no recibirá eso: son las radios del AP sumadas, no la velocidad a un cliente.

---

## 🎯 ¿Qué estándar elegir?

| Escenario | Recomendación | Por qué |
|---|---|---|
| Aula con 30 portátiles antiguos | WiFi 5 como suelo | WiFi 4 se ahoga con el canal compartido; el WiFi 5 en 5 GHz da aire |
| Oficina con IoT masivo (sensores, lectores) | WiFi 6/6E | OFDMA y TWT nacieron para eso |
| Casa / PYME sencilla | WiFi 6 actual | Precio-rendimiento razonable, 2,4 + 5 GHz |
| Enlace exterior punto a punto | 5 GHz (WiFi 5/6 hardware) | Menos interferencias, más canales, mejor para direccional |
| Nueva inversión de gran escala | WiFi 6E/7 | 6 GHz limpia y preparada para 5+ años |

> ⚠️ **Ojo con las realidades del despliegue:** el estándar del AP no sirve de nada si los clientes no lo soportan. Una red "WiFi 6" con clientes WiFi 4 se comporta como WiFi 4 con buen hardware. Planifica según **tu parque de clientes**, no según el folleto.

---

## 🧠 Mini-chequeo

1. ¿Qué dos técnicas definen el salto de WiFi 5 a WiFi 6 y qué problema de las oficinas llenas resuelven?
2. Un AP vende "AX5400". ¿Tu portátil llegará a 5400 Mbps? ¿Por qué?
3. ¿Por qué WiFi 5 solo usa 5 GHz y por qué eso importa al mezclar dispositivos viejos?

<details>
<summary>🔄 Respuestas</summary>

1. **OFDMA** (subcanales para clientes pequeños) y **BSS Coloring** (ignorar tramas vecinas): ambas atacan la ineficiencia del canal compartido cuando hay muchos clientes, no solo el pico de velocidad.
2. **No.** Son las radios del AP sumadas (bandas × flujos × anchos de canal). Un cliente real alcanza una fracción según su propio número de antenas, el ancho negociado y el entorno.
3. Porque no soporta 2,4 GHz. En la práctica: los dispositivos solo-2,4 (IoT viejo, muchos sensores) necesitan un AP WiFi 4/6 para esa banda, o no conectan.
</details>

---

## ✅ Resumen en 3 frases

- **802.11** va del legacy (2 Mbps) a WiFi 7 (46 Gbps teóricos); cada generación añade técnicas de eficiencia, no solo velocidad.
- MIMO, canales anchos, **OFDMA** y **BSS Coloring** son las palabras clave que definen cada salto.
- El estándar se elige según el **parque de clientes** y el escenario; la pegatina del AP es marketing sumado.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| MIMO | Múltiples antenas/flujos espaciales en paralelo |
| OFDMA | Reparte el canal en subcanales por cliente (WiFi 6) |
| MU-MIMO | AP habla a varios clientes simultáneamente |
| TWT | Acuerdo de despertar para ahorrar batería (IoT) |
| MLO | Uso simultáneo de dos bandas (WiFi 7) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-redes-inalambricas) · **Anterior:** [02 · Medios y antenas](/ApuntesRedes/11-redes-inalambricas/02-medios-inalambricos) · **Siguiente:** [04 · Topologías y modos de trabajo](/ApuntesRedes/11-redes-inalambricas/04-topologias)
