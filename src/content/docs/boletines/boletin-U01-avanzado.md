---
title: "Boletín U01 — Avanzado"
description: "Ejercicios de nivel avanzado de la Unidad 01: razonar, diagnosticar y diseñar"
---

# 📝 Boletín U01 — Avanzado

> Ejercicios que piden razonar, diagnosticar y defender ideas. No buscan memorizar: buscan que pienses como un administrador de redes. En los difíciles tienes pista.

---

## 1. Cliente y servidor en acción

Marta está en el aula, escribe `www.google.es` en su navegador y pulsa Enter. Narra la historia en 3 pasos, indicando en cada uno quién actúa de **cliente** y quién de **servidor**.

**Pista:** en cada paso di quién "pide" (cliente) y quién "entrega" (servidor). El que pide es el cliente; el que atiende, el servidor.

## 2. Diagnosticar para no adivinar

Tu portátil no se conecta al WiFi de casa, pero el móvil de tu hermano sí navega con el mismo WiFi. Aplica el método de diagnóstico en capas y detalla, en orden, qué comprobarías en cada paso (no más de 4 pasos).

**Pista:** ve de lo más físico a lo más lógico: 1) el enlace físico (¿el WiFi del portátil está activo, hay señal?), 2) el enlace de datos (¿el AP emite bien? Si el móvil se conecta, el AP funciona), 3) la capa de red (¿el portátil recibe IP del router? ¿tiene gateway?), 4) los servicios (DNS, navegador).

## 3. ¿Qué significan estos dos casos?

- **Caso A:** En un aula, 4 PCs comparten una impresora a través de un switch.
- **Caso B:** Las oficinas de una empresa en Madrid y las de Valencia se comunican a través de sus routers.

Explica qué tipo de red es cada caso según su tamaño y qué dispositivos de interconexión lo hacen posible.

**Pista:** piensa en el terreno que cubre cada red y en qué dispositivo es capaz de "separar" una red de otra para unirlas.

## 4. El orden del montaje doméstico

Tienes estos elementos para montar una red doméstica: **módem del operador**, **router WiFi**, **switch**, **AP (punto de acceso)** y los **equipos finales** (PC, móvil, impresora). Escribe el orden físico en el que los conectarías, del 1 al 5, y una breve frase que justifique cada posición.

**Pista:** el orden sigue el camino de la señal: desde la red del ISP hasta los dispositivos finales. ¿Qué elemento convierte la señal del operador? ¿Qué elemento reparte después dentro de tu casa?

## 5. Forma parejas: término y característica

Asocia cada término con su característica:

| Término | Característica |
|---|---|
| 1. Bit | a) Son 8 bits juntos |
| 2. Byte | b) Ámbito local: una casa o un edificio |
| 3. LAN | c) Ámbito de país o del mundo |
| 4. WAN | d) Los datos se trocean en bultitos para viajar |
| 5. IP | e) Unidad mínima de información: vale 0 o 1 |
| 6. MAC | f) Dirección lógica de un equipo dentro de una red |
| 7. Paquete | g) Dirección física, fija, del hardware |
| 8. Router | h) Decide el camino de los datos entre redes |

## 6. Convence a tu compañero

Tu compañero repite por los pasillos que "tener WiFi en casa es tener Internet". Red ≠ Internet. Escríbele 3 argumentos claros, en castellano, para desmontar esa idea.

**Pista:** recuerda el ejemplo de los dos PCs con un switch: tienen red y no Internet. Internet es la unión de muchísimas redes.

## 7. "Si este equipo...": identifica el protagonista

En cada frase, di qué dispositivo está protagonizando la acción. Elige entre: **switch**, **router**, **AP**, **servidor**, **módem**.

a) Separa tu red doméstica del resto del mundo y decide por dónde salen los paquetes.
b) Conecta los equipos de la misma LAN para que se vean entre sí y reparte sus datos.
c) Transmite los datos por el aire para que lleguen a los móviles y portátiles sin cable.
d) Espera sin descanso las peticiones de muchos clientes y responde a todas.
e) Convierte la señal del operador (fibra o cable) en una señal que tu router entiende.

**Pista:** piensa en la función de cada uno: "entre redes", "dentro de la LAN", "por el aire", "atiende a muchos", "traduce la señal del operador".

## 8. Mente binaria

Calcula sin calculadora:

a) ¿Cuántos bits hay en 4 bytes?
b) ¿Cuántos bytes son 320 bits?
c) La palabra "HOLA" tiene 4 letras y ocupa 4 bytes. ¿Cuántos bits son?

**Pista:** recuerda que 1 byte = 8 bits.

## 9. El mapa del curso

Estamos en la Unidad 01, justo antes de meternos con switches, routers, IP y NAT. Da 2 motivos por los que el curso arranca con estos conceptos (qué es una red, sus componentes, el método de diagnóstico en capas) antes de configurar ningún dispositivo.

**Pista:** sin saber qué es una red, no sabrías para qué configuras cada aparato. Y el método de diagnóstico en capas lo usarás en cada laboratorio del curso.

## 10. Elegir herramienta

En cada tarea, elige la herramienta principal: **Packet Tracer**, **Wireshark** o **ping**.

a) Quiero simular 2 PCs + switch en el aula para comprobar si la red que he diseñado funciona antes de montarla.
b) Un profesor sospecha que "algo raro pasa": quiero ver qué paquetes están circulando de verdad por su PC.
c) Necesito saber si mi router (192.168.1.1) está respondiendo.

**Pista:** "simular" → Packet Tracer; "ver los paquetes" → Wireshark; "¿responde ese equipo?" → ping.
