---
title: 08 — Configuración IPv6
description: Estática en PC y router, verificación y práctica en Packet Tracer ⚙️
---

<p><small>Estática en PC y router, verificación y práctica en Packet Tracer ⚙️</small></p>

> 🗺️ **Estás en:** 🚀 **U05 · IPv6 y transición** → 08 · Configuración IPv6

---

## 📬 La idea en una frase

> Configurar IPv6 es parecido a IPv4: **estática** en PC (una IP y un prefijo) y en router (`ipv6 unicast-routing` + `ipv6 address X/64` por interfaz), y luego **verificarlo** con `show ipv6 interface brief` y `ping`. La gracia extra: en IPv6 hasta la Link-Local se configura sola.

Este punto es el 80% práctico de la unidad: comandos de verdad, tal cual los ejecutarías en un PC y en un router Cisco (y su versión Packet Tracer).

---

## 💻 Configurar un PC con IPv6 estático

En IPv4 pondrías IP, máscara y gateway. En IPv6, dirección **y prefijo** (el `X/64`):

**Windows (GUI):**
- Panel de control → Red → Adapter → IPv6 → propiedades.
- Marcar "Usar la siguiente dirección IPv6", introducir por ejemplo `2001:DB8:1::10` con prefijo `/64` y el gateway `2001:DB8:1::1`.

**Windows (netsh):**
```
netsh interface ipv6 add address "Ethernet" 2001:DB8:1::10/64
netsh interface ipv6 add route ::/0 "Ethernet" 2001:DB8:1::1
```

**Linux (iproute2):**
```
ip -6 addr add 2001:DB8:1::10/64 dev eth0
ip -6 route add default via fe80::1 dev eth0    # o GUA si existe
```

> ⚠️ **Detalle Linux:** el default gateway IPv6 suele ser una **Link-Local** (porque el RA la traía). No te asustes: `ip -6 route` mostrará `default via fe80::1 dev eth0`, y eso es válido y normal.

---

## 🖧 Configurar un router Cisco con IPv6

Dos pasos que olvida el 90% de la gente *al principio*:

1. **Habilitar el enrutamiento IPv6 global:** `ipv6 unicast-routing`. Sin él, el router ni reenvía ni responde a RS/RA.
2. **Asignar direcciones por interfaz:** `ipv6 address X/64` (y `no shutdown`).

```
router(config)# ipv6 unicast-routing
router(config)# interface GigabitEthernet0/0
router(config-if)# ipv6 address 2001:DB8:1::1/64
router(config-if)# no shutdown
router(config)# interface GigabitEthernet0/1
router(config-if)# ipv6 address 2001:DB8:2::1/64
router(config-if)# no shutdown
```

Resultado: el router conoce la subred `2001:DB8:1::/64` por G0/0 y `2001:DB8:2::/64` por G0/1. Con eso ya puede encaminar entre ellas (y anunciar los prefijos si actuamos el SLAAC del punto 4).

**Rutas estáticas IPv6 (si hubiera más saltos):**
```
router(config)# ipv6 route 2001:DB8:3::/64 2001:DB8:2::2
```

---

## ✅ Verificación: los comandos que dan vida

```
router# show ipv6 interface brief
GigabitEthernet0/0    [up/up]   FE80::200:FFF:FE00:1
                                2001:DB8:1::1
GigabitEthernet0/1    [up/up]   FE80::200:FFF:FE00:1
                                2001:DB8:2::1

router# show ipv6 route
C   2001:DB8:1::/64 [0/0] via GigabitEthernet0/0
C   2001:DB8:2::/64 [0/0] via GigabitEthernet0/1

router# ping 2001:DB8:1::10
Success rate is 100 percent (5/5)
```

En un **PC**, equivalentes: `ipconfig /all` (Windows, dirección IPv6 + gateway LLA) o `ip -6 addr` y `ip -6 route` (Linux). El `ping` IPv6 se llama `ping -6` en Windows y `ping6` en algunos Linux.

> 💡 **Regla de diagnóstico:** si `show ipv6 interface brief` no muestra la dirección que configuraste en una interfaz, es que la config no "entró" o la interfaz está shutdown. Es exactamente el fallo del ⚡ Laboratorio del [punto 9](/ApuntesRedes/05-ipv6-transicion/09-head-first).

---

## 🧪 Y en Packet Tracer

- **PCs:** en la pestaña *Desktop → IPv6 Configuration* tienes el formulario; o el *IP Configuration* tradicional para ver cómo conviven IPv4 e IPv6 (dual stack).
- **Routers:** el CLI es 100% el de Cisco real: `ipv6 unicast-routing` + `ipv6 address …/64` por interfaz.
- Las **LLAs** se generan solas (a partir de la MAC simulada): verás `FE80::…` en cada interfaz activa.
- Prueba de fuego: dos PC en subredes distintas, un router en medio, ping IPv6 entre ellos. Avísame si el ping falla y justo el `show ipv6 interface brief` se *calla* en una interfaz — ese es tu fallo favorito del laboratorio.

---

## 🧠 Mini-chequeo

1. ¿Qué comando global (y único) habilita el enrutamiento IPv6 en un router Cisco?
2. Escribe la configuración mínima para que un router asigne `2001:DB8:5::1/64` a su interfaz G0/0.
3. ¿Por qué el `show ipv6 interface brief` es la primera línea de diagnóstico al fallar un ping IPv6?

<details>
<summary>🔄 Respuestas</summary>

1. **`ipv6 unicast-routing`** (modo global). Sin él, el router no encamina IPv6 ni participa en NDP/RA.
2. `ipv6 unicast-routing`; luego `interface GigabitEthernet0/0`; dentro, `ipv6 address 2001:DB8:5::1/64` y `no shutdown`.
3. Porque muestra el **estado real** de cada interfaz (up/down) y las **direcciones asignadas**. Si la interfaz hacia el destino no tiene su IPv6 o está down, el origen envía el NS/RS y nadie responde: ahí está el fallo del laboratorio.
</details>

---

## ✅ Resumen en 3 frases

- En **PC**: IP + prefijo `/64` (+ gateway, normalmente LLA) — estático o vía SLAAC.
- En **router** Cisco: `ipv6 unicast-routing` una vez y `ipv6 address X/64` + `no shutdown` por interfaz.
- Se verifica con `show ipv6 interface brief`, `show ipv6 route` y `ping`; en Packet Tracer el flujo es idéntico.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| `ipv6 unicast-routing` | Activa el reenvío IPv6 en el router |
| `ipv6 address X/64` | Asigna dirección IPv6 estática a una interfaz |
| `show ipv6 interface brief` | Estado y direcciones por interfaz |
| `show ipv6 route` | Tabla de rutas IPv6 |
| Default gateway LLA | Salida por defecto suele ser `fe80::…` del router |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/05-ipv6-transicion) · **Anterior:** [07 · Mecanismos de transición](/ApuntesRedes/05-ipv6-transicion/07-mecanismos-de-transicion) · **Siguiente:** [09 · Head First (cierre)](/ApuntesRedes/05-ipv6-transicion/09-head-first)