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

## 7. ¿Qué modelo cloud es cada servicio?

Clasifica cada servicio real según el modelo cloud (IaaS, PaaS o SaaS):

a) Lanzas una VM EC2 en AWS y configuras tú el SO Linux y la red virtual.
b) El departamento comercial usa Salesforce desde el navegador.
c) Despliegas tu código en Heroku sin gestionar el servidor.
d) Subes fotos a Google Drive para compartirlas con la familia.
e) Montas una base de datos MySQL en una VM de Azure Virtual Machines.
f) Una startup usa Google App Engine para publicar su app sin administrar infraestructura.

**Pista:** piensa en quién gestiona cada capa. Si gestionas tú el SO y la red → IaaS. Si solo subes tu código y el proveedor gestiona la plataforma → PaaS. Si abres el navegador y usas la aplicación → SaaS.

## 8. Completa la tabla de redes Docker

Rellena los huecos con el modo de red correcto (bridge, host, none o overlay):

| Afirmación | Modo |
|---|---|
| a) Red NAT local por defecto. Los contenedores se ven por IP dentro de la misma red | |
| b) El contenedor comparte la pila de red del host. Sin NAT | |
| c) Sin red. Solo loopback | |
| d) Red distribuida entre múltiples hosts (Docker Swarm) | |

**Pista:** recuerda el nivel de aislamiento de cada modo: medio, bajo, total o medio (multi-host). El único que no necesita NAT y usa la interfaz del host es el de menor aislamiento.
