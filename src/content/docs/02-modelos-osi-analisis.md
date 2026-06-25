---
title: U02 — Modelos OSI y análisis de tráfico
description: El paquete perdido 🧳
---

<p><small>El paquete perdido 🧳</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 **ENCAPSULADO** → 🔌 Cable → 🏷️ IP → 🌍 IPv6 → 🔀 Switch → 🏢 VLAN → 🧭 Router → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*Un paquete HTTP abandona el navegador y se encuentra envuelto en múltiples capas de protocolo. Cada capa añade su propia cabecera: TCP, IP, Ethernet. El paquete no entiende por qué necesita tanto envoltorio... pero cada capa es esencial para que llegue a su destino.*

Hoy entendemos el modelo OSI, TCP/IP, y cómo Wireshark te permite ver el alma de los paquetes.

---

## 📚 Contenidos

- Modelo OSI: 7 capas en detalle
- Modelo TCP/IP: 4 capas
- Encapsulación y desencapsulación con tamaños reales
- Protocolos: HTTP, DNS, TCP, UDP, IP, ARP
- Cabeceras: estructura de Ethernet, IP, TCP, UDP
- Handshake TCP en 3 pasos
- Puertos y sockets
- Wireshark: interfaz, filtros, seguimiento de flujo

---

## 📋 Modelo OSI en detalle

El **modelo OSI** (*Open Systems Interconnection*) fue creado por la ISO en 1984 como marco de referencia para la comunicación en red. Divide el proceso en 7 capas, cada una con responsabilidades bien definidas.

### ¿Por qué capas?

- **Abstracción:** cada capa oculta su complejidad a las demás
- **Intercambiabilidad:** puedes cambiar WiFi por cable sin tocar TCP/IP
- **Estandarización:** fabricantes distintos pueden interoperar

### Las 7 capas en detalle

| Capa | Nombre | PDU | Dispositivos | Función principal |
|---|---|---|---|---|
| 7 | **Aplicación** | Datos | PC, servidor | Interfaz con el usuario. HTTP, FTP, DNS, SMTP |
| 6 | **Presentación** | Datos | PC, servidor | Traducción, cifrado, compresión. SSL/TLS, JPEG |
| 5 | **Sesión** | Datos | PC, servidor | Establece, gestiona y cierra sesiones. RPC, SQL |
| 4 | **Transporte** | Segmento | PC, servidor | Segmentación, control de flujo, fiabilidad. TCP, UDP |
| 3 | **Red** | Paquete | Router | Direccionamiento lógico (IP), enrutamiento. IP, ICMP |
| 2 | **Enlace** | Trama | Switch, bridge | Direccionamiento físico (MAC), acceso al medio. Ethernet, WiFi |
| 1 | **Física** | Bits | Hub, repetidor, módem | Transmisión de bits por el medio. Cables, fibra, radio |

### Capa 7 — Aplicación

Es la capa que ve el usuario. Los protocolos de aplicación definen cómo se formatean e intercambian los datos entre programas:

- **HTTP/HTTPS:** navegación web
- **DNS:** resolución de nombres
- **FTP:** transferencia de archivos
- **SMTP/POP3/IMAP:** correo electrónico
- **DHCP:** asignación automática de IPs

No confundir con las aplicaciones en sí. El navegador Chrome NO es la capa de aplicación; es una aplicación que *usa* protocolos de la capa 7.

### Capa 6 — Presentación

Hace de traductor entre el formato interno del equipo y el formato de red estándar. Sus funciones:

- **Traducción:** conversión de códigos (ASCII, Unicode, EBCDIC)
- **Cifrado:** SSL/TLS transforma datos legibles en texto cifrado
- **Compresión:** reduce el tamaño de los datos antes de enviarlos

En la práctica, estas funciones suelen integrarse en la capa de Aplicación (TLS va sobre TCP, pero se configura desde la app).

### Capa 5 — Sesión

Gestiona los diálogos entre aplicaciones:
- **Apertura y cierre** de sesiones de comunicación
- **Sincronización:**插入 puntos de control (*checkpoints*) en transferencias largas para poder reanudar si falla
- **Gestión de tokens:** quién habla y quién escucha

Ejemplo: cuando descargas un archivo grande y se corta, a veces puedes reanudar la descarga. Eso es la capa de sesión.

### Capa 4 — Transporte

**La capa más crítica para el desarrollador.** Se encarga de la segmentación de datos, control de flujo y fiabilidad:

- **Segmentación:** divide los datos de aplicación en trozos manejables
- **Control de flujo:** el receptor dice "para un momento, que voy lento"
- **Fiabilidad:** retransmisión de segmentos perdidos (solo TCP)
- **Multiplexación:** múltiples aplicaciones usando la red a la vez, identificadas por puertos

Dos protocolos estrella: **TCP** (fiable) y **UDP** (rápido).

### Capa 3 — Red

El ***cerebro*** de la comunicación. Responsabilidades:

- **Direccionamiento lógico:** asigna direcciones IP únicas en la red global
- **Enrutamiento:** decide la mejor ruta para cada paquete
- **Fragmentación:** divide paquetes grandes si la capa 2 no los soporta

El protocolo estrella es **IP** (Internet Protocol), en sus versiones 4 y 6.

### Capa 2 — Enlace

Gestiona la comunicación dentro del mismo segmento de red:

- **Direccionamiento físico:** direcciones MAC de 48 bits
- **Detección de errores:** CRC (*Cyclic Redundancy Check*) en cada trama
- **Control de acceso al medio:** quién habla cuando hay múltiples dispositivos

Protocolos: **Ethernet** (cableado), **WiFi** (inalámbrico), **PPP** (punto a punto).

### Capa 1 — Física

El plano más bajo: bits viajando por el medio. Se encarga de:

- **Codificación:** cómo se representan los 0 y 1 (voltajes, pulsos de luz, ondas de radio)
- **Sincronización:** el reloj entre emisor y receptor
- **Conectores y cableado:** RJ45, fibra LC, antenas WiFi

> 💡 **Regla práctica para diagnosticar:** Si ves LEDs apagados en el switch, el problema está en capa 1. Si ves LEDs pero no hay ping, probablemente capa 3. Si la web no carga pero el ping funciona, capa 7.

---

## 🌐 Modelo TCP/IP

El modelo **TCP/IP** es el que realmente se usa en Internet. Surgió del proyecto ARPANET en los años 70 y es menos académico pero más práctico que OSI:

| Capa OSI | Capa TCP/IP | Protocolos principales |
|---|---|---|
| 7, 6, 5 — Aplicación, Presentación, Sesión | **Aplicación** | HTTP, DNS, FTP, SMTP, SSH |
| 4 — Transporte | **Transporte** | TCP, UDP |
| 3 — Red | **Internet** | IP, ICMP, ARP |
| 2, 1 — Enlace, Física | **Acceso a Red** | Ethernet, WiFi, PPP |

### Mapeo OSI ↔ TCP/IP

```
OSI 7-6-5 ──────→ TCP/IP Aplicación  (todo en una)
OSI 4     ──────→ TCP/IP Transporte   (igual)
OSI 3     ──────→ TCP/IP Internet     (igual)
OSI 2-1   ──────→ TCP/IP Acceso Red   (fusión)
```

TCP/IP no tiene capas de Presentación ni Sesión separadas. En la práctica, esas funciones se negocian dentro del protocolo de aplicación (por ejemplo, TLS va sobre TCP pero lo gestiona la aplicación).

---

## 📦 Encapsulación: el viaje de los datos

La encapsulación es el proceso por el cual los datos, al viajar de arriba abajo en el modelo OSI, son envueltos en sucesivas cabeceras. Cada capa añade su propia información de control:

```
[Datos de aplicación]           ← Capa 7 (HTTP: "GET /index.html")
     ↓
[TCP | Datos]                   ← Capa 4 (añade puertos, seq, ack) → SEGMENTO
     ↓
[IP | TCP | Datos]              ← Capa 3 (añade IPs origen/destino) → PAQUETE
     ↓
[Ethernet | IP | TCP | Datos | FCS]  ← Capa 2 (añade MACs + CRC) → TRAMA
     ↓
[1011010010111010...]           ← Capa 1 (bits en el cable)
```

### Tamaño real de las cabeceras

| Cabecera | Tamaño | Campos principales |
|---|---|---|
| **Ethernet** | 14 bytes + 4 bytes FCS | MAC destino (6), MAC origen (6), EtherType (2) |
| **IPv4** | 20-60 bytes | Versión, TOS, longitud total, ID, TTL, protocolo, checksum, IP origen, IP destino |
| **TCP** | 20-60 bytes | Puerto origen, puerto destino, seq num, ack num, flags, window |
| **UDP** | 8 bytes | Puerto origen, puerto destino, longitud, checksum |

> 💡 **Overhead total:** Un paquete HTTP típico lleva al menos 14 (Ethernet) + 20 (IP) + 20 (TCP) = **54 bytes de cabeceras** por cada paquete. En redes lentas, este overhead puede ser significativo.

---

## 🗣️ Protocolos en acción

### TCP — Transmission Control Protocol

TCP es el protocolo de transporte **fiable**. Garantiza que los datos lleguen en orden, sin duplicados y sin pérdidas. Para lograrlo, establece una conexión antes de transmitir:

**Three-Way Handshake (3WHS)**

```
CLIENTE                     SERVIDOR
   │                           │
   ├───────── SYN ────────────►│  Paso 1: Cliente envía SYN (seq=x)
   │◄──────── SYN-ACK ────────┤  Paso 2: Servidor responde SYN+ACK (seq=y, ack=x+1)
   ├───────── ACK ────────────►│  Paso 3: Cliente confirma ACK (seq=x+1, ack=y+1)
   │◄══════ DATOS ═══════════►│  ¡Conexión establecida! Comienza la transferencia
```

**Flags TCP importantes:**

| Flag | Nombre | Significado |
|---|---|---|
| **SYN** | Synchronize | Inicia una conexión |
| **ACK** | Acknowledgment | Confirma recepción |
| **FIN** | Finish | Cierra conexión amigablemente |
| **RST** | Reset | Cierra conexión forzosamente (error) |
| **PSH** | Push | Envía datos inmediatamente sin esperar buffer lleno |
| **URG** | Urgent | Datos urgentes (rara vez usado) |
| **SYN-ACK** | SYN + ACK | Respuesta a SYN en el handshake |

**Ventana deslizante (Sliding Window):**
TCP no envía un paquete y espera la confirmación. Envía varios a la vez (ventana de tamaño `window`). El receptor anuncia su *window size* en cada ACK para controlar el flujo:

```
Emisor → [Paq1][Paq2][Paq3] → Receptor
         ← ACK(1) ←
         ← ACK(2) ←  
Emisor: "Ventana de 3, puedo seguir"
```

### UDP — User Datagram Protocol

UDP es el protocolo de transporte **no fiable**. Envía datagramas sin establecer conexión, sin garantía de entrega, sin control de orden:

| Característica | TCP | UDP |
|---|---|---|
| Conexión | Orientado a conexión (SYN, SYN-ACK, ACK) | Sin conexión |
| Fiabilidad | ACK + retransmisión automática | Sin confirmación |
| Orden | Los segmentos llegan en orden | Pueden llegar desordenados |
| Control de flujo | Sí (ventana deslizante) | No |
| Cabecera | 20-60 bytes | 8 bytes fijos |
| Velocidad | Más lento | Más rápido |
| Uso típico | Web (HTTP), email, FTP, SSH | Streaming, VoIP, DNS, gaming, DHCP |

### IP — Internet Protocol

IP se encarga del direccionamiento y fragmentación. Características clave:

**IPv4 header:**
```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
├─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┤
│Version│  IHL  │Type of Service│          Total Length           │
├─┬─┬─┬─┬─┬─┬─┬─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┤
│         Identification        │Flags│    Fragment Offset       │
├─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┤
│  Time to Live │   Protocol   │        Header Checksum           │
├─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┤
│                       Source Address                           │
├─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┤
│                    Destination Address                         │
├─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┤
│                    Options (if IHL > 5)                       │
└─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘
```

Campos clave de IP:
- **TTL (Time to Live):** evita bucles infinitos. Cada router decrementa en 1. Si llega a 0, el paquete se descarta.
- **Protocol:** indica qué protocolo de capa 4 transporta (6=TCP, 17=UDP, 1=ICMP)
- **Checksum:** verifica integridad de la cabecera IP (no de los datos)

### Ethernet Frame

```
 ┌─────────────────────────────────────────────────────────────────┐
 │  Dest MAC (6)  │  Src MAC (6)  │ EtherType (2) │ Payload (46-1500) │ FCS (4) │
 └─────────────────────────────────────────────────────────────────┘
```

- **EtherType:** qué protocolo de capa 3 lleva dentro (0x0800=IPv4, 0x86DD=IPv6, 0x0806=ARP)
- **MTU (Maximum Transmission Unit):** 1500 bytes en Ethernet estándar. Es el tamaño máximo del payload de la trama.
- **FCS (Frame Check Sequence):** CRC de 4 bytes para detectar errores

### Puertos: la puerta de entrada

Los puertos permiten que múltiples aplicaciones compartan una misma IP. Un **socket** es la combinación IP + puerto:

```
Socket = 192.168.1.10:443
         ↑ IP         ↑ Puerto
```

**Rangos de puertos:**

| Rango | Nombre | Ejemplos |
|---|---|---|
| 0-1023 | **Well-Known** | HTTP(80), HTTPS(443), SSH(22), DNS(53) |
| 1024-49151 | **Registered** | MySQL(3306), RDP(3389), Minecraft(25565) |
| 49152-65535 | **Dynamic/Private** | Puertos efímeros usados por clientes |

Cuando abres una web, tu navegador usa un puerto efímero (ej. 54321) como origen y el 443 como destino:

```
Origen:  192.168.1.10:54321
Destino: 142.250.184.4:443
```

---

## 🔬 Wireshark: el microscopio de redes

Wireshark es la herramienta más importante para analizar tráfico de red. Captura todos los paquetes que pasan por una interfaz y te permite inspeccionarlos capa por capa.

### Interfaz principal

Al abrir Wireshark ves:
1. **Lista de interfaces disponibles:** selecciona la activa (Ethernet, WiFi)
2. **Ventana de paquetes (arriba):** lista en tiempo real de todos los paquetes capturados
3. **Detalles del paquete (medio):** árbol expandible con cada capa OSI
4. **Bytes sin procesar (abajo):** el paquete en hexadecimal y ASCII

### Filtros básicos

| Filtro | Qué hace |
|---|---|
| `dns` | Solo tráfico DNS |
| `http` | Solo tráfico HTTP |
| `tcp` | Solo segmentos TCP |
| `udp` | Solo datagramas UDP |
| `ip.addr == 192.168.1.1` | Tráfico hacia/desde una IP |
| `tcp.port == 443` | Tráfico en el puerto 443 |
| `arp` | Solo paquetes ARP |
| `icmp` | Solo paquetes ICMP (ping) |
| `!dns` | Todo EXCEPTO DNS |
| `tcp.analysis.flags` | Paquetes TCP con problemas (retransmisiones, duplicados) |

### Seguimiento de flujo TCP

Wireshark puede reconstruir toda una conversación TCP. Haz clic derecho en un paquete → *Follow* → *TCP Stream*. Verás el diálogo completo entre cliente y servidor, como si fuera una conversación de chat:

```
GET / HTTP/1.1
Host: google.com

HTTP/1.1 200 OK
Content-Type: text/html
...
```

Esto es esencial para depurar protocolos de aplicación.

### Filtros por capa OSI

| Capa OSI | Filtro Wireshark | Ejemplo |
|---|---|---|
| Capa 7 | `http`, `dns`, `tls` | `http.request.method == "POST"` |
| Capa 4 | `tcp`, `udp` | `tcp.port == 22` |
| Capa 3 | `ip`, `ipv6`, `icmp` | `ip.src == 10.0.0.1` |
| Capa 2 | `eth`, `arp` | `eth.addr == aa:bb:cc:dd:ee:ff` |

### Colores por defecto en Wireshark

Wireshark colorea los paquetes para identificar tipos rápidamente:
- **Morado claro:** Tráfico TCP
- **Azul claro:** Tráfico UDP
- **Verde claro:** Tráfico HTTP
- **Amarillo claro:** Tráfico DNS
- **Rojo claro:** Paquetes con errores o retransmisiones

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

> 💡 **¿Sabías que una petición web típica genera entre 10 y 30 paquetes?** DNS (2-4), TCP handshake (3), TLS handshake (5-10), HTTP request+response (2+), y luego cierre TCP (4). Y eso solo para cargar la página principal, sin imágenes ni scripts.

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

5. Soy la trama que viaja por el cable. Tengo MACs, tengo el payload IP dentro. Los switches me leen.

6. Mi cabecera tiene 8 bytes fijos. No hay handshake, no hay confirmación. Soy el minimalismo hecho protocolo.

<details>
<summary>🔄 Respuestas</summary>

1. **Capa de Red (OSI capa 3)** — IP, routers, enrutamiento.
2. **TCP** — Protocolo de Control de Transmisión, fiable.
3. **UDP** — Protocolo de Datagramas de Usuario, no fiable pero rápido.
4. **DNS** — Sistema de Nombres de Dominio.
5. **Trama Ethernet** — Capa de Enlace (OSI capa 2).
6. **UDP** — Solo 8 bytes de cabecera, sin conexión previa.

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

**Fallo intencionado:** Antes de empezar, ve a la configuración de red y cambia el servidor DNS a una IP inventada (ej. 192.0.2.99). Ahora captura e intenta navegar. ¿Qué falla? ¿En qué capa OSI está el fallo?

> **Pista:** Si el ping a 8.8.8.8 funciona pero el navegador no carga páginas, el problema es de resolución de nombres. Si ni siquiera el ping funciona... el problema está más abajo.

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

1. **Capa 7:** HTTP → "HOLA" | **Capa 4:** TCP → segmento (cabecera TCP + "HOLA") | **Capa 3:** IP → paquete (cabecera IP + segmento) | **Capa 2:** Ethernet → trama (cabecera Ethernet + paquete + FCS) | **Capa 1:** Bits en el cable.

2. De fuera a dentro: **Ethernet (14 bytes)** → **IP (20 bytes)** → **TCP (20 bytes)** → **HTTP (variable)**.

3. TCP/IP fusiona: Física + Enlace = **Acceso a Red**; Sesión + Presentación + Aplicación = **Aplicación**. El resultado es más práctico pero menos granular.

4. **PDU** = Protocol Data Unit (unidad de datos de protocolo, ej. segmento, paquete, trama). **SDU** = Service Data Unit (datos que una capa pasa a la inferior). **ICI** = Interface Control Information (información de control entre capas).

5. **TTL (Time to Live)** evita bucles infinitos. Cada salto (router) decrementa en 1. TTL=1 solo llega al primer router (¡y puede responder ICMP Time Exceeded!). TTL=0 se descarta inmediatamente.

6. **SYN-ACK.** Es el paso 2 del three-way handshake. El servidor responde al SYN del cliente confirmando (ACK) y solicitando su propio SYN.

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
3. **"¿Qué pasa cuando escribes google.com en el navegador y le das a Enter?"** (Pregunta clásica, que cubra DNS, TCP, HTTP)
4. **"¿En qué capa OSI trabajan un switch, un router y un hub?"**
5. **"Si ves muchos paquetes TCP Retransmission en Wireshark, ¿qué sospechas?"**
6. **"Explica el three-way handshake de TCP. ¿Qué pasa si nunca llega el ACK final?"**
7. **"¿Qué es el MTU? ¿Qué pasa si un paquete es más grande que el MTU?"**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Por qué el modelo OSI tiene exactamente 7 capas y no otro número?**

El modelo OSI se dividió en 7 capas para separar claramente las responsabilidades de cada nivel de abstracción. Cada capa resuelve un problema específico de la comunicación: desde la transmisión física de bits (capa 1) hasta la interacción con las aplicaciones (capa 7). Esta separación facilita el diseño, la implementación y el mantenimiento de los protocolos, además de permitir que distintas tecnologías puedan interoperar siempre que respeten las interfaces entre capas.

---

> ❓ **¿No sería más eficiente usar una única capa que hiciera todo?**

No, porque la complejidad de la comunicación en red requiere abordar distintos problemas por separado. Una única capa tendría que gestionar simultáneamente la transmisión física, el direccionamiento, el control de errores, la segmentación de datos y la interpretación de la aplicación, lo que haría el sistema extremadamente rígido y difícil de mantener. La división en capas permite que cada nivel evolucione de forma independiente sin afectar a los demás.

---

> ❓ **Si abro Wireshark en casa, ¿puedo ver el tráfico de mis vecinos?**

No directamente. En una red con switch (la mayoría hoy), solo ves tu propio tráfico y el tráfico broadcast (ARP, DHCP). Los switches aíslan el tráfico unicast. Para ver tráfico ajeno necesitarías ARP spoofing o estar en un hub (o en una red con puerto espejo/configuración específica). En WiFi, si no conoces la clave, el tráfico está cifrado (WPA2/3).

---

> ❓ **¿Qué diferencia hay entre un puerto y un socket?**

Un **puerto** es un número (0-65535) que identifica una aplicación o servicio. Un **socket** es la combinación de una dirección IP y un puerto: `192.168.1.10:443`. El socket es la identificación completa de un extremo de la comunicación. Dos sockets (origen y destino) definen una **conexión**.

---

## 🎬 Post-Créditos

Un paquete viaja encapsulado con cuatro niveles de cabeceras: Ethernet, IP, TCP y HTTP. Al llegar a un switch, este examina la dirección MAC destino en la cabecera Ethernet. Si la MAC no corresponde a ningún puerto conocido, el switch inunda la trama por todos los puertos excepto el de origen. Cuando el destinatario responde, el switch aprende la MAC y actualiza su tabla. El paquete continúa su camino capa por capa hasta llegar a la aplicación destino.

**PRÓXIMAMENTE EN U03:** El viaje por el medio físico: cómo se transmiten los bits, qué es el ancho de banda, y por qué los cables UTP tienen 8 hilos.

---

## ✅ Criterios de evaluación cubiertos

**RA1: Reconoce la estructura de las redes de datos identificando sus elementos y principios de funcionamiento.**

| Criterio | Cubierto |
|---|---|
| d) Arquitecturas de red y niveles | ✅ OSI y TCP/IP explicados en detalle |
| e) Concepto de protocolo | ✅ HTTP, TCP, UDP, ARP, DNS, IP |
| f) Pilas de protocolos | ✅ Encapsulación con cabeceras, laboratorio Wireshark |
| g) Elementos funcionales, físicos y lógicos | ✅ Capas OSI, dispositivos por capa |
