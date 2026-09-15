---
title: 02 — Los aparatitos
description: Desmitificando el hardware que hay en tu salón 🔧
---

<p><small>Desmitificando el hardware que hay en tu salón 🔧</small></p>

> 🗺️ **Estás en:** 🚪 **U01 · Introducción** → 02 · Los aparatitos

---

## 📬 La idea en una frase

> **Los dispositivos de interconexión son los intermediarios que dirigen el tráfico de la red; sin ellos, los ordenadores tendrían cables conectados, pero serían incapaces de saber a quién enviarle la información.**

---

## 📦 Rompiendo el mito de la "Caja Blanca"

Casi todos los alumnos llegan el primer día pensando que saben qué es un router porque tienen uno en el salón de casa. Pero ese aparato que tu operadora te instaló y que tu madre llama "el router", es en realidad **tres aparatos metidos en un solo cuerpo** (hace tres funciones distintas a la vez):

1. **El Módem**: Es el traductor. Coge la señal "rara" que llega de la calle por parte de la compañía telefónica y la traduce a datos digitales que tu red local puede entender.
2. **El Router**: Es el director. Une la red de tu casa con la red del operador (y a través de él, con el resto del mundo).
3. **El Punto de Acceso (AP)**: Es la antena. Se encarga de convertir la red de cable en señal inalámbrica para repartir la conexión por el aire en forma de Wi-Fi.

En un instituto o en una empresa, estas tres piezas no van juntas en una cajita de plástico barato. Son **equipos separados y especializados**: un router de chapa en el armario de comunicaciones, varios switches en los racks y antenas (Puntos de Acceso) colgadas por los techos de los pasillos.

---

## ⚔️ Switch vs. Router: La batalla del aula

Si hay dos aparatos que debes diferenciar desde hoy, son estos dos. Ambos conectan cosas, pero en "ligas" diferentes:

| Aparato | 🧠 ¿Qué hace exactamente? | 🏘️ La analogía del barrio |
|---|---|---|
| **Switch** | Conecta los equipos que pertenecen a una misma red local (LAN). | Es la centralita que pone en contacto a los vecinos del mismo edificio. |
| **Router** | Une redes distintas entre sí y decide la ruta hacia el exterior. | Es el control de fronteras que te permite salir de tu barrio hacia otras ciudades. |

> 💡 **Truco de memoria:** Si quieres conectar 15 PCs en un aula para que juguen o se pasen archivos entre ellos, solo necesitas un **Switch**. Si quieres que esos 15 PCs puedan entrar a Google, necesitas añadir un **Router** para que les abra la puerta hacia Internet.

---

## 🔌 El medio físico: Cable (RJ45) vs. El Aire (Wi-Fi)

Los datos necesitan una "carretera" para viajar entre los dispositivos. Las dos formas más comunes que te vas a encontrar son:

- **Cable RJ45**: Es el conector y el cable de red clásico. Es la carretera visible, directa y por donde los datos corren de forma rápida y sin interferencias.
- **Wi-Fi**: Es una forma de transmitir datos por el aire, sin cables físicos. Es el camino invisible.

### 🚨 Ojo novato: Wi-Fi ≠ Internet

Este es el malentendido que más vas a tener que corregir a los usuarios como futuro técnico: **Tener Wi-Fi no significa tener Internet**.

- El **Wi-Fi** es solo *la manera de conectarte* al Punto de Acceso de tu casa o instituto.
- **Internet** es *hacia dónde* te conectas una vez estás dentro de la red.

Cuando el móvil tiene el icono del Wi-Fi a tope pero los mensajes de WhatsApp no salen, significa que tu conexión interna (hacia el Punto de Acceso) está perfecta, pero la salida al exterior (el Router o el operador) está caída.

---

## ✅ Resumen en 3 frases

1. La "caja" de tu casa es en realidad un 3 en 1: hace de módem (traduce), de router (te saca a Internet) y de punto de acceso (reparte el Wi-Fi).
2. El **Switch** sirve para conectar los equipos de tu propia red local, mientras que el **Router** sirve para conectar tu red con otras redes exteriores.
3. El Wi-Fi es solo la tecnología para conectar tu dispositivo a la red por el aire; puedes tener el Wi-Fi conectado perfectamente y seguir sin conexión a Internet.

---

## 🔥 Fireside Chat: Router doméstico vs Router empresarial

> *Dos routers de distintos mundos se encuentran en un congreso de networking.*

**Router doméstico:** — Mira, yo hago todo: módem, router, AP, firewall, DHCP... soy un juntaTODO. El usuario me enchufa y le doy WiFi en toda la casa.

**Router empresarial:** — *suspiro* Todo en una cajita de plástico, ¿eh? Yo soy módulo: cada pieza va por separado. Un switch de 48 puertos aquí, un firewall de chapa acá, un AP en cada planta. ¿Sabes por qué? Porque cuando tu cajita se calienta y se cuelga, el cliente llama gritando. Cuando yo falla un módulo, el resto sigue funcionando.

**Router doméstico:** — Pero soy barato.

**Router empresarial:** — Siempre el mismo argumento.

---

## 🕵️ ¿Quién Soy?

Adivina qué dispositivo de red soy:

1. **Soy la caja de 3 en 1** que la operadora te instala en casa. El usuario me llama "router", pero hago tres trabajos a la vez.
2. **Conecto los PCs de un aula entre sí.** Cuando no sé quién eres, inundo la red, pero luego aprendo MACs y ya no molesto.
3. **Soy la antena** que cuelga del techo del pasillo y reparte WiFi por los aires.

<details>
<summary>🔄 Respuestas</summary>

1. **Módem/router/AP** — la caja todo-en-uno del operador.
2. **Switch** — el que aprende MACs y segmenta la red.
3. **Punto de Acceso (AP)** — el que convierte el cable en WiFi.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "El router de mi casa es un router de verdad"

> *CONRAD, nuestro switch cascarrabias, opina sobre los "routers" domésticos.*

**CONRAD:** — ¡OTRA VEZ! Viene un alumno y me dice: *"CONRAD, en casa tengo un router que me da WiFi a 300 megas."* Y yo: vale, siéntate. Esa cajita que te instaló la compañía **no es un router**. Es un módem-router-AP-DHCP-firewall todo metido en un brik de plástico que se calienta si lo miras mal. Un router **de verdad** cuesta más que tu portátil y vive en un armario de comunicaciones con ventiladores que hacen ruido como un avión. ¿Sabes cuál es la diferencia? El tuyo hace todo a medias. El mío hace una cosa, y la hace bien.

**La lección:** no confundas la cajita del operador (un equipo doméstico todo-en-uno) con los equipos reales de un centro de datos. En el instituto, el módem, el router, el switch y el AP son **equipos separados, especializados y profesionales**.

---

## ⚡ Laboratorio de tortura: Identifica los aparatos

> **Duración estimada:** 15 minutos
> **Herramienta:** Solo necesitas mirar el armario de comunicaciones de tu instituto (o las fotos de Packet Tracer)

**El escenario:** El administrador te da una foto del armario de comunicaciones y te dice: *"Identifica qué es cada cosa."*

**Fallo intencionado:** el administrador ha conectado un cable de red entre dos puertos del **mismo switch**. Visualmente, el cable va de un puerto a otro del mismo aparato.

**Tu tarea:** identificar el módem, el router, el switch y el AP. Detectar el cable que sobra.

**Pistas (no antes de intentar):**

1. El módem tiene un cable coaxial o de fibra entrando desde la calle. El router tiene un cable saliendo hacia el módem.
2. El switch tiene muchos cables saliendo hacia los PC del aula.
3. Si un cable va de un puerto del switch a otro puerto del mismo switch, es un **loop** (bucle): eso crea tormentas de broadcast.

> ⚠️ **El fallo es: cable en loop dentro del switch.** Solución: desconectar uno de los dos extremos. Esto se estudiará en profundidad en la U07 (STP).

---

## 🏆 Logros de esta sección

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Identificador visual** | Saber distinguir un módem, un router, un switch y un AP en un armario real |
| 🏅 **Diferenciador WiFi** | Corregir a alguien que dice "tengo WiFi" cuando en realidad tiene Internet |

---

## 🧠 Atrévete a pensar

1. **¿Cuántas funciones hace la "caja" de tu operadora?** Nombra las tres.
2. **¿Qué diferencia hay entre un switch y un router a la hora de mover datos?**
3. **¿Por qué un instituto no usa la "caja" del operador y tiene equipos separados?**

<details>
<summary>💡 Soluciones</summary>

1. **Tres**: módem (traduce la señal del operador), router (une la red con el exterior) y punto de acceso (reparte WiFi).
2. El **switch** mueve datos dentro de la misma red (capa 2, conoce MACs). El **router** mueve datos entre redes distintas (capa 3, conoce IPs y decide rutas).
3. Por **rendimiento, seguridad y escalabilidad**. La caja del operador no da para 300 PC, no tiene puertos suficientes y no gestiona VLANs ni políticas de seguridad.

</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. Traduce la señal del operador a datos digitales (5 letras)
3. Une redes distintas y decide la ruta (6 letras)
5. Convierte el cable en señal inalámbrica (2+2+1+4 letras)

Vertical:
2. Dispositivo que conecta equipos en la misma LAN (6 letras)
4. La cajita todo-en-uno que instala la operadora (6+3 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. MÓDEM · 3. ROUTER · 5. PUNTO DE ACCESO
**Vertical:** 2. SWITCH · 4. MÓDEM ROUTER

</details>

---

## 💬 Preguntas de entrevista de trabajo

> Preguntas reales que te harían para administrador de redes junior.

1. **"¿Qué diferencia hay entre un switch y un router?"**
2. **"Un usuario dice 'tengo WiFi pero no Internet'. ¿Qué le dices?"**
3. **"¿Qué es un módem? ¿Y un punto de acceso?"**
4. **"¿Por qué en un instituto no se usa la 'caja' del operador?"**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Puedo conectar un router después de otro router?**

**Sí, pero con cuidado.** Si encadenas dos routers, el segundo crea una red interna dentro de la primera (doble NAT). Esto puede dar problemas con juegos, videollamadas y servidores. Lo normal es un solo router y los switches después.

---

> ❓ **¿El WiFi es más lento que el cable?**

**En general, sí.** El WiFi usa ondas de radio que sufren interferencias (paredes, microondas, vecinos). El cable UTP es una autopista cerrada y directa. Si necesitas máxima velocidad y estabilidad, siempre cable.

---

## 🎬 Poscréditos

El módem-router-AP de la oficina del profesor se está calentando otra vez. El switch del armario lo mira con desdén: *"Si te quitaras las tres funciones a la vez, no te pondrías tan nervioso..."*. El router le responde: *"Al menos yo no me cuelgo cuando conectan 30 PC a la vez..."*.

**PRÓXIMAMENTE EN 03:** El DNI, el domicilio y el despacho — MAC, IP y Puertos explicados con el servicio de correos. 📮

---

📚 [Volver al índice de la unidad](/ApuntesRedes/01-introduccion) · **Anterior:** [01 · ¿Qué es una red?](/ApuntesRedes/01-introduccion/01-que-es-una-red) · **Siguiente:** [03 · MAC, IP y Puertos](/ApuntesRedes/01-introduccion/03-mac-ip-puertos)
