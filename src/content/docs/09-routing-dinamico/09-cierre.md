---
title: "09 — Cierre: consolida lo aprendido"
description: El cierre práctico de OSPF, con laboratorio y diagnóstico real 🧠
---

<p><small>El cierre práctico de OSPF, con laboratorio y diagnóstico real 🧠</small></p>

> 🗺️ **Estás en:** 🗣️ **U09 · Routing dinámico OSPF** → 09 · Cierre

---

Has terminado la teoría. Este cierre es el aterrizaje: recorre lo aprendido con juegos, un laboratorio real con fallos intencionados y las preguntas que te harán en una entrevista. Léelo justo después del [punto 8](/ApuntesRedes/09-routing-dinamico/08-ruta-por-defecto-y-diagnostico) y antes de abrir los boletines.

---

## ⭐ Sé el Router OSPF

> *Eres un router en área 0 (backbone). Tienes 3 vecinos OSPF. Acaban de añadir una red nueva en un router vecino.*

**¿Qué pasa?**

1. El vecino genera un **LSA** (Link State Advertisement) con la nueva red.
2. Lo envía a todos sus vecinos (**flooding**).
3. Tú recibes el LSA, actualizas tu **LSDB** (Link State Database).
4. Ejecutas el algoritmo **SPF (Dijkstra)** para recalcular la mejor ruta.
5. Actualizas tu tabla de rutas.

**Todo en segundos. Sin intervención humana.**

> 💡 **Ahora tú:** ¿y si en lugar de añadir una red, lo que cae es un enlace? El proceso es el mismo, pero al revés: el router del enlace caído genera un LSA de retirada, el flooding se repite, y tú recalculas sin esa ruta. Eso es la **convergencia** que viste en el [punto 1](/ApuntesRedes/09-routing-dinamico/01-de-estatico-a-dinamico).

---

## 🔥 Fireside Chat: RIP vs OSPF

> *Dos protocolos de routing compiten en un concurso de "quién encuentra la ruta más rápido".*

**RIP:** — Yo solo cuento saltos. Máximo 15. Simple. Eficiente en redes pequeñas.

**OSPF:** — ¿Saltos? ¿En serio? Yo miro ancho de banda, costo, retardo. Elijo la ruta óptima, no la que menos routers atraviesa.

**RIP:** — Pero soy fácil de configurar. `network` y listo.

**OSPF:** — También soy fácil. Y converjo en segundos, no en minutos como tú con tus actualizaciones cada 30 segundos.

**RIP:** — No me gusta este concurso.

**OSPF:** — Y encima tus rutas muertas tardan 180 segundos en borrarse. Si un enlace cae, los paquetes se pierden durante 3 minutos antes de que te enteres.

**RIP:** — Vale, vale. Tú ganas. Pero soy más viejo que tú.

**OSPF:** — *sonríe* Y por algo será.

---

## 🕵️ ¿Quién Soy?

1. Soy la base de datos de todos los enlaces conocidos en un área OSPF.
2. Soy el router designado en una red multiacceso OSPF. Reduzco adyacencias.
3. Soy la red backbone de OSPF. Todas las áreas deben conectarse a mí.
4. Soy el algoritmo que calcula la ruta más corta en OSPF.
5. Conecto el área 0 con otras áreas. Soy un ABR.
6. Soy el identificador único de un router OSPF.

<details>
<summary>🔄 Respuestas</summary>

1. **LSDB** — Link State Database.
2. **DR** (Designated Router).
3. **Área 0** (Backbone Area).
4. **SPF** (Shortest Path First) — Algoritmo de Dijkstra.
5. **ABR** (Area Border Router).
6. **Router ID** — Identificador OSPF.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "OSPF no forma vecindad"

**CONRAD:** — "Clásico: configuras OSPF y los vecinos no aparecen. Razones: 1) Las IPs no hacen ping (capa 3 rota). 2) El área no coincide. 3) El Router ID está duplicado. 4) Hay una ACL bloqueando OSPF (protocolo 89). 5) La subred no está declarada con `network`. 6) El Hello timer no coincide (por defecto 10s en broadcast)."

**CONRAD:** — "Y lo mejor: *he puesto router ospf 1* en los dos routers y no se ven. ¡Pues claro! El process ID no tiene que coincidir. Es local. Lo que tiene que coincidir es el área, la máscara de red, y que no haya firewall de por medio."

**CONRAD:** — "Y no me vengas con *'¿será que OSPF tarda en arrancar?'*. Con `show ip ospf neighbor` vacío y el ping OK, ya tienes la respuesta: el problema está en el plano OSPF, no en la red. A diagnosticar."

---

## ⚡ Laboratorio de Tortura: OSPF multisede

> **Duración:** 1.5 horas
> **Herramienta:** Packet Tracer

**Escenario:** 4 routers en red con 3 áreas: Área 0 (backbone), Área 1 y Área 2.

```
   Área 0            Área 1
  ┌──────┐          ┌──────┐
  │  R1  │───R2─────│  R3  │── LAN1 (192.168.1.0/24)
  └──────┘          └──────┘
     │
  ┌──────┐  Área 2
  │  R4  │── LAN2 (192.168.2.0/24)
  └──────┘
```

**Tareas paso a paso:**

1. **Configura OSPF en todos los routers** con sus áreas correctas. Recuerda: `router ospf 1`, un `router-id` único por router, y `network <red> <wildcard> area <área>`. R1 está en el Área 0, R3 en el Área 1 y R4 en el Área 2. ¿Y R2? Tiene enlaces al Área 0 y al Área 1: es el **ABR**. ¿Quién conecta el Área 2 con el Área 0? ¡R1! Es el segundo ABR.
2. **Verifica las adyacencias** con `show ip ospf neighbor` en cada router: todos deben mostrar vecinos en **FULL**.
3. **Propaga una ruta por defecto** desde un router conectado a Internet: pon una `ip route 0.0.0.0 0.0.0.0` en R4 y anúnciala con `default-information originate`. Comprueba en R3 con `show ip route ospf` que la ruta por defecto llega (prefijo `O*E2`).
4. **Cambia el costo de una interfaz** para forzar una ruta alternativa: usa `ip ospf cost` en una interfaz de R1 y verifica con `show ip ospf interface` y `show ip route` que el camino preferido cambia.

**Fallo intencionado:** Desconecta el enlace del Área 2 con el Área 0 y conecta directamente R4 (Área 2) con R3 (Área 1). ¿Funciona OSPF entre áreas? **No.** Las rutas inter-área **siempre** deben pasar por el Área 0: sin conexión al backbone, los routers de las áreas 1 y 2 no intercambiarán rutas entre sí, aunque sean vecinos directos en el enlace físico. Verás los vecinos en el enlace directo (R3-R4) en estado FULL, pero sin rutas de la otra área en la tabla (`show ip route ospf`).

> **Pista 1:** si dos áreas están conectadas sin pasar por el Área 0, recuerda la regla del [punto 4](/ApuntesRedes/09-routing-dinamico/04-areas-y-tipos-de-routers): el backbone es el único punto de paso válido.
>
> **Pista 2:** usa la escalera de diagnóstico del [punto 8](/ApuntesRedes/09-routing-dinamico/08-ruta-por-defecto-y-diagnostico): ping → `show ip protocols` → `show ip ospf neighbor` → `show ip ospf database` → `show ip route ospf`. El fallo se delata en el último paso.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **OSPF Neighbor** | Configurar 3 routers OSPF y verificar adyacencias con `show ip ospf neighbor` |
| 🏅 **Multiarea Master** | Configurar OSPF multiárea con ABR entre áreas 0, 1 y 2 |
| 🏅 **Default Propagator** | Propagar una ruta por defecto por OSPF usando `default-information originate` |
| 🏅 **SPF Whisperer** | Explicar el algoritmo de Dijkstra y cómo OSPF calcula la mejor ruta |

---

## 🧠 Atrévete a Pensar

1. ¿Por qué OSPF necesita un área backbone (Área 0)?
2. ¿Qué diferencia hay entre router ABR y ASBR?
3. ¿Cómo calcula OSPF el costo de una ruta?
4. ¿Cuándo usarías RIP en lugar de OSPF?
5. ¿Para qué sirve el Router ID? ¿Qué pasa si dos routers tienen el mismo Router ID?

<details>
<summary>💡 Soluciones</summary>

1. El **Área 0** es el núcleo. Todas las áreas deben conectarse a ella para evitar bucles de routing inter-área. Es el punto central del routing OSPF.
2. **ABR** (Area Border Router): conecta el Área 0 con otras áreas. **ASBR** (Autonomous System Boundary Router): introduce rutas externas en OSPF.
3. **Costo = 10^8 / ancho de banda (bps)**. Ej: 100 Mbps → costo = 1. 10 Mbps → costo = 10. Se puede cambiar manualmente con `ip ospf cost`.
4. Solo en redes muy pequeñas (< 15 routers) o por simplicidad. RIP no escala, converge lento y su métrica de saltos es limitada.
5. El **Router ID** identifica al router OSPF. Si dos routers tienen el mismo Router ID, OSPF no formará adyacencias correctamente.
</details>

---

## 🧩 Crucigrama de Bits

```
Horizontal:
1. Algoritmo de OSPF para calcular rutas (3 letras)
4. Anuncio de estado de enlace en OSPF (3 letras)
5. Área backbone de OSPF (1 dígito)
7. Frecuencia en segundos del Hello OSPF en broadcast (2 dígitos)
8. Router que conecta áreas (3 letras)

Vertical:
2. Frecuencia de actualización de RIP en segundos (2 dígitos)
3. Router que introduce rutas externas en OSPF (4 letras)
6. Número máximo de saltos en RIP (2 dígitos)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. SPF, 4. LSA, 5. CERO, 7. DIEZ, 8. ABR
**Vertical:** 2. TREINTA, 3. ASBR, 6. QUINCE

</details>

---

## 💬 Entrevista de trabajo

1. **"¿Qué es OSPF? Explica cómo funciona."**
2. **"Diferencias entre RIP y OSPF. ¿Cuándo usarías cada uno?"**
3. **"¿Qué es el área 0? ¿Por qué es obligatoria?"**
4. **"Configura OSPF en 3 routers con 2 áreas."**
5. **"¿Cómo propagas una ruta por defecto en OSPF?"**

> 💡 **Cómo encararlas:** la 1 y la 4 son las "preguntas reina". Para la 1, recorre la cadena de montaje del [punto 3](/ApuntesRedes/09-routing-dinamico/03-conceptos-ospf): Hello descubre vecinos → intercambio de LSAs → LSDB → SPF (Dijkstra) → tabla de rutas. Para la 4, plantea R1 (Área 0) → R2 (ABR) → R3 (Área 1) y escribe la configuración como en el [punto 7](/ApuntesRedes/09-routing-dinamico/07-configuracion-ospf). Si sabes contarlo fluido, ya eres medio administrador.

---

## 🤷 No hay preguntas tontas

> ❓ **¿OSPF se usa en Internet?**

No. En Internet, entre sistemas autónomos, manda **BGP** (lo viste en el [punto 2](/ApuntesRedes/09-routing-dinamico/02-igp-vs-egp)). OSPF se usa **dentro** de cada red (instituto, empresa, campus): en los routers de cada operador es BGP el que decide cómo llegar a la red de los demás.

> ❓ **¿Y si la red es muy pequeña? ¿Tengo que montar áreas?**

No. Un solo router o dos routers con OSPF pueden vivir todos en el **Área 0** sin crear más áreas. Las áreas existen para **escalar**: cuando la red crece y la LSDB única se hace pesada, entonces sí divides. Con 3 routers, Área 0 para todos y punto.

> ❓ **¿El DR elige siempre el mismo router aunque tenga prioridad más baja?**

Sí, mientras no se reinicie el proceso. La elección de DR/BDR solo ocurre **al arrancar OSPF o al reiniciarlo** (lo viste en el [punto 5](/ApuntesRedes/09-routing-dinamico/05-dr-y-bdr)). Si subes la prioridad a un router en marcha, el DR actual se mantiene hasta el reinicio. Por eso en producción se planifican las prioridades antes de arrancar.

---

## 🎬 Post-Créditos

> *OSPF ha convergido. Todos los routers conocen la topología de red.*

*Un enlace cae. OSPF recalcula en 2 segundos sin intervención humana.*

*La red se auto-repara gracias al protocolo de routing dinámico.*

**PRÓXIMAMENTE EN U10:** *Salida a Internet. Las IPs privadas no pueden viajar por la red pública sin traducción. Necesitamos NAT.*

---

## ✅ Criterios de evaluación cubiertos (RA6)

**RA6: Realiza tareas avanzadas de administración de red analizando y utilizando protocolos dinámicos de encaminamiento.**

| CE | Criterio | Cubierto |
|---|---|---|
| g) | Configuración y uso de OSPF en un router | ✅ Configuración OSPF (puntos 6-7) + ⚡ Laboratorio |
| h) | Ruta por defecto con OSPF | ✅ Propagación con `default-information originate` (punto 8) + ⚡ Laboratorio |
| i) | Diagnóstico de incidencias en el encaminamiento | ✅ Escalera de diagnóstico (punto 8) + ⚡ Laboratorio con fallo intencionado |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/09-routing-dinamico) · **Anterior:** [08 · Ruta por defecto y diagnóstico](/ApuntesRedes/09-routing-dinamico/08-ruta-por-defecto-y-diagnostico) · **Siguiente:** **[U10 · NAT y acceso a Internet](/ApuntesRedes/10-nat-internet)**