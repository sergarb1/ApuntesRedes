---
title: Boletín U03 — Avanzado (Resuelto)
description: Soluciones de los ejercicios avanzados de Modelos OSI y Análisis de Tráfico
---

# ✅ Boletín U03 — Avanzado (Resuelto)

---

## 1. Análisis de captura Wireshark

a) **Paquetes 1-3:** three-way handshake TCP entre el PC (192.168.1.10) y el gateway (192.168.1.1). El PC abre una conexión desde el puerto efímero 54321 hacia el 443 (HTTPS) del gateway.

b) **Paquete 4:** el PC inicia un **nuevo** three-way handshake, ahora hacia 142.250.184.4 (un servidor real de Google). Sugiere que el primer handshake fue local (una validación o proxy del gateway) y ahora procede con el destino real.

c) **Lo que falta:** la respuesta al paquete 4 (el SYN-ACK del servidor). Es probable que la captura se detuviera antes, o que el destino aún no responda. En HTTPS, además, el contenido viaja cifrado y no aparecería como HTTP.

## 2. Diseña la encapsulación

a) **Ethernet:**
   - MAC destino: la del **gateway** (192.168.1.1).
   - MAC origen: la del PC.
   - EtherType: `0x0800` (IPv4).

b) **IP:**
   - IP origen: `192.168.1.10`.
   - IP destino: `8.8.8.8`.
   - Protocol: **17 (UDP)**, porque la consulta DNS va sobre UDP.
   - TTL: 64 (típico en Linux).

c) **UDP:**
   - Puerto origen: **efímero** (ej. 34567).
   - Puerto destino: **53** (DNS).

d) **DNS:** la consulta pide la dirección A (IPv4) de "google.com": `¿Quién es google.com?`.

## 3. Diagnóstico por capas

a) **Capa 7 (Aplicación)** — concretamente el servicio **DNS**. El ping a 8.8.8.8 (ICMP, capa 3) funciona, pero los nombres no se resuelven.
b) `nslookup google.com` o `dig google.com`.
c) **Causa más probable:** el servidor DNS configurado no responde o es inaccesible (IP inventada o caído).

## 4. Three-way handshake

a) **SYN perdido:** el cliente no recibe SYN-ACK, espera el RTO y **reenvía el SYN**. La conexión se establece una vez que el SYN llega y el servidor responde.
b) **SYN-ACK perdido:** el cliente tampoco recibe respuesta y reenvía su SYN; el servidor, al recibir el segundo SYN, reenvía su SYN-ACK. La conexión se establece cuando el SYN-ACK llega.
c) **ACK final perdido:** el servidor queda en estado **SYN-RECEIVED** y reenvía el SYN-ACK tras su RTO. El cliente, que ya cree tener la conexión, puede incluso mandar datos que el servidor aceptará. Si tras varios reintentos no llega el ACK, el servidor cierra.

**Resumen:** en a) y b) la conexión acaba estableciéndose tras la retransmisión. En c) puede quedar "a medias": el cliente cree que sí y el servidor no está seguro.

## 5. TTL y fragmentación

Datos: paquete IP de 2500 bytes, MTU Ethernet = 1500.

a) **Fragmentos generados:**
   - Cabecera IP: 20 bytes.
   - Datos a fragmentar: 2500 - 20 = 2480 bytes.
   - Fragmento 1: 20 (cabecera) + 1480 (datos) = **1500 bytes** (MF=1).
   - Fragmento 2: 20 (cabecera) + 1000 (datos restantes) = **1020 bytes** (MF=0).

   **Total: 2 fragmentos** (no 3: hay que contar la cabecera de cada fragmento).

b) **Campos que cambian:**
   - Flags: **MF=1** en el primero, **MF=0** en el último.
   - **Fragment Offset:** 0 en el primero, 185 (1480/8) en el segundo.
   - **Total Length:** 1500 y 1020.
   - **Identification:** el mismo en ambos (para que el destino los asocie).
   - **Header Checksum:** se recalcula en cada fragmento.

c) **TTL al llegar:** 64 - 15 = **49**.

## 6. Wireshark: filtros combinados

a) `http && ip.src == 192.168.1.10`
b) `tcp.dstport == 22 || tcp.dstport == 443`
c) `dns && !(dns.qry.name == "google.com")`
d) `tcp.analysis.flags`

## 7. La conexión que no se cierra

a) **Capa 4 (Transporte)**, protocolo **TCP**: el estado `TIME_WAIT` es propio del cierre de conexiones TCP.
b) El cierre **FIN → ACK → FIN → ACK**. Cuando ambos lados terminan, la conexión pasa a `TIME_WAIT` durante **2 × MSL** (el doble del tiempo máximo de vida de un segmento, ~2 minutos) para asegurar que los ACKs finales no se pierdan.

c) **Recomendaciones:** aumentar el rango de puertos efímeros (o activar *time-wait reuse*), reducir el rango de conexiones en espera, o mejorar la liberación del stack (`tcp_tw_reuse` en Linux). La clave es entender que el estado NO se queda para siempre: es un periodo de seguridad de TCP.

## 8. Del nombre a la trama, al revés

a) La **capa 2 (Enlace)** elimina la cabecera Ethernet y queda el **paquete IP**.

b) En `0x0800` = **IPv4** (capa 3); con Protocol = 6, el contenido es **TCP** (capa 4). Es una trama que lleva tráfico TCP sobre IPv4 → perfecta para `https://example.com`.

c) TCP **ordena los segmentos por su número de secuencia** en el receptor y los reensambla para reconstruir la página antes de entregarla a la aplicación.

d) La capa 2 comprueba el **FCS (CRC)**: si no coincide, la trama se **descarta** sin entregarla a la capa 3.