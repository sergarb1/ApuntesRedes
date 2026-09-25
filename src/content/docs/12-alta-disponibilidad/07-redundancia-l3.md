---
title: 07 — Redundancia en capa 3
description: Dos caminos a Internet y una decisión automática 🛣️
---

<p><small>Dos caminos a Internet y una decisión automática 🛣️</small></p>

> 🗺️ **Estás en:** 🔁 **Alta disponibilidad y redundancia** → 07 · Redundancia en capa 3

---

## 📬 La idea en una frase

> En capa 3 la redundancia se construye con **más de una ruta** hacia cada destino y reglas claras de elección: **rutas flotantes** (una preferida, otra esperando), **ECMP** (varias activas a la vez) y **IP SLA + tracking** (decidir según el estado real del camino, no solo según la tabla).

---

## 🛣️ Rutas flotantes: la ruta de emergencia

Recuerda la [unidad de enrutamiento estático](/ApuntesRedes/06-enrutamiento-estatico): cada ruta tiene una **distancia administrativa** (AD). Dos rutas a la misma red con AD distinta no compiten: la de menor AD gana y la otra **duerme** hasta que la primera muere. Eso es una ruta flotante:

```
R1(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1        ← ISP-1 (AD 1, la clásica)
R1(config)# ip route 0.0.0.0 0.0.0.0 198.51.100.1 250   ← ISP-2 (AD 250, flotante)
```

```
R1# show ip route static
S*    0.0.0.0/0 [1/0] via 203.0.113.1     ← activa
S     0.0.0.0/0 [250/0] via 198.51.100.1  ← flotante (esperando)
```

Si cae la salida por el ISP-1 (por ejemplo, muere la interfaz y la ruta se retira de la tabla), la flotante **se despierta sola** y el tráfico sale por el ISP-2. Cuando el ISP-1 vuelve, la ruta con AD 1 vuelve a la tabla y la flotante vuelve a dormir. Coste: cero. Complejidad: una línea.

> 💡 **Matiz importante:** la ruta se retira cuando **muere la interfaz de salida** o el next-hop deja de ser alcanzable. Si el fallo está "detrás" del ISP (el enlace del ISP arriba, pero su salida a Internet muerta), el router no se entera… y ahí necesitas IP SLA (más abajo).

---

## ⚖️ ECMP: varias rutas activas a la vez

Con **ECMP** (*Equal Cost Multi-Path*) pones dos rutas con la **misma AD y misma métrica**: el router instala ambas y reparte flujos entre ellas:

```
R1(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1
R1(config)# ip route 0.0.0.0 0.0.0.0 198.51.100.1
   (misma AD 1, mismas métricas → ambas en tabla, reparto por flujos)
```

| | Ruta flotante | ECMP |
|---|---|---|
| Uso normal | Solo la primaria | Las dos a la vez |
| Al fallar una | Se activa la dormida | Se quita la muerta, sigue la otra |
| Ancho de banda | Reserva "muda" | Aprovechas ambos enlaces |
| ¿Cuándo? | ISP principal + respaldo barato/peor | Dos ISPs de calidad similar |

Como en EtherChannel, el reparto es **por flujos**, no por paquetes: una misma conversación viaja por un solo camino (bien para el orden TCP, bien para el diagnóstico).

---

## 🩺 IP SLA + tracking: medir el servicio, no el cable

El fallo "el enlace está arriba pero Internet no llega" es el favorito del mundo real: el cable del ISP está conectado, la interfaz verde, la ruta en tabla… y no hay salida. La solución IOS es simular el trabajo de un usuario: **IP SLA** lanza un ping periódico y **tracking** le enchufa el resultado a la ruta:

```
R1(config)# ip sla 10
R1(config-ip-sla)# icmp-echo 8.8.8.8 source-interface gigabitEthernet 0/1
R1(config-ip-sla)# frequency 10
R1(config)# ip sla schedule 10 life forever start-time now
R1(config)# track 10 ip sla 10 reachability
R1(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1 track 10
R1(config)# ip route 0.0.0.0 0.0.0.0 198.51.100.1 250
```

Qué pasa:

1. Cada 10 s, el router hace ping a 8.8.8.8 por su interfaz del ISP-1.
2. El track 10 refleja si ese ping responde (reachability Up/Down).
3. La ruta principal solo vive **mientras el track esté Up**; si el ping falla, la ruta principal se retira aunque la interfaz esté bien.
4. La flotante (AD 250) toma el relevo. Cuando el ISP-1 vuelve a responder, todo se restaura solo.

Este patrón —SLA + track + ruta— es el "análisis de vida" de tu salida a Internet y resuelve el caso que la ruta flotante pura no ve.

---

## 🌐 Y el routing dinámico, ¿no era la redundancia?

También. Si tu red interna corre OSPF, la redundancia entre routers internos es automática: OSPF descubre caminos alternativos y reconverge. Los patrones de esta unidad complementan al dinámico en dos sitios concretos:

- **Borde:** hacia Internet casi siempre hay rutas estáticas (no anuncias tu tabla al ISP): flotantes y SLA+track son la herramienta.
- **Afinado fino:** OSPF elige por coste; si quieres manipular caminos (primario/respaldo entre sucursales), ajustas costes o metes rutas estáticas específicas.

La jerarquía mental: **dinámico dentro** (descubre y reconverge), **estático con inteligencia en el borde** (flotante, SLA, ECMP según contrato con los ISPs).

---

## 🔍 Verificación

| Comando | Qué aporta |
|---|---|
| `show ip route` | Qué rutas están en tabla (y cuáles no: las flotantes dormidas) |
| `show track` | Estado del track y qué vigila |
| `show ip sla statistics` | Éxitos/fallos del sondeo y última respuesta |
| `debug ip routing` | Inserciones/retiros de rutas en vivo (¡cuidado en producción!) |

Prueba de fuego: tira la interfaz del ISP-1 (`shutdown`), mira `show ip route` (la flotante aparece), `ping` desde un PC (pérdida mínima) y levanta de nuevo.

---

## 🤬 CONRAD VS EL MUNDO: "Tengo dos ISPs con rutas flotantes, no se me cae Internet"

**Administrador:** — Primaria por ISP-1, flotante por ISP-2. A prueba de todo.

**CONRAD:** — ¿A prueba de todo? ¿Y si el fallo está en el router del ISP-1 pero su cable sigue vivo? Tu ruta principal sigue en tabla, tu tráfico sale por el camino muerto y tu flotante sigue durmiendo. La ruta flotante solo despierta si TU router nota el fallo: interfaz caída o next-hop inalcanzable.

**CONRAD:** — IP SLA con ping cada 10 s al 8.8.8.8 por la interfaz del ISP-1, track enchufado a la ruta. Ahora sí: mides el servicio, no el enchufe.

**La lección:** la ruta flotante resuelve el fallo que el router **ve**; IP SLA resuelve el fallo que el router **siente**. El diseño serio usa ambos: la flotante como seguro barato y el SLA como sistema nervioso.

---

## 🧠 Mini-chequeo

1. ¿Qué hace una ruta flotante y qué la despierta?
2. ¿Diferencia clave entre ruta flotante y ECMP? ¿Cuándo usarías cada uno?
3. ¿Qué caso real no detecta la ruta flotante y cómo lo resuelve IP SLA?
4. En `show ip route` tu ruta principal por el ISP-1 sigue en tabla pero los usuarios no navegan. ¿Qué verificas?

<details>
<summary>🔄 Respuestas</summary>

1. Es una ruta con **mayor AD** que la principal: no compite, espera en la sombra. Se despierta cuando la principal sale de la tabla (interfaz caída o next-hop inalcanzable).
2. Flotante: solo la primaria sirve y la otra espera (AD distinta). ECMP: ambas sirven a la vez (misma AD y métrica) y el router reparte flujos. Flotante = primario/respaldo; ECMP = dos caminos de igual calidad.
3. El fallo "más allá del cable": interfaz arriba pero el ISP sin salida (o su router muerto). IP SLA hace ping de verdad a un destino por ese camino y el track retira la ruta cuando el sondeo falla.
4. Que el fallo está más allá de tu router: mira `show track` / `show ip sla statistics` (si tienes SLA), prueba ping desde el router por esa interfaz y, si no hay SLA, este es tu argumento para instalarlo.
</details>

---

## ✅ Resumen en 3 frases

- **Ruta flotante** = seguro automático con AD mayor; despierta cuando la principal sale de tabla.
- **ECMP** reparte entre rutas de igual coste; **IP SLA + track** mide el servicio real y retira rutas muertas "invisibles".
- Dentro de la red, OSPF ya es redundancia; en el borde, estáticos inteligentes: flotantes + SLA.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Ruta flotante | Ruta con AD alta que espera en la sombra |
| ECMP | Rutas de igual coste usadas a la vez |
| AD | Distancia administrativa: la confianza en una fuente de rutas |
| IP SLA | Sondeos activos (ping, jitter…) programados en IOS |
| Track | Enlaza el estado de un sondeo a una ruta/FHRP |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-alta-disponibilidad) · **Anterior:** [06 · HSRP en Cisco](/ApuntesRedes/12-alta-disponibilidad/06-hsrp-cisco) · **Siguiente:** [08 · Plan de continuidad](/ApuntesRedes/12-alta-disponibilidad/08-plan-continuidad)
