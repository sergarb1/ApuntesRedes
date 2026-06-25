---
title: Boletín U02 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de Modelos OSI y Análisis de Tráfico
---

# ✅ Boletín U02 — Avanzado (Resuelto)

---

## 1. Análisis de captura Wireshark

a) **Paquetes 1-3:** Three-way handshake TCP entre el PC (192.168.1.10) y el gateway (192.168.1.1). El PC abre una conexión desde el puerto efímero 54321 hacia el puerto 443 (HTTPS) del gateway. Esto es extraño... ¿por qué el PC haría HTTPS al gateway?

b) **Paquete 4:** El PC inicia un nuevo three-way handshake, pero ahora hacia 142.250.184.4 (un servidor real de Google). Esto sugiere que el primer handshake era para algo local (quizás el PC consultó al gateway como proxy o para alguna validación), y ahora procede con el destino real.

c) **Lo que falta:** La respuesta al paquete 4. El servidor Google debería responder con SYN-ACK. Posiblemente la captura se detuvo antes, o el paquete aún no ha llegado. También podría faltar el HTTP GET si el destino es HTTPS (el contenido viaja cifrado y Wireshark no lo mostraría como HTTP).

## 2. Diseña la encapsulación

a) **Ethernet:**
   - MAC destino: MAC del gateway (192.168.1.1)
   - MAC origen: MAC del PC
   - EtherType: 0x0800 (IPv4)

b) **IP:**
   - IP origen: 192.168.1.10
   - IP destino: 8.8.8.8
   - Protocol: 17 (UDP)
   - TTL: 64 (típico)

c) **UDP:**
   - Puerto origen: efímero (ej. 34567)
   - Puerto destino: 53 (DNS)
   - Longitud: depende de la consulta

d) **DNS:** La consulta contiene "www.google.com" de tipo A (IPv4) solicitando la dirección IP.

## 3. Diagnóstico por capas

a) **Capa 7 (Aplicación) — específicamente DNS (capa 7).** El ping a 8.8.8.8 (ICMP, capa 3) funciona, pero el navegador no resuelve nombres.

b) Usar `nslookup google.com` o `dig google.com` para ver si la resolución DNS funciona.

c) **Causa más probable:** El servidor DNS configurado no funciona o es inaccesible. O la configuración DNS del PC es incorrecta (ej. DNS apunta a una IP que no existe o no responde).

## 4. Three-way handshake

a) **SYN perdido:** El cliente no recibe SYN-ACK. Espera el RTO (Retransmission Timeout) y reenvía el SYN. La conexión se establece cuando el SYN finalmente llega y el servidor responde.

b) **SYN-ACK perdido:** El cliente no recibe el SYN-ACK. Espera el RTO y reenvía el SYN original. El servidor, al recibir un segundo SYN, reenvía su SYN-ACK. La conexión se establece cuando el cliente recibe el SYN-ACK.

c) **ACK final perdido:** ¡Caso interesante! El servidor recibe el SYN-ACK que envió pero no recibe el ACK final. El servidor tiene el estado "SYN-RECEIVED" y espera el ACK. Pasado el RTO, el servidor reenvía el SYN-ACK. Si el cliente (que ya cree tener conexión establecida) envía datos, el servidor los aceptará porque el estado SYN-RECEIVED permite datos entrantes. Tras varios reintentos sin ACK, el servidor cierra la conexión.

**En resumen:** La conexión se establece efectivamente solo en los casos a) y b) tras retransmisión. En el caso c), la conexión puede establecerse a medias (cliente cree que sí, servidor no).

## 5. TTL y fragmentación

Datos: Paquete IP de 2500 bytes, MTU Ethernet = 1500 bytes.

a) **Fragmentos generados:**
   - Cabecera IP: 20 bytes
   - Datos a fragmentar: 2500 - 20 = 2480 bytes de payload
   - Primer fragmento: 20 (cabecera) + 1480 (datos) = 1500 bytes (MF=1)
   - Segundo fragmento: 20 (cabecera) + 1000 (datos restantes) = 1020 bytes (MF=0)

   **Total: 2 fragmentos** (no 3, como se podría pensar erróneamente al dividir 2500/1500).

b) **Campos que cambian:**
   - **Flags:** More Fragments (MF) = 1 en el primero, 0 en el último
   - **Fragment Offset:** 0 en el primero, 185 (1480/8) en el segundo
   - **Total Length:** 1500 en el primero, 1020 en el segundo
   - **Identification:** mismo valor en ambos (para que el destino los asocie)
   - **Header Checksum:** se recalcula para cada fragmento

c) TTL inicial: 64. Saltos: 15. TTL al llegar: **64 - 15 = 49**.

## 6. Wireshark: filtros combinados

a) `http && ip.src == 192.168.1.10`
b) `tcp.dstport == 22 || tcp.dstport == 443`
c) `dns && !(dns.qry.name == "google.com")`
d) `tcp.analysis.retransmission || tcp.analysis.fast_retransmission || tcp.analysis.duplicate_ack`
