---
title: "09 — Head First: consolida lo aprendido"
description: El cierre práctico de la unidad, con chicha y diagnóstico real 🧠
---

<p><small>El cierre práctico de la unidad, con chicha y diagnóstico real 🧠</small></p>

> 🗺️ **Estás en:** 📡 **U02 · Modelos OSI y análisis** → 09 · Head First

---

Has terminado la teoría. Este cierre es el aterrizaje: recorre lo aprendido con juegos, un laboratorio real con Wireshark y las preguntas que te harán en una entrevista. Léelo justo después del [punto 8](/ApuntesRedes/02-modelos-osi-analisis/08-wireshark) y antes de abrir los boletines.

---

## ⭐ Be the Packet, my friend...

> *Eres un paquete HTTP GET. Te estás formando en el navegador porque el usuario ha escrito "google.com".*

**Paso 1:** La aplicación (navegador) te crea. Lees el HTTPS y dices: "Necesito cifrado".

**Paso 2:** Bajas a Transporte. TCP te envuelve en un segmento con número de puerto 443 (HTTPS).

**Paso 3:** Bajas a Red. IP te pone una cabecera con origen 192.168.1.10 y destino... espera, ¿cuál es la IP de google.com? Necesitas DNS.

**¿Qué haces?**
1. **Lanzar una consulta DNS primero** → ✅ ¡Correcto! Antes de saber a quién enviarle el paquete, necesitas resolver el nombre.
2. **Enviar el paquete a "google.com" directamente** → ❌ Las redes no entienden nombres. Solo IPs.
3. **Preguntarle al gateway** → No, el gateway encamina, no resuelve nombres. Necesitas un servidor DNS.

> 💡 **¿Sabías que una petición web típica genera entre 10 y 30 paquetes?** DNS (2-4), TCP handshake (3), TLS handshake (5-10), HTTP request+response (2+), y luego cierre TCP (4). Y eso solo para la página principal, sin imágenes ni scripts.

---

## 🔥 Fireside Chat: OSI vs TCP/IP

> *Dos modelos de red discuten en una lavandería industrial mientras las secadoras giran.*

**OSI:** — MIRA, 7 capas. Es limpio, es elegante. Cada capa hace una cosa y la hace bien. Presentación, Sesión... ¡son importantes!

**TCP/IP:** — 7 capas, dices. ¿Y cuándo fue la última vez que viste una implementación real de la Capa de Presentación? En el mundo real usamos 4 capas, funcionamos, y nadie se queja.

**OSI:** — Eres un simplista. Yo separo conceptos. Tú mezclas la capa física y de enlace en una sola "Acceso a Red". ¡Qué barbaridad!

**TCP/IP:** — Y tú tienes capas que nadie usa. Dime, ¿qué protocolo de la capa de Sesión usas hoy? ¿No te respondes? Yo tampoco. En el mundo real, HTTP, TCP, IP y Ethernet hacen el trabajo. Y punto.

**OSI:** — *ofendido* Sin mí no tendrías una base teórica. ¿Quién crees que inspiró tu diseño?

**TCP/IP:** — Vale, te doy eso. Eres un buen abuelo. Pero el mundo funciona conmigo.

**OSI:** — Abuelo... abuelo será tu router, que va dando tumbos de salto en salto sin saber ni dónde está la capa de sesión.

**TCP/IP:** — *suspiro* Ya estamos. Anda, dime una cosa: ¿cuántos bytes ocupa tu cabecera de Presentación en un paquete real?

**OSI:** — *silencio incómodo*

**TCP/IP:** — Eso pensaba.

---

## 🕵️ ¿Quién Soy?

1. Soy la capa que se encarga del enrutamiento. Uso direcciones IP. Los routers me aman.
2. Trabajo en la capa de Transporte. Garantizo que los datos lleguen en orden y sin errores. Soy fiable pero lento.
3. No soy fiable. Envío datagramas y rezo. Rapidez ante todo. Útil para streaming y VoIP.
4. Traduzco nombres de dominio a direcciones IP. Sin mí, google.com no funcionaría.
5. Soy la trama que viaja por el cable. Tengo MACs y llevo el payload IP dentro. Los switches me leen.
6. Mi cabecera tiene 8 bytes fijos. No hay handshake, no hay confirmación. Soy el minimalismo hecho protocolo.

<details>
<summary>🔄 Respuestas</summary>

1. **Capa de Red (OSI capa 3)** — IP, routers, enrutamiento.
2. **TCP** — fiable, confirmado, en orden.
3. **UDP** — no fiable, rápido, sin conexión.
4. **DNS** — traductor de nombres a IP.
5. **Trama Ethernet** — capa de Enlace (OSI capa 2).
6. **UDP** — solo 8 bytes de cabecera, sin conexión previa.
</details>

---

## 🤬 CONRAD VS EL MUNDO: "Es que no me carga la página"

**CONRAD:** — "Usuario dice: *CONRAD, Internet no funciona*. Le pregunto: ¿has probado con otro navegador? *No*. ¿Otro dispositivo? *No*. ¿Has mirado si el cable está conectado? *...qué cable?*"

**CONRAD:** — "Claro, el problema es la capa de aplicación, dice. *Me he fijado*. NO. El 80% de las veces es capa 1 (física): cable suelto, WiFi desactivado, switch sin luz. El 15% capa 3 (IP): DHCP no ha dado IP, gateway mal configurado. El 5% restante es capa 7 (aplicación). Pero NO, el usuario SIEMPRE asume que es lo último."

**La lección:** Cuando algo no funciona, el problema puede estar en CUALQUIERA de las 7 capas OSI. Empieza por abajo (física) y sube. No asumas que es la capa de aplicación solo porque "no carga la página".

---

## ⚡ Laboratorio de Tortura: Captura con Wireshark

> **Duración:** 45 minutos
> **Herramientas:** Wireshark, navegador, terminal

**Escenario:**
1. Abre Wireshark y captura en la interfaz de red activa.
2. Aplica el filtro `dns` en Wireshark.
3. En el navegador, visita `google.com`.
4. Detén la captura.

**Tareas:**
a) Localiza la consulta DNS. ¿Qué IP tiene google.com?
b) Localiza el HTTP GET (o HTTPS). ¿Qué puerto destino tiene?
c) ¿Ves algún paquete TCP SYN? ¿Para qué sirve?
d) Aplica el filtro `arp`. ¿Hay tráfico ARP? ¿Por qué?
e) Busca el **three-way handshake** completo (SYN, SYN-ACK, ACK).
f) Sigue el flujo TCP de la conexión HTTP. ¿Qué ves?

**Fallo intencionado:** Antes de empezar, ve a la configuración de red y cambia el servidor DNS a una IP inventada (ej. `192.0.2.99`). Ahora captura e intenta navegar. ¿Qué falla? ¿En qué capa OSI está el fallo?

> **Pista 1:** si el ping a `8.8.8.8` funciona pero el navegador no carga páginas, el problema es de **resolución de nombres** (capa 7). Si ni siquiera el ping funciona... el problema está más abajo.
>
> **Pista 2:** en la captura verás el intento de consulta DNS a `192.0.2.99` que no recibe respuesta. Ese tráfico que "sale y no vuelve" te confirma que la configuración DNS (y no la red) es la culpable.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Wireshark Ninja** | Capturar una sesión completa (DNS + TCP + HTTP) y explicar cada paquete |
| 🏅 **Handshake Master** | Identificar los 3 paquetes del three-way handshake en una captura real |
| 🏅 **Layer Detective** | Dado un síntoma, identificar la capa OSI donde está el problema |
| 🏅 **Header Spotter** | Nombrar de memoria los campos de las cabeceras Ethernet, IP y TCP |

---

## 🧠 Atrévete a Pensar

1. Dibuja cómo se encapsula un mensaje HTTP "HOLA" desde la capa 7 hasta la capa 1 (nombra cada PDU).
2. ¿Cuántas cabeceras tiene un paquete HTTP que viaja por Ethernet? Nómbralas de fuera a dentro.
3. ¿Por qué el modelo TCP/IP tiene solo 4 capas si el OSI tiene 7? ¿Qué capas fusiona?
4. Busca el significado de **PDU**, **SDU** e **ICI** en el contexto OSI.
5. ¿Qué significa TTL en IP? ¿Qué pasa si un paquete tiene TTL = 1? ¿Y TTL = 0?
6. Si ves en Wireshark un paquete TCP con flags SYN=1 y ACK=1, ¿qué significa? ¿En qué fase del handshake está?

<details>
<summary>💡 Soluciones</summary>

1. **Capa 7:** HTTP → "HOLA" | **Capa 4:** TCP → segmento (cabecera TCP + "HOLA") | **Capa 3:** IP → paquete (cabecera IP + segmento) | **Capa 2:** Ethernet → trama (cabecera Ethernet + paquete + FCS) | **Capa 1:** bits en el cable.
2. De fuera a dentro: **Ethernet (14 bytes)** → **IP (20 bytes)** → **TCP (20 bytes)** → **HTTP (variable)**.
3. TCP/IP fusiona Física+Enlace en **Acceso a Red** y Sesión+Presentación+Aplicación en **Aplicación**. Más práctico, menos granular.
4. **PDU** = Protocol Data Unit (unidad de datos, ej. segmento, paquete, trama). **SDU** = Service Data Unit (datos pasados a la capa inferior). **ICI** = Interface Control Information (información de control entre capas).
5. **TTL** evita bucles infinitos. Cada salto decrementa en 1. **TTL=1** solo llega al primer router (¡y puede responder ICMP *Time Exceeded*!). **TTL=0** se descarta inmediatamente.
6. **SYN-ACK.** Es el paso 2 del three-way handshake: el servidor confirma el SYN del cliente y solicita el suyo.
</details>

---

## 🧩 Crucigrama de Bits

```
Horizontal:
1. Protocolo de transporte fiable (3 letras)
4. Capa OSI que encapsula en tramas (5 letras, castellano)
5. Unidad de datos en capa de Red (7 letras)
7. Herramienta de captura de paquetes (9 letras)
9. Flag TCP que inicia una conexión (3 letras)

Vertical:
2. Protocolo que resuelve IP a MAC (3 letras)
3. Capa OSI número 4 (10 letras, castellano)
6. Número de capas del modelo OSI (1 dígito)
8. Tamaño en bytes de la cabecera UDP (1 dígito)
10. Puerto por defecto de HTTP (2 dígitos)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. TCP, 4. ENLACE, 5. PAQUETE, 7. WIRESHARK, 9. SYN
**Vertical:** 2. ARP, 3. TRANSPORTE, 6. SIETE, 8. OCHO, 10. OCHENTA

</details>

---

## 💬 Preguntas de Entrevista de Trabajo

1. **"Explícame el modelo OSI como si fuera una cadena de montaje de una fábrica."**
2. **"¿Cuál es la diferencia entre TCP y UDP? Dame 3 casos de uso para cada uno."**
3. **"¿Qué pasa cuando escribes google.com en el navegador y le das a Enter?"** (Pregunta clásica: DNS, TCP, HTTP)
4. **"¿En qué capa OSI trabajan un switch, un router y un hub?"**
5. **"Si ves muchos paquetes TCP Retransmission en Wireshark, ¿qué sospechas?"**
6. **"Explica el three-way handshake de TCP. ¿Qué pasa si nunca llega el ACK final?"**
7. **"¿Qué es el MTU? ¿Qué pasa si un paquete es más grande que el MTU?"**

> 💡 **Cómo encararlas:** la 3 es la "pregunta reina". Recorre el mismo camino del ⭐ Be the Packet: DNS (capa 7) → TCP 443 (capa 4) → IP (capa 3) → Ethernet (capa 2) → bits (capa 1). Si sabes contarla fluido, ya eres medio administrador.

---

## 🤷 No hay preguntas tontas

> ❓ **¿Por qué el modelo OSI tiene exactamente 7 capas y no otro número?**

Porque 7 permitió separar con claridad cada nivel de abstracción: desde los bits (capa 1) hasta la interacción con las aplicaciones (capa 7). Ninguna capa "sobra": cada una resuelve un problema distinto, y separarlas permite que las tecnologías evolucionen por separado y que fabricantes distintos interoperen respetando interfaces comunes.

> ❓ **¿No sería más eficiente usar una única capa que hiciera todo?**

No. Una única capa tendría que gestionar a la vez la transmisión física, el direccionamiento, el control de errores, la segmentación y la interpretación de la aplicación: algo rígido e inmantenible. La división en capas permite que cada nivel evolucione de forma independiente.

> ❓ **Si abro Wireshark en casa, ¿puedo ver el tráfico de mis vecinos?**

No directamente. Con un switch (lo normal hoy), solo ves tu tráfico y el broadcast (ARP, DHCP); los switches aíslan el unicast. Para ver tráfico ajeno necesitarías ARP spoofing, un hub, o un puerto espejo. En WiFi sin conocer la clave, además, el tráfico viaja cifrado (WPA2/3).

> ❓ **¿Qué diferencia hay entre un puerto y un socket?**

Un **puerto** es un número (0-65535) que identifica un servicio. Un **socket** es la combinación de IP y puerto (`192.168.1.10:443`): el identificador completo de un extremo. Dos sockets (origen y destino) definen una **conexión**.

---

## 🎬 Post-Créditos

Un paquete viaja encapsulado con cuatro niveles de cabeceras: Ethernet, IP, TCP y HTTP. Al llegar a un switch, este examina la dirección MAC destino en la cabecera Ethernet. Si la MAC no corresponde a ningún puerto conocido, el switch inunda la trama por todos los puertos excepto el de origen. Cuando el destinatario responde, el switch aprende la MAC y actualiza su tabla. El paquete continúa su camino capa por capa hasta llegar a la aplicación destino.

**PRÓXIMAMENTE EN U03:** El viaje por el medio físico: cómo se transmiten los bits, qué es el ancho de banda, y por qué los cables UTP tienen 8 hilos.

---

## ✅ Criterios de evaluación cubiertos (RA1)

**RA1: Reconoce la estructura de las redes de datos identificando sus elementos y principios de funcionamiento.**

| CE | Criterio | Cubierto |
|---|---|---|
| d) | Arquitecturas de red y niveles | ✅ OSI y TCP/IP explicados en detalle (puntos 1-3) |
| e) | Concepto de protocolo | ✅ HTTP, TCP, UDP, ARP, DNS, IP (puntos 5-7) |
| f) | Pilas de protocolos | ✅ Encapsulación con cabeceras + ⚡ Laboratorio Wireshark |
| g) | Elementos funcionales, físicos y lógicos | ✅ Capas OSI y dispositivos por capa + 🔥 Fireside Chat |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/02-modelos-osi-analisis) · **Anterior:** [08 · Wireshark](/ApuntesRedes/02-modelos-osi-analisis/08-wireshark) · **Siguiente:** **[U03 · Infraestructura física](/ApuntesRedes/03-infraestructura-fisica)**