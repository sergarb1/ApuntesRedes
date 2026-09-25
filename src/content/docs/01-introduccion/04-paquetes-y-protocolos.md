---
title: 04 — Paquetes y protocolos
description: Cómo viajan los datos por la red y qué reglas siguen ✉️
---

<p><small>Cómo viajan los datos por la red y qué reglas siguen ✉️</small></p>

> 🗺️ **Estás en:** 🚪 **Introducción** → 04 · Paquetes y protocolos

---

## 📬 La idea en una frase

> **La red no envía un archivo o un mensaje entero de golpe; lo trocea en pedacitos que viajan como cartas en sobres independientes (paquetes) y que siguen unas normas estrictas de circulación (protocolos) para no perderse.**

---

## ✉️ ¿Qué "viaja" realmente cuando envío un mensaje?

Hagamos un experimento mental. Estás en clase y le escribes *"llego a las ocho"* por chat a un amigo que está en su casa. ¿Qué es exactamente lo que viaja por el cable y por el aire?

Tu frase no viaja como un texto único. El sistema hace lo siguiente:

1. **Trocea el mensaje**: convierte la frase en bytes y la divide en varios fragmentos pequeños.
2. **Prepara el sobre**: cada uno de esos fragmentos se mete en un "sobre" virtual. A este sobre lleno de datos se le llama **Paquete** o **Datagrama**.
3. **Escribe las direcciones**: a cada paquete se le apunta quién lo envía (tu IP de origen) y a quién va dirigido (la IP de destino de tu amigo).
4. **El viaje**: los paquetes viajan de router en router; cada aparato lee el sobre y decide por qué camino enviarlo.
5. **Reconstrucción**: al llegar al móvil de tu amigo, los fragmentos se reordenan correctamente y se arma de nuevo la frase *"llego a las ocho"* en su pantalla.

---

## 📜 Los protocolos: Las reglas de tráfico y el famoso HTTP

Para que este ir y venir de millones de sobres no se convierta en un caos absoluto, las máquinas necesitan unas reglas. Eso es exactamente un **Protocolo**: las reglas comunes que dos máquinas aceptan cumplir para poder entenderse.

Seguramente te suene muy abstracto, pero llevas toda la vida usando protocolos sin saberlo. Por ejemplo, cuando tu navegador pide entrar a una página web, utiliza un protocolo llamado **HTTP** (o su versión con candado, **HTTPS**). Es el idioma universal que han acordado las máquinas para pasarse páginas web de un sitio a otro sin que los textos o las imágenes lleguen rotos. Cada servicio (la web, el correo, los videojuegos) tiene su propio protocolo.

| Lo que viaja por la red | 🧠 Qué es técnicamente | ✉️ La analogía de Correos |
|---|---|---|
| **Los datos (Bytes)** | La información troceada. | El folio con la carta que va dentro del sobre. |
| **El Paquete / Datagrama** | El trozo de datos encapsulado. | El sobre cerrado preparado para el viaje. |
| **IP Origen y Destino** | Las direcciones lógicas. | El remitente y el destinatario escritos en el sobre. |
| **El Protocolo (ej. HTTP)** | Las reglas de comunicación. | El idioma común y las normas de reparto del cartero. |

### 🚨 Ojo novato: Leer el sobre vs. Leer la carta

Cuando tus paquetes viajan por Internet, pasan por un montón de routers intermedios que no son tuyos. Esos equipos intermedios **tienen que leer el sobre obligatoriamente** (las IPs) para saber hacia dónde enviar el paquete. Sin embargo, lo habitual hoy en día es que el *contenido* de la carta (tus datos) viaje cifrado. Leer el sobre es necesario; abrir el sobre y mirar el interior de los paquetes de otra persona es algo que estudiarás más adelante, y que previenen los protocolos seguros.

---

## ✅ Resumen en 3 frases

1. La información nunca viaja entera; se convierte en bytes, se trocea y se mete en "sobres" llamados paquetes o datagramas.
2. Cada paquete lleva apuntada la IP de origen y la IP de destino para que los routers sepan por dónde guiarlo hasta el final.
3. Los protocolos (como el HTTP para la web) son los idiomas y las reglas que todas las máquinas aceptan cumplir para que los datos lleguen ordenados y se entiendan correctamente.

---

## 🔥 Fireside Chat: TCP vs UDP

> *Dos protocolos de transporte debaten en la parada del autobús.*

**TCP:** — Yo soy el meticuloso. Me aseguro de que cada paquete llega, en orden y sin errores. Si falta uno, lo reenvío. Si llega mal, lo repito. Lento pero seguro.

**UDP:** — Yo soy el rápido. Tiro los datos y si llegan, fenomenal. Si no... mala suerte. En directo, no hay repeticiones.

**TCP:** — ¿Y si se pierde un paquete?

**UDP:** — Pues se pierde. En una videollamada, si pierdes un frame, el usuario ve un pixel de más o de menos. ¿Vas a parar la llamada para reenviar un paquete?

**TCP:** — En una transferencia de archivo, cada byte cuenta. Si pierdo uno, el archivo se corrompe.

**UDP:** — Por eso me usas en streaming y en videojuegos. Si te importa la velocidad más que la perfección, me eliges a mí.

**TCP:** — *suspiro* Somos como el cartero meticuloso y el mensajero en moto: los dos llegan, pero uno se asegura y el otro va rápido.

---

## 🕵️ ¿Quién Soy?

Adivina qué concepto de red soy:

1. **Soy el sobre que lleva los datos.** Cada fragmento de información viaja en uno de mí, con IP origen y destino.
2. **Soy las reglas que todas las máquinas respetan.** Sin mí, cada aparato hablaría su idioma y nadie se entendería.
3. **Soy el HTTP, el HTTPS, el SMTP...** Cada servicio tiene su propia versión de mí.

<details>
<summary>🔄 Respuestas</summary>

1. **Paquete / Datagrama** — el sobre con los datos.
2. **Protocolo** — las reglas de comunicación.
3. **Protocolos de aplicación** — cada servicio tiene el suyo.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "Todo viaja entero"

> *CONRAD, nuestro switch cascarrabias, opina sobre los que creen que los archivos viajan de un tirón.*

**CONRAD:** — ¡OTRA VEZ! Viene un alumno y me dice: *"CONRAD, cuando envío un PDF por WhatsApp, ¿viaja entero por el cable?"* Y yo: **¡NO!** Nada viaja entero. Tu PDF se convierte en **bytes**, se trocea en **paquetes** de 1500 bytes como máximo, cada paquete lleva su sobre con IP origen y destino, y viajan **por separado** de router en router. Al llegar al destino, se reordenan y se vuelve a armar el PDF. ¿Te imaginas un PDF de 50 MB viajando de un tirón? ¡El cable explotaría!

**La lección:** la información siempre viaja troceada en paquetes. Nunca entera. Los routers manejan paquetes pequeños, no archivos gigantes.

---

## ⚡ Laboratorio de tortura: Paquetes perdidos

> **Duración estimada:** 20 minutos
> **Herramienta:** Packet Tracer

**El escenario:** Tienes 2 PC conectados a un switch. PC-A hace `ping` a PC-B. Todo funciona.

**Fallo intencionado:** Cambias la máscara de PC-A a `/16` (`255.255.0.0`) y la de PC-B a `/24` (`255.255.255.0`). Ahora el ping falla.

**Tu tarea:** Diagnosticar por qué no llegan los paquetes.

**Pistas (no antes de intentar):**

1. ¿Las IPs están en la misma subred? *Depende de la máscara: con `/16`, PC-A cree que toda la `192.168.x.x` es local; con `/24`, PC-B cree que solo `192.168.1.x` es local.*
   <details><summary>¿Y si sigo atascado?</summary>Calcula la subred de cada PC con su máscara. Si no coinciden, los paquetes van al gateway (que no existe).</details>

2. El problema es que **las máscaras no coinciden**: cada PC "ve" la red de un modo distinto y los paquetes se pierden porque una de las dos no puede localizar a la otra.

> ⚠️ **El fallo es: máscara inconsistente.** Solución: ambas PC deben tener la misma máscara (`/24` en este caso). La máscara define qué IPs están en la misma subred.

---

## 🏆 Logros de esta sección

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Paquete Potter** | Explicar cómo se trocea un archivo y se reensambla |
| 🏅 **Protocol Master** | Diferenciar TCP (fiable) de UDP (rápido) |
| 🏅 **Sobre Detective** | Encontrar el fallo del laboratorio (máscara inconsistente) |

---

## 🧠 Atrévete a pensar

1. **¿Qué viaja por el cable cuando envías un mensaje de WhatsApp?** ¿El mensaje entero o algo diferente?
2. **¿Por qué se usa UDP para videollamadas y TCP para transferencias de archivo?**
3. **¿Qué pasaría si no existieran los protocolos?** ¿Podrían comunicarse dos máquinas de marcas distintas?

<details>
<summary>💡 Soluciones</summary>

1. El mensaje se **trocea en bytes**, se mete en **paquetes** (con IP origen y destino), y cada paquete viaja **por separado** de router en router. Al llegar, se reensambla.
2. En videollamadas, la **velocidad** importa más que la perfección: si se pierde un frame, se nota un pixel. En transferencias, **cada byte cuenta**: si falta uno, el archivo se corrompe.
3. Sin protocolos, cada fabricante hablaría su "idioma". Un PC no podría entenderse con un servidor Apple, ni con un router Cisco. Los protocolos son el **lengua común** que hace posible la interoperabilidad.

</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. Sobre virtual que lleva los datos con IP origen y destino (8 letras)
3. Reglas que aceptan dos máquinas para entenderse (9 letras)
5. Versión segura de HTTP (4+1+3+4+3+1+3 letras)

Vertical:
2. Sobre de datos a nivel IP (9 letras)
4. Trozo de información de 8 bits (4 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. PAQUETE · 3. PROTOCOLO · 5. HTTPS
**Vertical:** 2. DATAGRAMA · 4. BYTE

</details>

---

## 💬 Preguntas de entrevista de trabajo

> Preguntas reales que te harían para administrador de redes junior.

1. **"¿Qué es un paquete? Explícalo como si yo fuera tu abuela."**
2. **"¿Cuál es la diferencia entre TCP y UDP?"**
3. **"¿Qué es un protocolo? Da 3 ejemplos."**
4. **"¿Qué es HTTPS y por qué es importante?"**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Qué tamaño máximo tiene un paquete?**

Depende del protocolo de capa 2. En Ethernet, el **MTU** (Maximum Transmission Unit) es de **1500 bytes**. Si tu mensaje es más grande, se trocea en varios paquetes de 1500 bytes o menos. En VPN o túneles, el MTU efectivo puede ser menor.

---

> ❓ **¿Qué pasa si un paquete se pierde por el camino?**

Depende del protocolo: **TCP** detecta la pérdida y reenvía el paquete automáticamente. **UDP** no hace nada: el paquete se pierde y el usuario lo nota (corte en un vídeo, pixel de más en una llamada).

---

## 🎬 Poscréditos

Un paquete de 1500 bytes se prepara para salir de tu portátil. Se mira alrededor: *"¿Cuántos saltos me quedan?"*. Un router le responde: *"Depende de tu TTL"*. El paquete se asusta: *"¿Mi TTL? ¿Eso es cuántos routers puedo cruzar antes de que me descarten?"*. *"Exacto"*, dice el router. *"Y si llegas a cero... adiós"*.

**PRÓXIMAMENTE EN 05:** DNS y DHCP — la agenda telefónica y el recepcionista que nadie ve pero todos necesitan. 📖

---

📚 [Volver al índice de la unidad](/ApuntesRedes/01-introduccion) · **Anterior:** [03 · MAC, IP y Puertos](/ApuntesRedes/01-introduccion/03-mac-ip-puertos) · **Siguiente:** [05 · DNS y DHCP](/ApuntesRedes/01-introduccion/05-dns-y-dhcp)
