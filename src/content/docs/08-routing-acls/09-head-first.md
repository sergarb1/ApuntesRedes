---
title: "09 — Head First: consolida lo aprendido"
description: El cierre práctico de la unidad, con router, laboratorio y entrevista 🧭
---

<p><small>El cierre práctico de la unidad, con router, laboratorio y entrevista 🧭</small></p>

> 🗺️ **Estás en:** 🧭 **U08 · Routing y ACLs** → 09 · Head First

---

Has terminado la teoría: ya sabes qué es un router, cómo se configura, cómo decide y cómo ponerle puertas (ACLs). Este cierre es el aterrizaje: el paquete que eres tú entra en el router, un laboratorio de tortura con fallo intencionado y las preguntas que te harán en una entrevista real. Léelo justo después del [punto 8](/ApuntesRedes/08-routing-acls/08-acl-extendida-y-nombrada) y antes de abrir los boletines.

---

## ⭐ Be the Packet, my friend...

> *Eres un paquete IP con destino 8.8.8.8. Has sobrevivido al cable, a los switches y aquí estás: ante la interfaz G0/0 (192.168.1.1/24) de un router llamado R1. Necesitas que te lleven al mundo.* [Recuerda: el destino `8.8.8.8` no es la IP de la interfaz; vas de camino a él.]

**Paso 1:** El router te recibe por G0/0 y mira tu dirección destino: `8.8.8.8`. No es su IP ni pertenece a ninguna de sus redes conectadas.

**Paso 2:** Llega la decisión clave.

**¿Qué hace el router?**
1. **Consultar su tabla de rutas en busca de una coincidencia (específica o por defecto)** → ✅ ¡Correcto! El router busca el longest prefix match: primero una ruta concreta a 8.8.8.8 y, si no la hay, la ruta por defecto 0.0.0.0/0.
2. **Gritar "¿alguien conoce a 8.8.8.8?" por todas sus interfaces** → ❌ Los routers no difunden preguntas por la red como los switches con tramas desconocidas. Ellos preguntan a su **tabla**, no a sus vecinos.
3. **Devolverte un ICMP Destination Net Unreachable inmediatamente** → ❌ Solo si no existe ninguna ruta (ni específica ni por defecto). Si hay default, sales por ella.

**Paso 3 (desenlace):** R1 consulta: no hay ruta a 8.8.8.8, pero sí `S* 0.0.0.0/0 via 10.0.0.2`. Te reescribe el frame Ethernet (cambio de MAC origen/destino) y te lanza por G0/1 hacia R2. Tu IP destino no ha cambiado ni un bit: solo cambió el envoltorio. *Eso* es enrutar.

> 💡 **La lección:** sin rutas — estáticas o dinámicas — en la tabla, R1 te habría devuelto al remitente con "Destination Net Unreachable". Sin rutas, un router no es más que un switch caro.

---

## 🔥 Fireside Chat: Ruta Estática vs Ruta Dinámica

> *Dos rutas discuten en el sofá de la tabla de routing mientras una OSPF vecina de al lado las mira con superioridad.*

**Estática:** — Soy una línea de `ip route`. Me configuran a mano. Sé fija, no cambio. Sin sorpresas.

**Dinámica:** — Yo aprendo automáticamente con mis vecinos. Si un enlace cae, me adapto y converjo. Tú te quedas obsoleta hasta que un humano se acuerde de actualizarte.

**Estática:** — ¡Yo soy predecible! En redes pequeñas soy la mejor opción. Y no consumo ni un byte de ancho de banda con "actualizaciones de rutas".

**Dinámica:** — ¿Ancho de banda? Esa obsesión de antes de OSPF. En redes grandes, sin mí no funcionas. ¿Vas a configurar 200 rutas a mano en 50 routers, una a una? Buena suerte cuando se caiga una.

**Estática:** — Pero si entro en la tabla soy indestructible: nadie me convence de lo contrario. Mi AD es 1, mayor confianza que la tuya (110). Y nadie me inyecta rutas falsas.

**Dinámica:** — *suspira* Y converjo automáticamente cuando algo falla. Tú, estática, te quedas señalando a un destino que ya no existe. Esa ruta que configuraste *a la antigua* sigue viva en tu tabla, mandando tráfico al vacío.

**Estática:** — Hablas de "convergencia" como si fuera un mandamiento. Yo represento al administrador que decide **exactamente** el camino. Una VIP se va por una ruta estática de lujo, no por tu autopista de OSPF.

**Dinámica:** — Vale, te concedo una cosa: en el borde hacia el ISP, tu ruta por defecto es sagrada. Y casi todas las redes reales mezclan ambas: estáticas en los bordes, dinámicas en el núcleo.

**Estática:** — *sonríe* Bienvenida a la vida real, entonces.

**Decisión final:** No ganan ni pierden. Cada una manda donde le toca: las estáticas en los bordes y enlaces críticos; las dinámicas en el núcleo de las redes grandes. Y la ruta flotante (punto 4) es su matrimonio: una de respaldo que despierta cuando la dinámica se duerme.

---

## 🕵️ ¿Quién Soy?

1. Guardo la configuración de arranque del router. No pierdo datos al apagar.
2. Soy una ruta especial hacia 0.0.0.0/0. Atrapo todo el tráfico sin destino específico.
3. Soy una lista de condiciones que permiten o deniegan tráfico basado en IP origen.
4. Soy un tipo de ACL que filtra también por IP destino y puerto.
5. Soy un comando que muestra la tabla de rutas del router.
6. Soy la memoria donde se almacena el sistema operativo del router (IOS).

<details>
<summary>🔄 Respuestas</summary>

1. **NVRAM** — Memoria no volátil del router: guarda la startup-config.
2. **Ruta por defecto** (Default route) — También llamada "ruta de último recurso".
3. **ACL estándar** — Filtra solo por IP origen (rango 1-99).
4. **ACL extendida** — Filtra por origen, destino, puerto y protocolo (rango 100-199).
5. **show ip route** — Muestra la tabla de rutas.
6. **Flash** — Almacena el IOS.
</details>

---

## 🤬 CONRAD VS EL MUNDO: "He configurado una ruta estática pero no funciona"

**CONRAD:** — "Vamos a destripar el clásico. *He configurado una ruta estática y no funciona.* Claro que no. Revisa en este orden: 1) ¿Está bien la IP de destino? 2) ¿Está bien la máscara? (no, no vale ponerle /16 'para abarcar más', que luego te doy el PDF). 3) ¿La interfaz de salida existe y está activa? Aquí falla el 80%: la interfaz está *administratively down* porque olvidaste el `no shutdown`. 4) ¿El siguiente salto es accesible? No configures una ruta vía un vecino al que ni siquiera le has hecho `ping`. El orden importa: primero interfaces, luego verificación, luego rutas."

**CONRAD:** — "Y con las ACLs, la joya de la corona: *he puesto permit any y no funciona.* ¡PUES CLARO! Porque el deny any implícito está SIEMPRE al final. Si tu `permit any` está en la línea 10 pero tienes un `deny` en la línea 5, el tráfico se topa con el deny y ni mira tu permit. Las ACLs se evalúan de arriba abajo: cada línea es un muro, y el primero que coincida decide. Tu 'permit any al final' es la salida de emergencia, no la puerta principal."

**La lección:** en routing, el fallo casi nunca está donde tú quieres que esté: primero el `show ip interface brief`, luego el `show ip route`, y solo entonces las lágrimas. En ACLs, el orden de las reglas ES la política.

---

## ⚡ Laboratorio de Tortura: Rutas y ACLs

> **Duración:** 1.5 horas
> **Herramienta:** Packet Tracer

**Escenario:**
- **Router1:** conectado a la LAN1 (192.168.1.0/24) y a Router2 por enlace serie (10.0.0.0/30).
- **Router2:** conectado a la LAN2 (192.168.2.0/24) y a Internet (simulado como otro router).

**Tareas:**
1. Configura IPs en todas las interfaces y actívalas (`no shutdown`). Verifica con `show ip interface brief`.
2. Configura rutas estáticas en ambos routers para que LAN1 y LAN2 se vean (puntito 3 al pie de la letra).
3. Configura la ruta por defecto en Router2 hacia Internet (puntito 4).
4. Configura una ACL estándar en Router1 que permita **solo a 192.168.1.10** acceder a la LAN2. (¿Dónde la applies? Cerca del destino, recuerda.)

**Fallo intencionado:** en la tarea 2, configura la ruta a la LAN vecina con la máscara **incorrecta**: en lugar de `/24` (`255.255.255.0`), usa `/16` (`255.255.0.0`) solo en una de las rutas.

> **Explicación del efecto:** una máscara /16 abarca 65.536 direcciones, mientras que tu LAN2 real solo ocupa 254 (una /24). La ruta mal escrita no coincide con nada útil: el router de R1 mirará la tabla y verá una supuesta red 192.168.2.0/16 que en realidad es un trozo del rango privado. El resultado es tráfico que se intenta enrutar hacia destinos que no existen, o reenvíos a redes equivocadas, porque el router no sabe que el destino real es la /24. Al cambiar la máscara a /24, la ruta coincide y la red despierta. Diagnóstico: `show ip route | include 192.168.2` muestra la ruta "fantasma" con la máscara /16.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Static Route Pro** | Configurar rutas estáticas en 3 routers para que todas las LANs se vean |
| 🏅 **ACL Architect** | Diseñar e implementar una ACL extendida que permita HTTP pero bloquee SSH |
| 🏅 **Troubleshooter** | Diagnosticar por qué una ruta estática no funciona (interfaz down, máscara incorrecta, etc.) |
| 🏅 **Routing Table Reader** | Leer e interpretar la tabla de rutas de un router Cisco |

---

## 🧠 Atrévete a Pensar

1. ¿Cuántas rutas estáticas necesitas para conectar 3 routers en línea (cada uno con su LAN)?
2. ¿Qué orden se evalúan las ACLs? ¿Qué implica eso?
3. ¿Qué diferencia hay entre ACL estándar y extendida?
4. ¿Dónde se aplica una ACL: en la interfaz de entrada o de salida? ¿Cómo se decide?
5. ¿Qué es la distancia administrativa? ¿Para qué sirve?

<details>
<summary>💡 Soluciones</summary>

1. **Cada router necesita:** 1 ruta para cada LAN remota + 1 ruta por defecto. Para 3 routers en línea con sus LANs: el del medio necesita 2 rutas (a las LANs de los extremos), los de los extremos 1 cada uno si usan la por defecto hacia el centro. Sin por defecto, son 2 por extremo + 2 del centro = 6 rutas en total (más las defaults de salida si las hubiera).
2. **Orden secuencial, de arriba a abajo.** Se evalúa línea por línea; en cuanto una coincide, se aplica su acción y se detiene la búsqueda. Implica que **el orden ES la política**: una regla general colocada antes que una específica se "come" al resto. Al final siempre hay un `deny any` implícito.
3. **Estándar:** filtra solo por IP origen (números 1-99). **Extendida:** filtra por origen, destino, protocolo y puerto (números 100-199). Además, la colocación recomendada difiere: estándar cerca del destino, extendida cerca del origen.
4. **Inbound:** el tráfico se evalúa **antes** de enrutarse (a la entrada de la interfaz). **Outbound:** se evalúa **después** de enrutarse, antes de salir por la interfaz. Se decide según el objetivo: bloquear lo que entra a tu red (inbound en la interfaz exterior) o restringir lo que sale (outbound en la interfaz exterior).
5. **Distancia administrativa (AD):** mide la fiabilidad de la fuente de una ruta. Rutas conectadas AD=0, estáticas AD=1, OSPF AD=110, RIP AD=120. A menor AD, más preferida. Sirve para desempatar cuando dos fuentes distintas anuncian la misma ruta.
</details>

---

## 🧩 Crucigrama de Bits

```
Horizontal:
1. Ruta hacia 0.0.0.0/0 (7+6 letras, 2 palabras)
4. Memoria que guarda la configuración al apagar (6 letras)
5. ACL que permite filtrar por IP origen, destino y puerto (9 letras)
7. Protocolo que filtra una ACL extendida (3 letras)
8. Comando para guardar la configuración (5 letras)

Vertical:
2. Comando para ver la tabla de rutas (3+2+5 letras, 3 palabras)
3. Interfaz del router "administrativamente caída" (8 letras)
6. Rango de ACLs estándar (1-__) (2 dígitos)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. DEFAULTRUTE, 4. NVRAM, 5. EXTENDIDA, 7. TCP, 8. WRITE
**Vertical:** 2. SHOWIPROUTE, 3. SHUTDOWN, 6. 99

</details>

---

## 💬 Preguntas de Entrevista de Trabajo

1. **"Configure un router con 2 interfaces, 2 rutas estáticas y una ruta por defecto."** (pregunta práctica: te dan una pizarra o un simulador, no respuestas de memoria)
2. **"¿Cuál es la diferencia entre una ACL estándar y una extendida?"**
3. **"¿Cómo harías para bloquear el acceso a YouTube en horario laboral?"** (ACL por horario)
4. **"¿Qué pasa si configuras `ip route 0.0.0.0 0.0.0.0` sin una ruta específica?"**
5. **"Explica la diferencia entre una ACL inbound y outbound. ¿Cuál usarías para bloquear tráfico entrante a tu red?"**

> 💡 **Cómo encararlas:** la 1 es práctica: dibuja la topología, sube por los modos (`enable` → `configure terminal` → hostname → interfaces con `no shutdown` → `ip route`) y verifica con `show ip route`. La 3 es la pregunta estrella: respóndela con la receta completa (`time-range LABORAL` → `periodic weekdays 9:00 to 18:00` → ACL nombrada `deny ... time-range` → `permit ip any any` → aplicar outbound en la interfaz hacia Internet). Si la sueltas entera y ordenada, ya eres medio administrador.

---

## 🤷 No hay preguntas tontas

> ❓ **¿Cuál es la diferencia entre una ACL estándar y una ACL extendida?**

Una ACL estándar filtra el tráfico basándose únicamente en la dirección IP de origen, mientras que una ACL extendida permite filtrar por dirección IP de origen **y destino**, protocolo y puerto. Por esta razón, las ACL estándar se aplican lo más cerca posible del **destino** (para no descartar tráfico con destinos inocentes de por medio) y las ACL extendidas se colocan cerca del **origen** (para descartar el tráfico no deseado cuanto antes y ahorrar ancho de banda).

> ❓ **¿Qué es una wildcard mask?**

Es el inverso de la máscara de subred. `0.0.0.255` significa "coincide cualquier IP en los primeros 24 bits" (como /24). `0.0.0.0` significa "coincide solo esta IP exacta" (host). En las ACLs se usa para definir qué bits de la IP deben coincidir exactamente y cuáles quedan libres. Truco: elabora la wildcard restando cada octeto de la máscara a 255.

> ❓ **¿Por qué se dice que las ACLs tienen un deny any implícito al final?**

Porque si ninguna línea de la ACL coincide con el tráfico, el paquete se descarta automáticamente. Es una medida de seguridad: si no has permitido explícitamente algo, está denegado. Por eso, las ACLs deben tener al menos un `permit` al final si quieres permitir tráfico no explicitado, y por eso un `deny` mal colocado (arriba) puede volver inútil un `permit` que está más abajo.

> ❓ **¿Las ACLs afectan el rendimiento del router?**

Sí. Cada paquete se evalúa contra las líneas de la ACL hasta encontrar una coincidencia: cuantas más líneas y más tráfico, más CPU consume. Por eso conviene ordenar las reglas más frecuentes arriba. En routers modernos, el procesamiento de ACLs suele hacerse en hardware (ASIC), minimizando el impacto, pero una ACL mal diseñada (cientos de líneas desordenadas) sigue siendo un lastre en equipos con poco músculo.

---

## 🎬 Post-Créditos

El router consulta su tabla de rutas y encuentra la ruta hacia el destino: una estática hacia la LAN vecina y la por defecto hacia el mundo. Antes de reenviar el paquete, las ACLs aplicadas en la interfaz evalúan el tráfico línea por línea. Si la IP origen no está autorizada según las reglas configuradas, el paquete se descarta en silencio: nadie recibe una notificación, solo el contador de la ACL sube una unidad. Las ACLs dan ese control granular sobre qué tráfico entra y sale de una red. El paquete permitido continúa su viaje, un *hop* más hacia 8.8.8.8, sin saber que detrás de sí ha dejado un router que ha decidido, en microsegundos, que merecía seguir.

**PRÓXIMAMENTE EN U09:** El salto al routing dinámico: los routers dejarán de esperar a que escribas cada ruta y empezarán a hablar entre ellos. OSPF barre el mapa de la red, descubre los caminos, y la convergencia es cosa de segundos. ¿Será la ruta dinámica tan lista como presume? 🗣️

---

## ✅ Criterios de evaluación cubiertos (RA4)

**RA4: Administra las funciones básicas de un router estableciendo opciones de configuración.**

| CE | Criterio | Cubierto |
|---|---|---|
| a) | LEDs del router | ✅ Componentes y estado de interfaces (puntos 1-2, ⚡ Laboratorio tarea 1) |
| b) | Acceso a configuración | ✅ Modos CLI, consola y VTY+SSH (puntos 1-2) |
| c) | Secuencia de arranque | ✅ POST → Boot ROM → IOS → startup-config (punto 1) |
| d) | Comandos de configuración | ✅ `hostname`, `enable secret`, `ip address`, `no shutdown` (punto 2 + ⚡ Laboratorio) |
| f) | Rutas estáticas | ✅ `ip route`, ruta por defecto y flotante (puntos 3-4 + ⚡ Laboratorio) |
| i) | Filtrado de tráfico (ACLs) | ✅ Concepto, tipos y colocación (puntos 6-7) |
| j) | Listas de control de acceso | ✅ Estándar, extendida, nombrada, time-range (puntos 7-8 + ⚡ Laboratorio) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/08-routing-acls) · **Anterior:** [08 · ACL extendida y nombrada](/ApuntesRedes/08-routing-acls/08-acl-extendida-y-nombrada) · **Siguiente:** **[U09 · Routing dinámico](/ApuntesRedes/09-routing-dinamico)**