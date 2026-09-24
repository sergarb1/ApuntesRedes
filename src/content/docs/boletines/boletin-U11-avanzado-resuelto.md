---
title: Boletín UD11 — Avanzado (Resuelto)
description: Soluciones de los ejercicios avanzados de redes inalámbricas (WiFi)
---

# ✅ Boletín UD11 — Avanzado (Resuelto)

---

## 1. Diseño de cobertura de un instituto

a) **Mínimo 6-8 APs** (2 por planta como mínimo por superficie, más si hay paredes de hormigón): repartidos para solapar celdas ~15-20%. El hormigón armado atenuina mucho: más APs con menos potencia gana a pocos APs a tope.

b) **2,4 GHz:** dispositivos lentos/IoT y compatibilidad; poco ancho de banda útil (3 canales). **5 GHz:** profesores y alumnos con portátiles/móviles modernos: más canales, más velocidad. 6 GHz si el hardware lo permite (WiFi 6E/7).

c) Porque **profesores** requiere autenticación por usuario (Enterprise/RADIUS), trazabilidad y acceso a recursos internos; **alumnos** solo necesita Internet con control de ancho y registro. VLANs distintas aíslan ambos mundos en capa 2 y permiten políticas distintas en capa 3.

d) **Interferencia por reutilización de canal (co-channel interference)**: los APs se oyen entre sí, compiten por el medio (CSMA/CA) y el throughput de la zona se divide. Por eso el plan 1-6-11.

## 2. El misterio del aula 12

a) La **potencia de señal** (RSSI) mide cuánto llega; la **calidad** (SNR y reutilización de canal) mide cuánto ruido/competencia hay. Puedes "oír" el AP perfectamente y aun así perder paquetes por interferencias.

b) 1) Vecinos u otros APs en el mismo canal (co-channel); 2) microondas, videoporteros, Bluetooth u otros emisores de 2,4 GHz; 3) reflexiones multipath por paredes/metal que ensucian la señal (o hidden node).

c) Analizador WiFi (inSSIDer, WiFi Analyzer, Acrylic): mira SNR, canal ocupado por otros BSSIDs y utilisation. En el controlador: estadísticas de retransmisiones y de errores CRC del AP.

## 3. Plan de canales 5 GHz

a) Ejemplo: AP1 → 36, AP2 → 44, AP3 → 52, AP4 → 60 (separación de 4 números × 20 MHz; solape nulo). Si son APs con 80 MHz: 36, 52, 100, 116 (bloques no solapados).

b) Con 40/80 MHz **dobles/cuadruplicas el ancho** del canal → más throughput pico. Riesgo: consumes varios canales de 20, chocas con vecinos y en 2,4 GHz es directamente una mala idea (solo hay 3).

c) **DFS** (Dynamic Frequency Selection): canales compartidos con radares (meteorológicos/militares). El AP debe despejar el canal si detecta radar: salta de canal y provoca microcortes de clientes. Riesgo: inestabilidad en zonas con radares activos.

## 4. WPA3 y el handshake

a) Con WPA2-PSK, un atacante que captura el 4-way handshake puede probar contraseñas **offline** (millones/segundo). Con **SAE**, la negociación es resistente a ataques offline: cada intento cuesta interacción real con el AP.

b) Que el AP acepta WPA2 y WPA3 a la vez: los equipos viejos entran por WPA2 y los modernos por WPA3. Tiene sentido durante la transición del parque de dispositivos; en cuanto el parque lo permita, mejor WPA3 puro.

c) 1) El SSID "oculto" viaja en claro en las tramas de gestión: cualquier analizador lo ve (y además empeora el roaming de los clientes, que gritan por la red buscando el SSID). 2) El filtrado MAC se falsifica en 10 segundos: la MAC viaja en claro y se puede suplantar. Ninguno de los dos autentica a nadie: usa WPA2/WPA3.

## 5. Portal cautivo y VLANs

a) **VLAN de invitados propia** (p. ej. VLAN 99), separada en capa 2 de docentes/alumnos y con su propia subred. Los broadcasts y el tráfico de invitados nunca tocan la red interna.

b) Página web que exige aceptar condiciones (y a veces credenciales o un código) antes de dejar pasar tráfico. Limitaciones: es "seguridad de cortesía", no cifrado (la red sigue abierta salvo que haya PSK/802.1X), y su cumplimiento depende del navegador (los dispositivos IoT no lo abren).

c) **Segmentación** de la unidad: aislar por VLAN los dispositivos no confiables y aplicar ACLs/firewall en el borde de esa VLAN (solo salida a Internet). Complementa con WPA2/WPA3-PSK para cifrar aunque sea mínimamente.

## 6. Diagnóstico de un despliegue roto

a) 1) **Canales mal asignados:** 1-1-1-6-1-11 apila tres APs vecinos en el canal 1: co-channel interference brutal. 2) **Potencia al máximo en todos:** celdas enormes que se solapan demasiado; el cliente "se casa" con un AP lejano en vez de moverse al cercano.

b) Al caminar, el cliente pierde al AP viejo y busca uno nuevo; si las celdas están mal solapadas (o el cliente se empeña en el lejano), el roving tarda: escanea canales, reautentica (con Enterprise, además, 802.1X completo). 20 s es roaming roto, no una microscaída.

c) 1) **Bajar potencia** a un nivel que dé celdas del tamaño adecuado con solape controlado. 2) Replan de canales 1-6-11 alternados (y en 5 GHz, bloques no solapados). 3) Activar las ayudas del controlador: roaming asistido (802.11k/v/r) y balanceo de clientes. 4) En Enterprise, fast roaming (PMKID/FT) para no repetir el 802.1X completo.

## 7. Cálculo rápido de throughput

a) El 1200 Mbps es **enlace físico teórico** (mejor caso, MCS alto, sin reintentos). Real: 30-50% en el mejor caso; y se **comparte** por tiempo, no se reparte por igual: quien más transmite, más come. 25 alumnos → decenas de Mbps reales por cabeza en hora punta.

b) **CSMA/CA**: el medio radio es único y compartido: solo uno transmite a la vez, y cada retransmisión por colisión o mala señal roba tiempo útil a todos.

c) 1) **Más APs** (repartir la carga entre celdas) con canales distintos y potencias contenidas. 2) **Dirigir más carga a 5 GHz** (band steering): más canales, menos competencia. 3) Si el AP lo soporta, perfiles/limites por cliente para que nadie monopilice.

## 8. Caso integrador con Packet Tracer

a) **Puerto access** de la VLAN 20: un AP doméstico solo habla una VLAN (su SSID mapea a una subred); no etiqueta 802.1Q. (Un AP enterprise con varios SSIDs sí llevaría trunk.)

b) 1) **DNS del pool DHCP de la VLAN 20** (¿apunta a un DNS válido?). 2) **Ruta de retorno** (¿el router sabe volver a 192.168.20.0/24?) o NAT si sale a Internet. Si el ping al 8.8.8.8 funciona y los nombres no, es DNS.

c) **WPA2-Personal (PSK)**: la misma seguridad que en un AP real se llama WPA2-PSK o WPA2-Personal según el fabricante.

## 9. Caso WiFi: oficina con zonas muertas

a) **Causas físicas posibles:**
   - **Interferencia de vecinos:** los APs de las oficinas colindantes comparten el canal 1, 6 u 11, y todos se pisan.
   - **Obstrucciones:** los tabiques de cartón-yeso y el mobiliario atenúan la señal (atenuación).
   - **Cobertura insuficiente:** un solo AP para 25 puestos reparte un canal compartido entre muchos clientes; las zonas más alejadas quedan al límite.
   - **Canal saturado:** todos los clientes compiten por el mismo canal, y en horas punta (la tarde) la contienda se dispara.

b) **Herramientas:** analizador WiFi (para ver canales, señal RSSI y APs vecinos), aplicación de escaneo de red para comprobar número de clientes, y medición de velocidad en distintos puntos de la oficina.

c) **Soluciones ordenadas de más barata a más cara:**
   1. **Elegir canales no solapados** (1, 6, 11 en 2,4 GHz) y configurar el AP en 5 GHz (y, si soporta, activar band-steering).
   2. **Reubicar el AP** en una posición más central o elevado, lejos de metal y fuentes de interferencia.
   3. **Añadir APs adicionales** (o un mesh) para cubrir las zonas muertas, con canales distintos entre APs adyacentes.

## 10. 802.3 vs 802.11 en la misma oficina

a) **Sí, la misma:** capa 2 (enlace). Cableados usan **IEEE 802.3**; los portátiles, **IEEE 802.11**. Misma función: entregar por MAC en la red local.

b)

| | 802.3 (cable) | 802.11 (aire) |
|---|---|---|
| MACs en cabecera | 2 (origen, destino) | Hasta **4** (RA, TA, DA, SA según tipo) |
| Quién monta/envía | La NIC / el switch reenvía | La NIC WiFi (el AP reenvía); el AP puede cifrar en el borde |
| Medio | Enlace punto a punto / dominio de colisión gestionado | Canal de radio **compartido** (CSMA/CA, interferencias, vecinos) |

c) Porque **arriba de la trama** IPv4 solo ve "entrega local por MAC hecha". El estándar 802.x es un detalle de la capa 1–2: la pila de Internet no cambia si el tramo fue cobre, fibra o aire.