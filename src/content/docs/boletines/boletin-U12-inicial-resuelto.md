---
title: Boletín U12 — Inicial (Resuelto)
description: Soluciones ejercicios básicos de Cloud, virtualización y futuro
---

# ✅ Boletín U12 — Inicial (Resuelto)

---

## 1. Modelos cloud

| Modelo | Descripción |
|---|---|
| IaaS | **B** — VMs, redes virtuales, almacenamiento bajo demanda |
| PaaS | **C** — Plataforma de desarrollo sin gestionar servidores |
| SaaS | **A** — Aplicación completa accesible por Internet |

## 2. Tipos de cloud

a) **Cloud pública:** Recursos compartidos ofrecidos por un proveedor (AWS, Azure) a través de Internet. Multitenant.

b) **Cloud privada:** Infraestructura dedicada a una sola organización. Puede estar on-premise o en un datacenter dedicado.

c) **Cloud híbrida:** Combinación de pública y privada, con interconexión entre ambas (VPN o conexión dedicada).

## 3. Virtualización

**Tipo 1 (bare-metal):** Corre directamente sobre el hardware. Ej: VMware ESXi, Microsoft Hyper-V, KVM.

**Tipo 2 (hosted):** Corre sobre un SO existente. Ej: VirtualBox, VMware Workstation.

## 4. Docker networking

a) **No** pueden comunicarse. cont1 está en la red `red1` (bridge personalizado), cont2 está en la red `bridge` por defecto. Redes diferentes = aislamiento.

b) cont2 está en la red **bridge por defecto** (llamada `bridge` en Docker).

## 5. Verdadero o falso

a) **Verdadero.** En SDN, el controlador centraliza el plano de control.
b) **Verdadero.** NFV virtualiza funciones como firewalls, load balancers, routers.
c) **Falso.** Los Security Groups en AWS son **stateful** (el tráfico de respuesta se permite automáticamente). Las Network ACLs son stateless.
d) **Falso.** IPv8 es una propuesta experimental (draft), no un estándar oficial.

## 6. Conceptos cloud

a) **VPC** (Virtual Private Cloud): Red virtual aislada en la nube donde lanzas recursos.

b) **Security Group:** Firewall stateful a nivel de instancia (VM). Permite definir reglas de tráfico entrante y saliente.

c) **Internet Gateway:** Puerta de enlace que permite a una VPC comunicarse con Internet.

d) **Subnet pública:** Tiene ruta directa a Internet Gateway. **Subnet privada:** No tiene acceso directo a Internet (sale a través de NAT Gateway).
