---
title: "06 — Protocolos: el idioma de las redes"
description: Las reglas para que dos dispositivos se entiendan 🗣️
---

<p><small>Las reglas para que dos dispositivos se entiendan 🗣️</small></p>

> 🗺️ **Estás en:** 🌐 **U01 · Fundamentos de redes** → 06 · Protocolos

---

## 📬 La idea en una frase

> **Un protocolo es un conjunto de reglas que dos dispositivos aceptan para comunicarse. Es el idioma común.**

Si tú hablas español y yo chino, no nos entendemos. En redes, igual: dos máquinas deben hablar el mismo protocolo para intercambiar datos.

---

## 🗣 ¿Por qué necesitamos protocolos?

Porque los equipos no "adivinan" qué quiere decir cada señal ni cada bit. Hacen falta acuerdos previos sobre:

- **Cómo empezar la conversación** (quién saluda primero).
- **Formato de los mensajes** (qué va al principio, qué al final).
- **Errores** (qué se hace si llega algo corrupto).
- **Final** (cómo se despide la conversación).

> 💡 **Analogía:** una llamada telefónica: marcas, suena, respondes, "¿diga?", habláis por turnos y te despides. Sin esa cortesía acordada, la conversación no existe. Los protocolos de red son esa etiqueta, llevada al extremo y escrita.

---

## 🚪 Puertos: la puerta de cada servicio

Dentro de un equipo, los protocolos de **capa 4** (TCP/UDP) usan **puertos** para saber a qué aplicación debe recibir los datos. Un puerto es un número de 16 bits (del 0 al 65535) dividido en rangos:

- **0–1023:** puertos bien conocidos (*well-known*), reservados a servicios universales.
- **1024–49151:** puertos registrados, para aplicaciones concretas.
- **49152–65535:** puertos dinámicos/efímeros, usados temporalmente por los clientes.

| Puerto | Servicio típico |
|---|---|
| 22/TCP | SSH (acceso remoto seguro) |
| 25/TCP | SMTP (envío de correo) |
| 53/UDP | DNS (traducir nombres a IP) |
| 67-68/UDP | DHCP (configuración automática) |
| 80/TCP | HTTP (web sin cifrar) |
| 443/TCP | HTTPS (web cifrada) |
| 20-21/TCP | FTP (transferir ficheros) |

Cuando tu navegador pide `https://...` se conecta a la IP del servidor **y al puerto 443**. La IP localiza la máquina; el puerto localiza la aplicación dentro de la máquina.

---

## 🧮 El elenco de protocolos que verás este curso

| Protocolo | Capa | Función resumida |
|---|---|---|
| **HTTP / HTTPS** | Aplicación (7) | Páginas web; HTTPS añade cifrado |
| **DNS** | Aplicación (7) | Convierte `google.com` en una IP |
| **DHCP** | Aplicación (7) | Da IP automáticamente al encender |
| **TCP / UDP** | Transporte (4) | Transporte fiable / rápido |
| **IP** | Red (3) | Direccionamiento y enrutamiento |
| **ICMP** | Red (3) | Control y errores (el famoso `ping`) |
| **ARP** | Red/Enlace (3-2) | Traduce IP → MAC |
| **Ethernet** | Enlace (2) | Formato de trama en el cable |

---

## 🔢 Los 5 puertos que te preguntarán

| Puerto | Protocolo | Para qué |
|---|---|---|
| 22 | SSH | administrar un servidor de forma segura |
| 21 | FTP | subir y bajar ficheros |
| 53 | DNS | resolver nombres a IP |
| 80 | HTTP | web sin cifrar |
| 443 | HTTPS | web cifrada |

Si dominas estos cinco, una entrevista de administrador junior te verá como alguien seguro. El resto de puertos se consulta: nadie los memoriza todos.

---

## 🤔 ¿TCP o UDP? El árbol de decisión

En una entrevista te preguntarán esto. Responde con el árbol:

1. **¿Debe llegar SÍ o SÍ, completo y en orden?** (una transferencia de archivo, un pago, un correo) → **TCP**.
2. **¿Es tiempo real y tolero perder algo?** (una llamada, un streaming, un juego online) → **UDP**.
3. **¿Es una consulta corta de gestión?** (una pregunta al DNS, un ping de monitorización) → **UDP**, salvo que la respuesta deba ser fiable, entonces TCP.

| Necesidad | Protocolo |
|---|---|
| Bajar un PDF de 2 GB | TCP |
| Videollamada con la familia | UDP |
| Enviar un correo | TCP |
| Contestar una única consulta DNS | UDP |

---

## ⚖️ TCP vs UDP: la decisión clave

| Característica | TCP | UDP |
|---|---|---|
| Conexión | Orientado a conexión (viaje de 3 pasos) | Sin conexión (envío directo) |
| Fiabilidad | Garantiza entrega (ACK + reintentos) | No garantiza |
| Orden | Los datos llegan en orden | Pueden llegar desordenados |
| Velocidad | Más lento (más control) | Más rápido (sin sobrecarga) |
| Uso típico | Web, correo, FTP | Streaming, VoIP, DNS, juegos |

> 💡 **Regla práctica:** si los datos deben llegar sí o sí y en orden → **TCP**. Si la velocidad importa y puedes tolerar perder algún paquete → **UDP**.

### Caso real: una videollamada

- Con **TCP**, si se pierde un trocito de vídeo, se reintenta la retransmisión y la llamada se congela esperando el dato.
- Con **UDP** se descarta el trocito perdido y la llamada sigue fluyendo (aunque pierda un chasquido). Por eso el audio y el vídeo en vivo usan UDP.

---

## 🔬 Ejemplo resuelto: el saludo de TCP en 3 pasos

TCP es "orientado a conexión": antes de mandar datos, las dos partes negocian.

1. Tu PC envía **SYN** ("¿Hablas TCP?").
2. El servidor responde **SYN-ACK** ("Sí, ¿empezamos?").
3. Tu PC envía **ACK** ("Vale, empezamos").

A partir de ahí fluyen los datos con numeración y confirmaciones (ACK) para garantizar la entrega en orden. Al terminar, se cierra con otra pareja de mensajes (FIN/ACK). Ese "viaje de 3 pasos" es el famoso *three-way handshake*, la base de cualquier web HTTPS.

---

## 🧠 Mini-chequeo

1. ¿Qué puerto usa por defecto HTTPS? ¿Es TCP o UDP?
2. Para una videollamada, ¿elegirías TCP o UDP? ¿Por qué?

<details>
<summary>🔄 Respuestas</summary>

1. **443/TCP**. (El 80/TCP es el HTTP sin cifrar; el 53/UDP es el DNS.)
2. **UDP**: prefiere saltarse un trocito perdido antes que congelar la llamada esperando la retransmisión.

</details>

---

## ✅ Resumen en 3 frases

1. Un protocolo son **reglas acordadas** para comunicarse: el idioma de la red.
2. Los **puertos** localizan la aplicación mientras la IP localiza la máquina.
3. **TCP** entrega garantizado en orden; **UDP** es rápido pero sin garantías. Elige según la prioridad: datos o fluidez.

> 🐛 **Vocabulario rápido**
>
> | Término | Idea general |
> |---|---|
> | Protocolo | Reglas para comunicarse |
> | Puerto | Número que identifica la aplicación destino |
> | TCP | Transporte fiable y ordenado |
> | UDP | Transporte rápido y ligero |
> | DNS | Traduce nombre a IP |
> | HTTP/HTTPS | Tráfico web |

📚 [Volver al índice de la unidad](/ApuntesRedes/01-fundamentos-redes) · **Anterior:** [05 · El modelo OSI](/ApuntesRedes/01-fundamentos-redes/05-modelo-osi) · **Siguiente:** [07 · Direcciones MAC e IP](/ApuntesRedes/01-fundamentos-redes/07-direcciones-mac-ip)