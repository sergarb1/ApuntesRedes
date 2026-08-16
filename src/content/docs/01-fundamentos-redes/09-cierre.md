---
title: "09 — Cierre: consolida lo aprendido"
description: El cierre práctico de la unidad, con chicha y diagnóstico real 🔧
---

<p><small>El cierre práctico de la unidad, con chicha y diagnóstico real 🔧</small></p>

> 🗺️ **Estás en:** 🌐 **U01 · Fundamentos de redes** → 09 · Cierre

---

## 📬 La idea en una frase

> **En este punto no aprendemos nada nuevo: lo convertimos todo en práctica. Y, como siempre, algo no va a funcionar.** 😈

---

## ⭐ Sé el Paquete, my friend...

> *Eres un paquete de 1500 bytes que acaba de generarse en la interfaz de red de un portátil. Tu IP origen es `192.168.1.10` y quieres llegar a `8.8.8.8` (el DNS de Google). Tu máquina NO tiene la MAC del gateway `192.168.1.1` en su tabla ARP.*

**¿Qué haces? Elige sabiamente:**

1. **Enviar los datos directamente a `8.8.8.8` sin más** → La capa 2 necesita una MAC destino y no tienes la suya (ni siquiera está en tu subred). Tu trama no sale de casa y es descartada. ❌
2. **Lanzar un ARP request preguntando quién tiene `192.168.1.1`** → ✅ ¡Bien! Para salir de tu red necesitas la MAC del gateway; ARP te la dará y podrás enviarle el paquete para que lo reenvíe.
3. **Preguntarle a DHCP** → El DHCP ya te dio tu IP al arrancar. Aquí no toca: sería llamar al fontanero porque el grifo gotea cuando lo que necesitas es cerrarlo. ❌

> <details>
> <summary>🔄 Solución</summary>
>
> La opción **2**. Sin la MAC del gateway, tu paquete no sale ni de casa. **Siempre necesitas la capa 2 (MAC) para moverte dentro de tu red local.**
>
> </details>

---

## 🔥 Fireside Chat: Switch vs Hub

> *Dos veteranos de la capa 2 discuten junto a la chimenea del armario de comunicaciones.*

**Hub:** — Mira, yo soy simple. Me llega un bit por un puerto y lo copio a todos los demás. Sin complicaciones.

**Switch:** — Sin complicaciones, dice. ¿Sabes lo que es un dominio de colisión? ¿No? Pues yo sí. Porque yo segmento. Aprendo direcciones MAC. Cuando recibo una trama, SÉ exactamente a qué puerto enviarla. Tú inundas todo como una manguera sin cabeza.

**Hub:** — Oye, que en los 90 funcionaba perfectamente.

**Switch:** — En los 90 también se llevaban los pantalones de campana, y mira cómo acabó eso. Yo creo tablas MAC; tú solo repites señales. Yo puedo tener 10 PCs hablando a la vez; tú haces que hablen de uno en uno, porque si dos hablan a la vez... Colisión. Fin de la historia.

**Hub:** — Vale, pero... soy más barato.

**Switch:** — *suspiro* Siempre el mismo argumento.

---

## 🕵️ ¿Quién Soy?

Adivina qué dispositivo de red soy:

1. **Trabajo en la capa 3.** Miro direcciones IP. Decido por dónde enviar los paquetes. Tengo una tabla de rutas.
2. **Trabajo en la capa 2.** Aprendo MACs. Cuando no sé quién eres, inundo la red. Pero luego aprendo y ya no molesto.
3. **Repito todo lo que me llega por todos los puertos excepto por el que me llegó.** Básicamente soy un altavoz con patas.
4. **Soy el punto central de una estrella.** Si yo fallo, todos los cables conectados a mí se quedan 'offline'. Sin presión.

<details>
<summary>🔄 Respuestas</summary>

1. **Router** — El que siempre sabe por dónde ir.
2. **Switch** — Aprende MACs y segmenta la red.
3. **Hub** — El altavoz de las redes.
4. **El switch central de una topología en estrella.**

</details>

---

## 🤬 CONRAD VS EL MUNDO: "El ping no funciona"

> *CONRAD, nuestro switch con problemas de ira, opina sobre el clásico "el ping no funciona".*

**CONRAD:** — ¡OTRA VEZ! Viene un informático y me dice: *CONRAD, no hay ping*. Y yo: vale, ¿has mirado la IP? *Sí*. ¿El gateway? *Sí*. ¿El cable? *...¿cuál cable?* ¡Ay, madre mía! Sin cable no hay señal. Sin señal no hay bits. Sin bits no hay ping. Es como quejarse de que el coche no arranca sin ruedas.

**La lección:** el 80% de los problemas de red están en la capa física. Antes de renegar de la configuración IP, asegúrate de que el cable está bien conectado. Y sí, a veces la solución es "apágalo y enciéndelo".

---

## ⚡ Laboratorio de Tortura: Monta tu primera red (con fallo)

> **Duración estimada:** 30 minutos
> **Herramienta:** Packet Tracer o hardware real

**El escenario:** tienes 2 PCs (PC-A y PC-B) y 1 switch. Conéctalos, asígnales IP y haz que se hagan ping.

| Equipo | IP | Máscara |
|---|---|---|
| PC-A | 192.168.1.10 | 255.255.255.0 |
| PC-B | 192.168.1.20 | 255.255.255.0 |

**Fallo intencionado:** el switch viene con los puertos mal configurados. Uno está en **VLAN 10** y el otro en **VLAN 1**. No lo sabes: los dos cables están pelados y encajan perfectamente.

**Tu tarea:** que funcionen. Si no funciona, diagnostica.

**Pistas para cuando te frustres (no antes):**

1. ¿Parpadean los LEDs del switch al conectar los cables? *no → problema físico.*
   <details><summary>¿Y si sigo atascado?</summary>Verifica con `ipconfig`/`ifconfig` que cada PC tenga la IP correcta.</details>
2. ¿Se ven las IPs entre sí con `ping`? *no → deja de ser un problema de direccionamiento.*
   <details><summary>¿Y si sigo atascado?</summary>Haz `arp -a` en cada PC. Sin entrada MAC entre equipos, la capa 2 no está comunicando.</details>
3. El problema real es que las **VLANs son diferentes**: los equipos están físicamente conectados pero lógicamente separados. *Esto se estudia en la U07; hoy solo sufre (digo: aprende).*

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **El Ping de la Vida** | Conseguir ping entre 2 PCs en Packet Tracer a la primera |
| 🏅 **Cable Detective** | Encontrar el fallo intencionado del laboratorio sin usar las pistas |
| 🏅 **ARP Whisperer** | Explicar a alguien cómo funciona ARP sin usar jerga técnica |
| 🏅 **Topología Pro** | Dibujar de memoria las 4 topologías vistas en [03](/ApuntesRedes/01-fundamentos-redes/03-topologias) |

---

## 🧠 Atrévete a Pensar

1. **Tienes 5 PCs y un switch.** Dibuja la topología. ¿Cuántos cables necesitas como mínimo?
2. **¿Qué pasa si conectas 2 switches entre sí, cada uno con 2 PCs?** ¿Cuántos dominios de colisión hay?
3. **Explica con tus palabras** por qué un router puede conectar redes diferentes y un switch no.
4. **Verdadero o falso:** "Un hub y un switch hacen exactamente lo mismo, pero el switch es más moderno."

<details>
<summary>💡 Soluciones</summary>

1. **5 cables** (uno de cada PC al switch). Topología física en estrella.
2. Cada switch segmenta por puerto: tienes **4 dominios de colisión** (uno por cada puerto con PC) más el enlace entre switches, que es uno más. Total: 5 si cuentas el enlace inter-switch.
3. El **router** trabaja en la capa 3 (IP) y decide rutas entre redes; el **switch** trabaja en la capa 2 (MAC) y solo conoce su LAN. Es como un cartero que conoce todas las calles (router) frente a un repartidor que solo conoce su vecindario (switch).
4. **Falso.** El hub repite señales (capa 1); el switch aprende MACs y segmenta (capa 2). No son lo mismo ni de lejos.

</details>

---

## 🧩 Crucigrama de Bits

```
Horizontal:
1. Dispositivo que reenvía paquetes entre redes IP (6 letras)
3. Conjunto de reglas para la comunicación (8 letras)
5. Red de área local (3 letras)

Vertical:
2. Identificador único de 48 bits de una interfaz de red (3 letras)
4. Unidad de datos que transporta la capa de red (7 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. ROUTER · 3. PROTOCOLO · 5. LAN
**Vertical:** 2. MAC · 4. PAQUETE

</details>

---

## 💬 Preguntas de Entrevista de Trabajo

> Preguntas reales que te harían para administrador de redes junior.

1. **"Explícame cómo hace ping un PC a otro en la misma red, paso a paso, como si yo fuera tu abuela."**
2. **"Dime al menos 3 diferencias entre un switch y un router."**
3. **"¿Qué es una dirección MAC? ¿Para qué sirve? ¿Puede cambiar?"**
4. **"Un PC no tiene conectividad. Dame tu proceso de diagnóstico en orden."**
5. **"Enumera 4 topologías y las ventajas e inconvenientes de cada una."**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Existe un dispositivo que sea router y switch a la vez?**

Conceptualmente son funciones de capas distintas (conmutar en la capa 2, enrutar en la capa 3). Existen equipos **multicapa (capa 3)** que hacen ambas, y el router de casa integra switch, AP, firewall y módem. Pero, a nivel de concepto: no son lo mismo; es que van en la misma caja.

---

> ❓ **¿Por qué necesito una IP y una MAC?**

La **MAC** identifica físicamente la interfaz (DNI); la **IP** te localiza dentro de la red (domicilio). Las dos viajan en cada trama: la MAC mueve el dato dentro de tu LAN, la IP lo dirige hasta la red de destino.

---

> ❓ **¿Puedo asignar cualquier IP a mi PC?**

Puedes teclear lo que quieras, pero si no pertenece a la **misma subred** que tus vecinos, nadie te escuchará: las tramas hacia ti serán ignoradas. La configuración correcta es la que encaja con la red donde estás (IP + máscara + gateway + DNS).

---

## 🎬 Post-Créditos

Un paquete de 1500 bytes completa su viaje desde tu navegador hasta el servidor DNS `8.8.8.8`: pasa por el gateway, varios switches y routers, y cada salto decrementa su TTL. En el último tramo, el TTL llega a cero y un router lo descarta, devolviéndote un mensaje ICMP *Time Exceeded*. Espera... ¿eso significa que no ha llegado? La respuesta, y el viaje por las capas a fondo, en la próxima unidad.

**PRÓXIMAMENTE EN U02:** Encapsulación, PDUs y el arte de leer tramas con Wireshark. 📦

---

📚 [Volver al índice de la unidad](/ApuntesRedes/01-fundamentos-redes) · **Anterior:** [08 · Conectividad básica](/ApuntesRedes/01-fundamentos-redes/08-conectividad-basica) · **Siguiente:** **[U02 · Modelos OSI y análisis](/ApuntesRedes/02-modelos-osi-analisis)**