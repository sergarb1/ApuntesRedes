---
title: 05 — Fibra óptica
description: La luz que se ríe de los 100 metros y de la interferencia ✨
---

<p><small>La luz que se ríe de los 100 metros y de la interferencia ✨</small></p>

> 🗺️ **Estás en:** 🔌 **U03 · Infraestructura física** → 05 · Fibra óptica

---

## 📬 La idea en una frase

> La fibra óptica transmite datos como **pulsos de luz** por un núcleo de vidrio. Es más cara y delicada que el cobre, pero gana en velocidad, distancia e inmunidad a las interferencias electromagnéticas. La diferencia entre **monomodo y multimodo** decide qué fibra compras.

En el [punto 1](/ApuntesRedes/03-infraestructura-fisica/01-medios-de-transmision) viste la tabla que la presentaba como "cara y kilométrica". Aquí toca el detalle fino: por qué, y cuándo justifica su precio.

---

## 💪 Ventajas frente al cobre

| Ventaja | Qué significa en la práctica |
|---|---|
| **Mayor velocidad** | Hasta 400 Gbps y más; el cobre se asfixia en 10 |
| **Mayor distancia** | Kilómetros sin repetidor; el cobre muere a 100 m |
| **Inmunidad electromagnética** | Motores, fluorescentes, rayos: a la luz le da igual |
| **Seguridad** | Interceptar un pulso de luz sin ser detectado es muy difícil |
| **Peso y envergadura** | Lleva mucha más capacidad en un cable más fino |

La contrapartida: **coste**. Conectores de precisión, herramienta de empalme (fusion splicer) y mano de obra especializada. Por eso la fibra se reserva para los enlaces que lo merecen.

---

## ⚖️ Monomodo (SMF) vs Multimodo (MMF)

La pregunta estrella de la fibra: ¿qué fibra necesito?

| Característica | Monomodo (SMF) | Multimodo (MMF) |
|---|---|---|
| Núcleo | 9 µm (muy fino) | 50-62.5 µm (más grueso) |
| Fuente de luz | Láser | LED |
| Distancia máx | 40+ km | 550 m (a 10 Gbps) |
| Coste | Más caro (láser + conectores de precisión) | Más barato |
| Uso típico | WAN, ISP, larga distancia | LAN, datacenter, campus |

> 💡 **La regla mental:** **campus → multimodo; ciudad/campo → monomodo.** Si la distancia cabe en 550 m, la multimodo (OM3/OM4) es la opción barata y sensata. Si hablamos de kilómetros entre edificios o hacia el ISP, la monomodo (OS2) no tiene rival.

---

## 🔌 Conectores de fibra

La fibra se termina con conectores de precisión (los de empalme por fusión o los mecánicos). Los cuatro que verás en cualquier rack:

| Conector | Tipo | Uso |
|---|---|---|
| **LC** | Pequeño, push-pull | Estándar en datacenters y SFP |
| **SC** | Cuadrado, push-pull | Redes de telecomunicaciones |
| **ST** | Redondo, bayoneta | Redes legacy |
| **FC** | Rosca | Entornos de vibración |

> ⚠️ **Dato práctico:** el conector **LC es el rey hoy** por encajar en los módulos SFP. Si memorizas uno, que sea ese.

---

## 🧩 SFP: el puerto que cambia de piel

Un **SFP** (*Small Form-factor Pluggable*) es un módulo intercambiable que se inserta en el puerto SFP de un switch y le da el **medio físico** que elijas: cobre o fibra, según el módulo que pongas. Es la magia de que un mismo puerto valga para todo:

| Módulo SFP | Medio | Conector | Alcance típico |
|---|---|---|---|
| **1000Base-T** | Cobre (UTP) | RJ45 | 100 m |
| **1000Base-LX** | Fibra monomodo/MMF | LC | hasta 10 km |

En cristiano: si mañana te falta un puerto RJ45, pones un **1000Base-T**; si necesitas sacar la fibra al edificio de al lado, cambias de módulo y listo. Ningún otro componente de la red se adapta tan bien al capricho del cableado.

---

## 🏷️ Clases de fibra: las siglas OM y OS

En las cajas de bobinas verás tres letras: **OM** (*Optical Multimode*) u **OS** (*Optical Single*). Saber leerlas ahorra comprar la fibra equivocada:

| Clase | Tipo | Caudal y distancia típicos |
|---|---|---|
| OM1 / OM2 | Multimodo antiguo | 62.5 / 50 µm, 1 Gbps hasta 200-550 m según la clase |
| OM3 | Multimodo (láser optimizado) | 10 Gbps hasta 300 m (el estándar de los campus modernos) |
| OM4 | Multimodo (láser optimizado) | 10 Gbps hasta 550 m (datacenter y campus) |
| OS1 / OS2 | Monomodo | 10-400 Gbps, distancias de kilómetros (WAN, ISP) |

> 💡 **Truco de compra:** para un campus actual pide **OM4** (550 m a 10 Gbps) si la distancia lo permite, y **OS2** cuando toque ir "lejos". Todo lo demás son clases con migas o legacy.

---

## 🧠 Mini-chequeo

1. ¿Cuál es la diferencia principal entre monomodo y multimodo? ¿En qué unidades de distancia se usa cada una?
2. Un técnico conecta dos edificios separados 2 km. ¿Qué fibra elige y qué conector estándar usaría?
3. Explica con un ejemplo la ventaja de los módulos SFP.

<details>
<summary>🔄 Respuestas</summary>

1. **Monomodo** tiene núcleo fino (9 µm), usa láser y llega a 40+ km (WAN, ISP). **Multimodo** tiene núcleo grueso (50-62.5 µm), usa LED y llega a 550 m a 10 Gbps (LAN, datacenter, campus).
2. **Fibra monomodo (OS2)**, porque 2 km superan con creces los 550 m de la multimodo. El conector estándar sería **LC** (el habitual para módulos SFP).
3. Sin cambiar de switch, un puerto SFP puede servir **1000Base-T** (cobre, RJ45, 100 m) o **1000Base-LX** (fibra, LC, kilómetros): solo cambias el módulo según el medio que necesites.
</details>

---

## ✅ Resumen en 3 frases

- La fibra gana en **velocidad, distancia e inmunidad a interferencias**, a cambio de coste y delicadeza.
- **Multimodo** para dentro del campus (≤550 m) y la barata; **monomodo** para kilómetros (WAN/ISP) y la que toca el largo plazo.
- Los **SFP** hacen que un mismo puerto de switch sea de cobre o de fibra según el módulo: flexibilidad que el cobre no tiene.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Fibra SMF / MMF | Monomodo (9 µm, láser, km) / Multimodo (50-62.5 µm, LED, 550 m) |
| Fusion splicer | Máquina que empalma fibras fundiendo el vidrio |
| Conector LC | Pequeño, push-pull, estándar en SFP |
| SFP | Módulo intercambiable que fija el medio del puerto |
| Láser / LED | Fuentes de luz de monomodo y multimodo |
| OM3 / OM4 | Multimodo optimizada para láser (550 m a 10 Gbps) |
| OS2 | Monomodo para largas distancias (WAN, ISP) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-infraestructura-fisica) · **Anterior:** [04 · Crimpado y comprobación](/ApuntesRedes/03-infraestructura-fisica/04-crimpado-y-comprobacion) · **Siguiente:** [06 · WiFi](/ApuntesRedes/03-infraestructura-fisica/06-wifi)