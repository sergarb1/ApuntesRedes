---
title: Boletín U12 — Avanzado
description: Ejercicios avanzados de Cloud, virtualización y futuro
---

# 📝 Boletín U12 — Avanzado

> Ejercicios que requieren comprensión profunda de cloud y redes modernas. En los difíciles tienes pista.

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

## 7. Diseño de red cloud completo

Diseña la red de una aplicación web escalable en AWS con los siguientes requisitos:

- Un **frontend web** accesible desde Internet (2 instancias EC2).
- Un **backend de API** que NO debe tener IP pública.
- Una **base de datos** que solo debe aceptar tráfico del backend.
- Todo el tráfico entrante del frontend pasa por un balanceador de carga.

**Tareas:**
a) Dibuja el diagrama completo: VPC, subnets (pública/privada), IGW, NAT Gateway, balanceador y las instancias.
b) Indica en qué subnet colocas cada componente y por qué.
c) Diseña los **Security Groups**: qué reglas de entrada permite cada uno (origen, protocolo, puerto) y para qué sirve cada regla.
d) Explica cómo llega el tráfico de un usuario hasta la base de datos: paso a paso y nombrando cada componente de red que atraviesa.
e) ¿Qué pasa si el NAT Gateway deja de funcionar? ¿Qué servicios siguen accesibles y cuáles no?

**Pista:** el backend y la BD van en subnets privadas (sin IGW); el backend sale a Internet por NAT si lo necesita. La BD solo recibe del Security Group del backend (origen = SG del backend), nunca de la subred entera. Para el apartado e) piensa en qué dirección del tráfico depende del NAT: las respuestas de salida, no las entradas por el balanceador.

## 8. Seguridad en cloud: SG vs NACL y NAT Gateway

Una empresa ha desplegado esta arquitectura:

```
Internet → ALB → [SG-web: 80/443 desde 0.0.0.0/0] → EC2 web (subnet pública)
EC2 web → API privada (subnet privada) → RDS MySQL (subnet privada)
```

Se produce un incidente: "la API privada recibe tráfico entrante desde fuera de la VPC aunque el Security Group solo permite al EC2 web". Además, la base de datos RDS se ve expuesta a Internet.

**Tareas:**
a) Explica cómo es posible que el tráfico llegue a la API privada y a la RDS si los Security Groups deberían bloquearlo. ¿Qué capa de defensa ha fallado y cuál no se configuró?
b) Compara en un caso concreto: si el incidente lo detectas porque alguien escribió una regla "deny" en el Security Group y no funcionó, ¿qué está ocurriendo? ¿Los Security Groups soportan deny explícito?
c) Diseña la corrección completa usando Network ACLs y Security Groups: qué reglas (dirección, puerto, origen) pondrías en la NACL de la subnet privada y en los SGs de la API y de la RDS.
d) La API necesita salir a Internet para consumir un servicio externo, pero no debe tener IP pública. ¿Qué componente añades y dónde se coloca? Describe cómo se traduce la dirección al salir (explica el NAT en ambas direcciones: respuesta incluida).

**Pista:** recuerda que un Security Group es **stateful** y no soporta deny; una **Network ACL** es **stateless** y se evalúa en orden numérico, pero hay que permitir tanto la entrada como la respuesta. Si solo configuraste SGs, el tráfico que "no debería existir" puede colarse si la NACL por defecto lo permite todo. Para la salida de la API, el **NAT Gateway** hace PAT: la API sale con la IP elástica del NAT y la respuesta vuelve porque el NAT mantiene la tabla de traducción (estado).