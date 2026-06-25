---
title: Boletín U12 — Inicial
description: Ejercicios básicos de Cloud, virtualización y futuro
---

# 📝 Boletín U12 — Inicial

> Ejercicios para practicar los fundamentos de cloud y virtualización.

---

## 1. Modelos cloud

Relaciona cada modelo con su descripción:

| Modelo | Descripción |
|---|---|
| IaaS | A. Aplicación completa accesible por Internet |
| PaaS | B. VMs, redes virtuales, almacenamiento bajo demanda |
| SaaS | C. Plataforma de desarrollo sin gestionar servidores |

## 2. Tipos de cloud

Define cada tipo:

a) Cloud pública
b) Cloud privada
c) Cloud híbrida

## 3. Virtualización

¿Cuál es la diferencia entre un hypervisor Tipo 1 y Tipo 2? Pon ejemplos de cada uno.

## 4. Docker networking

Ejecutas estos comandos:

```bash
docker network create --driver bridge red1
docker run -d --name cont1 --network red1 alpine sleep 3600
docker run -d --name cont2 alpine sleep 3600
```

a) ¿Cont1 y cont2 pueden comunicarse? ¿Por qué?
b) ¿En qué red está cont2?

## 5. Verdadero o falso

a) En SDN, el plano de control está centralizado.
b) NFV reemplaza hardware de red por software virtualizado.
c) En AWS, un Security Group es stateless.
d) IPv8 es un estándar oficial de Internet.

## 6. Conceptos cloud

Explica brevemente qué es:

a) VPC
b) Security Group
c) Internet Gateway
d) Subnet pública vs privada
