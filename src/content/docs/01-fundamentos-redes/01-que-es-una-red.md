---
title: 01 — ¿Qué es una red?
description: La definición que tu abuela entendería 💡
---

<p><small>La definición que tu abuela entendería 💡</small></p>

> 🗺️ **Estás en:** 🌐 **U01 · Fundamentos de redes** → 01 · ¿Qué es una red?

---

## 📬 La idea en una frase

> **Una red de ordenadores es un grupo de dispositivos conectados entre sí que se intercambian información y comparten recursos.**

Si tu grupo de amigos comparte apuntes en un chat, una red hace lo mismo con los ordenadores: les da un canal compartido para **intercambiar archivos, mensajes y servicios**, estén al lado o al otro lado del mundo.

---

## 🔍 ¿Por qué el mundo necesita redes?

Un ordenador **aislado** (sin conexión) es como un isleño rodeado de agua: puede hacer muchas cosas solo, pero no puede recibir ni enviar nada hasta que se conecta con alguien.

Con una red, en segundos puedes:

- **Compartir archivos**: enviar una foto, un PDF o un vídeo a otro equipo sin lápiz de memoria.
- **Compartir recursos caros**: una sola impresora sirve a toda la oficina, en vez de una por persona.
- **Communicarte en tiempo real**: correo, mensajería, videollamadas.
- **Centralizar la información**: los datos viven en un servidor y todos los consultan desde su sitio.
- **Coordinar sedes**: la oficina de Madrid quiere lo que acaba de generar Barcelona.
- **Acceder a Internet**: Internet es la red que reúne a todas las redes.

> 💡 **Ejemplo típico:** el cable o el WiFi que sale del router de tu casa es lo que "conecta" tu ordenador con los demás. Sin ese medio no hay red: solo ordenadores que se ignoran.

---

## ⚖️ ¿Cable o WiFi? Un primer vistazo

Dentro de una red doméstica o de oficina, la pregunta técnica número uno es el medio:

| Criterio | Cable (UTP) | WiFi |
|---|---|---|
| Velocidad y estabilidad | Mejor y estable | Bueno, pero compartido e inestable |
| Interferencias | Casi ninguna | Muchas (paredes, microondas, vecinos) |
| Instalación | Hay que tiender cables | Sin cables, rápida |
| Seguridad | Difícil de "espiar" sin acceso físico | Hay que cifrar y controlar quién entra |

> 💡 **Regla práctica:** lo fijo (PC, servidor, impresora) mejor por cable; lo que se mueve (móviles, portátiles) por WiFi. A esto vuelve la U03, pero ya te sirve para decidir hoy.

---

## 🧩 Las 4 piezas de toda red

Da igual si hablamos de la red de un instituto, de un hospital o de tu salón: toda red se monta con los mismos 4 ladrillos.

| Pieza | Qué es | Ejemplo |
|---|---|---|
| **Dispositivos finales** | Los equipos que usan las personas | PC, portátil, móvil, impresora, servidor |
| **Dispositivos de interconexión** | Los intermediarios que conectan y organizan | Switch, router, punto de acceso (AP), módem |
| **Medio de transmisión** | El canal por donde viajan los datos | Cable de red, fibra óptica, ondas WiFi |
| **Protocolos** | Las reglas del idioma que todos respetan | El lenguaje común para que se entiendan |

### Analogía del barrio

Imagina que tu barrio es una red:

- **Los vecinos** son los *dispositivos finales*: los que viven y usan el barrio.
- **Las calles y aceras** son el *medio de transmisión*: por donde pasa todo.
- **Las señales de tráfico y las reglas** son los *protocolos*: sin reglas, caos.
- **El repartidor o el cartero** son los *dispositivos de interconexión*: no viven en el barrio, pero hacen que funcione.

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/red-domestica.svg" alt="Red doméstica típica con módem, router WiFi, switch, PC, portátil, móvil e impresora" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">Una red doméstica típica mezcla cableado (PC fijo) e inalámbrico (portátil, móvil). El router hace de gateway y de punto de acceso a la vez.</figcaption>
</figure>

---

## 🗝️ Dos roles que se repiten todo el curso: cliente y servidor

Apúntate estas dos palabras, porque **van a aparecer en todas las unidades**:

- **Cliente**: el que pide algo. Tu navegador es un cliente; tu app de correo, un cliente; tu móvil, cliente de miles de servicios.
- **Servidor**: el que sirve. Una máquina pensada para atender a mucha gente: el servidor web de Google, el servidor de correo de tu centro, la base de datos de una empresa.

Cuando abres `google.com`, **tu ordenador es el cliente** y la máquina de Google es el **servidor**: el cliente pide la página, el servidor la envía. Esta pareja *pido-entrego* se llama **arquitectura cliente-servidor** y domina casi todas las redes de verdad.

### La alternativa: punto a punto (P2P)

En el modelo **peer-to-peer (P2P)** todos los equipos son iguales: cada uno actúa a la vez de cliente (pide) y de servidor (comparte).

- **Ventajas:** no hay que mantener un servidor central, es barato y resistente a fallos (si un equipo cae, los demás siguen).
- **Desventajas:** difícil de administrar, menos seguro y de menor rendimiento que un servidor dedicado.
- **Ejemplo real:** cuando dos compañeros se pasan archivos directamente sin pasar por un servidor central es una mini red P2P.

> 🧠 **Truco de memoria:** los clientes *piden* (y pueden ser muchos); los servidores *sirven* (son pocos, pero potentes). En el barrio: los vecinos piden el pan (clientes) y la panadería lo sirve (servidor).

---

## 🌍 Según su tamaño: local, grande o gigante

No es lo mismo cablear tu cuarto que una ciudad entera. Según el terreno cubierto, las redes se clasifican en **PAN**, **LAN**, **MAN** y **WAN** (verás los detalles en el [punto 2](/ApuntesRedes/01-fundamentos-redes/02-tipos-y-alcance)). De momento, quédate con que existe gradación de tamaño y que **Internet es una red WAN gigante**.

---

## 🚨 Ojo novatico: red ≠ Internet

- **Internet** es la *red de redes*: la red mundial que conecta millones de redes entre sí.
- **Un servicio de Internet** (Google, WhatsApp, banca online) se *ofrece sobre* Internet.

Cuando montes tu primera red en Packet Tracer **no necesitas Internet**: dos PC conectados a un switch que se hacen ping forman una red perfectamente válida. Internet solo aparece cuando unes *esa* red con el resto del mundo — y ese será el hilo conductor para aprender routers, IP y NAT durante todo el curso.

---

## 🌱 ¿Y por qué siguen evolucionando las redes?

Las redes no paran de crecer. Los motores de esa evolución son:

- **Más dispositivos por persona**: móvil, portátil, TV, domótica... cada familia ya conecta más equipos que nunca.
- **Contenido cada vez más pesado**: ver vídeo en alta definición exige velocidad y buen ancho de banda.
- **Movilidad**: queremos la misma red estemos donde estemos (WiFi, 5G, *roaming*).
- **Centralización**: pasar de archivos locales a servicios en la nube hace que la red sea el corazón del negocio.

Ese último punto explica por qué este curso estudia la red como un todo: hoy, si la red cae, la empresa entera se para.

---

## 🏫 Ejemplo guiado: cablear una clase de 30 PCs

Vamos a aplicar las 4 piezas a un caso concreto. El profesor quiere red en el aula de informática:

- **Dispositivos finales:** 30 PCs de alumnos + 1 PC del profesor + 1 impresora compartida.
- **Dispositivos de interconexión:** 1 switch de aula con suficientes puertos para conectarlo todo.
- **Medio de transmisión:** cable UTP hasta cada mesa; WiFi solo como refuerzo.
- **Protocolos:** el idioma común (IP, Ethernet…) que hará que 30 marcas distintas se entiendan.

Los 30 equipos actúan de **clientes**: piden la impresora y piden archivos. Para salir a Internet, el aula tendrá además un **router** conectado al resto del centro. Sin router, la clase se comunica internamente; con router, además sale al mundo.

> 💡 **Detalle práctico:** con un solo switch, el aula es una LAN en topología estrella. Si el centro une todas las aulas con un switch central, tendrás un **árbol** (lo vemos en el [punto 3](/ApuntesRedes/01-fundamentos-redes/03-topologias)).

---

## 🎯 Mini-chequeo

Ponte a prueba en 30 segundos (las respuestas están escondidas):

1. ¿Cuál de los 4 componentes de una red es el "canal por donde viajan los datos"?
2. Si la TV de tu casa "sirve" una película al móvil a demanda, ¿quién es el cliente y quién el servidor?

<details>
<summary>🔄 Respuestas</summary>

1. El **medio de transmisión** (el cable UTP, la fibra o el WiFi). Las otras piezas son: dispositivos finales, de interconexión y protocolos.
2. La **TV actúa de servidor** (sirve la película) y el **móvil de cliente** (la pide). Es la arquitectura cliente-servidor en acción.

</details>

---

## ✅ Resumen en 3 frases

1. Una red es un grupo de dispositivos conectados entre sí que comparten recursos e información.
2. Toda red tiene 4 piezas: dispositivos finales, dispositivos de interconexión, medio de transmisión y protocolos.
3. Los dispositivos actúan de **cliente** (pide) o de **servidor** (sirve): es la base de casi todo lo que viene.

> 🐛 **Vocabulario rápido**
>
> | Término | Idea general |
> |---|---|
> | Red | Varios dispositivos que se hablan y comparten cosas |
> | Cliente / Servidor | El que pide / el que sirve |
> | Protocolo | Reglas para que los equipos se entiendan |
> | Switch | Es un "enchufe inteligente" en la red |
> | Router | El portero que une tu red con otras |

📚 [Volver al índice de la unidad](/ApuntesRedes/01-fundamentos-redes) · **Anterior:** [Tema 0](/ApuntesRedes/00-introduccion) · **Siguiente:** [02 · Tipos de red y alcance](/ApuntesRedes/01-fundamentos-redes/02-tipos-y-alcance)