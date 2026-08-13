---
title: 07 — Configuración OSPF
description: Configuración básica y multiárea paso a paso 🛠️
---

<p><small>Configuración básica y multiárea paso a paso 🛠️</small></p>

> 🗺️ **Estás en:** 🗣️ **U09 · Routing dinámico OSPF** → 07 · Configuración OSPF

---

## 📬 La idea en una frase

> Configurar OSPF es declarar las redes en el proceso con `network <red> <wildcard> area <área>`: con eso, OSPF descubre vecinos, intercambia LSAs y llena las tablas de rutas solo.

Ya tienes la teoría (LSA, SPF, áreas, coste). Ahora toca el teclado: la configuración mínima, el multiárea con ABR, y los primeros comandos de verificación. La ruta por defecto y el diagnóstico en profundidad quedan para el [punto 8](/ApuntesRedes/09-routing-dinamico/08-ruta-por-defecto-y-diagnostico).

---

## ⚙️ Configuración mínima

```bash
R1(config)# router ospf 1
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 192.168.1.0 0.0.0.255 area 0
R1(config-router)# network 10.0.0.0 0.0.0.3 area 0
```

Tres piezas que debes entender bien:

- **`router ospf 1`**: arranca el proceso OSPF con **process ID** local (el `1` no tiene que coincidir entre routers; es como el nombre del proceso en ese equipo).
- **`router-id 1.1.1.1`**: fija el Router ID a mano (recuerda el [punto 3](/ApuntesRedes/09-routing-dinamico/03-conceptos-ospf): único y estable). Se recomienda configurarlo siempre.
- **`network ... wildcard ... area ...`**: la red se declara con **wildcard** (máscara invertida: `0.0.0.255` = /24) y su **área**. OSPF activará OSPF en las interfaces que caigan dentro de esa red.

> ⚠️ **Cuidado con la wildcard:** es la máscara *invertida*, no la normal. `255.255.255.0` es una máscara, pero en OSPF se escribe `0.0.0.255`. Confundirlas es el clásico "no levanta vecindad".

---

## 🏗️ Configuración multiárea

Cuando hay más de un área, el router que las toca se convierte en **ABR** (revisa el [punto 4](/ApuntesRedes/09-routing-dinamico/04-areas-y-tipos-de-routers)) simplemente declarando redes en áreas distintas:

```
R1 (Área 0) ──── R2 (ABR) ──── R3 (Área 1)
   │                             │
 LAN1 (192.168.1.0/24)       LAN3 (192.168.3.0/24)
 LAN2 (192.168.2.0/24)
```

```bash
R1(config)# router ospf 1
R1(config-router)# network 192.168.1.0 0.0.0.255 area 0      # Backbone
R1(config-router)# network 10.0.0.0 0.0.0.3 area 0            # Backbone

R2(config)# router ospf 1
R2(config-router)# network 10.0.0.0 0.0.0.3 area 0            # Backbone
R2(config-router)# network 10.0.1.0 0.0.0.3 area 1            # Área 1
```

**R2 es ABR** porque tiene interfaces en el Área 0 y en el Área 1. R1 y R3 son internos a sus áreas. La regla del [punto 4](/ApuntesRedes/09-routing-dinamico/04-areas-y-tipos-de-routers) sigue vigente: el Área 1 solo se comunica con el resto a través del Área 0.

---

## 🔍 Verificación inicial

Tras configurar, comprueba que OSPF está vivo:

```bash
R1# show ip protocols                → procesos activos, Router ID, redes declaradas
R1# show ip ospf neighbor            → vecinos y estado (FULL = adyacencia completa)
R1# show ip route ospf               → rutas aprendidas por OSPF (prefijo O)
R1# show ip ospf interface           → coste, timers y estado por interfaz
```

```
R1# show ip ospf neighbor

Neighbor ID     Pri   State           Dead Time   Address         Interface
2.2.2.2         1     FULL/DR         00:00:35    10.0.0.2        GigabitEthernet0/0
```

- **FULL** = adyacencia completa, intercambian LSAs.
- **2WAY** = se ven pero no sincronizan (normal entre DROTHERs, [punto 5](/ApuntesRedes/09-routing-dinamico/05-dr-y-bdr)).
- **DR/BDR/DROTHER** = el rol de ese vecino en el segmento.

> 💡 **Regla práctica:** si `show ip ospf neighbor` está vacío, aún no hay vecindad: vuelve a los fundamentos (ping, área, wildcard, timers, ACL). La guía completa de diagnóstico está en el [punto 8](/ApuntesRedes/09-routing-dinamico/08-ruta-por-defecto-y-diagnostico).

---

## 🧠 Mini-chequeo

1. ¿Por qué el process ID no tiene que coincidir entre routers?
2. ¿Cuál es la wildcard de una máscara /24?
3. Tras configurar OSPF en dos routers, ¿qué estado esperas ver en `show ip ospf neighbor` si todo va bien?

<details>
<summary>🔄 Respuestas</summary>

1. Porque el **process ID es local** al router: identifica el proceso OSPF en ese equipo, no un "grupo" entre routers. Lo que debe coincidir es el área, la wildcard y los timers.
2. **0.0.0.255** — la wildcard es la máscara invertida.
3. **FULL** (en un enlace correcto): los vecinos aparecen con estado FULL y el rol del segmento (DR/BDR/DROTHER).
</details>

---

## ✅ Resumen en 3 frases

- La configuración mínima es `router ospf <id>`, un `router-id` y las `network <red> <wildcard> area <área>` de cada red.
- En multiárea, el router que declara redes en el Área 0 y en otra área se convierte en **ABR** automáticamente.
- Verifica con `show ip protocols`, `show ip ospf neighbor` (FULL = ok) y `show ip route ospf`.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Process ID | Número del proceso OSPF (local al router) |
| Wildcard | Máscara invertida para `network` (0.0.0.255 = /24) |
| ABR | Router con interfaces en Área 0 y otra área |
| show ip ospf neighbor | Comando para ver vecinos y estados de adyacencia |
| Estado FULL | Adyacencia completa con intercambio de LSAs |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/09-routing-dinamico) · **Anterior:** [06 · El coste OSPF](/ApuntesRedes/09-routing-dinamico/06-coste-ospf) · **Siguiente:** [08 · Ruta por defecto y diagnóstico](/ApuntesRedes/09-routing-dinamico/08-ruta-por-defecto-y-diagnostico)