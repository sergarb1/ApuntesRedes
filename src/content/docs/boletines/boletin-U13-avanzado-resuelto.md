---
title: Boletín U13 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de Cloud, virtualización y futuro
---

# ✅ Boletín U13 — Avanzado (Resuelto)

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

## 7. Diseño de red cloud completo

a) **Diagrama:**

```
                    Internet
                       │
               ┌───────┴───────┐
               │ Internet GW   │
               └───────┬───────┘
                       │
        ┌──────────────┼──────────────┐
        │   ALB        │              │
        └──────┬───────┘   ┌──────────┴──────────┐
               │           │   NAT Gateway       │
   ┌───────────┴─────┐     └──────────┬──────────┘
   │ EC2 web 1 (pub) │                │
   │ EC2 web 2 (pub) │                │
   └───────────┬─────┘     ┌──────────┴──────────┐
               │           │ EC2 API (privada)   │
               └──────────►│ RDS MySQL (privada) │
                           └─────────────────────┘
```

b) **Colocación:**
   - **Frontend web (pública):** necesita recibir tráfico directo de Internet → subnet pública con ruta al IGW.
   - **ALB (pública):** debe ser alcanzable desde Internet → subnet pública.
   - **NAT Gateway (pública):** requiere IP elástica → subnet pública.
   - **API y BD (privada):** sin IP pública → subnet privada; el frontend las alcanza por IP privada dentro de la VPC.

c) **Security Groups:**
   - **SG-ALB:** Inbound `80`/`443` desde `0.0.0.0/0`; Outbound `80` hacia SG-web.
   - **SG-web:** Inbound `80` desde SG-ALB (solo el balanceador puede entrar); Outbound `8080` hacia SG-api.
   - **SG-api:** Inbound `8080` desde SG-web (solo el frontend); Outbound `3306` hacia SG-rds y `443` hacia el NAT.
   - **SG-rds:** Inbound `3306` desde SG-api (solo la API). Nunca desde `0.0.0.0/0`.

d) **Flujo del tráfico:**
   1. Usuario → Internet → **Internet Gateway** → **ALB** (autorizado por SG-ALB).
   2. ALB → **EC2 web** (subnet pública, autorizado por SG-web).
   3. EC2 web → **EC2 API** (subnet privada, misma VPC, ruta por route table privada; autorizado por SG-api).
   4. EC2 API → **RDS MySQL** (autorizado por SG-rds, solo puerto 3306).

e) **Si el NAT Gateway cae:** los servicios **entrantes** (web vía ALB/IGW) siguen funcionando; el tráfico que **sale a Internet desde la subnet privada** (la API hacia servicios externos, parches, actualizaciones) deja de funcionar, y las **respuestas entrantes de ese tráfico saliente** tampoco llegan. El backend puede perder integridad de datos si dependía de llamadas externas.

## 8. Seguridad en cloud: SG vs NACL y NAT Gateway

a) **Cómo es posible:** los **Security Groups** son la única capa que se configuró, pero solo protegen a nivel de instancia. La **Network ACL** de la subnet privada quedó con la **regla por defecto "Allow todo"**. Si además alguien lanzó la API/RDS con IP pública (o en una subnet con IGW), el tráfico externo entra sin pasar por ningún SG que lo bloquee. La capa de defensa que ha fallado es la **subred (NACL)**: sin NACL restrictiva, el tráfico se decide solo por rutas y SG, y un SG mal aplicado (o una IP pública en la instancia) lo deja pasar.

b) **El deny que no funciona:** los Security Groups **no soportan deny explícito**; solo permiten (allow) reglas. No puedes "escribir un deny" en un SG: cualquier tráfico que no cumpla un allow se bloquea, pero no hay reglas de negación gestionables. Si intentaste bloquear con deny dentro de un SG, esa regla es ignorada/inválida. Para deny explícito se usa una **Network ACL**, que evalúa en **orden numérico** y sí soporta reglas de negación.

c) **Corrección:**
   - **NACL subnet privada:** Inbound `3306` desde SG/red de la API y `8080` desde el frontend; Deny al resto (regla `*` al final). Outbound: respuesta de esos puertos permitida (stateless → reglas explícitas de vuelta).
   - **SG-api:** solo Inbound `8080` desde SG-web; Outbound `3306` a SG-rds y `443` hacia el NAT (por IP privada del NAT).
   - **SG-rds:** solo Inbound `3306` desde SG-api; **sin** IP pública en la RDS y sin ruta a IGW en la subnet.
   - Añadir NACL en la subnet pública para el resto de la VPC.

d) **Salida de la API a Internet:** se añade un **NAT Gateway** en la **subnet pública** y una ruta en la route table de la subnet privada que apunte el tráfico `0.0.0.0/0` hacia el **NAT Gateway**. Al salir, la API envía el paquete con su **IP privada**; el NAT Gateway traduce el origen a su **IP elástica pública** (PAT) y recuerda la traducción en su tabla de estado. La **respuesta** llega al NAT (destino = IP elástica), que consulta la tabla y reescribe el destino a la IP privada original de la API. Por eso la API puede consumir servicios externos sin tener IP pública y las respuestas vuelven de forma transparente.