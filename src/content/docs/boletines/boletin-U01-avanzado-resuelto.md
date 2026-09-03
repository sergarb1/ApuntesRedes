---
title: "Boletín U01 — Avanzado (Resuelto)"
description: Soluciones de los ejercicios avanzados de la Unidad 01
---

# 💪 Boletín U01 — Avanzado (Resuelto)

---

## 1. Cliente y servidor en acción

1. El navegador de Marta actúa de **cliente**: envía la petición de la página `www.google.es` al servidor de Google.
2. El servidor de Google actúa de **servidor**: busca la página y prepara la respuesta.
3. El navegador la recibe y la muestra: el ciclo pide-entrega se completa.

Todo gira alrededor de la pareja **cliente-servidor**: el cliente pide y el servidor entrega.

## 2. Diagnosticar para no adivinar

Pasos en orden, de lo más físico a lo más lógico:

1. **Enlace físico:** comprueba que el WiFi del portátil está activado (no esté en "modo avión") y que ve la señal de tu red.
2. **Enlace de datos:** si el móvil navega bien, el AP emite correctamente; el problema no está en el punto de acceso.
3. **Capa de red:** comprueba que el portátil recibe una dirección IP correcta (DHCP) y que tiene un gateway; a veces queda una IP fija errónea de otra red.
4. **Servicios:** revisa el DNS o el navegador; si el paso 3 era correcto, prueba a abrir una página por su dirección IP.

## 3. ¿Qué significan estos dos casos?

**Caso A** es una **LAN**: cuatro equipos en la misma zona local comparten recursos y el **switch** los interconecta.

**Caso B** es una **WAN**: dos oficinas separadas por kilómetros se comunican y los **routers** de cada sede unen ambas redes.

El switch trabaja solo "dentro" de una red; para unir dos redes distintas hace falta un router.

## 4. El orden del montaje doméstico

1. **Módem del operador** — convierte la señal del ISP (fibra o cable) al idioma de tu red (Ethernet).
2. **Router WiFi** — da salida y crea la red privada doméstica.
3. **Switch** — amplía los equipos por cable dentro de la LAN.
4. **AP (punto de acceso)** — extiende la señal WiFi donde no llega el router.
5. **Dispositivos finales** — PC, móvil e impresora: los que usan la red.

El orden sigue el camino de la señal: operador → módem → router → reparto (switch/AP) → equipos.

## 5. Forma parejas: término y característica

| Término | Característica |
|---|---|
| 1. Bit | e) Unidad mínima de información: vale 0 o 1 |
| 2. Byte | a) Son 8 bits juntos |
| 3. LAN | b) Ámbito local: una casa o un edificio |
| 4. WAN | c) Ámbito de país o del mundo |
| 5. IP | f) Dirección lógica de un equipo dentro de una red |
| 6. MAC | g) Dirección física, fija, del hardware |
| 7. Paquete | d) Los datos se trocean en bultitos para viajar |
| 8. Router | h) Decide el camino de los datos entre redes |

**Resultado:** 1 → e, 2 → a, 3 → b, 4 → c, 5 → f, 6 → g, 7 → d, 8 → h.

## 6. Convence a tu compañero

1. Una red funciona sin Internet: dos PCs conectados a un switch que se hacen ping forman red perfectamente válida y no usan Internet en absoluto.
2. Tu WiFi doméstico es solo una LAN; Internet es "la red de redes", la unión de millones de LAN, WAN y demás.
3. Hay servicios de red local: la impresora compartida siga funcionando aunque se caiga Internet, porque el tráfico se queda en tu LAN.

## 7. "Si este equipo...": identifica el protagonista

a) **Router** — separa tu red del resto del mundo y decide por dónde salen los paquetes.
b) **Switch** — conecta los equipos de la misma LAN y reparte sus datos.
c) **AP** — transmite los datos por el aire para los equipos sin cable.
d) **Servidor** — atiende las peticiones de muchos clientes y responde a todas.
e) **Módem** — convierte la señal del operador en una señal que entiende el router.

## 8. Mente binaria

a) 4 bytes × 8 bits = **32 bits**.
b) 320 bits ÷ 8 = **40 bytes**.
c) 4 letras = 4 bytes; 4 × 8 = **32 bits**.

## 9. El mapa del curso

1. Primero se aprenden los conceptos para entender el "qué" y el "porqué" de cada aparato; sin saber qué es una red, configurar un switch o un router no tendría sentido.
2. El método de diagnóstico en capas acompaña todos los laboratorios del curso: con él aprendes a localizar los fallos siguiendo siempre el mismo orden, de lo físico a lo lógico.

## 10. Elegir herramienta

- a) **Packet Tracer** — es un simulador para diseñar y probar redes sin necesitar hardware.
- b) **Wireshark** — captura y deja ver los paquetes que circulan de verdad por la red.
- c) **ping** — comprueba si otro equipo responde; la primera herramienta del diagnóstico.