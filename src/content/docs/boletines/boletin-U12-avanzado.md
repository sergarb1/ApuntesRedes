---
title: Boletín U12 — Avanzado
description: Ejercicios avanzados de Cloud, virtualización y futuro
---

# 📝 Boletín U12 — Avanzado

> Ejercicios que requieren comprensión profunda de cloud y redes modernas.

---

## 1. Arquitectura cloud

Diseña una arquitectura en AWS para una aplicación web con:
- 2 servidores web en subred pública (auto scaling)
- 1 base de datos en subred privada
- Balanceador de carga
- NAT Gateway para salida a Internet de los servidores privados

Dibuja el esquema e indica qué componentes de red se necesitan.

## 2. SDN vs Tradicional

Completa la tabla comparativa:

| Aspecto | Red Tradicional | SDN |
|---|---|---|
| Plano de control | | |
| Plano de datos | | |
| Escalabilidad | | |
| Coste | | |
| Recuperación de fallos | | |

## 3. Docker multi-host

Tienes 2 servidores Docker (host1 y host2) y quieres que contenedores en diferentes hosts se comuniquen de forma transparente.

a) ¿Qué tipo de red Docker usarías?
b) ¿Qué requisitos necesita la red subyacente?
c) ¿Qué alternativa usarías en Kubernetes?

## 4. Security Groups vs Network ACLs

Completa la tabla:

| Aspecto | Security Group | Network ACL |
|---|---|---|
| Nivel | Instancia | |
| Stateful/Stateless | | |
| Reglas por defecto | | |
| Orden de evaluación | | |
| Soporta deny explícito | | |

## 5. Estrategia de migración a cloud

Una empresa tiene 100 servidores físicos en su datacenter. Quiere migrar a AWS.

Propón una estrategia:
a) ¿Qué modelo de cloud usarías?
b) ¿Qué servicios de red necesitarías?
c) ¿Cómo conectarías el datacenter on-premise con AWS?
d) ¿Qué riesgos identificas?

## 6. El futuro de Internet

Lee sobre las siguientes propuestas y compáralas:

| Propuesta | Descripción | Problema que resuelve |
|---|---|---|
| **IPv6** | | |
| **IPv8** (draft-thain-ipv8) | | |
| **RINA** | | |
| **NDN** (Named Data Networking) | | |

Investiga brevemente cada una y completa la tabla.
