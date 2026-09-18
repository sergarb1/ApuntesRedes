---
title: Boletín UD12 — Avanzado
description: Ejercicios avanzados de alta disponibilidad y redundancia
---

# 📝 Boletín UD12 — Avanzado

> Ejercicios que requieren diseñar y diagnosticar arquitecturas redundantes. En los difíciles tienes pista.

---

## 1. Diseño jerárquico completo

Empresa con: 2 routers de borde (R1, R2), 2 switches de distribución (D1, D2), 4 switches de acceso (A1-A4). Cada switch de acceso se conecta a ambos de distribución. VLANs 10 (usuarios) y 20 (servidores).

a) ¿Dónde aplicas cada mecanismo: STP, EtherChannel, HSRP, routing?
b) ¿Qué pasa si cae D1? Detalla capa 2 y capa 3.
c) ¿Qué SPOFs quedan si el "pool" de servidores tiene una sola tarjeta de red por servidor?

**Pica:** piensa por capas: capa 2 (STP/EtherChannel), capa 3 gateway (FHRP), capa 3 salida (routing/ISP).

## 2. HSRP con preempt y tracking

Configura R1 y R2 para la VLAN 10 (192.168.10.0/24):

- IP virtual: 192.168.10.1
- R1 activo (priority 110), R2 en espera (priority 100)
- Preempt en R1
- R1 debe ceder el rol si su interfaz WAN cae (tracking con decremento 20)

a) Escribe la configuración de ambos.
b) ¿Qué pasa si cae la WAN de R1? ¿Y si se recupera?
c) ¿Por qué sin `preempt`, tras recuperarse R1, seguiría R2 de activo?

## 3. Diagnóstico de un EtherChannel roto

Un port-channel entre SW1 y SW2 no sube. Config de SW1: `channel-group 1 mode on` en Fa0/1-2. Config de SW2: `channel-group 1 mode desirable` en Fa0/1-2.

a) ¿Por qué falla la negociación?
b) ¿Qué combinaciones `on/desirable/auto/active/passive` funcionan entre sí?
c) ¿Qué comando usarías para ver el estado y por qué?

**Pista:** `mode on` no negocia nada; LACP es `active/passive`, PAgP es `desirable/auto`.

## 4. Bucle de capa 2 en producción

Lunes 8:15: la red del centro se satura. Un becario conectó un cable entre dos switches de acceso "para probar". STP: RSTP en todos los switches.

a) ¿Por qué RSTP no bloqueó el bucle al instante?
b) ¿Qué otros mecanismos complementan a STP contra esto? (pista: funciones de puerto de acceso)
c) ¿Qué configuración prevents en los puertos de acceso para la próxima vez?

## 5. Cálculo de costes y failover

Topología: SW1(raíz) — SW2 y SW3, y un enlace SW2-SW3. Costes RSTP: 1 Gbps = 4, 100 Mbps = 19.

a) SW2 y SW3 conectados a SW1 por 1 Gbps, y entre ellos por 100 Mbps. ¿Qué puerto bloquea STP y en qué switch?
b) Cae el enlace SW1-SW3. ¿Qué pasa con el puerto bloqueado?
c) ¿Cuánto tarda RSTP en converger aproximadamente, frente a STP clásico?

## 6. Doble nodo con keepalives

Dos firewalls en HA activo/pasivo con su interfaz de heartbeat. El enlace heartbeat se rompe pero ambos firewalls siguen vivos.

a) ¿Qué problema aparece (y cómo se llama)?
b) ¿Qué efectos verían los usuarios?
c) ¿Qué mitiga este problema?

**Pista:** split-brain: dos nodos creyéndose dueños de la IP virtual.

## 7. Stack vs no stack

Un centro duda entre 2 switches apilados (stack) o 2 switches independientes con STP y HSRP en los routers.

a) ¿Qué ventaja tiene el stack para el gateway (con SVIs) frente a 2 switches independientes?
b) ¿Qué pasa con el stack si falla el cable de stacking o el switch master?
c) ¿Qué riesgo compartido (shared risk) introduce el stack que dos cajas separadas no tienen?

## 8. Plan de continuidad

Un instituto define su plan de continuidad para la red:

- RTO objetivo: 5 minutos
- RPO: no aplica (no es un servicio de datos, es conectividad)
- Componentes: 2 routers (HSRP), 2 switches de distribución (stack), UPS en cada armario, 2 enlaces ISP (uno de respaldo con rutas flotantes)

a) ¿Qué es RTO y por qué 5 minutos es un objetivo exigente pero razonable con esta arquitectura?
b) ¿Qué escenarios cubre bien el plan y cuáles no? (piensa: caída de un router, de un ISP, de un armario eléctrico, de la fibra del campus)
c) ¿Qué prueba harías cada semestre para validar el plan?
