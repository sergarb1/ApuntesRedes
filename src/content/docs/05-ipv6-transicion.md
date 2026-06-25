---
title: U05 — IPv6 y transición
description: El futuro que ya llegó 🚀
---

<p><small>El futuro que ya llegó 🚀</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 Cable → 🏷️ IP → 🌍 **IPv6** → 🔀 Switch → 🏢 VLAN → 🧭 Router → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*El agotamiento de direcciones IPv4 es una realidad técnica. Con la proliferación de dispositivos conectados, las 4.3 mil millones de direcciones IPv4 resultan insuficientes. La migración a IPv6 no es una opción, sino una necesidad.*

Llega IPv6: 128 bits. 340 sextillones de direcciones. Suficientes para dar una IP a cada átomo de la Tierra y aún sobrarían.

---

## 📚 Contenidos

- IPv6: 128 bits, notación hexadecimal
- Compresión de direcciones
- Tipos de direcciones: unicast, multicast, anycast
- Global Unicast, Link-Local, Unique Local
- EUI-64: generación automática de la interfaz
- SLAAC vs DHCPv6
- ICMPv6 y NDP (Neighbor Discovery Protocol)
- Mecanismos de transición: Dual Stack, túneles, NAT64
- IPv6 en Packet Tracer

---

## 📋 Estructura de IPv6

Una dirección IPv6 tiene **128 bits** (16 bytes), representados en **8 grupos de 4 dígitos hexadecimales** separados por dos puntos:

```
2001:0DB8:0000:0000:0000:FF00:0042:8329
│    │    │    │    │    │    │    │
└ 8 grupos de 16 bits cada uno = 128 bits
```

### Reglas de compresión

1. **Ceros iniciales:** se pueden omitir dentro de cada grupo
   - `2001:0DB8:0000:0000:0000:FF00:0042:8329` → `2001:DB8:0:0:0:FF00:42:8329`

2. **Doble dos puntos (::):** una sola vez por dirección, sustituye la mayor secuencia de grupos cero
   - `2001:DB8:0:0:0:FF00:42:8329` → `2001:DB8::FF00:42:8329`
   - `FE80:0000:0000:0000:02AA:00FF:FE9A:4CA2` → `FE80::2AA:FF:FE9A:4CA2`
   - `::1` = `0000:0000:0000:0000:0000:0000:0000:0001` (loopback)

### Prefijos

Los prefijos se escriben igual que CIDR en IPv4:

```
2001:DB8::/32    → Los primeros 32 bits son el prefijo
2001:DB8:1::/48  → Los primeros 48 bits
2001:DB8:1:2::/64 → Los primeros 64 bits (¡el estándar!)
```

> 💡 **/64 es el prefijo estándar para subredes IPv6.** La IETF recomienda usar siempre /64 para redes de área local. La mitad inferior (64 bits) es para el identificador de interfaz.

---

## 🏷️ Tipos de direcciones IPv6

### Unicast

Una dirección **unicast** identifica una única interfaz. Un paquete enviado a una unicast llega solo a esa interfaz.

| Tipo | Prefijo | Ámbito | Descripción |
|---|---|---|---|
| **Global Unicast (GUA)** | 2000::/3 | Internet | Equivalente a las IPs públicas IPv4. Única en el mundo. |
| **Link-Local (LLA)** | FE80::/10 | Enlace local | Necesaria para que IPv6 funcione. Cada interfaz tiene una automáticamente. No es enrutable. |
| **Unique Local (ULA)** | FC00::/7 | Privado/organización | Equivalente a las IPs privadas IPv4 (RFC 1918). No enrutable en Internet. |
| **Loopback** | ::1/128 | Local | Equivalente a 127.0.0.1 en IPv4. |

### Multicast

Sustituye al broadcast de IPv4. Ejemplos:
- `FF02::1` → Todos los nodos IPv6 (equivalente al broadcast)
- `FF02::2` → Todos los routers IPv6
- `FF02::5` → Todos los routers OSPF

### Anycast

Una dirección anycast identifica **varias interfaces**, pero el paquete llega a la **más cercana** (según la métrica de enrutamiento). Se usa para servicios como DNS anycast (8.8.8.8 tiene réplicas en todo el mundo).

---

## 🔧 EUI-64: identificador de interfaz

El identificador de interfaz (los últimos 64 bits de una IPv6) se puede generar automáticamente a partir de la **dirección MAC** usando EUI-64:

```
MAC:        00:1A:2B:3C:4D:5E
                    ↓
EUI-64:     021A:2BFF:FE3C:4D5E
```

**Proceso:**
1. Dividir la MAC en dos mitades: `00:1A:2B` + `3C:4D:5E`
2. Insertar `FF:FE` en medio: `00:1A:2B:FF:FE:3C:4D:5E`
3. Invertir el bit 7 del primer byte (Universal/Local bit): `00` → `02` (bit 1 = 1)
4. Resultado: `021A:2BFF:FE3C:4D5E`

### Privacy Extensions

EUI-64 tiene un problema: la IP **siempre es la misma** para una MAC dada, permitiendo rastrear dispositivos. Por eso, los sistemas operativos modernos usan **Privacy Extensions** (RFC 4941): generan direcciones temporales que cambian periódicamente.

---

## 🌐 SLAAC vs DHCPv6

### SLAAC (Stateless Address Autoconfiguration)

Los routers envían **Router Advertisement (RA)** con el prefijo de red. Cada dispositivo genera su propia IP combinando el prefijo + su EUI-64.

```
Router: "Mi prefijo es 2001:DB8:1:2::/64"
PC:     "Perfecto, mi IP será 2001:DB8:1:2:021A:2BFF:FE3C:4D5E"
```

**Ventajas:** Sin servidor, sin configuración, plug-and-play.
**Desventajas:** No asigna DNS, no controla qué IPs se asignan.

### DHCPv6

Como DHCP en IPv4, pero para IPv6. Dos modos:

| Modo | Descripción | Uso |
|---|---|---|
| **Stateless DHCPv6** | SLAAC da la IP, DHCPv6 da DNS y otros parámetros | Situaciones donde necesitas DNS pero no control de IPs |
| **Stateful DHCPv6** | DHCPv6 da la IP y todos los parámetros | Cuando necesitas control centralizado de direcciones |

### Flags en Router Advertisement

El router indica qué método usar mediante flags en los RA:

- **M Flag (Managed):** Usa DHCPv6 stateful
- **O Flag (Other):** Usa DHCPv6 stateless (solo para otra configuración)

---

## 🔄 ICMPv6 y NDP

IPv6 incorpora funcionalidades que en IPv4 estaban separadas:

| IPv4 | IPv6 |
|---|---|
| ARP | **NDP** (Neighbor Discovery Protocol) vía ICMPv6 |
| ICMP | ICMPv6 (ampliado) |
| IGMP | MLD (Multicast Listener Discovery) |
| Broadcast | Multicast |

### NDP (Neighbor Discovery Protocol)

NDP reemplaza a ARP con dos mensajes ICMPv6:

- **Neighbor Solicitation (NS):** "¿Quién tiene la IP 2001:DB8::2?" (similar al ARP Request)
- **Neighbor Advertisement (NA):** "Yo la tengo, mi MAC es..." (similar al ARP Reply)

**Ventaja sobre ARP:** NDP usa multicast en lugar de broadcast, reduciendo la carga en todos los dispositivos.

### Router Solicitation (RS) y Router Advertisement (RA)

- **RS:** El dispositivo pregunta "¿Hay routers aquí?" al encenderse
- **RA:** El router responde con el prefijo, flags y otra información

---

## 🔀 Mecanismos de transición

IPv4 no va a desaparecer de inmediato. La transición usa estos mecanismos:

### Dual Stack

La red ejecuta **IPv4 e IPv6 simultáneamente**. Cada dispositivo tiene ambas pilas activas. DNS determina qué protocolo usar (si el dominio tiene registro AAAA → IPv6, si solo A → IPv4).

```
PC con Dual Stack:
  IPv4: 192.168.1.10
  IPv6: 2001:DB8:1:2:21A:2BFF:FE3C:4D5E
  DNS: consulta AAAA primero, si no hay AAAA, consulta A
```

✅ **Ventaja:** Funciona con todo, sin encapsulación extra.
❌ **Desventaja:** Duplica la configuración, más overhead.

### Túneles

Cuando el tráfico IPv6 debe atravesar una red solo-IPv4, se **encapsula dentro de paquetes IPv4**:

```
[IPv6 packet] → encapsulado en [IPv4 header|IPv6 packet] → desencapsulado
```

| Tipo | Descripción | Uso |
|---|---|---|
| **6to4** | Túnel automático usando prefijo 2002::/16 | ISP no ofrece IPv6 nativo |
| **Teredo** | Túnel sobre UDP, atraviesa NAT | Último recurso |
| **GRE** | Túnel configurado manual | Redes corporativas |
| **ISATAP** | Túnel sobre una red IPv4 interna | Redes corporativas |

### NAT64 / DNS64

Permite que dispositivos **solo-IPv6** accedan a servicios **solo-IPv4**:

```
PC IPv6 → NAT64 router → traduce IPv6→IPv4 → Servidor IPv4
       ← NAT64 router → traduce IPv4→IPv6 ←
```

DNS64 genera direcciones IPv6 sintéticas a partir de registros A (IPv4), para que el cliente IPv6 pueda resolver nombres.

---

## ⭐ Sé la Dirección IPv6

> *Eres FE80::1AA:2BB:3CC:4DD1. ¿Qué tipo de dirección eres?*

**Pista:** Empiezas por FE80.

Eres una **Link-Local** address. Solo funcionas en el enlace local (la misma red física). Los routers NO te reenvían. Cada interfaz IPv6 tiene una automáticamente.

**Escenario:** Dos PCs en el mismo switch tienen direcciones Link-Local. ¿Pueden comunicarse?

a) **Sí** → ✅ Correcto. Las Link-Local permiten comunicación en el mismo segmento.
b) **No** → ❌ Incorrecto, sí pueden. Pero solo con otros dispositivos en el mismo enlace.
c) **Solo si tienen además una Global Unicast** → No necesariamente. La Link-Local es suficiente para comunicación local.

---

## 🔥 Fireside Chat: IPv4 vs IPv6

> *Dos protocolos de red se encuentran en un bar. IPv4 bebe con nostalgia, IPv6 llega con aires de grandeza.*

**IPv4:** — 32 bits. Me bastaron durante 40 años. ¿Sabes lo que es eso?

**IPv6:** — 40 años y ya te agotaste. Yo tengo 128 bits. 340 sextillones de direcciones. Mi notación es hexadecimal y elegante.

**IPv4:** — Elegante, dice. ¿Quién se aprende de memoria FE80:0000:0000:0000:1AA:2BB:3CC:4DD1? Yo soy 192.168.1.1. Lo recita hasta tu abuela.

**IPv6:** — Pero tú necesitas NAT. Yo soy extremo a extremo. Cada dispositivo tiene su IP pública única.

**IPv4:** — El NAT es feo pero funciona. Y el 99% de Internet sigue conmigo.

**IPv6:** — Por ahora. Pero cada día hay más tráfico IPv6. En algunos países, ya supero a IPv4.

**IPv4:** — Y encima tienes que escribir 32 caracteres hexadecimales para configurar una IP...

**IPv6:** — ¡SLAAC! ¡No configuro nada! ¡Plug and play! ¿Tú puedes decir lo mismo?

**IPv4:** — DHCP... bueno, vale. Sigue siendo más corto.

**IPv6:** — *suspiro* Vale, abuelo. Vayamos a tomar algo.

---

## 🕵️ ¿Quién Soy?

1. Empiezo por FE80. Me genera automáticamente la interfaz. Sin mí, IPv6 no funciona.

2. Empiezo por 2001:: o 2002::. Viajo por Internet. Soy única en el mundo.

3. Es la técnica de tener IPv4 e IPv6 coexistiendo en la misma red.

4. Soy el equivalente a DHCP en IPv6, pero más automático. Los routers me anuncian.

5. Reemplazo a ARP en IPv6. Uso mensajes ICMPv6 para descubrir vecinos.

6. Permito que dispositivos solo-IPv6 accedan a recursos solo-IPv4.

<details>
<summary>🔄 Respuestas</summary>

1. **Link-Local** (FE80::/10).
2. **Global Unicast** (2000::/3).
3. **Dual Stack** — Ambas pilas funcionando simultáneamente.
4. **SLAAC** — Stateless Address Autoconfiguration.
5. **NDP** — Neighbor Discovery Protocol.
6. **NAT64** — Traducción IPv6 a IPv4.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "IPv6 es muy complicado"

**CONRAD:** — *bufido* "Que IPv6 es complicado, que las direcciones son muy largas". ¿Sabes lo que es complicado? Configurar NAT, tener que hacer subnetting a mano porque te quedas sin IPs, y mantener una tabla de traducciones. IPv6 tiene SLAAC. Plug and play. Cada dispositivo se configura SOLO.

**CONRAD:** — "Y lo mejor: sin NAT. Cada dispositivo tiene su IP pública. ¿Problemas con VoIP? No más. ¿Problemas con juegos online? No más. ¿Problemas con P2P? No más. Pero NO, la gente prefiere seguir con NAT porque *siempre se ha hecho así*."

**La realidad:** IPv6 no es más complicado. Es DIFERENTE. Y la pereza al cambio es el mayor obstáculo para su adopción.

---

## ⚡ Laboratorio de Tortura: Configuración IPv6

> **Duración:** 45 minutos
> **Herramienta:** Packet Tracer

**Escenario:**
1. Configura 2 PCs con IPv6 estático: PC-A: 2001:DB8:1::10/64, PC-B: 2001:DB8:1::20/64.
2. Conéctalos a un switch. Haz ping.
3. Ahora añade un router entre ellos. PC-A: 2001:DB8:1::10/64, PC-B: 2001:DB8:2::20/64.
4. Configura rutas IPv6 en el router.

**Configuración del router:**
```
ipv6 unicast-routing
interface GigabitEthernet0/0
 ipv6 address 2001:DB8:1::1/64
 no shutdown
interface GigabitEthernet0/1
 ipv6 address 2001:DB8:2::1/64
 no shutdown
```

**Fallo intencionado:** En el router, habilita IPv6 unicast-routing pero olvida configurar la interfaz hacia PC-B (`GigabitEthernet0/1`). PC-A puede hacer ping al router, pero no a PC-B. ¿Por qué? El router no tiene ruta de vuelta porque la interfaz de salida no está configurada.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **IPv6 Compressor** | Comprimir 5 direcciones IPv6 largas a su forma más corta posible |
| 🏅 **Dual Stack Master** | Configurar Dual Stack en un router y verificar que ambos protocolos funcionan |
| 🏅 **SLAAC Survivor** | Explicar SLAAC sin usar apuntes, incluyendo RA, RS y EUI-64 |
| 🏅 **Transition Guru** | Nombrar 3 mecanismos de transición IPv4→IPv6 y cuándo usar cada uno |

---

## 🧠 Atrévete a Pensar

1. Comprime esta dirección IPv6: `FE80:0000:0000:0000:02AA:00FF:FE9A:4CA2`
2. ¿Cuántas direcciones IPv6 hay en total? Escríbelo en notación científica.
3. ¿Qué ventaja tiene SLAAC frente a DHCP?
4. ¿Qué es NAT64? ¿Para qué sirve?
5. ¿Por qué las subredes IPv6 son siempre /64? ¿Qué pasa si usas /72 o /56?
6. ¿Qué reemplaza a ARP en IPv6? ¿Cómo funciona?

<details>
<summary>💡 Soluciones</summary>

1. **FE80::2AA:FF:FE9A:4CA2**
2. **3.4 × 10³⁸** direcciones (340 sextillones).
3. SLAAC no necesita servidor. El router anuncia el prefijo y cada dispositivo genera su propia IP. Cero configuración.
4. **NAT64** traduce tráfico IPv6 a IPv4. Permite que redes solo-IPv6 accedan a recursos IPv4. Puente entre ambos mundos.
5. /64 asegura que los 64 bits inferiores son para el identificador de interfaz, necesarios para SLAAC y EUI-64. Con /72 no podrías usar SLAAC estándar. Con /56 tienes 256 subredes /64 (más flexible).
6. **NDP (Neighbor Discovery Protocol)** usando ICMPv6. NS (Neighbor Solicitation) pregunta por una IP, NA (Neighbor Advertisement) responde con la MAC. Usa multicast en lugar de broadcast.

</details>

---

## 🧩 Crucigrama de Bits

```
Horizontal:
3. Método de autoconfiguración IPv6 sin servidor (5 letras)
4. Número de bits de una dirección IPv6 (3 dígitos)
5. Técnica IPv4 + IPv6 simultáneamente (9 letras, 2 palabras)
7. Protocolo equivalente a ARP en IPv6 (3 letras)

Vertical:
1. Prefijo de las direcciones Link-Local (4 caracteres + dígito)
2. Tipo de dirección equivalente a broadcast en IPv6 (9 letras)
6. Bits del prefijo estándar para subredes IPv6 (2 dígitos)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 3. SLAAC, 4. 128, 5. DUALSTACK, 7. NDP
**Vertical:** 1. FE80, 2. MULTICAST, 6. 64

</details>

---

## 💬 Preguntas de Entrevista de Trabajo

1. **"¿Cómo migrarías una empresa de 500 empleados de IPv4 a IPv6?"**
2. **"¿Qué ventajas tiene IPv6 sobre IPv4 además de más direcciones?"**
3. **"Explica la diferencia entre SLAAC y DHCPv6."**
4. **"¿Qué es un prefijo /64 en IPv6? ¿Por qué es el estándar para subredes?"**
5. **"¿Cómo funciona NDP? ¿En qué mejora a ARP?"**
6. **"¿Qué mecanismo de transición usarías para conectar dos sedes con IPv6 a través de una WAN solo-IPv4?"**

---

## 🤷 No hay preguntas tontas

> ❓ **¿IPv6 reemplazará completamente a IPv4?**

No, ambos protocolos coexistirán durante décadas. Aunque IPv6 resuelve el problema del agotamiento de direcciones IPv4 y ofrece ventajas como la autoconfiguración (SLAAC), la eliminación de NAT y un espacio de direcciones prácticamente ilimitado, la infraestructura global de Internet sigue mayoritariamente basada en IPv4. Los mecanismos de transición como Dual Stack, los túneles y NAT64 permiten que ambos protocolos operen simultáneamente mientras se completa la migración.

---

> ❓ **¿Por qué no se usa /64 en IPv4?**

Porque en IPv4, /64 significaría que solo quedan 64 IPs para hosts, lo que es más que suficiente — pero el problema es que en IPv4 no tenemos SLAAC ni EUI-64, y desperdiciaríamos direcciones. En IPv4, /24 es el estándar para LANs pequeñas. En IPv6, el espacio es tan enorme que no nos importa "desperdiciar" 64 bits en identificadores de interfaz.

---

> ❓ **¿Puedo usar una IP IPv6 y otra IPv4 en el mismo PC?**

Sí, eso es Dual Stack. Todos los sistemas operativos modernos (Windows, Linux, macOS) tienen ambas pilas activas por defecto. El sistema decide qué protocolo usar según la resolución DNS: si el dominio tiene registro AAAA usa IPv6; si solo A, usa IPv4.

---

> ❓ **¿IPv6 es más seguro que IPv4?**

No intrínsecamente. IPv6 no tiene mecanismos de seguridad adicionales por defecto. Sin embargo, elimina la necesidad de NAT (que daba una falsa sensación de seguridad) y obliga a usar firewalls correctamente. IPsec está integrado en IPv6, pero su uso no es obligatorio. La seguridad depende de la configuración, no del protocolo.

---

## 🎬 Post-Créditos

La transición a IPv6 no es inmediata ni absoluta. Aunque una dirección IPv6 como 2001:DB8:CAFE::1 ofrece conectividad extremo a extremo sin las limitaciones de NAT, la realidad es que la mayoría de los servicios en Internet aún operan sobre IPv4. La coexistencia de ambos protocolos mediante mecanismos de transición como Dual Stack, túneles y NAT64 es esencial durante este período de migración.

**PRÓXIMAMENTE EN U06:** Exploraremos el mundo de los switches: STP, tablas MAC y por qué los bucles de red son un problema crítico en redes conmutadas.

---

## ✅ Criterios de evaluación cubiertos

**RA2/RA7: Conecta redes privadas a redes públicas.**

| Criterio | Cubierto |
|---|---|
| a) Direccionamiento IPv6 | ✅ Estructura, tipos, prefijos |
| b) Autoconfiguración | ✅ SLAAC, EUI-64, DHCPv6 |
| c) Transición IPv4→IPv6 | ✅ Dual Stack, túneles, NAT64 |
| d) Conectividad IPv6 | ✅ Laboratorio Packet Tracer |
