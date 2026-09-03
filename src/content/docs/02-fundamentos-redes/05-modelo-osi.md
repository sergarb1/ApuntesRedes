---
title: 05 — El modelo OSI en 7 capas
description: El plano en capas que organiza toda la comunicación 🎂
---

<p><small>El plano en capas que organiza toda la comunicación 🎂</small></p>

> 🗺️ **Estás en:** 🌐 **U02 · Fundamentos de redes** → 05 · El modelo OSI en 7 capas

---

## 📬 La idea en una frase

> **El modelo OSI divide la comunicación en 7 capas, cada una con una sola función y hablando con sus vecinas.**

Es como la cadena de montaje de una fábrica: cada sección hace una tarea, empaqueta el resultado y se lo pasa a la siguiente.

---

## 🏢 La torre de capas vista como una oficina

Imagina el envío de un paquete entre dos oficinas de tu empresa:

- **Capa 7 (Aplicación):** la secretaria que redacta el documento.
- **Capa 4 (Transporte):** el mensajero que decide cómo enviarlo (urgente/fiable = TCP, rápido y sin avisar = UDP).
- **Capa 3 (Red):** el jefe de mensajería que elige por qué ciudad va y pone la dirección del edificio destino (IP).
- **Capa 2 (Enlace):** el repartidor de tu planta que sabe qué puerta de tu edificio es (MAC).
- **Capa 1 (Física):** la propia acera y las cajas de cartón (el cable y los bits).

Cada empleado solo se comunica con el de su mismo "cargo" en la otra oficina (eso es la comunicación entre capas iguales) y cada uno solo depende de su vecino inmediato (capas adyacentes).

---

## 🧠 ¿Por qué 7 capas?

El modelo **OSI** (*Open Systems Interconnection*) nació en 1984 de la mano de la ISO como un marco de referencia. Dividir la comunicación en capas tiene ventajas prácticas:

- **Abstracción:** cada capa oculta su complejidad a la superior.
- **Intercambiabilidad:** puedes cambiar la tecnología de una capa sin tocar las demás (por ejemplo, cambiar el WiFi por cable y conservar TCP/IP).
- **Estandarización:** fabricantes distintos pueden crear equipos que hablan el mismo protocolo y funcionan juntos.

---

## 🗂 Las 7 capas en detalle

| Capa | Nombre | PDU | Función principal | Ejemplos |
|---|---|---|---|---|
| 7 | Aplicación | Datos | Interfaz con el usuario | HTTP, FTP, DNS, SMTP |
| 6 | Presentación | Datos | Traducción, cifrado, compresión | TLS, JPEG, MPEG |
| 5 | Sesión | Datos | Gestiona las sesiones | NetBIOS, RPC, SQL |
| 4 | Transporte | **Segmento** | Segmentación, flujo, fiabilidad | TCP, UDP |
| 3 | Red | **Paquete** | Direccionamiento lógico y rutas | IP, ICMP, ARP |
| 2 | Enlace | **Trama** | Direccionamiento físico (MAC) | Ethernet, WiFi |
| 1 | Física | **Bits** | Enviar bits por el medio | Cables, fibra, radio |

> **PDU** (*Protocol Data Unit*) es el nombre que reciben los datos en cada capa: en la 4 se llaman **segmentos**, en la 3 **paquetes**, en la 2 **tramas** y en la 1 **bits**. Memoriza este vocabulario: lo usarás en todo el libro.

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/modelo-osi-capas.svg" alt="Las 7 capas del modelo OSI con ejemplos de protocolos" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Los datos viajan de arriba abajo al enviar (encapsulación) y de abajo arriba al recibir (desencapsulación).</figcaption>
</figure>

---

## 📦 Encapsulación: cómo viajan los datos

Cuando envías un dato desde una aplicación, este **baja** de la capa 7 a la 1 y, en cada capa, se le añade una **cabecera** (*header*) propia:

```
[7 Aplicación]   → datos brutos (ej.: "GET /index.html")
[6 Presentación] → añade formato o cifrado
[5 Sesión]       → añade control de sesión
[4 Transporte]   → añade puerto origen/destino → SEGMENTO
[3 Red]          → añade IP origen/destino → PAQUETE
[2 Enlace]       → añade MAC origen/destino + CRC → TRAMA
[1 Física]       → convierte en bits y los envía por el cable
```

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/flujo-encapsulacion.svg" alt="Proceso de encapsulación TCP/IP desde aplicación hasta bits" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Cada capa añade su cabecera al dato original. En el destino, el proceso se invierte: desencapsulación.</figcaption>
</figure>

En el destino ocurre lo contrario: **desencapsulación**, de la capa 1 hacia arriba, quitando cabeceras hasta recuperar los datos originales. Es como abrir una muñeca rusa de 7 niveles.

---

## ⚖️ OSI vs TCP/IP

El modelo que Internet usa de verdad es **TCP/IP**, más práctico y con solo 4 capas:

| OSI | TCP/IP |
|---|---|
| 7-6-5 (Aplicación, Presentación, Sesión) | Aplicación |
| 4 (Transporte) | Transporte |
| 3 (Red) | Internet |
| 2-1 (Enlace y Física) | Acceso a red |

> 💡 **Para este curso** nos centramos en las capas 1 a 4. Las capas 5-7 en la práctica se engloban en la capa de **Aplicación** del modelo TCP/IP.

---

## 🧠 Truco para recordar las 7 capas

Dos mnemotecnias clásicas (en inglés, pero universales):

- **De arriba a abajo (7→1):** *"**A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing"* → Aplicación, Presentación, Sesión, Transporte, Red (Network), Enlace (Data link), Física (Physical).
- **De abajo a arriba (1→7):** *"**P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way"* → Física, Enlace, Red, Transporte, Sesión, Presentación, Aplicación.

Puedes búscarte una en castellano que te encaje; lo importante es no saltarte la capa 4 (Transporte), que es donde vive TCP/UDP.

---

## 🔬 Ejemplo resuelto: una petición web a través de las capas

Cuando escribes `https://...` y pulsas Enter:

| Capa | Qué hace de tu lado |
|---|---|
| 7 · Aplicación | Tu navegador prepara "GET /index.html" |
| 4 · Transporte | TCP añade los puertos origen/destino (443) → **segmento** |
| 3 · Red | IP añade tu IP y la del servidor → **paquete** |
| 2 · Enlace | Ethernet añade las MAC origen/destino (la del gateway) → **trama** |
| 1 · Física | La tarjeta de red envía los **bits** por el cable |

Cada capa "envuelve" a la anterior (encapsulación). El servidor repetirá el proceso al revés (desencapsulación) hasta entregar la página a su aplicación.

---

## 🧠 Mini-chequeo

1. ¿Cómo se llama la PDU de la capa 3? ¿Y la de la capa 2?
2. Ordena de dentro (más interno) a fuera (más externo): segmento, bit, paquete, trama.

<details>
<summary>🔄 Respuestas</summary>

1. En la capa 3 → **paquete**; en la capa 2 → **trama**.
2. En el viaje hacia el cable (de dentro a fuera): **segmento → paquete → trama → bit**.

</details>

---

## ✅ Resumen en 3 frases

1. OSI divide la comunicación en **7 capas**, cada capa con una función y un PDU.
2. Al enviar, los datos se **encapsulan** (cada capa añade su cabecera); al recibir, se **desencapsulan**.
3. Internet se rige por **TCP/IP** (4 capas), pero OSI sigue siendo el mapa mental que todos usan.

> 🐛 **Vocabulario rápido**
>
> | Término | Idea general |
> |---|---|
> | Capa | Nivel lógico con una función concreta |
> | PDU | El "trozo" de datos según la capa |
> | Encapsulación | Envolver datos añadiendo cabeceras |
> | Desencapsulación | Quitar cabeceras al recibir |
> | MAC | Dirección física de la capa 2 |
> | IP | Dirección lógica de la capa 3 |

📚 [Volver al índice de la unidad](/ApuntesRedes/02-fundamentos-redes) · **Anterior:** [04 · Dispositivos de red](/ApuntesRedes/02-fundamentos-redes/04-dispositivos) · **Siguiente:** [06 · Protocolos](/ApuntesRedes/02-fundamentos-redes/06-protocolos)