---
title: Boletín U05 — Avanzado
description: Ejercicios avanzados de IPv6 y Transición
---

# 📝 Boletín U05 — Avanzado

> Ejercicios que requieren aplicar los conceptos de IPv6, SLAAC y transición de forma más profunda.

---

## 1. Subnetting IPv6

Te asignan el prefijo **2001:DB8:CAFE::/48** para tu empresa. Necesitas crear subredes para:

- Oficina central: /48 completa
- 5 sedes regionales: subredes del mismo tamaño

a) ¿Qué máscara usarías para las sedes?
b) ¿Cuántas subredes /64 puedes crear dentro de /48?
c) Escribe las primeras 3 subredes /64 (con sus prefijos completos)

**Pista:** /48 a /64 = 16 bits de subred = 65536 subredes. Cada subred /64 tiene 2⁶⁴ direcciones.

## 2. EUI-64

Dada la MAC **00:1A:2B:3C:4D:5E**:

a) Genera la dirección EUI-64 correspondiente
b) Si el prefijo es 2001:DB8:1:2::/64, ¿cuál es la dirección IPv6 completa?
c) ¿Qué problema de privacidad tiene EUI-64?

## 3. Diagnóstico IPv6

Un PC tiene esta configuración IPv6:

```
Ethernet adapter Ethernet:
   IPv6 Address: fe80::21a:2bff:fe3c:4d5e%12
   IPv6 Address: 2001:db8:1:2:21a:2bff:fe3c:4d5e
   Default Gateway: fe80::1%12
```

a) ¿Por qué hay dos direcciones IPv6?
b) ¿Qué significa el %12 al final de fe80::1?
c) ¿Puede este PC acceder a Internet? ¿Por qué?
d) ¿Qué comando usarías en Windows para ver esta configuración?

**Pista:** %12 es el Zone ID, identifica la interfaz de red (por si hay varias).

## 4. Diseño de transición

Una empresa tiene:
- 250 empleados en sede central con IPv4 (192.168.0.0/24)
- 50 empleados en sucursal con IPv4 (10.0.0.0/24)
- El ISP ya ofrece IPv6 nativo en ambas ubicaciones
- Necesitan acceder a un servicio cloud que solo tiene IPv4

Diseña la estrategia de transición respondiendo:

a) ¿Qué mecanismo usas en las LANs? ¿Por qué?
b) ¿Cómo conectas ambas sedes?
c) ¿Cómo acceden al servicio cloud solo-IPv4?
d) ¿Qué configuración necesitas en los routers de cada sede?

**Pista:** Dual Stack es la opción recomendada cuando el ISP ofrece IPv6 nativo.

## 5. Análisis de Router Advertisement

Un router envía este RA:

```
Prefix: 2001:DB8:1:2::/64
M Flag: 0
O Flag: 1
```

a) ¿Qué método de asignación de IPs deben usar los clientes?
b) ¿Quién da la IP? ¿Quién da el DNS?
c) Si un cliente solo entiende SLAAC, ¿podrá obtener DNS?
d) ¿Qué cambiaría si M Flag = 1?

**Pista:** M Flag = Managed (DHCPv6 stateful), O Flag = Other (DHCPv6 stateless).

## 6. NDP en acción

Un PC con IPv6 2001:DB8::10/64 quiere comunicarse con 2001:DB8::20/64 en la misma red. La tabla de vecinos está vacía.

a) ¿Qué mensaje ICMPv6 envía primero el PC?
b) ¿A qué dirección MAC destino?
c) ¿Qué dirección IPv6 destino usa? (unicast, multicast, broadcast)
d) ¿Quién responde y con qué?
e) ¿Cómo se llama este proceso en IPv6?

**Pista:** En IPv6 no hay ARP. El proceso equivalente es parte de NDP y usa una dirección multicast especial derivada de la IP destino (solicited-node multicast).
