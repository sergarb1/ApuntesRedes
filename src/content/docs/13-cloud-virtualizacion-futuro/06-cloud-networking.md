---
title: 06 — Cloud networking
description: VPC, subnets, security groups y la red de AWS 🌐
---

<p><small>VPC, subnets, security groups y la red de AWS 🌐</small></p>

> 🗺️ **Estás en:** ☁️ U13 → 06 · Cloud networking

---

## 📬 La idea en una frase

> En la nube construyes **redes enteras en software**: una **VPC** (red privada virtual), con sus **subnets**, sus **route tables**, sus **firewalls** (Security Groups y Network ACLs) y su **salida a Internet** (Internet Gateway y NAT Gateway).

Todo lo que has estudiado en la asignatura —subredes, rutas, ACLs, NAT— existe en cloud, pero **operado con APIs**. Amazon Web Services es el proveedor más grande y sus conceptos son representativos de todos los demás (Azure VNet, GCP VPC), así que lo usamos como ejemplo.

---

## 🗺️ Conceptos AWS y su equivalente clásico

| Concepto AWS | Equivalente tradicional |
|---|---|
| **VPC** (Virtual Private Cloud) | Red privada aislada |
| **Subnet** | Subred (pública o privada) |
| **Internet Gateway** | Router NAT para salida a Internet |
| **NAT Gateway** | PAT gestionado |
| **Security Group** | Firewall **stateful** a nivel de instancia |
| **Network ACL** | ACL **stateless** a nivel de subred |
| **Route Table** | Tabla de enrutamiento de la VPC |

La **VPC** es tu red privada aislada dentro del cloud del proveedor: es "una VLAN a escala cloud" (aunque con mucho más control). Dentro defines **subnets**: una **pública** (con ruta directa al Internet Gateway) y una **privada** (sin acceso directo a Internet; sale por NAT Gateway).

---

## 🏗️ Arquitectura típica en AWS

```
Internet ←→ Internet Gateway ←→ Route Table
                                        |
                          ┌─────────────┴─────────────┐
                     Subnet pública              Subnet privada
                     ┌─────────────┐            ┌─────────────┐
                     │ NAT Gateway │            │  Servidores  │
                     │  Web Server │            │   internos   │
                     └─────────────┘            └─────────────┘
```

Cómo fluye el tráfico:
- Los **clientes** entran desde Internet por el **Internet Gateway** hasta los **Web Servers** de la subnet pública.
- Los **servidores internos** (bases de datos, backend) están en la subnet privada: no tienen IP pública y su única salida a Internet es el **NAT Gateway**, que hace **PAT** (el mismo NAT de la U11, pero gestionado).
- Las **Route Tables** deciden qué subred usa qué gateway: la pública apunta al IGW, la privada al NAT.

> 💡 **¿Lo ves?** Es exactamente tu Packet Tracer de casa: subredes, rutas por defecto y NAT, pero declarado como objetos en una consola web o con `aws` en la terminal.

---

## 🔥 Dos firewalls que NO son iguales

La pregunta estrella de las entrevistas cloud:

| Aspecto | **Security Group** | **Network ACL** |
|---|---|---|
| Nivel | Instancia (VM) | Subred |
| Stateful/Stateless | **Stateful** | **Stateless** |
| Reglas por defecto | Deny todo inbound, Allow todo outbound | Allow todo inbound y outbound |
| Orden de evaluación | Todas las reglas se evalúan | Orden numérico (menor número primero) |
| Soporta deny explícito | **No** (solo allow) | **Sí** |

**Stateful** significa que si permites la entrada, la respuesta sale automáticamente sin regla extra (como los stateful firewalls que ya conoces). **Stateless** exige reglas explícitas en ambas direcciones. Por eso, aunque parezcan "el mismo firewall", se configuran de forma muy distinta: los Security Groups protegen cada instancia y las Network ACLs actúan como primera barrera a nivel de subred.

Un ejemplo de reglas en el Security Group de un servidor web:

```bash
# SG-web (stateful): solo el balanceador puede entrar al 80
Type: HTTP        Protocol: TCP   Port: 80     Source: sg-alb (id del SG)
Type: HTTPS       Protocol: TCP   Port: 443    Source: sg-alb (id del SG)
Type: SSH         Protocol: TCP   Port: 22     Source: 10.0.0.0/24  (admin)
```

Fíjate en que el origen de una regla puede ser **otro Security Group** (sg-alb): el tráfico solo entra si *proviene de instancias protegidas por ese SG*. Es una forma elegante de "solo mi balanceador" sin escribir IPs. La contrapartida stateless, la **Network ACL**, necesita además las reglas de vuelta:

```bash
# NACL subnet privada (stateless): permitir entrada 3306 y su respuesta
Inbound:  100  TCP 3306  from 10.0.1.0/24   → Allow   (la API)
Inbound:  *    TCP all   from 0.0.0.0/0     → Deny
Outbound: 110  TCP all   to   10.0.1.0/24   → Allow   (respuesta)
```

---

## 🧠 Mini-chequeo

1. ¿Qué componente de AWS permite que una VPC hable con Internet?
2. ¿Un Security Group es stateful o stateless? ¿Y una Network ACL?
3. ¿Cómo sale a Internet una instancia de la subnet privada?

<details>
<summary>🔄 Respuestas</summary>

1. El **Internet Gateway** — conecta la VPC con Internet (para las subredes públicas).
2. Los **Security Groups** son **stateful** (la respuesta se permite sola); las **Network ACLs** son **stateless** (reglas explícitas en ambas direcciones).
3. A través del **NAT Gateway** de la subnet pública, que hace PAT hacia Internet.
</details>

---

## ✅ Resumen en 3 frases

- Cloud networking es tu red clásica **declarada en software**: VPC = red, subnet = subred, IGW = salida, route table = rutas.
- Los **Security Groups** (instancia, stateful) y las **Network ACLs** (subred, stateless) son dos capas de firewall distintas.
- El **NAT Gateway** es PAT gestionado que da salida a las subredes privadas.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| VPC | Red privada virtual aislada en cloud |
| Subnet | Subred pública o privada dentro de la VPC |
| Internet Gateway | Salida directa a Internet |
| NAT Gateway | PAT gestionado para salida de subredes privadas |
| Security Group | Firewall stateful a nivel de instancia |
| Network ACL | ACL stateless a nivel de subred |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/13-cloud-virtualizacion-futuro) · **Anterior:** [05 · NFV](/ApuntesRedes/13-cloud-virtualizacion-futuro/05-nfv) · **Siguiente:** [07 · IoT, 5G y edge computing](/ApuntesRedes/13-cloud-virtualizacion-futuro/07-iot-5g-y-edge)