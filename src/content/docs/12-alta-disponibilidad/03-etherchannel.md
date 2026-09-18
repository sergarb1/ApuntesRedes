---
title: 03 — EtherChannel
description: Varios cables, un solo enlace gigante ⚡
---

<p><small>Varios cables, un solo enlace gigante ⚡</small></p>

> 🗺️ **Estás en:** 🔁 **UD12 · Alta disponibilidad y redundancia** → 03 · EtherChannel

---

## 📬 La idea en una frase

> **EtherChannel** agrupa varios enlaces físicos en un solo enlace lógico: gana ancho de banda sumando, sobrevive a la caída de un cable sin perder ni un ping (el tráfico se reparte entre los miembros vivos) y, bonus, STP lo trata como un único enlace que ni siquiera piensa en bloquear.

---

## 🤔 ¿Por qué no basta con "poner más cables"?

Poner dos cables sin más entre dos switches crea un **bucle**: STP bloquearía uno y solo usarías la mitad de lo pagado. EtherChannel resuelve el dilema:

- STP ve **un** enlace lógico: no bloquea nada.
- El tráfico se **reparte** entre los cables activos (hash por MAC/IP/puerto).
- Si un cable muere, el tráfico de ese cable se redistribuye entre los vivos **en milisegundos** (sin reconvergencia STP).

```
Sin EtherChannel:                Con EtherChannel (Po1):
  SW1 ══════ SW2  (activo)        SW1 ══════ SW2  ┐
  SW1 ────── SW2  (bloqueado)     SW1 ══════ SW2  ├─ 2 Gbps lógicos
                                  SW1 ══════ SW2  ┘  y a prueba de cables
```

---

## 🤝 Los protocolos de negociación

| Modo | Protocolo | Qué hace |
|---|---|---|
| `on` | Ninguno | Fuerza el canal a lo bruto (sin negociación) |
| `active` / `passive` | **LACP** (802.3ad, estándar) | Inicia la negociación / solo responde |
| `desirable` / `auto` | **PAgP** (Cisco, propietario) | Inicia / solo responde |

Reglas prácticas: usa **LACP** (estándar, funciona con otros fabricantes); `active` en un extremo y `active` (o `passive`) en el otro. Con `on` a ambos lados solo puedes usarlo si estás 100 % seguro de los dos extremos, y sin protección contra configuraciones incoherentes.

```
SW-1(config)# interface range gigabitEthernet 0/1-2
SW-1(config-if-range)# channel-group 1 mode active
SW-1(config)# interface port-channel 1
SW-1(config-if)# switchport mode trunk
SW-1(config-if)# switchport trunk allowed vlan 10,20,99
```

> ⚠️ **La coherencia es sagrada:** los miembros de un canal deben tener igual velocidad, dúplex, VLANs nativas y modo de acceso/trunk. Si algo difiere, el canal se descompone (con LACP verás el puerto en estado "suspended" o el Po en "I": individual). Diagnóstico: `show etherchannel summary`.

---

## ⚖️ Balanceo: el hash no divide, reparte

Un EtherChannel **no** convierte 2×1 Gbps en un flujo de 2 Gbps: un único flujo de datos (una conversación TCP) viajará siempre por un solo cable. Lo que se reparte es el **conjunto de flujos**:

```
SW-1(config)# port-channel load-balance src-dst-ip
```

| Método | Qué mira | Cuándo conviene |
|---|---|---|
| `src-mac` / `dst-mac` | MACs | Tráfico entre muchos equipos variados |
| `src-dst-ip` | IPs origen+destino | El clásico entre switches/routers |
| `src-dst-port` | IPs + puertos TCP/UDP | Un servidor que recibe de muchos clientes |

El fallo típico: dos switches que se hablan con una única conversación brutal (por ejemplo, replicación entre dos servidores) y un canal de 4 cables: el hash manda todo por uno y "el canal no funciona". No es que no funcione: es que **un flujo no se trocea**. La solución es repartir flujos (varias sesiones, LACP por IP/puerto) o aceptar que el canal da redundancia, no velocidad a ese flujo.

---

## 🔍 Verificación

| Comando | Qué te cuenta |
|---|---|
| `show etherchannel summary` | Grupo, protocolo y estado de cada miembro (SU = en uso, P = activo en el canal) |
| `show etherchannel load-balance` | Método de hash configurado |
| `show interfaces port-channel 1` | El "enlace gigante" y sus contadores |
| `show spanning-tree` | El Po como un único enlace (sin puertos bloqueados) |

Salida saludable de `show etherchannel summary`:

```
Group  Port-channel  Protocol    Ports
------+-------------+-----------+----------------------------
1      Po1(SU)         LACP      Gi0/1(P)  Gi0/2(P)
```

`SU` + todos los miembros con `P`: canal lógico activo. Si ves `I` (individual) o `D` (down), revisa coherencia de configuración y negociación.

---

## 🤬 CONRAD VS EL MUNDO: "Duplicamos el cable y el canal sigue a 1 Gbps"

**Administrador:** — He añadido un segundo cable al EtherChannel. Sigue yendo igual de lento. ¿A que tu EtherChannel es una estafa?

**CONRAD:** — ¿Y qué esperabas, que tu única copia de seguridad se descargara al doble? El canal reparte **conversaciones**, no trocea una. Si solo tienes una conversación, un cable. El otro, de estética. La velocidad extra la notarás cuando haya veinte usuarios con veinte flujos.

**CONRAD:** — Y de propina: ¿comprobaste que el segundo cable negoció bien? ¿O lo enchufaste y confías? `show etherchannel summary` existe por algo: si el puerto no está en P, es decoración.

**La lección:** EtherChannel da **ancho de banda agregado entre flujos** y **tolerancia a fallos por cable**, no velocidad a un solo flujo. Y se verifica: `summary` en verde o no ha pasado nada.

---

## 🧠 Mini-chequeo

1. ¿Por qué STP bloquearía dos cables sueltos entre dos switches y no bloquea un EtherChannel de dos cables?
2. ¿Diferencia entre LACP y PAgP? ¿Qué modos combinables existen en LACP?
3. Un canal de 4×1 Gbps transporta una única sesión de 900 Mbps. ¿Qué velocidad tendrá esa sesión y por qué?
4. ¿Qué ves en `show etherchannel summary` cuando todo está bien, y qué significa cada letra?

<details>
<summary>🔄 Respuestas</summary>

1. Dos cables sueltos = dos caminos = **bucle**; STP bloquea uno. El EtherChannel es **un solo enlace lógico** para STP: no hay bucle y no bloquea.
2. **LACP** es el estándar IEEE (802.3ad/802.1AX), **PAgP** es propietario de Cisco. En LACP: `active` inicia la negociación, `passive` solo responde; combinaciones válidas: active-active y active-passive.
3. Máximo **1 Gbps**: un flujo individual va por un único cable físico (hash). El canal suma para el conjunto de flujos y da tolerancia a fallos, no "trocea" conversaciones.
4. `Po1(SU)` con miembros `(P)`: canal **S**tanding/usable (en uso) con miembros activos en el canal. `I` = individual (fuera del canal), `D` = down.
</details>

---

## ✅ Resumen en 3 frases

- EtherChannel convierte N cables en **un enlace lógico**: STP no bloquea, el hash reparte flujos y los fallos de cable se diluyen en milisegundos.
- Usa **LACP** (`active`/`passive`) y exige coherencia total entre miembros.
- Verifica con `show etherchannel summary`: `SU` + `P` en todos o no ha pasado nada.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Port-channel | El enlace lógico agrupado |
| LACP / PAgP | Protocolos de negociación (estándar / Cisco) |
| Hash de balanceo | Cómo se reparten los flujos entre cables |
| SU / P | Estados de canal y miembros sanos |
| Member | Cada cable físico del grupo |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-alta-disponibilidad) · **Anterior:** [02 · STP: redundancia sin bucles](/ApuntesRedes/12-alta-disponibilidad/02-stp-redundancia) · **Siguiente:** [04 · Stacking y chassis virtuales](/ApuntesRedes/12-alta-disponibilidad/04-stacking)
