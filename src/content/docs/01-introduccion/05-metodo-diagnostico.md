---
title: 05 — La mente de un administrador
description: La escalera del diagnóstico y la lógica para cazar cualquier avería 🩺
---

<p><small>La escalera del diagnóstico y la lógica para cazar cualquier avería 🩺</small></p>

> 🗺️ **Estás en:** 🚪 **Unidad 01** → 05 · La mente de un administrador

---

## 👷 Qué hace un administrador de redes (casi todos los días)

Antes de meternos en la caja negra del diagnóstico, veamos de qué va el oficio. Un administrador de redes no es solo "el de los cables": es la persona que consigue que **cientos de dispositivos se sigan entendiendo** mientras nadie nota que hay alguien detrás. Si tuviera que resumir el día en cuatro verbos:

| Verbo | Qué significa | Un rato tuyo |
|---|---|---|
| **Montar** | Desplegar cables, equipos y antenas | Cablear el aula nueva |
| **Configurar** | Dar lógica a los equipos (IPs, VLANs, rutas) | Asignar las direcciones de un departamento |
| **Vigilar** | Observar sin huecos: quién habla, cuánto, con quién | Mirar la red antes de que suene un aviso |
| **Arreglar** | Detectar, localizar y resolver averías | El clásico "no me va Internet" |

Sobre el último verbo, una confesión: en el día a día, buena parte del tiempo de un profesional no es *montar*, sino **arreglar**. Y arreglar no es probar cosas al azar hasta que "suene" una: es **seguir un método**. De eso va esta página.

---

## 🌡️ El método en capas: como un médico que descarta

Nadie cuerdo se cura probando todas las medicinas de la farmacia a ciegas, ¿verdad? Un médico, ante un paciente, **descarta por órganos**: primero la vista, luego el oído, luego el corazón. Con las redes pasa lo mismo: la comunicación se construye **de abajo arriba**, así que el diagnóstico se hace **de abajo arriba**, capa a capa y en orden.

| Paso | Qué compruebo | Comprobación rápida | Si falla aquí, significa… |
|---|---|---|---|
| 1 | **El enlace físico** | Cable bien metido, luces, LED del puerto | Sin enlace no hay conversación posible: es cable o tarjeta |
| 2 | **Dirección IP válida** | `ipconfig` (Windows) o `ip addr` (Linux) | Tu equipo no tiene "domicilio": no puede hablar |
| 3 | **Gateway por defecto** | La puerta de enlace en `ipconfig`, o `route -n` | Tu equipo está, pero no hay puerta hacia fuera de la red |
| 4 | **DNS** | `nslookup www.google.com` | Los nombres no se resuelven: no sabes a qué número llamar |
| 5 | **El servicio / la aplicación** | Abrir la web, la app; probar el puerto | La red llega, pero el servidor de destino no responde |

> 💡 **El truco del orden:** en cuanto falla un peldaño, **no hay que probar los de arriba**. Si no hay luz en la tarjeta, ¿para qué voy a revisar el DNS? Arreglo el peldaño roto y repito. Esa es la diferencia entre *adivinar* y *diagnosticar*.

---

## 🪜 La escalera del diagnóstico (el "ping de las cuatro paradas")

Hay un comando que repetirás más veces que ninguna otra palabra del curso: **ping**. Es, además, tan sencillo que se convierte en la escalera perfecta para triar un problema en un minuto. El plan es simple: subes peldaño a peldaño, y **cuando un peldaño falla, ahí está el problema**.

| Peldaño | Comando | ¿Qué estás comprobando? |
|---|---|---|
| 1 | `ping 127.0.0.1` | Que la propia tarjeta de red está viva (loopback) |
| 2 | `ping <IP de la puerta de enlace>` | Que sale de mi equipo hacia mi propia red |
| 3 | `ping 8.8.8.8` | Que hay salida a Internet (sin depender de nombres) |
| 4 | `ping www.google.com` | Que, además, el servicio de nombres (DNS) funciona |

- **Peldaño 1 roto** → el problema está en mi equipo (tarjeta o controlador).
- **Peldaño 2 roto** → la **red local** falla: IP mal asignada, cable, switch.
- **Peldaño 3 roto** → la **salida a Internet** falla: gateway, router u operador.
- **Peldaño 4 roto** (con el 3 bien) → problema de **DNS**, no de conexión.

Con solo cuatro flechas, el mundo entero queda repartido en cuatro cajas. Cuando un veterano te diga "está todo caído", lo primero que pensarás será en qué peldaño pisar.

---

## 🧠 La analogía del médico (por si aún lo ves mágico)

Piensa en el clásico paciente de consulta: "me duele el pie". Un buen médico no receta cuatro antiinflamatorios a la vez "por si alguno funciona": primero **inspecciona**, luego pregunta, pide una prueba y solo cuando tiene el informe receta.

Tu "no tengo Internet" es ese dolor. La escalera de ping es la batería de pruebas que descarta:

- Primero le **miro los reflejos** al propio paciente (ping 127.0.0.1: ¿respira la tarjeta?).
- Luego le pregunto si llega a la **puerta de salida** de su casa (gateway).
- Luego si alcanza la **calle** (8.8.8.8, ya fuera de la LAN).
- Y solo entonces compruebo si le funciona la **agenda de nombres** (DNS).

Cada prueba descarta un órgano. **Nada de pastillas al azar: prueba, descarta y sigue.** Tan aburrido y, a la vez, tan eficaz. El médico no tiene suerte: tiene método, que es mucho mejor.

---

## 😡 Conrad, el switch cascarrabias (y el error del principiante)

Existe un tipo de alumno que todo docente reconoce a tres metros: el que, ante "no tengo Internet", **lo hace todo a la vez**. Cambia el cable, reinicia el equipo, desinstala el antivirus, toca el explorador… y mientras, grita "¡no funciona!". Es tan productivo como revolver la sopa con una cuchara esperando que se dore el pollo.

Conrad tiene una opinión al respecto, ya lo sabrás a estas alturas:

> **CONRAD se enciende casi solo:** «¿¡Pero qué haces!?! ¡En un minuto has cambiado el cable, reiniciado el equipo, desinstalado el antivirus y golpeado el teclado! ¿¡Y a eso le llamas "arreglar"!? Te enseñaron la escalera de los cuatro pings y tú la estás usando de trampolín. ¡**SE DIAGNOSTICA DESDE ABAJO**, SEÑOR! Primero los cimientos: dime si hay luz o no hay luz, y no me hables de servidores hasta que la veamos.»
>
> —«Es que quiero ir rápido, Conrad…»
>
> —«¡Pues por eso vas DESPACIO! Si cambias cuarenta cosas a la vez y por casualidad aciertas, ni tú ni nadie sabrá qué ha sido. En esta profesión se cobra por saber *qué* ha pasado, no por rezar. Cambia UNA cosa, observa, y sigue con la siguiente.»

Humor aparte, la idea es de oro: **cambia una cosa cada vez**. Si el problema se arregla, sabes exactamente qué era; si no, has descartado una pista y sigues con la siguiente. Esa es la distancia entre un ingeniero y un gato que pasea por el teclado.

### 🔁 Y un matiz con el "reinicio"

Antes de que alguien recite la frase mágica de soporte técnico, digamos una cosa justa del reinicio: **no es un atajo que se salta la escalera, es el "peldaño 0" legítimo**. Reiniciar el equipo reinicia los programas del sistema operativo de la máquina. Hacerlo una vez, y solo una vez, está bien antes de subir a la escalera. El problema es convertir el reinicio en la *única* herramienta y adivinar el resto a martillazos: ahí vuelve a estar Conrad con la ceja levantada.

---

## 🎬 Caso práctico: «No tengo Internet»

Es lunes, las 9:15, y un compañero te llama: **«Se me ha ido Internet»**. Con la escalera en la cabeza, no te lanzas a tocar botones: empiezas preguntando.

**Preguntas de guía (antes de tocar nada):**

- ¿Te va por cable o con wifi? ¿A ti solo o a todo el centro?
- ¿Las luces del equipo de red se ven bien? ¿El cable está firme en el puerto?
- ¿Desde cuándo? ¿Ha pasado algo justo antes (tormenta, obras, una instalación nueva)?

<details>
<summary>🔄 La escalera resuelta, paso a paso</summary>

1. `ping 127.0.0.1` — **responde**. La tarjeta del portátil está viva: descartamos el equipo.
2. `ping 192.168.1.1` — **responde**. Su puerta de enlace (el router) está sana: la red local va bien.
3. `ping 8.8.8.8` — ❌ **se pierde**. La respuesta se pierde: la salida hacia Internet está rota.
4. `ping www.google.com` — tampoco, pero ya da igual: el fallo está por debajo del DNS.

**Conclusión:** la avería está **fuera de la red local** (router u operador). Revisar la red local no arregla nada… porque no hay nada roto en casa. La luz roja del router y los parpadeos de la línea lo apuntaban clarito: **será cosa del operador**. Se acaba llamando a la compañía y, sí, el servicio volvió al día siguiente. Tu trabajo fue este: subir la escalera y señalar la capa exacta.
</details>

> 📌 **La moraleja del caso:** no hace falta "saber arreglar todo", basta saber **en qué capa de la escalera** está el problema. Con esa idea (y no con cuarenta acciones a la vez) se resuelve la inmensa mayoría de las averías de un centro educativo.

---

## 🧪 Pruébalo en tu propio equipo (2 minutos)

Ahora que ya la ves en la cabeza, toca subirla tú mismo, sin riesgo:

1. Abre una **terminal** o el **símbolo del sistema** en tu ordenador.
2. Escribe `ping 127.0.0.1` y observa: tu *propio equipo* responde sin salir de casa. Eso es el peldaño 1.
3. Escribe `ipconfig` (Windows) o `ip addr` (Linux) y localiza tu **IP** y tu **puerta de enlace**.
4. Escribe `ping <tu puerta de enlace>`: si responde, tu red local está viva (peldaño 2).

<details>
<summary>🔄 Qué esperas ver (para no asustarte)</summary>

En el peldaño 1 y 2 verás líneas de *Respuesta desde …* (o *Reply from …*). No te asustes si la primera respuesta tarda un poco: es el cable echando humo… en broma, es solo el arranque. Lo importante es que los dos primeros peldaños contesten; si no, ya sabes dónde está el fallo y qué toca revisar.
</details>

---

## ✅ Resumen en 3 frases

1. El diagnóstico va **de abajo arriba**, capa a capa: sin enlace no hay IP, sin IP no hay gateway, y nadie salta de piso.
2. La **escalera del ping** (loopback → pasarela → 8.8.8.8 → web) divide el problema en cuatro compartimentos en un solo minuto.
3. **Cambia una cosa cada vez** y así sabrás cuál es: adivinar es cosa de gatos; diagnosticar, de profesionales.

📚 [Volver al índice de la Unidad 01](/ApuntesRedes/01-introduccion) · **Siguiente:** [06 · Glosario y preguntas tontas](/ApuntesRedes/01-introduccion/06-glosario-y-faq)