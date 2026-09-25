---
title: Boletín UD2 — Packet Tracer
description: Prácticas guiadas de capas 1 y 2 en Packet Tracer (y un toque de Wireshark) 🖥️
---

# 🖥️ Boletín UD2 — Packet Tracer

> **Variante práctica de nivel único** (no es el par inicial/avanzado). Ocho micro-prácticas de baja dificultad en **Packet Tracer** para afianzar medios, cableado, capas 1–2 y la trama Ethernet. Una o dos abres Wireshark (o el *Simulation mode* de PT) para mirar EtherTypes y MACs. El resuelto está justo al lado: úsalo solo cuando te atasques.

> 🧰 **Requisitos:** Cisco Packet Tracer (cualquier versión reciente). Wireshark opcional si tu profesor lo permite; si no, usa el *Simulation mode* de PT.

---

## 1. Primera topología: 3 PC y un switch

Monta en PT **3 PCs** (`PC0`, `PC1`, `PC2`) conectadas a un **Switch0**. Usa el tipo de cable correcto (PC ↔ switch) y comprueba que los LEDs de los puertos quedan en verde. Asigna a cada PC una IP estática de la misma subred (`192.168.1.10/24`, `.11`, `.12`) y haz `ping` de `PC0` a `PC2`.

> 💡 **Pista:** si el cable sale en rojo, revisa el tipo de medio y que el puerto del switch esté `up`.

## 2. PC a PC: ¿qué cable?

Conecta **solo `PC0` y `PC1`** con un cable entre sus interfaces Ethernet (sin switch). Intenta un `ping`. Si no funciona, prueba con el otro tipo de cable de cobre de PT y vuelve a probar.

> 💡 **Pista:** recuerda la regla de la UD2 (directo vs cruzado) y mira si tu versión de PT aplica Auto-MDI-X.

## 3. La tabla MAC del switch

Con la topología del ejercicio 1 ya funcionando, abre la CLI del `Switch0` y ejecuta `show mac address-table` después de haber hecho al menos un ping. Identifica en qué puerto aprendió cada MAC de las PCs.

> 💡 **Pista:** si la tabla sale vacía, haz un ping y vuelve a ejecutar el comando.

## 4. Fallo de capa 1 a propósito

Desconecta (o apaga la interfaz de) el cable entre `PC0` y el switch. Intenta un `ping` de `PC1` a `PC2` (que no dependen del cable de `PC0`) y luego de `PC0` a `PC1`. Anota qué falla y en qué capa OSI lo situarías.

> 💡 **Pista:** ¿se pierde solo el host desconectado o toda la topología?

## 5. Modo Simulation: sigue la trama

En la topología del ejercicio 1, activa el **Simulation mode** (junto al timer), lanza un `ping` de `PC0` a `PC1` y observa los pasos del paquete: switch, tablas, siguiente salto. Para en cada evento y comprueba de qué protocolo se trata (ICMP).

> 💡 **Pista:** abre el sobre (*envelope*) de cada evento y mira la capa Ethernet: ¿qué direcciones MAC ven en cada salto?

## 6. Wireshark: EtherType de un ping

Captura tráfico en la interfaz de una PC (o exporta la captura de PT) mientras haces un `ping 192.168.1.11`. Filtra por ICMP y abre una trama Ethernet: identifica **MAC origen**, **MAC destino** y el campo **EtherType** (`0x0800` = IPv4).

> 💡 **Pista:** si no ves Wireshark, en PT: *Add Complex → Add Simple PDU* o la pestaña *Simulation* con detalle de capas.

## 7. Wireshark: ¿dónde está el ARP?

En la misma captura del ejercicio 6, localiza los mensajes **ARP** (EtherType `0x0806`) que se disparan justo antes del primer `ping`. Compara la pregunta ARP con la respuesta: ¿qué información se intercambia?

> 💡 **Pista:** si el ping al principio falla una vez y luego va, suele ser el ARP resolviéndose.

## 8. Hub o switch: dominio de colisión

Monta dos mini-topologías en paralelo: (A) 3 PCs + **hub**; (B) 3 PCs + **switch**. Desde una PC, observa el tráfico en *Simulation mode* o con captura: ¿a quién llegan las tramas en cada caso? Resume la diferencia en una frase.

> 💡 **Pista:** relaciona el resultado con los dominios de colisión y de broadcast de la UD2.

---

## 📋 Criterios de esta práctica

| Ejercicio | Concepto UD2 | Capa |
|---|---|---|
| 1–2 | Cables directo/cruzado, montaje | 1 |
| 3 | Tabla MAC, switches | 2 |
| 4 | Diagnóstico de fallo físico | 1 / OSI |
| 5 | Simulation mode, flujo de la trama | 1–2 |
| 6–7 | EtherType, MACs, ARP (aporte a UD3) | 2 |
| 8 | Hub vs switch | 1–2 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/02-ethernet-cableado) · **También:** [Resuelto](/ApuntesRedes/boletines/boletin-u02-packettracer-resuelto)
