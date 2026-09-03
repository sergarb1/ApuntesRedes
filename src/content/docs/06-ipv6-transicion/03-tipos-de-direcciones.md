---
title: 03 — Tipos de direcciones
description: Unicast, multicast y anycast; GUA, LLA, ULA y loopback 🎯
---

<p><small>Unicast, multicast y anycast; GUA, LLA, ULA y loopback 🎯</small></p>

> 🗺️ **Estás en:** 🚀 **U06 · IPv6 y transición** → 03 · Tipos de direcciones

---

## 📬 La idea en una frase

> IPv6 separa las direcciones en tres **tipos por propósito**: **unicast** (un destino), **multicast** (varios destinos de golpe) y **anycast** (el destino más cercano). Dentro de las unicast distingue la **Global Unicast (GUA)**, la **Link-Local (LLA)**, la **Unique Local (ULA)** y la loopback.

Es el punto donde dejas de ver "número raro" y empiezas a leer el **prefijo** para saber de qué estamos hablando en menos de un segundo.

---

## 🎯 Unicast: un solo destinatario

La dirección **unicast** identifica a una única interfaz: el paquete llega solo a ella. Es como un número de teléfono fijo de una persona.

| Tipo | Prefijo | Ámbito | ¿Para qué? |
|---|---|---|---|
| **Global Unicast (GUA)** | `2000::/3` | Global (Internet) | Equivalente a las IPs públicas IPv4. Única en el mundo. Enrutable. |
| **Link-Local (LLA)** | `FE80::/10` | Enlace local | Automática en cada interfaz. No enrutable: sirve para NDP, SLAAC y rutas locales. |
| **Unique Local (ULA)** | `FC00::/7` | Privada/organización | Equivalente a las RFC 1918. No enrutable en Internet. |
| **Loopback** | `::1/128` | Este nodo | Equivalente a 127.0.0.1. |

### 🔍 Cómo leer el prefijo de un vistazo

```
2001:DB8:1:2:21A:2BFF:FE3C:4D5E   →  GUA  (empieza por 2... / FE80... = LLA)
FE80::2AA:FF:FE9A:4CA2            →  LLA  (el primer grupo es FE80)
FC00::1                           →  ULA  (empieza por FC o FD)
::1                               →  Loopback (solito, sin ambigüedad)
FF02::1                           →  Multicast (primer grupo FF, el FF es la marca)
```

> 💡 **Truco:** los prefijos van por **rangos de bits**, no por los primeros grupos exactos. `2000::/3` significa "los primeros 3 bits son `001`", así que cualquier dirección que empiece entre `2000::` y `3FFF::` es una GUA. `FE80::/10` cubre `FE80::` hasta `FEBF::`.

### 🏠 Link-Local: la que nunca falta

Cada interfaz IPv6 tiene **automáticamente** una dirección Link-Local, la generes o no. Son los "DNS" internos: los routers las usan para NDP y SLAAC (un RA viene de `FE80::…`, no de la GUA del router). No se pueden enrutar: un router nunca las reenvía fuera del enlace. Por eso dos PCs en el mismo switch **sí pueden hablarse** con sus LLA sin que nadie configure nada, pero no pueden llegar a Internet con ellas.

### 🖥️ Lectura de un `ipconfig` real

Cuando configures IPv6 o te conectes por SLAAC, `ipconfig /all` te mostrará la mezcla completa de lo que has aprendido:

```
IPv6 Address......: 2001:db8:1:2:21a:2bff:fe3c:4d5e     ← GUA (global)
Temporary IPv6...: 2001:db8:1:2:9f3c:4a11:78de:22ab     ← prioridad, cambia
Link-local IPv6..: fe80::21a:2bff:fe3c:4d5e%12           ← LLA automática
Default Gateway..: fe80::1%12                            ← router (LLA)
```

Cada prefijo te dice el tipo: la GUA empieza por `2001:`, la Link-Local por `fe80::`, y el gateway es la LLA del router. Y el *Temporary IPv6* es la dirección temporal de Privacy Extensions (RFC 4941), de la que hablaremos en el [punto 4](/ApuntesRedes/06-ipv6-transicion/04-eui64-y-slaac). Tener varias direcciones a la vez es normal en IPv6.

---

## 📢 Multicast: uno para muchos

Una dirección **multicast** identifica a un **grupo** de interfaces. El paquete se copia a todos los miembros del grupo que estén interesados. Sustituye al broadcast de IPv4 (que molestaba a TODO el mundo) por grupos más quirúrgicos.

**Formato:** `FF00::/8` — el primer byte es `FF`.

| Dirección | Grupo |
|---|---|
| `FF02::1` | **Todos los nodos** IPv6 del enlace (≈ el broadcast de IPv4) |
| `FF02::2` | **Todos los routers** del enlace |
| `FF02::5` | Todos los routers OSPF |
| `FF02::1:FFxx:xxxx` | **Solicited-node multicast**: grupo derivado de la propia IP, usado por NDP ([punto 6](/ApuntesRedes/06-ipv6-transicion/06-icmpv6-y-ndp)) |

> ⚠️ **Ojo con el segundo bloque:** el `02` en `FF02::` indica el **ámbito** (scope): `02` = enlace local, `05` = sitio, `0E` = global. `FF02::1` solo afecta al cable local; no viaja.

---

## 🔀 Anycast: el más cercano gana

Una dirección **anycast** se asigna a **varias interfaces** (parece una unicast cualquiera), pero el tráfico se envía a la **más cercana según la métrica de enrutamiento**. Es "la farmacia 24h": pidas la dirección, y te atiende la sucursal que te pilla mejor.

- Se usa para servicios con réplicas: **DNS anycast** (los servidores raíz y 8.8.8.8/8.8.4.4), CDNs, balances de carga.
- La dirección anycast se toma **del bloque unicast** — no tiene formato especial; el enrutamiento decide quién responde.
- Ventaja brutal: si una sede cae, el tráfico se desvía automáticamente a la siguiente más cercana.

```
Usuario → "¿DNS?" → 1.1.1.1
                    ┌────────────┬────────────┐
                    │  Replica A │  Replica B │
                    │  (Madrid)  │ (Miami)    │
                    └────────────┴────────────┘
   el enrutamiento elige la replica MÁS CERCANA (A)
```

---

## 🧠 Mini-chequeo

1. Clasifica estas direcciones: `2001:DB8::1`, `FE80::1`, `FC00::1`, `::1`, `FF02::1`, `2001:DB8:1:2:21A:2BFF:FE3C:4D5E`.
2. Una dirección Link-Local, ¿puede viajar hasta Internet? ¿Por qué?
3. ¿Qué dirección cualquier cosa enviaría un servidor DNS anycast como 8.8.8.8 con IPv6?

<details>
<summary>🔄 Respuestas</summary>

1. `2001:DB8::1` → **GUA**. `FE80::1` → **Link-Local**. `FC00::1` → **ULA**. `::1` → **Loopback**. `FF02::1` → **Multicast** (todos los nodos del enlace). `2001:DB8:1:2:21A:2BFF:FE3C:4D5E` → **GUA**.
2. **No.** Las Link-Local no se enrutan: los routers las usan para NDP/SLAAC y comunicación local, pero jamás las reenvían fuera del enlace. Su prefijo `FE80::/10` es de ámbito estrictamente local.
3. Con `ping 2001:4860:4860::8888` (la versión anycast GUA de 8.8.8.8): la replica más cercana te responderá según el enrutamiento.
</details>

---

## ✅ Resumen en 3 frases

- Las **unicast** dominan el direccionamiento: GUA global, LLA automática y local, ULA privada y loopback.
- El **multicast** (`FF00::/8`) sustituye al broadcast de IPv4 con grupos como `FF02::1`, `FF02::2` y las solicited-node.
- Con **anycast** varias interfaces comparten dirección y el enrutamiento entrega al nodo **más cercano**: es lo que hace escalable al DNS.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| GUA | Global Unicast `2000::/3` — pública, enrutable, única en Internet |
| LLA | Link-Local `FE80::/10` — automática, no enrutable, local al enlace |
| ULA | Unique Local `FC00::/7` — privada (RFC 1918 de IPv6) |
| Multicast | `FF00::/8` — entrega a todo un grupo |
| Anycast | Varias interfaces, entrega a la más cercana |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/06-ipv6-transicion) · **Anterior:** [02 · Compresión y prefijos](/ApuntesRedes/06-ipv6-transicion/02-compresion-y-prefijos) · **Siguiente:** [04 · EUI-64 y SLAAC](/ApuntesRedes/06-ipv6-transicion/04-eui64-y-slaac)