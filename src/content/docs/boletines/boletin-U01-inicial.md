---
title: "Boletín UD1 — Inicial"
description: "Ejercicios básicos de la Unidad 01: componentes, hardware, direcciones, protocolos y diagnóstico"
---

# 📝 Boletín UD1 — Inicial

> Ejercicios sencillos para calmar motores. Si respondes esto sin mirar los apuntes, ya tienes la base del curso.

---

## 1. Las 4 piezas del puzzle

Clasifica los siguientes elementos dentro de una de las 4 piezas fundamentales de toda red (Dispositivo final, Dispositivo de interconexión, Medio de transmisión o Protocolo):

a) Tu teléfono móvil
b) Un cable RJ45
c) HTTP
d) Un Switch
e) Las ondas del Wi-Fi
f) El servidor de Moodle del instituto

## 2. El mito de la "Caja Blanca"

Un amigo te dice: *"He reiniciado el router de mi casa porque no me llegaba bien el Wi-Fi a la habitación"*. Sabiendo lo que hemos estudiado, ¿qué tres aparatos reales tiene dentro esa caja y cuál es el que realmente le estaba fallando a tu amigo?

## 3. Verdadero o falso (Edición Conrad)

Conrad, nuestro switch cascarrabias, ha corregido estas afirmaciones. Justifica las falsas.

a) "Tener Wi-Fi a tope de cobertura significa que tengo Internet".

b) La dirección MAC es como la matrícula del coche: viene grabada de fábrica y nunca cambia.

c) "Para montar una red local (LAN) en el aula y pasarnos archivos, necesitamos contratar Internet".

d) Un "paquete" es como un sobre virtual que lleva los datos troceados, la IP de origen y la IP de destino.

e) "Ayer abrí el puerto 80 del ordenador con un destornillador".

## 4. Une con flechas (Las analogías de la red)

Relaciona cada concepto técnico con su analogía en el mundo real:

| Concepto | | Analogía |
|---|---|---|
| Dirección IP | | a) El número de bastidor o matrícula inmutable |
| Dirección MAC | | b) El recepcionista del hotel que te asigna una habitación |
| Switch | | c) La agenda de contactos del móvil |
| Router | | d) La calle y el número de tu casa actual |
| DNS | | e) La centralita que comunica a los vecinos de un mismo edificio |
| DHCP | | f) El control de aduanas que te saca de tu barrio hacia otras redes |

## 5. ¿Cliente o Servidor?

Indica qué rol está asumiendo el equipo en las siguientes situaciones:

a) Estás en tu portátil abriendo `www.gva.es`
b) La base de datos central que guarda las notas de todos los alumnos
c) Tu app de WhatsApp comprobando si hay mensajes nuevos
d) Tu PC cuando le instalas un programa para alojar una página web y que tus compañeros entren

## 6. Ordena los pasos: La Mente del Administrador

Un compañero te grita desde la otra punta del aula: *"¡Profe, no tengo Internet, voy a reiniciar todo y cambiar los cables!"*. Ordena del 1 al 5 los pasos que debes obligarle a dar aplicando la Escalera del Ping y la regla de la lucecita:

- [ ] ping `www.google.com`
- [ ] ping `<IP del router>`
- [ ] Mirar si la lucecita de la tarjeta de red y el switch están encendidas
- [ ] ping `127.0.0.1`
- [ ] ping `8.8.8.8`

## 7. Resolviendo averías con el "Sonar"

Aplicas la escalera del ejercicio anterior y ocurre lo siguiente:

- El ping `127.0.0.1` responde bien.
- El ping al router responde bien.
- El ping `8.8.8.8` responde bien.
- Pero cuando haces ping `www.google.com`, te da error.

¿Qué servicio invisible está fallando y por qué?
