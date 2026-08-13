---
title: Boletín U06 — Avanzado
description: Ejercicios avanzados de Switching y STP
---

# 📝 Boletín U06 — Avanzado

> Ejercicios que requieren aplicar los conceptos de switching y STP de forma más profunda.

---

## 1. Configuración básica de switch

Configura un switch Cisco desde cero con:

a) Hostname: SW-OFICINA-01
b) IP de gestión en VLAN 1: 192.168.1.10/24, gateway 192.168.1.1
c) Puertos Fa0/1-10 como access, seguridad de puerto con máximo 2 MACs
d) Puertos Fa0/11-12 como trunk

Escribe los comandos necesarios.

## 2. Análisis de topología STP

Tienes 3 switches con estas configuraciones:

| Switch | Prioridad | MAC |
|---|---|---|
| Switch A | 32768 | 0011.2233.4400 |
| Switch B | 32768 | 0011.2233.4401 |
| Switch C | 4096 | 0011.2233.4402 |

Los switches están conectados en triángulo (A-B, B-C, C-A).

a) ¿Quién es el Root Bridge? ¿Por qué?
b) ¿Cuántos Root Ports hay en total?
c) ¿Cuántos Designated Ports hay?
d) Si Switch C falla, ¿qué cambios ocurren en la topología?

## 3. Diagnóstico de port security

Un administrador configuró port security en un puerto:

```
Switch(config-if)# switchport port-security maximum 1
Switch(config-if)# switchport port-security violation shutdown
```

Un usuario se conecta con su portátil y funciona. Luego conecta otro portátil (el suyo y el de un compañero) usando un switch no administrado. El puerto se deshabilita.

a) ¿Por qué ocurrió?
b) ¿Qué dos cambios harías en la configuración para permitir esta situación sin perder seguridad?
c) ¿Cómo recuperas el puerto?

## 4. Diseño de red redundante

Diseña una red con 4 switches (SW1, SW2, SW3, SW4) y 2 enlaces redundantes entre cada par. Debe tener:

- 50 PCs distribuidos
- Redundancia: si cualquier switch o enlace individual falla, la red sigue funcionando
- STP activo

a) Dibuja la topología conceptual
b) ¿Cuántos puertos quedarán bloqueados por STP?
c) ¿Qué prioridad asignarías para forzar a SW1 como Root Bridge?
d) ¿Qué pasa si SW1 falla? ¿Cuánto tarda la red en recuperarse con STP? ¿Y con RSTP?

## 5. CAM table analysis

Observa esta tabla MAC:

```
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
   1    0050.7966.6800    DYNAMIC     Fa0/1
   1    0050.7966.6801    DYNAMIC     Fa0/2
   1    0050.7966.6802    DYNAMIC     Fa0/3
   1    00D0.BC96.1A01    DYNAMIC     Fa0/4
   1    00D0.BC96.1A02    DYNAMIC     Fa0/4
   1    FFFF.FFFF.FFFF    STATIC     CPU
```

a) ¿Cuántos dispositivos hay conectados al puerto Fa0/4? ¿Cómo lo sabes?
b) ¿Cuántos puertos del switch tienen dispositivos conectados?
c) La entrada FFFF.FFFF.FFFF en la CPU: ¿qué es?
d) Si llega una trama con destino 00D0.BC96.1A03, ¿qué hace el switch?

## 6. STP: cálculo de costes

Tienes esta topología STP:

- Switch A (Root Bridge)
- Switch B conectado a A por Fa0/1 (coste 19)
- Switch C conectado a B por Fa0/2 (coste 19)
- Switch C también conectado a A por Fa0/3 (coste 19)

a) ¿Cuál es el Root Port de Switch C?
b) ¿Qué coste tiene cada camino hacia el Root?
c) ¿Cuál es el Alternate Port de Switch C?
d) Si el coste de Fa0/3 se cambia a 4, ¿qué cambia?

## 7. Topología STP/RSTP bajo análisis

Tienes 4 switches con estas configuraciones:

| Switch | Prioridad | MAC |
|---|---|---|
| SW1 | 4096 | 0011.2233.4400 |
| SW2 | 32768 | 0011.2233.4401 |
| SW3 | 32768 | 0011.2233.4402 |
| SW4 | 32768 | 0011.2233.4403 |

Conexiones (todas de coste 19):
- SW1-SW2, SW1-SW3 y SW1-SW4 (enlace directo al Root)
- SW2-SW3 (enlace redundante que cierra el bucle)

a) ¿Quién es el Root Bridge y por qué?
b) ¿Qué puertos quedan en estado Blocking/Discarding?
c) ¿Cuántos Root Ports hay en total?
d) Con RSTP, ¿cuánto tardaría la red en converger si SW1 se cae? ¿Y con STP clásico?
e) ¿Qué papel juegan los puertos del Root Bridge?

**Pista:** el Root Bridge es el de menor Bridge ID; todos sus puertos son Designated. Los switches no-root tienen 1 Root Port cada uno, y el enlace redundante SW2-SW3 crea un Alternate Port en el extremo con mayor coste acumulado hacia el Root.

## 8. Laboratorio: Port Security en la sala de profesores

Configura el puerto Fa0/24 del switch (donde se enchufa el PC de la sala de profesores) para que:

a) Solo permita 1 MAC aprendida automáticamente y permanente (sticky).
b) Si aparece una segunda MAC, el puerto se deshabilite (violación shutdown).
c) Escribe los comandos completos y verifica con el comando de comprobación adecuado.

Después, un profe desenchufa su PC y conecta su portátil personal. El puerto entra en errdisable.

d) ¿Por qué ha ocurrido la violación si solo hay UN dispositivo conectado?
e) ¿Qué dos comandos ejecutarías para recuperar el puerto?
f) ¿Cómo evitarías el problema sin perder seguridad (piensa en el envejecimiento de la MAC sticky)?

**Pista:** la MAC sticky NO caduca aunque el PC se desenchufe; si cambias de equipo, hay dos MACs distintas "conocidas" en el puerto y se supera el máximo. Para recuperar errdisable: `shutdown` + `no shutdown`. Para expirar la sticky cuando el dispositivo se desenchufa, configura el envejecimiento de la port security (`switchport port-security aging`).