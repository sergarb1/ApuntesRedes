---
title: Boletín U06 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de Switching y STP
---

# ✅ Boletín U06 — Avanzado (Resuelto)

---

## 1. Configuración básica de switch

```bash
Switch> enable
Switch# configure terminal
Switch(config)# hostname SW-OFICINA-01
SW-OFICINA-01(config)# interface vlan 1
SW-OFICINA-01(config-if)# ip address 192.168.1.10 255.255.255.0
SW-OFICINA-01(config-if)# no shutdown
SW-OFICINA-01(config-if)# exit
SW-OFICINA-01(config)# ip default-gateway 192.168.1.1

SW-OFICINA-01(config)# interface range fa0/1-10
SW-OFICINA-01(config-if-range)# switchport mode access
SW-OFICINA-01(config-if-range)# switchport port-security
SW-OFICINA-01(config-if-range)# switchport port-security maximum 2
SW-OFICINA-01(config-if-range)# switchport port-security mac-address sticky
SW-OFICINA-01(config-if-range)# switchport port-security violation shutdown
SW-OFICINA-01(config-if-range)# exit

SW-OFICINA-01(config)# interface range fa0/11-12
SW-OFICINA-01(config-if-range)# switchport mode trunk
SW-OFICINA-01(config-if-range)# exit
```

## 2. Análisis de topología STP

a) **Root Bridge: Switch C.** Prioridad 4096 (la más baja). Aunque Switch A y B tienen MACs más bajas, la prioridad de Switch C (4096) es mucho menor que 32768.

b) **Root Ports:** Cada switch no-root tiene 1 Root Port. Como hay 3 switches y Switch C es Root, Switches A y B tienen 1 Root Port cada uno = **2 Root Ports** total.

c) **Designated Ports:** 1 por segmento. Hay 3 segmentos (A-B, B-C, C-A) → **3 Designated Ports** (todos los puertos del Root Bridge y el puerto del segmento con mejor coste hacia el Root).

d) Si **Switch C falla**:
   - Switches A y B pierden su Root Bridge
   - Se inicia una nueva elección. Con la misma prioridad (32768), gana Switch A (MAC más baja)
   - Todos los puertos pasan por los estados STP (blocking → listening → learning → forwarding)
   - Convergencia: ~50 segundos con STP, ~3 segundos con RSTP

## 3. Diagnóstico de port security

a) **Ocurrió porque** el usuario conectó un switch no administrado. Los PCs de ambos usuarios tienen MACs diferentes, y el switch de red ve más de 1 MAC en el puerto, superando el límite (maximum 1).

b) **Dos cambios:**
   1. Aumentar `maximum` a un valor razonable (ej. 5-10) si es un puerto compartido
   2. Cambiar `violation` a `restrict` (descarta tráfico extra pero no deshabilita el puerto) o `protect` (descarta silenciosamente)

c) **Recuperar el puerto:**
   ```bash
   SW-OFICINA-01(config)# interface fa0/1
   SW-OFICINA-01(config-if)# shutdown
   SW-OFICINA-01(config-if)# no shutdown
   ```
   O configurar `errdisable recovery cause psecure-violation` para recuperación automática.

## 4. Diseño de red redundante

a) **Topología conceptual:** Malla parcial. SW1 (core) conectado a SW2, SW3, SW4. SW2 conectado a SW3 y SW4. Sin bucles directos SW3-SW4 para limitar redundancia.

b) **Puertos bloqueados:** Depende del Root Bridge. Si SW1 es Root, sus puertos son Designated. Los switches no-root tendrán Root Ports y Alternate Ports bloqueados. Con 3 conexiones alternativas por switch, aproximadamente 3 puertos bloqueados.

c) **Prioridad para SW1 como Root:** `spanning-tree vlan 1 priority 4096` (o 0 para forzarlo absolutamente).

d) **Si SW1 falla:**
   - Se elige un nuevo Root Bridge (el de menor Bridge ID entre SW2, SW3, SW4)
   - **Con STP:** ~50 segundos de convergencia
   - **Con RSTP:** ~1-3 segundos

## 5. CAM table analysis

a) **Dos dispositivos** en Fa0/4: 00D0.BC96.1A01 y 00D0.BC96.1A02. La tabla muestra ambas MACs en el mismo puerto.

b) **4 puertos** con dispositivos: Fa0/1, Fa0/2, Fa0/3, Fa0/4.

c) **FFFF.FFFF.FFFF en CPU:** Es la dirección MAC de broadcast. Está en la CPU porque el switch procesa los broadcasts internamente (además de reenviarlos).

d) **Si llega una trama con destino 00D0.BC96.1A03:** Es una MAC desconocida (no está en la tabla). El switch **inunda** la trama por todos los puertos excepto el de origen.

## 6. STP: cálculo de costes

a) **Root Port de Switch C:** Depende del coste acumulado hacia el Root Bridge.

   **Camino A → C directo (Fa0/3):** coste = 19
   **Camino A → B → C (Fa0/1 → Fa0/2):** coste = 19 + 19 = 38

   Fa0/3 tiene **menor coste total** (19 < 38), así que **Fa0/3 es el Root Port**.

b) **Costes:** A→C directo = 19. A→B→C = 38.

c) **Alternate Port:** Fa0/2 (el puerto del camino más caro que queda en discarding como respaldo).

d) **Si el coste de Fa0/3 se cambia a 4:** El coste total por Fa0/3 baja a 4, reforzando aún más que Fa0/3 sea el Root Port. Si en cambio el coste de Fa0/3 subiera a 100, entonces el Root Port pasaría a ser por el camino A→B→C (coste 38 < 100).
