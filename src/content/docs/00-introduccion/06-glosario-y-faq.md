---
title: 06 — Glosario y preguntas tontas
description: Todas las palabras del Tema 0 y las dudas que nadie se atreve a decir en voz alta 😅
---

<p><small>Todas las palabras del Tema 0 y las dudas que nadie se atreve a decir en voz alta 😅</small></p>

> 🗺️ **Estás en:** 🚪 **Tema 0** → 06 · Glosario y preguntas tontas

---

## 📖 Glosario de la A a la Z

Esta es la "chuleta final" del Tema 0. Cada término con su idea en una frase y una analogía corta para que se te pegue. No la memorices: **vuelve aquí cuando una palabra te atraviese el techo**, y sigue con lo tuyo.

| Término | Idea en una frase | Analogía express |
|---|---|---|
| **Ancho de banda** | La cantidad de datos que caben por un canal cada segundo | El diámetro del grifo |
| **Bit y byte** | Bit: un 0 o un 1; byte: un grupo de 8 bits | El interruptor y la cajita de interruptores |
| **Bucle de red / Loop** | Un camino de los datos que les da vueltas sin salir | Paseo sin salida alrededor de la manzana |
| **Caché** | Copia local de datos para que lo siguiente vaya más rápido | La libreta de bolsillo del cartero |
| **Cliente** | El dispositivo que pide un servicio | El que hace la petición en la barra |
| **Colisión** | Cuando dos equipos intentan hablar a la vez por el mismo medio | Dos soltando la misma frase a la vez |
| **Datagrama** | El nombre formal del paquete a nivel IP | El mismo sobre con corbata |
| **Dirección IP** | El domicilio lógico, cambiable, de un dispositivo | Calle y número de tu casa |
| **Dirección MAC** | La identidad de fábrica de la tarjeta de red | La matrícula del coche: no se cambia |
| **DNS** | Traduce nombres de dominio a direcciones IP | La guía telefónica de la red |
| **Firewall** | Barrera que filtra el tráfico según unas reglas | El portero que solo deja entrar a los invitados |
| **Gateway (pasarela)** | El equipo que es la puerta de salida de tu red | La frontera entre tu barrio y el resto |
| **Host** | Cualquier equipo conectado a la red | Un habitante de la red |
| **Hub** | Repetidor tonto que reenvía a todos los puertos | El altavoz que repite lo de todos para todos |
| **LAN** | Red local dentro de un edificio o zona pequeña | El barrio del equipo |
| **Máscara de red** | Marca qué parte de la IP identifica la red y cuál el equipo | La regla que dice "quién es de la calle" |
| **Módem** | Traduce la señal del operador a datos de tu red | El intérprete de dos idiomas |
| **NAT** | Muchos equipos privados con una única IP pública | El traductor que sale a la calle por todos |
| **Paquete** | Trozo de datos con sus direcciones | El sobre con remite y destino |
| **Puerto (lógico)** | Número que identifica un servicio en un equipo | El número de despacho del edificio |
| **Protocolo** | Reglas comunes para que dos equipos se entiendan | El idioma acordado de antemano |
| **Router** | Une redes distintas y decide la ruta de cada paquete | El semáforo de la ruta con el mapa |
| **Servidor** | Máquina que da servicio a muchos clientes a la vez | La biblioteca del barrio |
| **Switch** | Conecta los equipos de una red y aprende quién está en cada puerto | La centralita que sabe qué número es cada casa |
| **Tráfico** | El conjunto de todos los datos que circulan por la red | Los coches que van y vienen por la ciudad |
| **VLAN** | Red lógica aislada que convive en el mismo cableado | Edificio con dos portales que no se pasan información |
| **WAN** | Red que une redes lejanas (Internet es la mayor) | La autopista entre ciudades |
| **Wi-Fi** | Técnica de transmitir datos por el aire, sin cables | El camino invisible frente al cable visible |

> 📌 **Por qué este formato:** cada frase es intencionadamente corta. Si necesitas profundidad en un término, pulsa el índice y busca su unidad: cada una de estas palabras vuelve con su capítulo, su práctica y su examen.

> 🧠 **Truco de estudio (de verdad):** coge el glosario e intenta explicar cada término a otra persona **sin** mirar la tabla. El momento en que tu explicación no coincide con la definición es justamente el término que te falta repasar. Ese "no me sale" es oro puro para estudiar.

---

## ❓ Preguntas que (casi) todos se plantean en voz baja

Estas son las preguntas reales que se repiten año tras año en la academia, contadas con esa media voz de "¿me está oyendo alguien?". Tranquilidad: son las mejores preguntas posibles, y aquí van las respuestas en serio.

### ¿Internet y la web son lo mismo?

**No.** Internet es la **red de redes**: el conjunto de cables, routers y acuerdos globales. La **web** es un **servicio** que viaja sobre Internet, como el correo electrónico o WhatsApp. La analogía que ya conoces: Internet es la carretera; la web es uno de los camiones que la recorre.

<details>
<summary>🔎 Un poco más de detalle</summary>

Cuando escribes "www.google.com", el navegador usa **HTTP/HTTPS**, que es el protocolo de la web. Pero por esa misma carretera van también el correo (email), el ping, las videollamadas o los archivos de torrents: cada servicio con su protocolo. La web es el pasajero más famoso, no el único.
</details>

### ¿Rompo algo si toco el router?

**Tocar, no:** los botones están pensados para usarse. Un reinicio puntual no daña el aparato en sí; lo que puedes "romper" sin querer es **la paciencia de la gente** y (peor) la configuración si entras a los menús a oscuras. La regla de oro: **no reinicies una red que funcione sin necesidad**; y si entras en la configuración, cambia una cosa cada vez y anótalo (eso ya lo sabes por la escalera de la página anterior).

**Extensión:** en los routers domésticos, el botoncito "RESET" (el del agujerito) sí es delicado: restablece a fábrica la configuración entera. Ese, en reposo, no se toca.

### ¿Todos los cables de red son iguales?

Por fuera, el RJ45 dorado siempre parece el mismo; por dentro no. Tres diferencias clásicas:

- **Directo vs. cruzado**: el primero conecta PC↔switch (el caso habitual hoy en día), el segundo se usaba para unir equipos del mismo tipo. Los equipos y switches modernos lo detectan casi siempre automáticamente.
- **Categoría**: Cat 5e, Cat 6, Cat 6a… a más categoría, más velocidad soporta de forma fiable.
- **Cobre vs. fibra**: el cable de cobre lleva señales eléctricas; la fibra lleva luz, y por eso aguanta distancias y velocidades mucho mayores.

Todo esto lo abres en la **U03** con crimpadora en mano.

### ¿Mi PC puede ser un servidor?

**Sí.** Técnicamente, con instalar un servicio (por ejemplo, un servidor web) y exponerlo a la red, tu portátil ya "sirve". Lo que ocurre en la práctica es que un *servidor* de verdad es una máquina **pensada para eso**: mejor procesador, discos redundantes, fuentes dobles, respaldos y una sala pensada para los fallos. Es la misma diferencia entre el carrito del bar y la cocina del restaurante grande: ambos cocinan, pero no aguantan la misma cola de pedidos.

### ¿Hace falta ser muy bueno en matemáticas?

No. Para diagnosticar y montar hace falta **lógica y cuidado**, no cálculo avanzado. Las matemáticas del curso son de las amables: potencias de dos, suma de octetos y ese pequeño vistazo a las máscaras IPv4. No se certifica a nadie por saber álgebra; se certifica por **saber razonar el camino del paquete**.

### ¿Qué pasa si dos ordenadores tienen la misma IP?

Que ambos reclaman el mismo "domicilio". El resultado típico es el **conflicto de IP**:

- uno se queda sin conexión mientras el otro funciona, o
- se pisan: uno va bien un rato y el otro se cae,
- y en el equipo de red aparecen avisos de "dirección duplicada".

La analogía: dos cartas van al mismo número de portal, y el cartero no sabe a quién entregar. En las redes modernas el protocolo DHCP (lo verás en la U10) reparte direcciones evitando choques, pero los conflictos manuales existen y se diagnostican justamente con la escalera de la página anterior.

<details>
<summary>🩻 Cómo se detecta un conflicto de IP a pelo</summary>

En el equipo afectado, `ipconfig` o `ip addr` mostrará el aviso de conflicto de direcciones, o simplemente la red no responde. La solución honesta: ponle una IP que no esté usando nadie (o déjalo en DHCP) y el asunto se resuelve solo.
</details>

---

## 🎬 Post-Créditos del Tema 0

**Escena de después de los créditos. No hay nadie en la sala: solo el parpadeo de un switch y la caja de la compañía, que se enciende sola.**

> *La caja blanca, con su módem-router-punto de acceso de tres en uno, mira a la oscuridad y bosteza.*
>
> **Caja:** — «Me llaman "router" y soy, en realidad, tres trastes juntos. Pobre gente, conmigo se pasan de listos…»
>
> **Un switch, encendido por casualidad desde el rincón:** — «¡Pues acostúmbrate! Aquí dentro se te va a juzgar por tu trabajo, no por tu diseño. Y empieza enseguida.»
>
> **Caja:** — «¿Y qué empieza?»
>
> **Switch:** — «La U01, caja. La U01. Y si te crees grande, aún no has visto lo que es una red *bien* administrada.»

Se apaga todo: **el Tema 0 se acaba aquí, y en la próxima página empieza el viaje de verdad.**

> **PRÓXIMAMENTE EN U01: · Fundamentos de redes — tipos de redes, topologías y el primer switch de verdad, con CONRAD en plena forma y en modo "te lo dije".** 🚪→🌐

---

## ✅ Cierre del Tema

Si has llegado leyendo hasta aquí, ya sabes *de qué va* la fiesta: las piezas de toda red, el vocabulario para nombrarla, el laboratorio para probarla y el método para arreglarla. Todo lo que viene ahora es jugar con eso. Nos vemos en la puerta de la siguiente unidad.

| Lo que te llevas del Tema 0 | Para qué te servirá desde ya |
|---|---|
| El vocabulario (IP, MAC, paquete, protocolo…) | Hablar el idioma del curso desde la primera clase |
| Packet Tracer instalado y probado | Montar tu primera red en la U01 sin miedo |
| La escalera del ping | Comprender cada práctica de laboratorio |
| El mapa del curso | Saber en qué estación estás en cada momento |

📚 [Volver al índice del Tema 0](/ApuntesRedes/00-introduccion) · **Siguiente:** [U01 · Fundamentos de redes](/ApuntesRedes/01-fundamentos-redes)