---
title: 1 — Estructura de IPv4
description: 32 bits, 4 octetos, el sobre del paquete y el puente con la MAC 🎭
---

<p><small>32 bits, 4 octetos, el sobre del paquete y el puente con la MAC 🎭</small></p>

> 🗺️ **Estás en:** 🧮 **UD3 · Direccionamiento IP y subnetting** → 1 · Estructura de IPv4

---

## 📬 La idea en una frase

> Una dirección IPv4 es un número de **32 bits** divididos en **4 octetos** que se escriben en **notación decimal punteada**; esas direcciones viajan dentro de una **cabecera de 20+ bytes** que los routers leen, y en la red local se completan con **ARP** para llegar a la MAC de destino.

Cuando escribes `192.168.1.10` no estás leyendo un número de corrido: son cuatro grupos de 8 bits separados por puntos. Cada grupo se llama **octeto** y solo puede valer de 0 a 255. Aprender a leer esa notación es el primer paso; después verás el sobre donde viaja (cabecera) y cómo el paquete se adapta al medio (fragmentación y ARP).

---

## 🧱 Anatomía de una IPv4

Una dirección IPv4 son **32 bits** en total. Se dividen en **4 octetos** de 8 bits cada uno:

```
32 bits = 4 octetos de 8 bits

 192        . 168        . 1          . 10
│         ││         ││       ││        │
11000000 . 10101000 . 00000001 . 00001010
│____________│_______│_________│________│
     4 octetos, cada uno con 8 bits (32 bits en total)
```

- Un **bit** es 0 o 1. Un **octeto** de 8 bits es el mínimo bloque de direccionamiento que usamos.
- Con 8 bits caben `2⁸ = 256` combinaciones, así que cada octeto vale de **0 a 255**.
- Por eso `192.168.1.256` es una IP **inválida**: 256 necesita 9 bits, y el octeto solo tiene 8.

### ¿Cuántas IPs caben en total?

Con 32 bits el espacio completo es enorme para su época y diminuto para hoy:

```
2³² = 4.294.967.296  →  unos 4.294 millones de direcciones
```

Dicho así parece mucho. Lo es... en 1981. Hoy hay más dispositivos conectados que direcciones posibles, y de ahí vienen (casi) todos los dramas de esta unidad.

---

## 🌐 Notación decimal punteada

Cada octeto se convierte de binario a decimal y se separa con puntos:

| Binario (8 bits) | Decimal | 
|---|---|
| `11000000` | 192 |
| `10101000` | 168 |
| `00000001` | 1 |
| `00001010` | 10 |

Juntos forman `192.168.1.10`. Simple. Ese es todo el truco de la notación: **traducir cada octeto binario a decimal** y unirlo con puntos. En el [punto 2](/ApuntesRedes/03-direccionamiento-ip/02-binario-y-and) aprenderás a hacer esa conversión como un rayo.

> 💡 **Tip:** una IP por sí sola no dice nada: necesita saber qué parte es *red* y qué parte es *host*. Eso lo decide la **máscara**, que verás en el [punto 5](/ApuntesRedes/03-direccionamiento-ip/05-mascaras-y-cidr). Por ahora, memoriza que la IP es solo el número de casa; la máscara decide el vecindario.

---

## 📦 La cabecera IPv4 (el sobre del paquete)

La dirección no viaja sola: se monta en la **cabecera IPv4**, el "sobre" que la capa 3 añade delante de los datos. Los routers **no abren el contenido**: leen la cabecera, deciden por dónde ir y la reenvían.

```
┌──────────────────────────────────────────────────────────────┐
│ Vers(4)│IHL│ TOS │ Long.total │ ID │Flags│Offset│ TTL │Proto│
├──────────────────────────────────────────────────────────────┤
│         Checksum cabecera (16 bits)                          │
├──────────────────────────────────────────────────────────────┤
│         IP ORIGEN (32 bits)     │      IP DESTINO (32 bits)  │
├──────────────────────────────────────────────────────────────┤
│         Opciones (0 o más, si IHL > 5)                       │
├──────────────────────────────────────────────────────────────┤
│         Datos (payload)                                      │
└──────────────────────────────────────────────────────────────┘
Cabecera mínima: 20 bytes (5 words de 32 bits)
```

Campos que de verdad importan en examen y en el día a día:

| Campo | Tamaño | Qué hace |
|---|---|---|
| **IP origen / destino** | 32 + 32 bits | Quién envía y a quién; de aquí sale todo el direccionamiento de la unidad |
| **TTL** (*Time To Live*) | 8 bits | Contador de saltos: cada router lo resta en 1; a 0 se descarta el paquete (evita bucles). `traceroute` se basa en esto |
| **Protocolo** | 8 bits | Qué hay *dentro* de los datos: **1** = ICMP, **6** = TCP, **17** = UDP |
| **Longitud total** | 16 bits | Tamaño de cabecera + datos en bytes |
| **Identificación + Flags + Offset** | 16 bits | Campos de la **fragmentación** (sigue abajo) |
| **Checksum** | 16 bits | Integridad de la *cabecera* (no de los datos: eso lo hace TCP/UDP y el FCS de la trama) |

![Campos clave de la cabecera IPv4](/ApuntesRedes/diagrams/u03-cabecera-ipv4.svg)

> 🔗 **De la trama al paquete:** en la [UD2](/ApuntesRedes/02-ethernet-cableado/09-trama-ethernet) viste la trama Ethernet (MACs + EtherType + FCS). Si el EtherType es `0x0800`, el payload de esa trama es **este sobre IPv4**. Capa 2 entrega en la LAN; capa 3 decide hacia dónde va de punta a punta.

> ⚠️ **No confundas checksums:** el **FCS** de la trama protege toda la trama en el enlace (capa 2). El **checksum de la cabecera IP** solo valida la cabecera en cada salto (capa 3). Los datos los protegen TCP/UDP (capa 4).

---

## ✂️ Fragmentación y MTU

Cada medio tiene un **techo de tamaño**. En Ethernet ese techo es el **MTU de 1500 bytes** de payload (lo viste en UD2). Si un paquete IP es más grande que el MTU del siguiente enlace, **alguien lo parte**: eso es **fragmentación**.

```
Paquete de 4000 B  →  MTU del enlace = 1500 B
        │
        ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ frag 1      │ │ frag 2      │ │ frag 3      │
│ 1480 B datos│ │ 1480 B datos│ │ 1040 B datos│
│ MF=1, off=0 │ │ MF=1, off=… │ │ MF=0        │
└─────────────┘ └─────────────┘ └─────────────┘
        (20 B cabecera cada fragmento; 1480 = múltiplo de 8)
```

- **Quién fragmenta (IPv4):** el **emisor** o **cualquier router** intermedio cuyo enlace de salida tenga un MTU menor.
- **Flag MF** (*More Fragments*): `1` = "vienen más"; `0` = "soy el último".
- **Fragment Offset:** desplazamiento del fragmento en múltiplos de **8 bytes**; permite reensamblar en orden aunque lleguen mezclados.
- **¿Quién reensambla?** Solo el **host destino**. Los routers intermedios no se molestan.
- **IPv6 es distinto:** solo fragmenta el **origen** (Path MTU Discovery); los routers **no** fragmentan. Lo verás en la parte IPv6.

![Fragmentación de un paquete de 4000 B en tres fragmentos con MTU 1500](/ApuntesRedes/diagrams/u03-fragmentacion.svg)

> 💡 **Regla práctica:** si en un `ping` grande "se pierde" pero un ping corto va bien, sospecha de MTU/fragmentación (o de Path MTU bloqueado por un firewall que no deja pasar ICMP "packet too big").

---

## 🎭 Las IPs con manías

No todas las direcciones del espacio IPv4 se pueden usar para asignar a un equipo normal. Algunas tienen "reservado" escrito en la frente:

| Dirección | Significado |
|---|---|
| **0.0.0.0/0** | "Esta red" (ruta por defecto, el 0.0.0.0 es la estrella del enrutamiento) |
| **127.0.0.0/8** | Loopback (localhost: 127.0.0.1 habla contigo mismo) |
| **169.254.0.0/16** | APIPA: IP autoasignada cuando DHCP no responde y tu OS se inventa una para no llorar |
| **224.0.0.0/4** | Multicast (224.0.0.5 = OSPF, 224.0.0.1 = todos los hosts de la red local) |
| **240.0.0.0/4** | Reservado / experimental: mejor no tocarlo |
| **255.255.255.255** | Broadcast limitado (llega a todos los hosts de la red en capa 2) |

> ⚠️ **Trampa de examen:** el **loopback** (127.x.x.x) no es una IP "de la casa", es una dirección que dice "habla con este mismo equipo". Hacer `ping 127.0.0.1` no sale a ningún sitio: comprueba que tu pila TCP/IP funciona.

Una de las más odiadas es **169.254.x.x**: cuando un PC no consigue IP por DHCP, se asigna él mismo una APIPA. El día que veas esa IP en un `ipconfig /all`, sabrás que el DHCP no respondió. Lo verás a fondo en el [punto 8](/ApuntesRedes/03-direccionamiento-ip/08-dhcp).

---

## 🔗 ARP: de la IP a la MAC (el puente con la UD2)

La cabecera IP dice *a qué equipo* va el paquete; la trama Ethernet necesita *a qué MAC*. En la red local, el que traduce una cosa en la otra es **ARP** (*Address Resolution Protocol*).

En la [UD2](/ApuntesRedes/02-ethernet-cableado/09-trama-ethernet) solo nombramos el EtherType `0x0806` ("aquí hay un mensaje ARP"). Aquí va el proceso:

1. Tu PC (`192.168.1.10`) quiere hablar con `192.168.1.20`, pero **no tiene la MAC** de esa IP en su **tabla ARP**.
2. Manda un **ARP Request** en **broadcast** de capa 2 (`FF:FF:FF:FF:FF:FF`): *"¿Quién tiene la IP 192.168.1.20? Decídmelo a mí, 192.168.1.10"*.
3. Todos los hosts de la subred lo reciben; solo el dueño de `.20` contesta.
4. El dueño responde con un **ARP Reply** en **unicast**: *"Soy yo, mi MAC es aa:bb:cc:dd:ee:ff"*.
5. Tu PC guarda la pareja IP→MAC en su **tabla ARP** y ya puede construir la trama Ethernet con la MAC destino.

```
PC .10                                PC .20
  │  ARP Request (broadcast)            │
  │  "¿quién tiene .20?"                │
  │ ───────────────────────────────────►│  (todos reciben)
  │                                     │
  │  ARP Reply (unicast)                │
  │  "soy .20, MAC aa:bb:…"             │
  │◄─────────────────────────────────── │
  │  tabla ARP: .20 → aa:bb:…           │
  ▼                                     ▼
  trama Ethernet con MAC destino = aa:bb:…
```

- **ARP es capa 3 pedir ayuda a la capa 2:** resuelve un problema de *dirección lógica* usando el medio *físico/enlace*.
- **Tabla ARP:** caché de pares IP→MAC. Se consulta con `arp -a` (Windows) o `ip neigh` (Linux). Si la entrada caduca o se borra, el proceso se repite.
- **Proxy ARP:** un router que responde ARP *en nombre de* hosts de otra red (a veces sorprende en laboratorios).
- **En IPv6 no existe ARP:** lo sustituye **NDP** con multicast (punto 14). La idea es la misma: resolver vecinos, sin el broadcast masivo.

> 🔗 **Cuándo miras ARP en el diagnóstico:** el ping a la IP de tu red local falla *antes* de salir del router → a menudo es "no resuelvo MAC" (ARP vacío, VLAN mal, duplicate IP). Si ARP va bien y el ping a Internet falla, el problema es más arriba (ruta, DNS, NAT…).

---

## 🧠 Mini-chequeo

1. ¿Cuántos bits y octetos tiene una dirección IPv4? ¿Por qué un octeto no puede valer 256?
2. ¿Cuántas direcciones IPv4 existen en total con los 32 bits?
3. Identifica qué tipo de dirección especial es cada una: `127.0.0.1`, `169.254.0.5`, `255.255.255.255`.
4. En una cabecera IPv4, ¿qué campo impide un bucle de rutas y qué valor codifica "viene TCP"?
5. Un paquete de 3000 B llega a un enlace con MTU 1500. ¿Cuántos fragmentos IPv4 salen como mínimo y qué bit indica al destino que aún faltan?
6. ¿Qué mensaje ARP se manda en broadcast y cuál responde en unicast? ¿Qué guarda el PC al terminar?

<details>
<summary>🔄 Respuestas</summary>

1. **32 bits en 4 octetos.** Un octeto de 8 bits solo admite `2⁸ = 256` combinaciones (0-255). El 256 necesitaría un bit más, y ese bit no existe.
2. **2³² = 4.294.967.296** direcciones: unos 4.294 millones.
3. `127.0.0.1` → **loopback** (localhost). `169.254.0.5` → **APIPA** (DHCP no respondió). `255.255.255.255` → **broadcast limitado**.
4. **TTL** (baja en cada router; a 0 se descarta). **Protocolo = 6** → TCP (17 = UDP, 1 = ICMP).
5. Cabecera 20 B → payload útil 1480 B por fragmento (múltiplo de 8). **3 fragmentos** (1480+1480+40). El bit **MF=1** en los dos primeros; el último lleva MF=0.
6. **Request** en broadcast (*"¿quién tiene esta IP?"*); **Reply** en unicast del dueño. El PC guarda la pareja **IP→MAC** en la **tabla ARP**.
</details>

---

## ✅ Resumen en 3 frases

- Una IPv4 son **32 bits en 4 octetos**, escritos en notación decimal punteada con valores de 0 a 255; algunas están **reservadas** (loopback, APIPA, multicast, broadcast).
- Esas direcciones viajan en la **cabecera IPv4** (mínimo 20 bytes) con TTL, protocolo e IPs; si no caben en el MTU del enlace, se **fragmentan** y el destino reensambla.
- En la red local, **ARP** traduce IP→MAC (request broadcast, reply unicast) para que la trama Ethernet de la UD2 llegue al equipo correcto.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| IPv4 | Protocolo de direccionamiento de 32 bits en 4 octetos |
| Octeto | Bloque de 8 bits; vale de 0 a 255 |
| Notación decimal punteada | Escribir los octetos en decimal separados por puntos (192.168.1.10) |
| Cabecera IPv4 | Sobre de 20+ bytes: IPs, TTL, protocolo, campos de fragmentación |
| TTL | Contador de saltos; a 0 el paquete se descarta |
| MTU | Tamaño máximo de payload del enlace (1500 en Ethernet) |
| Fragmentación | Partir un paquete que no cabe en el MTU del siguiente enlace |
| ARP | Traduce IP → MAC en la red local (broadcast request, unicast reply) |
| Tabla ARP | Caché de pares IP→MAC del host |
| Loopback | 127.0.0.0/8: "habla contigo mismo", test de la pila TCP/IP |
| APIPA | 169.254.0.0/16: IP autoasignada si DHCP no responde |
| Broadcast | 255.255.255.255: mensaje para todos los hosts de la red |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-direccionamiento-ip) · **Anterior:** [Índice de la unidad](/ApuntesRedes/03-direccionamiento-ip) · **Siguiente:** [2 · Binario y la operación AND](/ApuntesRedes/03-direccionamiento-ip/02-binario-y-and)
