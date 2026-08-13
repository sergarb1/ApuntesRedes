---
title: 06 — WiFi
description: El aire que promete y luego entrega a medias 📶
---

<p><small>El aire que promete y luego entrega a medias 📶</small></p>

> 🗺️ **Estás en:** 🔌 **U03 · Infraestructura física** → 06 · WiFi

---

## 📬 La idea en una frase

> WiFi es el **medio inalámbrico** que sigue la familia de estándares **IEEE 802.11**. Evoluciona a pasos agigantados (WiFi 4 → WiFi 7), pero sus reglas físicas son tozudas: la velocidad real ronda el **30-50% de la teórica**, y el canal se comparte entre todos los dispositivos.

En el [punto 1](/ApuntesRedes/03-infraestructura-fisica/01-medios-de-transmision) lo presentaste como "flexible pero impredecible". Aquí vas a entender por qué con exactitud — y cómo no dejarte engañar por la pegatina de la caja.

---

## 📶 La familia 802.11: de WiFi 4 a WiFi 7

Los estándares se fueron sobreponiendo, cada uno más rápido, más banda o con mejor tecnología:

| Estándar | Nombre comercial | Banda | Velocidad máxima teórica | Año |
|---|---|---|---|---|
| **802.11n** | WiFi 4 | 2.4 + 5 GHz | 600 Mbps | 2009 |
| **802.11ac** | WiFi 5 | 5 GHz | 3.5 Gbps | 2014 |
| **802.11ax** | WiFi 6 | 2.4 + 5 GHz | 9.6 Gbps | 2019 |
| **802.11be** | WiFi 7 | 2.4 + 5 + 6 GHz | 46 Gbps | 2024 |

Dos bandas y sus caracteres:

- **2.4 GHz**: llega más lejos y atraviesa mejor las paredes, pero es la banda saturada (microondas, Bluetooth, los routers de los vecinos). Más alcance, más interferencia.
- **5 GHz** (y 6 GHz en WiFi 7): más veloz y limpia, pero se atenúa más con las paredes. Menor alcance, mejor calidad.

> 💡 **El nombre comercial es tu amigo:** "WiFi 6" o "WiFi 7" vende más que "802.11ax". En cualquier producto real fíjate en ambos: el estándar y la generación.

---

## ⚠️ Las 4 verdades incómodas del WiFi

La velocidad de la pegatina es ficticia. Estas son las razones:

**1. El 30-50% real.** La velocidad máxima teórica se calcula en condiciones de laboratorio (antenas 4x4, encauzamiento espacial, sin vecinos). En la realidad, el **overhead** (ACKs, beacons, gestión) y el entorno te dejan con un tercio o la mitad.

**2. Las obstrucciones atenúan.** Paredes, muebles y cristal debilitan la señal con la distancia: es **atenuación**, la misma del [punto 7](/ApuntesRedes/03-infraestructura-fisica/07-conceptos-fisicos). A más lejos y más paredes, menos rendimiento.

**3. El canal es compartido.** Todos los dispositivos de un AP se reparten el mismo ancho de banda (con *time division* y acceso por contienda). 20 portátiles = 20 trocitos del mismo pastel. Los puestos fijos que necesitan caudal no deberían vivir en WiFi.

**4. La interferencia de los vecinos.** Radiadores, microondas, y sobre todo las redes WiFi del piso de al lado, pisando el mismo canal. Cuantos más APs en el canal, peor para todos (los canales 1, 6 y 11 son los que no se solapan en 2.4 GHz).

---

## 🛡️ WiFi vs cable: quién manda y cuándo

| Criterio | Gana |
|---|---|
| Velocidad y estabilidad | 🏆 Cable |
| Movilidad | 🏆 WiFi |
| Seguridad (menos superficie de ataque) | 🏆 Cable |
| Coste de instalación | 🏆 Empate: cable para puestos fijos, WiFi para zonas de paso |
| Zonas sin cable posible | 🏆 WiFi (aire) |

> 💡 **La regla profesional:** el puesto fijo que necesita rendimiento → **cable**. La sala de reuniones, la cafetería y los portátiles de visita → **WiFi**. El buen diseño no "elige"; **combina ambos** según la zona.

---

## 🗺️ Canales: el mapa de la contaminación

En la banda de 2.4 GHz hay 14 canales (en Europa, del 1 al 13), pero no son independientes: cada uno ocupa 22 MHz, con solapamiento. La consecuencia práctica es que **solo 3 canales no se estorban entre sí: el 1, el 6 y el 11**.

```
Canal 1:  ▓▓▓░░░░░░░░░░░░░░░░░░░░░
Canal 6:  ░░░░░▓▓▓░░░░░░░░░░░░░░░
Canal 11: ░░░░░░░░░░▓▓▓░░░░░░░░░
(solapamientos: 1-2-3 … 1 es amigo de 11, enemigo de 5)
```

- El **canal sí importa** cuando hay vecinos: dos redes en el canal 6 se pisan; una en el 1 y otra en el 11 conviven.
- Elegir el canal menos saturado es la primera y más barata mejora de WiFi del mundo, antes que comprar otro AP.

> ⚠️ **El mito del "canal automático":** muchos routers lo eligen al encenderse y luego no vuelven a mirar. Si tus vecinos también tienen "auto", todos acaban juntos. Un administrador revisa los canales de sus APs de vez en cuando.

---

## 🧠 Mini-chequeo

1. ¿Qué diferencia práctica hay entre la banda de 2.4 GHz y la de 5 GHz?
2. Un AP anuncia 9.6 Gbps (WiFi 6). ¿Qué velocidad real esperas para un cliente y por qué?
3. ¿Por qué "más dispositivos conectados" degrada la velocidad de todos?

<details>
<summary>🔄 Respuestas</summary>

1. **2.4 GHz** llega más lejos y atraviesa mejor las paredes pero está saturada (más interferencias). **5 GHz** es más rápida y limpia pero se atenúa más con las obstrucciones. 6 GHz (WiFi 7) va un paso más allá en velocidad y limpieza.
2. **En torno a 1/3 o la mitad, ~3-5 Gbps de sobra en condiciones normales** (e incluso menos con muchos clientes): el 30-50% de la teórica es la regla por overhead, obstrucciones y canal compartido.
3. Porque en WiFi el **canal es un recurso compartido**: todos los clientes de un AP se reparten el mismo ancho de banda por contienda y multiplexación temporal. Más clientes = porciones más pequeñas.
</details>

---

## ✅ Resumen en 3 frases

- La familia **802.11** va de WiFi 4 (600 Mbps) a WiFi 7 (46 Gbps), con bandas distintas para alcance o velocidad.
- El **30-50% de velocidad real, las obstrucciones, el canal compartido y la interferencia de vecinos** son las cuatro leyes del WiFi.
- Regla de diseño: **cable para rendimiento, WiFi para movilidad** — y saber que el aire nunca sustituye del todo al cobre.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| 802.11 | Familia de estándares WiFi (n/ac/ax/be) |
| AP / Router WiFi | Punto de acceso que reparte la señal inalámbrica |
| Canal | Frecuencia concreta donde opera la red (1, 6, 11 no solapan en 2.4 GHz) |
| Banda | Rango de frecuencia (2.4 GHz, 5 GHz, 6 GHz) |
| Rendimiento real | El 30-50% de la teórica en condiciones reales |
| Band-steering | Llevar al cliente a la banda (y al AP) con mejor señal |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-infraestructura-fisica) · **Anterior:** [05 · Fibra óptica](/ApuntesRedes/03-infraestructura-fisica/05-fibra-optica) · **Siguiente:** [07 · Conceptos físicos clave](/ApuntesRedes/03-infraestructura-fisica/07-conceptos-fisicos)