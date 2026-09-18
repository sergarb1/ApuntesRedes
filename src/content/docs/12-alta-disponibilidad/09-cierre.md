---
title: "09 — Cierre: consolida lo aprendido"
description: El cierre práctico de la U12, donde la red aprende a caer de pie 🔁
---

<p><small>El cierre práctico de la U12, donde la red aprende a caer de pie 🔁</small></p>

> 🗺️ **Estás en:** 🔁 **UD12 · Alta disponibilidad y redundancia** → 09 · Cierre

---

Has terminado la teoría: sabes dónde se esconden los SPOFs, cómo STP y EtherChannel hacen la capa 2 tolerante a fallos, qué es un stack, cómo HSRP mantiene vivo el gateway y qué añaden las rutas flotantes e IP SLA al borde. Este cierre es el aterrizaje: recorres lo aprendido con juegos, un laboratorio de caos controlado y las preguntas de la entrevista. Léelo justo después del [punto 8](/ApuntesRedes/12-alta-disponibilidad/08-plan-continuidad) y antes de abrir los boletines.

---

## ⭐ Sé el Paquete

> *Eres un paquete de datos de un portátil de la VLAN 10, caminando hacia Internet en el peor momento posible: lunes, 9:47, justo cuando el router R1 decide jubilarse sin avisar.*

**Paso 1:** Salgo del portátil con destino 8.8.8.8. Mi gateway es 192.168.10.1. Resuelvo esa IP por ARP y me responde la MAC `0000.0c07.ac01`. Lo que no sé es que esa MAC la atiende R1, que en este momento expira.

**Paso 2:** R1 calla. R2, que llevaba semanas escuchando hellos en el grupo HSRP 1, no los recibe tres veces seguidas y asume el papel activo: emite su gratuitous ARP con la IP virtual y su MAC real, y empieza a responder por la MAC virtual.

**Paso 3:** Mi conversación con 8.8.8.8 pierde dos paquetes. Dos. Luego sigue por R2, que además tenía su propio enlace al ISP. El usuario me ve "a tirones" tres segundos; el administrador, ni eso: solo una línea en el log.

**¿Qué ha pasado?**
1. **HSRP ha conmutado el gateway al respaldo por la MAC virtual compartida** → ✅ ¡Correcto! Los clientes no cambiaron nada: la IP virtual y su MAC virtual pasaron de R1 a R2 sin re-ARP.
2. **El DHCP ha reasignado los gateways de toda la red** → ❌ El DHCP no intervino (¿dónde has visto un DHCP repartir gateways en 3 segundos?): la magia fue la IP/MAC virtual compartida.
3. **STP ha reconvergido la red** → ❌ STP trabaja en capa 2 y no da gateways; aquí la redundancia era de capa 3 (FHRP).

> 💡 **La moraleja del paquete del lunes:** una conmutación perfecta se parece a un milagro solo para quien no vio el diseño: grupo HSRP, MAC virtual, preempt coherente y tracking del enlace que importa. El caos se vence con topología, no con suerte.

---

## 🔥 Fireside Chat: Redundancia vs Complejidad

> *En la sala de máquinas, tras un simulacro de desastre, el arquitecto de la red y el administrador de turno discuten con el café humeante.*

**Redundancia:** — Dos routers, dos líneas, stack, EtherChannel… Cada pieza duplicada es una pieza que puede morir sin matarte.

**Complejidad:** — Y cada pieza duplicada es una pieza más que configurar, vigilar y explicar al nuevo técnico a las tres de la mañana. ¿Sabes cuántos incidentes empiezan con "estamos cambiando la redundancia"?

**Redundancia:** — Sin mí, ese mismo incidente es una caída total. ¿Prefieres un fallo de diseño o un apagón?

**Complejidad:** — Prefiero el diseño que sabe cuándo sobra. ¿Hace falta HSRP en la red de un almacén con cinco equipos? ¿O es comprar humo? Tu coste no es solo el hardware: es la eterna conversación entre STP, HSRP y las rutas flotantes para ver quién decide qué.

**Redundancia:** — Justo por eso existe el análisis de SPOFs: se duplica donde el parón duele. Yo no pido duplicarlo todo; pido medir y decidir.

**Complejidad:** — Y yo no pido no duplicar; pido que cada duplicación venga con su procedimiento escrito y su simulacro. Redundancia sin documentación es complejidad con karaoke.

**Redundancia:** — …¿Acabamos de redactar el manual juntos?

**Complejidad:** — Siempre se acabó. Mide, duplica donde duele, escribe y ensaya. El resto son cajas bonitas.

---

## 🕵️ ¿Quién Soy?

1. Bloqueo puertos por diseño y los desbloqueo cuando el camino principal muere.

2. Somos varios cables que STP ve como uno; si uno muere, ni nos notan.

3. Comparto una IP virtual y una MAC `0000.0c07.acXX`; cuando el activo calla, hablo yo.

4. Hago ping cada 10 segundos y retiro la ruta cuando nadie me contesta.

<details>
<summary>🔄 Respuestas</summary>

1. **STP/RSTP** — Redundancia de capa 2 con puertos bloqueados de respaldo.
2. **EtherChannel** — Agrupación de enlaces lógica (LACP/PAgP).
3. **HSRP (standby)** — El respaldo que asume la IP virtual del gateway.
4. **IP SLA + track** — Sondeo activo enlazado a una ruta estática.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "Compramos dos routers, somos redundantes"

**Gerente:** — Compramos un segundo router idéntico. Ahora ya tenemos alta disponibilidad, ¿no?

**CONRAD:** — ¿Y los dos están enchufados al MISMO switch de acceso? ¿Y la salida a Internet de los dos pasa por la MISMA fibra del operador? ¿Y solo uno tiene configuración copiada? Enhorabuena: has comprado dos billetes del mismo avión y encima no tienes el itinerario escrito.

**CONRAD:** — La redundancia no es un número de cajas: es un **camino alternativo completo**. Router nuevo + misma fibra = misma caída. Router nuevo + config no respaldada = restauración a mano en el peor momento. Mide el camino entero, no la caja.

**La lección:** el análisis de SPOFs se hace por caminos, no por equipos: si el plan B comparte con el plan A el switch, la fibra o el conocimiento, el plan B es decorado.

---

## ⚡ Laboratorio de tortura: La red que cae de pie

> **Duración:** 2 horas
> **Material:** Packet Tracer — 2 routers (R1, R2), 2 switches (SW1, SW2), 1 router ISP-1, 1 router ISP-2, 4 PCs

**Montaje base:**
1. R1 y R2 en paralelo como gateway de VLAN 10 (HSRP grupo 1, IP virtual 192.168.10.1). R1 prioridad 110 con preempt; R2 por defecto.
2. SW1 y SW2 con EtherChannel entre ellos (2 cables, LACP active) y cada PC con un cable a SW1 y otro a SW2 (o uplinks redundantes).
3. R1 → ISP-1 y R2 → ISP-2 (dos redes distintas de "Internet").
4. Ruta por defecto flotante en R2 hacia ISP-2; en R1, ruta principal + IP SLA (ping a 8.8.8.8 cada 10 s) con track sobre la ruta.

**Configura y verifica antes del caos:**
- `show standby brief`: R1 Active, R2 Standby.
- `show etherchannel summary`: Po1(SU) con miembros P.
- Desde un PC, ping continuo a 8.8.8.8 sin pérdidas.

**Ahora, SIN MIRAR, tu profesor introduce fallos por turnos:**
- Fallo A: apaga R1. ¿Cuántos pings se pierden? ¿Quién asume?
- Fallo B (con R1 vivo): apaga el enlace R1→ISP-1. ¿Conmuta el tráfico por R2? ¿Por qué sí o por qué no?
- Fallo C: desconecta uno de los dos cables del EtherChannel. ¿Notas algo en los PCs?

**Fallo intencionado extra:** el profesor añade un tercer router R3 al grupo HSRP con prioridad 255 y **sin** preempt, y luego con preempt. El reto: explicar la diferencia de comportamiento y decidir si el preempt de R3 es buena idea.

> **Pista 1 (fallo A):** con HSRP por defecto espera 3 hellos (~10 s). Cuenta los pings perdidos y prueba `standby timers 1 3` en ambos.
>
> **Pista 2 (fallo B):** si R1 sigue saludando, R2 no toma el relevo: el gateway sigue siendo R1, que ya no tiene salida. ¿Qué falta? El track sobre el enlace WAN con `decrement`.
>
> **Pista 3 (fallo C):** `show etherchannel summary` debe seguir mostrando Po1(SU) con un miembro P menos; los PCs no pierden ni un ping si el balanceo está bien.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Cazador de SPOFs** | Mapear tu red (casa, aula) y listar todos sus puntos únicos de fallo |
| 🏅 **Par de routers perfecto** | HSRP con conmutación probada: menos de 3 pings perdidos |
| 🏅 **Ingeniero del canal** | EtherChannel con LACP, verificado y con prueba de cable roto |
| 🏅 **Adivino del fallo invisible** | IP SLA montado y simulacro de "ISP arriba pero sin salida" |

---

## 🧠 Atrévete a pensar

1. Una tienda de barrio tiene 5 equipos y router de operador. ¿Le montarías HSRP? ¿Qué le recomendarías como plan de continuidad mínimo?
2. ¿Por qué el stack de switches y el HSRP resuelven SPOFs distintos? ¿Qué SPOF deja el stack sin cubrir?
3. Diseña la salida a Internet de una empresa con presupuesto para dos líneas de operadores distintos. ¿Ruta flotante, ECMP o SLA+track? Justifica con los modos de fallo que cubres.
4. Un compañero propone poner `preempt` con prioridad 255 en el router más potente del grupo HSRP. ¿Qué efecto tiene en la estabilidad? ¿Qué más debes configurar para que sea seguro?

<details>
<summary>💡 Soluciones</summary>

1. No: el coste y la complejidad no se justifican; el SPOF asumible es el router del operador. Plan mínimo: copia de configuración documentada, un router 4G de respaldo para la salida urgente, SAI pequeño y contacto/SLA del operador escrito.
2. El stack elimina el SPOF de **un switch del núcleo** (capa 2 y gestión); HSRP elimina el SPOF del **gateway** (capa 3). El stack no cubre la muerte del grupo completo (si muere todo el stack, mueren todos los puertos): para eso, otro equipo paralelo o diseño de acceso dual.
3. Con dos operadores distintos, **SLA+track sobre la primaria y flotante de respaldo** cubre el caso "enlace arriba pero sin salida" (el más común); ECMP solo si ambas líneas se usarían de continuo (coste/rendimiento) y aceptas reparto por flujos. Mejor aún: SLA+track en ambas direcciones y ECMP si la empresa quiere exprimir las dos líneas.
4. Con preempt 255, ese router toma el activo cada vez que arranca o se recupera: cada reinicio es una conmutación (y una ventana de pings perdidos). Para que sea seguro: timers afinados, track del enlace que importa (para no ser activo sin salida) y coherencia con el diseño (¿es realmente el equipo que debe servir?).

</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. Punto único de fallo (sigla)
3. Protocolo estándar de gateway redundante (RFC, no Cisco)
5. Agrupación de enlaces físicos en uno lógico (dos palabras)
7. Sondeo activo de IOS que mide si un destino responde (2 palabras)

Vertical:
2. Rol del router que atiende la IP virtual en HSRP
4. Ruta con distancia administrativa alta que espera dormida
6. Varios switches convertidos en uno lógico (2 palabras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. SPOF, 3. VRRP, 5. ETHERCHANNEL, 7. IPSLA

**Vertical:** 2. ACTIVE, 4. FLOTANTE, 6. STACKING

</details>

---

## 💬 Preguntas de entrevista de trabajo

1. **"¿Qué es para ti una red de alta disponibilidad y por dónde empezarías a mejorarla?"**
2. **"Explícame HSRP como si yo fuera el responsable de negocio."**
3. **"Tenemos un enlace principal y uno de respaldo al mismo operador. ¿Es redundancia?"**
4. **"¿Qué es una ruta flotante y cuándo te has visto obligado a usar IP SLA?"**
5. **"La noche del sábado se murió el switch de distribución. Cuenta cómo sería tu noche ideal y tu noche realista."**

> 💡 **Cómo encararlas:** la 1 pide método: SPOFs primero (mapa), luego conmutación automática (capa 2: STP/EtherChannel/stack; capa 3: FHRP/rutas) y procesos (backups, simulacros). La 2, en llano: "dos routers comparten la misma IP de puerta de salida; si uno muere, el otro la atiende sin que nadie note nada" — cero tecnicismos, cero frases de manual. La 3: **no**, si comparten la fibra/edificio/cabezal del operador; redundancia = caminos independientes, no dos cables al mismo avión. La 4: ruta de emergencia con AD alta; IP SLA cuando el fallo no se ve desde tu router (enlace arriba, servicio muerto), con el ping programado y el track retirando la ruta. La 5: ideal = conmutación automática y nadie llama; realista = algo falla igualmente, y entonces salen los backups de config, el sustituto preparado y el procedimiento escrito; quien cuente "todo perfecto" no ha hecho simulacros.

---

## 🤷 No hay preguntas tontas

> ❓ **¿Cuánta redundancia es "suficiente"?**

La que comprueba el coste del parón: si una hora de red muerta cuesta X euros, la redundancia debe costar menos que X por hora de riesgo reducido. En un aula, un switch de repuesto y backups bastan; en un hospital, doble circuito, dos operadores y failovers probados. "Suficiente" = el punto donde duplicar más ya no reduce riesgo real.

> ❓ **¿HSRP y OSPF se pelean?**

No: trabajan en niveles distintos. HSRP elige quién atiende el gateway **dentro** de una subred; OSPF elige caminos **entre** subredes. En un diseño normal: HSRP en el borde de la LAN, OSPF entre routers internos. El detalle fino: el router activo de HSRP debe ser el que OSPF prefiera como salida (ajustando costes), o tendrás tráfico que entra por R1 y sale por R2 (funciona, pero el diseño queda feo).

> ❓ **Si todo está duplicado, ¿para qué simular fallos?**

Porque la redundancia duplica piezas, no garantiza el **conmutador**. Timers, preempt, tracking, VLANs y fibra tienen mil detalles que solo aparecen al tirar el enlace de verdad. El simulacro convierte tu diseño teórico en un MTTR medido; sin él, tu HA es una hipótesis con hardware caro.

---

## 🎬 Poscréditos

El paquete del lunes llegó a 8.8.8.8 a la tercera: dos pings perdidos, cero usuarios alarmados. El log lo contó; el simulacro del trimestre anterior lo había ensayado. CONRAD, desde su consola, cerró el curso con su habitual ternura: *"Doce unidades para llegar a la conclusión más aburrida del mundo: las redes funcionan cuando están diseñadas, documentadas y ensayadas. El resto es plegaria. Ahora, fuera de mi consola, que tienes boletines."*

**PRÓXIMAMENTE EN… NINGUNA UNIDAD:** has llegado al final del curso. 🏁 No queda más práctica que la vida real: monta, rompe, documenta y repite. Y si algún día te preguntan en una entrevista por la vez que "la red no se cayó", sonríe: nadie notó que hiciste bien tu trabajo. Eso es alta disponibilidad.

---

## ✅ Criterios de evaluación cubiertos (RA1/RA3/RA5/RA6)

| CE | Criterio | Cubierto |
|---|---|---|
| RA3 | Conmutadores con tolerancia a fallos | ✅ Puntos 2-4 y ⚡ Laboratorio |
| RA5 | Segmentación con continuidad de servicio | ✅ Puntos 2-5 |
| RA6 | Encaminamiento redundante | ✅ Puntos 5-7 + 🧠 Atrévete (punto 9) |
| RA1 | Estructura y principios de redes tolerantes | ✅ Puntos 1 y 8 + 💬 Entrevista (punto 9) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-alta-disponibilidad) · **Anterior:** [08 · Plan de continuidad](/ApuntesRedes/12-alta-disponibilidad/08-plan-continuidad) · **Siguiente:** **¡Fin del curso!** 🏁
