---
title: Boletín de Switching y VLAN — Avanzado
description: Ejercicios avanzados de Switching, STP y VLAN
---

# 📝 Boletín de Switching y VLAN — Avanzado

> Ejercicios que requieren aplicar los conceptos de switching, STP y VLAN de forma más profunda.

---

## 1. Configuración básica de switch

Configura un switch Cisco desde cero con:

a) Hostname: SW-OFICINA-01
b) VLAN de gestión 999 con SVI y dirección 192.168.99.10/24, gateway 192.168.99.1
c) VLAN 10 (Ventas) y VLAN 20 (RRHH); puertos Fa0/1-10 en la VLAN 10 y Fa0/11-12 en la VLAN 20
d) Verificación: ¿qué comando confirma que las VLANs existen y que los puertos están asignados?

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

## 3. Diagnóstico de VLAN

En una oficina montan VLANs por primera vez en un switch de 24 puertos: VLAN 10 para Ventas (Fa0/1-12) y VLAN 20 para RRHH (Fa0/13-24). Al terminar, los equipos de RRHH funcionan, pero el PC de Ana, enchufado en Fa0/9 (debería ser Ventas), no obtiene IP por DHCP ni ve al resto de Ventas; su compañero, en Fa0/10, sí funciona.

a) ¿Qué comando miras primero para comprobar en qué VLAN está el puerto de Ana?
b) ¿Cuál es la causa más probable? ¿Cómo la confirmas?
c) ¿Cómo lo arreglas? ¿Y por qué falla también el DHCP?
d) Si cada semana se reorganizan las mesas, ¿qué buena práctica te ahorra repetir el diagnóstico?

**Pista:** la VLAN decide el dominio de broadcast; si el puerto no está en la suya, el equipo queda fuera de casa.

## 4. Diseño de red redundante

Diseña la red de una oficina con 4 switches (SW1, SW2, SW3, SW4) y 50 PCs, con esta topología y STP activo:

- Anillo: SW1–SW2–SW3–SW4–SW1
- Enlace extra directo entre SW1 y SW3
- Requisito: si falla un enlace o un switch individual, la red sigue funcionando

a) Dibuja la topología conceptual y marca qué puertos bloqueará STP
b) ¿Cuántos puertos quedarán bloqueados? Razona la respuesta
c) ¿Qué prioridad asignarías para forzar a SW1 como Root Bridge?
d) ¿Qué pasa si SW1 falla? ¿Cuánto tarda la red en recuperarse con STP? ¿Y con RSTP?

## 5. Análisis de la tabla CAM

Observa esta tabla MAC:

```
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
   1    0050.7966.6800    DYNAMIC     Fa0/1
   1    0050.7966.6801    DYNAMIC     Fa0/2
   1    0050.7966.6802    DYNAMIC     Fa0/3
   1    00D0.BC96.1A01    DYNAMIC     Fa0/4
   1    00D0.BC96.1A02    DYNAMIC     Fa0/4
```

a) ¿Cuántos dispositivos hay conectados al puerto Fa0/4? ¿Cómo lo sabes?
b) ¿Cuántos puertos del switch tienen dispositivos conectados?
c) ¿Aparece la dirección de broadcast `FFFF.FFFF.FFFF` en la tabla? Si no aparece, ¿qué hace el switch con un broadcast?
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

## 8. Laboratorio: segmentación en un switch

Monta esto en un switch (o en Packet Tracer): tres PCs con IPs de la misma subred (192.168.10.0/24): PC1 en Fa0/1, PC2 en Fa0/2 y PC3 en Fa0/9.

a) Crea la VLAN 10 (Ventas) y la VLAN 20 (RRHH); asigna Fa0/1-8 a la VLAN 10 y Fa0/9-16 a la VLAN 20.
b) Verifica con `show vlan brief`: ¿en qué VLAN aparecen los tres puertos? ¿Y la MAC de PC1 en `show mac address-table`?
c) Prueba ping de PC1 → PC2 y de PC1 → PC3. ¿Cuál funciona? ¿Es un fallo el que no funcione? ¿Por qué?
d) Sin tocar las IPs, mueve Fa0/9 a la VLAN 10 y repite el ping PC1 → PC3. ¿Ahora va? ¿Qué conclusión sacas sobre lo que hace una VLAN?
e) Un compañero insiste: "si están en la misma red IP, se verán aunque estén en VLANs distintas". ¿Le crees? ¿Qué le respondes?

**Pista:** la VLAN manda antes que la IP: en capa 2 el switch decide qué puertos hablan entre sí.