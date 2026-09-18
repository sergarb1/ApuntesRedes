---
title: Boletín UD12 — Avanzado (Resuelto)
description: Soluciones de los ejercicios avanzados de alta disponibilidad y redundancia
---

# ✅ Boletín UD12 — Avanzado (Resuelto)

---

## 1. Diseño jerárquico completo

a) **Capa 2:** STP (RSTP) en A1-A4 y D1/D2; EtherChannel en los enlaces A↔D si hay varios cables por pareja. **Capa 3 gateway:** HSRP en D1/D2 (o en los routers si el gateway está ahí) para las SVIs de las VLANs 10 y 20. **Capa 3 salida:** rutas estáticas/OSPF + HSRP o routing dinámico entre R1/R2 y D1/D2; dos ISPs con rutas flotantes si hay doble borde.

b) Si cae D1: **capa 2** — STP desbloquea los puertos de reserva y los A1-A4 reconvergen hacia D2 (segundos con RSTP). **Capa 3** — HSRP: el router/switch en espera toma la IP virtual de las VLANs; los PCs no tocan su config. Puede bajar el ancho de banda disponible, pero el servicio sigue.

c) Queda el **SPOF por servidor**: si el servidor cae o su única NIC muere, el servicio cae aunque la red sea redundante. La alta disponibilidad de la red no cubre la HA del servidor: para eso, clústeres/balanceo (o al menos NIC teaming).

## 2. HSRP con preempt y tracking

a)
```bash
! R1
interface g0/0
 standby version 2
 standby 10 ip 192.168.10.1
 standby 10 priority 110
 standby 10 preempt
 standby 10 track g0/1 20   ! g0/1 = WAN

! R2
interface g0/0
 standby version 2
 standby 10 ip 192.168.10.1
 standby 10 preempt
```

b) Si cae la WAN de R1: su prioridad baja de 110 a 90, por debajo de R2 (100). Con preempt en R2, este toma el rol activo y asume la IP virtual. Si se recupera la WAN, R1 vuelve a 110 y, con preempt, recupera el activo.

c) Sin `preempt`, R2 sigue activo aunque R1 vuelva con prioridad mayor: HSRP solo cede el rol si el activo actual muere o baja su prioridad por debajo del otro **con preempt configurado en el que quiere volver**. Sin preempt, el failback no es automático (a veces es incluso deseable, para evitar flaps).

## 3. Diagnóstico de un EtherChannel roto

a) Porque `mode on` **no negocia** PAgP ni LACP, y `desirable` usa **PAgP**. Un extremo mudo y el otro hablando PAgP: el canal no se forma y los puertos quedan como enlaces normales (o err-disable por inconsistencia).

b) Combinaciones válidas:
- **PAgP:** desirable–desirable, desirable–auto
- **LACP:** active–active, active–passive
- **on–on** (sin negociación, ambos extremos)

c)
```bash
show etherchannel summary
```
Muestra el grupo, el protocolo, los puertos miembro y su estado (P = bundled, I = independent, D = down, s = suspended). Complementa con `show interfaces port-channel 1`.

## 4. Bucle de capa 2 en producción

a) RSTP sí converge rápido, pero el bucle se forma **antes** de que STP termine de elegir: hay unos segundos de tormenta (y si el cable se enchufa en puertos con `portfast`, el BPDU que llega puede no ser procesado a tiempo).

b) **BPDU Guard** (tumba el puerto si llega un BPDU donde no debe), **Bridge Assurance**, storm control y guardias de raíz.

c) En cada puerto de acceso:
```bash
spanning-tree portfast
spanning-tree bpduguard enable
```
Y a nivel global: `spanning-tree portfast bpduguard default`. Con BPDU Guard, el cable del becario tumba el puerto en lugar de crear el bucle.

## 5. Cálculo de costes y failover

a) Bloquea **SW3** en el enlace SW2-SW3: SW3 ya tiene su puerto raíz hacia SW1 (coste 4); por el enlace SW2-SW3 (100 Mbps, coste 19) llegaría peor. SW3 elige el puerto designado de SW2 y SW3 pone el suyo en alternativo (bloqueado).

b) Cae el enlace SW1-SW3: SW3 pierde su puerto raíz; su puerto alternativo por SW2 pasa inmediatamente a raíz (con RSTP, casi instantáneo, sin esperar timers).

c) **RSTP converge en segundos** (hanza shakeProposal/agreement, sin esperar 30-50 s de listening/learning del STP clásico 802.1D).

## 6. Doble nodo con keepalives

a) **Split-brain**: al perder el heartbeat, cada firewall cree que el otro ha muerto. Ambos reclaman la IP virtual y el rol de activo.

b) Tablas ARP/dfg inconsistentes, tráfico por el nodo " equivocado", sesiones partidas, IPs duplicadas en la red y corte intermitente del servicio.

c) Un **canal de heartbeats redundante** (dos interfaces dedicadas), monitorizar el estado con el sistema de HA del fabricante, y mecanismos tipo "quórum" o control de enlace WAN (que el failover dependa también de comprobar la salida, no solo el heartbeat).

## 7. Stack vs no stack

a) Con **stack**, los dos switches son una sola entidad de capa 2 y 3: las SVIs y el gateway viven en el "switch" lógico, sin FHRP (no hace falta HSRP: no hay dos gateway), convergencia instantánea ante fallo de miembro y una sola config.

b) Si el master cae, un miembro asume (el stack se reconfigura, segundos). Si cae el cable de stacking completo, el stack se parte (split) y hay IPs duplicadas: por eso los stacks modernos usan enlaces de stacking redundantes (anillo) o mecanismos de split detection (como VSS/MLAG/iStack dual-active detection).

c) El **riesgo compartido**: software bug, actualización o config errónea afecta a "una" caja que en realidad son dos. Con dos switches independientes, un error de config en uno no arrastra al otro (aunque tampoco compartes la simplicidad de gestión del stack).

## 8. Plan de continuidad

a) **RTO** (Recovery Time Objective) es el tiempo máximo aceptable de servicio caído. 5 minutos es exigente porque la conmutación automática (HSRP/RSTP/rutas flotantes) debe ser en segundos y sin intervención humana; los 5 minutos cubren la detección + failover + verificación.

b) **Cubre bien:** caída de un router (HSRP), de un ISP (rutas flotantes), de un miembro del stack, de un enlace de acceso (STP/EtherChannel), corte eléctrico corto (UPS). **No cubre:** caída del armario completo (los dos routers/switches juntos si están en el mismo armario), rotura de la fibra del campus si ambos ISP comparten camino físico, errores de config masivos, y ataques. Lecciones: diversidad física y de camino de los ISP, y separar los nodos redundantes en armarios distintos.

c) Prueba semestral: **simular la caída de cada componente en ventana de mantenimiento** (desenchufar router activo, apagar ISP primario, tirar un miembro del stack) midiendo el tiempo real de corte y comparándolo con el RTO. Documentar el resultado y actualizar el plan.