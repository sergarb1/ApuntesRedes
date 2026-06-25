---
title: U01 ÔÇö Fundamentos de redes
description: La red m├ígica que no funciona ­ƒÿÁÔÇì­ƒÆ½
---

<p><small>La red m├ígica que no funciona ­ƒÿÁÔÇì­ƒÆ½</small></p>

> ­ƒù║´©Å **Ruta del paquete:** ­ƒÅá **ORIGEN** ÔåÆ ­ƒôª Encapsulado ÔåÆ ­ƒöî Cable ÔåÆ ­ƒÅÀ´©Å IP ÔåÆ ­ƒîì IPv6 ÔåÆ ­ƒöÇ Switch ÔåÆ ­ƒÅó VLAN ÔåÆ ­ƒº¡ Router ÔåÆ ­ƒùú´©Å OSPF ÔåÆ ­ƒîÉ NAT ÔåÆ ­ƒ®║ Diagn├│stico ÔåÆ Ôÿü´©Å Cloud

---

Bienvenido. Esta unidad sienta las bases de todo lo que viene despu├®s. Vas a aprender qu├® es una red, para qu├® sirve, qu├® dispositivos la forman y c├│mo se organizan. No hace falta experiencia previa.

---

## ­ƒôÜ Contenidos

- ┬┐Qu├® es una red? Tipos y alcance
- Topolog├¡as: c├│mo se conectan los dispositivos
- Dispositivos de red: hub, switch, router, AP
- El modelo OSI en 7 capas (visi├│n general)
- Protocolos: el idioma de las redes
- Direcciones MAC e IP
- Conectividad b├ísica: ping, ARP, gateway

---

## ­ƒîÉ ┬┐Qu├® es una red?

Una **red de ordenadores** es un conjunto de dispositivos electr├│nicos interconectados que comparten recursos e informaci├│n. El objetivo fundamental es que dos o m├ís equipos puedan comunicarse entre s├¡, independientemente de la distancia o la tecnolog├¡a utilizada.

Las redes existen porque **un ordenador aislado tiene capacidades muy limitadas**. Sin red, para transferir un archivo de un PC a otro tendr├¡as que usar un USB o un CD. Con red, esa transferencia ocurre en segundos desde cualquier lugar del mundo.

### Componentes de una red

Toda red, por simple que sea, necesita estos elementos:

| Componente | Descripci├│n | Ejemplos |
|---|---|---|
| **Dispositivos finales** | Los equipos que usan las personas | PC, port├ítil, m├│vil, impresora |
| **Dispositivos de interconexi├│n** | Conectan y dirigen el tr├ífico | Switch, router, AP, hub |
| **Medio de transmisi├│n** | El canal f├¡sico por donde viajan los datos | Cable UTP, fibra ├│ptica, WiFi |
| **Protocolos** | Las reglas del juego | TCP/IP, Ethernet, HTTP |

### ┬┐Qu├® se puede hacer en red?

- Compartir archivos e impresoras
- Acceder a recursos remotos (discos, aplicaciones)
- Comunicarse con otros usuarios (correo, mensajer├¡a, VoIP)
- Centralizar servicios (bases de datos, servidores web, DNS)
- Trabajar de forma colaborativa en tiempo real
- Acceder a Internet

### Clasificaci├│n por arquitectura

Adem├ís del alcance geogr├ífico, las redes se clasifican por su **arquitectura**:

**Cliente-Servidor:** Un servidor central ofrece recursos y los clientes los consumen. El servidor es quien tiene los datos, la l├│gica y la autoridad. Es el modelo dominante en empresas.
- Ventajas: control centralizado, seguridad, backup centralizado
- Desventajas: el servidor es punto ├║nico de fallo, requiere administraci├│n

**Peer-to-Peer (P2P):** Todos los equipos son iguales y act├║an como cliente y servidor a la vez. Cada equipo comparte sus propios recursos.
- Ventajas: sin coste de servidor, f├ícil de montar, resistente a fallos
- Desventajas: dif├¡cil de administrar, inseguro, rendimiento limitado
- Ejemplo t├¡pico: redes dom├®sticas peque├▒as, compartici├│n de archivos

---

## ­ƒôÉ Tipos de red seg├║n su alcance

No todas las redes son iguales. Se clasifican principalmente por el ├írea geogr├ífica que cubren:

| Tipo | ├ürea | Latencia t├¡pica | Ejemplo |
|---|---|---|---|
| **PAN** (Personal Area Network) | Unos metros | < 1 ms | Bluetooth entre m├│vil y auriculares |
| **LAN** (Local Area Network) | Un edificio o planta | < 1 ms | Red de una oficina, tu casa |
| **CAN** (Campus Area Network) | Varios edificios cercanos | 1-5 ms | Campus universitario, pol├¡gono industrial |
| **MAN** (Metropolitan Area Network) | Una ciudad | 5-50 ms | Fibra ├│ptica municipal |
| **WAN** (Wide Area Network) | Pa├¡s o continente | 20-300 ms | Internet, conexi├│n entre sedes |

Cada tipo tiene implicaciones pr├ícticas:
- Las **LAN** tienen baja latencia y alta velocidad, ideales para aplicaciones locales
- Las **WAN** tienen mayor latencia y menor ancho de banda, y suelen contratarse a operadores de telecomunicaciones

### Otras formas de clasificar redes

| Criterio | Categor├¡as |
|---|---|
| **Medio f├¡sico** | Cableadas (UTP, fibra, coaxial) vs inal├ímbricas (WiFi, sat├®lite, 5G) |
| **Propiedad** | P├║blica (Internet) vs privada (intranet corporativa) |
| **Topolog├¡a** | Estrella, bus, anillo, malla, ├írbol, h├¡brida |
| **Arquitectura** | Cliente-Servidor vs Peer-to-Peer |
| **Velocidad** | Ethernet (100 Mbps), Fast Ethernet (1 Gbps), 10GbE (10 Gbps) |

> ­ƒÆí **Para este curso nos centraremos en LAN y WAN.** Las LAN son las redes que administrar├ís en tu d├¡a a d├¡a. Las WAN son c├│mo se conectan esas LAN entre s├¡. La mayor├¡a de los ejercicios usar├ín LAN, pero entender las WAN es clave para comprender Internet.

---

## ­ƒöù Topolog├¡as de red

La **topolog├¡a** describe c├│mo est├ín conectados los dispositivos entre s├¡. Hay dos conceptos distintos:

- **Topolog├¡a f├¡sica:** c├│mo se cablean realmente los dispositivos
- **Topolog├¡a l├│gica:** c├│mo fluyen los datos a trav├®s de la red (puede ser diferente de la f├¡sica)

Por ejemplo, puedes tener una topolog├¡a f├¡sica en estrella (todo conectado a un switch) pero con topolog├¡a l├│gica de anillo si el switch implementa un protocolo de anillo a nivel interno.

### Las 4 topolog├¡as fundamentales

### Estrella

Todos los dispositivos se conectan a un punto central (switch o hub).

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/topologia-estrella.svg" alt="Topolog├¡a en estrella con switch central y 4 PCs" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Cada PC se conecta directamente al switch. Si un cable falla, solo ese PC pierde conexi├│n.</figcaption>
</figure>

Ô£à **Ventajas:** F├ícil de gestionar, un fallo en un cable no afecta a los dem├ís, f├ícil a├▒adir/quitar dispositivos.
ÔØî **Inconvenientes:** Si el switch central falla, toda la red se cae. M├ís cable que bus.

### Bus

Todos los dispositivos comparten un mismo cable (coaxial, generalmente).

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/topologia-bus.svg" alt="Topolog├¡a en bus con cable coaxial compartido por 4 PCs" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Todos los PCs comparten el mismo cable. Una rotura en cualquier punto deja toda la red fuera de servicio.</figcaption>
</figure>

Ô£à **Ventajas:** Poco cable, econ├│mico, f├ícil de instalar en tramos lineales.
ÔØî **Inconvenientes:** Si el cable se rompe en cualquier punto, toda la red se cae. Un solo dominio de colisi├│n (solo un equipo puede transmitir a la vez). Muy dif├¡cil de diagnosticar. **Obsoleto desde los a├▒os 90.**

### Anillo

Cada dispositivo se conecta al siguiente formando un c├¡rculo cerrado.

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/topologia-anillo.svg" alt="Topolog├¡a en anillo con 4 PCs conectados en c├¡rculo" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Cada PC se conecta a sus dos vecinos. Los datos viajan en una direcci├│n (o dos en anillos duales).</figcaption>
</figure>

Ô£à **Ventajas:** Rendimiento predecible (cada equipo tiene un turno para transmitir), no hay colisiones.
ÔØî **Inconvenientes:** Si un dispositivo falla, puede romper el anillo entero (seg├║n la tecnolog├¡a). Dif├¡cil a├▒adir/quitar equipos (hay que romper el anillo).

### Malla

Cada dispositivo se conecta a todos los dem├ís.

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/topologia-malla.svg" alt="Topolog├¡a en malla con 4 PCs conectados entre s├¡" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Cada PC tiene conexi├│n directa con todos los dem├ís. Para n dispositivos, necesitas n├ù(n-1)/2 cables.</figcaption>
</figure>

Ô£à **Ventajas:** M├íxima redundancia y fiabilidad. Si un cable falla, hay rutas alternativas.
ÔØî **Inconvenientes:** Muy caro en cableado (crece exponencialmente con el n├║mero de nodos). Se usa en backbone de redes cr├¡ticas (ISP, centros de datos) y en malla parcial (no todos conectados con todos).

### Comparativa r├ípida

| Topolog├¡a | Cableado | Redundancia | Coste | Uso actual |
|---|---|---|---|---|
| Estrella | Medio | Baja (punto ├║nico) | Bajo | **El est├índar hoy** |
| Bus | Bajo | Ninguna | Muy bajo | Obsoleto |
| Anillo | Medio | Media (dual) | Medio | Redes SONET/SDH |
| Malla | Muy alto | M├íxima | Muy alto | ISP, datacenters |

> ­ƒÆí **La topolog├¡a m├ís com├║n hoy es estrella.** Todos los dispositivos se conectan a uno o varios switches. Simple, fiable y f├ícil de ampliar. Cuando tienes varios switches conectados entre s├¡, se dice que tienes una topolog├¡a en **├írbol** (varias estrellas conectadas).

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/red-domestica.svg" alt="Red dom├®stica t├¡pica con m├│dem, router WiFi, switch, PC, port├ítil, m├│vil e impresora" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Una red dom├®stica t├¡pica mezcla cableado (PC fijo) e inal├ímbrico (port├ítil, m├│vil). El router hace de gateway y punto de acceso a la vez.</figcaption>
</figure>

---

## ­ƒº® Dispositivos de red

Cada dispositivo tiene un rol distinto, y la clave est├í en qu├® **capa del modelo OSI** trabajan:

| Dispositivo | Capa OSI | Funci├│n principal |
|---|---|---|
| **Repetidor** | Capa 1 (F├¡sica) | Regenera la se├▒al para extender el alcance |
| **Hub** | Capa 1 (F├¡sica) | Repite se├▒ales por todos los puertos |
| **Bridge** | Capa 2 (Enlace) | Conecta dos segmentos de red bas├índose en MACs |
| **Switch** | Capa 2 (Enlace) | Conecta dispositivos en una LAN, aprende direcciones MAC |
| **Router** | Capa 3 (Red) | Conecta redes distintas usando direcciones IP |
| **Firewall** | Capas 3-4 (Red/Transporte) | Filtra tr├ífico basado en reglas de seguridad |
| **Access Point (AP)** | Capas 1-2 | Conecta dispositivos inal├ímbricos a la red cableada |
| **M├│dem** | Capa 1 | Convierte se├▒ales entre digital y anal├│gico/fibra |

### Hub

Dispositivo m├ís b├ísico. Cuando recibe una se├▒al por un puerto, la replica por todos los dem├ís. No segmenta, no aprende, no filtra. Todo lo que llega a un puerto se repite en todos los dem├ís.

> ÔÜá´©Å **Problema:** Si dos dispositivos env├¡an datos a la vez, se produce una **colisi├│n** y los datos se pierden. Cuantos m├ís equipos conectes al hub, m├ís colisiones y peor rendimiento. Los hubs est├ín pr├ícticamente **en desuso** desde la d├®cada de 2000.

### Switch

Dispositivo inteligente de capa 2. Cuando recibe una trama, **lee la direcci├│n MAC destino** y la reenv├¡a solo por el puerto correspondiente. Si no sabe qu├® puerto es (no tiene la MAC en su tabla), **inunda** la trama por todos los puertos menos el de origen, pero **aprende** y la pr├│xima vez lo har├í correctamente.

Cada vez que una trama pasa por el switch, este registra:
- La **MAC origen** ÔåÆ la asocia al puerto por donde entr├│
- El **puerto** ÔåÆ para futuras tramas con ese destino

El switch **segmenta los dominios de colisi├│n**: cada puerto es un dominio independiente. Esto significa que PC-A puede enviar datos a PC-B mientras PC-C habla con PC-D sin interferencias.

**Tabla MAC del switch (ejemplo):**

| Direcci├│n MAC | Puerto |
|---|---|
| AA:BB:CC:11:22:33 | 1 |
| AA:BB:CC:44:55:66 | 2 |
| AA:BB:CC:77:88:99 | 3 |

### Router

Dispositivo de capa 3 que conecta **redes diferentes**. Es el cerebro que decide por d├│nde enviar cada paquete:

- Lee direcciones IP (no MAC)
- Mantiene una **tabla de rutas** con redes destino conocidas y el siguiente salto (next-hop)
- Decide por qu├® interfaz enviar cada paquete
- Conecta tu LAN con Internet (o con otras LANs remotas)

**Tabla de rutas (ejemplo simplificado):**

| Red destino | M├íscara | Siguiente salto | Interfaz |
|---|---|---|---|
| 192.168.1.0 | 255.255.255.0 | Directa | GigabitEthernet0/0 |
| 10.0.0.0 | 255.0.0.0 | 192.168.1.254 | GigabitEthernet0/1 |
| 0.0.0.0 | 0.0.0.0 | 81.22.45.1 | WAN |
| La ├║ltima es la **ruta por defecto** (default gateway): todo el tr├ífico sin destino espec├¡fico va ah├¡.

> ­ƒÆí **Regla sencilla:** El switch conecta dispositivos dentro de la misma red. El router conecta redes diferentes entre s├¡.

### Otros dispositivos importantes

- **Repetidor:** Amplifica y regenera la se├▒al para superar la distancia m├íxima del cable. Una se├▒al el├®ctrica se degrada con la distancia; el repetidor la "limpia" y la reenv├¡a.
- **Bridge:** Similar al switch pero con solo 2 puertos. Une dos redes LAN separadas, filtrando tr├ífico para evitar tr├ífico innecesario entre segmentos.
- **Firewall:** Filtra el tr├ífico bas├índose en reglas (IP origen, puerto, protocolo). Puede ser hardware (dedicado) o software (firewall de Windows/Linux).
- **Access Point:** Convierte la se├▒al cableada en WiFi. Conecta dispositivos inal├ímbricos a la red LAN. No confundir con router: un AP no enruta, solo extiende la capa 2 al medio inal├ímbrico.

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/dispositivos-osi.svg" alt="Dispositivos de red mapeados a sus capas OSI" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Cada dispositivo opera en una o varias capas del modelo OSI. A m├ís capas se asciende, m├ís inteligente es el dispositivo (y m├ís caro).</figcaption>
</figure>

---

## ­ƒôï El modelo OSI en 7 capas

El modelo OSI (*Open Systems Interconnection*) es un marco de referencia creado por la ISO en 1984 que divide la comunicaci├│n en 7 capas. Cada capa tiene una funci├│n bien definida y solo se comunica con la capa inmediatamente superior e inferior.

### ┬┐Por qu├® 7 capas?

Dividir la comunicaci├│n en capas tiene ventajas pr├ícticas:
- **Abstracci├│n:** cada capa oculta su complejidad a la capa superior
- **Intercambiabilidad:** puedes cambiar la tecnolog├¡a de una capa sin afectar a las dem├ís (ej: cambiar WiFi por cable manteniendo TCP/IP)
- **Estandarizaci├│n:** fabricantes distintos pueden crear productos que funcionen juntos

### Las capas en detalle

| Capa | Nombre | PDU | Funci├│n principal | Ejemplos |
|---|---|---|---|---|
| 7 | Aplicaci├│n | Datos | Interfaz con el usuario/aplicaci├│n | HTTP, FTP, DNS, SMTP |
| 6 | Presentaci├│n | Datos | Traducci├│n, cifrado, compresi├│n | SSL/TLS, JPEG, MPEG |
| 5 | Sesi├│n | Datos | Establece, gestiona y cierra sesiones | NetBIOS, RPC, SQL |
| 4 | Transporte | Segmento | Segmentaci├│n, control de flujo, fiabilidad | TCP, UDP |
| 3 | Red | Paquete | Direccionamiento l├│gico, enrutamiento | IP, ICMP, ARP |
| 2 | Enlace | Trama | Direccionamiento f├¡sico (MAC), acceso al medio | Ethernet, WiFi, PPP |
| 1 | F├¡sica | Bits | Transmisi├│n de bits por el medio | Cables, fibra, radio |

> **PDU** = Protocol Data Unit. Es el nombre que reciben los datos en cada capa: en capa 4 se llaman segmentos, en capa 3 paquetes, en capa 2 tramas.

### El proceso de encapsulaci├│n

Cuando env├¡as un dato desde una aplicaci├│n, este viaja de arriba abajo en el modelo OSI, y cada capa le a├▒ade su propia **cabecera** (header):

```
[ Aplicaci├│n ]  ÔåÆ Datos crudos (ej: "GET /index.html")
[ Presentaci├│n ] ÔåÆ A├▒ade informaci├│n de formato/cifrado
[ Sesi├│n ]       ÔåÆ A├▒ade control de sesi├│n
[ Transporte ]   ÔåÆ A├▒ade puerto origen/destino ÔåÆ SEGMENTO
[ Red ]          ÔåÆ A├▒ade IP origen/destino ÔåÆ PAQUETE
[ Enlace ]       ÔåÆ A├▒ade MAC origen/destino + CRC ÔåÆ TRAMA
[ F├¡sica ]       ÔåÆ Convierte a bits y los env├¡a
```

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/flujo-encapsulacion.svg" alt="Proceso de encapsulaci├│n TCP/IP desde aplicaci├│n hasta bits en el cable" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Cada capa a├▒ade su cabecera al dato original. Al llegar al destino, el proceso se invierte: desencapsulaci├│n.</figcaption>
</figure>

En el destino ocurre el proceso inverso: **desencapsulaci├│n**, de abajo arriba, quitando cabeceras hasta llegar a los datos originales.

### Comparaci├│n OSI vs TCP/IP

El modelo TCP/IP es el que realmente se usa en Internet. Es m├ís pr├íctico y tiene solo 4 capas:

| OSI | TCP/IP |
|---|---|
| 7-6-5 (Aplicaci├│n, Presentaci├│n, Sesi├│n) | Aplicaci├│n |
| 4 (Transporte) | Transporte |
| 3 (Red) | Internet |
| 2-1 (Enlace, F├¡sica) | Acceso a red |

> ­ƒÆí **Para este curso** nos centraremos en las capas 1 a 4 del modelo OSI. Las capas 5-7 son conceptualmente importantes pero en la pr├íctica se engloban en una sola capa de **Aplicaci├│n** en TCP/IP.

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/modelo-osi-capas.svg" alt="Las 7 capas del modelo OSI con ejemplos de protocolos" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Las 7 capas del modelo OSI. Los datos viajan de arriba abajo al enviar (encapsulaci├│n) y de abajo arriba al recibir (desencapsulaci├│n). Cada capa a├▒ade su propia cabecera.</figcaption>
</figure>

---

## ­ƒùú´©Å Protocolos

Un **protocolo** es un conjunto de reglas que dos dispositivos acuerdan para comunicarse. Como un idioma: si t├║ hablas espa├▒ol y yo chino, no nos entendemos. En redes pasa exactamente igual: dos dispositivos deben hablar el mismo protocolo para intercambiar datos.

### Puertos: la puerta de entrada de cada servicio

Los protocolos de capa 4 (TCP/UDP) usan **puertos** para identificar qu├® aplicaci├│n debe recibir los datos. Un puerto es un n├║mero de 16 bits (0-65535):

- **0-1023:** Puertos bien conocidos (*well-known*), asignados a servicios est├índar
- **1024-49151:** Puertos registrados, para aplicaciones espec├¡ficas
- **49152-65535:** Puertos din├ímicos/privados, usados temporalmente por clientes

| Protocolo | Capa | Puerto | Funci├│n |
|---|---|---|---|
| **HTTP** | Aplicaci├│n (7) | 80/TCP | Transferencia de p├íginas web (sin cifrar) |
| **HTTPS** | Aplicaci├│n (7) | 443/TCP | Transferencia web cifrada (SSL/TLS) |
| **DNS** | Aplicaci├│n (7) | 53/UDP (y TCP) | Resuelve nombres de dominio a direcciones IP |
| **DHCP** | Aplicaci├│n (7) | 67-68/UDP | Asignaci├│n autom├ítica de configuraci├│n IP |
| **FTP** | Aplicaci├│n (7) | 20-21/TCP | Transferencia de archivos |
| **SSH** | Aplicaci├│n (7) | 22/TCP | Acceso remoto seguro |
| **SMTP** | Aplicaci├│n (7) | 25/TCP | Env├¡o de correo electr├│nico |
| **TCP** | Transporte (4) | ÔÇö | Conexi├│n fiable, orientado a conexi├│n |
| **UDP** | Transporte (4) | ÔÇö | No fiable, r├ípido, sin conexi├│n |
| **IP** | Red (3) | ÔÇö | Direccionamiento y enrutamiento |
| **ICMP** | Red (3) | ÔÇö | Mensajes de control y error (ping) |
| **ARP** | Red/Enlace (3-2) | ÔÇö | Resuelve direcci├│n IP a MAC |
| **Ethernet** | Enlace (2) | ÔÇö | Formato de trama para redes cableadas |

### TCP vs UDP: la decisi├│n clave

| Caracter├¡stica | TCP | UDP |
|---|---|---|
| Conexi├│n | Orientado a conexi├│n (3-way handshake) | Sin conexi├│n (env├¡o directo) |
| Fiabilidad | Garantiza entrega (ACK + retransmisi├│n) | No garantiza entrega |
| Orden | Los segmentos llegan en orden | Pueden llegar desordenados |
| Velocidad | M├ís lento (overhead de control) | M├ís r├ípido (sin sobrecarga) |
| Uso t├¡pico | Web (HTTP), email (SMTP), FTP | Streaming, VoIP, DNS, gaming |

> ­ƒÆí **Regla pr├íctica:** Si necesitas que los datos lleguen s├¡ o s├¡ y en orden ÔåÆ TCP. Si prefieres velocidad y puedes permitir perder alg├║n paquete ÔåÆ UDP.

---

## ­ƒÅÀ´©Å Direcciones MAC e IP

Para que dos dispositivos se comuniquen en una red, necesitan dos tipos de direcciones: una **f├¡sica** (MAC) y una **l├│gica** (IP).

### MAC (Media Access Control)

- Identificador ├║nico de 48 bits asignado de f├íbrica a cada interfaz de red
- Se representa en hexadecimal: `AA:BB:CC:DD:EE:FF` (6 grupos de 2 d├¡gitos hex)
- Los primeros 24 bits (3 primeros grupos) identifican al **fabricante** (OUI ÔÇö Organizationally Unique Identifier)
- Los 24 bits restantes son el identificador ├║nico del dispositivo dentro del fabricante
- **No cambia** (aunque se puede falsear por software, lo que se llama *MAC spoofing*)
- Funciona exclusivamente en la **capa 2** (Enlace)

**Ejemplo de OUI:** `00:1A:2B` ÔåÆ Cisco, `00:23:5E` ÔåÆ Intel, `3C:07:54` ÔåÆ Raspberry Pi

### IP (Internet Protocol) ÔÇö IPv4

- Direcci├│n l├│gica de 32 bits (IPv4) o 128 bits (IPv6)
- Formato IPv4: `192.168.1.10` (4 octetos de 0 a 255 separados por puntos)
- **Cambia** seg├║n la red a la que te conectes
- Funciona en la **capa 3** (Red)
- Se divide en dos partes: **direcci├│n de red** + **direcci├│n de host**

### M├íscara de subred

La m├íscara de subred indica qu├® parte de la IP identifica a la red y qu├® parte al dispositivo:

```
IP:        192.168.1.10
M├íscara:   255.255.255.0  (/24)
Red:       192.168.1.0
Host:      0.0.0.10
```

Los bits a 1 en la m├íscara indican la porci├│n de red; los bits a 0, la porci├│n de host. `255.255.255.0` en binario son 24 unos y 8 ceros = `/24`.

### Direcciones especiales

| Direcci├│n | Significado |
|---|---|
| `192.168.1.0` | Direcci├│n de **red** (host bits todos a 0) |
| `192.168.1.255` | Direcci├│n de **broadcast** (host bits todos a 1) |
| `192.168.1.1` | Primer host usable (normalmente el gateway) |
| `127.0.0.1` | **Loopback** ÔÇö tu propio equipo |
| `0.0.0.0` | "Todas las interfaces" o ruta por defecto |

### IPs p├║blicas vs privadas

La IANA reserv├│ rangos de IP para uso interno (no enrutables en Internet):

| Rango privado | M├íscara | Uso t├¡pico |
|---|---|---|
| `10.0.0.0/8` | 255.0.0.0 | Grandes empresas |
| `172.16.0.0/12` | 255.240.0.0 | Empresas medianas |
| `192.168.0.0/16` | 255.255.0.0 | Hogar y peque├▒a oficina |

Las IPs privadas se traducen a IPs p├║blicas mediante **NAT** (lo veremos en U10).

### Analog├¡a completa

```
MAC = DNI                   ÔåÆ te identifica como persona, no cambia
IP  = direcci├│n postal       ÔåÆ dice d├│nde vives, cambia al mudarte
M├íscara = c├│digo postal      ÔåÆ delimita tu vecindario (tu red)
Puerto = n├║mero de piso      ÔåÆ qu├® persona/aplicaci├│n recibe el mensaje
Gateway = oficina de correos ÔåÆ por donde sale tu correo a otras ciudades
DNS = gu├¡a telef├│nica        ÔåÆ traduce "google.com" a una direcci├│n IP
```

---

## ­ƒöî Conectividad b├ísica: ping, gateway, ARP

### Gateway (puerta de enlace)

El **gateway por defecto** (default gateway) es el dispositivo que permite salir de tu red local hacia otras redes. Normalmente es un router que tiene una IP dentro de tu subred (ej. `192.168.1.1`).

Cuando tu PC quiere enviar datos a un destino fuera de su red:
1. Compara su IP y m├íscara con la IP destino para determinar si est├í en la misma red
2. Si est├í fuera, encapsula el paquete con la **MAC del gateway** como destino (no la MAC del destino final)
3. El gateway recibe el paquete, lo desencapsula, consulta su tabla de rutas y lo reenv├¡a

**Configuraci├│n t├¡pica de un PC en una LAN:**
```
IP:         192.168.1.10
M├íscara:    255.255.255.0
Gateway:    192.168.1.1
DNS:        8.8.8.8
```

### Comandos esenciales de diagn├│stico

#### ping

Comando b├ísico para probar conectividad. Env├¡a paquetes ICMP Echo Request y espera Echo Reply:

```bash
ping 8.8.8.8
ping -c 4 google.com   # En Linux/macOS, 4 paquetes
ping -n 4 google.com   # En Windows, 4 paquetes
```

Sirve para:
- Saber si un destino es accesible
- Medir el tiempo de ida y vuelta (**RTT** ÔÇö Round Trip Time, latencia)
- Detectar p├®rdida de paquetes (% de paquetes perdidos)
- Verificar resoluci├│n DNS (si usas nombre en lugar de IP)

#### ipconfig / ifconfig

Muestra la configuraci├│n IP del equipo:

```bash
ipconfig               # Windows
ipconfig /all          # Windows (informaci├│n detallada, incluye MAC)
ifconfig               # Linux/macOS
ip addr                # Linux (moderno)
```

Lo que debes mirar:
- **Direcci├│n IP** ÔÇö ┬┐tiene una IP v├ílida en tu red?
- **M├íscara de subred** ÔÇö ┬┐es la correcta?
- **Gateway** ÔÇö ┬┐tiene gateway? ┬┐es correcto?
- **DNS** ÔÇö ┬┐tiene servidor DNS?
- **Direcci├│n MAC** ÔÇö para identificar la interfaz

#### arp

Gestiona la tabla ARP local (traducciones IP Ôåö MAC):

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

Muestra cada **salto** (router intermedio) por el que pasa el paquete, con la latencia de cada uno. Esencial para diagnosticar d├│nde se pierde la conectividad.

### Escenario completo: ┬┐qu├® pasa cuando haces ping a Google?

```
Tu PC (192.168.1.10) ÔåÆ ping 8.8.8.8
```

1. El sistema operativo detecta que `8.8.8.8` **no est├í en la misma red** (compara IP y m├íscara: 192.168.1.10/24 vs 8.8.8.8)
2. Consulta la **tabla de rutas** local ÔåÆ debe enviarlo al gateway `192.168.1.1`
3. Consulta la **tabla ARP** local ÔåÆ busca la MAC del gateway
4. Si no est├í en ARP, lanza un **ARP Request** broadcast: "┬┐Qui├®n tiene 192.168.1.1?"
5. El gateway responde con **ARP Reply** (su MAC: aa:bb:cc:01:01:01)
6. Tu PC env├¡a el **paquete ICMP Echo Request** con:
   - MAC destino: aa:bb:cc:01:01:01 (la del gateway)
   - IP destino: 8.8.8.8
7. El switch lo recibe y lo reenv├¡a al puerto del gateway
8. El gateway (router) recibe el paquete, ve que la IP destino es 8.8.8.8, consulta su tabla de rutas
9. El router lo reenv├¡a hacia su ISP, que lo reenv├¡a hasta Google
10. Google responde con **ICMP Echo Reply**, siguiendo el camino inverso
11. Tu PC recibe la respuesta y muestra: `Reply from 8.8.8.8: bytes=32 time=12ms TTL=117`

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/flujo-arp-gateway.svg" alt="Flujo ARP: PC solicita la MAC del gateway para salir a Internet" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">El PC necesita la MAC del gateway para enviar paquetes fuera de su red. ARP resuelve la IP 192.168.1.1 a su MAC correspondiente.</figcaption>
</figure>

### Protocolo de diagn├│stico paso a paso

Cuando un usuario dice "no tengo Internet", este es el orden de diagn├│stico:

| Paso | Comando | ┬┐Qu├® comprueba? |
|---|---|---|
| 1 | `ipconfig` | ┬┐Tengo IP v├ílida? ┬┐Gateway? |
| 2 | `ping 127.0.0.1` | ┬┐Funciona mi tarjeta de red? (loopback) |
| 3 | `ping 192.168.1.1` | ┬┐Llego al gateway? |
| 4 | `ping 8.8.8.8` | ┬┐Llego a Internet? (sin DNS) |
| 5 | `ping google.com` | ┬┐Funciona la resoluci├│n DNS? |
| 6 | `tracert 8.8.8.8` | ┬┐D├│nde se pierde el paquete?

---

## Ô¡É Be the Packet, my friend...

> *Eres un paquete de 1500 bytes que acaba de generarse en la interfaz de red de un port├ítil. Tu IP origen es 192.168.1.10 y tu destino es 8.8.8.8 (el DNS de Google).*

**Escenario:**
Tu m├íquina no tiene la MAC de 192.168.1.1 (el gateway) en la tabla ARP.

**┬┐Qu├® haces? Elige sabiamente:**

1. **Enviar los datos directamente a 8.8.8.8 sin m├ís** ÔåÆ La capa 2 necesita una MAC destino. No sabes la MAC de 8.8.8.8 porque ni siquiera est├í en tu subred. Tu paquete se queda en un limbo de confusi├│n y es descartado. ÔØî
2. **Lanzar un ARP request para preguntar qui├®n tiene la IP 192.168.1.1** ÔåÆ Ô£à ┬íBien! Necesitas al gateway. El ARP te dar├í su MAC, y entonces podr├ís enviarle el paquete a ├®l para que lo reenv├¡e.
3. **Preguntarle a DHCP** ÔåÆ El DHCP ya te dio la IP al arrancar. No necesitas preguntar ahora. Ser├¡a como llamar al fontanero porque el grifo gotea cuando lo que necesitas es cerrarlo. ÔØî

> **Soluci├│n:** La opci├│n 2. Sin la MAC del gateway, tu paquete no sale ni de casa. **Siempre necesitas la capa 2 (MAC) para moverte en tu red local.**

---

## ­ƒöÑ Fireside Chat: Switch vs Hub

> *Dos veteranos de la capa 2 discuten junto a la chimenea del armario de comunicaciones.*

**Hub:** ÔÇö Mira, yo soy simple. Me llega un bit por un puerto y lo copio a todos los dem├ís. Sin complicaciones.

**Switch:** ÔÇö Sin complicaciones, dice. ┬┐Sabes lo que es un dominio de colisi├│n? ┬┐No? Pues yo s├¡. Porque yo segmento. Aprendo direcciones MAC. Cuando recibo una trama, S├ë exactamente a qu├® puerto enviarla. T├║ inundas todo como una manguera sin cabeza.

**Hub:** ÔÇö Oye, que en los 90 funcionaba perfectamente.

**Switch:** ÔÇö En los 90 tambi├®n se llevaban los pantalones de campana y mira c├│mo acab├│ eso. Yo creo tablas MAC, t├║ solo repites se├▒ales. Yo puedo tener 10 PCs hablando a la vez, t├║... t├║ haces que hablen de uno en uno porque si dos hablan a la vez, COLISI├ôN. Fin de la historia.

**Hub:** ÔÇö Vale, pero... soy m├ís barato.

**Switch:** ÔÇö *suspiro* Siempre el mismo argumento.

---

## ­ƒòÁ´©Å ┬┐Qui├®n Soy?

Adivina qu├® dispositivo de red soy:

1. Trabajo en la capa 3. Miro direcciones IP. Decido por d├│nde enviar los paquetes. Tengo una tabla de rutas.

2. Trabajo en la capa 2. Aprendo MACs. Cuando no s├® qui├®n eres, inundo la red. Pero luego aprendo y ya no molesto.

3. Repito todo lo que me llega por todos los puertos excepto por el que me lleg├│. B├ísicamente soy un altavoz con patas.

4. Soy el punto donde se conectan todos los cables en una topolog├¡a estrella. Si yo fallo, todo falla. Sin presi├│n.

<details>
<summary>­ƒöä Respuestas</summary>

1. **Router** ÔÇö El que siempre sabe por d├│nde ir.
2. **Switch** ÔÇö Aprende MACs, segmenta la red.
3. **Hub** ÔÇö El altavoz de las redes.
4. **Switch (en topolog├¡a estrella)** o tambi├®n un **AP** en redes inal├ímbricas.

</details>

---

## ­ƒñ¼ CONRAD VS EL MUNDO: El ping no funciona

> *CONRAD, nuestro switch con problemas de ira, opina sobre el cl├ísico "el ping no funciona".*

**CONRAD:** ÔÇö "┬íOTRA VEZ! Viene un inform├ítico y me dice: *CONRAD, no hay ping*. Y yo: vale, ┬┐has mirado el IP? *S├¡*. ┬┐El gateway? *S├¡*. ┬┐El cable? *...cu├íl cable?* ┬íAY, MADRE M├ìA! Sin cable no hay se├▒al. Sin se├▒al no hay bits. Sin bits no hay ping. Es como quejarse de que el coche no arranca sin ruedas."

**La lecci├│n:** El 80% de los problemas de red est├ín en la capa f├¡sica. Antes de renegar de la configuraci├│n IP, aseg├║rate de que el cable est├í bien conectado. Y s├¡, a veces la soluci├│n es "ap├ígalo y enci├®ndelo".

---

## ÔÜí Laboratorio de Tortura: Monta tu primera red (con fallos)

> **Duraci├│n estimada:** 30 minutos
> **Herramienta:** Packet Tracer o hardware real

**El Escenario:**
Tienes 2 PCs (PC-A y PC-B) y 1 switch. Con├®ctalos, as├¡gnales IP y haz que se hagan ping.

**Configuraci├│n:**
- PC-A: 192.168.1.10 / 255.255.255.0
- PC-B: 192.168.1.20 / 255.255.255.0

**Fallo intencionado:** El switch tiene VLAN por defecto. Uno de los puertos est├í en VLAN 10. El otro en VLAN 1. No lo sabes.

**Tu tarea:** Hacer que funcionen. Si no funciona, diagnostica.

**Pistas para cuando te frustres:**
1. Verifica los LEDs del switch (┬┐parpadean al conectar? no ÔåÆ problema f├¡sico)
2. `ipconfig` o `ifconfig` en cada PC (┬┐tienen IP?)
3. `arp -a` (┬┐hay entrada MAC?)
4. El problema real: las VLANs diferentes. Pero eso lo veremos en U07. Por ahora, solo sufre. Digo, aprende.

---

## ­ƒÅå Logros de esta unidad

| Logro | C├│mo conseguirlo |
|---|---|
| ­ƒÅà **El Ping de la Vida** | Conseguir ping entre 2 PCs en Packet Tracer a la primera |
| ­ƒÅà **Cable Detective** | Encontrar el fallo intencionado del laboratorio sin pistas |
| ­ƒÅà **ARP Whisperer** | Explicar a alguien c├│mo funciona ARP sin usar jerga t├®cnica |
| ­ƒÅà **Topolog├¡a Pro** | Dibujar de memoria 4 topolog├¡as de red distintas |

---

## ­ƒºá Atr├®vete a Pensar

1. **Tienes 5 PCs y un switch.** Dibuja la topolog├¡a. ┬┐Cu├íntos cables necesitas como m├¡nimo?
2. **┬┐Qu├® pasa si conectas 2 switches entre s├¡ y cada switch tiene 2 PCs?** ┬┐Cu├íntos dominios de colisi├│n hay?
3. **Explica con tus palabras** por qu├® un router puede conectar redes diferentes y un switch no.
4. **Verdadero o falso:** "Un hub y un switch hacen exactamente lo mismo pero el switch es m├ís moderno."

<details>
<summary>­ƒÆí Soluciones</summary>

1. 5 cables (uno de cada PC al switch). Topolog├¡a f├¡sica en estrella.
2. Cada switch crea dominios de colisi├│n separados por puerto. Con 2 switches y 4 PCs, tienes 4 dominios de colisi├│n (uno por cada puerto donde hay un PC). El enlace entre switches tambi├®n es un dominio aparte.
3. El router trabaja en capa 3 (IP) y puede leer direcciones IP para decidir rutas. El switch trabaja en capa 2 (MAC) y solo sabe de MACs locales. Es como la diferencia entre un cartero que conoce todas las calles (router) y un repartidor que solo conoce su vecindario (switch).
4. **Falso.** El hub repite se├▒ales (capa 1), el switch aprende MACs y segmenta (capa 2). No son lo mismo ni de lejos.

</details>

---

## ­ƒº® Crucigrama de Bits

```
Horizontal:
1. Dispositivo que reenv├¡a paquetes entre redes IP (6 letras)
3. Conjunto de reglas para la comunicaci├│n (8 letras)
5. Red de ├írea local (3 letras)

Vertical:
2. Identificador ├║nico de 48 bits para una interfaz de red (3 letras)
4. Peque├▒a unidad de datos en una red (7 letras)
```

<details>
<summary>­ƒôØ Soluciones</summary>

**Horizontal:** 1. ROUTER, 3. PROTOCOLO, 5. LAN
**Vertical:** 2. MAC, 4. PAQUETE

</details>

---

## ­ƒÆ¼ Preguntas de Entrevista de Trabajo

> Preguntas reales que te har├¡an en una entrevista para administrador de redes junior.

1. **"Expl├¡came c├│mo hace ping un PC a otro en la misma red, paso a paso, como si yo fuera tu abuela."**
2. **"┬┐Cu├íl es la diferencia entre un switch y un router? Dime al menos 3 diferencias."**
3. **"┬┐Qu├® es una direcci├│n MAC? ┬┐Para qu├® sirve? ┬┐Puede cambiar?"**
4. **"┬┐Qu├® haces si un PC no tiene conectividad de red? Dame tu proceso de diagn├│stico."**
5. **"Enumera 4 topolog├¡as de red y dime ventajas e inconvenientes de cada una."**

---

## ­ƒñÀ No hay preguntas tontas

> ÔØô **┬┐Qu├® dispositivo resultar├¡a de combinar un router y un switch?**

No existe un dispositivo que sea router y switch a la vez en una misma funci├│n, porque trabajan en capas diferentes del modelo OSI. Un switch opera en la capa 2 (enlace) y gestiona tramas basadas en direcciones MAC, mientras que un router opera en la capa 3 (red) y encamina paquetes basados en direcciones IP. Existen equipos multicapa (capas 3) que integran ambas funciones, pero conceptualmente son funciones separadas: conmutaci├│n y enrutamiento.

---

> ÔØô **┬┐Por qu├® necesito una direcci├│n IP y una direcci├│n MAC?**

La direcci├│n MAC es un identificador ├║nico asignado de f├íbrica a cada interfaz de red, equivalente al DNI de un dispositivo. La direcci├│n IP es una direcci├│n l├│gica que depende de la red a la que el dispositivo est├í conectado, como una direcci├│n postal. Ambas son necesarias: la MAC identifica al dispositivo f├¡sicamente, mientras que la IP permite localizarlo dentro de la red y enrutar el tr├ífico correctamente.

---

> ÔØô **┬┐Puedo asignar cualquier direcci├│n IP a mi equipo?**

T├®cnicamente puedes configurar cualquier direcci├│n IP en tu equipo, pero para que la comunicaci├│n funcione, la direcci├│n debe pertenecer a la misma subred que el resto de dispositivos con los que quieras comunicarte. Si asignas una IP de una red diferente, los switches y routers de tu segmento ignorar├ín los paquetes, ya que no coincidir├í con la configuraci├│n de red esperada.

---

## ­ƒÄ¼ Post-Cr├®ditos

Un paquete de 1500 bytes completa su viaje desde el navegador hasta el servidor DNS 8.8.8.8, pasando por el gateway, m├║ltiples switches y routers. Cada salto decrementa el TTL. En el ├║ltimo tramo, el TTL llega a cero y el paquete es descartado. El emisor recibe un mensaje ICMP Time Exceeded y debe retransmitir.

**PR├ôXIMAMENTE EN U03:** El viaje por el medio f├¡sico: c├│mo se transmiten los bits, qu├® es el ancho de banda, y por qu├® los cables UTP tienen 8 hilos.

---

## Ô£à Criterios de evaluaci├│n cubiertos

**RA1: Reconoce la estructura de las redes de datos identificando sus elementos y principios de funcionamiento.**

| Criterio | Cubierto |
|---|---|
| a) Factores que impulsan la evoluci├│n de redes | Ô£à Secciones de teor├¡a |
| b) Medios de transmisi├│n | Ô£à Teor├¡a + laboratorio |
| c) Tipos de red y topolog├¡as | Ô£à Crucigrama + teor├¡a con diagramas |
| g) Elementos funcionales, f├¡sicos y l├│gicos | Ô£à Fireside Chat + ┬┐Qui├®n Soy? |
| h) Dispositivos de interconexi├│n | Ô£à Fireside Chat + laboratorio |
