---
title: 05 — DHCPv6
description: Stateless vs stateful y cómo leer los flags M y O de un Router Advertisement 📋
---

<p><small>Stateless vs stateful y cómo leer los flags M y O de un Router Advertisement 📋</small></p>

> 🗺️ **Estás en:** 🚀 **U05 · IPv6 y transición** → 05 · DHCPv6

---

## 📬 La idea en una frase

> **DHCPv6** es el DHCP de la era IPv6, pero con un giro: puede funcionar en modo **stateless** (solo da el "extra": DNS y demás, mientras SLAAC da la IP) o **stateful** (da IP + todo lo demás). El router decide pinchando los **flags M y O** de sus mensajes Router Advertisement.

Del [punto 4](/ApuntesRedes/05-ipv6-transicion/04-eui64-y-slaac) ya sabes que SLAAC puede dejar a un equipo *sin DNS*. Aquí está el complemento: DHCPv6.

---

## 🤝 SLAAC y DHCPv6: no son enemigos

Es el error más común en IPv6: creer que elegir SLAAC *o* DHCPv6. La realidad:

- **SLAAC** es *stateless*: el router anuncia el prefijo y cada equipo se fabrica la IP. No audita nada, no asigna DNS (salvo RDNSS).
- **DHCPv6** puede aportar lo que falta: DNS, dominio, NTP, etc. (stateless), o entregarlo todo él (stateful).

La IETF diseñó DHCPv6 para **complementar** a SLAAC. Las combinaciones corresponden a los flags del RA:

---

## 📊 Stateless vs Stateful

| | **Stateless DHCPv6** | **Stateful DHCPv6** |
|---|---|---|
| Quién da la **IP** | **SLAAC** (RA + EUI-64) | **DHCPv6 server** |
| Quién da **DNS/parámetros** | DHCPv6 server | DHCPv6 server |
| Flags del RA | **M=0, O=1** | **M=1** (O irrelevante) |
| Control central de IPs | Ninguno (cada uno la suya) | Total (el servidor decide) |
| Analogía IPv4 | DHCP sin asignar IP (solo DNS) | DHCP clásico (todo) |
| Ideal para | Redes grandes o Wifi: plug-and-play + DNS | Entornos auditados, empresas, control |

---

## 🚩 Los flags M y O en el Router Advertisement

El router anuncia en el RA cómo deben configurarse los hosts. Dos bits:

- **M Flag (Managed):** si es `1`, "aquí hay DHCPv6 stateful: pedidme IP, DNS y todo". SLAAC se queda para la dirección Link-Local.
- **O Flag (Other):** si es `1` (con M=0), "SLAAC os da la IP, pero pedid al servidor DHCPv6 el resto de parámetros (DNS, dominio…)".

```
RA del router:
  Prefix: 2001:DB8:1:2::/64
  M Flag: 0  →  NO hay DHCPv6 stateful (SLAAC da la IP)
  O Flag: 1  →  SÍ hay DHCPv6 stateless (pedid DNS por DHCPv6)
```

**Combinaciones válidas:**

| M | O | Qué hace el host |
|---|---|---|
| 0 | 0 | SLAAC puro: IP por RA. Sin DNS formal (puede usar RDNSS del RA). |
| 0 | 1 | **Stateless:** SLAAC da la IP, DHCPv6 da DNS y extras. *El combo más común.* |
| 1 | * | **Stateful:** DHCPv6 lo da todo (IP incluida). SLAAC solo para LLA. |

> 💡 **Regla de CONRAD:** "M de *Managed*: todo lo manda el servidor. O de *Other*: lo *otro* lo da el servidor." Si el RA va "mudo" (M=0, O=0), espera RDNSS o no habrá nombres.

---

## 🧭 ¿Cuándo usar cada modo?

**Stateful (M=1):**
- Cuando necesitas **auditoría y control central**: quieres saber qué IP tiene cada alumno/empleado en todo momento.
- Redes corporativas, institutos, hoteles con login por portal.
- Huéspedes o BYOD donde quieres microsegmentación y trazabilidad.

**Stateless (O=1):**
- El caso más habitual hoy: quieres **plug-and-play** (SLAAC) pero con **DNS** sin configurar a mano.
- Redes grandes de domicilios, campus con muchos dispositivos efímeros (móviles).
- Menos tráfico y menos carga en el servidor DHCPv6.

**Ninguno (M=0, O=0):** laboratorios y redes con configuración 100% estática, o donde el RA ya trae RDNSS.

> ⚠️ **Ojo con el "IP + nombre":** los hosts modernos, además de DHCPv6, aceptan **RDNSS** (DNS anunciado dentro del propio RA). Por eso a veces hay DNS *sin* que se levante un servidor DHCPv6. No te líes: DHCPv6 sigue siendo lo estándar cuando quieres entregar más parámetros (dominio, NTP, SIP…).

---

## 🧠 Mini-chequeo

1. Dado un RA con `M Flag: 0` y `O Flag: 1`, ¿quién da la IP y quién el DNS?
2. ¿Qué flag activarías si necesitas control total de qué dirección tiene cada equipo?
3. ¿Puede un cliente IPv6 tener dirección por SLAAC y DNS por DHCPv6 al mismo tiempo?

<details>
<summary>🔄 Respuestas</summary>

1. La **IP la da SLAAC** (M=0: no hay DHCPv6 stateful). El **DNS y parámetros los da DHCPv6** en stateless (O=1). Es la combinación 0/1, la más habitual.
2. **M Flag = 1** (*Managed*): DHCPv6 stateful, el servidor decide IP + DNS + resto. Es lo más parecido al DHCP clásico de IPv4.
3. **Sí, exactamente.** Eso ES el modo stateless (M=0, O=1): SLAAC para el prefijo+IID y DHCPv6 para los parámetros. Es el escenario recomendado de facto en redes modernas.
</details>

---

## ✅ Resumen en 3 frases

- **DHCPv6** complementa a SLAAC: en **stateless** solo da DNS/parámetros; en **stateful** da IP y todo.
- Los **flags M y O del RA** deciden el modo: M=1 → stateful; O=1 (con M=0) → stateless; 0/0 → SLAAC puro.
- **Stateful** para control y auditoría; **stateless** para plug-and-play con DNS, el combo más usado hoy.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| DHCPv6 | Servidor DHCP para IPv6, con modos stateless y stateful |
| Stateless | No asigna IP (lo hace SLAAC); da DNS/parámetros |
| Stateful | Asigna IP + DNS + parámetros centralizadamente |
| M Flag | Managed: 1 → DHCPv6 stateful obligatorio |
| O Flag | Other: 1 (con M=0) → DHCPv6 stateless para el resto |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/05-ipv6-transicion) · **Anterior:** [04 · EUI-64 y SLAAC](/ApuntesRedes/05-ipv6-transicion/04-eui64-y-slaac) · **Siguiente:** [06 · ICMPv6 y NDP](/ApuntesRedes/05-ipv6-transicion/06-icmpv6-y-ndp)