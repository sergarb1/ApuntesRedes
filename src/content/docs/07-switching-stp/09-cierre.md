---
title: "09 — Cierre: consolida lo aprendido"
description: El cierre práctico de la unidad, con bucles y diagnóstico real 🧠
---

<p><small>El cierre práctico de la unidad, con bucles y diagnóstico real 🧠</small></p>

> 🗺️ **Estás en:** 🔀 U07 → 09 · Cierre

---

Has terminado la teoría. Este cierre es el aterrizaje: recorres lo aprendido con juegos, un laboratorio real con Packet Tracer y las preguntas que te harán en una entrevista. Léelo justo después del [punto 8](/ApuntesRedes/07-switching-stp/08-port-security) y antes de abrir los boletines.

---

## ⭐ Sé el Switch

> *Eres un switch Cisco de 24 puertos. Acaban de conectarte 5 PCs. Tu tabla MAC está vacía.*

**Escenario:** Llega una trama por el puerto 1 con MAC origen `AA:AA:AA:AA:AA:AA` y MAC destino `BB:BB:BB:BB:BB:BB`.

**¿Qué haces?**

1. **Aprendes que `AA:AA:AA:AA:AA:AA` está en el puerto 1. Buscas `BB:BB:BB:BB:BB:BB` en tu tabla. No está. Reenvías la trama por todos los puertos excepto el 1.** → ✅ Exacto. Así aprenden los switches.
2. **La descartas porque no conoces la MAC destino** → ❌ Un switch inunda cuando no conoce la MAC destino. Eso es lo correcto.
3. **La reenvías solo al puerto 1** → ❌ No, la recibió por el 1, no la reenvía por el mismo puerto.

---

## 🔥 Fireside Chat: Hub vs Switch

> *Se encuentran en un armario de comunicaciones abandonado.*

**Hub:** — Todavía me usan en algunos sitios. Para monitorización de tráfico, soy útil: como repito todo, ves todo el tráfico.

**Switch:** — Técnicamente tienes razón. Los puertos SPAN (port mirroring) hacen lo mismo sin necesidad de ti. Y además, conmigo no pierdes rendimiento.

**Hub:** — Pero soy más barato...

**Switch:** — *Se ríe* ¿Todavía con esa? Un switch de 24 puertos cuesta 30€. En serio, solo te usan en museos.

**Hub:** — Bueno, y en laboratorios de diagnóstico...

**Switch:** — OK, te concedo eso. Y en redes OT (industrial) a veces. Pero en una LAN moderna, no pases por ahí.

---

## 🕵️ ¿Quién Soy?

1. Soy un protocolo que evita bucles en redes con switches. Bloqueo puertos para que no haya caminos redundantes activos.
2. Soy el switch que gana la elección de STP. Todos los demás se organizan alrededor de mí.
3. Soy una técnica de seguridad que limita cuántas MACs pueden aprenderse en un puerto.
4. Soy el estado de un puerto STP que no reenvía tráfico pero escucha BPDUs.
5. Soy la versión rápida de STP. Converjo en 1-3 segundos.
6. Soy la memoria donde el switch guarda las tablas MAC. Permito búsquedas ultrarrápidas.

<details>
<summary>🔄 Respuestas</summary>

1. **STP** (IEEE 802.1D) — Spanning Tree Protocol.
2. **Root Bridge** — El switch elegido como raíz del árbol.
3. **Port Security** — Limita MACs por puerto.
4. **Bloqueo (Blocking)** — Estado STP que previene bucles.
5. **RSTP** — Rapid Spanning Tree Protocol.
6. **Memoria CAM** — Content-Addressable Memory.
</details>

---

## 🤬 CONRAD VS EL MUNDO: "He conectado dos switches y la red ha muerto"

**CONRAD:** — Grito número 1 en mi carrera: "HE CREADO UN BUCLE". Conectas dos switches con DOS cables (por si acaso) y ¡pum! Tormenta de broadcast. La red se colapsa. PCs que no responden. Luces que parpadean como discoteca.

**CONRAD:** — "Y luego: *es que puse dos cables para redundancia*. ¡REDUNDANCIA CON STP! No sin. Si pones dos cables sin STP, creas un bucle. Los paquetes rebotan entre switches hasta saturar la CPU y el ancho de banda. Y el usuario: *Ay, pues no sabía*."

**La solución:** STP. Actívalo siempre. Si tienes enlaces redundantes, STP bloquea los que sobran para evitar bucles. Y si un cable falla, STP desbloquea el de respaldo.

---

## ⚡ Laboratorio de tortura: Bucles y STP

> **Duración:** 1 hora
> **Herramienta:** Packet Tracer

**Escenario:**
1. Conecta 3 switches en triángulo (Switch1-Switch2, Switch2-Switch3, Switch3-Switch1).
2. Conecta un PC a cada switch.
3. Activa STP (por defecto está en muchos switches).

**Tareas:**
a) ¿Cuál es el Root Bridge? (pista: el de menor Bridge ID)
b) ¿Qué puertos están bloqueados?
c) Desconecta el cable entre Root Bridge y otro switch. ¿Qué pasa? (convergencia)
d) Cambia la prioridad de un switch para forzarlo como Root Bridge:
   ```
   Switch(config)# spanning-tree vlan 1 priority 4096
   ```
e) Verifica con `show spanning-tree` el cambio.

**Fallo intencionado:** Desactiva STP en todos los switches con `no spanning-tree vlan 1` y haz un ping continuo entre PCs. Verás cómo el ping falla intermitentemente hasta que la tormenta de broadcast colapsa la red. Luego reactiva STP y observa la recuperación.

**Verificación paso a paso:**

1. Tras montar el triángulo, ejecuta `show spanning-tree` en cada switch. Anota el **Root ID** de cada uno: el switch con el Bridge ID más bajo es el Root Bridge (tarea a).
2. Busca puertos en estado **BLOCKING** (rol Alternate): son los que rompen el bucle (tarea b).
3. Arranca un ping continuo (tarea c), desconecta el cable que une el Root con un switch y observa cómo el ping se reanuda tras los ~30-50 s de convergencia STP.
4. Fuerza el Root con la prioridad 4096 (tarea d) y repite `show spanning-tree`: el Root ID debe cambiar al switch elegido (tarea e).
5. Para el fallo intencionado, desactiva STP, lanza el ping y **cuenta los segundos** hasta que la red colapsa. Reactiva STP (`spanning-tree vlan 1`) y confirma que el ping vuelve a responder.

> 💡 **Diagnóstico:** si el ping muere sin tocar cables, sospecha de un bucle: comprueba que todos los switches tienen STP activo con `show spanning-tree`.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Bucle Breaker** | Configurar STP y demostrar que no hay tormenta de broadcast con enlaces redundantes |
| 🏅 **Root Bridge Master** | Forzar un switch específico como Root Bridge cambiando su prioridad |
| 🏅 **Port Security Pro** | Configurar un puerto para que acepte solo la MAC del PC conectado |
| 🏅 **STP Speedrun** | Explicar los 4 estados STP y el tiempo de cada uno sin apuntes |

---

## 🧠 Atrévete a pensar

1. ¿Cuánto tarda STP en converger por defecto? ¿Y RSTP?
2. ¿Qué es el Bridge ID? ¿Cómo se calcula?
3. ¿Por qué un switch inunda tramas con destino desconocido?
4. ¿Qué diferencia hay entre puerto Root y puerto Designado en STP?
5. ¿Qué ventaja tiene PortFast en un puerto de acceso?

<details>
<summary>💡 Soluciones</summary>

1. **STP: 30-50 segundos** (15s listening + 15s learning + 20s max age). **RSTP: 1-3 segundos**.
2. **Bridge ID** = Prioridad (2 bytes) + MAC del switch (6 bytes). A menor Bridge ID, más posibilidades de ser root.
3. Porque no sabe por dónde está el destino. Inundar garantiza que llegue. Es mejor que descartar.
4. **Root Port**: el mejor puerto hacia el Root Bridge (cada switch no-root tiene 1). **Designated Port**: el mejor puerto en cada segmento (1 por segmento).
5. PortFast permite que el puerto pase directamente a forwarding sin esperar 30 segundos de listening+learning. Esencial en puertos de acceso para que los PCs obtengan IP rápidamente.
</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
3. Estado STP donde el puerto aprende MACs pero no reenvía datos (8 letras)
4. Protocolo que evita bucles en switches (3 letras)
5. Versión rápida de STP (4 letras)
7. Medida en segundos que tarda un puerto STP en pasar a forwarding sin PortFast (2 dígitos)
8. Acción de enviar una trama por todos los puertos menos el origen (7 letras)

Vertical:
1. Switch elegido como referencia en STP (4+5 letras, 2 palabras)
2. Trama de control de STP (4 letras)
6. Tipo de memoria para búsquedas rápidas de MACs (3 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 3. LEARNING, 4. STP, 5. RSTP, 7. 30, 8. INUNDAR
**Vertical:** 1. ROOTBRIDGE, 2. BPDU, 6. CAM
</details>

---

## 💬 Entrevista de trabajo

1. **"¿Qué pasa si conectas dos switches con dos cables sin STP?"**
2. **"Explica cómo elige STP el Root Bridge."**
3. **"¿Cuál es la diferencia entre STP y RSTP?"**
4. **"Configura la seguridad de puerto para que solo la MAC del PC del jefe pueda conectarse."**
5. **"¿Cómo funciona el proceso de aprendizaje de un switch? ¿Qué hace cuando llega una trama con destino desconocido?"**

> 💡 **Cómo encararlas:** la 1 es la "pregunta reina": tormenta de broadcast → bucles → STP. Cuéntala en ese orden: primero el problema, luego la solución. La 4 es la pregunta práctica: `maximum 1` + `mac-address sticky` + `violation shutdown`.

---

## 🤷 No hay preguntas tontas

> ❓ **¿Puedo deshabilitar STP para que la red vaya más rápido?**

Nunca. Sin STP, cualquier bucle (accidental o no) colapsará la red. Si quieres más velocidad, usa RSTP (converge en 1-3 segundos) en lugar de STP clásico (30-50 segundos). Pero nunca lo deshabilites en una red con más de un switch.

> ❓ **¿Qué es errdisable?**

En switches Cisco, **errdisable** es un estado en el que el switch deshabilita automáticamente un puerto cuando detecta una condición de error (BPDUGuard, Port Security violation, etc.). Para recuperar el puerto: `shutdown` + `no shutdown` o configurar `errdisable recovery`.

> ❓ **¿Y si enciendo un switch sin configurar nada, funciona?**

Sí, un switch Cisco sin configurar funciona "out of the box": todos los puertos están en VLAN 1, STP está activo, y el switch empieza a aprender MACs automáticamente. Para una red pequeña, enchufar y listo. Para una red corporativa, necesitarás configurar VLANs (U08), port security, SNMP, y más.

---

## 🎬 Poscréditos

Con STP activo, la red elige un Root Bridge y los switches restantes bloquean los puertos redundantes para prevenir bucles. La red permanece estable incluso con enlaces redundantes. Sin embargo, si un administrador conecta un cable adicional entre dos switches ya enlazados, STP detecta el bucle potencial y bloquea el puerto correspondiente, evitando la temida tormenta de broadcast.

**PRÓXIMAMENTE EN U08:** La oficina está dividida en departamentos. Aprenderemos VLANs para separar tráfico de forma lógica sin necesidad de añadir más switches.

---

## ✅ Criterios de evaluación cubiertos

**RA3: Administra conmutadores estableciendo opciones de configuración para su integración en la red.**

| CE | Criterio | Cubierto |
|---|---|---|
| a) | Conexión de conmutadores | ✅ ⚡ Laboratorio de tortura |
| e) | Tabla de direcciones MAC | ✅ ⭐ Sé el Switch + puntos 1-2 |
| i) | Spanning Tree Protocol | ✅ 🔥 Fireside + 🕵️ ¿Quién Soy? + ⚡ Laboratorio |
| j) | Parámetros de selección del puente raíz | ✅ ⚡ Laboratorio (prioridad 4096) |
| k) | Seguridad en conmutadores | ✅ Port Security + BPDUGuard (punto 8) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/07-switching-stp) · **Anterior:** [08 · Port Security](/ApuntesRedes/07-switching-stp/08-port-security) · **Siguiente:** **[U08 · VLANs](/ApuntesRedes/08-vlans)**