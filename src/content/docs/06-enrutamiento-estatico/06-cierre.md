---
title: "06 — Cierre: consolida lo aprendido"
description: El cierre práctico de la U06, con rutas, next-hops y tablas 🧭
---

<p><small>El cierre práctico de la U06, con rutas, next-hops y tablas 🧭</small></p>

> 🗺️ **Estás en:** 🧭 **UD6 · Enrutamiento estático** → 06 · Cierre

---

Has terminado la teoría: conoces las tripas del router, sabes moverte por la CLI, escribes rutas estáticas y por defecto con next-hop o interfaz de salida, y entiendes cómo decide el router con longest prefix match y distancia administrativa. Este cierre es el aterrizaje: juegos, un laboratorio con rutas rotas y las preguntas de la entrevista. Léelo justo después del [punto 5](/ApuntesRedes/06-enrutamiento-estatico/05-como-decide-el-router) y antes de abrir los boletines.

---

## ⭐ Sé el Paquete

> *Eres un paquete del PC de contabilidad (192.168.1.10) con destino a una sucursal (10.20.0.50), y la red de tu empresa tiene tres routers en cadena. Acompáñame.*

**Paso 1:** Mi PC no sabe qué es una ruta: solo ve que el destino no está en su subred y me entrega al gateway (192.168.1.1, el R1). Primera decisión de terceros tomada por mi destino.

**Paso 2:** R1 consulta su tabla: la 10.20.0.0/16 no está conectada, pero sí hay una ruta estática `10.20.0.0/16 → 172.16.0.2` (el R2). Reencapsulación: nueva MAC de destino, misma IP. Salto 1.

**Paso 3:** R2 tiene la 10.20.0.0/16 conectada en su interfaz LAN… o eso cree, porque un compañero apagó esa interfaz ayer. Sin ruta conectada y sin alternativa, R2 me devuelve un **ICMP Destination Unreachable**. Mi viaje termina aquí, con un mensaje de error elegante.

**¿Qué ha pasado?**
1. **La ruta estática de R2 apuntaba a una red cuya interfaz estaba down, y no había fallback** → ✅ ¡Correcto! Las rutas conectadas desaparecen cuando la interfaz se cae; sin ruta alternativa, el router descarta y avisa con ICMP.
2. **El ICMP bloqueó el paquete en el firewall** → ❌ No hubo firewall de por medio: el propio router descartó al no tener ruta. Distinto de un ACL (que suele dar "administratively prohibited").
3. **La MAC de la sucursal era incorrecta** → ❌ La MAC nunca cruza routers: cada salto reescribe la MAC y solo la IP persiste de punta a punta.

> 💡 **La moraleja del paquete turístico:** una ruta estática es una promesa que solo se cumple si el camino existe. Y las promesas en redes se verifican con `show ip route` antes de que el usuario las ponga a prueba.

---

## 🔥 Fireside Chat: Rutas estáticas vs Rutas dinámicas

> *En la consola del router, una ruta estática y un anuncio OSPF discuten sobre quién lleva mejor la red.*

**Estática:** — Yo soy determinista: la escribes, la ves, la entiendes. Sin vecinos, sin hellos, sin sorpresas. Y no consumo CPU contando historias con otros routers.

**Dinámica (OSPF):** — Y cuando un enlace muere, ¿quién te avisa? ¿El administrador, a las tres de la madrugada? Yo reconverjo solo: retiro la ruta rota y publication la alternativa en segundos.

**Estática:** — En redes pequeñas y en el borde (hacia Internet, hacia un solo ISP), yo mando: es lo que firma el contrato con el operador. Además, con rutas flotantes y SLA me apaño hasta en HA (ya lo verás en la U12).

**Dinámica:** — Y en una red de 30 routers, ¿escribes 900 rutas a mano? Yo aprendo la topología y me adapto. Tu memoria no escala.

**Estática:** — Toque de calidad: el router que solo tiene rutas estáticas no tiene ni idea de si el next-hop sigue vivo… salvo que la interfaz caiga. Tú sí lo sabes.

**Dinámica:** — Y tú tienes la última palabra cuando el diseño exige control absoluto. Somos el bisturí y el sistema inmunitario.

**Estática:** — El buen administrador usa los dos: dinamica dentro, estática en el borde, y documentación siempre.

---

## 🕵️ ¿Quién Soy?

1. Vivo en la tabla del router y apunto a un next-hop; no aprendo de vecinos ni anuncio nada.

2. Soy la ruta que todo router tiene cuando no sabe qué hacer con un destino: 0.0.0.0/0.

3. Cuánto confías en mí: si soy 0, no se me discute; si soy 250, cualquiera me planta cara.

4. Soy la regla que elige la ruta más específica cuando varias coinciden con un destino.

<details>
<summary>🔄 Respuestas</summary>

1. **Ruta estática** — `ip route red máscara next-hop`.
2. **Ruta por defecto** — El último recurso (gateway of last resort).
3. **Distancia administrativa (AD)** — La confianza en una fuente de rutas.
4. **Longest prefix match** — Gana la ruta con la máscara más larga.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "Puse la ruta y no funciona, el router es malo"

**Administrador:** — He configurado `ip route 10.20.0.0 255.255.0.0 172.16.0.2` y los PCs no llegan. ¿El IOS está roto?

**CONRAD:** — ¿Y en el R2, que recibe tu paquete, hay ruta de vuelta a la 192.168.1.0? ¿No? Eso es el clásico de los clásicos: el paquete va y no vuelve. El enrutamiento es IDA y VUELTA: por cada camino, su regreso. Sin ruta de retorno, tu paquete es unOne-Way a la nada.

**CONRAD:** — Y de propina: ¿la interfaz del next-hop está up? ¿La ruta está en la tabla (`show ip route`)? ¿Hay otra ruta más específica que la tape? Cuatro comprobaciones, un minuto, en lugar de culpar al equipo.

**La lección:** cuando "no funciona una ruta", el diagnóstico tiene orden: ¿está en tabla? → ¿el next-hop es alcanzable? → ¿hay ruta de retorno? → ¿algo más específico interfiere? Culpar al router es lo último, no lo primero.

---

## ⚡ Laboratorio de tortura: Tres routers y una promesa rota

> **Duración:** 1,5 horas
> **Material:** Packet Tracer — 3 routers (2911/1941) en cadena, 2 switches, 4 PCs

**Topología:**
```
PC-A ── R1 ── R2 ── R3 ── PC-B
       (red A)  (red B)  (red C)
```
Redes: 192.168.1.0/24 (A), 172.16.12.0/30 (R1-R2), 172.16.23.0/30 (R2-R3), 10.20.0.0/24 (C).

**Configura al inicio:**
1. Interfaces con sus IPs y `no shutdown`.
2. R1: rutas estáticas a la red C vía R2 y a la red B; R2: rutas a A y C; R3: rutas a A y B.
3. Ruta por defecto en R1 y R3 hacia el centro (o revisa qué pasa sin ella).
4. Verifica: PC-A pinge a PC-B y viceversa. `show ip route` en los tres.

**Ahora, SIN MIRAR, tu profesor introduce TRES fallos:**
- Fallo A: quita la ruta de retorno en R3 (red A).
- Fallo B: `shutdown` en la interfaz LAN de R3.
- Fallo C: añade en R1 una ruta estática incorrecta: `ip route 10.20.0.0 255.255.255.0 172.16.23.3` (saltándose R2).

**Reto:** diagnosticar cada fallo con pings por saltos (PC → gateway → siguiente router), `show ip route` y `show ip interface brief`. Documenta síntoma → causa → solución.

**Fallo intencionado extra:** el profesor configura en R1 `ip route 10.20.0.0 255.255.0.0 172.16.12.2` con **máscara 255.255.0.0** en vez de 255.255.255.0. El ping a 10.20.0.50 funciona, pero el a 10.20.1.50 (otra subred del mismo /16 que no existe) se pierde de forma "rara". Diagnóstico: ¿qué le dice el longest prefix match cuando hay una ruta /16 y otra /24?

> **Pista 1 (fallo A):** el paquete llega a PC-B… y la respuesta no vuelve. Haz ping desde R3 a la red A: si falla, mira `show ip route` de R3.
>
> **Pista 2 (fallo B):** `show ip interface brief` + `show ip route`: la red conectada desaparece de la tabla cuando la interfaz se cae.
>
> **Pista 3 (fallo C):** traceroute desde PC-A: verás dónde muere el paquete (¿en R1? ¿en R2?). La ruta mal puesta manda el tráfico a un next-hop que no sabe qué hacer.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Cartógrafo** | Montar la red de 3 routers con todas las rutas a la primera |
| 🏅 **Espejero** | Detectar una "ruta de retorno" ausente antes que tu profesor lo confiese |
| 🏅 **Prefijero** | Explicar el longest prefix match con el caso /16 vs /24 en 30 segundos |
| 🏅 **Navegante del defecto** | Configurar la ruta por defecto y el gateway of last resort sin dudar |

---

## 🧠 Atrévete a pensar

1. ¿Por qué una ruta estática que apunta a una interfaz Ethernet de salida es mala idea en redes multiacceso?
2. Una ruta estática con next-hop y otra con interfaz de salida: ¿qué diferencia hay en cómo el router resuelve la MAC del siguiente salto?
3. Diseña las rutas de una empresa con central (2 subredes) y 3 sucursales conectadas por WAN punto a punto. ¿Estáticas o dinámicas? Justifica.
4. ¿Qué diferencia hay entre `ip route 0.0.0.0 0.0.0.0` y una ruta específica cuando ambas existen? ¿Qué pasa con un destino que coincide con ambas?

<details>
<summary>💡 Soluciones</summary>

1. En Ethernet multiacceso, el router no sabe **a quién preguntar** (ARP) porque la interfaz tiene muchos vecinos: se necesita "interfaz + next-hop" o directamente next-hop. Con interfaz sola, el router ARP-ea el destino final (proxy-ARP y dramas). Recomendado: next-hop (o ambos).
2. Con next-hop: ARP-ea al next-hop (una MAC, la del router vecino). Con interfaz de salida en multiacceso: ARP-ea la IP final del destino (o proxy-ARP del vecino). En punto a punto, la interfaz basta (no hay ARP).
3. Si las WAN son punto a punto y el diseño es estable: **estáticas** (control, simplicidad, sin vecinos que gestionar). Si puede crecer o hay caminos alternativos: dinámico (OSPF) + estática por defecto hacia Internet. Justificar por tamaño y estabilidad.
4. Convive una ruta más específica y la por defecto: el destino que coincide con la específica va por ella (longest prefix match); el resto por la por defecto. La por defecto es el último recurso, no una competidora de igual a igual.

</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. Tabla que el router consulta para decidir (2 palabras)
3. Dirección del siguiente router en el camino (2 palabras)
5. Comando IOS que crea una ruta estática (2 palabras)
7. Protocolo que avisa al PC de que el destino es inalcanzable (sigla)

Vertical:
2. Regla que elige la ruta con la máscara más larga (3 palabras)
4. Confianza numérica en una fuente de rutas (2 palabras)
6. La ruta "por si acaso": 0.0.0.0/0 (2 palabras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. TABLADERUTAS, 3. NEXTHOP, 5. IPROUTE, 7. ICMP

**Vertical:** 2. LONGESTPREFIXMATCH, 4. DISTANCIAADMINISTRATIVA, 6. RUTAPORDEFECTO

</details>

---

## 💬 Preguntas de entrevista de trabajo

1. **"Explícame qué pasa cuando un router recibe un paquete para una red que no está en su tabla."**
2. **"¿Qué diferencia hay entre next-hop y interfaz de salida en una ruta estática?"**
3. **"¿Cuándo pondrías rutas estáticas y cuándo montarías un protocolo dinámico?"**
4. **"¿Qué es la distancia administrativa y cómo afecta a dos rutas hacia la misma red?"**
5. **"Un PC no llega a una red remota. ¿Tu orden de comprobaciones?"**

> 💡 **Cómo encararlas:** la 1: descarta y envía ICMP unreachable (si hay ruta por defecto, la usa; si no, la descarta y avisa). La 2: next-hop = IP del vecino (ARP-ea al vecino, ideal en multiacceso); interfaz de salida = sale por ahí (punto a punto, o con next-hop en multiacceso). La 3: estáticas en redes pequeñas/estables y en el borde (contratos con ISPs); dinámico cuando hay varios caminos o crecimiento (OSPF dentro). La 4: AD = confianza en la fuente (estática 1, OSPF 110…); con dos rutas a la misma red gana la de menor AD (la otra queda dormida: la famosa ruta flotante). La 5: ¿ping al gateway? → ¿ping al router siguiente? → `show ip route` en cada salto → ¿ruta de retorno? → traceroute para ver dónde muere.

---

## 🤷 No hay preguntas tontas

> ❓ **¿Siempre hay que poner rutas "de ida y vuelta" en los dos extremos?**

Sí, salvo que uses un protocolo dinámico que las anuncie. El error más común en laboratorios con routers en cadena es configurar el viaje de ida y olvidar el de vuelta: el ping "sale" pero la respuesta nunca vuelve. Piensa en parejas de rutas espejo.

> ❓ **¿La ruta por defecto puede ir hacia una interfaz en vez de un next-hop?**

Puede, y es común en el router de casa (`0.0.0.0/0 → dialer/WAN`). En Ethernet multiacceso con interfaz sola, el router ARP-ea el destino final; si el ISP no hace proxy-ARP, falla. Regla práctica: por defecto, usa next-hop; la interfaz sola, para enlaces punto a punto.

> ❓ **¿Qué pasa si pongo dos rutas por defecto con la misma AD?**

Se convierten en un ECMP: el router reparte flujos por ambas. Si eso no era tu intención, sube la AD de una (la conviertes en flotante) o deja solo una. Es, de hecho, el mecanismo de la redundancia en el borde de la U12.

---

## 🎬 Poscréditos

El paquete turístico murió en R2 con un ICMP elegante y el administrador descubrió la ruta de retorno. En el laboratorio, tres routers susurraron su lección: *promesas por escrito, caminos de vuelta y traceroute antes de culpar al hardware*. CONRAD, desde el R1, cerró la sesión: *"Una ruta es una promesa. Una tabla es un mapa. Y un mapa sin caminos de vuelta es un puzzle. Configura los dos lados, chaval."*

**PRÓXIMAMENTE EN U07:** Enrutamiento dinámico con OSPF: routers que se cuentan caminos entre sí y eligen rutas solos. Ahora que sabes escribir el mapa a mano, toca dejar que la red lo escriba ella.

---

## ✅ Criterios de evaluación cubiertos (RA4)

**RA4: Administra las funciones básicas de un router estableciendo opciones de configuración.**

| CE | Criterio | Cubierto |
|---|---|---|
| a) | Componentes y LEDs del router | ✅ Punto 1 |
| b) | Acceso a la configuración | ✅ Punto 2 |
| c) | Secuencia de arranque | ✅ Punto 1 |
| d) | Comandos de configuración | ✅ Punto 2 + ⚡ Laboratorio (punto 6) |
| f) | Rutas estáticas y por defecto | ✅ Puntos 3-5 + 🧠 Atrévete (punto 6) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/06-enrutamiento-estatico) · **Anterior:** [05 · Cómo decide un router](/ApuntesRedes/06-enrutamiento-estatico/05-como-decide-el-router) · **Siguiente:** [UD7 · Enrutamiento dinámico con OSPF](/ApuntesRedes/07-ospf)
