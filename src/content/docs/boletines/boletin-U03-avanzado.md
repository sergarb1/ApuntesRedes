---
title: Boletín de Capa de enlace y trama Ethernet — Avanzado
description: Ejercicios avanzados de MAC, trama, encapsulación y diagnóstico por capas
---

# ⭐ Boletín de Capa de enlace y trama Ethernet — Avanzado

> Ejercicios que requieren aplicar OSI, MACs, tramas y encapsulación de forma combinada. En los difíciles tienes pista.

---

## 1. Lectura de bits: ¿qué MAC es esta?

Tu interfaz tiene la MAC `02:1A:2B:3C:4D:5E`:

a) ¿El bit I/G del primer byte vale 0 o 1? ¿Unicast o multicast?
b) ¿El bit U/L vale 0 o 1? ¿De fábrica o administrada localmente?
c) Justifica ambas respuestas con la representación binaria del primer byte (`02` = `00000010`).

## 2. La trama en hex

Wireshark te muestra el inicio de una trama:

```
0000  ff ff ff ff ff ff  00 1a 2b 3c 4d 5e  08 06 ...
```

a) ¿Es broadcast, unicast o multicast la MAC de destino?
b) ¿De quién es la MAC de origen (según los 3 primeros bytes)?
c) ¿Qué protocolo lleva dentro según el EtherType? ¿Quién responderá y a quién?

## 3. Diagnóstico por capas (OSI en acción)

Síntomas en una oficina:

- **Síntoma A:** el LED del switch está verde, el tester de cables pasa al 100%, pero Wireshark muestra tramas con FCS erróneo y el ping al gateway falla a veces.
- **Síntoma B:** el LED del puerto del switch está apagado en el PC del usuario, aunque el cable está enchufado a ambos lados.
- **Síntoma C:** dos PCs de la misma oficina tienen la **misma MAC** configurada: una recibe y la otra, a ratos, no.

Para cada síntoma:

a) ¿En qué capa OSI (1, 2 o 3) sitúas el fallo? Justifica con la PDU afectada (bits, trama, paquete).
b) ¿Qué comando o herramienta usarías primero?
c) En el Síntoma A, el tester ha pasado al 100%. ¿Puedes descartar ya la capa 1? Justifica.

**Pista:** escalera 1→2→3 de la unidad de introducción; si hay LED y tester OK, la capa 1 local funciona y el problema sube a la trama o más arriba.

## 4. El viaje con sus MACs

PC (MAC `AAAA…01`, IP `10.0.0.5`) manda un paquete al servidor web (IP `93.184.216.34`) pasando por el router de casa (MAC `BBBB…01` en la LAN, MAC `BBBB…02` hacia el ISP).

Rellena la tabla:

| Tramo | MAC origen → destino | IP origen → destino |
|---|---|---|
| PC → router | ? | ? |
| Router → ISP (siguiente salto) | ? | ? |

a) ¿Aparece alguna vez la MAC del servidor en tu LAN? ¿Por qué?
b) ¿Qué servicio se usó para averiguar la MAC del router?

## 5. Matemáticas de la trama

a) Una trama Ethernet II tiene payload de 100 bytes. ¿Cuánto mide la trama completa (cabecera + payload + FCS)?
b) Tu aplicación manda 1600 bytes de datos. ¿Cuántas tramas como mínimo se necesitan (sin contar cabeceras TCP/IP) y qué justificación técnica obliga a ello?
c) ¿Qué campo de la capa 3 se encarga de partir ese exceso si la trama no puede engullirlo?

## 6. Caso de laboratorio: el gateway que no responde

La PC tiene IP `192.168.1.50/24`, puerta de enlace `192.168.1.1` y DNS `8.8.8.8`. No sale a Internet, pero el ping a `192.168.1.60` (otra PC de la LAN) funciona.

a) Si la LAN funciona, ¿qué tramos quedan descartados y cuáles siguen en pie?
b) ¿Qué comando muestra qué MAC se usa para hablar con `192.168.1.1`?
c) En la tabla ARP, ¿qué MAC esperas ver para `192.168.1.1`? ¿Y si aparece `00:00:00:00:00:00`?

**Pista:** piensa en capa 2 (trama al router), no en DNS todavía: si no hay MAC del gateway, no hay trama hacia fuera.

## 7. 802.3 vs 802.11 en la práctica

En una red con WiFi y cable:

a) Un portátil WiFi ve una trama con 4 direcciones MAC. ¿Es de 802.3 o de 802.11?
b) Si el AP cifra WPA2, ¿dónde descifra la trama antes de entregarla a la capa 3?
c) ¿Por qué el mismo EtherType `0x0800` puede viajar por cable y por aire sin que el navegador se entere?
