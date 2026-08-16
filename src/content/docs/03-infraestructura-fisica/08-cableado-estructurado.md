---
title: 08 — Cableado estructurado
description: El edificio cableado como Dios manda, con patch panels y keystones 🏗️
---

<p><small>El edificio cableado como Dios manda, con patch panels y keystones 🏗️</small></p>

> 🗺️ **Estás en:** 🔌 **U03 · Infraestructura física** → 08 · Cableado estructurado

---

## 📬 La idea en una frase

> El **cableado estructurado** es la forma profesional de cablear un edificio: sigue el estándar **TIA/EIA-568** y separa el cable que va empotrado (**cable horizontal**, de los patch panels a los keystones) de los **latiguillos** flexibles que conectan PC y switch. Así, el 90% de los cambios se resuelven moviendo un latiguillo, no el edificio.

Es el broche de la unidad: los conceptos físicos del [punto 7](/ApuntesRedes/03-infraestructura-fisica/07-conceptos-fisicos) y la anatomía del [punto 2](/ApuntesRedes/03-infraestructura-fisica/02-cable-utp) se juntan aquí en un sistema pensado para durar y mantenerse.

---

## 📐 El estándar TIA/EIA-568

Publicado por la TIA y la EIA, **TIA/EIA-568** define cómo se debe cablear un edificio para que funcione con cualquier equipo de cualquier marca. Sus claves:

- **Categorías y distancias**: establece los límites (Cat6, 100 m de cable horizontal) que aseguran rendimiento certificable.
- **Topología en estrella**: cada toma de red llega a un punto de concentración central (el patch panel), nada de "cadena" de enchufes.
- **Componentes estandarizados**: latiguillos, keystones, patch panels y cables horizontales con interfaces comunes (RJ45).
- **Certificación**: una instalación bien hecha puede certificarse para su categoría; una chapuza, no.

---

## 🗺️ El recorrido completo de la señal

Del puerto del PC al puerto del switch median **dos latiguillos** (flexibles) y **un tramo fijo** (el cable empotrado):

```
[PC] ←→ [Latiguillo] ←→ [Keystone/Roseta] ←→ [Cable horizontal] ←→ [Patch panel] ←→ [Latiguillo] ←→ [Switch]
                              (pared)                (empotrado)            (rack)            (rack)
```

En cristiano: el PC se enchufa a la **roseta de pared** con un latiguillo corto. Detrás de la pared, el **cable horizontal** viaja hasta el rack, donde termina en un **patch panel**. Del patch panel al switch te lo une otro latiguillo. Cambiar de puerto del switch = cambiar un latiguillo del rack, sin tocar obra.

---

## 🧩 Los cuatro elementos

| Elemento | Qué es | Dónde vive | Detalles |
|---|---|---|---|
| **Latiguillo (patch cord)** | Cable flexible de 1-5 m | Del PC al keystone y del patch panel al switch | Se compra hecho o se [crimpa](/ApuntesRedes/03-infraestructura-fisica/04-crimpado-y-comprobacion); es la pieza que más se estropea |
| **Keystone** | Conector hembra RJ45 | La roseta de pared | Donde termina el cable horizontal en el puesto |
| **Patch panel** | Panel con 12-48 puertos RJ45 | El rack | Concentra todos los cables horizontales del edificio |
| **Cable horizontal** | UTP sólido (no flexible) | Empotrado: paredes, falsos techos | Va del patch panel al keystone; no se toca nunca |

> 💡 **Por qué el cable horizontal es sólido y el latiguillo flexible:** el cable sólido aguanta mejor en la pared y tiene mejor rendimiento a igual categoría; el latiguillo necesita flexibilidad para sobrevivir al roce. Usar cable flexible como horizontal es un fallo de instalador novato.

---

## ✅ Ventajas de hacerlo bien

| Ventaja | Qué ganas |
|---|---|
| **Organización** | Cada toma de red está identificada y etiquetada: sabes qué cable lleva a qué roseta |
| **Flexibilidad** | Cambiar un PC de ubicación requiere solo un latiguillo nuevo, no tocar obra |
| **Mantenimiento** | El cable horizontal fijo rara vez se estropea; los latiguillos se cambian en segundos |
| **Certificación** | Se puede certificar que la instalación cumple la categoría (Cat6, etc.) |
| **Coste a largo plazo** | Obra una vez, cambios ilimitados: el ahorro aparece en el segundo año |

---

## 🗂️ Reglas de etiquetado y documentación

El cableado estructurado se siente a medias si no se documenta. Tres hábitos que separan al aficionado del profesional:

- **Cada puerto etiquetado en ambos extremos:** el keystone del despacho R-3-14 debe corresponder exactamente al puerto 14 del patch panel del rack (misma etiqueta en los dos lados).
- **Un esquema de racks actualizado:** quién va en cada patch panel, qué switch alimenta cada panel, y qué va al core. Cuando hay que cambiar un puerto, el esquema lo dice en cinco segundos.
- **Números, no colores improvisados:** conviene un criterio fijo (planta-número) en vez de "el verde es del pasillo". La documentación es el activo que se agradece a los tres años, no el primer día.

> 💡 **La prueba del algodón:** si un cable suelto en un piso sin etiquetar te obliga a hacer la prueba de conectar-desenchufar para saber de dónde viene, el cableado "estructurado" de tu edificio solo lo es de nombre.

---

## 📈 El cableado estructurado vs la chapuza

¿Por qué no basta con "tirar cables largos" de un PC a otro sin tanta ceremonia? Haz la cuenta de cinco años:

| Aspecto | Cableado impro (directo a switch) | Cableado estructurado |
|---|---|---|
| Cambio de mesa | Rehacer tramos, pelar, crimpar, tiempo | Mover un latiguillo: 2 minutos |
| Fallo detectado | "No sé qué cable es este" | Puertos etiquetados y localizables |
| Ampliación | Hay que abrir paredes otra vez | El cable horizontal ya está → solo latiguillos y puerto libre |
| Crecimiento ordenado | Mar de cables en el rack | Patch panels y etiquetas: todo en su sitio |
| Certificación | Imposible | Ruta clara para certificar categoría |

La inversión extra del cableado estructurado se paga en la **primera mudanza de mesa** y se multiplica con cada cambio posterior. Y el rack sigue siendo afición limpia, que también cuenta.

---

## 🧠 Mini-chequeo

1. Enumera los 4 componentes que separan un PC de un switch en cableado estructurado.
2. Un usuario cambia de mesa en la misma oficina. ¿Qué hay que tocar físicamente? ¿Por qué?
3. ¿Por qué el estándar TIA/EIA-568 define una topología en estrella?

<details>
<summary>🔄 Respuestas</summary>

1. **Latiguillo** (PC → keystone), **keystone/roseta**, **cable horizontal** (empotrado), **patch panel** y otro **latiguillo** (patch panel → switch).
2. Solo **moverse con un latiguillo nuevo** en el mismo punto de red, y si cambia de roseta, cambiar el latiguillo del patch panel al puerto correspondiente. La obra (cable horizontal) queda intacta: esa es la ventaja de separar lo fijo de lo flexible.
3. En estrella cada toma llega directamente a su patch panel: **fácil de etiquetar, fácil de diagnosticar y fácil de ampliar**. Las topologías en cadena o bus (como en los hub antiguos) son un dolor para localizar fallos.
</details>

---

## ✅ Resumen en 3 frases

- El cableado estructurado (**TIA/EIA-568**) separa el **cable horizontal empotrado** de los **latiguillos flexibles**, con keystones y patch panels como punto de conexión.
- En estrella, cada puesto llega a su patch panel: etiquetado, fácil diagnóstico y cambios sin tocar obra.
- Su ventaja no es solo el cable: es **flexibilidad, mantenimiento y certificación** a lo largo de la vida del edificio.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Cableado estructurado | Cableado profesional según TIA/EIA-568 |
| Cable horizontal | Cable sólido empotrado (patch panel ↔ keystone) |
| Latiguillo | Cable flexible de 1-5 m en los extremos |
| Keystone / Roseta | Conector hembra RJ45 en la pared |
| Patch panel | Concentrador RJ45 en el rack (12-48 puertos) |
| Etiquetado | Identificar puertos con el mismo código en ambos extremos |
| TIA/EIA-568 | Estándar que define el cableado estructurado |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-infraestructura-fisica) · **Anterior:** [07 · Conceptos físicos clave](/ApuntesRedes/03-infraestructura-fisica/07-conceptos-fisicos) · **Siguiente:** [09 · Cierre: consolida lo aprendido](/ApuntesRedes/03-infraestructura-fisica/09-cierre)