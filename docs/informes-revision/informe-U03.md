# Informe docente — U03 · Modelos OSI y análisis de tráfico

**Estado global: 4 / 5**

Unidad muy sólida y cohesionada: narrativa del "viaje del paquete" que enlaza los 9 puntos, analogías efectivas (cartero, muñeca rusa, correo certificado vs megáfono), ejemplos resueltos abundantes y progresión correcta. Le resta llegar a 5: dos defectos concretos (enlace de boletines y pista de crucigrama) y dos adelantos pedagógicos que conviene matizar.

---

## Orden docente

- ✅ Secuencia global correcta y bien anunciada (03-modelos-osi-analisis.md:36-48).
- 🟡 El punto 04 (encapsulación) nombra campos de cabecera (TCP seq/ack/flags, MTU, MACs) que se explican en 05/06. Adelanto de nombres, no de conceptos; mitigado con remisiones. La tabla de cabeceras (04:70-75) es el único riesgo real de sobrecarga.
- ✅ 05 (capa 4) antes de 06 (capa 3): orden deliberado y defendible (desencapsulación de dentro hacia fuera; el 06 necesita TCP/UDP ya vistos).

## Calidad de explicación

- ✅ Analogías excelentes (correo postal/departamentos, muñeca rusa, pizza por teléfono, correo certificado vs megáfono, cadena de montaje).
- ✅ Ejemplos resueltos: handshake TCP, encapsulación salto a salto, overhead 14+20+20=54, fragmentación 2500B, navegación HTTPS, filtros Wireshark.
- ✅ Jerga en primer uso impecable: PDU/SDU/ICI, TTL, MTU, EtherType, FCS, socket, 3WHS, datagrama, PMTUD.
- 🟡 El mnemónico "A PaSó Por Todo El Fondo" (01:55) dice "piensa en la frase" pero no llega a dar la frase completa; se queda a medias.

## Contenido

- 🔴 `03-modelos-osi-analisis.md:57-60` — los 4 enlaces de boletines usan `/boletines/u03-...` sin el prefijo `boletin-` (404). **Ya corregido en la Fase A.**
- 🔴 `09-cierre.md:158` — pista "Capa OSI que encapsula en tramas (**5 letras**, castellano)" pero la respuesta ENLACE tiene 6 letras.
- 🟡 ARP inconsistente entre puntos: capa "Internet" en la tabla TCP/IP (03-modelo-tcp-ip.md:34) vs "capa 2-3" en 06-ip-ethernet.md:92.
- ✅ Capas OSI, TCP/IP, 3WHS, TIME_WAIT, cabecera IPv4, fragmentación, EtherTypes, puertos, Wireshark: todos correctos.

## Boletines

- ✅ 8+8 ejercicios, soluciones 1:1 correctas, pistas en el avanzado, coherencia con la teoría.
- 🟡 Blockquote mal formado: `>La conexión...` sin espacio (boletin-U03-inicial-resuelto.md:74).
- 🟡 Boletín avanzado ex. 1: handshake hacia gateway en 443 "validación del gateway" es forzado (un router no escucha en 443).

## Coherencia

- ✅ Todas las referencias "punto N"/"U0X" correctas; diagramas referenciados existen.

## Convenciones

- ✅ `<details>` en todo, es-ES, estilo oracional, formato numérico correctos.

## Recomendaciones

1. Corregir la pista del crucigrama (6 letras: ENLACE).
2. Añadir nota de aplazamiento en la tabla de cabeceras del punto 04.
3. Unificar ubicación de ARP (capa 2-3) o aclararla.
4. Completar o reformular el mnemónico de 01:55.
5. Matizar "Lees el HTTPS" (09:20) como "HTTP sobre TLS".
6. Corregir `>La` → `> La` en el boletín inicial resuelto.