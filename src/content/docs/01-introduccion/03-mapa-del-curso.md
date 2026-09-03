---
title: 03 — El mapa del curso
description: Las 13 etapas para pasar de cero a administrador de redes 🗺️
---

<p><small>Las 13 etapas para pasar de cero a administrador de redes 🗺️</small></p>

> 🗺️ **Estás en:** 🚪 **Unidad 01** → 03 · El mapa del curso

---

## 🗺️ Un viaje de 13 paradas

Este curso funciona como un viaje en tren: **el orden importa, y mucho**. Igual que no llegas a Barcelona sin pasar antes por Zaragoza, no puedes segmentar una red en VLANs sin saber primero qué hace un switch, ni puedes sacar una red a Internet sin haber entendido las direcciones IP.

Antes de escribir una sola línea de configuración, vas a ver el plano completo: **dónde estás, qué paradas hay y qué vas a saber hacer al bajarte de cada una**. Así, cuando estés en la U05 calculando subredes, sabrás exactamente para qué lo estás haciendo.

---

## 🧭 Las 13 etapas del viaje

| Nº | Etapa | Al terminar sabrás hacer… | Necesitas haber entendido antes |
|---|---|---|---|
| 0 | 🚪 **Unidad 01 · Bienvenida** | Hablar el idioma básico de las redes y tener las herramientas listas | Nada: esta es la puerta de entrada |
| 1 | 🌐 **U02 · Fundamentos de redes** | Distinguir tipos de redes, topologías y dispositivos, y montar una red sencilla | La Unidad 01 |
| 2 | 📦 **U03 · Modelos OSI y análisis de tráfico** | Explicar las capas de la comunicación y leer capturas reales con Wireshark | Qué es un paquete y qué es una dirección (Unidad 01) |
| 3 | 🔌 **U04 · Infraestructura física** | Elegir entre cobre y fibra, y cablear un armario de comunicaciones | Las capas de la U03 |
| 4 | 🧮 **U05 · IPv4 y subnetting** | Calcular subredes a mano y explicar por qué dos IPs se entienden | IPs de la Unidad 01 y paquetes de la U03 |
| 5 | 🚀 **U06 · IPv6 y transición** | Dominar el direccionamiento IPv6 y hacer que conviva con IPv4 | Direccionamiento IPv4 (U05) |
| 6 | 🔀 **U07 · Switching y STP** | Configurar switches y evitar que los bucles hundan la red | Qué hace un switch (U02) y las capas (U03) |
| 7 | 🏢 **U08 · VLANs** | Segmentar una red física en redes lógicas aisladas | Switching (U07) |
| 8 | 🧭 **U09 · Routing y ACLs** | Encaminar paquetes entre redes y filtrar el tráfico con listas de control | IP y subredes (U05) |
| 9 | 🗣️ **U10 · Routing dinámico (OSPF)** | Dejar que los routers se hablen entre ellos y elijan la mejor ruta | Routing y ACLs (U09) |
| 10 | 🌍 **U11 · NAT y acceso a Internet (DHCP)** | Dar salida a Internet a una red privada y repartir IPs automáticamente | Subredes (U05) y routing (U09-U10) |
| 11 | 🩺 **U12 · Diagnóstico y monitorización (SNMP)** | Cazar averías con método y vigilar la red como un NOC | Ping y método de la Unidad 01, más IP (U05) |
| 12 | ☁️ **U13 · Cloud, virtualización y futuro** | Situar el oficio en la nube y saber hacia dónde camina la profesión | Todo el curso, sobre todo U11 y U12 |

> 📌 **Cómo leer la tabla:** cada fila solo tiene sentido si has hecho la de arriba. Es la "escalera" del curso: si te saltas un peldaño, el siguiente te va a costar el doble. La Unidad 01 (estas páginas) es el vestíbulo: sin él, la U02 te sonaría a chino.

---

## 🧩 Las dos piezas invisibles de la ruta

El mapa de 13 paradas es solo el plano: en la mochila viajan, además, dos cosas que no son unidades pero que te acompañan en todo el recorrido.

| Pieza | Qué es | Cuándo la usarás |
|---|---|---|
| **Unidad 01** | El vestíbulo que estás cruzando ahora mismo | Antes de cada unidad, para refrescar vocabulario y método |
| **Boletines** | Ejercicios de cada unidad (inicial, intermedio y avanzado) | Al terminar cada unidad, para saber si la etapa está cerrada |
| **Laboratorios** | Prácticas con Packet Tracer con fallos puestos a propósito | Dentro de cada unidad, para entrenar el diagnóstico |

No existe ninguna etapa de "solo teoría": cada unidad trae su boletín y su laboratorio. Si terminaste una unidad sin tocar un solo botón, vuelve a ella despacio antes de seguir.

---

## ⛓️ El mapa de dependencias: qué exige cada unidad

Si la tabla de las 13 etapas era el plano, este mapa de puentes te dice cuándo una unidad se sostiene literalmente sobre la anterior. No es para memorizarlo, es para no sorprenderte:

| Para llegar a… | Necesitas dominar… | Por qué |
|---|---|---|
| U06 · IPv6 | U05 · IPv4 | IPv6 se entiende comparándolo con su hermano mayor |
| U08 · VLANs | U07 · Switching | Una VLAN se monta sobre la lógica del switch |
| U10 · OSPF | U09 · Routing | El enrutamiento dinámico amplía el estático, no lo reemplaza sin más |
| U11 · NAT | U05 + U09 | Se necesita saber qué subredes usas para poder disfrazarlas |
| U12 · Diagnóstico | Unidad 01 y U05 | La escalera del ping pide saber qué IPs está pidiendo |
| U13 · Cloud | U11 y U12 | La nube se describe con NAT, routing y monitorización |

> 🧠 **La regla de oro del repetidor:** si una unidad te suena a "de otro universo", casi nunca es que sea imposible, sino que te falta un puente de la lista de arriba. Baja un peldaño, refuerza, y vuelve a subir. Eso es estudiar, no un acto de fe.

---

## 🎯 Los tres hitos del viaje

Para no perderte en las 13 paradas, recuerda que el curso se organiza en **tres grandes hitos**:

| Hito | Etapas | La idea en una frase |
|---|---|---|
| 🏗️ **Montar redes LAN seguras** | U02 → U08 | De cero a una red local funcionando: dispositivos, cables, switching y VLANs |
| 🌍 **Unirlas al mundo** | U09 → U11 | Routers, rutas y NAT: tu red pequeña empieza a hablar con Internet |
| 🩺 **Gestionarlas** | U12 → U13 | Vigilar, diagnosticar y pensar en la red del futuro |

**Hito 1 (U02–U08).** Construimos desde los cimientos: qué es una red, por qué se organiza en capas, qué cables la sostienen, cómo se direccionan los paquetes y cómo los switches las mantienen ordenadas y separadas. Al terminar el hito serás capaz de **montar y dejar funcionando la red local de un centro educativo pequeño**, con sus equipos, su cableado y sus VLANs.

**Hito 2 (U09–U11).** Es el momento de abrir puertas: aprendemos a encaminar paquetes entre redes distintas (routing), a filtrar quién entra y quién sale (ACLs) y a conectar todo a Internet con una sola IP pública (NAT). Aquí tu "red de edificio" se convierte en "un ciudadano más del mundo".

**Hito 3 (U12–U13).** Una red montada necesita a alguien que la cuide: métodos de diagnóstico, monitorización con SNMP y, de propina, la mirada hacia la nube y la virtualización para que entiendas dónde estás pisando en el futuro.

La ventaja de los tres hitos es que te sirven para **hablar de ti en una entrevista de trabajo** o en un proyecto: "monté una red local de un centro" (hito 1), "la conecté al mundo" (hito 2) y "la mantengo vigilada y documentada" (hito 3). Si algún día te preguntan "¿qué sabes hacer?", ya tienes la respuesta preparada en tres frases.

---

## 🪜 ¿Por qué este orden y no otro?

Piénsalo como una receta de cocina: no tienes que memorizar la receta entera, pero **sí tienes que seguir los pasos en orden**. Tampoco vale echar la levadura antes que la harina, por mucho que te parezca "lo mismo".

En este curso hay tres ejemplos de esa dependencia que conviene ver venir:

- **No hay VLANs sin switching.** Una VLAN se monta *sobre* un switch. Si no sabes qué hace un switch (U07), la VLAN (U08) es un acto de fe.
- **No hay routing sin IPs.** Enrutar es decidir por dónde va un paquete *según su dirección IP*. Si no dominas las subredes (U05), no hay nada que enrutar (U09).
- **No hay Internet sin NAT.** Tu red privada usa direcciones de casa; para salir al mundo necesita NAT (U11), que depende del routing (U09-U10) y de que entiendas qué es una IP pública.

> 💡 **Mantra del curso:** *"El orden no es un capricho del profesor: es el argumento de la asignatura."* Cuando dudes de por qué estudias algo, vuelve a esta página.

---

## 📦 El viaje del paquete (la historia en 3 párrafos)

Para terminar el mapa, la misma historia que dará forma a todo el curso, contada desde el punto de vista del protagonista: **un paquete de datos**.

**Párrafo 1 — El nacimiento.** Todo empieza cuando un programa de tu ordenador quiere enviar algo (un correo, una web, un mensaje). Esa petición se trocea en paquetes, cada uno con su dirección de origen y de destino escrita en el sobre. Esas reglas de cómo se construye, se etiqueta y se entiende el paquete son las **capas** que estudiaremos en la U03. El paquete nace dentro de tu red local.

**Párrafo 2 — La travesía.** Dentro de tu edificio, el paquete salta de su equipo al **switch**, que lo deja en el equipo correcto de la misma red, o lo pasa al **router** cuando la dirección apunta fuera. El router mira la dirección, decide la mejor ruta (U09-U10) y, si el destino está en Internet, el paquete sale disfrazado por **NAT** (U11): la IP privada de casa se cambia por la IP pública de la conexión. Ya está en el mundo.

**Párrafo 3 — El regreso.** El servidor de destino recibe el paquete, lo procesa y envía la respuesta por el camino (quizá distinto) de vuelta a casa. Por el camino, alguien vigila: el **administrador** usa ping, capturas y monitorización (U12) para asegurarse de que nadie se pierde ni se retrasa. Cuando la respuesta llega a tu pantalla, el viaje del paquete ha terminado… y este curso te habrá enseñado a acompañarlo en cada tramo.

**Y aquí está la gracia del mapa:** cada tramo de ese viaje tiene su unidad, y ninguna unidad estudia dos veces el mismo tramo. En una tabla, queda así:

| Tramo del viaje del paquete | Lo estudiarás en |
|---|---|
| El paquete se construye y se etiqueta | U03 · Modelos OSI y análisis con Wireshark |
| El paquete recorre tu edificio | U07 · Switching y U08 · VLANs |
| El paquete cruza fronteras entre redes | U09 · Routing y ACLs |
| El paquete sale al ancho mundo | U11 · NAT (y DHCP reparte las IPs) |
| Alguien sigue el rastro del paquete | U12 · Diagnóstico y monitorización |

---

## 🧭 Cómo usar este mapa (y no naufragar en el intento)

Un mapa no se memoriza: se consulta. Tres usos de verdad para este plano:

1. **Antes de empezar una unidad**, vuelve aquí y lee su fila: sabrás qué esperar al terminar y no te cogerá de sorpresa ningún término.
2. **Si una unidad se te atraganta**, mira la columna "Necesitas haber entendido antes": muchas veces el dolor viene de la unidad previa, no de la actual. Refuerza la anterior y verás como la siguiente encaja.
3. **Al cerrar cada unidad con boletín**, resuélvelo: si lo terminas sin abrir las soluciones, esa etapa está oficialmente cerrada.

> 🎯 **La mejor inversión del viaje:** no seas el pasajero que sale del tren sin mirar por la ventana. Cada unidad enlaza con la siguiente, y el mapa está aquí para que sepas, en todo momento, en qué estación vas y por qué.

---

## ✅ Resumen en 3 frases

1. El curso es un viaje en orden: cada unidad se apoya en la anterior y los saltos se pagan caros.
2. Tres hitos: **montar** redes LAN seguras (U02-U08), **unirlas** al mundo (U09-U11) y **gestionarlas** (U12-U13).
3. El hilo conductor es el viaje del paquete: nace en tu PC, cruza switches y routers, sale a Internet por NAT y vuelve con la respuesta.

📚 [Volver al índice de la Unidad 01](/ApuntesRedes/01-introduccion) · **Siguiente:** [04 · Las herramientas del oficio](/ApuntesRedes/01-introduccion/04-herramientas)