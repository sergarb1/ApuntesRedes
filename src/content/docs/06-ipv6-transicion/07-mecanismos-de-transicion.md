---
title: 07 — Mecanismos de transición
description: Dual Stack, túneles y NAT64/DNS64 para convivir durante la migración 🔀
---

<p><small>Dual Stack, túneles y NAT64/DNS64 para convivir durante la migración 🔀</small></p>

> 🗺️ **Estás en:** 🚀 **U06 · IPv6 y transición** → 07 · Mecanismos de transición

---

## 📬 La idea en una frase

> IPv4 no desaparecerá de golpe: la transición se apoya en **Dual Stack** (los dos protocolos a la vez), **túneles** (IPv6 dentro de IPv4 cuando el camino no lo soporta) y **NAT64 + DNS64** (traducción para que una red solo-IPv6 hable con los servidores solo-IPv4 de toda la vida).

No hay un interruptor que apague IPv4. Los tres mecanismos conviven mientras la Internet entera migra poco a poco.

---

## 🗃️ Dual Stack: el "por si acaso" de los dos a la vez

Es la estrategia recomendada siempre que tu ISP ofrezca IPv6 nativo. El dispositivo tiene **ambas pilas activas** (IPv4 e IPv6) y **el DNS decide** cuál usar:

```
PC con Dual Stack:
  IPv4:  192.168.1.10
  IPv6:  2001:DB8:1:2:21A:2BFF:FE3C:4D5E

  "¿google.com?" → ¿registro AAAA? (IPv6) → usamos IPv6
                → solo registro A? (IPv4) → usamos IPv4
```

- El **registro AAAA** es la IPv6 del dominio; el **registro A** es su IPv4. Un dominio "dual" tiene ambos.
- ✅ **Ventaja:** funciona con todo, sin encapsulación ni traducción extra; si una pila falla, la otra sigue.
- ❌ **Desventaja:** hay que configurar y mantener el doble (routing, DNS, firewalls); más overhead en el plano de control.

> 💡 **Regla de oro:** ante cualquier proyecto de migración, "Dual Stack si hay IPv6 nativo" es la respuesta que espera el entrevistador (lo verás en el cierre).

---

## 🕳️ Túneles: IPv6 dentro de IPv4

Cuando *el camino* intermedio solo habla IPv4, encapsulamos el paquete IPv6 **dentro de un paquete IPv4** para que atraviese la zona muerta:

```
[IPv6 packet]  → encapsular → [IPv4 header | IPv6 packet]  → desencapsular → [IPv6 packet]
   (sede A)                     voy por una red solo-IPv4                     (sede B)
```

| Túnel | Cómo funciona | Cuándo usarlo |
|---|---|---|
| **6to4** | Automático, prefijo reservado `2002::/16` | ISP sin IPv6 nativo, saltos puntuales |
| **Teredo** | Encapsula IPv6 en **UDP sobre IPv4**, atraviesa NAT | Último recurso (cliente tras NAT) |
| **GRE** | Túnel punto a punto configurado a mano | Redes corporativas ambos extremos IPv6 |
| **ISATAP** | Túnel sobre la **LAN IPv4 interna** | Transiciones dentro del campus/empresa |

> ⚠️ **Ojo mental:** los túneles automáticos (6to4, Teredo) están de capa caída por problemas de seguridad y fiabilidad; hoy se prefiere Dual Stack o túneles GRE/manuales si no hay alternativa.

---

## 🌉 NAT64 + DNS64: el puente para solo-IPv6

Cuando tu red es **solo IPv6** (sin IPv4 en el cliente) pero quieres acceder a servicios que **solo tienen IPv4**, enrutas la traducción por un router NAT64:

```
 PC solo-IPv6  →   NAT64/DNS64 router   →   Servidor solo-IPv4
   (IPv6)            traduce IPv6↔IPv4        (IPv4)
```

- **DNS64** inventa **direcciones IPv6 sintéticas** para los registros A (IPv4): el cliente IPv6 resuelve el nombre sin problema.
- **NAT64** traduce el tráfico real: IPv6→IPv4 hacia fuera y la respuesta IPv4→IPv6 hacia dentro. Es el *NAT inverso* de la U11.

```
  PC:  "¿example.com?"        → DNS64 genera 64:FF9B::C000:0201 (IPv6 sintética)
  PC:  <paquete a esa IPv6>   → NAT64 la traduce a 192.0.2.1 (IPv4 real) y la emite
```

> 🏁 **Distinción que siempre preguntan:** **NAT64** traduce el *protocolo* (IP en IP), mientras que el **túnel** lo *encapsula* (IPv6 dentro de IPv4). Encapsular no traduce: el paquete interior sigue siendo IPv6.

---

## 🧭 ¿Y cuál elijo? (guía rápida de decisión)

| Situación | Mecanismo |
|---|---|
| El ISP ya ofrece IPv6 nativo | **Dual Stack** |
| Sede con IPv6 ↔ Sede con IPv6 separadas por WAN solo-IPv4 | **Túnel GRE** (o 6to4 puntual) |
| Cliente móvil tras NAT, sin IPv6 de ningún tipo | **Teredo** (última bala) |
| Red corporativa solo-IPv6 que debe hablar con Internet IPv4 | **NAT64 + DNS64** |
| Laboratorio de pruebas a corto plazo | Cualquiera, pero documenta qué cambias |

---

## 🧠 Mini-chequeo

1. ¿Qué registro DNS elige IPv6 en un PC dual stack? ¿Y si no existe?
2. Diferencia en una frase: túnel vs NAT64.
3. Un cliente solo-IPv6 quiere visitar un web solo-IPv4. ¿Qué dos piezas participan y qué hace cada una?

<details>
<summary>🔄 Respuestas</summary>

1. El DNS primero consulta el registro **AAAA** (IPv6). Si el dominio no tiene, cae a **A** (IPv4). Por eso un dominio dual stack entrega ambos registros.
2. Un **túnel encapsula** IPv6 dentro de IPv4 (el paquete interior sigue siendo IPv6); **NAT64 traduce** directamente IPv6↔IPv4 (cambia la dirección en las cabeceras).
3. **DNS64** genera una IPv6 sintética a partir del registro A del servidor; **NAT64** traduce el tráfico real IPv6→IPv4 (y vuelta) hacia el servidor. Sin DNS64 el cliente ni siquiera podría resolver el nombre como IPv6.
</details>

---

## ✅ Resumen en 3 frases

- **Dual Stack** mantiene IPv4 e IPv6 simultáneamente y deja que el DNS elija (registro AAAA vs A).
- Los **túneles** (6to4, Teredo, GRE, ISATAP) encapsulan IPv6 dentro de IPv4 cuando el camino es solo-IPv4.
- **NAT64 + DNS64** permiten que una red solo-IPv6 acceda a servicios solo-IPv4 traduciendo el tráfico.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Dual Stack | IPv4 e IPv6 a la vez; DNS decide (AAAA vs A) |
| AAAA | Registro DNS de dirección IPv6 |
| Túnel | Encapsular IPv6 dentro de IPv4 |
| 6to4 / Teredo / GRE / ISATAP | Tipos de túnel: automático, UDP/NAT, manual, LAN |
| NAT64 | Traducción IPv6→IPv4 (protocolos distintos) |
| DNS64 | Genera IPv6 sintética a partir de registros A |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/06-ipv6-transicion) · **Anterior:** [06 · ICMPv6 y NDP](/ApuntesRedes/06-ipv6-transicion/06-icmpv6-y-ndp) · **Siguiente:** [08 · Configuración IPv6](/ApuntesRedes/06-ipv6-transicion/08-configuracion-ipv6)