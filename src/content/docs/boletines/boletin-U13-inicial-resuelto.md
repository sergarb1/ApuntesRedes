---
title: Boletín de Alta disponibilidad — Inicial (Resuelto)
description: Soluciones de los ejercicios básicos de alta disponibilidad y redundancia
---

# ✅ Boletín de Alta disponibilidad — Inicial (Resuelto)

---

## 1. ¿Qué concepto soy?

a) **SPOF** (Single Point of Failure).
b) **STP** (Spanning Tree Protocol).
c) **EtherChannel** (o LAG/port-channel).
d) **FHRP** (HSRP, VRRP o GLBP).
e) Los **cuatro nueves**: 99,99% ≈ 52 minutos al año.

## 2. Verdadero o falso

a) **Verdadero.** Bloquea puertos redundantes y los deja de reserva: si falla el camino activo, desbloquea.
b) **Verdadero.** Suma ancho de banda y si un miembro cae, el canal sigue (con menos ancho).
c) **Falso.** Cada router conserva su IP física; la IP virtual es **compartida** y la responde el activo.
d) **Verdadero.** El stack se ve como un switch: una config, una MAC, una gestión.
e) **Falso.** Cada "nueve" extra multiplica el coste (redundancia, monitorización, pruebas). El diseño busca el equilibrio coste/riesgo.

## 3. Cálculo de disponibilidad

a) 99,9% → **8,76 horas** al año (0,001 × 8.760 h).
b) 99,99% → **52,6 minutos** al año.
c) 0,995 × 0,995 × 0,995 ≈ **98,5%** (≈ 131 horas al año de caída). En serie, la disponibilidad del conjunto siempre es **peor** que la del peor eslabón.

## 4. ¿Quién bloquea el puerto?

a) **SW2** (el que no es raíz): elige un puerto raíz y bloquea el otro de los dos enlaces.
b) El **ID de sistema del switch emisor** (prioridad + MAC): gana el BPDU con menor ID; a igualdad, la MAC más baja.
c) **Tormenta de broadcast**: las tramas de broadcast giran eternamente, multiplicándose en cada vuelta, y la red se satura en segundos (y las tablas MAC se corruptan).

## 5. Relaciona comandos HSRP

1 → b (`standby 1 ip` define la IP virtual)
2 → a (`priority` más alta = más candidato a activo)
3 → d (`preempt` permite recuperar el rol activo al volver)
4 → c (`show standby brief` = estado de los grupos)

## 6. Diseño básico redundante

a) **EtherChannel** en los enlaces de acceso→distribución (2×1G por enlace, por ejemplo) y en la interconexión de los dos routers de salida. Duplica ancho y tolera la caída de un miembro.

b) **STP** actúa en toda la topología de capa 2 (acceso y distribución): bloquee los enlaces redundantes que crearían bucles. **HSRP** actúa en capa 3, entre los dos routers de salida, hacia la puerta de enlace de cada VLAN.

c) Si cae un switch de distribución: STP desbloquea los puertos de reserva, el HSRP activo puede pasar al otro router si era él quien cayó, y el servicio sigue (con quizá menos ancho). Es el objetivo de la redundancia: que el fallo sea un "evento", no una "incidencia".

## 7. VRRP vs HSRP

a) **HSRP** es propietario de Cisco; **VRRP** es el estándar abierto (RFC 5798).
b) Por defecto VRRP usa la **IP física del router maestro como IP virtual** (distinto de HSRP, que usa una IP virtual propia en la subred).
c) En VRRP se llama **router maestro** (y los otros, backup); en HSRP, **activo** y en espera.

## 8. Diagnóstico rápido

a) Porque el gateway (routers con HSRP) está vivo en **capa 2**: el ping solo prueba que el router activo responde, no que sepa encaminar hacia Internet.

b) `show ip route` en el router HSRP activo (y `show standby brief` para saber cuál es).

c) **No.** HSRP protege la **caída del gateway** (capa 3 local). Aquí el fallo está en el **routing de salida** del propio activo: si cae todo el router, HSRP ayuda; pero un fallo de ruta en el activo con el router vivo no dispara el failover (salvo con tracking/ip SLA configurado).