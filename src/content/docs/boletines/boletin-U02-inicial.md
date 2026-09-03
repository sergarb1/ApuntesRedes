---
title: Boletín U02 — Inicial
description: Ejercicios básicos de Fundamentos de Redes
---

# 📝 Boletín U02 — Inicial

> Ejercicios básicos para afianzar los conceptos de redes. Intenta resolverlos sin mirar los apuntes.

---

## 1. Clasifica estas redes

Indica si cada una es LAN, MAN o WAN:

a) La red de tu casa con 3 dispositivos
b) La red de un edificio de oficinas con 200 PCs
c) La red que une las sedes de una empresa en Madrid y Barcelona
d) La red de fibra óptica que cubre toda una ciudad

## 2. Verdadero o falso

a) Un hub segmenta los dominios de colisión.
b) Un switch aprende direcciones MAC automáticamente.
c) Un router trabaja en la capa 2 del modelo OSI.
d) Una dirección MAC tiene 48 bits.
e) La dirección MAC de un equipo cambia cada vez que se reinicia.

## 3. Dibuja la topología

Tienes:
- 1 router
- 2 switches
- 4 PCs

Dibuja (o describe con palabras) la topología en estrella extendida que los conecta todos a Internet.

## 4. Empaqueta tu memoria: une cada PDU con su capa

| PDU | Capa |
|---|---|
| 1. Bits | a) Capa 4 · Transporte |
| 2. Trama | b) Capa 1 · Física |
| 3. Paquete | c) Capa 2 · Enlace |
| 4. Segmento | d) Capa 3 · Red |

## 5. ¿TCP o UDP?

Elige el protocolo de transporte correcto para cada caso:

a) Descargar un PDF de 2 GB
b) Una videollamada con la familia
c) Navegar por una web HTTPS
d) Una única consulta a un servidor DNS

## 6. Calcula: una red /24

La red es `192.168.1.0/24` (máscara `255.255.255.0`):

a) ¿Cuántas direcciones IP totales hay en la subred?
b) ¿Cuántas son utilizables por equipos?
c) ¿De qué dirección se escribe como "dirección de la propia red"?
d) ¿Y la dirección de broadcast?

## 7. Sopa de letras conceptual

Relaciona cada término con su definición:

| Término | Definición |
|---|---|
| 1. Hub | a) Dispositivo capa 3 que encamina paquetes |
| 2. Switch | b) Repite la señal por todos los puertos |
| 3. Router | c) Identificador de 48 bits grabado en la NIC |
| 4. MAC | d) Conjunto de reglas de comunicación |
| 5. Protocolo | e) Dispositivo capa 2 que aprende MACs |
| 6. IP | f) Dirección lógica de 32 bits |

## 8. Ping mental guiado

El PC-A (`192.168.1.10`) hace ping al PC-B (`192.168.1.20`). Misma red, mismo switch, tabla ARP de PC-A vacía. Describe paso a paso qué ocurre desde que se escribe `ping 192.168.1.20` hasta que llega la respuesta.