---
title: Medios de transmisión y cableado
description: Donde todo viaje empieza por un cable 📡
---

<p><small>Donde todo viaje empieza por un cable 📡</small></p>

> 🗺️ **El mapa del curso:** 🚪 Introducción → **📡 AQUÍ ESTÁS** → 🧮 IP → 🔀 Switching

---

*Antes de cualquier IP, antes de cualquier VLAN, hay alguien que convierte un 1 binario en un pulso eléctrico, un destello de luz o una onda de radio. Y alguien más tiene que garantizar que ese 1 llegue entero a su destino, sin que una silla lo pise ni un motor eléctrico le susurre tonterías. Ese alguien es la capa física, y este es su manual.*

Bienvenido a la primera unidad de contenidos. Aquí estudias el mundo físico que sostiene todo lo demás: los medios guiados (cobre, coaxial, fibra) y no guiados (radio), las normas de cableado, cómo se crimpa un RJ45, cómo se organiza el cableado de un edificio y cómo se dibuja una red antes de tenderla. Todo lo que viaja por un cable —o por el aire— empieza aquí.

Esta unidad son 9 puntos: 8 de teoría en progresión y el 9º, aterrizaje práctico.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Comparar los medios de transmisión (cobre, coaxial, fibra, aire) por velocidad, distancia, coste e inmunidad.
- Explicar la estructura del cable UTP, las categorías y el papel del trenzado.
- Diferenciar cable directo, cruzado y de consola, y conocer los pinouts T568A/B.
- Crimpar y comprobar un cable con tester, diagnosticando fallos típicos (split pair, par muerto).
- Elegir entre fibra monomodo y multimodo según distancia y presupuesto.
- Aplicar conceptos físicos clave: atenuación, diafonía, anchura de banda vs velocidad.
- Diseñar el cableado estructurado de un edificio (TIA/EIA-568): rack, patch panel, horizontal.
- Dibujar y comparar las topologías de red (punto a punto, bus, anillo, estrella, malla e híbrida) eligiendo la adecuada según escala, coste y tolerancia a fallos.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Medios de transmisión](/ApuntesRedes/02-medios-y-cableado/01-medios-de-transmision) | Cobre, coaxial, fibra y aire a vista de pájaro | Todos |
| [02 · El cable UTP](/ApuntesRedes/02-medios-y-cableado/02-cable-utp) | Categorías, pares y trenzado | Todos |
| [03 · Directo, cruzado y consola](/ApuntesRedes/02-medios-y-cableado/03-directo-cruzado-consola) | Pinouts T568A/B y cuándo usar cada cable | Todos |
| [04 · Crimpado y comprobación](/ApuntesRedes/02-medios-y-cableado/04-crimpado-y-comprobacion) | El laboratorio real: crimpar y tester | Práctico |
| [05 · Fibra óptica](/ApuntesRedes/02-medios-y-cableado/05-fibra-optica) | Monomodo vs multimodo, conectores y usos | Todos |
| [06 · Conceptos físicos clave](/ApuntesRedes/02-medios-y-cableado/06-conceptos-fisicos) | Atenuación, diafonía, Mbps vs MHz | Clave |
| [07 · Cableado estructurado](/ApuntesRedes/02-medios-y-cableado/07-cableado-estructurado) | TIA/EIA-568: rack, patch panel, horizontal | Todos |
| [08 · Topologías de red](/ApuntesRedes/02-medios-y-cableado/08-topologias-de-red) | Punto a punto, bus, anillo, estrella, malla e híbrida | Todos |
| [09 · Cierre](/ApuntesRedes/02-medios-y-cableado/09-cierre) | Sé el Bit, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: mira 1-2 resueltos para coger el formato, luego intenta el por-resolver; consulta el resuelto solo cuando te atasques.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u02-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u02-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u02-avanzado" class="elink">⭐ Avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u02-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA1/RA2)

| CE | Criterio | Dónde se cubre |
|---|---|---|
| RA1·b) | Medios de transmisión | ✅ Puntos 1, 2 y 5 |
| RA2·a) | Estándares para redes cableadas | ✅ Puntos 2-3 y 7 |
| RA2·b) | Montaje de cables | ✅ Punto 4 + ⚡ Laboratorio (punto 9) |
| RA2·c) | Comprobadores de conectividad | ✅ Puntos 4 y 6 |
| RA1·d) | Trama y encapsulación Ethernet | → Se verá en la unidad de capa de enlace y trama |
| RA2·d) | Direccionamiento lógico IP | → Se verá en la unidad de dirección IP |
| RA2·e) | Adaptadores de red | → Se verá en dirección IP y en redes inalámbricas |
| RA2·f) | Integración de dispositivos | ✅ Cableado estructurado (punto 7) + ⚡ Laboratorio (punto 9) |

---

## 🚪 ¿Por dónde empiezo?

- ¿Vienes de la unidad anterior? Perfecto: ahí viste el mapa; aquí empieza el viaje de verdad.
- ¿Ya crimpeas cables? Salta a la [fibra óptica](/ApuntesRedes/02-medios-y-cableado/05-fibra-optica) y a los [conceptos físicos](/ApuntesRedes/02-medios-y-cableado/06-conceptos-fisicos), lo más "examen" de la unidad.

**📍 Primer punto:** [01 · Medios de transmisión](/ApuntesRedes/02-medios-y-cableado/01-medios-de-transmision)  
**⏭️ Al acabar la unidad, continúa en [Capa de enlace y trama Ethernet](/ApuntesRedes/03-capa-de-enlace).**
