---
title: Boletín U01 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de Fundamentos de Redes
---

# ✅ Boletín U01 — Avanzado (Resuelto)

---

## 1. Diagnóstico de red

PC-A funciona con PC-B (misma red), pero no con 8.8.8.8 (Internet).

**Causas probables (por orden de probabilidad):**
1. El **gateway por defecto** de PC-A no está configurado o es incorrecto. PC-A necesita saber que 192.168.1.1 es su puerta de enlace.
2. El **router** no tiene ruta a Internet o no tiene NAT configurado.
3. El router no tiene acceso a Internet (problema del ISP).

**Más probable:** El gateway de PC-A no está configurado.

## 2. Diseño de red mínima

**Dispositivos:**
- 1 switch de 24 puertos (para 15 PCs + 2 impresoras + 1 servidor + 1 enlace al router)
- 1 router para acceso a Internet
- 19 cables UTP

**Direccionamiento:**
- Red privada: 192.168.0.0/24
- Router: 192.168.0.1 (gateway)
- Servidor: 192.168.0.2
- Impresoras: 192.168.0.3 - 192.168.0.4
- PCs: 192.168.0.10 - 192.168.0.24 (DHCP)
- Máscara: 255.255.255.0

## 3. ¿Cuántos dominios?

**Dominios de colisión:** Cada puerto de switch es un dominio de colisión independiente. Tenemos 3 switches con 1 PC cada uno + enlaces entre switches. Total: 3 (PCs) + 2 (enlaces) = 5 dominios de colisión.

**Dominios de broadcast:** Los switches no segmentan broadcast. Un solo dominio de broadcast para toda la red. Total: **1 dominio de broadcast.**

## 4. ARP en acción

a) **ARP Request** (broadcast)
b) **FF:FF:FF:FF:FF:FF** (broadcast MAC)
c) **PC-B** responde con un **ARP Reply unicast** (direccionado directamente a PC-A)
d) La respuesta contiene: "La IP 10.0.0.2 tiene la MAC BB:BB:BB:BB:BB:BB"

## 5. Diferencia práctica

- **Hub:** Red doméstica de los 90 con 3 PCs y impresora compartida. Barato pero ineficiente. Hoy en día: no lo uses.
- **Switch:** Oficina actual con 20 PCs. Cada PC tiene su ancho de banda dedicado. Rendimiento óptimo.
- **Router:** Conectar la oficina (192.168.1.0/24) con la sede central (10.0.0.0/16). El router decide la ruta óptima.

## 6. Verdadero o falso

a) **Verdadero.** Es la función principal del router.
b) **Falso.** El switch no entiende de IPs. Solo trabaja con MACs en la misma red.
c) **Verdadero.** En bus, si el cable principal se rompe, la red se divide en segmentos aislados.
d) **Verdadero.** En estrella, el switch es el punto central. Sin él, no hay comunicación.
e) **Falso.** La MAC es permanente (grabada en hardware). La IP puede cambiar (DHCP). Ejemplo: tu portátil tiene la misma MAC en casa y en el trabajo, pero IP diferente.
