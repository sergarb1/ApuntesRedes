---
title: U09 — Routing dinámico OSPF
description: El router que habla solo 🗣️
---

<p><small>El router que habla solo 🗣️</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 Cable → 🏷️ IP → 🌍 IPv6 → 🔀 Switch → 🏢 VLAN → 🧭 Router → 🗣️ **OSPF** → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*Configurar rutas estáticas manualmente en 50 routers es inviable. Con routing dinámico, los routers intercambian información de forma autónoma y construyen tablas de rutas sin intervención humana. Bienvenido al routing dinámico.*

OSPF: el protocolo que permite a los routers compartir conocimiento de red.

---

## 📚 Contenidos

- Protocolos de routing interior vs exterior (IGP vs EGP)
- RIP vs OSPF: comparativa detallada
- OSPF: áreas, LSDB, LSA, algoritmo SPF (Dijkstra)
- Tipos de routers OSPF: ABR, ASBR, internos, backbone
- Elección de DR/BDR en redes multiacceso
- Coste OSPF: cálculo y configuración
- Configuración OSPF básica y verificación
- Ruta por defecto con OSPF (`default-information originate`)
- Diagnóstico: adyacencias, LSDB, tabla de rutas

---

## 🔄 IGP vs EGP

| Tipo | Ámbito | Ejemplos |
|---|---|---|
| **IGP** (Interior Gateway Protocol) | Dentro de un AS (sistema autónomo) | OSPF, RIP, EIGRP |
| **EGP** (Exterior Gateway Protocol) | Entre AS distintos | **BGP** (el de Internet) |

### RIP vs OSPF vs EIGRP

| Característica | RIP | OSPF | EIGRP (Cisco) |
|---|---|---|---|
| Tipo | Vector distancia | Estado de enlace | Vector distancia avanzado |
| Métrica | Saltos (máx 15) | Coste (ancho de banda) | Compuesta (ancho de banda, retardo, carga, fiabilidad) |
| Convergencia | Lenta (~3 min) | Rápida (< 10s) | Muy rápida |
| Escalabilidad | Pequeña (< 15 routers) | Grande (miles) | Grande |
| Actualizaciones | Cada 30s (completas) | Solo cambios (parciales) | Solo cambios |
| Estándar | Abierto | Abierto (RFC) | Propietario Cisco |

---

## 🌳 OSPF en detalle

OSPF (Open Shortest Path First) es un protocolo de **estado de enlace**. Cada router conoce la topología completa de la red y calcula la mejor ruta usando el **algoritmo de Dijkstra (SPF)**.

### Conceptos clave

| Término | Descripción |
|---|---|
| **LSA** (Link State Advertisement) | Anuncio que cada router genera sobre sus enlaces |
| **LSDB** (Link State Database) | Base de datos con todos los LSAs del área |
| **SPF** (Shortest Path First) | Algoritmo que calcula la ruta más corta desde la LSDB |
| **Área OSPF** | Subdivisión lógica para escalar |
| **Router ID** | Identificador único del router (IP más alta de loopback o interfaces) |
| **Hello** | Paquete OSPF para descubrir y mantener vecinos |

### Tipos de routers OSPF

| Tipo | Función |
|---|---|
| **Internal Router** | Todas sus interfaces en la misma área |
| **ABR** (Area Border Router) | Conecta el Área 0 con otras áreas |
| **Backbone Router** | Router en el Área 0 |
| **ASBR** (AS Boundary Router) | Introduce rutas externas a OSPF (redistribución) |

### Área 0 (Backbone)

Todas las áreas OSPF deben conectarse al **Área 0**. Es el núcleo del sistema OSPF:
- El routing inter-área siempre pasa por el Área 0
- Los ABR conectan áreas periféricas al Área 0
- Si un área no puede conectarse físicamente al Área 0, se necesita un **túnel virtual**

### DR y BDR

En redes multiacceso (Ethernet con varios routers), OSPF elige un **DR** (Designated Router) y un **BDR** (Backup DR) para reducir el número de adyacencias:

```
Sin DR: N*(N-1)/2 adyacencias (cada router con cada uno)
Con DR: N-1 adyacencias (todos con el DR)
```

### Coste OSPF

El coste se calcula como `10^8 / ancho_de_banda`:

| Velocidad | Coste por defecto |
|---|---|
| 10 Mbps | 10 |
| 100 Mbps | 1 |
| 1 Gbps | 1 |
| 10 Gbps | 1 |

Para cambiar el coste manualmente:
```bash
R1(config-if)# ip ospf cost 10
```

---

## ⚙️ Configuración OSPF básica

### Configuración mínima

```bash
R1(config)# router ospf 1
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 192.168.1.0 0.0.0.255 area 0
R1(config-router)# network 10.0.0.0 0.0.0.3 area 0
```

**OSPF process ID** (el 1) es local al router, no necesita coincidir entre routers.

### Configuración multiárea

```bash
R1(config)# router ospf 1
R1(config-router)# network 192.168.1.0 0.0.0.255 area 0      # Backbone
R1(config-router)# network 10.0.0.0 0.0.0.3 area 0            # Backbone

R2(config)# router ospf 1
R2(config-router)# network 10.0.0.0 0.0.0.3 area 0            # Backbone
R2(config-router)# network 10.0.1.0 0.0.0.3 area 1            # Área 1
R2 es ABR (conecta área 0 y área 1)
```

### Propagar ruta por defecto

En el router conectado a Internet:
```bash
R3(config)# ip route 0.0.0.0 0.0.0.0 serial 0/0/0
R3(config)# router ospf 1
R3(config-router)# default-information originate
```

### Comandos de verificación

```bash
R1# show ip ospf neighbor          → Ver vecinos OSPF
R1# show ip ospf database          → Ver LSDB
R1# show ip route ospf             → Rutas aprendidas por OSPF
R1# show ip protocols              → Protocolos de routing activos
R1# debug ip ospf events           → Depurar eventos OSPF
```

---

## ⭐ Sé el Router OSPF

> *Eres un router en área 0 (backbone). Tienes 3 vecinos OSPF. Acaban de añadir una red nueva en un router vecino.*

**¿Qué pasa?**

1. El vecino genera un **LSA** (Link State Advertisement) con la nueva red.
2. Lo envía a todos sus vecinos (flooding).
3. Tú recibes el LSA, actualizas tu **LSDB** (Link State Database).
4. Ejecutas el algoritmo SPF (Dijkstra) para recalcular la mejor ruta.
5. Actualizas tu tabla de rutas.

**Todo en segundos. Sin intervención humana.**

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

---

## ⚡ Laboratorio de Tortura: OSPF multisede

> **Duración:** 1.5 horas
> **Herramienta:** Packet Tracer

**Escenario:** 4 routers en red con 3 áreas: Área 0 (backbone), Área 1 y Área 2.

**Tareas:**
1. Configura OSPF en todos los routers con sus áreas correctas.
2. Verifica las adyacencias con `show ip ospf neighbor`.
3. Propaga una ruta por defecto desde un router conectado a Internet.
4. Cambia el costo de una interfaz para forzar una ruta alternativa.

**Fallo intencionado:** Pon dos routers en áreas diferentes sin conexión al área 0 (ej. Área 1 y Área 2 directamente conectadas). ¿Funciona OSPF? No. Las rutas inter-área siempre deben pasar por el Área 0. Sin conexión al backbone, los routers no intercambiarán rutas entre áreas.

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

## 💬 Preguntas de Entrevista de Trabajo

1. **"¿Qué es OSPF? Explica cómo funciona."**
2. **"Diferencias entre RIP y OSPF. ¿Cuándo usarías cada uno?"**
3. **"¿Qué es el área 0? ¿Por qué es obligatoria?"**
4. **"Configura OSPF en 3 routers con 2 áreas."**
5. **"¿Cómo propagas una ruta por defecto en OSPF?"**

---

## 🎬 Post-Créditos

> *OSPF ha convergido. Todos los routers conocen la topología de red.*

*Un enlace cae. OSPF recalcula en 2 segundos sin intervención humana.*

*La red se auto-repara gracias al protocolo de routing dinámico.*

**PRÓXIMAMENTE EN U10:** *Salida a Internet. Las IPs privadas no pueden viajar por la red pública sin traducción. Necesitamos NAT.*

---

## ✅ Criterios de evaluación cubiertos

**RA6: Realiza tareas avanzadas de administración de red analizando y utilizando protocolos dinámicos de encaminamiento.**

| Criterio | Cubierto |
|---|---|
| g) OSPF en un router | ✅ Configuración OSPF |
| h) Ruta por defecto con OSPF | ✅ Propagación |
| i) Diagnóstico de incidencias | ✅ Fallos intencionados |
