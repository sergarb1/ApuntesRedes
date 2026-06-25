---
title: Boletín U12 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de Cloud, virtualización y futuro
---

# ✅ Boletín U12 — Avanzado (Resuelto)

---

## 1. Arquitectura cloud

```
                          Internet
                             │
                      ┌──────┴──────┐
                      │  Internet   │
                      │   Gateway   │
                      └──────┬──────┘
                             │
                      ┌──────┴──────┐
                      │ Route Table │
                      │  (pública)  │
                      └──────┬──────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────┴────────┐    │    ┌──────────┴──────────┐
     │   ALB (L7)      │    │    │   NAT Gateway       │
     │ (balanceador)   │    │    │  (subred pública)    │
     └────────┬────────┘    │    └──────────┬──────────┘
              │              │              │
     ┌────────┴────────┐    │    ┌──────────┴──────────┐
     │   Web Server 1  │    │    │   Route Table       │
     │ (subred pública) │    │    │   (privada)        │
     ├─────────────────┤    │    └──────────┬──────────┘
     │   Web Server 2  │    │               │
     │ (subred pública) │    │    ┌──────────┴──────────┐
     └─────────────────┘    │    │      Base de datos    │
                             │    │    (subred privada)   │
                             │    └─────────────────────┘
```

**Componentes:** VPC, Internet Gateway, Route Tables (pública y privada), subredes, Security Groups, ALB, NAT Gateway.

## 2. SDN vs Tradicional

| Aspecto | Red Tradicional | SDN |
|---|---|---|
| Plano de control | Distribuido (cada router) | Centralizado (controlador) |
| Plano de datos | En cada router/switch | Switches siguen órdenes del controlador |
| Escalabilidad | Limitada (configuración manual) | Alta (programática) |
| Coste | Hardware caro, licencias | Hardware commodity, software |
| Recuperación de fallos | Protocolos distribuidos (OSPF, BGP convergen) | Controlador recalcula y programa |

## 3. Docker multi-host

a) Usarías **overlay network** de Docker Swarm o **Macvlan**.

b) Los hosts deben poder comunicarse entre sí (red IP subyacente funcionando) y tener puertos 4789/7946 abiertos (VXLAN y gossip protocol).

c) En Kubernetes se usa **CNI** (Container Network Interface) con plugins como **Calico** (BGP, políticas de red), **Flannel** (VXLAN), o **Weave**.

## 4. Security Groups vs Network ACLs

| Aspecto | Security Group | Network ACL |
|---|---|---|
| Nivel | Instancia (VM) | Subred |
| Stateful/Stateless | **Stateful** | **Stateless** |
| Reglas por defecto | Deny todo inbound, Allow todo outbound | Allow todo inbound y outbound |
| Orden de evaluación | Todas las reglas se evalúan | Orden numérico (menor número primero) |
| Soporta deny explícito | **No** (solo allow) | **Sí** |

## 5. Estrategia de migración a cloud

a) **Cloud híbrida** durante la migración (Rehost/Lift-and-Shift). Larga plazo: reevaluar si toda la carga va a pública.

b) **Servicios de red necesarios:** AWS Direct Connect (o VPN), VPC, subredes, Security Groups, Route 53 (DNS), ELB, NAT Gateway.

c) **Conexión on-premise ↔ AWS:**
   - **VPN over Internet** (rápido, barato, menos ancho de banda)
   - **AWS Direct Connect** (conexión dedicada, más cara, más ancho de banda, baja latencia)

d) **Riesgos:**
   - Dependencia de conectividad WAN
   - Costes de salida de datos (egress)
   - Seguridad: exposición a Internet durante la migración
   - Necesidad de reentrenar al equipo en cloud networking

## 6. El futuro de Internet

| Propuesta | Descripción | Problema que resuelve |
|---|---|---|
| **IPv6** | 128 bits de direccionamiento, autoconfiguración, sin NAT | Agotamiento de IPv4 |
| **IPv8** (draft-thain-ipv8) | Direcciones ASN:IPv4 (ej: AS13335:8.8.8.8) | Escalabilidad de BGP + agotamiento IPv4 |
| **RINA** | Rediseño completo de la arquitectura de Internet basado en capas DIF | Complejidad de la pila TCP/IP actual |
| **NDN** (Named Data Networking) | Enrutar por nombre de contenido, no por IP | Modelo host-centric vs content-centric |

Ninguna ha reemplazado a IP. IPv6 es el estándar actual. Las demás son propuestas de investigación.
