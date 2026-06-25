---
title: Boletín U07 — Avanzado
description: Ejercicios avanzados de VLANs
---

# 📝 Boletín U07 — Avanzado

> Ejercicios que requieren aplicar los conceptos de VLANs, trunks y routing de forma más profunda.

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
