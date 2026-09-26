# Informe docente — U11 · NAT y acceso a Internet

**Estado global: 4 / 5**

Unidad muy bien construida: progresión lógica impecable, analogías potentes y coherentes (recepcionista de hotel, edificio de oficinas), jerga en primer uso y aterrizaje práctico con fallo intencionado. Se descuenta por una tabla NAT de ejemplo truncada (unidad + boletines), respuestas del boletín inicial que no se derivan de los enunciados, y una imprecisión factual en IPsec (conflación AH/ESP).

---

## Orden docente

- ✅ Óptimo: concepto→mecanismo→problema→montaje. Cada tipo se justifica antes de entrar en el siguiente.
- ✅ El bloque WiFi vs WiMax (CE e) está incrustado en el punto 7 (07:82-102) sin relación conceptual con ALGs/NAT-T; es "Bonus" obligatorio por RA, pero rompe ligeramente el hilo.
- ✅ "Estás en", referencias "punto N" y flujo de lectura bien señalizados.

## Calidad de explicación

- ✅ PAT/multiplexación con el ejemplo "dos PCs mismo puerto origen 54321 → colisión garantizada" (excelente) y "el puerto efímero global como matrícula".
- ✅ Analogías coherentes: recepcionista (NAT), edificio de oficinas (tipos), extensión/puerto (PAT), buzón de paquetería (NAT destino).
- ✅ NAT destino con el truco "NAT destino es un NAT estático especializado por puerto".
- ✅ FTP activo con `PORT 192,168,1,10,4,1` → 1025 = 4×256+1 (correcto y coherente).
- 🔴 **Tabla NAT de ejemplo truncada** en `06-tabla-nat-y-verificacion.md:42-43`: las columnas Inside global/local solo muestran `192.168.1.` (faltan IP completa y puertos). El texto de :46 cita valores (60001, 60002, 192.168.1.10/20) que no aparecen en la tabla. El ejemplo que enseña a leer la tabla está mutilado.

## Contenido

- ✅ Timeouts NAT Cisco (UDP 300s, TCP 86400s) correctos. Pool /29 en comando (03:69) correcto.
- 🟡 `03:55` — "83.45.12.78-83.45.12.81, un /29 con 6 IPs utilizables": el rango mostrado son 4 direcciones (.78-.81) y atraviesa dos subredes /29. Imprecisión.
- ✅ DNS es UDP en todos los ejemplos. Comandos ip nat correctos. FTP activo puertos correctos.
- 🔴 **AH vs ESP en IPsec**: `07-problemas-y-soluciones.md:71` y `boletin-U11-avanzado-resuelto.md:38` atribuyen el fallo por NAT a "integridad de la cabecera IP" para AH y ESP. Solo AH hashea la cabecera IP (falla con NAT); ESP no protege la cabecera IP (falla con PAT porque cifra los puertos, protocolo 50). NAT-T encapsula en UDP:4500 principalmente por eso.
- 🔴 **Tabla NAT truncada también en el boletín inicial**: `boletin-U11-inicial.md:42-46` (ej. 4) y `:80-84` (ej. 8).
- 🔴 **Respuestas que no se derivan del enunciado** (boletín inicial): el ej. 4 pregunta la IP pública del router y el resuelto responde 83.45.12.78 (no está en la tabla); 4c responde 50001 (no está); el ej. 8c usa "54321" que no aparece en la tabla del ejercicio 8.

## Boletines

- ✅ 8+8 ejercicios, soluciones 1:1 (salvo lo señalado), graduación correcta.
- ✅ El avanzado incluye pistas; el inicial solo en 3 de 8 (escaso pero menos necesario).
- 🔴 Ejercicios 4 y 8 del inicial rotos por la tabla truncada y las respuestas no derivables.

## Coherencia

- ✅ Referencias "punto N" consistentes; U10/U12 correctas; DHCP correctamente en U05 (no U11).
- 🟡 Enlaces de boletines del índice (11:58-61) sin prefijo `boletin-`. **Ya corregido en la Fase A.**

## Convenciones

- ✅ `<details>`, es-ES, estilo oracional, formato numérico correctos.

## Recomendaciones

1. 🔴 Corregir la tabla NAT truncada en 3 sitios (06:42-43, boletín inicial ej. 4 y 8) rellenando IPs completas y puertos.
2. 🔴 Alinear enunciados/respuestas del boletín inicial (ej. 4 y 8): añadir los valores a la tabla o ajustar preguntas.
3. 🟡 Matizar IPsec: distinguir AH (falla con NAT) de ESP (falla con PAT por puertos cifrados).
4. 🟡 Corregir la imprecisión del pool /29.
5. 🟡 Considerar reubicar el bloque WiFi vs WiMax o señalizarlo mejor.