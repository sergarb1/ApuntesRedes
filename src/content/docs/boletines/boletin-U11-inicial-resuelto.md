---
title: Boletín UD11 — Inicial (Resuelto)
description: Soluciones de los ejercicios básicos de redes inalámbricas (WiFi)
---

# ✅ Boletín UD11 — Inicial (Resuelto)

---

## 1. ¿Quién soy?

a) **IEEE 802.11** (familia: a/b/g/n/ac/ax/be…).
b) El **SSID** (Service Set Identifier).
c) El **punto de acceso (AP)**.
d) Modo **ad hoc** (IBSS). Hoy en día, Wi-Fi Direct ha tomado el relevo.
e) La **Wi-Fi Alliance**.

## 2. Bandas y canales

a) **2,4 GHz y 5 GHz** (y 6 GHz con WiFi 6E/7).
b) **Tres**: 1, 6 y 11.
c) La de **5 GHz** tolera mejor interferencias (más canales y menos aparatos antiguos); la de **2,4 GHz** llega más lejos y atraviesa mejor las paredes.
d) **Canal 6**, el único de los tres que no has mencionado; si tu vecino inunda el 1 y el 11, en el 6 estás razonablemente limpio.

## 3. Verdadero o falso

a) **Falso.** WEP está roto desde hace décadas (se descifra en minutos). Solo aparece en museos y en el examen.
b) **Verdadero.** PSK = Pre-Shared Key: todos comparten la misma contraseña.
c) **Verdadero.** SAE (Simultaneous Authentication of Equals) sustituye al PSK y salva el four-way handshake clásico de los ataques offline.
d) **Verdadero.** Decenas de canales de 20 MHz no solapados frente a los 3 de 2,4 GHz.
e) **Falso.** El SSID oculto va en claro en las tramas de gestión; esconderlo no autentica a nadie. Seguridad real: WPA2/WPA3.

## 4. Seguridad: escala del mal

**Red abierta → WEP → WPA → WPA2 → WPA3** (de peor a mejor).

## 5. WiFi 4 → WiFi 7

1 → b (WiFi 4 = 802.11n)
2 → c (WiFi 5 = 802.11ac)
3 → a (WiFi 6 = 802.11ax)
4 → e (WiFi 6E = 802.11ax en 6 GHz)
5 → d (WiFi 7 = 802.11be)

## 6. Cobertura

a) 1) Reposicionar el AP (centro, alto y despejado); 2) probar otra banda/canal (2,4 GHz llega más lejos; en 5 GHz prueba canales limpios); 3) añadir un segundo AP o un extensor/mesh bien colocado.

b) El suelo absorbe y multiplica reflexiones; el metal actúa como jaula (atenuación enorme). La señal se irradia en forma aproximada de dona alrededor de las antenas: el AP alto y centrado cubre más.

c) El **hidden node**: dos clientes que se oyen al AP pero no entre ellos transmiten a la vez y colisionan *en el AP*. Se manifiesta como rendimiento errático que empeora con más clientes y distancias largas. Mitigación: RTS/CTS, repartir mejor los APs.

## 7. Configuración mínima de un AP

- SSID: `EstudioNet`
- Seguridad: **WPA2/WPA3 Personal** (transición) o WPA3 si todos los equipos lo soportan
- Contraseña: larga (16+ caracteres), no un diccionario (ejemplo de criterio: `clave-larga-no-obvia-2026`)
- Banda: 2,4 GHz (llega a la sala del fondo)
- Canal: **6** (20 MHz) — evita el 1 y el 11 si hay vecinos, y no uses 40 MHz en 2,4 GHz: saturas el vecindario y pierdes estabilidad.

## 8. Autenticación: Personal vs Enterprise

a) **PSK:** una contraseña compartida por todos (si se filtra, cambia para todo el mundo). **Enterprise:** cada usuario se autentica con sus credenciales individuales (usuario/contraseña o certificado).

b) Un servidor **RADIUS**; el AP habla con él mediante **802.1X/EAP**.

c) El WiFi de **profesores/administración** o el corporativo: cientos de usuarios identificables, posibilidad de revocar a uno concreto sin tocar al resto y trazabilidad por usuario. El WiFi de invitados, en cambio, es PSK de toda la vida.

## 9. Medios y estándares WiFi: verdadero o falso

a) **Verdadero.** 802.11ax = WiFi 6 (2019, bandas de 2,4 y 5 GHz).
b) **Verdadero.** El WiFi envía ondas electromagnéticas por el aire, sin medio conductor.
c) **Verdadero.** La velocidad real WiFi suele ser el 30-50% de la teórica por overhead, obstrucciones e interferencias.
d) **Falso.** El WiFi **sí es capa 2** (enlace): entrega local por MAC con tramas 802.11; el aire es solo el medio (capa 1).
e) **Verdadero.** En 2,4 GHz los tres canales no solapados son 1, 6 y 11.