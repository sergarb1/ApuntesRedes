---
title: Boletín UD12 — Inicial
description: Ejercicios básicos de alta disponibilidad y redundancia
---

# 📝 Boletín UD12 — Inicial

> Ejercicios básicos para afianzar los conceptos de redundancia: SPOFs, STP, EtherChannel y FHRP.

---

## 1. ¿Qué concepto soy?

a) Un único componente cuya caída tumba todo el servicio.
b) Protocolo que evita bucles de capa 2 bloqueando puertos redundantes.
c) Tecnología que agrupa varios enlaces físicos en uno lógico.
d) Protocolo que da gateway redundante con IP virtual compartida.
e) Tiempo de servicio pactado, en porcentaje anual (99,99%).

## 2. Verdadero o falso

a) STP bloquea puertos para evitar bucles de capa 2.
b) EtherChannel aumenta el ancho de banda y la redundancia a la vez.
c) En HSRP los dos routers tienen la misma IP física configurada.
d) Un stack de switches se administra como un único switch lógico.
e) Más disponibilidad de nueves siempre sale gratis.

## 3. Cálculo de disponibilidad

a) Un servicio con 99,9% de disponibilidad anual, ¿cuánto tiempo puede estar caído al año (aprox)?
b) ¿Y con 99,99%?
c) Si tu red tiene tres SPOFs en serie con 99,5% cada uno, ¿cuál es la disponibilidad aproximada del conjunto?

**Pista:** multiplica disponibilidades en serie; 1 año ≈ 8.760 horas.

## 4. ¿Quién bloquea el puerto?

Dos switches (SW1 y SW2) conectados por dos enlaces. SW1 es la raíz STP.

a) ¿Qué switch elegirá el puerto bloqueado?
b) ¿Qué criterio usa STP si los costes son iguales?
c) ¿Qué pasaría si no hubiera STP y ambos enlaces reenviaran?

## 5. Relaciona comandos HSRP

| Comando | Función |
|---|---|
| 1. `standby 1 ip 192.168.1.254` | a) Prioridad del router (mayor gana) |
| 2. `standby 1 priority 110` | b) IP virtual del grupo |
| 3. `standby 1 preempt` | c) Estado del grupo HSRP |
| 4. `show standby brief` | d) Recuperar el rol activo al volver |

## 6. Diseño básico redundante

Dibuja o describe una topología con 2 switches de acceso, 2 de distribución y 2 routers de salida, indicando:

a) Dónde pondrías EtherChannels.
b) Dónde actúa STP y dónde HSRP.
c) ¿Qué pasa si cae un switch de distribución?

## 7. VRRP vs HSRP

a) ¿Cuál es propietario de Cisco y cuál es el estándar?
b) ¿Qué IP virtual usa VRRP por defecto si no se configura otra?
c) ¿En qué protocolo está el router "dueño" de la IP virtual y cómo se llama ahí?

## 8. Diagnóstico rápido

Los usuarios de la VLAN 10 no llegan a Internet. El switch de acceso está bien, los PCs tienen IP correcta y el gateway responde al ping... pero desde el router de salida no hay ruta.

a) ¿Por qué el ping al gateway funciona si el problema está "más allá"?
b) ¿Qué comando del gateway (HSRP activo) usarías para ver la tabla de rutas?
c) ¿Es este fallo un SPOF resuelto por HSRP? ¿Por qué?
