---
title: 05 — Cobertura y diseño
description: Dónde poner cada AP y en qué canal 📐
---

<p><small>Dónde poner cada AP y en qué canal 📐</small></p>

> 🗺️ **Estás en:** 📶 **UD11 · Redes inalámbricas** → 05 · Cobertura y diseño

---

## 📬 La idea en una frase

> Diseñar una WLAN es decidir **dónde va cada AP, en qué canal y con cuánta potencia** para que todo el suelo tenga buena señal, los vecinos no se pisen y la red aguante el número real de clientes; el método se llama site survey, y las alternativas improvisadas se pagan en incidencias.

---

## 🎯 Los tres objetivos del diseño

1. **Cobertura:** señal suficiente (≥ −67 dBm para voz/vídeo, ≥ −70 para datos) en cada punto útil.
2. **Capacidad:** suficiente tiempo de aire para los clientes que habrá *en cada zona*, no en la planta entera.
3. **Interferencia mínima:** canales alternos entre APs vecinos, potencia ajustada, cero puntos de señal fuerte que se pisen.

Un diseño que solo persigue cobertura (APs a tope de potencia, todos al mismo canal) consigue "tres barras en todas partes" y una red que va lenta en todas partes. La capacidad y el plan de canales son la mitad del trabajo.

---

## 📏 Reglas de colocación con sentido

| Regla | Motivo físico |
|---|---|
| APs **en el techo**, mirando abajo | El plano de cobertura es un cono; en una estantería cubres media oficina |
| **Celdas solapadas 15-20 %** en un ESS | Para que el roaming no tenga agujeros |
| **Canales alternos** entre vecinos (1-6-11) | Evitar interferencia co-canal |
| **Bajar potencia antes que añadir APs sin medir** | Potencia excesiva = celdas que se pisan = ruido |
| **Evitar metal, tubos de agua y ascensores** | Atenuación y reflexiones |
| Antena **perpendicular a la planta** cubre dos pisos mal | El donut de la antena omni es plano |

Y dos consejos que parecen obvios pero se olvidan:

- **Piensa en los clientes, no en los metros cuadrados.** Un aula con 30 portátiles necesita "capacidad" (un AP cerca, aunque la señal llegue desde otro lado); un pasillo necesita solo "cobertura".
- **Dibuja el plan antes de taladrar.** Plano en mano, marca tomas de corriente, canaletas, destino del cable hasta el switch y el radio estimado real (no el de la caja).

---

## 🗺️ El plan de canales, en un plano

Para una planta rectangular con tres APs (supón pasillo central y aulas a ambos lados):

```
  ┌──────────────────────────────────────────┐
  │  Aula 1        Aula 2         Aula 3     │
  │  [AP-1]        [AP-2]        [AP-3]      │
  │  canal 1       canal 6       canal 11    │
  ├────────── pasillo ───────────────────────┤
  │  Aula 4        Aula 5         Aula 6     │
  │  (recibe       (recibe        (recibe    │
  │   de AP-1)      de AP-2)       de AP-3)  │
  └──────────────────────────────────────────┘
```

Cada AP en un canal no solapado, potencias moderadas, solapamiento en el pasillo para el roaming. En 5 GHz el patrón se repite con canales de 20/40 MHz alternos. Los controladores y los APs modernos tienen **RRM** (Radio Resource Management) para automatizar canales y potencias; aun así, un administrador revisa que la automatización no haya metido los tres APs en el mismo canal "porque hoy toca".

---

## 🕵️ Site survey: medir antes de prometer

El **site survey** es la medición real del emplazamiento. Dos variantes:

- **Predictivo:** con un plano y un software (Ekahau, Hamina, hasta herramientas gratuitas) importas el plano, marcas paredes y materiales, y estimas APs y canales. Sirve para presupuestar.
- **In situ (validación):** con la red montada (o con un AP portátil), recorres el suelo con una laptop/app midiendo RSSI, SNR y canales por zona. Es la verdad de la calle: el hormigón armado y las estanterías metálicas no leen presupuestos.

Qué documentar en un survey:

1. Mapa de cobertura con RSSI por zonas (y zonas muertas).
2. Mapa de canales: qué AP ves desde cada punto y en qué canal.
3. Fuentes de ruido detectadas (microondas, cámaras, redes vecinas).
4. Recomendación: nº de APs, ubicación, canales, potencias.

> 💡 **El truco del bolígrafo:** en redes pequeñas, un smartphone con una app de WiFi analyzer y media hora de paseo por el edificio te da el 80 % del diagnóstico: canales saturados por el vecino, zonas muertas y el AP de tu oficina que está pisando el del aula de al lado.

---

## 🤬 CONRAD VS EL MUNDO: "He puesto un extensor en el enchufe del pasillo y cobertura solucionada"

**Usuario:** — Teníamos zona muerta en la sala de juntas. He pinchado un extensor WiFi en el pasillo. Cobertura: resuelta.

**CONRAD:** — Cobertura sí, red no. Ese extensor se conecta a tu AP por radio, y reenvía por la misma radio. Cada paquete viaja dos veces por el aire: mitad de velocidad, el doble de tiempo de aire ocupado, y encima en el mismo canal que tu AP principal. Has comprado un embudo y lo has puesto en medio de la autopista.

**CONRAD:** — Y como lo has pinchado a mitad del pasillo, está a mitad de señal del AP (digamos −65) y a mitad de señal de la sala (−70). Los clientes de la sala navegan por un puente inestable. Pero tranquilo, la cobertura —las barras— están preciosas.

**La lección:** un agujero de cobertura se arregla con un AP cableado (un punto de red más en el pasillo), no con un repetidor mal colocado. El extensor tiene su sitio (casas, soluciones temporales), pero en una red profesional es una deuda técnica con antenas.

---

## 🧠 Mini-chequeo

1. Diferencia entre diseñar para cobertura y diseñar para capacidad. Da un ejemplo de cada.
2. ¿Por qué los APs de un ESS deben usar canales distintos entre vecinos si todos comparten SSID?
3. Un aula de 30 portátiles tiene señal excelente desde el AP del pasillo pero va lenta. ¿Qué está mal en el diseño?
4. ¿Qué dos variantes de site survey existen y para qué sirve cada una?

<details>
<summary>🔄 Respuestas</summary>

1. **Cobertura** = que haya señal suficiente en todas partes (pasillo, almacén). **Capacidad** = que haya tiempo de aire suficiente para los clientes de una zona (aula con 30 equipos). Puedes tener cobertura perfecta y capacidad agotada, y viceversa.
2. Porque si comparten canal, los APs se oyen entre sí y se roban el tiempo de aire (interferencia co-canal). Mismo SSID no exige mismo canal: el cliente ve "la red" igual; el canal es un asunto de la capa física.
3. Que se diseñó para cobertura, no para capacidad: los 30 portátiles comparten el tiempo de aire de un AP lejano. Necesitan un AP propio (en el aula) aunque la señal del pasillo "llegue".
4. **Predictivo** (software + plano, para estimar y presupuestar) e **in situ/validación** (medición real del edificio, para ajustar la verdad física: materiales, ruido, zonas muertas).
</details>

---

## ✅ Resumen en 3 frases

- El diseño WLAN persigue cobertura, **capacidad** y mínima interferencia; las tres, en ese orden de dificultad.
- Techo, solapamiento del 15-20 %, canales alternos y potencia moderada son las reglas base.
- El **site survey** (predictivo + in situ) convierte el diseño en datos; la app del móvil ya hace el 80 % en redes pequeñas.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Celda | Área de cobertura de un AP |
| Tiempo de aire | Recurso compartido de un canal; la moneda de la capacidad |
| Co-canal | Dos emisores en el mismo canal |
| RRM | Automatización de canales/potencias (controladores) |
| Site survey | Medición de cobertura/canales/ruido in situ |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-redes-inalambricas) · **Anterior:** [04 · Topologías y modos de trabajo](/ApuntesRedes/11-redes-inalambricas/04-topologias) · **Siguiente:** [06 · Seguridad WLAN](/ApuntesRedes/11-redes-inalambricas/06-seguridad-wlan)
