---
title: 12 — Mecanismos de transición
description: Dual Stack, túneles, NAT64/DNS64 y los parches de coexistencia (CG-NAT) para convivir durante la migración 🔀
---

<p><small>Dual Stack, túneles, NAT64/DNS64 y los parches de coexistencia (CG-NAT) para convivir durante la migración 🔀</small></p>

> 🗺️ **Estás en:** 🧮 **Direccionamiento IP y subnetting** → 12 · Mecanismos de transición

---

## 📬 La idea en una frase

> IPv4 no desaparecerá de golpe: la transición se apoya en **Dual Stack** (los dos protocolos a la vez), **túneles** (IPv6 dentro de IPv4 cuando el camino no lo soporta) y **NAT64 + DNS64** (traducción para que una red solo-IPv6 hable con los servidores solo-IPv4 de toda la vida).

No hay un interruptor que apague IPv4. Los tres mecanismos conviven mientras la Internet entera migra poco a poco… y mientras tanto los operadores se apañan con **CG-NAT** para exprimir lo que queda de IPv4.

![Los tres mecanismos de transición IPv4 a IPv6: Dual Stack (las dos pilas a la vez), túnel (IPv6 dentro de IPv4) y NAT64/DNS64 (traducción entre familias)](/ApuntesRedes/diagrams/u04-transicion.svg)

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
- ❌ **Desventaja:** hay que configurar y mantener el doble (routing, DNS, firewalls); más sobrecarga en el plano de control.

> 💡 **Regla de oro:** ante cualquier proyecto de migración, "Dual Stack si hay IPv6 nativo" es la respuesta que espera el entrevistador (el [boletín avanzado de IPv6](/ApuntesRedes/boletines/boletin-u04-ipv6-avanzado) te monta un diseño completo).

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

> ⚠️ **Ojo mental:** los túneles automáticos (6to4, Teredo) han caído en desuso por problemas de seguridad y fiabilidad; hoy se prefiere Dual Stack o túneles GRE/manuales si no hay alternativa.

---

## 🌉 NAT64 + DNS64: el puente para solo-IPv6

Cuando tu red es **solo IPv6** (sin IPv4 en el cliente) pero quieres acceder a servicios que **solo tienen IPv4**, enrutas la traducción por un router NAT64:

```
 PC solo-IPv6  →   NAT64/DNS64 router   →   Servidor solo-IPv4
   (IPv6)            traduce IPv6↔IPv4        (IPv4)
```

- **DNS64** inventa **direcciones IPv6 sintéticas** para los registros A (IPv4): el cliente IPv6 resuelve el nombre sin problema.
- **NAT64** traduce el tráfico real: IPv6→IPv4 hacia fuera y la respuesta IPv4→IPv6 hacia dentro. Es el "NAT" de la transición: traduce entre familias de direcciones, no entre rangos privados y públicos (eso, a fondo, en la unidad de NAT).

```
  PC:  "¿example.com?"        → DNS64 genera 64:FF9B::C000:0201 (IPv6 sintética)
  PC:  <paquete a esa IPv6>   → NAT64 la traduce a 192.0.2.1 (IPv4 real) y la emite
```

> 🏁 **Distinción que siempre preguntan:** **NAT64** traduce el *protocolo* (IP en IP), mientras que el **túnel** lo *encapsula* (IPv6 dentro de IPv4). Encapsular no traduce: el paquete interior sigue siendo IPv6.

---

## ⌨️ Dual stack en la práctica: ponerlo a funcionar

La teoría se apaña con dos pilas activas; en la práctica:

**PC (Windows estático):**

```
ipv6 address 2001:DB8:1:2::10/64     ← en la interfaz (GUI o netsh)
default gateway  fe80::1%12           ← suele ser link-local del router
```

**Router Cisco (lo mínimo que no puede faltar):**

```
ipv6 unicast-routing                      ← sin esto, el router ignora IPv6
interface GigabitEthernet0/0
 ipv6 address 2001:DB8:1:2::1/64
 no shutdown
```

**Verificación que da vida:** `show ipv6 interface brief` (el puerto debe estar Up/Up con su GUA), `ping` con dirección IPv6 literal o abreviada, y en el PC `ipconfig /all` (GUA + link-local con su `%zona`). Si falta la GUA, revisa si tu red es SLAAC (flag A), stateful (M) o stateless DHCPv6 (O): lo del [punto de DHCP](/ApuntesRedes/04-direccionamiento-ip/07-dhcp), ya adaptado a IPv6.

> 🗞️ **Curiosidad para la sobremesa:** cada cierto tiempo aparece por ahí alguna "propuesta de IPv8" con 64 bits y tono revolucionario, sin IETF ni RFC ni despliegue real. Es Internet-Draft y marketing: la familia IP sigue en la versión 6. Si alguien te habla de IPv8 en una entrevista, sonríe… y cuenta que los estándares los aprueba la IETF, no los hilos virales.

---

## 🏴‍☠️ Traducción de direcciones y parches de coexistencia

Cuando no es posible usar doble pila directamente por falta de direccionamiento IPv4 público, se recurre a la traducción: **CG-NAT** (*Carrier-Grade NAT* / NAT444).

Aunque técnicamente es una extensión de IPv4, es el mecanismo clave que los operadores utilizan para estirar la vida útil de IPv4 mientras despliegan IPv6.

**¿Por qué existe?** Los ISP no tienen suficientes direcciones IPv4 públicas para asignar una a cada cliente residencial o móvil.

**¿Cómo funciona?**

1. El router del usuario recibe en su interfaz WAN una dirección IP privada de operador, del rango dedicado **`100.64.0.0/10`** (RFC 6598).
2. En la central del operador, un equipo CG-NAT traduce el tráfico de miles de usuarios hacia un *pool* muy reducido de IPs públicas globales mediante **PAT**.
3. Resultado: un esquema de **triple NAT (NAT444)** — LAN del cliente (privada) → WAN del cliente (CG-NAT) → Internet (IP pública compartida).

**Consecuencias e impacto práctico:**

- **Afecta a:** la redirección de puertos (*port forwarding*), los servidores web/VPN autoalojados en casa, las consolas de videojuegos (NAT estricta / NAT Tipo 3) y las cámaras IP sin nube.
- **Identificación rápida:** si la IP WAN de tu router va del `100.64.x.x` al `100.127.x.x`, estás detrás de un CG-NAT. ¿Por qué esos números en concreto te delatan? Porque no es un rango privado de casa, sino un bloque especial reservado para operadores en 2012:

| | **IPs privadas de casa** | **IPs privadas de operador** |
|---|---|---|
| **Rango** | `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` | `100.64.0.0/10` (`100.64.0.0` – `100.127.255.255`) |
| **Estándar** | RFC 1918 | RFC 6598 (IETF, 2012) |
| **Para quién** | Redes locales de usuarios: ninguna funciona directamente en Internet | Solo la red interna del ISP |

Ese rango **nunca es enrutable en Internet pública**: se usa únicamente en la red interna del operador para conectar la interfaz WAN de tu router doméstico con los equipos de traducción del propio ISP. Por eso `100.64.x.x` en la WAN de tu router es la firma inequívoca del CG-NAT.

---

## 🧠 Mini-chequeo

1. ¿Qué registro DNS elige IPv6 en un PC dual stack? ¿Y si no existe?
2. Diferencia en una frase: túnel vs NAT64 vs CG-NAT.
3. Un cliente solo-IPv6 quiere visitar una web solo-IPv4. ¿Qué dos piezas participan y qué hace cada una?
4. Si un ISP no tiene suficientes IPs públicas IPv4, ¿qué tecnología implementa y en qué rango asigna las IPs a sus clientes?
5. ¿Qué dos líneas son imprescindibles en un router Cisco para que arranque a hablar IPv6?

<details>
<summary>🔄 Respuestas</summary>

1. El DNS primero consulta el registro **AAAA** (IPv6). Si el dominio no lo tiene, recurre a **A** (IPv4). Por eso un servicio en dual stack publica ambos registros.
2. Un **túnel encapsula** IPv6 dentro de IPv4 (el paquete interior sigue siendo IPv6); **NAT64 traduce** la cabecera entre IPv6 e IPv4; y **CG-NAT** hace un NAT IPv4-a-IPv4 masivo a nivel de operador para compartir una misma IP pública entre muchos abonados.
3. **DNS64** genera una IPv6 sintética a partir del registro A (IPv4) del servidor; **NAT64** hace la traducción real del tráfico IPv6↔IPv4 sobre el terreno. Sin DNS64, el cliente solo-IPv6 ni siquiera sabría a qué dirección enviar el paquete.
4. Aplica **CG-NAT** (*Carrier-Grade NAT* / NAT444) y asigna a los routers de los usuarios direcciones IP privadas de operador dentro del bloque **`100.64.0.0/10`** (RFC 6598).
5. `ipv6 unicast-routing` (en modo de configuración global) y `ipv6 address …/64` + `no shutdown` en la interfaz correspondiente.
</details>

---

## ✅ Resumen en 4 frases

- **Dual Stack** mantiene IPv4 e IPv6 simultáneamente en la interfaz y deja que la resolución DNS elija el camino óptimo (registro AAAA vs A).
- **CG-NAT** (*Carrier-Grade NAT*) es el parche de los operadores para exprimir las últimas direcciones IPv4, compartiendo una IP pública entre cientos de clientes mediante una red intermedia `100.64.0.0/10`.
- Los **túneles** (6to4, Teredo, GRE, ISATAP) encapsulan paquetes IPv6 dentro de IPv4 cuando el transporte aún no soporta IPv6 nativo.
- **NAT64 + DNS64** forman la pareja indispensable para que una red solo-IPv6 se conecte de forma transparente con servidores antiguos que solo disponen de IPv4.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Dual Stack | IPv4 e IPv6 a la vez; DNS decide (AAAA vs A) |
| AAAA | Registro DNS de dirección IPv6 |
| Túnel | Encapsular IPv6 dentro de IPv4 |
| 6to4 / Teredo / GRE / ISATAP | Tipos de túnel: automático, UDP/NAT, manual, LAN |
| NAT64 | Traducción IPv6→IPv4 (protocolos distintos) |
| DNS64 | Genera IPv6 sintética a partir de registros A |
| CG-NAT | NAT444 del operador: IP pública compartida vía `100.64.0.0/10` (RFC 6598) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/04-direccionamiento-ip) · **Anterior:** [11 · ICMPv6 y NDP](/ApuntesRedes/04-direccionamiento-ip/11-icmpv6-y-ndp) · **Siguiente:** [13 · Cierre](/ApuntesRedes/04-direccionamiento-ip/13-cierre)
