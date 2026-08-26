---
title: Boletín U01 — Avanzado
description: Ejercicios avanzados de Fundamentos de Redes
---

# 📝 Boletín U01 — Avanzado

> Ejercicios de razonamiento. Algunos no tienen una única respuesta; justifica siempre tu elección.

---

## 1. Diagnóstico de red

Tienes una pequeña oficina con la red `192.168.1.0/24` y el router como gateway `192.168.1.1`.

El PC-A responde al ping del PC-B (misma red), pero **no** responde al ping de `8.8.8.8`.

Los tres dispositivos están en la misma VLAN y el cable está bien.

**¿Qué tres causas probables se te ocurren? ¿Cuál es la más probable?**

**Pista:** el PC-A y el PC-B se ven; el problema está entre el PC-A y el resto del mundo.

## 2. Diseño de red mínima

Debes montar la red de una oficina con **15 PCs, 2 impresoras y 1 servidor** de archivos. Presupuesto mínimo.

a) ¿Qué dispositivos compras (switch, router, cables...)? Justifica el tamaño del switch.
b) Propón un direccionamiento IPv4 privado razonable: red, máscara, gateway, impresoras, servidor y rango DHCP.

**Pista:** cuenta todos los puertos que necesitas antes de comprar el switch.

## 3. ¿Cuántos dominios?

Tres switches, cada uno con 1 PC conectado, y conectados entre sí en cadena (Switch1 ↔ Switch2 ↔ Switch3), con un router al final que sale a Internet.

a) ¿Cuántos dominios de colisión hay?
b) ¿Cuántos dominios de broadcast hay?

**Pista:** ¿qué dispositivos segmentan colisión y cuáles segmentan broadcast? No es lo mismo.

## 4. ARP en acción

El PC-A (`10.0.0.1`) quiere enviar un paquete al PC-B (`10.0.0.2`), ambos en la misma subred y sin tabla ARP previa. El PC-A solo conoce la IP destino, no la MAC.

a) ¿Qué tipo de trama lanza primero (broadcast, unicast o multicast)?
b) ¿Qué dirección de destino MAC lleva esa trama?
c) ¿Cómo responde el PC-B?
d) Escribe qué información contiene la respuesta.

**Pista:** ARP es "el cartero que llama por el megáfono para saber quién es quién".

## 5. Desencapsulación: el viaje inverso

Un servidor web recibe una trama Ethernet que contiene tu petición `GET /index.html`. En orden inverso al envío:

a) ¿Qué capa elimina la cabecera Ethernet y qué PDU queda?
b) ¿Qué capa elimina la cabecera IP y qué PDU queda?
c) ¿Qué capa elimina la cabecera TCP y qué PDU queda?
d) ¿Dónde acaba el contenido?

**Pista:** anda hacia atrás y cada capa "desempaqueta" la PDU de la capa superior.

## 6. Diferencia práctica: hub, switch y router

Explica qué dispositivo usarías en cada escenario y por qué:

a) Una red doméstica de los años 90 con 3 PCs e impresora compartida.
b) Una oficina actual con 20 PCs que compiten por ancho de banda.
c) Conectar tu oficina (192.168.1.0/24) con la sede central (10.0.0.0/16).

**Pista:** ¿quién apronta colisiones, quién aprende MACs y quién toma decisiones entre redes?

## 7. Verdadero o falso (justifica los falsos)

a) Un router es capaz de que PC-A hable con PC-B en una red diferente.
b) Un switch conoce las IPs de los equipos de su red.
c) En topología de bus, si el cable principal se rompe, la red se divide en dos segmentos aislados.
d) En topología de estrella, si el switch se apaga, toda la red deja de funcionar.
e) Tu portátil tiene la misma IP al conectarte en casa y en el trabajo.

**Pista:** e es trampa: separa lo que cambia (IP) de lo que no (MAC).

## 8. Puertos bien conocidos en acción

a) Un cliente no abre una página web. WhatsApp sigue funcionando, pero el navegador "no hay conexión". El técnico sospecha de la seguridad del router. ¿Qué puerto/protocolo está vetado?
b) Quieres administrar el servidor de la empresa con seguridad. Reenvías el puerto 22 al servidor. ¿Qué protocolo de aplicación aceptarás y por qué lo recomiendas frente a reenviar el 21?
c) Si un antivirus bloquea el puerto 53, ¿qué deja de funcionar en todo el equipo?

**Pista:** revisa la tabla de puertos bien conocidos del punto 6 de los apuntes.