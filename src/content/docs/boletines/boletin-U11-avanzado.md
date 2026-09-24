---
title: Boletín UD11 — Avanzado
description: Ejercicios avanzados de redes inalámbricas (WiFi)
---

# 📝 Boletín UD11 — Avanzado

> Ejercicios que requieren diseñar y diagnosticar WLANs. En los difíciles tienes pista.

---

## 1. Diseño de cobertura de un instituto

Edificio de dos plantas, 40×20 m, hormigón armado. Usuarios: 30 profesores con portátiles, 300 alumnos con móviles, ~50 IPs extra (cámaras, impresoras).

a) ¿Cuántos APs pondrías como mínimo y dónde (a grandes rasgos)?
b) ¿Qué bandas asignas a qué uso?
c) Dos SSIDs: `Profesores` (Enterprise) y `Alumnos` (PSK con portal cautivo). ¿Por qué esta separación?
d) ¿Qué pasa con el canal si dos APs vecinos emiten en el mismo canal 2,4 GHz?

**Pista:** en 2,4 GHz solo hay 3 canales no solapados (1/6/11); el patrón clásico de celdas alterna 1-6-11-1-6-11.

## 2. El misterio del aula 12

El aula 12 tiene WiFi pésimo: se desconecta cada pocos minutos, aunque la señal que muestra el portátil es "excelente".

a) ¿Cómo puede haber señal excelente y mala calidad? ¿Qué mide cada cosa?
b) Enumera 3 causas típicas de este síntoma.
c) ¿Qué herramienta del portátil o del AP usarías para confirmarlo?

**Pista:** RSSI alto no es sinonimo de SNR alto: mira la interferencia y la reutilización de canal.

## 3. Plan de canales 5 GHz

Tienes 4 APs en la misma planta. En 5 GHz dispones de canales de 20 MHz (36, 40, 44, 48, 52, 56, 60, 64, 100+…).

a) Asigna canales a los 4 APs para minimizar solape.
b) ¿Qué ventaja tiene usar 40 u 80 MHz en 5 GHz en lugar de 20 MHz? ¿Y su riesgo?
c) ¿Qué son los canales DFS y qué riesgo tienen?

## 4. WPA3 y el handshake

a) ¿Qué problema clásico de WPA2-PSK corrige WPA3 con SAE?
b) ¿Qué es el "modo transición" WPA2/WPA3 y cuándo tiene sentido?
c) Un compañero propone "SSID oculto + filtrado MAC" como seguridad. Desmonta la idea con dos argumentos.

## 5. Portal cautivo y VLANs

El WiFi de invitados debe: tener portal de aceptación de condiciones, no ver la red interna y salir solo a Internet.

a) ¿En qué VLAN lo metes y por qué?
b) ¿Qué es un portal cautivo y qué limitaciones tiene?
c) ¿Qué norma de seguridad de la unidad aplicas al aislar invitados?

## 6. Diagnóstico de un despliegue roto

Tras instalar 6 APs nuevos, los usuarios se quejan: en pasillos funciona bien, pero al caminar entre zonas el WiFi se corta 20 segundos. `show` del controlador: cada AP emite al máximo de potencia, todos con el mismo SSID y canales 1-1-1-6-1-11 en 2,4 GHz.

a) ¿Qué dos errores de diseño detectas?
b) ¿Por qué se corta 20 segundos al caminar (roaming)?
c) ¿Qué ajustarías (potencias, canales, roaming)?

**Pista:** para que el roaming funcione bien, las celdas deben solaparse un poco (≈15-20%) pero con canales distintos.

## 7. Cálculo rápido de throughput

Un AP WiFi 6 teórico en 80 MHz, 2×2: hasta 1200 Mbps de enlace. Un aula tiene 25 alumnos compartiendo ese AP.

a) ¿Por qué el throughput real por alumno es mucho menor que 1200/25?
b) ¿Qué papel juega el medio compartido (CSMA/CA) en esto?
c) ¿Qué dos medidas de diseño mejoran la experiencia si el aula crece a 50 alumnos?

## 8. Caso integrador con Packet Tracer

Monta en Packet Tracer: un router 2911 con servidor DHCP, un switch 2960 con dos VLANs (10 docentes, 20 alumnos), un AP doméstico en la VLAN 20 y dos portátiles inalámbricos.

a) ¿Qué tipo de puerto de switch conecta el AP y por qué?
b) El portátil de alumnos obtiene IP de la VLAN 20 pero no navega. El gateway de la VLAN 20 está bien. ¿Qué dos cosas compruebas primero?
c) El AP doméstico de Packet Tracer solo permite WPA2-PSK. ¿Cómo se llama esa misma seguridad en la nomenclatura de la unidad?

## 9. Caso WiFi: oficina con zonas muertas

En una oficina de 25 puestos separados por tabiques de cartón-yeso, un único AP wifi en el pasillo central da "zonas muertas" y una velocidad general decepcionante. Los empleados se quejan cada tarde.

a) ¿Qué causas físicas explicarían la lentitud (nombra al menos 3)?
b) ¿Qué herramientas usarías para confirmarlas?
c) Propón 3 soluciones realistas ordenadas de más barata a más cara.

**Pista:** piensa en canales (1, 6, 11), interferencia de vecinos, obstáculos y el número de clientes compartiendo el mismo AP. Recuerda que la velocidad real WiFi es del 30-50%.

## 10. 802.3 vs 802.11 en la misma oficina

Una oficina tiene 20 PCs por cable (FastE/GigE) y 20 portátiles por WiFi detrás del mismo switch.

a) ¿Los dos grupos comparten la capa OSI de "entrega local"? ¿Cuál?
b) Compara en tabla: nº de MACs en la cabecera, quién "monta" la trama en el aire y qué pasa con las colisiones/medio compartido.
c) ¿Por qué el OS de arriba (IPv4) no distingue si el tramo local fue RJ45 o radio?

**Pista:** misma capa 2 lógica, distinto estándar; el estándar 802.x es un detalle de la capa 1–2.
