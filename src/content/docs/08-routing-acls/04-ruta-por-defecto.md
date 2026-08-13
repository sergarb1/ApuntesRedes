---
title: 04 — Ruta por defecto
description: La salida de emergencia 0.0.0.0/0 y las rutas flotantes de respaldo 🚪
---

<p><small>La salida de emergencia 0.0.0.0/0 y las rutas flotantes de respaldo 🚪</small></p>

> 🗺️ **Estás en:** 🧭 **U08 · Routing y ACLs** → 04 · Ruta por defecto

---

## 📬 La idea en una frase

> La **ruta por defecto** (0.0.0.0/0) es el "si no sabes por dónde ir, sal por aquí": atrapa todo el tráfico que no tiene una ruta más específica y es la puerta de salida típica hacia Internet o hacia el router de cabecera.

En el punto 3 aprendiste a enseñar caminos concretos. Pero pensar que vas a poner una ruta para cada red del planeta es de mente preindustrial. La red tiene el truco universal de los cartógrafos: el callejón que apunta al "resto del mundo".

---

## 🧭 Qué es 0.0.0.0/0, el callejón universal

Una ruta con destino `0.0.0.0` y máscara `0.0.0.0` significa **"cualquier red"**. Es el paquete comodín de las rutas: si el tráfico no coincide con ninguna ruta más específica, cae aquí.

```bash
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2
```

En la tabla de rutas aparece como `S*` (la estrella marca el camino por defecto):

```bash
S*   0.0.0.0/0 [1/0] via 10.0.0.2
```

¿Cuándo se usa? **Siempre que tengas un único punto de salida**: la típica red de oficina que sale por su router de borde, o el router de cada sucursal que canjea el tráfico a su router central. Es literalmente "el último recurso" o "el callejón de salida".

| Sin ruta por defecto | Con ruta por defecto |
|---|---|
| El tráfico a lo desconocido **se descarta** (Destination Net Unreachable) | Todo lo desconocido **sale por la puerta** que defines |
| Tienes que conocer y listar cada red | Basta una línea para el universo |

> ⚠️ **CONRAD:** "Sin ruta por defecto, tu router a Internet es un portero que no deja entrar a nadie que no esté en su libreta. Con la por defecto, el portero deja pasar a todo lo que no tiene invitación específica. Elige según lo que quieras: control total (muchas estáticas) o simplicidad (default)."

---

## 🪸 Ruta flotante: el plan B con distancia administrativa

¿Y si la línea principal cae? Ahí entra la **ruta flotante** (*floating static route*): dos rutas hacia el mismo destino, una con distancia administrativa menor que la otra. La de AD baja es la primaria; la de AD alta es el salvavidas que solo aparece cuando la primera desaparece.

```bash
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2        # AD=1 (primaria, la que manda)
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.1.2 5      # AD=5 (respaldo, en remojo)
```

La **distancia administrativa (AD)** es la nota de confianza que le da el router a cada tipo de ruta: cuánto menor, más fiable y preferida.

| Fuente de ruta | AD por defecto |
|---|---|
| Conectada | 0 |
| Estática | 1 |
| EIGRP (resumen) | 5 |
| OSPF | 110 |
| RIP | 120 |

Las dos rutas por defecto apuntan al mismo destino, pero solo la de AD=1 se instala en la tabla. La de AD=5 se queda "en la reserva".

---

## 🕒 ¿Cuándo se activa el respaldo?

La lógica es simple y elegante: **el respaldo se instala cuando la primaria pierde su siguiente salto**.

- Mientras `10.0.0.2` sea alcanzable, la tabla muestra la ruta con AD=1 (`via 10.0.0.2`).
- Si el enlace que lleva a `10.0.0.2` cae (o ese router deja de responder), **esa ruta desaparece de la tabla** y, como ahora solo queda la de AD=5, **se instala el respaldo** (`via 10.0.1.2`).
- Cuando el enlace principal vuelve, la ruta AD=1 reaparece y vuelve a mandar.

La comprobación no puede ser más directa:

```bash
R1# show ip route 0.0.0.0        → Ver qué ruta por defecto está activa ahora
R1# show ip route static         → Ver ambas, marcadas como candidate
```

> 💡 **Truco de laboratorio:** si quieres forzar que el respaldo se active para probarlo, apaga la interfaz del enlace primario (`shutdown`) y observa cómo la tabla cambia de vecino. Luego vuelve a encender.

---

## 🧠 Mini-chequeo

1. ¿Qué significa el `*` en `S* 0.0.0.0/0 [1/0] via 10.0.0.2`?
2. Escribe la ruta flotante de respaldo hacia 10.0.1.2 con AD 5 para que respalde a la ruta por defecto primaria.
3. Con dos rutas por defecto (AD=1 y AD=5), ¿qué aparece en la tabla mientras ambas funcionan?

<details>
<summary>🔄 Respuestas</summary>

1. La **estrella** indica que es el *candidate default route*: el camino por defecto activo al que irá todo lo que no tenga ruta específica.
2. `ip route 0.0.0.0 0.0.0.0 10.0.1.2 5`.
3. Solo la de **AD=1** (via 10.0.0.2). La de AD=5 queda instalada "en frío" hasta que la primaria pierda su siguiente salto, momento en el que se activa.
</details>

---

## ✅ Resumen en 3 frases

- `ip route 0.0.0.0 0.0.0.0 <salida>` es la puerta del mundo: atrapa todo lo que no tenga camino más específico.
- Es el estándar para redes con un único punto de salida hacia Internet o hacia el router central.
- La **ruta flotante** (misma ruta con AD mayor) es el plan B automático: solo se activa cuando la primaria desaparece del mapa.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Ruta por defecto | 0.0.0.0/0, camino de último recurso |
| Ruta flotante | Respaldo con AD mayor que se activa si falla la primaria |
| AD (distancia administrativa) | Nota de fiabilidad de la fuente de ruta (1 estática, 110 OSPF) |
| Candidate default | La ruta por defecto activa, marcada con `*` |
| Gateway de último recurso | El siguiente salto al que va todo lo desconocido |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/08-routing-acls) · **Anterior:** [03 · Rutas estáticas](/ApuntesRedes/08-routing-acls/03-rutas-estaticas) · **Siguiente:** [05 · Cómo decide un router](/ApuntesRedes/08-routing-acls/05-como-decide-el-router)