# Informe docente — U01 · Bienvenida al mundo de las redes

**Estado global: 4,5 / 5**

Unidad introductoria de calidad muy alta: progresión sólida, analogías eficaces, jerga casi siempre definida en primer uso, práctica real desde el punto 04 y método de diagnóstico exportable al curso. Sin errores factuales graves (ninguno 🔴). Los hallazgos son de coherencia editorial y pequeños desajustes didácticos.

---

## Orden docente

- ✅ La progresión 01→06 es pedagógicamente óptima: concepto concreto (01) → abstracción/jerga (02) → mapa (03) → práctica (04) → método integrador (05) → glosario/FAQ (06). Sin dependencias hacia delante problemáticas.
- ✅ El índice anuncia el orden y el mapa de dependencias del punto 03 es excelente.
- 🟡 El índice no anuncia las dependencias entre los 6 puntos (solo el orden).
- 🟡 El punto 05 usa `gateway` y `DNS` (05-metodo-diagnostico.md:35-36) cuya definición formal llega en el glosario del punto 06; mitigado con glosas inline.

## Calidad de explicación

- ✅ Analogías sistemáticas (barrio, cartero/matrícula, interruptores/bombilla, médico, tren).
- ✅ Jerga definida en primer uso casi siempre (AP, switch/router, paquete/datagrama, ICMP).
- ✅ Ejemplos resueltos: práctica de 5 min en Packet Tracer, ping visual, tabla de fallos típicos, caso "No tengo Internet".
- 🟡 El peldaño 1 de la escalera dice que `ping 127.0.0.1` verifica "la tarjeta de red" (05:49); en realidad verifica el stack TCP/IP del SO. Añadir matiz de una línea.
- 🟡 Instrucción de instalación de Wireshark en Linux confusa: "responde No para poder iniciarlo desde cualquier terminal" (04:73) mezcla dos conceptos (modo setuid vs permiso de captura).

## Contenido

- ✅ Sin errores factuales. 2⁸=256, KB/MB/GB, IP 32 bits, escalera de ping, comandos, PAN/LAN/MAN/WAN, aritmética del boletín: todos correctos.
- 🟡 Boletín avanzado ex. 2 introduce terminología OSI ("enlace de datos", "capa de red") que la U01 no imparte (boletin-U01-avanzado.md:22).

## Boletines

- ✅ 10/10 en inicial y avanzado, 1:1, soluciones correctas, pistas en 9/10 del avanzado.
- 🟡 El inicial no cubre el punto 03 (mapa del curso).
- 🟡 "la impresora compartida **siga** funcionando" → "**sigue**" (boletin-U01-avanzado-resuelto.md:64).

## Coherencia

- ✅ Todas las referencias U0X correctas con la numeración actual.
- 🟡 "En **ocho páginas**" (01-introduccion.md:14) — la unidad tiene 7 páginas (índice + 6 puntos).
- 🟡 El índice afirma "No tiene post-créditos" (01:74) pero el punto 06 sí los incluye (06:109).
- 🟡 "Boletines (inicial, **intermedio** y avanzado)" (03-mapa-del-curso.md:49) — no existe nivel intermedio.

## Recomendaciones

1. "En ocho páginas" → "en seis puntos".
2. Reconciliar el texto de poscréditos del índice con el punto 06.
3. "inicial, intermedio y avanzado" → "inicial y avanzado".
4. Matizar el loopback (stack TCP/IP, no tarjeta).
5. Añadir 1-2 ejercicios del punto 03 al boletín inicial.
6. Reescribir la frase de instalación de Wireshark en Linux.
7. Corregir "siga" → "sigue".
8. Glosar `DHCP`/`gateway`/`DNS` en su primer uso (opcional).