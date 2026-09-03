---
title: "02 — Las 7 capas en detalle"
description: Un paseo capa por capa, con protocolos y quién vive en cada una 🪜
---

<p><small>Un paseo capa por capa, con protocolos y quién vive en cada una 🪜</small></p>

> 🗺️ **Estás en:** 📡 **U03 · Modelos OSI y análisis** → 02 · Las 7 capas en detalle

---

## 📬 La idea en una frase

> Cada capa del modelo OSI resuelve **un problema concreto** de la comunicación: esta es la guía de qué hace cada una y qué protocolo la representa en la vida real.

En el [punto 1](/ApuntesRedes/03-modelos-osi-analisis/01-modelo-osi) viste el plano general. Ahora entramos a fondo: qué hace, qué protocolos usa y en qué dispositivos vive cada una de las 7 capas.

---

## 🪜 De la aplicación al cable

### Capa 7 — Aplicación

Es la capa que **ve el usuario**. Aquí se define cómo se formatean e intercambian los datos entre programas:

- **HTTP/HTTPS:** navegación web
- **DNS:** resolución de nombres a IP
- **FTP:** transferencia de archivos
- **SMTP/POP3/IMAP:** correo electrónico
- **DHCP:** asignación automática de IPs

> ⚠️ **Confusión clásica:** el navegador Chrome NO es la capa de aplicación. Chrome es una **aplicación** que *usa* protocolos de la capa 7 (HTTP). La capa es el protocolo, no el programa.

**Ejemplo resuelto:** cuando escribes `google.com`, en la capa 7 tu navegador emite un `GET / HTTP/1.1` hacia el puerto 80 (o 443). Ese texto es "datos" puros de capa 7.

### Capa 6 — Presentación

Hace de **traductor** entre el formato interno del equipo y el formato estándar de la red:

- **Traducción:** conversión de códigos (ASCII, Unicode, EBCDIC)
- **Cifrado:** SSL/TLS transforma datos legibles en texto cifrado
- **Compresión:** reduce el tamaño antes de enviar

> 💡 **Detalle práctico:** en la vida real estas funciones casi nunca viven en una capa aparte; TLS va montado sobre TCP y lo gestiona la aplicación. La capa 6 es el "aula teórica" que explica *dónde lógicamente* residen esas tareas.

### Capa 5 — Sesión

Gestiona los **diálogos** entre aplicaciones:

- **Apertura y cierre** de sesiones de comunicación
- **Sincronización:** puntos de control (*checkpoints*) para reanudar transferencias largas si fallan
- **Gestión de tokens:** quién habla y quién escucha

**Ejemplo resuelto:** descargas un archivo grande y se corta; a veces puedes *reanudar* la descarga. Eso lo hace la capa de sesión: guarda un checkpoint y continúa desde allí, sin repetir todo.

### Capa 4 — Transporte

**La capa más crítica para el administrador.** Se encarga de:

- **Segmentación:** divide los datos de aplicación en trozos manejables
- **Control de flujo:** el receptor dice "para un momento, que voy lento"
- **Fiabilidad:** retransmisión de segmentos perdidos (solo TCP)
- **Multiplexación:** muchas aplicaciones a la vez, identificadas por **puertos**

Dos protocolos estrella: **TCP** (fiable) y **UDP** (rápido). El detalle completo está en el [punto 5](/ApuntesRedes/03-modelos-osi-analisis/05-tcp-y-udp).

### Capa 3 — Red

El **cerebro** de la comunicación:

- **Direccionamiento lógico:** asigna direcciones IP únicas
- **Enrutamiento:** decide la mejor ruta para cada paquete
- **Fragmentación:** parte paquetes grandes si la capa 2 no los soporta

El protocolo estrella es **IP** en sus versiones 4 y 6 (las verás al detalle en [U05](/ApuntesRedes/05-ipv4-subnetting) y [U06](/ApuntesRedes/06-ipv6-transicion)).

### Capa 2 — Enlace

Gestiona la comunicación **dentro del mismo segmento de red**:

- **Direccionamiento físico:** direcciones MAC de 48 bits
- **Detección de errores:** CRC (*Cyclic Redundancy Check*) en cada trama
- **Control de acceso al medio:** quién habla cuando hay varios dispositivos

Protocolos: **Ethernet** (cableado), **WiFi** (inalámbrico), **PPP** (punto a punto). Aquí trabaja el switch (lo viste en [U02](/ApuntesRedes/02-fundamentos-redes/04-dispositivos)).

### Capa 1 — Física

El plano más bajo: **bits viajando por el medio**. Se encarga de:

- **Codificación:** cómo se representan los 0 y 1 (voltajes, pulsos de luz, ondas de radio)
- **Sincronización:** el reloj entre emisor y receptor
- **Conectores y cableado:** RJ45, fibra LC, antenas WiFi

En capa 1 viven los repetidores y hubs, y su salud se comprueba *mirando LEDs* (regla del punto 1).

---

## 🧭 ¿Quién vive en cada capa?

El mapa de dispositivos por capa te lo resume el diagrama:

<img src="/ApuntesRedes/diagrams/dispositivos-osi.svg" alt="Dispositivos de red mapeados a sus capas OSI" class="diagram-img" loading="lazy" />

| Dispositivo | Capa | ¿Por qué? |
|---|---|---|
| Hub / repetidor | 1 | Solo regenera señales, no lee nada |
| Switch / bridge | 2 | Lee direcciones MAC y decide el puerto |
| Router | 3 | Lee IPs y decide la ruta |
| Firewall | 2-7 | Inspecciona hasta la capa que filtre |
| PC / servidor | 1-7 | Sube y baja toda la pila OSI |

> 💡 **Regla rápida de entrevista:** "un switch trabaja en capa 2, un router en capa 3, y un hub ni siquiera lee" — con eso respondes a un clásico de U02 que vuelve a salir aquí.

---

## 🔬 Ejemplo resuelto: un salto capa por capa

Tu PC (192.168.1.10) habla con otro PC (192.168.1.20) del mismo switch por HTTP:

1. **Capa 7:** el navegador crea `GET /index.html` (datos).
2. **Capa 4:** TCP lo envuelve en un **segmento** con puerto origen 54321 y destino 80.
3. **Capa 3:** IP lo envuelve en un **paquete** con origen 192.168.1.10 y destino 192.168.1.20.
4. **Capa 2:** Ethernet lo envuelve en una **trama** con MAC destino de 192.168.1.20 (obtenida por ARP) y añade el FCS.
5. **Capa 1:** la trama se convierte en **bits** que viajan por el cable hasta el switch.

El switch (capa 2) lee la MAC destino, reenvía la trama por el puerto correcto, y en el destino se recorre el camino inverso quitando cada cabecera (la **desencapsulación** del punto 4).

---

## 🧠 Mini-chequeo

1. ¿Qué capa "traduce" entre formatos y cifra los datos? ¿Por qué en la práctica vive en la aplicación?
2. Un repetidor solo amplifica la señal: ¿en qué capa vive y qué significa eso para su "inteligencia"?
3. ¿Qué capa añade segmentación, control de flujo y puertos?

<details>
<summary>🔄 Respuestas</summary>

1. **Capa 6 (Presentación)** — traduce, cifra y comprime; en la práctica esas funciones las gestiona el protocolo de aplicación (p. ej. TLS sobre TCP).
2. **Capa 1 (Física)** — no lee ninguna cabecera, solo regenera señales: por eso un hub es "tonto" frente a un switch.
3. La **capa 4 (Transporte)** — segmenta los datos, controla el flujo y multiplexa aplicaciones mediante puertos.
</details>

---

## ✅ Resumen en 3 frases

- Subir de capa = más significado y menos física; bajar = más envoltorio y menos lógica.
- Los dispositivos se clasifican por su capa: hub (1), switch (2), router (3).
- Las capas de Presentación y Sesión existen en el modelo, pero en Internet su trabajo lo hace la propia aplicación.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Segmentación | Cortar los datos en trozos manejables en capa 4 |
| CRC | Comprobación de errores de la trama (capa 2) |
| MAC | Dirección física de 48 bits (capa 2) |
| TTL | Contador de saltos del paquete IP (capa 3) |
| Encapsulación | Envolver datos en cabeceras al bajar de capa |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-modelos-osi-analisis) · **Anterior:** [01 · El modelo OSI](/ApuntesRedes/03-modelos-osi-analisis/01-modelo-osi) · **Siguiente:** [03 · El modelo TCP/IP](/ApuntesRedes/03-modelos-osi-analisis/03-modelo-tcp-ip)