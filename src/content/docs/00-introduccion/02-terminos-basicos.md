---
title: 02 — Términos que no se ven
description: El vocabulario mínimo para no perderte entre cables 🧩
---

<p><small>El vocabulario mínimo para no perderte entre cables 🧩</small></p>

> 🗺️ **Estás en:** 🚪 **Tema 0** → 02 · Términos que no se ven

---

## 🧩 Las quince palabras que repetirás todo el curso

Toda profesión tiene su jerga, y la de redes empieza con unas cuantas palabras que aparecen desde el minuto uno y luego no hacen más que repetirse. No te pido que las memorices: **esta tabla es tu chuleta de referencia**. Cuando una unidad nombre un término y te entre el vértigo, vuelve aquí, mira la idea y sigue adelante.

| Término | Qué es en una idea | Analogía para que no se te olvide |
|---|---|---|
| **Bit** | La unidad mínima de información: un 0 o un 1 | Un interruptor: encendido o apagado |
| **Byte** | Un grupo de 8 bits (equivale a una letra o un número) | La cajita que contiene 8 interruptores |
| **Paquete / Datagrama** | Un trozo de datos con dirección que viaja por la red | Una carta con remite y destinatario |
| **Dirección IP** | El "domicilio" lógico de un dispositivo dentro de una red | La calle y el número de tu casa |
| **Dirección MAC** | El DNI físico y único grabado en la tarjeta de red | La matrícula del coche: no cambia jamás |
| **Router** | Une tu red con otras redes o con Internet | El control de fronteras del barrio |
| **Switch** | Conecta los equipos de una misma red | La centralita que pone en contacto a los vecinos |
| **Punto de acceso (AP)** | Convierte el cable en señal Wi-Fi | El altavoz que reparte la señal por el aire |
| **Módem** | Traduce la señal de tu operador a datos que tu red entiende | El intérprete de dos idiomas |
| **Servidor** | Máquina preparada para dar servicio a muchos clientes | La biblioteca del barrio |
| **Cliente** | Todo dispositivo que pide un servicio | El vecino que va a por libros |
| **Protocolo** | Las reglas comunes para que dos máquinas se entiendan | El idioma que todos aceptan hablar |
| **Wi-Fi** | Una forma de transmitir datos por el aire, sin cables | El camino invisible frente al cable visible |
| **Cable RJ45** | El conector y el cable típicos de las redes locales | La carretera por la que corren los datos |
| **Puerto** | El hueco físico para el cable, o el número que identifica un servicio | La toma de la pared y el número de despacho |

> 📌 **Ojo con "puerto":** cuando leas *"abrir el puerto 80"*, se refiere al **número lógico** que identifica un servicio (como el número de un despacho dentro de un edificio), no al conector del cable. Lo veremos en serio en la U02 con los protocolos de transporte.

---

## 🔢 Bit y byte: la bombilla y la caja

Antes de hablar de redes necesitamos saber de qué están hechos los datos. Vamos con la abstracción más simple que existe:

- Un **bit** es una decisión binaria: **0 o 1**. Piensa en una sola bombilla: está *encendida* (1) o *apagada* (0). No hay tercera opción, no vale "medio encendida".
- Un **byte** es un grupo de **8 bits**. ¿Por qué en grupos de 8? Porque con 8 interruptores caben 256 combinaciones distintas (2⁸ = 256), exactamente lo que se necesita para representar una letra, un número o un símbolo.

| Medida | Cuántos bits son | Qué cabe dentro (más o menos) |
|---|---|---|
| Bit | 1 bit | Un sí o un no |
| Byte | 8 bits | Una letra o un número pequeño |
| Kilobyte (KB) | ~8.000 bits | Un párrafo o un par de páginas |
| Megabyte (MB) | ~1.000 KB | Una canción o una decena de fotos |
| Gigabyte (GB) | ~1.000 MB | Una película o muchos documentos |

> 🧠 **Interés práctico:** cuando leas "32 bits" o "48 bits" en las direcciones, ahora ya sabes que eso significa "32 o 48 interruptores". La puerta con las direcciones IP (que son números de 32 bits) la abriremos en la U04.

---

## 🏠 IP y MAC: el domicilio y el DNI de la tarjeta

Vamos a sepultar de una vez el malentendido número uno del oficio: **dirección IP y dirección MAC no son lo mismo**, aunque siempre aparezcan juntas.

Piensa en tu barrio como lo ve el servicio de correos:

- Para que un repartidor te encuentre, tu casa tiene una **dirección** (calle y número). En redes, eso es la **dirección IP**: le dice al sistema *dónde* estás dentro de la red. La IP **puede cambiar**: te mudas de casa, cambias de red o el router te entrega una nueva cada vez que te conectas.
- Además, tu casa tiene una **identidad** fija que nadie te quita: la matrícula del portal o del buzón. En redes, eso es la **dirección MAC**: un número único de fábrica, grabado en tu tarjeta de red, que **no cambia en toda la vida del equipo**.

Ejemplo real que has vivido mil veces: enciendes el portátil en casa y la red le asigna la IP `192.168.1.10`; te lo llevas al instituto, se conecta a otra red y ahora tiene la IP `10.0.0.20`. **La IP ha cambiado.** ¿Y la MAC? La MAC es la misma que cuando salió de la tienda: está grabada por el fabricante dentro de la tarjeta.

> ✅ **Regla de oro:** la IP explica **dónde está** el equipo y *puede cambiar*; la MAC explica **qué equipo es** y *no cambia*. El cartero (la IP) discute la dirección en cada reparto; la matrícula (la MAC) jamás se da de baja.

---

## 🚨 Los grandes malentendidos del novato

Si hay tres confusiones que se repiten año tras año en la academia, son estas:

**(1) "IP no es lo mismo que MAC".** Ya lo hemos resuelto arriba. Dos dispositivos pueden chocar accidentalmente con la misma IP en una red (problema real, está en el glosario), pero la MAC es, prácticamente, única en el planeta.

**(2) "Wi-Fi no es Internet".** El Wi-Fi es *la manera de conectarte*; Internet es *a dónde te conectas*. Cuando el móvil marca "lleno de señal" pero el botón de datos no responde, o cuando el Wi-Fi se ve perfecto y la caja tiene la luz roja desde ayer, sigues **sin Internet**. Distinguir estas dos cosas te ahorrará la mayoría de los malentendidos de tus primeros días como técnico.

**(3) "La caja blanca de mi casa es el router".** Medio cierto. Ese aparato que tu madre llama "el router" es en realidad **tres pájaros de un tiro**:

- El **módem**: traduce la señal que te llega de la compañía telefónica a datos.
- El **router**: une tu red de casa con la red del operador (y de ahí, con el mundo).
- El **punto de acceso**: reparte esa conexión en el Wi-Fi de casa.

En las empresas y en los institutos esos tres papeles los desempeñan **equipos separados**: un router de chapa en el armario, varios switches y un puñado de antenas en el techo. Cuando veamos en Packet Tracer un "router" con antenitas que parece el de tu salón, ya sabrás de qué caja está hablando.

Para que te quede grabado a fuego, el resumen de los tres malentendidos:

| Malentendido | Lo que dice el novato | La verdad en una frase |
|---|---|---|
| IP ≠ MAC | "¿No es lo mismo?" | La IP es la **dirección**, la MAC es la **identidad** |
| Wi-Fi ≠ Internet | "Tengo todo el wifi" | El Wi-Fi conecta tu casa; Internet conecta tu casa **con el mundo** |
| La caja = el router | "Ese aparatito lo es todo" | Es **módem + router + punto de acceso** en un solo cuerpo |

---

## ✉️ ¿Qué "viaja" cuando escribo un mensaje?

Hagamos el experimento mental de la página. Estás en la cocina y **escribes "llego a las ocho"** a un amigo que vive en otra ciudad. ¿Qué, exactamente, atraviesa la red?

- Tu frase no viaja como un texto único: el sistema la **convierte en bytes** y la **trocea en varios fragmentos**. Cada fragmento se mete en un "sobre".
- A cada **sobre** se le apunta la **IP de origen** (tú) y la **IP de destino** (tu amigo). Ese sobre con datos dentro se llama **paquete** (o **datagrama**, el mismo concepto con otro nombre algo más técnico).
- Los paquetes viajan de **router en router**: cada uno mira el sobre y decide "esto va por la autopista a la derecha". El camino de ida (y el de vuelta) puede ser distinto para cada fragmento.
- Al llegar a destino, los fragmentos se **reordenan** en el orden correcto y se arma de nuevo la frase "llego a las ocho".

| Lo que "viaja" realmente por la red | Para qué sirve |
|---|---|
| Los trocitos de datos (bytes) | Transportar tu mensaje entero, troceado |
| La IP de origen y de destino | Quién lo envía y a dónde va (lo que lee el cartero) |
| La MAC del *siguiente* interfaz del tramo | Pasar el sobre de mano en mano, tramo a tramo |
| Las reglas del protocolo | Que nadie se pierda y que el orden se respete |

> 💡 **Confidencialidad:** lo habitual es que el *contenido* viaje cifrado (piensa en el candadito de WhatsApp). El *sobre* (las direcciones) lo van leyendo los equipos intermedios, pero **abrir el sobre** y leer la carta ya es otra historia: eso es lo que hacen los protocolos seguros que estudiarás al final del curso.

---

## 🔍 Reto visual: el "buscador" de la habitación

Antes de cerrar la página, una parada obligatoria para mirar a tu alrededor. Este es el reto visual de hoy, y no necesitas poner nada en marcha:

1. Encuentra en tu cuarto o en el aula **cuatro objetos de hardware** relacionados con la red (cables, cajas con leds, antenas, adaptadores…).
2. Ahora busca **cuatro programas** de usar a diario (cosas que usas pero que **no puedes tocar**): el navegador, el WhatsApp, un editor de texto…
3. Piensa: siendo honestos, **¿qué es un programa?** ¿una cosa? ¿una receta? ¿dónde vive?

La respuesta que perseguimos nos conecta con todo: un cable se toca, pero un programa es una **receta que vive dentro de una máquina** y que no se puede agarrar con la mano. ¿Y qué tiene que ver la red con eso? Que la red sirve, entre otras cosas, para **llevar recetas de una máquina a otra**. 👇

<details>
<summary>✅ Las soluciones del mini-reto</summary>

1. **Hardware tocable:** el cable RJ45, el router físico, la antena, el móvil, el puerto USB… cualquier cosa que se pueda agarrar con la mano y haga algo con señales.
2. **Programas (software):** el navegador, el historial de chat, tu app de notas. No se pueden tocar ni romper: son **conjuntos de instrucciones** que viven dentro de un dispositivo.
3. **Un programa es una *receta***: un texto de instrucciones que la máquina ejecuta paso a paso. No existe sin una máquina donde correr, pero **la red permite enviar recetas** (programas y datos) de una máquina a otra sin mover físicamente el aparato.

Y el "buscador" de la sala… es también un programa: cuando escribes una palabra en una barra de búsqueda, le pides a una receta de miles de pasos que recorra millones de páginas. **El buscador es software**; el cable que te lo trae es la red; y lo que separa unos de otros es exactamente lo que querías practicar.
</details>

---

## ✅ Resumen en 3 frases

1. La red mueve **trocitos de datos en sobres** (paquetes) con sus direcciones; el byte es la moneda y el paquete el sobre.
2. La IP dice **dónde** (cambia) y la MAC dice **qué** (no cambia). Y aunque la caja de tu casa lo junte todo, **módem + router + AP son tres cosas**.
3. **Wi-Fi no es Internet**, y un programa es una receta que vive dentro de una máquina. Guarda estas tres frases donde quieras: las vas a cansar de repetir.

📚 [Volver al índice del Tema 0](/ApuntesRedes/00-introduccion) · **Siguiente:** [03 · El mapa del curso](/ApuntesRedes/00-introduccion/03-mapa-del-curso)