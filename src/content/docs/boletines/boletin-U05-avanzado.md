---
title: Boletín de Trunking e inter-VLAN — Avanzado
description: Ejercicios avanzados de VLANs
---

# 📝 Boletín de Trunking e inter-VLAN — Avanzado

> Ejercicios que requieren aplicar los conceptos de VLANs, trunks y routing de forma más profunda. En los difíciles tienes pista.

---

## 1. Configuración completa de VLANs

Configura este escenario en Packet Tracer (o describe los comandos):

- **Switch1:** VLAN 10 (Ventas) puertos 1-5, VLAN 20 (RRHH) puertos 6-10
- **Switch2:** VLAN 10 puertos 1-5, VLAN 20 puertos 6-10
- **Trunk:** Switch1 Fa0/24 ↔ Switch2 Fa0/24
- **Router:** Fa0/0 conectado a Switch1 Fa0/23, subinterfaces para VLAN 10 y 20

Escribe la configuración completa del router y ambos switches.

## 2. Diagnóstico de native VLAN

Un administrador configura un trunk entre dos switches:

```
Switch1: native VLAN 99, allowed VLANs 10,20,30
Switch2: native VLAN 1,  allowed VLANs 10,20,30
```

a) ¿Qué problemas puede causar esta discrepancia?
b) ¿Qué comando usarías para diagnosticarlo?
c) ¿Cómo arreglarlo sin perder conectividad?

**Pista:** `show interface trunk` muestra la native VLAN de cada extremo.

## 3. Diseño de VLANs corporativas

Diseña la segmentación VLAN para una empresa con:

- **3 plantas:**
  - Planta baja: Recepción (5 PCs) + Sala servidores (10 servidores)
  - Planta 1: Ventas (30 PCs) + Marketing (15 PCs)
  - Planta 2: IT (20 PCs) + Dirección (5 PCs)

- **Requisitos:**
  - Cada departamento debe estar en VLAN separada
  - Los servidores están en VLAN propia
  - IT debe poder acceder a todas las VLANs (administración)
  - Dirección solo accede a su VLAN y a servidores

a) Propón una tabla de VLANs (ID, nombre, puertos)
b) ¿Dónde pones el router-on-a-stick? ¿Y si usas switch capa 3?
c) ¿Qué VLANs permites en cada trunk?
d) ¿Con qué ACLs limitas el acceso de Dirección?

## 4. VTP disaster recovery

Un administrador conecta un switch con VTP server y revision number 500 a una red donde el server actual tiene revision 100. En 2 segundos, todas las VLANs de la red desaparecen.

a) ¿Por qué ocurrió?
b) ¿Cómo recuperas la red?
c) ¿Qué medidas preventivas tomarías para evitar que vuelva a ocurrir?

**Pista:** VTP propaga la base de datos del switch con mayor revision number.

## 5. Router-on-a-stick: cuello de botella

Un router-on-a-stick con interfaz FastEthernet (100 Mbps) atiende 4 VLANs. Cada VLAN genera 30 Mbps de tráfico.

a) ¿Hay cuello de botella? Calcula el tráfico total.
b) ¿Qué alternativa propones si el tráfico crece al doble?
c) ¿Cómo cambia el escenario con una interfaz GigabitEthernet?

## 6. Seguridad en VLANs

Enumera 3 riesgos de seguridad específicos de VLANs y cómo mitigarlos:

| Riesgo | Mitigación |
|---|---|
| 1. | |
| 2. | |
| 3. | |

**Pista:** Piensa en DTP, native VLAN, VTP, VLAN hopping, etc.

## 7. VLAN hopping y hardening

a) Describe **3 vectores de ataque** que permiten a un atacante salirse de su VLAN (VLAN hopping), explicando cómo funciona cada uno.
b) Propón **3 mitigaciones concretas** de hardening con sus comandos.

**Pista:** piensa en DTP/negociación de trunks, en el double tagging sobre la native VLAN y en el etiquetado 802.1Q aplicado a tramas que no deberían llevarlo. Las mitigaciones están en el punto 6 de seguridad: `switchport nonegotiate`, native VLAN ≠ 1, `allowed vlan`, VTP.

## 8. Inter-VLAN con SVI paso a paso

Escribe la configuración completa que necesita un **switch capa 3** (por ejemplo un 3560) para enrutar entre 3 VLANs (10 Ventas → 192.168.10.0/24, 20 RRHH → 192.168.20.0/24, 30 IT → 192.168.30.0/24), asumiendo que los puertos access ya están asignados.

Incluye:

a) La creación de las VLANs con nombre.
b) El comando que activa el routing global.
c) Los tres SVIs con su IP y `no shutdown`.
d) El gateway que debe tener cada PC de cada VLAN.

**Pista:** el orden de los comandos importa: primero `ip routing`, después cada `interface vlan X`. Sin `ip routing`, los SVIs existen pero no enrutan. El gateway de cada VLAN es la IP del SVI de esa VLAN.

## 9. DHCP por VLAN sin teclear IPs

Siguiendo con el escenario del ejercicio 8 (SVIs 192.168.10.1, 192.168.20.1 y 192.168.30.1), la empresa tiene 60 PCs y no quiere configurarles la IP a mano:

a) Escribe los pools DHCP para las VLANs 10 (Ventas) y 20 (RRHH): `network`, `default-router` y `dns-server 8.8.8.8`.
b) ¿Qué rango debes excluir y qué problema evitas con ello?
c) El servidor DHCP real está en la VLAN 30 (`192.168.30.10`). ¿Qué línea añades en las SVIs de las VLANs 10 y 20 y por qué no funciona sin ella?
d) Un PC de la VLAN 10 se queda en `169.254.10.50`. Escribe en orden las 3 comprobaciones que harías para encontrar el culpable.

**Pista:** `ip dhcp pool`, `ip dhcp excluded-address` y `ip helper-address`. Recuerda que el DISCOVER es broadcast y que el broadcast no cruza VLANs.