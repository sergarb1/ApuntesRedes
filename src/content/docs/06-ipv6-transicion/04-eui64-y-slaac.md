---
title: 04 — EUI-64 y SLAAC
description: De la MAC al identificador de interfaz y la autoconfiguración plug-and-play 🌱
---

<p><small>De la MAC al identificador de interfaz y la autoconfiguración plug-and-play 🌱</small></p>

> 🗺️ **Estás en:** 🚀 **U06 · IPv6 y transición** → 04 · EUI-64 y SLAAC

---

## 📬 La idea en una frase

> **EUI-64** convierte la dirección MAC (48 bits) en el **identificador de interfaz** (64 bits) de una IPv6, y **SLAAC** usa ese identificador para que un dispositivo se **configure su propia IP solo**, con el prefijo que anuncia el router.

En IPv4, sin DHCP no hay IP. En IPv6, el equipo puede generarse el 100% de su dirección sin preguntar a nadie. Este es el punto de la *magia plug-and-play*.

---

## 🔧 EUI-64 paso a paso

El identificador de interfaz son los **últimos 64 bits** de una dirección IPv6. Se puede construir a partir de la MAC con EUI-64 (RFC 4291):

```
MAC original:              00:1A:2B:3C:4D:5E  (48 bits)

Paso 1 — Partir en dos mitades:
               00:1A:2B  +  3C:4D:5E

Paso 2 — Insertar FF:FE en medio:
               00:1A:2B:FF:FE:3C:4D:5E

Paso 3 — Invertir el bit 7 del primer byte (bit U/L, Universal/Local):
               byte 00 (0000 0000) → 02 (0000 0010)
               resultado: 02:1A:2B:FF:FE:3C:4D:5E

Resultado (EUI-64):      021A:2BFF:FE3C:4D5E
```

**Regla del bit 7:** las MAC se fabrican con el bit *Universal* en `0` (las primeras 3 dan idea). IEEE quiere que el IID se marque como *locally administered* poniendo ese bit a `1`. Como `00` es `00000000`, se convierte en `00000010` = `02`. Por eso, en la práctica, **la primera cifra del IID suele ser `02` (o `02`, `03`, `2`, `3`, `a`, `b` en hexadecimal) si la MAC empezaba por 00, 04, 10, etc.** No es un error: es la inversión del bit U/L.

> ⚠️ **Regla mnemotécnica de CONRAD:** "Divide, inserción FF:FE, y flip del bit 7. Tres pasos, uno más que el café con leche."

---

## 📦 ¿Y ahora qué? El IID + prefijo = dirección

El IID generado por EUI-64 se pega a los primeros 64 bits del prefijo:

```
Prefijo /64:    2001:DB8:1:2:0000:0000:0000:0000
IID (EUI-64):                       021A:2BFF:FE3C:4D5E
Dirección:     2001:DB8:1:2:021A:2BFF:FE3C:4D5E/64
```

Con la MAC `00:1A:2B:3C:4D:5E` de antes, ese sería el **estado final**: una dirección válida, usuario a usuario, sin configurar nada a mano.

---

## 🛡️ Privacy Extensions (RFC 4941)

EUI-64 tiene un **defecto de privacidad**: una misma MAC genera **siempre la misma IP**. Cualquiera que te vea conectarte a dos redes distintas puede unir los puntos y rastrear tu dispositivo físico.

- **Solución moderna:** *Privacy Extensions* (RFC 4941). Los sistemas operativos (Windows, Linux, macOS) generan **direcciones temporales** — un IID aleatorio que cambia cada cierto tiempo (horas/días).
- **Resultado:** tienes la dirección estable EUI-64 *y* otras temporales; las temporales se usan para salir hacia fuera y la estable para servicios entrantes.

```
ipconfig (Windows):
  IPv6 Address....: 2001:DB8:1:2:f822: **aleatorio**  ← temporal (cambia)
  IPv6 Address....: 2001:DB8:1:2:021a:2bff:fe3c:4d5e ← estable (EUI-64)
```

---

## 🌱 SLAAC: la autoconfiguración sin servidor

**SLAAC** (*Stateless Address Autoconfiguration*, RFC 4862) permite a un dispositivo crear su IP sin ningún servidor central:

1. El equipo manda un **RS (Router Solicitation)** al grupo de routers: "¿Hay alguien aquí que me dé un prefijo?".
2. El router responde con un **RA (Router Advertisement)** que incluye el prefijo de red (`2001:DB8:1:2::/64`), los flags M y O ([punto 5](/ApuntesRedes/06-ipv6-transicion/05-dhcpv6)) y otros parámetros.
3. El equipo combina **prefijo + su EUI-64 (o su temporal)** y ya tiene IP.

```
 PC:     "RS, ¿quién manda aquí?"      →  FF02::2 (todos los routers)
 Router: "RA: mi prefijo es 2001:DB8:1:2::/64"  →  multicast a nodos
 PC:     "Perfecto: 2001:DB8:1:2:021A:2BFF:FE3C:4D5E"
```

> 🏠 **Detalle fino:** un PC con SLAAC configura la IP pero **no sabe quién es su gateway**; el gateway por defecto se aprende del **origen LLA del RA**, no del prefijo. De ahí que el default gateway IPv6 suela ser `fe80::1` o `fe80::…` — mira el boletín avanzado.

---

## ⚖️ Ventajas y desventajas de SLAAC

| ✅ Ventajas | ❌ Desventajas |
|---|---|
| Sin servidor, sin configuración, **plug-and-play** | **No asigna DNS** (aunque el RA puede anunciarlo con RDNSS) |
| El router solo anuncia el prefijo (stateless) | No hay control central de quién coge qué IP |
| Funciona con cualquier dispositivo que hable IPv6 | Los IID EUI-64 son predecibles si no usas privacy extensions |
| Robusto: cada equipo se autoconfigura y sobrevive a caídas | Menos trazabilidad/auditoría que DHCP |

Por eso existen **DHCPv6** (lado stateful) y los flags M/O para elegir mezcla — siguiente punto.

---

## 🧠 Mini-chequeo

1. Dada la MAC `00:1A:2B:3C:4D:5E`, calcula el EUI-64 paso a paso.
2. Con prefijo `2001:DB8:1:2::/64`, escribe la dirección IPv6 completa para esa MAC.
3. ¿Por qué los sistemas operativos usan también direcciones temporales en lugar de solo EUI-64?

<details>
<summary>🔄 Respuestas</summary>

1. Partir: `00:1A:2B` + `3C:4D:5E` → insertar `FF:FE`: `00:1A:2B:FF:FE:3C:4D:5E` → invertir bit 7 del primer byte: `00` → `02` → **`021A:2BFF:FE3C:4D5E`**.
2. **`2001:DB8:1:2:021A:2BFF:FE3C:4D5E/64`** (prefijo + el IID del paso 1).
3. Por **privacidad** (RFC 4941): el EUI-64 es predecible y permite rastrear el dispositivo entre redes. Las direcciones temporales cambian cada cierto tiempo y separan las salidas (temporal) de los servicios entrantes (estable).
</details>

---

## ✅ Resumen en 3 frases

- **EUI-64** transforma la MAC en IID: partir en dos, insertar `FF:FE`, invertir el bit 7 → `021A:2BFF:FE3C:4D5E`.
- **SLAAC** da la IP sin servidor: RS → RA (con prefijo) → prefijo + IID.
- Las **privacy extensions** existen porque el EUI-64 es predecible y rastrable; las temporales rompen el tracking.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| IID | Identificador de interfaz: los 64 bits finales de una IPv6 |
| EUI-64 | Algoritmo MAC → IID (FF:FE + bit U/L) |
| Bit U/L | Bit 7 del primer byte, se invierte para marcar lo local |
| SLAAC | Autoconfiguración de dirección sin servidor (RA + IID) |
| Privacy Extensions | IID aleatorio temporal para evitar el rastreo (RFC 4941) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/06-ipv6-transicion) · **Anterior:** [03 · Tipos de direcciones](/ApuntesRedes/06-ipv6-transicion/03-tipos-de-direcciones) · **Siguiente:** [05 · DHCPv6](/ApuntesRedes/06-ipv6-transicion/05-dhcpv6)