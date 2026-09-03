---
title: 01 — El modelo OSI
description: Por qué dividir la red en 7 capas y cómo se llama cada pieza 🏗️
---

<p><small>Por qué dividir la red en 7 capas y cómo se llama cada pieza 🏗️</small></p>

> 🗺️ **Estás en:** 📡 **U03 · Modelos OSI y análisis** → 01 · El modelo OSI

---

## 📬 La idea en una frase

> El modelo OSI (*Open Systems Interconnection*) es un **marco de referencia de 7 capas**, creado por la ISO en 1984, que organiza toda la comunicación en red para que fabricantes distintos puedan entenderse.

No es un protocolo ni un programa: es un **plano** que dice qué problema resuelve cada nivel. Como el organigrama de una empresa: nadie es "la hoja de cálculo", pero todos respetan quién manda sobre quién.

Si esto te suena, es porque ya lo rozaste en el [punto 5 de la U02](/ApuntesRedes/02-fundamentos-redes/05-modelo-osi). Aquí lo llevamos al fondo.

---

## 🏢 ¿Por qué dividir en capas?

Imagina que pides una pizza por teléfono. En el proceso intervienen: tú (qué pedir), el teléfono (cómo suena el timbre), la centralita (a qué número llamar) y el repartidor (qué ruta coge). Si todo fuera una sola pieza, cualquier cambio —usa WhatsApp en lugar del teléfono— obligaría a rehacer el pedido entero.

En redes pasa igual. Dividir en capas da tres ventajas enormes:

- **Abstracción:** cada capa esconde su complejidad a las demás. La capa de Red no necesita saber si el cable es de cobre o de fibra.
- **Intercambiabilidad:** puedes cambiar el WiFi por cable (capa 1 y 2) sin tocar TCP/IP (capas 3 y 4). El cambio local no rompe el resto.
- **Estandarización:** al definir interfaces comunes, un servidor Dell habla con un router de cualquier marca, como dos personas que siguen la misma etiqueta.

> 💡 **Analogía del correo postal:** las capas son como los departamentos de una empresa de mensajería. El comercial (capa 7) escribe la carta; el mensajero (capa 4) decide si va urgente o normal; el jefe de envíos (capa 3) elige la ciudad y pone el código postal (IP); el repartidor local (capa 2) sabe qué portal es (MAC); y la furgoneta (capa 1) transporta la carta por la calle. Cada uno solo habla con su homólogo en la otra empresa.

---

## 🧱 Las 7 capas de un vistazo

Déjate el diagrama grabado: es el mapa que usarás en toda la unidad y en el [trabajo con Wireshark (punto 8)](/ApuntesRedes/03-modelos-osi-analisis/08-wireshark).

<img src="/ApuntesRedes/diagrams/modelo-osi-capas.svg" alt="Las 7 capas del modelo OSI con ejemplos de protocolos" class="diagram-img" loading="lazy" />

| Capa | Nombre | PDU | Dispositivos | Función principal |
|---|---|---|---|---|
| 7 | **Aplicación** | Datos | PC, servidor | Interfaz con el usuario. HTTP, FTP, DNS, SMTP |
| 6 | **Presentación** | Datos | PC, servidor | Traducción, cifrado, compresión. SSL/TLS, JPEG |
| 5 | **Sesión** | Datos | PC, servidor | Establece, gestiona y cierra sesiones. RPC, SQL |
| 4 | **Transporte** | Segmento | PC, servidor | Segmentación, control de flujo, fiabilidad. TCP, UDP |
| 3 | **Red** | Paquete | Router | Direccionamiento lógico (IP), enrutamiento. IP, ICMP |
| 2 | **Enlace** | Trama | Switch, bridge | Direccionamiento físico (MAC), acceso al medio. Ethernet, WiFi |
| 1 | **Física** | Bits | Hub, repetidor, módem | Transmisión de bits por el medio. Cables, fibra, radio |

**¿Cómo memorizar el orden?** Dos trucos clásicos:

- Acrónimo (de abajo arriba): *Física, Enlace, Red, Transporte, Sesión, Presentación, Aplicación* → **"FERTSPA"**.
- De arriba abajo, piensa en la frase: *"A PaSó Por Todo El Fondo"* — Aplicación, Presentación, Sesión, Transporte, Red, Enlace, Física.

> ⚠️ **Ojo con la PDU:** cada capa llama a su "caja de datos" con un nombre distinto. **Datos** (7-5), **segmento** (4), **paquete** (3), **trama** (2) y **bits** (1). Identificar la PDU es la pregunta estrella de exámenes y entrevistas.

---

## 🏷️ PDU, SDU e ICI: el vocabulario de los ingenieros

En los manuales (y en las entrevistas serias) aparecen tres siglas que conviene dominar:

| Sigla | Nombre | Idea |
|---|---|---|
| **PDU** | Protocol Data Unit | La "caja" de datos de una capa concreta (segmento, paquete, trama…) |
| **SDU** | Service Data Unit | Los datos que una capa recibe de la superior y aún no ha "empaquetado" |
| **ICI** | Interface Control Information | La información de control que una capa añade al bajar (la cabecera) |

En cristiano: la capa N recibe la **SDU** de la N+1, le añade su **ICI** (cabecera) y el resultado es su **PDU**, que entrega como SDU a la capa N−1. Es una muñeca rusa.

---

## 🔧 La regla de diagnóstico por capas

Esta es la regla más práctica de toda la unidad. Cuando algo falla, **el problema vive en alguna capa**, y el síntoma delata cuál:

> 💡 **Regla práctica:** Si ves LEDs apagados en el switch, el problema está en **capa 1**. Si hay LEDs pero no hay ping, probablemente es **capa 3**. Si el ping funciona pero la web no carga, es **capa 7**.

```
Síntoma                         → Capa probable
─────────────                   → ─────────────
El cable no tiene luz (LED apagado) → 1 Física
Ping a la misma red OK, ping a fuera no → 3 Red (gateway/ruta)
Ping a IP OK, pero nombres no resuelven → 7 Aplicación (DNS)
La web carga lenta, con reenvíos → 4 Transporte (pérdidas TCP)
```

Siempre se diagnostica **de abajo hacia arriba**: primero física, luego red, y al final aplicación. Es la metodología que verás aplicada en el [cierre de la unidad](/ApuntesRedes/03-modelos-osi-analisis/09-cierre) y en la U12 de diagnóstico.

---

## 🧠 Mini-chequeo

1. ¿Qué ventaja concreta aporta dividir la red en capas? Pon un ejemplo real.
2. ¿Cuál es la PDU de la capa de Transporte? ¿Y de la de Enlace?
3. Un usuario dice "no me carga la web". El ping a la web funciona pero los nombres no resuelven. ¿En qué capa está el problema?

<details>
<summary>🔄 Respuestas</summary>

1. **Intercambiabilidad:** cambiar WiFi por cable no obliga a rehacer TCP/IP. También permite fabricantes distintos interoperar (estandarización) y esconder complejidad (abstracción).
2. La PDU de Transporte es el **segmento** (datagrama en UDP); la de Enlace es la **trama**.
3. **Capa 7 (Aplicación)** — concretamente el servicio DNS: hay conectividad IP (capa 3 OK) pero no se resuelven nombres.
</details>

---

## ✅ Resumen en 3 frases

- El modelo OSI es un **plano de 7 capas** que separa responsabilidades para que la red evolucione sin romperse.
- Cada capa tiene su PDU y su familia de protocolos: quien recuerda esto ya domina media unidad.
- Ejercicio anterior → diagnóstico: **de abajo hacia arriba**, la capa delata el fallo por el síntoma.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Modelo OSI | Marco de referencia de 7 capas (ISO, 1984) |
| PDU | Unidad de datos de una capa (segmento, paquete, trama…) |
| SDU | Datos recibidos de la capa superior, aún sin cabecera |
| Abstracción | Cada capa oculta su complejidad a las demás |
| Intercambiabilidad | Cambiar una capa sin tocar el resto |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-modelos-osi-analisis) · **Anterior:** [Índice de la unidad](/ApuntesRedes/03-modelos-osi-analisis) · **Siguiente:** [02 · Las 7 capas en detalle](/ApuntesRedes/03-modelos-osi-analisis/02-las-7-capas)