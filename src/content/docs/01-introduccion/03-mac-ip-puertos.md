---
title: 03 — MAC, IP y Puertos
description: El DNI, el domicilio y el despacho de tus dispositivos 📮
---

<p><small>El DNI, el domicilio y el despacho de tus dispositivos 📮</small></p>

> 🗺️ **Estás en:** 🚪 **U01 · Introducción** → 03 · MAC, IP y Puertos

---

## 📬 La idea en una frase

> **Para que los datos lleguen correctamente a su destino, la red necesita saber la identidad fija de la máquina (MAC), en qué red se encuentra en este momento (IP) y a qué programa o servicio concreto van dirigidos esos datos (Puerto).**

---

## 🏠 La analogía del servicio de correos

Vamos a sepultar de una vez el malentendido número uno del oficio: **dirección IP y dirección MAC no son lo mismo**, aunque siempre aparezcan juntas. Piensa en cómo ve tu barrio el cartero:

- **Dirección MAC (La identidad)**: Es el DNI físico y único grabado por el fabricante en la tarjeta de red. Funciona como la matrícula de un coche: no cambia jamás en toda la vida del equipo.
- **Dirección IP (El domicilio)**: Es el "domicilio" lógico de un dispositivo dentro de una red. Funciona como la calle y el número de tu casa, le dice al sistema *dónde* estás dentro de la red. Esta dirección **puede cambiar**: si te mudas de red, el router te entrega una nueva.

> 💡 **Ejemplo real que has vivido:** Enciendes el portátil en tu casa y el router le asigna la IP `192.168.1.10`; te lo llevas al instituto, se conecta a la red del centro y ahora tiene la IP `10.0.0.20`. **La IP ha cambiado porque te has movido de red.** ¿Y la MAC? Sigue siendo la misma matrícula exacta que tenía cuando salió de la tienda.

---

## 🚪 El Puerto: Sabiendo a qué puerta llamar

Ya sabemos llegar al edificio (gracias a la IP) y sabemos qué máquina es (gracias a la MAC). Pero dentro de esa máquina puede haber muchos programas funcionando a la vez (un navegador, un correo, un videojuego). ¿Cómo sabe la red a cuál de ellos entregarle los datos?

Aquí entra el concepto de **Puerto lógico**.

| Concepto Técnico | 🧠 Qué hace | 🏢 La analogía del edificio |
|---|---|---|
| **Dirección MAC** | Identifica el hardware exacto e inmutable. | La matrícula del edificio o buzón fijo. |
| **Dirección IP** | Localiza la máquina en una red concreta. | La calle y el número del edificio. |
| **Puerto lógico** | Identifica el servicio o aplicación concreta. | El número de despacho dentro del edificio. |

### 🚨 Ojo novato: El conflicto de la palabra "Puerto"

En redes, la palabra "puerto" tiene dos significados y suele confundir a los que empiezan:

1. **El puerto físico**: Es el hueco de plástico en la pared o en el switch donde metes el cable de red (RJ45).
2. **El puerto lógico**: Es un número virtual. Cuando un técnico te dice que tienes que *"abrir el puerto 80"* para que funcione una web, no te está pidiendo que vayas a romper un agujero en la pared; se refiere al **número lógico** que identifica a ese servicio de forma virtual dentro de la máquina.

---

## ✅ Resumen en 3 frases

1. La IP explica **dónde está** el equipo en la red (y, por tanto, cambia si te mueves); la MAC explica **qué equipo es** (y no cambia nunca).
2. El **puerto lógico** es el número que identifica a qué servicio o programa van dirigidos los datos dentro de una máquina (como el número de despacho en un gran edificio).
3. Nunca confundas el puerto lógico (el identificador virtual de una aplicación) con el puerto físico (el conector real donde enchufas el cable de red).

---

## 🔥 Fireside Chat: IP vs MAC

> *Una IP y una MAC discuten en la cola del supermercado.*

**MAC:** — Yo nunca cambio. Soy la matrícula de fábrica. Desde que nací en la tarjeta de red, soy la misma. Sin mí, nadie sabe quién soy.

**IP:** — Claro, pero yo llego a donde tú no puedes. Sin mí, no sales de tu barrio. Yo soy la que dice dónde estás AHORA, en esta red.

**MAC:** — ¿Y si te mudas?

**IP:** — Pues me cambian. Normalmente el DHCP me asigna una nueva cuando llego a una red nueva. Tú no cambias nunca, pero si te sacas de tu red, no sirves para nada.

**MAC:** — *suspiro* Al menos sin mí no sale ni un byte de la tarjeta de red.

**IP:** — Es verdad. Somos la pareja perfecta: tú dentro de la LAN, yo fuera hacia el mundo.

---

## 🕵️ ¿Quién Soy?

Adivina qué concepto de red soy:

1. **No cambio nunca.** Soy la matrícula de tu tarjeta de red, grabada de fábrica.
2. **Cambio si me mudo de red.** Soy el domicilio lógico que te asigna el router.
3. **Soy el número de despacho.** Identifico a qué programa van dirigidos los datos dentro de una máquina.

<details>
<summary>🔄 Respuestas</summary>

1. **Dirección MAC** — la identidad física e inmutable.
2. **Dirección IP** — el domicilio lógico que cambia.
3. **Puerto lógico** — el identificador del servicio dentro de la máquina.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "La IP es la MAC"

> *CONRAD, nuestro switch cascarrabias, explota cuando alguien confunde IP y MAC.*

**CONRAD:** — ¡OTRA VEZ! Viene un alumno y me dice: *"CONRAD, la MAC y la IP son lo mismo, ¿no?"* Y yo: **¡NO!** Son como la matrícula de tu coche y la dirección de tu casa. La **MAC** es la matrícula: no cambia nunca, está grabada de fábrica en la tarjeta de red. La **IP** es la dirección: si te mudas de casa, te dan una nueva. ¿Has visto alguna vez que te cambien la matrícula cuando te cambias de piso? ¡Pues eso! La IP cambia; la MAC no. Las dos viajan juntas en cada paquete, pero hacen cosas **distintas**.

**La lección:** IP = domicilio (cambia); MAC = identidad (no cambia). Las dos son imprescindibles, pero no son lo mismo.

---

## ⚡ Laboratorio de tortura: Conflicto de IP

> **Duración estimada:** 20 minutos
> **Herramienta:** Packet Tracer

**El escenario:** Tienes 2 PC conectados a un switch. PC-A tiene IP `192.168.1.10` y PC-B tiene IP `192.168.1.20`. Se hacen ping perfectamente.

**Fallo intencionado:** Cambias la IP de PC-B a `192.168.1.10` (la misma que PC-A). Ahora PC-B no se puede comunicar con nadie.

**Tu tarea:** Diagnosticar por qué PC-B no funciona.

**Pistas (no antes de intentar):**

1. Haz `ping 192.168.1.10` desde PC-A. ¿Responde? *Sí, pero no sabes si responde PC-A o PC-B.*
   <details><summary>¿Y si sigo atascado?</summary>En Packet Tracer, usa el modo Simulación para ver qué PC responde al ARP.</details>

2. ¿Qué pasa en la tabla ARP cuando dos PC tienen la misma IP? *Conflicto: cada vez que una responde ARP, la otra se queda sin comunicación.*

3. **El fallo es: conflicto de IP.** Solución: asignar una IP distinta a cada PC. Si no sabes cuál usar, mira la máscara: en una red `/24`, las IPs válidas son `.1` a `.254`.

> ⚠️ **Lección:** nunca pongas la misma IP a dos PC en la misma red. El servidor DHCP evita esto, pero si configuras a mano, cuidado.

---

## 🏆 Logros de esta sección

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Diferenciador IP/MAC** | Explicar la diferencia entre IP y MAC sin confundirte |
| 🏅 **Puerto Detective** | Saber que el puerto 80 es HTTP y el 443 es HTTPS |
| 🏅 **Cazador de conflictos** | Encontrar el fallo del laboratorio (IP duplicada) |

---

## 🧠 Atrévete a pensar

1. **¿Qué diferencia hay entre un puerto físico y un puerto lógico?** Pon un ejemplo de cada uno.
2. **¿Por qué la IP de tu móvil cambia cuando te conectas a un WiFi diferente?** ¿Y la MAC?
3. **Si tu PC tiene la IP `10.0.0.5` y la máscara `255.255.255.0`, ¿cuántos equipos pueden estar en la misma subred?**

<details>
<summary>💡 Soluciones</summary>

1. **Puerto físico:** el conector RJ45 en el switch o en la pared (el hueco donde metes el cable). **Puerto lógico:** el número 80 (HTTP), el 443 (HTTPS), el 22 (SSH)...
2. Porque al conectarse a un WiFi nuevo, el router le asigna una IP nueva (diferente red = diferente domicilio). La **MAC no cambia**: sigue siendo la misma tarjeta de red.
3. Con máscara `/24`, hay **254 IPs utilizables** (de `.1` a `.254`; `.0` es la red y `.255` es broadcast).

</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. Identificador de fábrica de la tarjeta de red (3 letras)
3. Domicilio lógico de un dispositivo (2 letras)
5. Número virtual que identifica un servicio (6 letras)

Vertical:
2. Dispositivo que asigna IPs automáticamente (5+3+4+3+4+2+6 letras)
4. Cuando dos PC tienen la misma IP (9+6+6 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. MAC · 3. IP · 5. PUERTO
**Vertical:** 2. SERVIDOR DHCP · 4. CONFLICTO DE IP

</details>

---

## 💬 Preguntas de entrevista de trabajo

> Preguntas reales que te harían para administrador de redes junior.

1. **"¿Qué es una dirección MAC? ¿Puede cambiar?"**
2. **"¿Cuál es la diferencia entre un puerto físico y un puerto lógico?"**
3. **"Un usuario tiene WiFi pero no le funciona nada. ¿Cómo diagnosticas en 30 segundos?"**
4. **"¿Qué es un conflicto de IP? ¿Cómo lo solucionas?"**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Puedo asignar cualquier IP a mi PC?**

Puedes teclear lo que quieras, pero si no pertenece a la **misma subred** que tus vecinos, nadie te escuchará: las tramas hacia ti serán ignoradas. La configuración correcta es la que encaja con la red donde estás (IP + máscara + gateway + DNS).

---

> ❓ **¿Cómo sabe mi PC la MAC del router?**

Con el protocolo **ARP** (Address Resolution Protocol). Cuando tu PC quiere hablar con el router, envía un mensaje de difusión preguntando: *"¿Quién tiene la IP 192.168.1.1?"*. El router responde con su MAC, y tu PC la guarda en su tabla ARP para no tener que preguntar cada vez.

---

## 🎬 Poscréditos

La MAC y la IP se encuentran en la cola del supermercado. La MAC mira alrededor y dice: *"¿Estamos en la misma red?"*. La IP responde: *"Depende... ¿cuál es tu subred?"*. Si no encajan, la MAC no puede entregar la carta. Y si la IP está duplicada... el cartero se vuelve loco.

**PRÓXIMAMENTE EN 04:** Paquetes y protocolos — cómo se troce la información y qué reglas siguen las máquinas para entenderse. ✉️

---

📚 [Volver al índice de la unidad](/ApuntesRedes/01-introduccion) · **Anterior:** [02 · Los aparatitos](/ApuntesRedes/01-introduccion/02-aparatitos) · **Siguiente:** [04 · Paquetes y protocolos](/ApuntesRedes/01-introduccion/04-paquetes-y-protocolos)
