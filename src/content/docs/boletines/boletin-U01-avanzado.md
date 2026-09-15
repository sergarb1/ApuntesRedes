---
title: "Boletín U01 — Avanzado"
description: "Ejercicios de nivel avanzado de la Unidad 01: razonar, diagnosticar y diseñar"
---

# 📝 Boletín U01 — Avanzado

> Ejercicios que piden razonar, diagnosticar y defender ideas. No buscan memorizar: buscan que pienses como un administrador de redes.

---

## 1. Diagnóstico completo: "No tengo Internet"

Un usuario te llama y dice: *"No me va Internet, no carga ninguna web"*. Aplica la escalera del ping completa y explica qué harías en cada peldaño. Si en algún paso el resultado es inesperado, ¿qué deduces?

**Pista:** no empieces por "reiniciar el router". Sigue la escalera de abajo a arriba.

## 2. La historia de un paquete

Narra el viaje de un paquete que sale desde tu navegador (`192.168.1.10`) hasta el servidor de Google (`142.250.185.78`). Incluye: qué hace la capa de enlace, qué información lleva el sobre, qué dispositivos intermedios lee el sobre y qué protocolo usa el navegador para pedir la página.

**Pista:** piensa en capas: Ethernet (MAC) → IP (sobre) → TCP (fiabilidad) → HTTP (petición).

## 3. ARP, el protocolo olvidado

Tu PC quiere hacer ping al gateway `192.168.1.1`, pero no conoce su MAC. Describe paso a paso qué pasa hasta que el primer paquete de ping pueda salir por la tarjeta de red.

**Pista:** ARP es el protocolo que resuelve IP → MAC. Sin él, la capa 2 no sabe a quién enviar la trama.

## 4. Argumenta contra Conrad

Conrad afirma: *"Reiniciarlo todo es más rápido que diagnosticar"*. Escribe 3 argumentos sólidos para convencerle de que el diagnóstico con método es mejor que el reinicio masivo.

**Pista:** piensa en qué pierdes cuando reinicias sin diagnosticar (información, tiempo a largo plazo, confianza del usuario).

## 5. Diseña la red del aula

Tienes que montar red en un aula de 30 PC con 1 impresora compartida y 1 router para salir a Internet. Dibuja (en texto) la topología, nombra los dispositivos que necesitas y justifica cada elección. Presupuesto limitado: elige entre switches de 24 puertos o de 48 puertos.

**Pista:** ¿cuántos puertos necesitas en total? ¿Un solo switch o varios?

## 6. Mente binaria

Calcula sin calculadora:

a) ¿Cuántos bits hay en 4 bytes?
b) ¿Cuántos bytes son 320 bits?
c) La palabra "HOLA" tiene 4 letras y ocupa 4 bytes. ¿Cuántos bits son?

## 7. El mapa del curso

Estamos en la Unidad 01, justo antes de meternos con switches, routers, IP y NAT. Da 2 motivos por los que el curso arranca con estos conceptos (qué es una red, sus componentes, el método de diagnóstico) antes de configurar ningún dispositivo.

**Pista:** sin saber qué es una red, no sabrías para qué configuras cada aparato.

## 8. El entorno de trabajo: Preparación del taller virtual

Como administrador de redes junior, antes de diseñar cualquier infraestructura o enfrentarte a una incidencia real, debes asegurar que tu banco de pruebas (el taller) está operativo y libre de riesgos.

a) Razona por qué un profesional utiliza simuladores como Packet Tracer en lugar de hacer pruebas directamente sobre hardware de producción en el aula.
b) Describe el protocolo de verificación inicial que debes seguir si surge una incidencia técnica durante la puesta en marcha de Packet Tracer.

**Pista:** piensa en el riesgo de tocar hardware real sin saber y en qué hacer cuando el simulador no arranca.
