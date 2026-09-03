---
title: 01 — Medios de transmisión
description: Cobre, fibra o aire, elige tu herramienta 🗼
---

<p><small>Cobre, fibra o aire, elige tu herramienta 🗼</small></p>

> 🗺️ **Estás en:** 🔌 **U04 · Infraestructura física** → 01 · Medios de transmisión

---

## 📬 La idea en una frase

> Los datos pueden viajar por **tres medios físicos**: el cobre (cables), la fibra óptica (luz) y el aire (ondas de radio). Cada uno tiene su velocidad, su distancia y su precio, y elegir bien es la primera decisión de todo administrador.

En la [U03](/ApuntesRedes/03-modelos-osi-analisis) viste que la capa 1 del modelo OSI se encarga de transmitir **bits**: series de 1 y 0 que, al final, tienen que atravesar algo físico. Ese "algo" es el medio de transmisión. Y como cada medio tiene sus reglas del juego, esta unidad entera consiste en conocerlas.

---

## 📊 Los tres medios a vista de pájaro

Antes de entrar en detalle, quédate con la tabla que resume toda la unidad:

| Medio | Material | Velocidad típica | Distancia máxima | Coste |
|---|---|---|---|---|
| **Cobre** (UTP/STP) | Hilos de cobre trenzados | 1-10 Gbps | 100 m | Bajo |
| **Fibra óptica** | Vidrio o plástico | 10-400 Gbps | 40+ km | Alto |
| **Aire** (WiFi, radio) | Ondas electromagnéticas | 0,1-9,6 Gbps | Variable (10-100 m) | Medio |

Observa el patrón: **el cobre es barato y corto, la fibra es cara y kilométrica, el aire es flexible pero impredecible.** En los puntos siguientes vas a desmontar cada uno y ver sus tripas.

---

## 🔌 El cobre: el rey de las LAN

El cobre (que en la práctica significa cable UTP o STP) es el medio más usado dentro de un edificio. Sus cartas:

- **Barato** y fácil de conseguir: cualquier ferretería tiene metro a metro.
- **Crimpable por cualquiera**: con una crimpadora y diez minutos, un técnico novato fabrica su latiguillo.
- **Límite de 100 metros**: la señal se atenúa con la distancia, y a partir de ahí los errores se disparan (lo verás en el [punto 7](/ApuntesRedes/04-infraestructura-fisica/07-conceptos-fisicos)).

**¿Cuándo elegirlo?** Cuando necesitas conectar puestos de trabajo, impresoras y switches dentro del mismo edificio: distancias cortas, presupuesto ajustado y mantenimiento sencillo. Es el pan de cada día del cableado horizontal.

---

## 🧪 La fibra óptica: luz con superpoderes

La fibra transmite datos como **pulsos de luz** por un núcleo de vidrio. Si el cobre gana en precio, la fibra gana en casi todo lo demás:

- **Velocidad brutal:** hasta 400 Gbps y más (el cobre se asfixia en 10).
- **Distancia:** kilómetros sin repetidor. El cobre se rinde a los 100 m.
- **Inmunidad electromagnética:** los motores, fluorescentes y cables de corriente no le afectan porque la luz no es electricidad.
- **Seguridad:** interceptar un pulso de luz sin ser detectado es muy difícil.

**¿Cuándo elegirla?** Cuando necesitas enlaces largos (entre edificios, hacia el ISP, en el backbone del datacenter) o cuando el entorno es hostil a las interferencias. El coste (conectores de precisión, herramienta de empalme por fusión) se amortiza cuando la distancia o el caudal lo justifican. Lo verás a fondo en el [punto 5](/ApuntesRedes/04-infraestructura-fisica/05-fibra-optica).

---

## 📶 El aire: cuando el cable no llega

El medio inalámbrico (WiFi, radio) no usa conductor físico: envía ondas electromagnéticas por el aire. Sus reglas son distintas:

- **Sin cables**, lo que da movilidad a portátiles, móviles y visitas sin instalación.
- **Velocidad engañosa:** la teórica (hasta decenas de Gbps en WiFi 7) nunca se alcanza; en la práctica rindes al 30-50%.
- **El canal se comparte:** cuantos más dispositivos, menos ancho de banda para cada uno.
- **Obstrucciones y vecinos:** paredes, muebles y los routers del piso de al lado degradan la señal.

**¿Cuándo elegirlo?** Cuando el cable no llega o no es práctico: zonas de paso, salas de reuniones, clientes móviles. Como regla general, **el WiFi complementa al cable, no lo sustituye**: los puestos fijos y de alta demanda deben ir por cobre. Lo profundizas en el [punto 6](/ApuntesRedes/04-infraestructura-fisica/06-wifi).

---

## 🧭 Cómo decidir, en tres preguntas

Antes de comprar nada, hazte estas tres preguntas:

1. **¿Qué distancia hay?** < 100 m → cobre o WiFi. Entre edificios o kilómetros → fibra.
2. **¿Qué velocidad necesito y de forma continuada?** Cargar archivos gordos siempre → cobre/gigabit o fibra. Navegar y correo → WiFi suficiente.
3. **¿El usuario se mueve?** Sí → WiFi. No → cobre. ¿Hay interferencias electromagnéticas? Muchas → fibra.

> 💡 **La regla de oro:** el cable es la base de todo; el WiFi es la comodidad que se sube encima. Un buen diseño pone a los puestos fijos por cable y reserva el aire para la movilidad.

---

## 🔗 Misma capa, distintos actores

Todos los medios cumplen el mismo papel en el modelo OSI: son la **capa 1**, la que convierte los 1 y 0 en algo físico. Pero cómo lo hacen cambia todo:

| Medio | Cómo transporta un bit | Quién lo modula |
|---|---|---|
| Cobre | Cambios de tensión eléctrica en los hilos | La tarjeta de red (PHY) |
| Fibra | Pulsos de luz encendido/apagado | El láser/LED del transceptor |
| Aire | Variación de ondas de radio | El chip WiFi del router y del cliente |

Aunque el resto del curso (IPs, VLANs, rutas) se comporte igual sobre cualquier medio, los **fallos físicos son distintos por medio**: en cobre, atenuación y diafonía; en fibra, roturas y conectores sucios; en el aire, interferencias y cobertura. Saber *qué medio* falló ya es medio diagnóstico.

---

## 🧠 Mini-chequeo

1. Ordena los tres medios de mayor a menor distancia máxima.
2. Un técnico quiere conectar dos racks del mismo edificio separados 150 metros por un pasillo lleno de motores eléctricos. ¿Qué medio elige y por qué?
3. ¿Cuál es la desventaja principal del aire (WiFi) frente al cobre?

<details>
<summary>🔄 Respuestas</summary>

1. **Fibra (40+ km)** → **aire (10-100 m, variable)** → **cobre (100 m)**. La fibra gana en distancia por paliza.
2. **Fibra óptica**: 150 m supera el límite de 100 m del cobre, y los motores generan interferencias electromagnéticas que a la fibra le dan igual (transmite luz, no electricidad).
3. El **canal compartido y la imprevisibilidad**: la velocidad real cae al 30-50% de la teórica, las obstrucciones atenúan la señal y los vecinos en la misma frecuencia interfieren. El cable, una vez tendido, es estable.
</details>

---

## ✅ Resumen en 3 frases

- Los bits viajan por **cobre** (barato, 100 m), **fibra** (caro, kilómetros, inmune a interferencias) o **aire** (flexible pero con rendimiento real bajo).
- La elección del medio se reduce a **distancia, velocidad y movilidad**.
- Regla de oro: **puestos fijos por cable, movilidad por WiFi**, y fibra siempre que la distancia o el caudal lo exijan.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| UTP / STP | Cable de cobre sin/con apantallamiento |
| Medio de transmisión | El soporte físico por el que viajan los bits |
| Fibra óptica | Medio que transmite luz por vidrio/plástico |
| Aire / inalámbrico | Ondas electromagnéticas sin conductor |
| 100 m | Límite práctico del cobre en Ethernet (atenuación) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/04-infraestructura-fisica) · **Anterior:** [Índice de la unidad](/ApuntesRedes/04-infraestructura-fisica) · **Siguiente:** [02 · El cable UTP](/ApuntesRedes/04-infraestructura-fisica/02-cable-utp)