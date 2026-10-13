---
title: Boletín de Capa de enlace y trama Ethernet — Packet Tracer
description: Prácticas guiadas de capa 2 en Packet Tracer (y un toque de Wireshark) 🖥️
---

# 🖥️ Boletín de Capa de enlace y trama Ethernet — Packet Tracer

> **Variante práctica de nivel único** (no es el par inicial/avanzado). Ocho micro-prácticas de baja dificultad en **Packet Tracer** para afianzar la capa 2: direcciones MAC, tabla de direcciones del switch, trama Ethernet, EtherType y ARP. Una o dos abres Wireshark (o el *Simulation mode* de PT) para mirar esos campos en caliente. El resuelto está justo al lado: úsalo solo cuando te atasques.

> 🧰 **Requisitos:** Cisco Packet Tracer (cualquier versión reciente). Wireshark opcional si tu profesor lo permite; si no, usa el *Simulation mode* de PT. Los ejercicios 1, 2 y 4 arrancan con cableado: es **repaso de la unidad anterior** ([directo, cruzado y consola](/ApuntesRedes/02-medios-y-cableado/03-directo-cruzado-consola)), lo que se evalúa es lo que pasa en la capa 2.

---

## 1. Primera topología: 3 PC y un switch

> 🔁 **Repaso de la unidad anterior:** el cableado lo viste en [directo, cruzado y consola](/ApuntesRedes/02-medios-y-cableado/03-directo-cruzado-consola).

Monta en PT **3 PCs** (`PC0`, `PC1`, `PC2`) conectadas a un **Switch0** con el cable correcto (PC ↔ switch) y comprueba que los LEDs de los puertos quedan en verde. Asigna a cada PC una IP estática de la misma subred (`192.168.1.10/24`, `.11`, `.12`) y haz un `ping` de `PC0` a `PC2`.

Ahora sí, capa 2: anota en una libreta las **tres direcciones MAC** de las PCs (Config → FastEthernet → MAC Address) y, antes de mirar nada más, escribe qué MAC crees que verá `PC2` en la cabecera Ethernet de la trama que le llega.

> 💡 **Pista:** si el cable sale en rojo, revisa el tipo de medio y que el puerto del switch esté `up`. Eso es capa 1; lo que buscamos aquí está debajo.

## 2. PC a PC: ¿qué cable?

> 🔁 **Repaso de la unidad anterior:** la regla directo/cruzado está en [directo, cruzado y consola](/ApuntesRedes/02-medios-y-cableado/03-directo-cruzado-consola).

Conecta **solo `PC0` y `PC1`** con un cable entre sus interfaces Ethernet (sin switch). Intenta un `ping`. Si no funciona, prueba con el otro tipo de cable de cobre de PT y vuelve a probar.

Cuando el enlace suba, abre el *Simulation mode* y mira la cabecera Ethernet de la trama: ¿la MAC origen sigue siendo la de `PC0` en todos los saltos, o cambia? ¿Y la IP?

> 💡 **Pista:** recuerda la regla de la unidad anterior (directo vs cruzado) y mira si tu versión de PT aplica Auto-MDI-X.

## 3. La tabla MAC del switch

Con la topología del ejercicio 1 ya funcionando, abre la CLI del `Switch0` y ejecuta `show mac address-table` después de haber hecho al menos un ping. Identifica en qué puerto aprendió cada MAC de las PCs.

> 💡 **Pista:** si la tabla sale vacía, haz un ping y vuelve a ejecutar el comando.

## 4. Fallo de capa 2 a propósito

> 🔁 **Repaso/puente:** el diagnóstico físico lo viste en [directo, cruzado y consola](/ApuntesRedes/02-medios-y-cableado/03-directo-cruzado-consola).

Desconecta (o apaga la interfaz de) el cable entre `PC0` y el switch. Antes de tocar nada, copia la salida de `show mac address-table`. Después, vuelve a ejecutarla: ¿sigue ahí la MAC de `PC0`? Intenta un `ping` de `PC1` a `PC2` (que no dependen del cable de `PC0`) y luego de `PC0` a `PC1`. Anota qué falla, en qué capa OSI lo situarías y qué le pasa a la tabla de direcciones del switch con el tiempo (¿se cae sola? ¿en cuánto?).

> 💡 **Pista:** ¿se pierde solo el host desconectado o toda la topología? Las entradas dinámicas de la tabla MAC caducan si no se usan.

## 5. Modo Simulation: sigue la trama

En la topología del ejercicio 1, activa el **Simulation mode** (junto al timer), lanza un `ping` de `PC0` a `PC1` y observa los pasos del paquete: switch, tablas, siguiente salto. Para en cada evento y comprueba de qué protocolo se trata (ICMP).

> 💡 **Pista:** abre el sobre (*envelope*) de cada evento y mira la capa Ethernet: ¿qué direcciones MAC ven en cada salto?

## 6. Wireshark: EtherType de un ping

Captura tráfico en la interfaz de una PC (o exporta la captura de PT) mientras haces un `ping 192.168.1.11`. Filtra por ICMP y abre una trama Ethernet: identifica **MAC origen**, **MAC destino** y el campo **EtherType** (`0x0800` = IPv4).

> 💡 **Pista:** si tu PT no integra Wireshark, usa *Simulation mode*: haz clic en el sobre del evento → pestaña *Details* / *Outbound PDU details*, donde aparece la cabecera *Ethernet II* con MACs y *Type*.

## 7. Wireshark: ¿dónde está el ARP?

En la misma captura del ejercicio 6, localiza los mensajes **ARP** (EtherType `0x0806`) que se disparan justo antes del primer `ping`. Compara la pregunta ARP con la respuesta: ¿qué información se intercambia?

> 💡 **Pista:** si el ping al principio falla una vez y luego va, suele ser el ARP resolviéndose.

## 8. Hub o switch: dominio de colisión

> 🔁 **Puente:** el detalle de dominios de colisión y broadcast se remata en la unidad de switching ([qué es un switch](/ApuntesRedes/05-switching/01-que-es-un-switch)).

Monta dos mini-topologías en paralelo: (A) 3 PCs + **hub**; (B) 3 PCs + **switch**. Desde una PC, observa el tráfico en *Simulation mode* o con captura: ¿a quién llegan las tramas en cada caso? ¿Se reutilizan las direcciones MAC de una topología a otra? Resume la diferencia en una frase.

> 💡 **Pista:** relaciona el resultado con los dominios de colisión y de broadcast, y con lo que ya sabes de la tabla MAC del switch.

---

## 📋 Criterios de esta práctica

| Ejercicio | Concepto | Capa |
|---|---|---|
| 1–2 | Repaso: cables directo/cruzado, montaje → MACs en la trama | 1 → 2 |
| 3 | Tabla MAC, switches | 2 |
| 4 | Repaso: fallo físico → tabla MAC y caducidad de entradas | 1 / 2 |
| 5 | Simulation mode, flujo de la trama | 2 |
| 6–7 | EtherType, MACs, ARP | 2 |
| 8 | Hub vs switch (puente con switching) | 1–2 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-capa-de-enlace) · **También:** [Resuelto](/ApuntesRedes/boletines/boletin-u03-packettracer-resuelto)
