---
title: Boletín U02 — Avanzado
description: Ejercicios avanzados de Modelos OSI y Análisis de Tráfico
---

# 📝 Boletín U02 — Avanzado

> Ejercicios que requieren aplicar los conceptos de capas OSI, protocolos y Wireshark de forma más profunda.

---

## 1. Análisis de captura Wireshark

Observa esta captura simplificada:

```
No.  Time     Source          Destination       Protocol   Info
1    0.000    192.168.1.10    192.168.1.1       TCP        54321 → 443 [SYN] Seq=0
2    0.002    192.168.1.1     192.168.1.10      TCP        443 → 54321 [SYN, ACK] Seq=0 Ack=1
3    0.003    192.168.1.10    192.168.1.1       TCP        54321 → 443 [ACK] Seq=1 Ack=1
4    0.010    192.168.1.10    142.250.184.4     TCP        54321 → 443 [SYN] Seq=0
```

**Preguntas:**
a) ¿Qué está ocurriendo en los paquetes 1-3?
b) ¿Por qué el paquete 4 tiene IP destino diferente?
c) ¿Qué falta entre los paquetes 3 y 4? ¿Por qué?

**Pista:** Fíjate en las IPs. ¿192.168.1.1 y 142.250.184.4 están en la misma red?

## 2. Diseña la encapsulación

Eres un paquete DNS que viaja desde tu PC (192.168.1.10) al servidor DNS (8.8.8.8). Describe el contenido de cada cabecera:

a) **Ethernet:** ¿MAC destino? (sabes que el gateway es 192.168.1.1)
b) **IP:** ¿IP origen? ¿IP destino?
c) **UDP:** ¿Puerto origen? ¿Puerto destino?
d) **DNS:** ¿Qué contiene la consulta?

**Pista:** DNS usa UDP por defecto en las consultas. El puerto origen será un puerto efímero (>1024).

## 3. Diagnóstico por capas

Un usuario reporta: "No puedo acceder a google.com, pero sí a 8.8.8.8".

a) ¿En qué capa(s) OSI está el problema?
b) ¿Qué herramienta usarías para confirmarlo?
c) ¿Cuál es la causa más probable?

**Pista:** Si el ping a una IP funciona pero el navegador no carga, el problema está en la resolución de nombres.

## 4. Three-way handshake

Explica paso a paso qué ocurre si durante un three-way handshake:

a) El SYN del cliente se pierde
b) El SYN-ACK del servidor se pierde
c) El ACK final del cliente se pierde

¿En qué casos se establece la conexión? ¿En cuáles no?

**Pista:** TCP es robusto pero tiene límites. Investiga el temporizador de retransmisión (RTO).

## 5. TTL y fragmentación

Un paquete IP de 2500 bytes debe viajar por una red Ethernet (MTU=1500).

a) ¿Cuántos fragmentos se generan?
b) ¿Qué campos del header IP cambian en cada fragmento?
c) Si el TTL inicial es 64 y el destino está a 15 saltos, ¿cuál será el TTL al llegar?

**Pista:** La fragmentación divide el paquete en trozos que no superen el MTU. No olvides contar la cabecera IP de cada fragmento.

## 6. Wireshark: filtros combinados

Escribe el filtro de Wireshark para cada situación:

a) Todo el tráfico HTTP desde la IP 192.168.1.10
b) Paquetes TCP con puerto destino 22 o 443
c) Tráfico DNS que no sea de google.com
d) Paquetes con errores (retransmisiones o duplicados)

**Pista:** Usa operadores lógicos como `&&`, `||`, `!` y la sintaxis `ip.src`, `tcp.port`, etc.
