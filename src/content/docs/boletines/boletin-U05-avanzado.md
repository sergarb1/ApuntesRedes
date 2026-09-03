---
title: Boletín U05 — Avanzado
description: Ejercicios avanzados de IPv4 y Subnetting
---

# 📝 Boletín U05 — Avanzado

> Ejercicios que requieren aplicar subnetting, VLSM y DHCP de forma más profunda.

---

## 1. Diseño VLSM

Te dan la red **172.16.0.0/24**. Debes diseñar el direccionamiento para:

- **Producción:** 60 hosts
- **Desarrollo:** 30 hosts
- **Testing:** 10 hosts
- **Enlaces WAN:** 3 enlaces punto a punto (2 IPs cada uno)

a) Diseña el VLSM con el mínimo desperdicio de direcciones.
b) Indica la red, máscara, rango de hosts y broadcast para cada subred.
c) ¿Cuántas IPs sobran?

**Pista:** Ordena de mayor a menor necesidad. Recuerda que los enlaces /30 solo necesitan 2 hosts.

## 2. Diagnóstico DHCP

Un usuario no puede conectarse a Internet. Su configuración IP es:

```
IPv4: 169.254.15.33
Máscara: 255.255.0.0
Gateway: (vacío)
DNS: (vacío)
```

a) ¿Qué tipo de dirección es 169.254.15.33?
b) ¿Por qué tiene esa IP?
c) ¿Qué solución propones?

**Pista:** 169.254.0.0/16 es APIPA (Automatic Private IP Addressing). Windows asigna esta IP cuando el servidor DHCP no responde.

## 3. Subnetting binario

Dada la IP 200.100.50.30 con máscara 255.255.255.224 (/27):

a) Escribe la IP y la máscara en binario
b) Calcula la dirección de red (AND)
c) ¿Cuál es la dirección de broadcast?
d) ¿Cuántos hosts útiles tiene esta subred?
e) ¿La IP 200.100.50.62 está en la misma subred? ¿Por qué?

## 4. Resumen de subredes

Tienes 10.0.0.0/16. Necesitas crear 8 subredes del mismo tamaño.

a) ¿Cuántos bits debes pedir prestados?
b) ¿Cuál es la nueva máscara?
c) ¿Cuántos hosts por subred?
d) Enumera las 8 direcciones de red resultantes

## 5. Sumarización de rutas

Tienes estas 4 subredes:
- 192.168.0.0/24
- 192.168.1.0/24
- 192.168.2.0/24
- 192.168.3.0/24

a) ¿Puedes resumirlas en una sola ruta? ¿Cuál?
b) ¿Qué máscara tendría la ruta resumida?
c) ¿Cuántas IPs totales abarca la ruta resumida?

**Pista:** Mira los bits en común. Las 4 redes comparten los primeros 22 bits.

## 6. Plan de direccionamiento para una empresa

Diseña un plan completo para una empresa con:

**Sede central:**
- 200 hosts en Administración
- 100 hosts en Producción
- 50 hosts en IT
- 10 hosts en Dirección

**Sucursal:**
- 50 hosts en Ventas
- 20 hosts en Almacén

**Enlaces:**
- 1 enlace /30 entre sede y sucursal

Te dan la red **10.0.0.0/22**.

a) Diseña el VLSM completo
b) ¿Cuántas IPs sobran?
c) ¿Qué problemas podrías encontrar si la empresa crece al doble?

## 7. VLSM con requisitos mínimos

Tienes la red **192.168.1.0/24** y necesitas estas subredes:

- **Producción:** 50 hosts
- **Comercial:** 25 hosts
- **Soporte:** 10 hosts
- **Enlace WAN:** 2 hosts

a) Diseña el **VLSM mínimo** (sin desperdiciar IPs): indica red, máscara, rango y broadcast de cada subred.
b) ¿Qué bloque queda libre al final y de qué tamaño?

**Pista:** Ordena de mayor a menor necesidad y elige para cada subred la máscara más pequeña que cumpla `2ʰ − 2 ≥ hosts`. Recuerda que cada subred empieza donde terminó la anterior.

## 8. Conflicto de IP

El administrador de una empresa configura **manual (estática)** la IP `192.168.1.20` en una impresora. Lamentablemente, esa IP está dentro del **pool DHCP** que reparte el router (`network 192.168.1.0 255.255.255.0`).

a) Explica qué ocurre cuando un PC pide IP por DHCP y recibe `192.168.1.20`, que ya tiene la impresora.
b) ¿Cómo detectaría el administrador el conflicto? ¿Qué comando usaría en el router?
c) ¿Cómo se **previene** este problema desde el diseño?

**Pista:** Antes de conceder una IP, el servidor DHCP suele comprobar (el RFC lo llama "ping") si la dirección ya está en uso. En Cisco el resultado se registra en una tabla concreta que se consulta con `show`. Y la solución de fondo ya la viste en el punto 8 de la unidad: `ip dhcp excluded-address`.
