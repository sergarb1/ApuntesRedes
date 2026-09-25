---
title: "Boletín de Introducción — Inicial (Resuelto)"
description: Soluciones de los ejercicios básicos
---

# ✅ Boletín de Introducción — Inicial (Resuelto)

---

## 1. Las 4 piezas del puzzle

a) **Dispositivo final** — es el equipo que usa la persona al final del camino.
b) **Medio de transmisión** — la carretera física por donde viajan los datos.
c) **Protocolo** — las reglas del idioma para cargar páginas web.
d) **Dispositivo de interconexión** — la centralita del barrio que conecta los equipos.
e) **Medio de transmisión** — la carretera invisible por el aire.
f) **Dispositivo final** — aunque sirva a otros, es una máquina final que almacena los datos.

## 2. El mito de la "Caja Blanca"

La caja es un **3 en 1**: tiene un **Módem** (traduce la señal de la calle), un **Router** (conecta la casa con Internet) y un **Punto de Acceso** (reparte la señal por el aire). Lo que le fallaba a tu amigo por la distancia a su habitación era el **Punto de Acceso (AP)**.

## 3. Verdadero o falso (Edición Conrad)

a) **Falso.** El Wi-Fi solo te conecta con el Punto de Acceso local. Si ese aparato no tiene salida a la calle, tienes cobertura pero sigues sin Internet.

b) **Verdadero.** La dirección MAC es como la matrícula del coche: viene grabada de fábrica y nunca cambia.

c) **Falso.** Con 20 PCs conectados a un Switch ya formáis una red perfectamente válida sin salir al exterior. Internet solo aparece cuando unes esa red al mundo exterior con un router.

d) **Verdadero.** Un paquete es como un sobre virtual que lleva los datos troceados, la IP de origen y la IP de destino.

e) **Falso.** El puerto 80 es un número lógico virtual que identifica al servicio web, no es el hueco físico donde metes el cable RJ45.

## 4. Une con flechas (Las analogías de la red)

- Dirección IP → **d)** La calle y el número de tu casa actual.
- Dirección MAC → **a)** El número de bastidor o matrícula inmutable.
- Switch → **e)** La centralita que comunica a los vecinos de un mismo edificio.
- Router → **f)** El control de aduanas que te saca de tu barrio hacia otras redes.
- DNS → **c)** La agenda de contactos del móvil.
- DHCP → **b)** El recepcionista del hotel que te asigna una habitación.

## 5. ¿Cliente o Servidor?

a) **Cliente** — tu navegador está pidiendo la web.
b) **Servidor** — está esperando peticiones para entregar los boletines.
c) **Cliente** — pide datos a los servidores de Meta.
d) **Servidor** — tu equipo pasa a "servir" contenido a los demás.

## 6. Ordena los pasos: La Mente del Administrador

1. Mirar si la lucecita de la tarjeta de red y el switch están encendidas (Peldaño 0: enlace físico).
2. ping `127.0.0.1` (Peldaño 1: comprobar los "reflejos" de su propia tarjeta).
3. ping `<IP del router>` (Peldaño 2: comprobar si llega a la puerta de salida del aula).
4. ping `8.8.8.8` (Peldaño 3: comprobar si el router le saca a Internet).
5. ping `www.google.com` (Peldaño 4: comprobar si el servidor DNS funciona y traduce nombres).

## 7. Resolviendo averías con el "Sonar"

Está fallando el servidor **DNS**. La conexión a Internet funciona perfectamente (por eso llega a la IP numérica `8.8.8.8`), pero su equipo se ha quedado sin la "agenda telefónica" capaz de traducir el nombre "google.com" a números.
