---
title: U01 — Fundamentos de redes
description: La red mágica que no funciona 😵‍💫
---


<p><small>La red mágica que no funciona 😵‍💫</small></p>

> 🗺️ **Ruta del paquete:** 🏠 **ORIGEN** → 📦 Encapsulado → 🔌 Cable → 🏷️ IP → 🌍 IPv6 → 🔀 Switch → 🏢 VLAN → 🧭 Router → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

Bienvenido. Esta unidad sienta las bases de todo lo que viene después. Vas a aprender qué es una red, para qué sirve, qué dispositivos la forman y cómo se organizan. No hace falta experiencia previa.

---

## 📚 Contenidos

- ¿Qué es una red? Tipos y alcance
- Topologías: cómo se conectan los dispositivos
- Dispositivos de red: hub, switch, router, AP
- El modelo OSI en 7 capas (visión general)
- Protocolos: el idioma de las redes
- Direcciones MAC e IP
- Conectividad básica: ping, ARP, gateway

---

## 🌐 ¿Qué es una red?

Una **red de ordenadores** es un conjunto de dispositivos electrónicos interconectados que comparten recursos e información. El objetivo fundamental es que dos o más equipos puedan comunicarse entre sí, independientemente de la distancia o la tecnología utilizada.

Las redes existen porque **un ordenador aislado tiene capacidades muy limitadas**. Sin red, para transferir un archivo de un PC a otro tendrías que usar un USB o un CD. Con red, esa transferencia ocurre en segundos desde cualquier lugar del mundo.

### Componentes de una red

Toda red, por simple que sea, necesita estos elementos:

| Componente | Descripción | Ejemplos |
|---|---|---|
| **Dispositivos finales** | Los equipos que usan las personas | PC, portátil, móvil, impresora |
| **Dispositivos de interconexión** | Conectan y dirigen el tráfico | Switch, router, AP, hub |
| **Medio de transmisión** | El canal físico por donde viajan los datos | Cable UTP, fibra óptica, WiFi |
| **Protocolos** | Las reglas del juego | TCP/IP, Ethernet, HTTP |

### ¿Qué se puede hacer en red?

- Compartir archivos e impresoras
- Acceder a recursos remotos (discos, aplicaciones)
- Comunicarse con otros usuarios (correo, mensajería, VoIP)
- Centralizar servicios (bases de datos, servidores web, DNS)
- Trabajar de forma colaborativa en tiempo real
- Acceder a Internet

### Clasificación por arquitectura

Además del alcance geográfico, las redes se clasifican por su **arquitectura**:

**Cliente-Servidor:** Un servidor central ofrece recursos y los clientes los consumen. El servidor es quien tiene los datos, la lógica y la autoridad. Es el modelo dominante en empresas.
- Ventajas: control centralizado, seguridad, backup centralizado
- Desventajas: el servidor es punto único de fallo, requiere administración

**Peer-to-Peer (P2P):** Todos los equipos son iguales y actúan como cliente y servidor a la vez. Cada equipo comparte sus propios recursos.
- Ventajas: sin coste de servidor, fácil de montar, resistente a fallos
- Desventajas: difícil de administrar, inseguro, rendimiento limitado
- Ejemplo típico: redes domésticas pequeñas, compartición de archivos

---

## 📐 Tipos de red según su alcance

No todas las redes son iguales. Se clasifican principalmente por el área geográfica que cubren:

| Tipo | Área | Latencia típica | Ejemplo |
|---|---|---|---|
| **PAN** (Personal Area Network) | Unos metros | < 1 ms | Bluetooth entre móvil y auriculares |
| **LAN** (Local Area Network) | Un edificio o planta | < 1 ms | Red de una oficina, tu casa |
| **CAN** (Campus Area Network) | Varios edificios cercanos | 1-5 ms | Campus universitario, polígono industrial |
| **MAN** (Metropolitan Area Network) | Una ciudad | 5-50 ms | Fibra óptica municipal |
| **WAN** (Wide Area Network) | País o continente | 20-300 ms | Internet, conexión entre sedes |

Cada tipo tiene implicaciones prácticas:
- Las **LAN** tienen baja latencia y alta velocidad, ideales para aplicaciones locales
- Las **WAN** tienen mayor latencia y menor ancho de banda, y suelen contratarse a operadores de telecomunicaciones

### Otras formas de clasificar redes

| Criterio | Categorías |
|---|---|
| **Medio físico** | Cableadas (UTP, fibra, coaxial) vs inalámbricas (WiFi, satélite, 5G) |
| **Propiedad** | Pública (Internet) vs privada (intranet corporativa) |
| **Topología** | Estrella, bus, anillo, malla, árbol, híbrida |
| **Arquitectura** | Cliente-Servidor vs Peer-to-Peer |
| **Velocidad** | Ethernet (100 Mbps), Fast Ethernet (1 Gbps), 10GbE (10 Gbps) |

> 💡 **Para este curso nos centraremos en LAN y WAN.** Las LAN son las redes que administrarás en tu día a día. Las WAN son cómo se conectan esas LAN entre sí. La mayoría de los ejercicios usarán LAN, pero entender las WAN es clave para comprender Internet.

---

## 🔗 Topologías de red

La **topología** describe cómo están conectados los dispositivos entre sí. Hay dos conceptos distintos:

- **Topología física:** cómo se cablean realmente los dispositivos
- **Topología lógica:** cómo fluyen los datos a través de la red (puede ser diferente de la física)

Por ejemplo, puedes tener una topología física en estrella (todo conectado a un switch) pero con topología lógica de anillo si el switch implementa un protocolo de anillo a nivel interno.

### Las 4 topologías fundamentales

### Estrella

Todos los dispositivos se conectan a un punto central (switch o hub).

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/topologia-estrella.svg" alt="Topología en estrella con switch central y 4 PCs" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Cada PC se conecta directamente al switch. Si un cable falla, solo ese PC pierde conexión.</figcaption>
</figure>

✅ **Ventajas:** Fácil de gestionar, un fallo en un cable no afecta a los demás, fácil añadir/quitar dispositivos.
❌ **Inconvenientes:** Si el switch central falla, toda la red se cae. Más cable que bus.

### Bus

Todos los dispositivos comparten un mismo cable (coaxial, generalmente).

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/topologia-bus.svg" alt="Topología en bus con cable coaxial compartido por 4 PCs" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Todos los PCs comparten el mismo cable. Una rotura en cualquier punto deja toda la red fuera de servicio.</figcaption>
</figure>

✅ **Ventajas:** Poco cable, económico, fácil de instalar en tramos lineales.
❌ **Inconvenientes:** Si el cable se rompe en cualquier punto, toda la red se cae. Un solo dominio de colisión (solo un equipo puede transmitir a la vez). Muy difícil de diagnosticar. **Obsoleto desde los años 90.**

### Anillo

Cada dispositivo se conecta al siguiente formando un círculo cerrado.

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/topologia-anillo.svg" alt="Topología en anillo con 4 PCs conectados en círculo" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Cada PC se conecta a sus dos vecinos. Los datos viajan en una dirección (o dos en anillos duales).</figcaption>
</figure>

✅ **Ventajas:** Rendimiento predecible (cada equipo tiene un turno para transmitir), no hay colisiones.
❌ **Inconvenientes:** Si un dispositivo falla, puede romper el anillo entero (según la tecnología). Difícil añadir/quitar equipos (hay que romper el anillo).

### Malla

Cada dispositivo se conecta a todos los demás.

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/topologia-malla.svg" alt="Topología en malla con 4 PCs conectados entre sí" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Cada PC tiene conexión directa con todos los demás. Para n dispositivos, necesitas n×(n-1)/2 cables.</figcaption>
</figure>

✅ **Ventajas:** Máxima redundancia y fiabilidad. Si un cable falla, hay rutas alternativas.
❌ **Inconvenientes:** Muy caro en cableado (crece exponencialmente con el número de nodos). Se usa en backbone de redes críticas (ISP, centros de datos) y en malla parcial (no todos conectados con todos).

### Comparativa rápida

| Topología | Cableado | Redundancia | Coste | Uso actual |
|---|---|---|---|---|
| Estrella | Medio | Baja (punto único) | Bajo | **El estándar hoy** |
| Bus | Bajo | Ninguna | Muy bajo | Obsoleto |
| Anillo | Medio | Media (dual) | Medio | Redes SONET/SDH |
| Malla | Muy alto | Máxima | Muy alto | ISP, datacenters |

> 💡 **La topología más común hoy es estrella.** Todos los dispositivos se conectan a uno o varios switches. Simple, fiable y fácil de ampliar. Cuando tienes varios switches conectados entre sí, se dice que tienes una topología en **árbol** (varias estrellas conectadas).

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/red-domestica.svg" alt="Red doméstica típica con módem, router WiFi, switch, PC, portátil, móvil e impresora" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Una red doméstica típica mezcla cableado (PC fijo) e inalámbrico (portátil, móvil). El router hace de gateway y punto de acceso a la vez.</figcaption>
</figure>

---

## 🧩 Dispositivos de red

Cada dispositivo tiene un rol distinto, y la clave está en qué **capa del modelo OSI** trabajan:

| Dispositivo | Capa OSI | Función principal |
|---|---|---|
| **Repetidor** | Capa 1 (Física) | Regenera la señal para extender el alcance |
| **Hub** | Capa 1 (Física) | Repite señales por todos los puertos |
| **Bridge** | Capa 2 (Enlace) | Conecta dos segmentos de red basándose en MACs |
| **Switch** | Capa 2 (Enlace) | Conecta dispositivos en una LAN, aprende direcciones MAC |
| **Router** | Capa 3 (Red) | Conecta redes distintas usando direcciones IP |
| **Firewall** | Capas 3-4 (Red/Transporte) | Filtra tráfico basado en reglas de seguridad |
| **Access Point (AP)** | Capas 1-2 | Conecta dispositivos inalámbricos a la red cableada |
| **Módem** | Capa 1 | Convierte señales entre digital y analógico/fibra |

### Hub

Dispositivo más básico. Cuando recibe una señal por un puerto, la replica por todos los demás. No segmenta, no aprende, no filtra. Todo lo que llega a un puerto se repite en todos los demás.

> ⚠️ **Problema:** Si dos dispositivos envían datos a la vez, se produce una **colisión** y los datos se pierden. Cuantos más equipos conectes al hub, más colisiones y peor rendimiento. Los hubs están prácticamente **en desuso** desde la década de 2000.

### Switch

Dispositivo inteligente de capa 2. Cuando recibe una trama, **lee la dirección MAC destino** y la reenvía solo por el puerto correspondiente. Si no sabe qué puerto es (no tiene la MAC en su tabla), **inunda** la trama por todos los puertos menos el de origen, pero **aprende** y la próxima vez lo hará correctamente.

Cada vez que una trama pasa por el switch, este registra:
- La **MAC origen** → la asocia al puerto por donde entró
- El **puerto** → para futuras tramas con ese destino

El switch **segmenta los dominios de colisión**: cada puerto es un dominio independiente. Esto significa que PC-A puede enviar datos a PC-B mientras PC-C habla con PC-D sin interferencias.

**Tabla MAC del switch (ejemplo):**

| Dirección MAC | Puerto |
|---|---|
| AA:BB:CC:11:22:33 | 1 |
| AA:BB:CC:44:55:66 | 2 |
| AA:BB:CC:77:88:99 | 3 |

### Router

Dispositivo de capa 3 que conecta **redes diferentes**. Es el cerebro que decide por dónde enviar cada paquete:

- Lee direcciones IP (no MAC)
- Mantiene una **tabla de rutas** con redes destino conocidas y el siguiente salto (next-hop)
- Decide por qué interfaz enviar cada paquete
- Conecta tu LAN con Internet (o con otras LANs remotas)

**Tabla de rutas (ejemplo simplificado):**

| Red destino | Máscara | Siguiente salto | Interfaz |
|---|---|---|---|
| 192.168.1.0 | 255.255.255.0 | Directa | GigabitEthernet0/0 |
| 10.0.0.0 | 255.0.0.0 | 192.168.1.254 | GigabitEthernet0/1 |
| 0.0.0.0 | 0.0.0.0 | 81.22.45.1 | WAN |
| La última es la **ruta por defecto** (default gateway): todo el tráfico sin destino específico va ahí.

> 💡 **Regla sencilla:** El switch conecta dispositivos dentro de la misma red. El router conecta redes diferentes entre sí.

### Otros dispositivos importantes

- **Repetidor:** Amplifica y regenera la señal para superar la distancia máxima del cable. Una señal eléctrica se degrada con la distancia; el repetidor la "limpia" y la reenvía.
- **Bridge:** Similar al switch pero con solo 2 puertos. Une dos redes LAN separadas, filtrando tráfico para evitar tráfico innecesario entre segmentos.
- **Firewall:** Filtra el tráfico basándose en reglas (IP origen, puerto, protocolo). Puede ser hardware (dedicado) o software (firewall de Windows/Linux).
- **Access Point:** Convierte la señal cableada en WiFi. Conecta dispositivos inalámbricos a la red LAN. No confundir con router: un AP no enruta, solo extiende la capa 2 al medio inalámbrico.

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/dispositivos-osi.svg" alt="Dispositivos de red mapeados a sus capas OSI" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Cada dispositivo opera en una o varias capas del modelo OSI. A más capas se asciende, más inteligente es el dispositivo (y más caro).</figcaption>
</figure>

---

## 📋 El modelo OSI en 7 capas

El modelo OSI (*Open Systems Interconnection*) es un marco de referencia creado por la ISO en 1984 que divide la comunicación en 7 capas. Cada capa tiene una función bien definida y solo se comunica con la capa inmediatamente superior e inferior.

### ¿Por qué 7 capas?

Dividir la comunicación en capas tiene ventajas prácticas:
- **Abstracción:** cada capa oculta su complejidad a la capa superior
- **Intercambiabilidad:** puedes cambiar la tecnología de una capa sin afectar a las demás (ej: cambiar WiFi por cable manteniendo TCP/IP)
- **Estandarización:** fabricantes distintos pueden crear productos que funcionen juntos

### Las capas en detalle

| Capa | Nombre | PDU | Función principal | Ejemplos |
|---|---|---|---|---|
| 7 | Aplicación | Datos | Interfaz con el usuario/aplicación | HTTP, FTP, DNS, SMTP |
| 6 | Presentación | Datos | Traducción, cifrado, compresión | SSL/TLS, JPEG, MPEG |
| 5 | Sesión | Datos | Establece, gestiona y cierra sesiones | NetBIOS, RPC, SQL |
| 4 | Transporte | Segmento | Segmentación, control de flujo, fiabilidad | TCP, UDP |
| 3 | Red | Paquete | Direccionamiento lógico, enrutamiento | IP, ICMP, ARP |
| 2 | Enlace | Trama | Direccionamiento físico (MAC), acceso al medio | Ethernet, WiFi, PPP |
| 1 | Física | Bits | Transmisión de bits por el medio | Cables, fibra, radio |

> **PDU** = Protocol Data Unit. Es el nombre que reciben los datos en cada capa: en capa 4 se llaman segmentos, en capa 3 paquetes, en capa 2 tramas.

### El proceso de encapsulación

Cuando envías un dato desde una aplicación, este viaja de arriba abajo en el modelo OSI, y cada capa le añade su propia **cabecera** (header):

```
[ Aplicación ]  → Datos crudos (ej: "GET /index.html")
[ Presentación ] → Añade información de formato/cifrado
[ Sesión ]       → Añade control de sesión
[ Transporte ]   → Añade puerto origen/destino → SEGMENTO
[ Red ]          → Añade IP origen/destino → PAQUETE
[ Enlace ]       → Añade MAC origen/destino + CRC → TRAMA
[ Física ]       → Convierte a bits y los envía
```

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/flujo-encapsulacion.svg" alt="Proceso de encapsulación TCP/IP desde aplicación hasta bits en el cable" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Cada capa añade su cabecera al dato original. Al llegar al destino, el proceso se invierte: desencapsulación.</figcaption>
</figure>

En el destino ocurre el proceso inverso: **desencapsulación**, de abajo arriba, quitando cabeceras hasta llegar a los datos originales.

### Comparación OSI vs TCP/IP

El modelo TCP/IP es el que realmente se usa en Internet. Es más práctico y tiene solo 4 capas:

| OSI | TCP/IP |
|---|---|
| 7-6-5 (Aplicación, Presentación, Sesión) | Aplicación |
| 4 (Transporte) | Transporte |
| 3 (Red) | Internet |
| 2-1 (Enlace, Física) | Acceso a red |

> 💡 **Para este curso** nos centraremos en las capas 1 a 4 del modelo OSI. Las capas 5-7 son conceptualmente importantes pero en la práctica se engloban en una sola capa de **Aplicación** en TCP/IP.

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/modelo-osi-capas.svg" alt="Las 7 capas del modelo OSI con ejemplos de protocolos" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Las 7 capas del modelo OSI. Los datos viajan de arriba abajo al enviar (encapsulación) y de abajo arriba al recibir (desencapsulación). Cada capa añade su propia cabecera.</figcaption>
</figure>

---

## 🗣️ Protocolos

Un **protocolo** es un conjunto de reglas que dos dispositivos acuerdan para comunicarse. Como un idioma: si tú hablas español y yo chino, no nos entendemos. En redes pasa exactamente igual: dos dispositivos deben hablar el mismo protocolo para intercambiar datos.

### Puertos: la puerta de entrada de cada servicio

Los protocolos de capa 4 (TCP/UDP) usan **puertos** para identificar qué aplicación debe recibir los datos. Un puerto es un número de 16 bits (0-65535):

- **0-1023:** Puertos bien conocidos (*well-known*), asignados a servicios estándar
- **1024-49151:** Puertos registrados, para aplicaciones específicas
- **49152-65535:** Puertos dinámicos/privados, usados temporalmente por clientes

| Protocolo | Capa | Puerto | Función |
|---|---|---|---|
| **HTTP** | Aplicación (7) | 80/TCP | Transferencia de páginas web (sin cifrar) |
| **HTTPS** | Aplicación (7) | 443/TCP | Transferencia web cifrada (SSL/TLS) |
| **DNS** | Aplicación (7) | 53/UDP (y TCP) | Resuelve nombres de dominio a direcciones IP |
| **DHCP** | Aplicación (7) | 67-68/UDP | Asignación automática de configuración IP |
| **FTP** | Aplicación (7) | 20-21/TCP | Transferencia de archivos |
| **SSH** | Aplicación (7) | 22/TCP | Acceso remoto seguro |
| **SMTP** | Aplicación (7) | 25/TCP | Envío de correo electrónico |
| **TCP** | Transporte (4) | — | Conexión fiable, orientado a conexión |
| **UDP** | Transporte (4) | — | No fiable, rápido, sin conexión |
| **IP** | Red (3) | — | Direccionamiento y enrutamiento |
| **ICMP** | Red (3) | — | Mensajes de control y error (ping) |
| **ARP** | Red/Enlace (3-2) | — | Resuelve dirección IP a MAC |
| **Ethernet** | Enlace (2) | — | Formato de trama para redes cableadas |

### TCP vs UDP: la decisión clave

| Característica | TCP | UDP |
|---|---|---|
| Conexión | Orientado a conexión (3-way handshake) | Sin conexión (envío directo) |
| Fiabilidad | Garantiza entrega (ACK + retransmisión) | No garantiza entrega |
| Orden | Los segmentos llegan en orden | Pueden llegar desordenados |
| Velocidad | Más lento (overhead de control) | Más rápido (sin sobrecarga) |
| Uso típico | Web (HTTP), email (SMTP), FTP | Streaming, VoIP, DNS, gaming |

> 💡 **Regla práctica:** Si necesitas que los datos lleguen sí o sí y en orden → TCP. Si prefieres velocidad y puedes permitir perder algún paquete → UDP.

---

## 🏷️ Direcciones MAC e IP

Para que dos dispositivos se comuniquen en una red, necesitan dos tipos de direcciones: una **física** (MAC) y una **lógica** (IP).

### MAC (Media Access Control)

- Identificador único de 48 bits asignado de fábrica a cada interfaz de red
- Se representa en hexadecimal: `AA:BB:CC:DD:EE:FF` (6 grupos de 2 dígitos hex)
- Los primeros 24 bits (3 primeros grupos) identifican al **fabricante** (OUI — Organizationally Unique Identifier)
- Los 24 bits restantes son el identificador único del dispositivo dentro del fabricante
- **No cambia** (aunque se puede falsear por software, lo que se llama *MAC spoofing*)
- Funciona exclusivamente en la **capa 2** (Enlace)

**Ejemplo de OUI:** `00:1A:2B` → Cisco, `00:23:5E` → Intel, `3C:07:54` → Raspberry Pi

### IP (Internet Protocol) — IPv4

- Dirección lógica de 32 bits (IPv4) o 128 bits (IPv6)
- Formato IPv4: `192.168.1.10` (4 octetos de 0 a 255 separados por puntos)
- **Cambia** según la red a la que te conectes
- Funciona en la **capa 3** (Red)
- Se divide en dos partes: **dirección de red** + **dirección de host**

### Máscara de subred

La máscara de subred indica qué parte de la IP identifica a la red y qué parte al dispositivo:

```
IP:        192.168.1.10
Máscara:   255.255.255.0  (/24)
Red:       192.168.1.0
Host:      0.0.0.10
```

Los bits a 1 en la máscara indican la porción de red; los bits a 0, la porción de host. `255.255.255.0` en binario son 24 unos y 8 ceros = `/24`.

### Direcciones especiales

| Dirección | Significado |
|---|---|
| `192.168.1.0` | Dirección de **red** (host bits todos a 0) |
| `192.168.1.255` | Dirección de **broadcast** (host bits todos a 1) |
| `192.168.1.1` | Primer host usable (normalmente el gateway) |
| `127.0.0.1` | **Loopback** — tu propio equipo |
| `0.0.0.0` | "Todas las interfaces" o ruta por defecto |

### IPs públicas vs privadas

La IANA reservó rangos de IP para uso interno (no enrutables en Internet):

| Rango privado | Máscara | Uso típico |
|---|---|---|
| `10.0.0.0/8` | 255.0.0.0 | Grandes empresas |
| `172.16.0.0/12` | 255.240.0.0 | Empresas medianas |
| `192.168.0.0/16` | 255.255.0.0 | Hogar y pequeña oficina |

Las IPs privadas se traducen a IPs públicas mediante **NAT** (lo veremos en U10).

### Analogía completa

```
MAC = DNI                   → te identifica como persona, no cambia
IP  = dirección postal       → dice dónde vives, cambia al mudarte
Máscara = código postal      → delimita tu vecindario (tu red)
Puerto = número de piso      → qué persona/aplicación recibe el mensaje
Gateway = oficina de correos → por donde sale tu correo a otras ciudades
DNS = guía telefónica        → traduce "google.com" a una dirección IP
```

---

## 🔌 Conectividad básica: ping, gateway, ARP

### Gateway (puerta de enlace)

El **gateway por defecto** (default gateway) es el dispositivo que permite salir de tu red local hacia otras redes. Normalmente es un router que tiene una IP dentro de tu subred (ej. `192.168.1.1`).

Cuando tu PC quiere enviar datos a un destino fuera de su red:
1. Compara su IP y máscara con la IP destino para determinar si está en la misma red
2. Si está fuera, encapsula el paquete con la **MAC del gateway** como destino (no la MAC del destino final)
3. El gateway recibe el paquete, lo desencapsula, consulta su tabla de rutas y lo reenvía

**Configuración típica de un PC en una LAN:**
```
IP:         192.168.1.10
Máscara:    255.255.255.0
Gateway:    192.168.1.1
DNS:        8.8.8.8
```

### Comandos esenciales de diagnóstico

#### ping

Comando básico para probar conectividad. Envía paquetes ICMP Echo Request y espera Echo Reply:

```bash
ping 8.8.8.8
ping -c 4 google.com   # En Linux/macOS, 4 paquetes
ping -n 4 google.com   # En Windows, 4 paquetes
```

Sirve para:
- Saber si un destino es accesible
- Medir el tiempo de ida y vuelta (**RTT** — Round Trip Time, latencia)
- Detectar pérdida de paquetes (% de paquetes perdidos)
- Verificar resolución DNS (si usas nombre en lugar de IP)

#### ipconfig / ifconfig

Muestra la configuración IP del equipo:

```bash
ipconfig               # Windows
ipconfig /all          # Windows (información detallada, incluye MAC)
ifconfig               # Linux/macOS
ip addr                # Linux (moderno)
```

Lo que debes mirar:
- **Dirección IP** — ¿tiene una IP válida en tu red?
- **Máscara de subred** — ¿es la correcta?
- **Gateway** — ¿tiene gateway? ¿es correcto?
- **DNS** — ¿tiene servidor DNS?
- **Dirección MAC** — para identificar la interfaz

#### arp

Gestiona la tabla ARP local (traducciones IP ↔ MAC):

```bash
arp -a                 # Muestra la tabla ARP completa
arp -d 192.168.1.1     # Borra una entrada concreta
arp -d *               # Limpia toda la tabla
```

#### tracert / traceroute

Muestra la ruta que siguen los paquetes hasta un destino:

```bash
tracert 8.8.8.8        # Windows
traceroute 8.8.8.8     # Linux/macOS
```

Muestra cada **salto** (router intermedio) por el que pasa el paquete, con la latencia de cada uno. Esencial para diagnosticar dónde se pierde la conectividad.

### Escenario completo: ¿qué pasa cuando haces ping a Google?

```
Tu PC (192.168.1.10) → ping 8.8.8.8
```

1. El sistema operativo detecta que `8.8.8.8` **no está en la misma red** (compara IP y máscara: 192.168.1.10/24 vs 8.8.8.8)
2. Consulta la **tabla de rutas** local → debe enviarlo al gateway `192.168.1.1`
3. Consulta la **tabla ARP** local → busca la MAC del gateway
4. Si no está en ARP, lanza un **ARP Request** broadcast: "¿Quién tiene 192.168.1.1?"
5. El gateway responde con **ARP Reply** (su MAC: aa:bb:cc:01:01:01)
6. Tu PC envía el **paquete ICMP Echo Request** con:
   - MAC destino: aa:bb:cc:01:01:01 (la del gateway)
   - IP destino: 8.8.8.8
7. El switch lo recibe y lo reenvía al puerto del gateway
8. El gateway (router) recibe el paquete, ve que la IP destino es 8.8.8.8, consulta su tabla de rutas
9. El router lo reenvía hacia su ISP, que lo reenvía hasta Google
10. Google responde con **ICMP Echo Reply**, siguiendo el camino inverso
11. Tu PC recibe la respuesta y muestra: `Reply from 8.8.8.8: bytes=32 time=12ms TTL=117`

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/flujo-arp-gateway.svg" alt="Flujo ARP: PC solicita la MAC del gateway para salir a Internet" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">El PC necesita la MAC del gateway para enviar paquetes fuera de su red. ARP resuelve la IP 192.168.1.1 a su MAC correspondiente.</figcaption>
</figure>


### Protocolo de diagnóstico paso a paso

Cuando un usuario dice "no tengo Internet", este es el orden de diagnóstico:

| Paso | Comando | ¿Qué comprueba? |
|---|---|---|
| 1 | `ipconfig` | ¿Tengo IP válida? ¿Gateway? |
| 2 | `ping 127.0.0.1` | ¿Funciona mi tarjeta de red? (loopback) |
| 3 | `ping 192.168.1.1` | ¿Llego al gateway? |
| 4 | `ping 8.8.8.8` | ¿Llego a Internet? (sin DNS) |
| 5 | `ping google.com` | ¿Funciona la resolución DNS? |
| 6 | `tracert 8.8.8.8` | ¿Dónde se pierde el paquete?

---

## ⭐ Be the Packet, my friend...

> *Eres un paquete de 1500 bytes que acaba de generarse en la interfaz de red de un portátil. Tu IP origen es 192.168.1.10 y tu destino es 8.8.8.8 (el DNS de Google).*

**Escenario:**
Tu máquina no tiene la MAC de 192.168.1.1 (el gateway) en la tabla ARP.

**¿Qué haces? Elige sabiamente:**

1. **Enviar los datos directamente a 8.8.8.8 sin más** → La capa 2 necesita una MAC destino. No sabes la MAC de 8.8.8.8 porque ni siquiera está en tu subred. Tu paquete se queda en un limbo de confusión y es descartado. ❌
2. **Lanzar un ARP request para preguntar quién tiene la IP 192.168.1.1** → ✅ ¡Bien! Necesitas al gateway. El ARP te dará su MAC, y entonces podrás enviarle el paquete a él para que lo reenvíe.
3. **Preguntarle a DHCP** → El DHCP ya te dio la IP al arrancar. No necesitas preguntar ahora. Sería como llamar al fontanero porque el grifo gotea cuando lo que necesitas es cerrarlo. ❌

> **Solución:** La opción 2. Sin la MAC del gateway, tu paquete no sale ni de casa. **Siempre necesitas la capa 2 (MAC) para moverte en tu red local.**

---

## 🔥 Fireside Chat: Switch vs Hub

> *Dos veteranos de la capa 2 discuten junto a la chimenea del armario de comunicaciones.*

**Hub:** — Mira, yo soy simple. Me llega un bit por un puerto y lo copio a todos los demás. Sin complicaciones.

**Switch:** — Sin complicaciones, dice. ¿Sabes lo que es un dominio de colisión? ¿No? Pues yo sí. Porque yo segmento. Aprendo direcciones MAC. Cuando recibo una trama, SÉ exactamente a qué puerto enviarla. Tú inundas todo como una manguera sin cabeza.

**Hub:** — Oye, que en los 90 funcionaba perfectamente.

**Switch:** — En los 90 también se llevaban los pantalones de campana y mira cómo acabó eso. Yo creo tablas MAC, tú solo repites señales. Yo puedo tener 10 PCs hablando a la vez, tú... tú haces que hablen de uno en uno porque si dos hablan a la vez, COLISIÓN. Fin de la historia.

**Hub:** — Vale, pero... soy más barato.

**Switch:** — *suspiro* Siempre el mismo argumento.

---

## 🕵️ ¿Quién Soy?

Adivina qué dispositivo de red soy:

1. Trabajo en la capa 3. Miro direcciones IP. Decido por dónde enviar los paquetes. Tengo una tabla de rutas.

2. Trabajo en la capa 2. Aprendo MACs. Cuando no sé quién eres, inundo la red. Pero luego aprendo y ya no molesto.

3. Repito todo lo que me llega por todos los puertos excepto por el que me llegó. Básicamente soy un altavoz con patas.

4. Soy el punto donde se conectan todos los cables en una topología estrella. Si yo fallo, todo falla. Sin presión.

<details>
<summary>🔄 Respuestas</summary>

1. **Router** — El que siempre sabe por dónde ir.
2. **Switch** — Aprende MACs, segmenta la red.
3. **Hub** — El altavoz de las redes.
4. **Switch (en topología estrella)** o también un **AP** en redes inalámbricas.

</details>

---

## 🤬 CONRAD VS EL MUNDO: El ping no funciona

> *CONRAD, nuestro switch con problemas de ira, opina sobre el clásico "el ping no funciona".*

**CONRAD:** — "¡OTRA VEZ! Viene un informático y me dice: *CONRAD, no hay ping*. Y yo: vale, ¿has mirado el IP? *Sí*. ¿El gateway? *Sí*. ¿El cable? *...cuál cable?* ¡AY, MADRE MÍA! Sin cable no hay señal. Sin señal no hay bits. Sin bits no hay ping. Es como quejarse de que el coche no arranca sin ruedas."

**La lección:** El 80% de los problemas de red están en la capa física. Antes de renegar de la configuración IP, asegúrate de que el cable está bien conectado. Y sí, a veces la solución es "apágalo y enciéndelo".

---

## ⚡ Laboratorio de Tortura: Monta tu primera red (con fallos)

> **Duración estimada:** 30 minutos
> **Herramienta:** Packet Tracer o hardware real

**El Escenario:**
Tienes 2 PCs (PC-A y PC-B) y 1 switch. Conéctalos, asígnales IP y haz que se hagan ping.

**Configuración:**
- PC-A: 192.168.1.10 / 255.255.255.0
- PC-B: 192.168.1.20 / 255.255.255.0

**Fallo intencionado:** El switch tiene VLAN por defecto. Uno de los puertos está en VLAN 10. El otro en VLAN 1. No lo sabes.

**Tu tarea:** Hacer que funcionen. Si no funciona, diagnostica.

**Pistas para cuando te frustres:**
1. Verifica los LEDs del switch (¿parpadean al conectar? no → problema físico)
2. `ipconfig` o `ifconfig` en cada PC (¿tienen IP?)
3. `arp -a` (¿hay entrada MAC?)
4. El problema real: las VLANs diferentes. Pero eso lo veremos en U07. Por ahora, solo sufre. Digo, aprende.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **El Ping de la Vida** | Conseguir ping entre 2 PCs en Packet Tracer a la primera |
| 🏅 **Cable Detective** | Encontrar el fallo intencionado del laboratorio sin pistas |
| 🏅 **ARP Whisperer** | Explicar a alguien cómo funciona ARP sin usar jerga técnica |
| 🏅 **Topología Pro** | Dibujar de memoria 4 topologías de red distintas |

---

## 🧠 Atrévete a Pensar

1. **Tienes 5 PCs y un switch.** Dibuja la topología. ¿Cuántos cables necesitas como mínimo?
2. **¿Qué pasa si conectas 2 switches entre sí y cada switch tiene 2 PCs?** ¿Cuántos dominios de colisión hay?
3. **Explica con tus palabras** por qué un router puede conectar redes diferentes y un switch no.
4. **Verdadero o falso:** "Un hub y un switch hacen exactamente lo mismo pero el switch es más moderno."

<details>
<summary>💡 Soluciones</summary>

1. 5 cables (uno de cada PC al switch). Topología física en estrella.
2. Cada switch crea dominios de colisión separados por puerto. Con 2 switches y 4 PCs, tienes 4 dominios de colisión (uno por cada puerto donde hay un PC). El enlace entre switches también es un dominio aparte.
3. El router trabaja en capa 3 (IP) y puede leer direcciones IP para decidir rutas. El switch trabaja en capa 2 (MAC) y solo sabe de MACs locales. Es como la diferencia entre un cartero que conoce todas las calles (router) y un repartidor que solo conoce su vecindario (switch).
4. **Falso.** El hub repite señales (capa 1), el switch aprende MACs y segmenta (capa 2). No son lo mismo ni de lejos.

</details>

---

## 🧩 Crucigrama de Bits

```
Horizontal:
1. Dispositivo que reenvía paquetes entre redes IP (6 letras)
3. Conjunto de reglas para la comunicación (8 letras)
5. Red de área local (3 letras)

Vertical:
2. Identificador único de 48 bits para una interfaz de red (3 letras)
4. Pequeña unidad de datos en una red (7 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. ROUTER, 3. PROTOCOLO, 5. LAN
**Vertical:** 2. MAC, 4. PAQUETE

</details>

---

## 💬 Preguntas de Entrevista de Trabajo

> Preguntas reales que te harían en una entrevista para administrador de redes junior.

1. **"Explícame cómo hace ping un PC a otro en la misma red, paso a paso, como si yo fuera tu abuela."**
2. **"¿Cuál es la diferencia entre un switch y un router? Dime al menos 3 diferencias."**
3. **"¿Qué es una dirección MAC? ¿Para qué sirve? ¿Puede cambiar?"**
4. **"¿Qué haces si un PC no tiene conectividad de red? Dame tu proceso de diagnóstico."**
5. **"Enumera 4 topologías de red y dime ventajas e inconvenientes de cada una."**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Qué dispositivo resultaría de combinar un router y un switch?**

No existe un dispositivo que sea router y switch a la vez en una misma función, porque trabajan en capas diferentes del modelo OSI. Un switch opera en la capa 2 (enlace) y gestiona tramas basadas en direcciones MAC, mientras que un router opera en la capa 3 (red) y encamina paquetes basados en direcciones IP. Existen equipos multicapa (capas 3) que integran ambas funciones, pero conceptualmente son funciones separadas: conmutación y enrutamiento.

---

> ❓ **¿Por qué necesito una dirección IP y una dirección MAC?**

La dirección MAC es un identificador único asignado de fábrica a cada interfaz de red, equivalente al DNI de un dispositivo. La dirección IP es una dirección lógica que depende de la red a la que el dispositivo está conectado, como una dirección postal. Ambas son necesarias: la MAC identifica al dispositivo físicamente, mientras que la IP permite localizarlo dentro de la red y enrutar el tráfico correctamente.

---

> ❓ **¿Puedo asignar cualquier dirección IP a mi equipo?**

Técnicamente puedes configurar cualquier dirección IP en tu equipo, pero para que la comunicación funcione, la dirección debe pertenecer a la misma subred que el resto de dispositivos con los que quieras comunicarte. Si asignas una IP de una red diferente, los switches y routers de tu segmento ignorarán los paquetes, ya que no coincidirá con la configuración de red esperada.

---

## 🎬 Post-Créditos

Un paquete de 1500 bytes completa su viaje desde el navegador hasta el servidor DNS 8.8.8.8, pasando por el gateway, múltiples switches y routers. Cada salto decrementa el TTL. En el último tramo, el TTL llega a cero y el paquete es descartado. El emisor recibe un mensaje ICMP Time Exceeded y debe retransmitir.

**PRÓXIMAMENTE EN U03:** El viaje por el medio físico: cómo se transmiten los bits, qué es el ancho de banda, y por qué los cables UTP tienen 8 hilos.

---

## ✅ Criterios de evaluación cubiertos

**RA1: Reconoce la estructura de las redes de datos identificando sus elementos y principios de funcionamiento.**

| Criterio | Cubierto |
|---|---|
| a) Factores que impulsan la evolución de redes | ✅ Secciones de teoría |
| b) Medios de transmisión | ✅ Teoría + laboratorio |
| c) Tipos de red y topologías | ✅ Crucigrama + teoría con diagramas |
| g) Elementos funcionales, físicos y lógicos | ✅ Fireside Chat + ¿Quién Soy? |
| h) Dispositivos de interconexión | ✅ Fireside Chat + laboratorio |
