---
title: 01 — De estático a dinámico
description: Por qué el routing estático no escala y qué ganas con lo dinámico 🧭
---

<p><small>Por qué el routing estático no escala y qué ganas con lo dinámico 🧭</small></p>

> 🗺️ **Estás en:** 🗣️ **U09 · Routing dinámico OSPF** → 01 · De estático a dinámico

---

## 📬 La idea en una frase

> El **routing estático** funciona porque un administrador escribe cada ruta a mano; el **routing dinámico** funciona porque los propios routers intercambian información y construyen sus tablas solos, sin intervención humana.

En la [U08 · Routing y ACLs](/ApuntesRedes/08-routing-acls) escribiste rutas con `ip route` una a una. Funcionan, pero imagina que la empresa crece: 50 routers, 200 redes, y cada vez que cae un enlace tienes que saltar a la consola a corregir rutas. Ese es el problema que resuelve este punto.

---

## ⚖️ Estático vs dinámico: el duelo

| Aspecto | Estático | Dinámico |
|---|---|---|
| Quién escribe la ruta | El administrador, a mano | El propio router, por sí solo |
| Conocimiento de la red | Solo lo que tú declares | La topología completa |
| Reacción a caídas | Ninguna (hasta que intervienes) | Automática y en segundos |
| Escalabilidad | Redes pequeñas (2-5 routers) | Redes grandes (decenas o miles) |
| Seguridad | Muy predecible (tú mandas) | Menos predecible (el protocolo decide) |
| Consumo de recursos | Cero | CPU, memoria y ancho de banda (poco) |
| Error humano | Alto (rutas mal escritas) | Bajo (la red se autoaprende) |

**Analogía del GPS:** una ruta estática es como marcar en un mapa la ruta a mano y pegarla en el salpicadero: si cortan una carretera, sigues yendo a la calle cortada. El routing dinámico es el GPS en modo "recalcular": detecta el atasco y te reencamina al momento. Precisamente esa "recalculación" automática se llama **convergencia**, y la estudiarás con la comparativa del [punto 2](/ApuntesRedes/09-routing-dinamico/02-igp-vs-egp).

---

## 💪 Tres ventajas del routing dinámico

1. **Autoaprendizaje:** cuando añades una red nueva, los routers se lo cuentan unos a otros. No tienes que ir router por router escribiendo `ip route`.
2. **Convergencia automática:** si cae un enlace, los routers lo detectan y recalculan. Los paquetes dejan de perderse en minutos o segundos, en lugar de seguir chocando contra un enlace muerto.
3. **Menos error humano:** una tabla de 200 rutas escrita a mano es una fábrica de erratas: una IP mal tecleada y toda la red se entera. El protocolo se encarga del cálculo y de mantenerlo coherente.

> ⚠️ **Pero no todo es gratis.** El routing dinámico consume CPU y memoria en los routers, genera tráfico de protocolo, y añade complejidad de configuración y diagnóstico. Por eso el estático sigue vivo en redes pequeñas, en enlaces stub y como "ruta de emergencia" (`floating static`). No es que el estático sea malo: es que tiene un tamaño justo.

---

## 📈 El punto de inflexión: cuándo cambias

No hay una regla mágica, pero la cuenta de mantenimiento lo deja claro. Con `n` routers y `r` rutas que declarar:

```
Estático:  n × r líneas "ip route" escritas a mano + revisarlas en cada cambio
Dinámico:  1 configuración por router (pocas líneas) + la red se actualiza sola
```

| Red | Routers | Estático | Dinámico |
|---|---|---|---|
| Casa / oficina pequeña | 1-2 | ✔ Ideal (cero líneas de sobra) | Innecesario |
| Instituto / PYME | 3-10 | Sufrible, pero cada cambio es faena | ✔ Empieza a merecer la pena |
| Empresa media | 10-50 | ❌ Imposible de mantener | ✔ Imprescindible |
| Operador / ISP | cientos | ❌ Inviable | ✔ OSPF + BGP |

**Tu primer "salto" suele llegar con la segunda oficina o el segundo edificio:** en cuanto hay dos caminos alternativos hacia la misma red, el dinámico deja de ser comodidad y se convierte en supervivencia. Si un enlace cae, el estático no sabe que existe el otro.

---

## 🛠️ El estático también tiene trucos

Que el dinámico mande no significa que el estático se jubile. Dos usos que se ven en producción todos los días:

- **Ruta de respaldo (`floating static`):** la ruta principal la aprende el protocolo dinámico (p. ej. OSPF, AD 110); el respaldo es una estática con *administrative distance* más alta, que solo se activa si la dinámica desaparece:
  ```bash
  ; Ruta principal: 0.0.0.0/0 aprendida por OSPF (AD 110, ver [punto 8](/ApuntesRedes/09-routing-dinamico/08-ruta-por-defecto-y-diagnostico))
  R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.254 150      ; respaldo estático, AD 150 > 110
  ```
  Mientras el enlace principal viva, OSPF gana (menor AD) y el respaldo espera en silencio. Si cae, la estática entra sola.
- **Enlace stub:** la red de una sucursal con una única salida no necesita protocolo: una `ip route` de una línea y listo. Añadir OSPF ahí sería como contratar un empleado para que abra una puerta ya abierta.

---

## 🧠 Mini-chequeo

1. Enumera dos escenarios donde el routing **estático** siga siendo la mejor opción.
2. ¿Qué significa que un protocolo dinámico "converja"?
3. ¿Qué consume de más un router con routing dinámico frente a otro con estático?

<details>
<summary>🔄 Respuestas</summary>

1. **Redes muy pequeñas** (2-3 routers, pocas redes) y **enlaces stub** (una única salida, ej. el router que conecta con Internet): no tiene sentido pagar el coste del protocolo para una sola ruta. También como ruta de respaldo a mano.
2. Que todos los routers llegan a un **estado estable y coherente** donde cada uno tiene las rutas correctas en su tabla, tras un cambio en la red (caída, alta, modificación). En estático eso es labor manual; en dinámico ocurre solo.
3. **CPU y memoria** (mantener la base de datos de topología y recalcular rutas) y algo de **ancho de banda** (mensajes de protocolo entre vecinos).
</details>

---

## ✅ Resumen en 3 frases

- El estático lo escribe el administrador a mano: predecible, seguro y sin coste, pero no escala ni se adapta.
- El dinámico hace que los routers se hablen y se recalculen: indispensable en cuanto la red crece o cambia a menudo.
- La **convergencia** es el momento donde la red "se pone de acuerdo" tras un cambio, y es la métrica que separa a los buenos protocolos de los malos.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Ruta estática | Ruta escrita a mano con `ip route` |
| Ruta dinámica | Ruta aprendida por un protocolo de routing |
| Convergencia | Estado estable tras un cambio en la red |
| Enlace stub | Enlace con una única salida (solo un camino posible) |
| Floating static | Ruta estática de respaldo, activa solo si falla la principal |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/09-routing-dinamico) · **Anterior:** [Índice de la unidad](/ApuntesRedes/09-routing-dinamico) · **Siguiente:** [02 · IGP vs EGP y RIP vs OSPF](/ApuntesRedes/09-routing-dinamico/02-igp-vs-egp)