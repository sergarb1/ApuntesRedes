---
title: Boletín U01 — Avanzado
description: Ejercicios avanzados de Fundamentos de Redes
---

# 📝 Boletín U01 — Avanzado

> Ejercicios que requieren aplicar los conceptos de forma más profunda. Incluye pistas para ayudarte.

---

## 1. Diagnóstico de red

Observa este escenario:

```
PC-A (192.168.1.10/24)  ────  Switch  ────  PC-B (192.168.1.30/24)
                                  │
                                Router (192.168.1.1/24)
                                  │
                                Internet
```

PC-A hace ping a 8.8.8.8 y falla. PC-A hace ping a PC-B y funciona. ¿Cuál es la causa más probable del fallo?

**Pista:** Centra el diagnóstico en el elemento que separa la red local de la red externa. ¿Qué necesita configurarse en PC-A para que sepa por dónde salir?

## 2. Diseño de red mínima

Diseña una red para una oficina con:
- 15 PCs
- 2 impresoras de red
- 1 servidor de archivos
- Acceso a Internet

Especifica: qué dispositivos usas, cuántos cables, estructura de direccionamiento IP (elige una red privada).

**Pista:** Una red /24 te da 254 direcciones utilizables. ¿Es suficiente? ¿Necesitas más de un switch?

## 3. ¿Cuántos dominios?

Tienes 3 switches conectados en cadena (Switch1 → Switch2 → Switch3). Cada switch tiene 1 PC conectado. ¿Cuántos dominios de colisión y de broadcast hay?

**Pista:** Cada puerto de un switch es un dominio de colisión independiente. Los switches no segmentan dominios de broadcast.

## 4. ARP en acción

PC-A (MAC: AA:AA:AA:AA:AA:AA, IP: 10.0.0.1) quiere enviar datos a PC-B (MAC: BB:BB:BB:BB:BB:BB, IP: 10.0.0.2). La tabla ARP de PC-A está vacía.

a) ¿Qué trama envía primero PC-A?
b) ¿Qué tipo de dirección MAC destino tiene esa trama?
c) ¿Quién responde? ¿Es unicast o broadcast?
d) ¿Qué contiene la respuesta?

## 5. Diferencia práctica

Explica con un ejemplo real cuándo usarías un hub vs un switch vs un router. Pon un caso concreto para cada uno.

**Pista:** Piensa en términos de capas OSI y tamaño de la red. El hub para una red muy pequeña y sin presupuesto, el switch para una LAN moderna, el router para conectar esa LAN con otra o con Internet.

## 6. Verdadero o falso (justifica los falsos)

a) Un router puede conectar dos redes con direccionamiento diferente.
b) Un switch puede conectar dos redes con direccionamiento diferente.
c) En una topología de bus, si un cable falla, toda la red cae.
d) En una topología de estrella, si el switch central falla, toda la red cae.
e) La dirección MAC cambia cada vez que reinicias el PC.

**Pista:** La MAC está grabada en el hardware de fábrica. La IP se asigna por software.
