---
title: "09 — Head First: consolida lo aprendido"
description: El cierre práctico de la unidad, con chicha y diagnóstico real 🧠
---

<p><small>El cierre práctico de la unidad, con chicha y diagnóstico real 🧠</small></p>

> 🗺️ **Estás en:** 🏢 **U07 · VLANs** → 09 · Head First

---

Has terminado la teoría. Este cierre es el aterrizaje: recorre lo aprendido con juegos, un laboratorio real en Packet Tracer y las preguntas que te harán en una entrevista. Léelo justo después del [punto 8](/ApuntesRedes/07-vlans/08-configuracion-y-verificacion) y antes de abrir los boletines. Todo lo que sabes de VLANs se pone aquí del revés: porque olvidar una native VLAN te enseña más que acertarla a la primera.

---

## ⭐ Be the Packet, my friend...

> *Eres un frame Ethernet. Te estás formando en el PC de un empleado de RRHH y viajas hacia el PC del jefe de RRHH, en el otro lado del edificio.*

**Paso 1:** Naces en un PC de la VLAN 20. El switch te recibe en el puerto access y te introduce una etiqueta... te quedas sin palabras: llevas 4 bytes extra, "802.1Q".

**Paso 2:** Revisas tu etiqueta: TPID `0x8100`, prioridad 0 y VLAN ID = 20. "Soy de RRHH", sonríes. El switch te manda por el trunk hacia el otro switch.

**Paso 3:** Sales por Fa0/24, que es **trunk**. En el camino ves miles de tramas como tú viajando apiñadas por el mismo cable: "¿10, 20, 30...? Huy, hay de todo aquí dentro".

**¿Qué haces al llegar al otro lado?**
1. **Dejar que el switch destino mire tu VLAN ID = 20 y te entregue en el puerto access correcto** → ✅ ¡Correcto! En el trunk solo eres etiqueta + payload; el switch destino lee tu VLAN ID y atiende el resto.
2. **Quitar la etiqueta tú mismo y cruzar como una trama normal** → ❌ No. Las tramas no se autoetiquetan ni se auto-desetiquetan: es el switch el que añade y quita la etiqueta y recalcula el FCS.
3. **Salir por cualquier puerto e intentar convencer al receptor** → ❌ Te entregarían en la VLAN equivocada... o peor, si la entregara un puerto trunk, a nadie.

> 💡 **¿Sabías que el trunk tiene una VLAN "impresentable"?** La **native VLAN no se etiqueta**: sus tramas viajan con la etiqueta 802.1Q *ausente*. Si en un extremo la native es 99 y en el otro 1, esas tramas "peladas" caen en VLANs distintas: es el clásico *Native VLAN mismatch* que verás en el laboratorio.

---

## 🔥 Fireside Chat: VLAN Estática vs VLAN Dinámica

> *Dos VLANs discuten en la sala de servidores mientras las luces del rack parpadean.*

**Estática:** — Yo asigno puertos manualmente. Puerto 1-10 = VLAN 10. Simple, claro, predecible. Si conectas un cable en el puerto 5, sé exactamente qué VLAN es. Sin sorpresas.

**Dinámica:** — Yo uso la MAC del dispositivo. Da igual dónde se conecte, siempre caerá en su VLAN. Más flexible que tu puerto fijo, ya me dirás.

**Estática:** — Flexible, dices. ¿Y cuando cambias la tarjeta de red? La MAC cambia y el dispositivo aparece en la VLAN incorrecta. ¿Quién arregla eso a las 9 de la mañana?

**Dinámica:** — Para eso están los servidores VMPS. Centralizas la asignación: tú defines quién es quién y yo lo respeto en cualquier puerto del campus.

**Estática:** — Un servidor VMPS, claro. ¿Y cuándo se cae el VMPS, incluyen callada? Se te cae el castillo de naipes: nadie sabe en qué VLAN va a caer.

**Dinámica:** — Y cuando el usuario se muda de mesa... ¿vas a cambiar la VLAN del puerto manualmente? A ver, CONRAD, toma nota.

**CONRAD (desde la esquina):** — Nota tomada: el 90% de las redes usa estática, es más simple de operar y no depende de un servidor extra. La dinámica es para campus gigantes con gente moviéndose todo el día. Si tu oficina tiene 40 mesas, no necesitas un VMPS, necesitas un café.

**Estática:** — El café lo pongo yo, que para algo cobro.

---

## 🕵️ ¿Quién Soy?

1. Soy el protocolo que etiqueta las tramas con el número de VLAN en los enlaces troncales.
2. Soy un enlace que transporta tráfico de múltiples VLANs entre switches.
3. Soy una técnica donde un router con una sola interfaz física atiende múltiples VLANs usando subinterfaces.
4. Soy el protocolo que distribuye la base de datos de VLANs entre switches automáticamente.
5. Soy la VLAN que viaja sin etiquetar por el trunk. Por defecto soy la VLAN 1.
6. Soy un switch que puede enrutar entre VLANs sin necesidad de router externo.

<details>
<summary>🔄 Respuestas</summary>

1. **802.1Q** — Estándar de etiquetado VLAN (TPID 0x8100, VLAN ID de 12 bits).
2. **Trunk** — Enlace troncal; transporta varias VLANs por un único cable.
3. **Router-on-a-stick** — Inter-VLAN routing con una interfaz física y subinterfaces `.10`, `.20`…
4. **VTP** — VLAN Trunking Protocol (cuidado con el revision number).
5. **Native VLAN** — La única VLAN sin etiquetar en el trunk (por defecto VLAN 1).
6. **Switch capa 3** — Switch multicapa que enruta entre VLANs con SVIs y `ip routing`.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "He configurado VLANs y ahora nadie se ve"

**CONRAD:** — *Risa malvada.* Clásico. Configuras VLAN10 en el Switch1 y VLAN20 en el Switch2. Conectas los switches por un puerto normal (access). Los de VLAN10 no ven a los de VLAN20. ¡LÓGICO! Necesitas un TRUNK para que las VLANs viajen entre switches. Y no olvides el 802.1Q.

**CONRAD:** — "Y luego: *es que configuré el trunk y sigue sin funcionar*. ¿Seguro que los dos extremos tienen la misma native VLAN? ¿Seguro que permites las VLANs correctas en `allowed vlan`? ¡Ah! Y si tienes VTP, cuidado con el revision number. Que cuando borras todas las VLANs sin querer... acuérdate de mí."

**CONRAD:** — "Y no me habléis de los del `dynamic desirable`. Dejáis el puerto con DTP por defecto y un portátil cualquiera negocia un trunk y os pasea por todas las VLANs. ¿Que es mucho lío? No, es una línea: `switchport mode access` + `switchport nonegotiate`. Y ya."

**La lección:** La configuración de VLANs es un guion de 3 actos: **VLANs creadas** → **trunk bien hecho** (native igual y `allowed` correcto) → **routing** para cruzar de VLAN. Si algo falla, recuerda el orden de diagnóstico del punto 8: `show vlan brief` → `show interfaces trunk` → `show ip interface brief`.

---

## ⚡ Laboratorio de Tortura: Segmentación por departamentos

> **Duración:** 1 hora
> **Herramienta:** Packet Tracer

**Escenario:**
- Switch1: puertos 1-5 = VLAN 10 (Ventas), puertos 6-10 = VLAN 20 (RRHH)
- Switch2: puertos 1-5 = VLAN 10, puertos 6-10 = VLAN 20
- Conexión entre switches: trunk 802.1Q
- Router conectado al Switch1 para inter-VLAN routing (router-on-a-stick)

**Tareas:**
1. Configura las VLANs en ambos switches.
2. Configura el trunk entre switches.
3. Configura el router con subinterfaces (VLAN10 y VLAN20).
4. Verifica que PCs de distintas VLANs se vean (a través del router).

**Fallo intencionado:** Configura el trunk pero con native VLAN diferente en cada extremo: **Switch1 native 99, Switch2 native 1**. Verás que algunos paquetes se pierden o llegan a la VLAN incorrecta. El diagnóstico: `show interface trunk` muestra la discrepancia.

> **Pista 1:** tras configurarlo, ejecuta `show interface trunk` en **ambos** switches. Busca la línea *"Native VLAN mismatch discovered on Fa0/24"*. Ahí está toda la incidencia.
>
> **Pista 2:** fíjate en qué tramas se rompen: las de la VLAN nativa (tráfico de control, DHCP de esa VLAN) "van y vienen a ratos". Las VLANs **etiquetadas** (10 y 20) suelen sobrevivir: por eso el síntoma es sutil.
>
> **Pista 3:** el arreglo es una sola línea en el Switch2: `switchport trunk native vlan 99`. Repite `show interface trunk` y comprueba que ambos extremos declaran 99.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **VLAN Architect** | Diseñar e implementar VLANs para 4 departamentos en Packet Tracer |
| 🏅 **Trunk Master** | Configurar un trunk 802.1Q y verificar con `show interface trunk` |
| 🏅 **Router-on-a-stick** | Configurar inter-VLAN routing con subinterfaces y verificar conectividad |
| 🏅 **Troubleshooter** | Diagnosticar y arreglar un problema de native VLAN mal configurada |

---

## 🧠 Atrévete a Pensar

1. ¿Cuántas VLANs puedes crear en un switch estándar? ¿Y cuántas pueden estar activas simultáneamente?
2. ¿Qué pasa si dos switches tienen la misma VLAN pero no hay trunk entre ellos?
3. ¿Por qué router-on-a-stick se llama así? ¿Qué alternativa hay?
4. ¿Cuándo usarías un switch capa 3 en lugar de router-on-a-stick?
5. ¿Qué riesgo de seguridad tiene VTP?

<details>
<summary>💡 Soluciones</summary>

1. El estándar 802.1Q dedica **12 bits** al VLAN ID → 4096 IDs posibles, reservadas 0 y 4095 → **4094 VLANs** como máximo. Pero los switches económicos soportan menos (100-1000 activas a la vez): consulta las especificaciones del modelo. **Dato contexto:** el número no es el problema de diseño habitual: son los límites de la tabla MAC y de STP/RSTP por instancia.
2. **No se comunicarán entre switches.** Los puertos access no transportan etiquetas VLAN: la trama sale de Ventas en el Switch1 y, al cruzar por un puerto no-trunk, llega como "VLAN por defecto". Necesitas un **trunk** con `allowed vlan` (punto 3) para que la VLAN 10 de un lado llegue a la del otro.
3. Por el símil de **una sola interfaz física ("el palo") con varias subinterfaces lógicas ("las pelotas") girando alrededor** para distintas VLANs. La alternativa es el **switch de capa 3 con SVIs**, que enruta en hardware sin el cuello de botella de la interfaz única.
4. Cuando **el tráfico entre VLANs es intenso** (decenas o cientos de VLANs o altas tasas): el router-on-a-stick se ve limitado por una única interfaz (punto 4 y 5). En oficinas pequeñas, el router-on-a-stick basta y es más barato.
5. **VTP puede borrar toda la base de datos de VLANs de la red.** Si conectas un switch con *revision number* más alto que el server actual, su base de datos (posiblemente vacía) se propaga a todos los switches y las VLANs desaparecen. Mitigación: VTP transparent / VTPv3 off y comprobar `show vtp status` antes de conectar equipo usado.

</details>

---

## 🧩 Crucigrama de Bits

```
Horizontal:
1. Estándar de etiquetado VLAN (número + letra)
4. Enlace que transporta múltiples VLANs (5 letras)
5. Switch que puede enrutar entre VLANs (4+3 letras)
7. VLAN que no se etiqueta en el trunk (6 letras)
8. Comando para la native VLAN (6 letras)

Vertical:
2. Protocolo de administración centralizada de VLANs (3 letras)
3. Configuración router para inter-VLAN con una interfaz (4+2+4 letras, con guiones)
6. Bits del campo VLAN ID en 802.1Q (2 dígitos)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. 8021Q, 4. TRUNK, 5. CAPA3, 7. NATIVE, 8. SWITCHPORT
**Vertical:** 2. VTP, 3. ROUTER-ON-A-STICK, 6. 12

</details>

---

## 💬 Preguntas de Entrevista de Trabajo

1. **"¿Cómo separarías el tráfico de dos departamentos que comparten el mismo switch?"**
2. **"Explica qué es un trunk y por qué es necesario."**
3. **"¿Cómo harías que PCs de diferentes VLANs se comuniquen?"**
4. **"¿Ventajas y desventajas de VTP?"**
5. **"¿Qué es la native VLAN? ¿Qué problema puede causar si está mal configurada?"**

> 💡 **Cómo encararlas:** la 3 es la "pregunta reina". Recorre el mismo camino del ⭐ Be the Packet: VLANs aíslan en capa 2 → hacen falta el trunk (para que viajen) y el **router** (router-on-a-stick con subinterfaces `dot1Q`) o un **switch capa 3 con SVIs**. Si mencionas además la verificación con `show interfaces trunk`, ya eres medio administrador. En la 5 no olvides el *mismatch*: native distinta en cada extremo = tramas sin etiquetar que caen en la VLAN equivocada.

---

## 🤷 No hay preguntas tontas

> ❓ **¿Puede un dispositivo tener una IP en la VLAN 10 y otra en la VLAN 20?**

Sí, pero requiere que el dispositivo tenga al menos dos interfaces de red **físicas o virtuales**, cada una asignada a una VLAN diferente (es lo que hace un router con dos puertos en el switch). También es posible con una única interfaz configurada como trunk 802.1Q y subinterfaces lógicas en el router, técnica conocida como **router-on-a-stick**. En máquinas virtuales, el hipervisor puede asignar varias interfaces virtuales a distintas VLANs (trunking virtual). Y en el switch de capa 3, los **SVIs** (`interface vlan 10` y `interface vlan 20`) son exactamente eso: varias "IPs virtuales" que conviven en el mismo chip.

> ❓ **¿Cómo sé en qué VLAN está un puerto?**

Con `show vlan brief` en el switch: muestra todas las VLANs y qué puertos están asignados a cada una. Para tráfico más fino, `show interfaces fa0/5 switchport` te dice el modo (access/trunk), la VLAN de acceso y la native. Y si dudas de si el puerto es trunk: `show interfaces trunk`.

> ❓ **¿VLAN 1 es insegura?**

No es insegura intrínsecamente, pero es la **VLAN por defecto**: todos los puertos arrancan en ella y se usa como native VLAN, así que concentra todo el tráfico "mal clasificado". Por seguridad: **cambia la native** a un número no estándar (por ejemplo 99 o 999), **deshabilita DTP** y **no uses VLAN 1 para datos** (punto 7). Así un double tagging o un mismatch no te alcanza tan fácil.

> ❓ **¿Puedo tener 5000 VLANs en un switch?**

Número mágico: el estándar 802.1Q permite hasta **4094 VLANs** (IDs 1-4094, reservadas 0 y 4095). Pero los switches tienen **límites de hardware** que van más allá del estándar: cientos de VLANs activas a la vez, límites de SVIs, de instancias STP/MST y de tamaño de tabla MAC. La respuesta correcta en una entrevista es: "el estándar da 4094, pero la realidad depende del modelo; se mira **en la hoja de especificaciones**, no en la ISO".

---

## 🎬 Post-Créditos

Las VLANs segmentan la red de forma efectiva: el tráfico de Ventas no es visible para RRHH, y el departamento de IT permanece aislado de Dirección. Sin embargo, la segmentación lógica no es una solución de seguridad completa: la conexión de dispositivos externos o no autorizados puede introducir riesgos (VLAN hopping, native VLAN mal puesta, VTP desbocado) que las VLANs por sí solas no mitigan. Por eso el administrador moderno configura el switch "de entrada": puertos access, DTP apagado, native VLAN alta y VTP en *off*.

**PRÓXIMAMENTE EN U08:** Las VLANs separan la red por departamentos... y ahora toca decidir **quién puede cruzar** esas fronteras. En la U08 el routing entre redes y las **ACLs** se encargan de que no todo el mundo llegue a todo: configurarás el protocolo de rutas, filtraremos el tráfico y veremos cómo un router "educado" dice que no a los paquetes no deseados.

---

## ✅ Criterios de evaluación cubiertos (RA5)

**RA5: Configura redes locales virtuales identificando su campo de aplicación.**

| CE | Criterio | Cubierto |
|---|---|---|
| a) | Ventajas de VLANs | ✅ Motivación, tabla de ventajas y dominios de broadcast (puntos 1-2) |
| b) | Implementación de VLANs | ✅ Configuración access/trunk en el ⚡ Laboratorio y puntos 2 y 8 |
| c) | Diagnóstico de incidencias | ✅ Fallo intencionado de native VLAN + `show interfaces trunk` |
| d) | Enlaces troncales | ✅ Trunk 802.1Q y native VLAN (puntos 3 y 8) |
| e) | Inter-VLAN con router | ✅ Router-on-a-stick y SVI en el ⚡ Laboratorio |
| f) | Protocolos centralizados (VTP) | ✅ Modos, revision number y riesgos (punto 6) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/07-vlans) · **Anterior:** [08 · Configuración y verificación](/ApuntesRedes/07-vlans/08-configuracion-y-verificacion) · **Siguiente:** **[U08 · Routing y ACLs](/ApuntesRedes/08-routing-acls)**