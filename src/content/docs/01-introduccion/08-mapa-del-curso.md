---
title: 08 — El mapa del curso
description: Las 12 etapas para pasar de cero a administrador de redes 🗺️
---

<p><small>Las 12 etapas para pasar de cero a administrador de redes 🗺️</small></p>

> 🗺️ **Estás en:** 🚪 **Introducción** → 08 · El mapa del curso

---

## 🗺️ Un viaje de 12 paradas

Este curso funciona como un viaje en tren: **el orden importa, y mucho**. Igual que no llegas a Barcelona sin pasar antes por Zaragoza, no puedes segmentar una red en VLANs sin saber primero qué hace un switch, ni puedes sacar una red a Internet sin haber entendido las direcciones IP.

Antes de escribir una sola línea de configuración, vas a ver el plano completo: **dónde estás, qué paradas hay y qué vas a saber hacer al bajarte de cada una**. Así, cuando estés en la unidad de dirección IP calculando subredes, sabrás exactamente para qué lo estás haciendo.

---

## 🧭 Las 12 etapas del viaje

| Nº | Etapa | Al terminar sabrás hacer… | Necesitas haber entendido antes |
|---|---|---|---|
| 1 | 📡 **Ethernet, medios y cableado** | Elegir entre cobre y fibra, crimpar un latiguillo y leer una trama Ethernet | La introducción |
| 2 | 🧮 **Direccionamiento IP y subnetting** | Calcular subredes con VLSM y convivir con IPv6 | Las IPs y el medio (Ethernet y cableado) |
| 3 | 🔀 **Switching y VLAN** | Configurar switches, entender la tabla MAC y segmentar con VLANs | Qué hace un switch (introducción) y las IPs (dirección IP) |
| 4 | 🏢 **Trunking e inter-VLAN** | Montar trunks 802.1Q y hacer que las VLANs se hablen | Switching y VLANs |
| 5 | 🧭 **Enrutamiento estático** | Configurar un router y escribir sus rutas a mano | Subredes (dirección IP) y routers entre VLANs (trunking) |
| 6 | 🗣️ **OSPF** | Dejar que los routers se hablen entre ellos y elijan la mejor ruta | Enrutamiento estático |
| 7 | 🛡️ **ACL y seguridad** | Filtrar el tráfico y blindar el acceso a los dispositivos | IPs y subredes (dirección IP) y routing (estático y OSPF) |
| 8 | 🌍 **NAT y PAT** | Dar salida a Internet a una red privada con una sola IP pública | Routing (estático y OSPF) y subredes (dirección IP) |
| 9 | 🗄️ **Servicios de red** | Desplegar DHCP, DNS y NTP y diagnosticarlos | IPs (dirección IP) y routing (estático) |
| 10 | 📶 **Redes inalámbricas** | Diseñar una WLAN: canales, cobertura y seguridad | Cableado (Ethernet), IPs (dirección IP) y VLANs (switching) |
| 11 | 🔁 **Alta disponibilidad** | Montar redes que aguanten la caída de un equipo | Switching, trunks y routing (estático) |

> 📌 **Cómo leer la tabla:** cada fila solo tiene sentido si has hecho la de arriba. Es la "escalera" del curso: si te saltas un peldaño, el siguiente te va a costar el doble. La introducción (estas páginas) es el vestíbulo: sin ella, Ethernet te sonará a chino.

![Las 12 etapas del curso en dos cuatrimestres: a la alta disponibilidad](/ApuntesRedes/diagrams/u01-mapa-curso.svg)

---

## 🧩 Las tres piezas invisibles de la ruta

El mapa de 12 paradas es solo el plano: en la mochila viajan, además, tres cosas que no son unidades pero que te acompañan en todo el recorrido.

| Pieza | Qué es | Cuándo la usarás |
|---|---|---|
| **La introducción** | El vestíbulo que estás cruzando ahora mismo | Antes de cada unidad, para refrescar vocabulario y método |
| **Boletines** | Ejercicios de cada unidad (inicial y avanzado, con sus resueltos) | Al terminar cada unidad, para saber si la etapa está cerrada |
| **Laboratorios** | Prácticas con Packet Tracer con fallos puestos a propósito | Dentro de cada unidad, para entrenar el diagnóstico |

No existe ninguna etapa de "solo teoría": cada unidad trae su boletín y su laboratorio. Si terminaste una unidad sin tocar un solo botón, vuelve a ella despacio antes de seguir.

---

## ⛓️ El mapa de dependencias: qué exige cada unidad

Si la tabla de las 12 etapas era el plano, este mapa de puentes te dice cuándo una unidad se sostiene literalmente sobre la anterior. No es para memorizarlo, es para no sorprenderte:

| Para llegar a… | Necesitas dominar… | Por qué |
|---|---|---|
| IPv6 | IPv4 | IPv6 se entiende comparándolo con su hermano mayor |
| VLANs | Switching | Una VLAN se monta sobre la lógica del switch |
| Trunking | VLANs | Un trunk lleva varias VLANs: sin entender la VLAN, el trunk es magia |
| OSPF | Enrutamiento estático | El enrutamiento dinámico amplía el estático, no lo reemplaza sin más |
| NAT | Dirección IP + Enrutamiento estático | Se necesita saber qué subredes usas para poder disfrazarlas |
| Servicios | Dirección IP + Enrutamiento estático | DHCP reparte IPs y DNS resuelve nombres: sin routing no llegan a nadie |
| Alta disponibilidad | Switching + Trunking + Enrutamiento estático | Redundancia es repetir lo que ya funciona: switches, trunks y routers |

> 🧠 **La regla de oro del repetidor:** si una unidad te suena a "de otro universo", casi nunca es que sea imposible, sino que te falta un puente de la lista de arriba. Baja un peldaño, refuerza, y vuelve a subir. Eso es estudiar, no un acto de fe.

---

## 🎯 Los dos cuatrimestres del viaje

Para no perderte en las 12 paradas, recuerda que el curso se organiza en **dos grandes mitades**:

| Hito | Etapas | La idea en una frase |
|---|---|---|
| 🏗️ **Primer cuatrimestre: montar la red** | Ethernet → Enrutamiento estático | De cero a una red local funcionando: cables, IPs, switches, VLANs y routers |
| 🌍 **Segundo cuatrimestre: conectarla y cuidarla** | OSPF → Alta disponibilidad | OSPF, ACLs, NAT, servicios, WiFi y redundancia: tu red habla con el mundo y no se cae |

**Primer cuatrimestre (del cableado al enrutamiento estático).** Construimos desde los cimientos: qué cables sostienen la red, cómo se direccionan los paquetes, cómo los switches las mantienen ordenadas y separadas en VLANs y cómo los routers las encaminan. Al terminar serás capaz de **montar y dejar funcionando la red local de un centro educativo pequeño**, con sus equipos, su cableado y sus VLANs.

**Segundo cuatrimestre (de OSPF a la alta disponibilidad).** Es el momento de abrir puertas y cerrar grietas: los routers aprenden rutas solos (OSPF), filtramos quién entra y quién sale (ACLs), conectamos todo a Internet con una sola IP pública (NAT), desplegamos los servicios que hacen que la red sea útil (DHCP, DNS, NTP), llevamos la red al aire (WiFi) y la blindamos contra averías (alta disponibilidad). Aquí tu "red de edificio" se convierte en "un ciudadano del mundo que nunca se cae".

La ventaja de las dos mitades es que te sirven para **hablar de ti en una entrevista de trabajo** o en un proyecto: "monté la red local de un centro" (cuatrimestre 1) y "la conecté al mundo y la hago tolerante a fallos" (cuatrimestre 2). Si algún día te preguntan "¿qué sabes hacer?", ya tienes la respuesta preparada en dos frases.

---

## 🪜 ¿Por qué este orden y no otro?

Piénsalo como una receta de cocina: no tienes que memorizar la receta entera, pero **sí tienes que seguir los pasos en orden**. Tampoco vale echar la levadura antes que la harina, por mucho que te parezca "lo mismo".

En este curso hay tres ejemplos de esa dependencia que conviene ver venir:

- **No hay VLANs sin switching.** Una VLAN se monta *sobre* un switch. Si no sabes qué hace un switch, la VLAN es un acto de fe.
- **No hay routing sin IPs.** Enrutar es decidir por dónde va un paquete *según su dirección IP*. Si no dominas las subredes (dirección IP), no hay nada que enrutar (enrutamiento estático).
- **No hay Internet sin NAT.** Tu red privada usa direcciones de casa; para salir al mundo necesita NAT, que depende del routing (estático y OSPF) y de que entiendas qué es una IP pública.

> 💡 **Mantra del curso:** *"El orden no es un capricho del profesor: es el argumento de la asignatura."* Cuando dudes de por qué estudias algo, vuelve a esta página.

---

## 📦 El viaje del paquete (la historia en 3 párrafos)

Para terminar el mapa, la misma historia que dará forma a todo el curso, contada desde el punto de vista del protagonista: **un paquete de datos**.

**Párrafo 1 — El nacimiento.** Todo empieza cuando un programa de tu ordenador quiere enviar algo (un correo, una web, un mensaje). Esa petición se trocea en paquetes, cada uno con su dirección de origen y de destino escrita en el sobre. Antes de nacer, el paquete pide prestada su IP al **DHCP** y pregunta al **DNS** por la dirección del destino: los servicios de red están ahí desde el primer minuto, aunque no los veas. El paquete nace dentro de tu red local.

**Párrafo 2 — La travesía.** Dentro de tu edificio, el paquete salta de su equipo al **switch**, que lo deja en el equipo correcto de la misma red, o lo pasa al **router** cuando la dirección apunta fuera (y si viene de otra VLAN, antes cruzó un trunk). El router mira la dirección, decide la mejor ruta (estática u OSPF) y, si el destino está en Internet, el paquete sale disfrazado por **NAT**: la IP privada de casa se cambia por la IP pública de la conexión. Ya está en el mundo.

**Párrafo 3 — El regreso.** El servidor de destino recibe el paquete, lo procesa y envía la respuesta por el camino (quizá distinto) de vuelta a casa. Por el camino, el paquete puede cruzar un tramo inalámbrico y confía en que, si algún equipo se cae, la red tenga un plan B (alta disponibilidad). Cuando la respuesta llega a tu pantalla, el viaje del paquete ha terminado… y este curso te habrá enseñado a acompañarlo en cada tramo.

**Y aquí está la gracia del mapa:** cada tramo de ese viaje tiene su unidad, y ninguna unidad estudia dos veces el mismo tramo. En una tabla, queda así:

| Tramo del viaje del paquete | Lo estudiarás en |
|---|---|
| El paquete pide IP y pregunta nombres | Servicios de red (DHCP y DNS) |
| El paquete recorre tu edificio por cable | Ethernet y cableado + Switching y VLAN |
| El paquete salta entre VLANs | Trunking e inter-VLAN |
| El paquete cruza fronteras entre redes | Enrutamiento estático y OSPF |
| El paquete pasa el filtro de seguridad | ACL y seguridad |
| El paquete sale al ancho mundo | NAT y PAT |
| El paquete vuela por el aire | Redes inalámbricas |
| El paquete aguanta aunque falle un equipo | Alta disponibilidad |

---

## 🧭 Cómo usar este mapa (y no naufragar en el intento)

Un mapa no se memoriza: se consulta. Tres usos de verdad para este plano:

1. **Antes de empezar una unidad**, vuelve aquí y lee su fila: sabrás qué esperar al terminar y no te cogerá de sorpresa ningún término.
2. **Si una unidad se te atraganta**, mira la columna "Necesitas haber entendido antes": muchas veces el dolor viene de la unidad previa, no de la actual. Refuerza la anterior y verás cómo la siguiente encaja.
3. **Al cerrar cada unidad con boletín**, resuélvelo: si lo terminas sin abrir las soluciones, esa etapa está oficialmente cerrada.

> 🎯 **La mejor inversión del viaje:** no seas el pasajero que sale del tren sin mirar por la ventana. Cada unidad enlaza con la siguiente, y el mapa está aquí para que sepas, en todo momento, en qué estación vas y por qué.

---

## ✅ Resumen en 3 frases

1. El curso es un viaje en orden: 12 unidades donde cada una se apoya en la anterior y los saltos se pagan caros.
2. Dos mitades: **montar** la red (del cableado al enrutamiento) y **conectarla y cuidarla** (de OSPF a la alta disponibilidad).
3. El hilo conductor es el viaje del paquete: nace en tu PC, cruza switches y routers, sale a Internet por NAT y vuelve con la respuesta.

📚 [Volver al índice de la unidad](/ApuntesRedes/01-introduccion) · **Anterior:** [07 · Instalación de Packet Tracer](/ApuntesRedes/01-introduccion/07-instalacion-packet-tracer) · **Siguiente:** [09 · Glosario](/ApuntesRedes/01-introduccion/09-glosario)
