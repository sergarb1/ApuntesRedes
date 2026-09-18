---
title: 01 — Disponibilidad y SPOFs
description: Los nueves, el coste del parón y dónde se esconde el fracaso ⏱️
---

<p><small>Los nueves, el coste del parón y dónde se esconde el fracaso ⏱️</small></p>

> 🗺️ **Estás en:** 🔁 **UD12 · Alta disponibilidad y redundancia** → 01 · Disponibilidad y SPOFs

---

## 📬 La idea en una frase

> La **disponibilidad** se mide como porcentaje de tiempo en servicio (los famosos "nueves") y se pierde por los **SPOFs** (*Single Points of Failure*): piezas que, si mueren, se lleva la red por delante; la alta disponibilidad es el arte de encontrarlos y darles a cada uno un plan B.

---

## 📊 Los nueves: matemáticas del tiempo de parada

| Disponibilidad | Alias | Parada al año |
|---|---|---|
| 99 % | "dos nueves" | 3,65 días |
| 99,9 % | "tres nueves" | 8,8 horas |
| 99,99 % | "cuatro nueves" | 52,6 minutos |
| 99,999 % | "cinco nueves" | 5,3 minutos |

Cada "nueve" extra cuesta multiplicado: no solo dinero en hardware, sino complejidad operativa (y cada complejidad añadida es, irónicamente, una nueva fuente de fallos). La pregunta que manda no es "¿cómo consigo cinco nueves?" sino **"¿cuánto cuesta cada hora parada en MI negocio?"**: si la respuesta es "poco", con tres nueves y buen backup basta.

> 💡 **Regla de oro:** la redundancia no elimina fallos; elimina la **conversión de un fallo en parada**. Los equipos seguirán rompiéndose. Eso no es pesimismo: es el requisito del diseño.

---

## 🕵️ Dónde se esconden los SPOFs

Un SPOF no siempre es obvio. Los clásicos, de abajo arriba:

| Capa | SPOF típico | Plan B |
|---|---|---|
| Física | Un cable, un conector, un latiguillo que pisa la silla | Cables duplicados, EtherChannel |
| Enlace | Un único uplink del switch de planta | Dos uplinks a switches distintos |
| Equipo | El switch de distribución (si muere, muere la planta) | Stacking o dos switches paralelos |
| Gateway | El router que da salida (si muere, nadie navega) | HSRP/VRRP |
| Ruta | La única salida a Internet | Dos ISPs con rutas flotantes |
| Servicio | Un solo servidor DHCP/DNS | Servidor secundario, DHCP failover |
| Eléctrica | El único circuito, un solo SAI | Doble alimentación, SAI, generador |
| Humana | "La config solo la sabe quien la hizo" | Documentación + backups de configuración |

> ⚠️ **El SPOF favorito de la realidad:** no es el switch caro, es el **procedimiento**. Si la configuración no está respaldada y documentada, tu peor punto único de fallo es la persona que la sabe (y que se va de vacaciones en el peor momento).

---

## 📉 MTBF, MTTR y lo que de verdad puedes gestionar

Dos métricas gobiernan la disponibilidad:

- **MTBF** (*Mean Time Between Failures*): tiempo medio entre fallos de un equipo. Lo decide el fabricante y el entorno.
- **MTTR** (*Mean Time To Repair*): tiempo medio hasta restaurar el servicio. **Este es el tuyo.**

La alta disponibilidad, en la práctica, es la batalla por el MTTR: detección automática del fallo, conmutación sin intervención humana y procedimientos claros para lo que sí necesita manos. Una red "HA" donde la conmutación requiere que llegue un técnico con coche es, cuando menos, optimista.

```
Disponibilidad ≈ MTBF / (MTBF + MTTR)
```

Reducir el MTTR a la mitad suele ser más barato que duplicar el MTBF. Primero procesos, después hardware.

---

## 🧮 Redundancia por capas: el patrón de diseño

El patrón universal de HA en redes es **duplicar por capas, sin crear bucles ni cerebros divididos**:

```
              [Router R1]───[Router R2]      ← HSRP (gateway virtual)
                   │              │
              [Switch SW1]───[Switch SW2]     ← stack o dos equipos
                ║ (EtherChannel) ║
              [Switch SW3]───[Switch SW4]     ← acceso, doble uplink
                 │              │
               PCs            PCs             ← cada PC, dos caminos
```

- **Capa 2:** EtherChannel y STP gestionan la redundancia de enlaces sin bucles.
- **Capa 3:** HSRP da un gateway virtual; las rutas dinámicas o flotantes cubren caminos.
- **Servicios:** DHCP/DNS duplicados (visto en la UD10).
- **Energía:** SAI y, en serio, doble circuito.

En las unidades siguientes desmontas cada pieza: [STP como aliado](/ApuntesRedes/12-alta-disponibilidad/02-stp-redundancia), [EtherChannel](/ApuntesRedes/12-alta-disponibilidad/03-etherchannel), [stacking](/ApuntesRedes/12-alta-disponibilidad/04-stacking), [HSRP](/ApuntesRedes/12-alta-disponibilidad/05-fhrp) y [rutas redundantes](/ApuntesRedes/12-alta-disponibilidad/07-redundancia-l3).

---

## 🤬 CONRAD VS EL MUNDO: "No necesito redundancia, mi equipo nunca falla"

**Administrador:** — Este switch lleva tres años encendido sin un solo problema. ¿Para qué pagar otro igual?

**CONRAD:** — Tres años sin fallar no es una promesa de infinidad, es una estadística sin terminar. Los equipos no se rompen en el banco de pruebas: se rompen el viernes a las 18:47, cuando el ventilador decide jubilarse y nadie puede conseguir repuesto hasta el lunes.

**CONRAD:** — Y tu caso favorito: "redundancia" = dos cables al MISMO switch. Si muere el switch, mueren los dos cables. Eso no es redundancia, es comprar dos billetes del mismo avión.

**La lección:** la redundancia es útil cuando duplica el **camino completo**, no el último tramo. Busca el SPOF real preguntando "¿si ESTO muere, qué deja de funcionar?" en cada pieza del mapa. Y si no tienes mapa, esa es tu primera tarea.

---

## 🧠 Mini-chequeo

1. ¿Cuánto tiempo de parada al año implica un 99,9 %? ¿Y un 99,99 %?
2. Diferencia entre MTBF y MTTR, y cuál puedes gestionar tú como administrador.
3. Un servidor tiene dos tarjetas de red conectadas al mismo switch. ¿Es redundante? ¿Por qué?
4. Cita tres SPOFs que no sean equipos físicos.

<details>
<summary>🔄 Respuestas</summary>

1. 99,9 % ≈ **8,8 horas/año**; 99,99 % ≈ **52,6 minutos/año**.
2. **MTBF** = tiempo medio entre fallos (lo fija el hardware/fabricante); **MTTR** = tiempo hasta restaurar (procesos, detección, procedimientos). El MTTR es el gestionable, y el más rentable de mejorar.
3. **No, no del todo:** sobrevives a un fallo de tarjeta o cable, pero el switch sigue siendo un SPOF. Redundante de verdad = segundo camino hasta otro equipo (otro switch).
4. El gateway único, el único servidor DHCP/DNS, el único ISP, el circuito eléctrico único y, sobre todo, la configuración que solo vive en la cabeza de una persona o en el disco de un equipo.
</details>

---

## ✅ Resumen en 3 frases

- La disponibilidad se mide en **nueves** y se paga con diseño, no con fe; dimensiona según el coste real del parón.
- Los **SPOFs** se cazan preguntando "¿si esto muere, qué deja de funcionar?" en cada capa.
- La batalla ganable es el **MTTR**: detección automática, conmutación sin manos y procedimientos documentados.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| SPOF | Punto único de fallo |
| Nueves | Decimales de disponibilidad (99,99 %…) |
| MTBF / MTTR | Tiempo entre fallos / tiempo de reparación |
| Failover | Conmutación automática al plan B |
| Redundancia N+1 | Un equipo de repuesto por encima del mínimo |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-alta-disponibilidad) · **Anterior:** [Índice de la unidad](/ApuntesRedes/12-alta-disponibilidad) · **Siguiente:** [02 · STP: redundancia sin bucles](/ApuntesRedes/12-alta-disponibilidad/02-stp-redundancia)
