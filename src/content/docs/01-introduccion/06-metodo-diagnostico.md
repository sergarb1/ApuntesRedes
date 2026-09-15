---
title: 06 — Método de diagnóstico
description: La escalera del diagnóstico y la lógica para cazar cualquier avería 🩺
---

<p><small>La escalera del diagnóstico y la lógica para cazar cualquier avería 🩺</small></p>

> 🗺️ **Estás en:** 🚪 **U01 · Introducción** → 06 · Método de diagnóstico

---

## 📬 La idea en una frase

> **Arreglar una red no consiste en tocar botones al azar rezando para que funcione; es aplicar un método lógico de descarte (de abajo hacia arriba) cambiando solo una cosa cada vez.**

---

## 🛠️ Qué hace un administrador de redes

Un administrador de redes hace cuatro verbos todo el día:

| Verbo | Qué significa | Ejemplo |
|---|---|---|
| **Montar** | Instalar y cablear equipos nuevos. | Conectar un switch nuevo en el armario. |
| **Configurar** | Ajustar parámetros para que todo hable correctamente. | Poner IPs, VLANs, rutas. |
| **Vigilar** | Comprobar que nada se cae ni se satura. | Mirar Grafana, SNMP, syslog. |
| **Arreglar** | Diagnosticar y resolver averías. | *"No funciona la web"* → encontrar por qué. |

El 80% del tiempo se dedica a las dos últimas cosas: vigilar y arreglar. Y para arreglar, necesitas **método**.

---

## 🩺 El método del médico: Diagnosticar capa a capa

Nadie cuerdo se cura probando todas las medicinas de la farmacia a ciegas. Cuando un paciente va al médico, el doctor descarta por órganos: primero los reflejos, luego el corazón. En redes, la comunicación se construye de abajo (el cable físico) hacia arriba (el servicio web o DNS), así que el diagnóstico se hace exactamente igual: **de abajo a arriba**.

### 🔦 El Peldaño 0: La regla de la lucecita

Antes siquiera de tocar el teclado, fíjate en el hardware. Si la luz del puerto de la tarjeta de red o del switch está apagada, significa que no hay conexión eléctrica. Si no hay luz, no hay magia: comprueba que el cable esté bien enchufado en ambos extremos. El diagnóstico siempre empieza por los ojos.

---

## 🚢 La analogía del Ping: El sonar del submarino

Una vez que vemos la lucecita encendida, usaremos tu mejor amigo a partir de hoy: el comando **ping**. Piensa en el ping **como el sonar de un submarino**. Cuando escribes el comando, tu ordenador envía un pulso de sonido por el cable hacia otra máquina.

- Si la máquina está ahí, el sonido rebota y vuelve a ti como un eco, diciéndote los milisegundos que ha tardado.
- Si no hay eco (se agota el tiempo), significa que la máquina objetivo está apagada, no existe, o hay un obstáculo en medio que ha bloqueado tu sonido.

---

## 🪜 La Escalera del Ping (Tus 4 peldaños de diagnóstico)

Cuando alguien te diga *"no tengo Internet"*, abre la terminal y sube esta escalera usando tu "sonar". En cuanto un peldaño no devuelva eco, **ahí está tu avería** y no necesitas mirar los peldaños de arriba.

| Peldaño | Comando que ejecutas | 🧠 ¿Qué estás comprobando realmente? | Si falla, significa que... |
|---|---|---|---|
| 1 | `ping 127.0.0.1` | Le miras los reflejos al equipo para ver si su propia tarjeta de red respira (loopback). | El problema está en tu propia tarjeta, no sales de tu PC. |
| 2 | `ping <IP de router>` | Pruebas si llegas a la puerta de salida de tu red (tu puerta de enlace / gateway). | Tu red local está rota: hay un problema de cable, switch o IP. |
| 3 | `ping 8.8.8.8` | Pruebas si puedes salir hacia la "calle" exterior (una IP de Google). | La red local va bien, el fallo está en el router o en el operador. |
| 4 | `ping www.google.com` | Pruebas si tu equipo sabe traducir nombres a IPs mediante el servicio DNS. | Tienes Internet, pero fallan los DNS (la agenda está rota). |

---

## 😡 Conrad, el switch cascarrabias (y el error del principiante)

Existe un tipo de alumno que, ante el temido "no va Internet", lo hace todo a la vez: cambia el cable, reinicia el PC, desinstala el antivirus y golpea el teclado.

*Conrad, nuestro switch veterano y cascarrabias, se enciende solo:*

> «¿¡Pero qué haces!? ¡En un minuto has cambiado el cable, reiniciado el equipo y desinstalado el antivirus! Si por casualidad aciertas, ni tú ni nadie sabrá *qué* ha sido. En esta profesión se cobra por saber *qué* ha pasado, no por rezar. **SE DIAGNOSTICA DESDE ABAJO**, SEÑOR. Primero dime si hay luz en el cable, y no me hables de servidores hasta que la veamos. **Cambia UNA cosa, observa, y sigue con la siguiente**.»

---

## ✅ Resumen en 3 frases

1. El diagnóstico se hace siempre en orden: primero comprueba visualmente las luces de los equipos y luego sube capa a capa.
2. Usa la **Escalera del Ping** (Loopback → Router → 8.8.8.8 → Dominio web) como un sonar para aislar la avería en un solo minuto.
3. Recuerda siempre **cambiar una sola cosa cada vez**; si cambias todo a la vez, no sabrás cuál era la solución.

---

## 🔥 Fireside Chat: Diagnóstico con método vs. adivinanza

> *Dos técnicos de redes toman café mientras suena la alarma.*

**Técnico con método:** — Alarma de "servidor caído". Primero: ¿hay luz en el puerto? *Sí.* Segundo: ¿hace ping al gateway? *Sí.* Tercero: ¿hace ping al servidor? *No.* Cuarto: ¿resuelve DNS? *No.* → **El problema es DNS.** Cinco minutos.

**Técnico adivino:** — ¡Ay! Yo habría reiniciado el servidor, el switch y el router por si acaso. Y luego habría rezado.

**Técnico con método:** — *suspiro* Si reinicias todo, no sabes qué estaba mal. Y el usuario sigue sin saber qué pasó.

**Técnico adivino:** — Pero al menos he hecho algo...

**Técnico con método:** — Hacer algo no es lo mismo que hacer lo correcto.

---

## 🕵️ ¿Quién Soy?

Adivina qué paso del diagnóstico soy:

1. **Miro las luces del switch.** Si el LED está apagado, no hay conexión física.
2. **Hago `ping 127.0.0.1`.** Compruebo que la tarjeta de red del PC funciona.
3. **Hago `ping 8.8.8.8`.** Compruebo si puedo salir a Internet (sin DNS).
4. **Hago `ping google.com`.** Compruebo si el DNS funciona.

<details>
<summary>🔄 Respuestas</summary>

1. **Peldaño 0** — revisión visual (luces).
2. **Peldaño 1** — loopback (la tarjeta respira).
3. **Peldaño 3** — salida a Internet (sin DNS).
4. **Peldaño 4** — resolución DNS.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "Reinícielo todo"

> *CONRAD, nuestro switch cascarrabias, opina sobre los que reinician todo sin diagnosticar.*

**CONRAD:** — ¡OTRA VEZ! Viene un técnico y me dice: *"CONRAD, he reiniciado el switch, el router y el PC del usuario, y ahora funciona."* Y yo: **¡BRAVO! ¿Y sabes por qué funcionaba? ¡Porque el problema era el cable suelto que tenías al lado!** Pero como reiniciaste todo, no lo sabes. La próxima vez, cuando vuelva a pasar (y va a volver a pasar), vas a reiniciar todo otra vez en vez de mirar el cable. **DIAGNOSTICA ANTES DE TOCAR.**

**La lección:** reiniciar es el "recurso de emergencia" que a veces funciona, pero si no diagnosticas, no aprendes. Y si no aprendes, la próxima vez gastarás el doble de tiempo.

---

## ⚡ Laboratorio de tortura: La avería doble

> **Duración estimada:** 25 minutos
> **Herramienta:** Packet Tracer

**El escenario:** Tienes 1 PC conectado a un switch, el switch conectado a un router, y el router conectado a Internet (simulado). El PC tiene IP `192.168.1.10/24`, gateway `192.168.1.1` y DNS `8.8.8.8`.

**Fallo intencionado (doble):**
1. El **cable** entre el PC y el switch está mal (sin conectar en un extremo).
2. El **DNS** del PC está configurado a `8.8.8.9` (una IP que no existe).

**Tu tarea:** Diagnosticar y arreglar ambos fallos.

**Pistas (no antes de intentar):**

1. ¿Los LEDs del puerto del switch están encendidos? *No → el cable no conecta.*
   <details><summary>¿Y si sigo atascado?</summary>Conecta el cable correctamente en ambos extremos. Ahora el LED se enciende.</details>

2. Una vez arreglado el cable, haz `ping 192.168.1.1`. ¿Responde? *Sí.* Haz `ping 8.8.8.8`. ¿Responde? *Sí.* Haz `ping google.com`. ¿Responde? *No → el DNS está mal.*
   <details><summary>¿Y si sigo atascado?</summary>Cambia el DNS a `8.8.8.8` o `1.1.1.1`.</details>

> ⚠️ **Los fallos son: cable suelto + DNS mal configurado.** Lección: un diagnóstico puede tener **varios fallos**. Resuélvelos uno a uno, de abajo a arriba.

---

## 🏆 Logros de esta sección

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Ping Master** | Usar la escalera del ping sin mirar la tabla |
| 🏅 **Diagnosticador** | Encontrar ambos fallos del laboratorio |
| 🏅 **CONRAD Junior** | Explicar por qué no se debe reiniciar sin diagnosticar |

---

## 🧠 Atrévete a pensar

1. **Un usuario dice "no me va Internet".** ¿Cuál es el primer paso? ¿Y el segundo?
2. **¿Por qué se hace el diagnóstico de abajo a arriba y no de arriba a abajo?**
3. **Si `ping 8.8.8.8` funciona pero `ping google.com` no, ¿qué está mal?** ¿Y si falla al revés?

<details>
<summary>💡 Soluciones</summary>

1. **Primer paso:** mirar las luces del puerto de red (físico). **Segundo paso:** hacer `ping 127.0.0.1` (loopback).
2. Porque la comunicación se construye de abajo a arriba: si no hay cable (capa 1), no hay Ethernet (capa 2), no hay IP (capa 3), no hay DNS (capa 7). Si el peldaño de abajo falla, los de arriba no pueden funcionar.
3. Si `8.8.8.8` funciona pero `google.com` no: **el DNS está caído**. Si falla al revés (resuelve nombres pero no llega a IPs externas): hay un problema de enrutamiento o el firewall bloquea.

</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. Comando que envía un pulso de sonido por la red (4 letras)
3. Primero mira las luces del puerto de red (7+7+3+4+2+4+4 letras)
5. El switch cascarrabias del curso (6 letras)

Vertical:
2. Peldaño 1: ping a una IP de 7 dígitos (5+3+3+1+1+1+1 letras)
4. Cambiar solo una cosa cada vez (5+6+3+6+4+4+3 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. PING · 3. DIAGNOSTICO DE ABAJO A ARRIBA · 5. CONRAD
**Vertical:** 2. 127.0.0.1 · 4. CAMBIA UNA COSA A LA VEZ

</details>

---

## 💬 Preguntas de entrevista de trabajo

> Preguntas reales que te harían para administrador de redes junior.

1. **"Un usuario dice 'no tengo Internet'. ¿Qué haces en los primeros 30 segundos?"**
2. **"¿Qué es el ping? ¿Para qué sirve?"**
3. **"Explica la escalera del diagnóstico en 4 pasos."**
4. **"¿Por qué no se debe reiniciar todo sin diagnosticar?"**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Qué pasa si el ping 127.0.0.1 no funciona?**

Significa que la **tarjeta de red del PC está rota o deshabilitada**. No es un problema de cable ni de switch: es el PC mismo. Prueba a habilitar la interfaz de red o, si no funciona, a cambiar la tarjeta de red.

---

> ❓ **¿Puedo hacer ping a mí mismo?**

**Sí, y es obligatorio como paso 1.** El `ping 127.0.0.1` (loopback) comprueba que la pila TCP/IP del PC funciona. Si no responde, el PC no puede comunicarse con nadie, ni siquiera consigo mismo.

---

## 🎬 Poscréditos

El PC del alumno hace `ping 127.0.0.1` y responde. El PC se respira aliviado: *"Al menos sigo vivo"*. Luego hace `ping` al gateway: *"¡Llego hasta la puerta!"*. Luego a `8.8.8.8`: *"¡Salgo a la calle!"*. Y por fin a `google.com`: *"¡El DNS también funciona!"*. El PC sonríe: *"Todo va bien... hasta la próxima avería"*.

**PRÓXIMAMENTE EN U02:** Fundamentos de redes — los cimientos sobre los que se construye todo lo que hemos visto aquí. 🌐

---

📚 [Volver al índice de la unidad](/ApuntesRedes/01-introduccion) · **Anterior:** [05 · DNS y DHCP](/ApuntesRedes/01-introduccion/05-dns-y-dhcp) · **Siguiente:** [07 · Glosario](/ApuntesRedes/01-introduccion/07-glosario)
