---
title: "09 — Cierre: consolida lo aprendido"
description: El cierre práctico con direcciones, túnel y laboratorio IPv6 🧠
---

<p><small>El cierre práctico con direcciones, túnel y laboratorio IPv6 🧠</small></p>

> 🗺️ **Estás en:** 🚀 **U05 · IPv6 y transición** → 09 · Cierre

---

Has terminado la teoría. Este cierre es el aterrizaje: recorre lo aprendido con juegos, un laboratorio real en Packet Tracer y las preguntas que te harán en una entrevista. Léelo justo después del [punto 8](/ApuntesRedes/05-ipv6-transicion/08-configuracion-ipv6) y antes de abrir los boletines.

---

## ⭐ Be the Packet, my friend...

> *Eres la dirección FE80::1AA:2BB:3CC:4DD1. Acabas de "nacer" en la interfaz de un PC que se acaba de conectar a un switch. ¿Qué tipo de dirección eres?*

**Pista:** tu primer grupo es `FE80`.

Eres una **Link-Local**: solo funcionas en el enlace local (la misma red física). Los routers **no te reenvían** fuera del segmento. Ese es tu trabajo: hablar con vecinos, resolver MACs (NDP) y escuchar a los routers (RS/RA). No te sirven para llegar a Internet, pero eres la semilla de todo lo demás.

**Escenario:** dos PCs conectados al mismo switch tienen solo direcciones Link-Local. ¿Pueden comunicarse entre ellos?

1. **Sí** → ✅ ¡Correcto! Las Link-Local permiten comunicación en el mismo segmento físico. Sin routers de por medio, se ven.
2. **No** → ❌ Incorrecto, sí pueden. Pero solo con otros dispositivos en el mismo enlace, nunca fuera.
3. **Solo si tienen además una Global Unicast** → No necesariamente. La Link-Local es suficiente para comunicación local directa.

> 💡 **¿Sabías que todo IPv6 arranca en Link-Local?** Incluso un PC con GUA, SLAAC o no, tiene su FE80 automática. Cuando haces un `show ipv6 interface brief`, lo primero que ves es la LLA de cada interfaz con estado up/up.

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

1. **Link-Local** (FE80::/10) — automática, no enrutable, local al enlace.
2. **Global Unicast** (2000::/3) — pública, única, enrutable.
3. **Dual Stack** — ambas pilas funcionando simultáneamente.
4. **SLAAC** — Stateless Address Autoconfiguration, basada en Router Advertisements.
5. **NDP** — Neighbor Discovery Protocol, vía ICMPv6.
6. **NAT64** — traducción IPv6 → IPv4 (con DNS64 como compañero).

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
1. Configura 2 PCs con IPv6 estático: PC-A `2001:DB8:1::10/64`, PC-B `2001:DB8:1::20/64`.
2. Conéctalos a un mismo switch. Haz ping A→B. 🩺
3. Ahora separa las redes con un router: PC-A `2001:DB8:1::10/64`, PC-B `2001:DB8:2::20/64`.
4. Configura las interfaces y rutas IPv6 del router para que A y B vuelvan a verse.

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

**Fallo intencionado:** En el router, habilita el `ipv6 unicast-routing` global pero **olvida deliberadamente configurar la interfaz hacia PC-B** (`GigabitEthernet0/1`).

- PC-A hace ping al router (`2001:DB8:1::1`) → ✅ funciona.
- PC-A hace ping a PC-B (`2001:DB8:2::20`) → ❌ *Destination unreachable*.

**¿Por qué?** El router conoce la red de PC-A (G0/0 tiene IP), pero **no existe ninguna entrada para `2001:DB8:2::/64`** en su tabla IPv6 porque la interfaz de salida está vacía. No sabe hacia dónde mandar el paquete, así que responde ICMPv6 *Destination unreachable*.

> 🩺 **Pistas para diagnosticarlo:**
>
> **Pista 1:** ejecuta `show ipv6 interface brief` en el router. Si `GigabitEthernet0/1` aparece `[down/down]` o sin dirección IPv6 mientras `GigabitEthernet0/0` muestra `2001:DB8:1::1`, ahí está tu sospechoso.
>
> **Pista 2:** ejecuta `show ipv6 route`. Verás `C 2001:DB8:1::/64` conectada por G0/0, pero **ninguna** ruta para `2001:DB8:2::/64`. El router no tiene forma de volver con PC-B.
>
> **Pista 3:** el fallo solo se arregla configurando la interfaz G0/1 con `ipv6 address 2001:DB8:2::1/64` y `no shutdown`. En cuanto la interfaz sube, aparece la ruta conectada y el ping A→B funciona.

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

1. **`FE80::2AA:FF:FE9A:4CA2`** (la cadena de ceros se sustituye por `::`; `02AA` → `2AA`).
2. **3,4 × 10³⁸** direcciones (340 sextillones) = 2¹²⁸.
3. SLAAC no necesita servidor central: el router anuncia el prefijo (RA) y cada dispositivo genera su propia IP (prefijo + EUI-64). Cero configuración y supervivencia a caídas. Su desventaja: no asigna DNS ni controla qué IP coge cada uno (para eso existe DHCPv6 stateless/stateful).
4. **NAT64** traduce tráfico IPv6 → IPv4. Con **DNS64** (que fabrica direcciones IPv6 sintéticas) permite que una red solo-IPv6 acceda a recursos solo-IPv4. Puente entre ambos mundos.
5. /64 deja los 64 bits inferiores para el **identificador de interfaz**, condición de SLAAC y EUI-64. Con **/72** (más largo) se rompería SLAAC estándar. Con **/56** tienes 256 subredes /64 de sobra (más flexible, común en hogares/ISP).
6. **NDP (Neighbor Discovery Protocol)** usando ICMPv6: NS (Neighbor Solicitation) pregunta por la IP; NA (Neighbor Advertisement) responde con la MAC. Usa multicast (solicited-node) en lugar de broadcast, más eficiente.
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

> 💡 **Cómo encararlas:**
> - La **1** es la pregunta reina. Recorre tu plan de migración completo: inventario IPv4 → ¿ISP con IPv6 nativo? → **Dual Stack** en las LANs → DNS dual (AAAA+A) → túneles GRE si hay WAN solo-IPv4 → NAT64/DNS64 para los servicios legacy → formación y rollback. Muestra método, no memoria.
> - La **3 y 5** ganan si mencionas los mensajes concretos: SLAAC usa RA/RS y EUI-64; DHCPv6 stateful (M=1) vs stateless (O=1); NDP usa NS/NA y multicast en lugar de broadcast.
> - La **6** tiene respuesta esperada: **túnel GRE** (o 6to4 puntual) si el ISP no ofrece IPv6; nunca un túnel automático para producción.

---

## 🤷 No hay preguntas tontas

> ❓ **¿IPv6 reemplazará completamente a IPv4?**

No, ambos protocolos coexistirán durante décadas. Aunque IPv6 resuelve el agotamiento y trae SLAAC, sin NAT y un espacio de direcciones prácticamente ilimitado, la infraestructura de Internet sigue mayoritariamente basada en IPv4. Los mecanismos de transición (Dual Stack, túneles, NAT64) permiten que operen simultáneamente mientras se completa la migración, y las redes van dejando IPv4 como vía de retrocompatibilidad.

> ❓ **¿Por qué no se usa /64 en IPv4?**

Porque en IPv4 /64 no tiene sentido: tus 32 bits no llegan. En IPv4, **/24** es el estándar de LAN pequeña porque cada bit cuenta. En IPv6, el espacio es tan enorme que no importa "desperdiciar" 64 bits en identificadores de interfaz: ese desperdicio es precisamente lo que habilita SLAAC, EUI-64 y la autoconfiguración.

> ❓ **¿Puedo usar una IP IPv6 y otra IPv4 en el mismo PC?**

Sí, eso es **Dual Stack**. Windows, Linux y macOS traen ambas pilas activas por defecto. El sistema decide el protocolo según la resolución DNS: si el dominio tiene registro AAAA usa IPv6; si solo A, usa IPv4. Por eso a veces ves en un mismo PC una IPv4 y una IPv6 (y varias temporales) en `ipconfig /all`.

> ❓ **¿IPv6 es más seguro que IPv4?**

No intrínsecamente: no hay mecanismos de seguridad "gratis" (IPsec está integrado, pero su uso no es obligatorio). Sin embargo, quita el NAT (que daba una falsa sensación de seguridad por *oscuridad*) y obliga a hacer el firewall bien. El tamaño del espacio de direcciones además dificulta el escaneo de vecinos. El riesgo real viene de la configuración: seguridad de nuevo depende de ti, no del protocolo.

---

## 🎬 Post-Créditos

La transición a IPv6 no es inmediata ni absoluta. Aunque una dirección IPv6 como `2001:DB8:CAFE::1` ofrece conectividad extremo a extremo sin las limitaciones de NAT, la mayoría de servicios en Internet aún operan sobre IPv4. La coexistencia mediante Dual Stack, túneles y NAT64 es esencial durante esta migración; y detrás de cada PC que "solo se enciende y ya tiene IP" late la mano invisible de SLAAC, NDP y… un router en el armario de tu centro.

**PRÓXIMAMENTE EN U06:** Exploraremos el mundo de los switches: STP, tablas MAC y por qué los bucles de red son un problema crítico en redes conmutadas.

---

## ✅ Criterios de evaluación cubiertos (RA2/RA7)

**RA2/RA7: Conecta redes privadas a redes públicas.**

| CE | Criterio | Cubierto |
|---|---|---|
| a) | Direccionamiento IPv6 | ✅ Estructura, compresión, tipos (puntos 1-3) |
| b) | Autoconfiguración | ✅ EUI-64, SLAAC, DHCPv6 (puntos 4-5) |
| c) | Transición IPv4→IPv6 | ✅ Dual Stack, túneles, NAT64 (punto 7) |
| d) | Conectividad IPv6 | ✅ Configuración + ⚡ Laboratorio Packet Tracer |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/05-ipv6-transicion) · **Anterior:** [08 · Configuración IPv6](/ApuntesRedes/05-ipv6-transicion/08-configuracion-ipv6) · **Siguiente:** **[U06 · Switching y STP](/ApuntesRedes/06-switching-stp)**