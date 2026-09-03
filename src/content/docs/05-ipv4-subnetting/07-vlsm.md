---
title: 07 — VLSM
description: Subredes a la medida de cada departamento, sin desperdiciar ni una IP 🎯
---

<p><small>Subredes a la medida de cada departamento, sin desperdiciar ni una IP 🎯</small></p>

> 🗺️ **Estás en:** 🧮 **U05 · IPv4 y subnetting** → 07 · VLSM

---

## 📬 La idea en una frase

> **VLSM** (*Variable Length Subnet Mask*) usa **máscaras de longitud variable** para dar a cada subred exactamente el tamaño que necesita, ordenando de mayor a menor y sin saltarse bloques.

El subnetting clásico corta todo con la misma tijera: 4 subredes de 62 hosts aunque una solo necesite 5. VLSM usa tijeras distintas: el departamento grande recibe un /25, y el pequeño un /29. El resultado: cero desperdicio y la red aguanta mucho más.

---

## 🎯 La regla de oro del VLSM

Hay dos reglas que nunca se rompen:

1. **Ordenar de mayor a menor necesidad.** Primero el que pide más hosts, al final el que menos.
2. **Empezar donde acaba el anterior.** Cada subred arranca justo en la dirección que quedó libre tras la anterior; no puedes saltarte bloques ni reordenar luego.

Recuerda la fórmula de hosts de cada máscara (la tienes en el [punto 5](/ApuntesRedes/05-ipv4-subnetting/05-mascaras-y-cidr)): `/25`=126, `/26`=62, `/27`=30, `/28`=14, `/29`=6, `/30`=2. Siempre se elige la máscara en la que **2ʰ − 2 ≥ hosts pedidos** con el menor desperdicio.

---

## 🧮 Ejemplo resuelto: 192.168.1.0/24

**Escenario real:** necesitas dividir la red según estos departamentos:

| Departamento | Hosts necesarios |
|---|---|
| Ventas | 100 |
| RRHH | 30 |
| IT | 20 |
| Dirección | 5 |

Con subnetting clásico (máscara fija), todas las subredes tendrían el mismo tamaño y desperdiciarías muchísimo. Con **VLSM**, cada una tiene el tamaño justo.

**Paso 1:** Ordenar de mayor a menor necesidad

```
Ventas (100) → RRHH (30) → IT (20) → Dirección (5)
```

**Paso 2:** Calcular cada subred, una detrás de la anterior.

### Ventas (100 hosts)

- Necesitas `2ʰ − 2 ≥ 100` → h = 7 (2⁷ − 2 = 126)
- Máscara: **/25** (255.255.255.128)
- Red: 192.168.1.0/25
- Hosts: 192.168.1.1 - 192.168.1.126 · Broadcast: 192.168.1.127

### RRHH (30 hosts)

- Necesitas h = 5 (2⁵ − 2 = 30)
- Máscara: **/27** (255.255.255.224)
- Red: 192.168.1.128/27
- Hosts: 192.168.1.129 - 192.168.1.158 · Broadcast: 192.168.1.159

### IT (20 hosts)

- Necesitas h = 5 (2⁵ − 2 = 30 → 20 caben en 30)
- Máscara: **/27** (255.255.255.224)
- Red: 192.168.1.160/27
- Hosts: 192.168.1.161 - 192.168.1.190 · Broadcast: 192.168.1.191

### Dirección (5 hosts)

- Necesitas `2ʰ − 2 ≥ 5` → h = 3 (2³ − 2 = 6)
- Máscara: **/29** (255.255.255.248)
- Red: 192.168.1.192/29
- Hosts: 192.168.1.193 - 192.168.1.198 · Broadcast: 192.168.1.199

**Paso 3:** Resumen VLSM

| Departamento | Red | Máscara | Rango | Broadcast |
|---|---|---|---|---|
| Ventas | 192.168.1.0 | /25 | .1 - .126 | .127 |
| RRHH | 192.168.1.128 | /27 | .129 - .158 | .159 |
| IT | 192.168.1.160 | /27 | .161 - .190 | .191 |
| Dirección | 192.168.1.192 | /29 | .193 - .198 | .199 |
| *Libre* | 192.168.1.200 | /29 | .201 - .206 | .207 |

> 💡 **Comprueba el encadenado:** Ventas acaba en `.127`. RRHH arranca en `.128`. RRHH acaba en `.159`; IT arranca en `.160`. IT acaba en `.191`; Dirección en `.192`. Y de `.200` hacia arriba queda bloque **libre** para el futuro. Ese "encadenado" es la firma de un VLSM bien hecho.

---

## 🤔 ¿Cuándo usas VLSM y cuándo subnetting clásico?

| Situación | Usa |
|---|---|
| Todos los departamentos necesitan el mismo tamaño | Subnetting clásico (más simple) |
| Los tamaños son muy distintos (50, 5, 300…) | **VLSM** |
| Enlaces entre routers (2 IPs por lado) | **/30** siempre, típico de VLSM |
| Examen que da "hosts por subred" distintos | **VLSM** sin dudar |

> ⚠️ **Trampa común:** intentar hacer VLSM sin ordenar de mayor a menor. Si asignas primero el pequeño, luego el grande ya no cabe de corrido y la red se rompe ella sola. **Orden = ley.**

---

## 🧠 Mini-chequeo

1. ¿Cuántas subredes /27 salen de una /24 original? ¿Con qué incremento?
2. Tienes 192.168.1.0/24 para dos departamentos: 40 y 20 hosts. ¿Qué máscaras usas y qué redes les tocan?
3. ¿Por qué es un error dar un /26 a un departamento que solo necesita 5 hosts?

<details>
<summary>🔄 Respuestas</summary>

1. n = 27 − 24 = 3 bits prestados → 2³ = **8 subredes**. Incremento: 2⁵ = **32** en el último octeto. Redes: .0, .32, .64, .96, .128, .160, .192, .224.
2. Ordenando: 40 hosts → /26 (62): **192.168.1.0/26**. 20 hosts → /27 (30): **192.168.1.64/27** (empieza donde acaba la anterior, tras .63).
3. Desperdicias 57 IPs útililes de golpe (62 − 5): un /29 (6 hosts) es justo lo que necesita. VLSM existe precisamente para evitar ese derroche.
</details>

---

## ✅ Resumen en 3 frases

- VLSM da a cada subred **la máscara justa**: la más pequeña donde `2ʰ − 2` le alcanza.
- Se ordena de **mayor a menor** necesidad y cada subred **encadena** justo donde acaba la anterior.
- En redes con tamaños desiguales, VLSM ahorra IPs y retrasa el agotamiento del bloque.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| VLSM | Máscaras de longitud variable dentro de una misma red |
| 2ʰ − 2 ≥ hosts | Regla para elegir la máscara mínima de una subred |
| Encadenado | Cada subred empieza donde terminó la anterior |
| /30 | Subred solo para 2 hosts (enlaces punto a punto) |
| Bloque libre | Espacio sobrante para futuras ampliaciones |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/05-ipv4-subnetting) · **Anterior:** [06 · Subnetting paso a paso](/ApuntesRedes/05-ipv4-subnetting/06-subnetting-paso-a-paso) · **Siguiente:** [08 · DHCP](/ApuntesRedes/05-ipv4-subnetting/08-dhcp)