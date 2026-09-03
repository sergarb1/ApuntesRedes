---
title: 06 — ICMPv6 y NDP
description: ARP, IGMP y broadcast pasan a mejor vida; llega NDP 🟢
---

<p><small>ARP, IGMP y broadcast pasan a mejor vida; llega NDP 🟢</small></p>

> 🗺️ **Estás en:** 🚀 **U06 · IPv6 y transición** → 06 · ICMPv6 y NDP

---

## 📬 La idea en una frase

> En IPv6, todo lo que hacía ARP, IGMP y el broadcast se reorganiza bajo **ICMPv6**: el **NDP** (*Neighbor Discovery Protocol*) sustituye a ARP con los mensajes **NS/NA**, y a los router discovery con **RS/RA**, usando **multicast en lugar de broadcast** para no molestar a todos.

Es el punto de la *higiene de red*: IPv6 no solo amplía direcciones, también limpia la forma de descubrir vecinos.

---

## 🔄 La tabla de traducción IPv4 → IPv6

| Función | IPv4 | IPv6 |
|---|---|---|
| Resolver IP → MAC | **ARP** | **NDP** (vía ICMPv6: NS/NA) |
| Pasarela y prefijo | Gateway + máscara configurados | **NDP RS/RA** (automático) |
| Multicast de listeners | **IGMP** | **MLD** (Multicast Listener Discovery) |
| Control de errores | ICMP | **ICMPv6** (ampliado, único protocolo) |
| Dirigirse a todos | **Broadcast** | **Multicast** (no existe broadcast IPv6) |
| Detección de duplicados (gateway) | — | NDP (DAD al encender) |

---

## 🤝 NDP: NS y NA (el "ARP" nuevo)

Cuando un PC quiere hablar con un vecino de su misma red, necesita su MAC. Dentro del enlace:

```
PC-A (2001:DB8::10)                     PC-B (2001:DB8::20)
        │ ① NS: "¿Quién tiene 2001:DB8::20?"      │
        │      (multicast solicited-node)         │
        │───────────────────────────────────────→  │
        │                                         │
        │ ② NA: "Yo, mi MAC es AA:BB:CC:DD:EE:FF" │
        │      (unicast dirigido a PC-A)           │
        │←───────────────────────────────────────  │
        │   ¡Listo! Aprende la MAC y envía la IP   │
```

- **Neighbor Solicitation (NS):** "¿Quién tiene la dirección X?" Va a la **solicited-node multicast** (`FF02::1:FFxx:xxxx`), un grupo mucho más pequeño que el broadcast.
- **Neighbor Advertisement (NA):** "Yo la tengo, y mi MAC es…". Se envía **unicast** al solicitante.

> 🏁 **Datos que premian en exámenes:** NDP también hace **DAD** (*Duplicate Address Detection*): al configurar una IP, todo host envía un NS a *su propia dirección* para ver si alguien más la está usando. Y la tabla de vecinos IPv6 es el equivalente a la tabla ARP de IPv4.

---

## 🔍 RS y RA (descubrir routers)

NDP también reemplaza al "gateway + máscara a mano" con dos mensajes:

- **RS (Router Solicitation):** el dispositivo pregunta al encender "¿Hay routers aquí?" → multicast `FF02::2` (todos los routers).
- **RA (Router Advertisement):** el router responde con el **prefijo**, los **flags M/O**, y otra info como RDNSS (DNS). Periódicos (cada unos minutos) y además responden a cada RS.

```
PC al encenderse:
  ① RS → "¿Hay algún router?"            (a FF02::2)
  ② RA ← "Sí, prefijo 2001:DB8:1:2::/64,
          M=0, O=1, RDNSS=8.8.8.8"
  ③ PC configura GUA por SLAAC y gateway = FE80 del router
```

Este RA es el que vimos en [SLAAC (punto 4)](/ApuntesRedes/06-ipv6-transicion/04-eui64-y-slaac) y el que leen los flags M/O del [punto 5](/ApuntesRedes/06-ipv6-transicion/05-dhcpv6).

---

## 📡 Multicast sobre broadcast: por qué gana

En IPv4, ARP usaba **broadcast**: iba a *todos*, y todos tenían que procesarlo aunque no les importara. En IPv6:

1. El NS va a una **solicited-node multicast** (`FF02::1:FFxx:xxxx`): solo los equipos cuyo último 24 bits coincidan con el IT de la IP objetivo lo procesan.
2. Resultado: **menos interrupciones**, menos CPU gastada, menos tráfico de fondo en redes grandes (los switches no inundan el grupo pretendido).

```
IPv4 broadcast:  ARP → FF:FF:FF:FF:FF:FF  → todo el switch procesa
IPv6 multicast:  NS  → 33:33:FF:xx:xx:xx  → solo el grupo interesado
```

> 💡 **Y el ASCI de la lección:** el multicast de IPv6 no es un lujo, es la razón de que redes con miles de equipos no se ahoguen en tráfico de descubrimiento. En el plano de redes es lo que hace escalable al [punto de transición](/ApuntesRedes/06-ipv6-transicion/07-mecanismos-de-transicion).

---

## 🧠 Mini-chequeo

1. ¿Qué mensajes ICMPv6 usan NS y NA? ¿A qué dirección multicast va el NS?
2. Un PC acaba de encenderse. ¿Qué mensaje envía primero para encontrar routers y qué recibe?
3. ¿Por qué NDP con multicast es más eficiente que ARP con broadcast?

<details>
<summary>🔄 Respuestas</summary>

1. **NS** ("¿quién tiene X?") va a la **solicited-node multicast** `FF02::1:FFxx:xxxx`. **NA** ("yo, aquí está mi MAC") se envía en **unicast** al solicitante.
2. **RS (Router Solicitation)** a `FF02::2` (todos los routers) y recibe un **RA (Router Advertisement)** con el prefijo, flags y DNS. Es el disparador de SLAAC.
3. Porque el broadcast lo procesa **toda** la red aunque no le interese; la solicited-node multicast solo la procesan los equipos del **mismo grupo reducido** (el 24 bits final de la IP). Menos carga de CPU y menos tráfico en el switch.
</details>

---

## ✅ Resumen en 3 frases

- **NDP** sustituye a ARP con **NS/NA** y a la configuración manual de gateway con **RS/RA**.
- **ICMPv6** agrupa control de errores, NDP y **MLD** (por IGMP) en un único protocolo.
- El paso de broadcast a **multicast** hace el descubrimiento quirúrgico: solo responde quien corresponde.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| NDP | Neighbor Discovery Protocol: NS/NA/RS/RA vía ICMPv6 |
| NS | Neighbor Solicitation: "¿quién tiene esta IP?" |
| NA | Neighbor Advertisement: "yo, mi MAC es…" |
| RS / RA | Router Solicitation / Advertisement: encontrar routers y prefijo |
| Solicited-node | Multicast reducido derivado del IT, `FF02::1:FFxx:xxxx` |
| MLD | Multicast Listener Discovery (sustituye a IGMP) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/06-ipv6-transicion) · **Anterior:** [05 · DHCPv6](/ApuntesRedes/06-ipv6-transicion/05-dhcpv6) · **Siguiente:** [07 · Mecanismos de transición](/ApuntesRedes/06-ipv6-transicion/07-mecanismos-de-transicion)