---
title: Boletín de Switching y VLAN — Avanzado (Resuelto)
description: Soluciones de los ejercicios avanzados de Switching, STP y VLAN
---

# ✅ Boletín de Switching y VLAN — Avanzado (Resuelto)

---

## 1. Configuración básica de switch

```bash
Switch> enable
Switch# configure terminal
Switch(config)# hostname SW-OFICINA-01

SW-OFICINA-01(config)# vlan 10
SW-OFICINA-01(config-vlan)# name Ventas
SW-OFICINA-01(config-vlan)# exit
SW-OFICINA-01(config)# vlan 20
SW-OFICINA-01(config-vlan)# name RRHH
SW-OFICINA-01(config-vlan)# exit
SW-OFICINA-01(config)# vlan 999
SW-OFICINA-01(config-vlan)# name Gestion
SW-OFICINA-01(config-vlan)# exit

SW-OFICINA-01(config)# interface range fa0/1-10
SW-OFICINA-01(config-if-range)# switchport mode access
SW-OFICINA-01(config-if-range)# switchport access vlan 10
SW-OFICINA-01(config-if-range)# exit
SW-OFICINA-01(config)# interface range fa0/11-12
SW-OFICINA-01(config-if-range)# switchport mode access
SW-OFICINA-01(config-if-range)# switchport access vlan 20
SW-OFICINA-01(config-if-range)# exit

SW-OFICINA-01(config)# interface vlan 999
SW-OFICINA-01(config-if)# ip address 192.168.99.10 255.255.255.0
SW-OFICINA-01(config-if)# no shutdown
SW-OFICINA-01(config-if)# exit
SW-OFICINA-01(config)# ip default-gateway 192.168.99.1
```

d) `show vlan brief` — lista las VLANs 10, 20 y 999 y qué puertos tiene asignados cada una.

## 2. Análisis de topología STP

a) **Root Bridge: Switch C.** Prioridad 4096 (la más baja). Aunque Switch A y B tienen MACs más bajas, la prioridad de Switch C (4096) es mucho menor que 32768.

b) **Root Ports:** Cada switch no-root tiene 1 Root Port. Como hay 3 switches y Switch C es Root, Switches A y B tienen 1 Root Port cada uno = **2 Root Ports** total.

c) **Designated Ports:** 1 por segmento. Hay 3 segmentos (A-B, B-C, C-A) → **3 Designated Ports** (todos los puertos del Root Bridge y el puerto del segmento con mejor coste hacia el Root).

d) Si **Switch C falla**:
   - Switches A y B pierden su Root Bridge
   - Se inicia una nueva elección. Con la misma prioridad (32768), gana Switch A (MAC más baja)
   - Los puertos necesarios pasan por listening y learning antes de reenviar (los que estaban bloqueados esperan además a que se resuelva la topología)
   - Convergencia: ~30-50 segundos con STP, ~1-3 segundos con RSTP

## 3. Diagnóstico de VLAN

a) `show vlan brief` — lista todas las VLANs del switch y los puertos de cada una. (También sirve `show interfaces fa0/9 switchport` si quieres mirar solo ese puerto.)

b) El puerto Fa0/9 **no se asignó a la VLAN 10** (se quedó en la VLAN 1 de fábrica). Se confirma con `show vlan brief`: Fa0/9 aparece listado en la VLAN 1, mientras Fa0/10 aparece en la VLAN 10.

c)

```bash
Switch(config)# interface fa0/9
Switch(config-if)# switchport access vlan 10
```

El DHCP fallaba porque el DISCOVER de Ana es un broadcast y se queda en la VLAN 1: no llega al dominio de broadcast de la VLAN 10, donde están el resto de Ventas y su servidor DHCP.

d) Etiquetar físicamente los puertos y los cables (VLAN 10 / VLAN 20) y mantener el mismo reparto de rangos en todos los switches: lo que no está etiquetado se olvida.

## 4. Diseño de red redundante

a) **Topología:** anillo con diagonal. Enlaces SW1–SW2, SW2–SW3, SW3–SW4, SW4–SW1 y SW1–SW3 (5 enlaces en total). STP deja activos solo los enlaces de un árbol que conecte los 4 switches y bloquea el resto.

b) **2 puertos bloqueados.** Para conectar 4 switches sin bucles hacen falta 3 enlaces activos (n − 1 = 3); hay 5, así que STP bloquea 2 (uno por cada enlace sobrante). Cuáles exactos dependen del Root Bridge y de los costes, pero el número es siempre 2.

c) `spanning-tree vlan 1 priority 4096` (la prioridad debe ser múltiplo de 4096; con 4096 le gana a los 32768 por defecto).

d) **Sí, la red sigue conectada:** al caer SW1 desaparecen sus tres enlaces (SW1–SW2, SW4–SW1 y SW1–SW3), pero quedan SW2–SW3 y SW3–SW4, que encadenan a los tres switches supervivientes (SW2 → SW3 → SW4).
   - **Con STP:** ~30-50 segundos de convergencia
   - **Con RSTP:** ~1-3 segundos

## 5. Análisis de la tabla CAM

a) **Dos dispositivos** en Fa0/4: 00D0.BC96.1A01 y 00D0.BC96.1A02. La tabla muestra ambas MACs en el mismo puerto.

b) **4 puertos** con dispositivos: Fa0/1, Fa0/2, Fa0/3 y Fa0/4.

c) **No aparece.** La dirección de broadcast no se aprende en la tabla (no es la MAC de ningún equipo): el switch inunda el broadcast por todos los puertos del VLAN por definición.

d) **Si llega una trama con destino 00D0.BC96.1A03:** Es una MAC desconocida (no está en la tabla). El switch **inunda** la trama por todos los puertos excepto el de origen.

## 6. STP: cálculo de costes

a) **Root Port de Switch C:** Depende del coste acumulado hacia el Root Bridge.

   **Camino C → A directo (Fa0/3):** coste = 19
   **Camino C → B → A (Fa0/2 → Fa0/1):** coste = 19 + 19 = 38

   Fa0/3 tiene **menor coste total** (19 < 38), así que **Fa0/3 es el Root Port**.

b) **Costes:** C→A directo = 19. C→B→A = 38.

c) **Alternate Port:** Fa0/2 (el puerto del camino más caro que queda en discarding como respaldo).

d) **Si el coste de Fa0/3 se cambia a 4:** El coste total por Fa0/3 baja a 4, reforzando aún más que Fa0/3 sea el Root Port. Si en cambio el coste de Fa0/3 subiera a 100, entonces el Root Port pasaría a ser el del camino C→B→A (coste 38 < 100).

## 7. Topología STP/RSTP bajo análisis

a) **Root Bridge: SW1.** Prioridad 4096, muy por debajo de los 32768 de los demás. No hace falta desempate por MAC.

b) **Puerto en estado Discarding:** el enlace redundante **SW2-SW3**. Concretamente, el puerto de SW3 hacia SW2 (el extremo con mayor coste acumulado hacia el Root, que queda como **Alternate Port**). Los enlaces directos SW1-SW2, SW1-SW3 y SW1-SW4 son Designated (todos los puertos del Root).

c) **3 Root Ports**: SW2, SW3 y SW4 son switches no-root, cada uno con su Root Port hacia SW1 (por su enlace directo de coste 19).

d) **Con RSTP:** la red converge en **1-3 segundos** (handshake propuesta/acuerdo). **Con STP clásico:** **30-50 segundos** (esperando temporizadores).

e) Los puertos del Root Bridge son todos **Designated**: son el "punto de referencia" del árbol y nunca se bloquean.

## 8. Laboratorio: segmentación en un switch

a)

```bash
Switch(config)# vlan 10
Switch(config-vlan)# name Ventas
Switch(config-vlan)# exit
Switch(config)# vlan 20
Switch(config-vlan)# name RRHH
Switch(config-vlan)# exit
Switch(config)# interface range fa0/1-8
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 10
Switch(config-if-range)# exit
Switch(config)# interface range fa0/9-16
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 20
```

b) `show vlan brief` → Fa0/1 y Fa0/2 en la VLAN 10, Fa0/9 en la VLAN 20. En `show mac address-table` la MAC de PC1 aparece en la columna Vlan con el valor 10.

c) PC1 → PC2 **funciona** (misma VLAN y misma subred). PC1 → PC3 **no funciona**, y no es un fallo: aunque compartan subred IP, el switch no reenvía tramas entre VLAN distintas.

d) Tras `switchport access vlan 10` en Fa0/9, el ping PC1 → PC3 **funciona**: los tres quedan en el mismo dominio de broadcast. Una VLAN decide quién se habla en capa 2; la IP no salva la conversación si la VLAN los separa.

e) No: la subred IP no cruza el aislamiento de capa 2. Para que VLANs distintas se comuniquen hace falta un router (o un switch de capa 3) entre ellas — el siguiente paso del curso, en trunking e inter-VLAN.