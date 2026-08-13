---
title: 03 — Docker networking
description: Cómo se conectan los contenedores por dentro 🐳
---

<p><small>Cómo se conectan los contenedores por dentro 🐳</small></p>

> 🗺️ **Estás en:** ☁️ U12 → 03 · Docker networking

---

## 📬 La idea en una frase

> Los contenedores comparten el kernel del host (a diferencia de las VMs), y Docker les da **modos de red** que deciden cuánto aislamiento quieres: **bridge, host, none y overlay**.

En [el punto 2](/ApuntesRedes/12-cloud-virtualizacion-futuro/02-virtualizacion-de-redes) las VMs traían su propia pila TCP/IP y su propio SO. Un contenedor es más ligero: **comparte el kernel** del host y solo empaqueta la app y sus librerías. Eso significa que su red también se gestiona de forma distinta, más parecida a un proceso de Linux que a una máquina entera.

---

## 🧩 VMs vs contenedores: el lío de red

| Aspecto | VM | Contenedor |
|---|---|---|
| SO | Uno completo por VM | Comparte el kernel del host |
| Pila TCP/IP | Propia por VM | Compartida con el host (modos según el caso) |
| Red vista por fuera | Cada VM parece un dispositivo con su MAC | Varios contenedores pueden compartir IP del host |
| Peso y velocidad | Pesado, arranque lento | Ligero, arranca en milisegundos |
| Aislamiento | Fuerte (hypervisor de por medio) | Menor (mismo kernel) |

El vSwitch de las VMs conecta máquinas completas. En Docker, en cambio, la conectividad se decide **por modo de red**, y hay cuatro clásicos.

---

## 🌉 Los 4 modos de red de Docker

| Modo de red | Descripción | Aislamiento |
|---|---|---|
| **bridge** (default) | Red NAT local. Los contenedores se ven entre sí por IP dentro de la misma red | Medio |
| **host** | Comparte la pila de red del host. Sin NAT | Bajo |
| **none** | Sin red. Solo loopback | Total |
| **overlay** | Red distribuida entre múltiples hosts (Docker Swarm) | Medio |

**bridge** crea una red privada (normalmente `172.17.0.0/16`) a la que el host hace NAT hacia fuera: los contenedores se comunican entre sí por IP, y hacia Internet salen por el host. Es el más usado por defecto.

**host** elimina el aislamiento de red: el contenedor usa directamente las interfaces del host, con su misma IP. Perfecto cuando necesitas máxima velocidad y no te importa compartir puertos.

**none** deja al contenedor solo con `loopback`: nada de Ethernet, nada de Internet. Útil para procesos que no deben tocar la red.

**overlay** es la red "mágica" multi-host: los contenedores de distintos servidores hablan entre sí como si estuvieran en la misma LAN, usando **VXLAN** bajo el capó (el mismo túnel que ya viste con VLANs en la U07).

```
  bridge (local)            overlay (multi-host)
┌──────────────┐      ┌────────────────────────────┐
│ host ─ NAT ─►│      │ host1 ── VXLAN túnel ── host2│
│  c1   c2     │      │   c1  ──────────────►  c2  │
│ bridge red   │      │   (misma subred virtual)    │
└──────────────┘      └────────────────────────────┘
```

---

## 🛠️ Comandos que tocarás en el laboratorio

Docker crea una **red bridge** para cada `docker network create`, y cada red es un puente aislado de las demás:

```bash
docker network create --driver bridge mired          # crear red bridge llamada "mired"
docker run -d --name c1 --network mired nginx        # lanzar c1 conectado a mired
docker network connect mired c2                      # conectar c2 (ya existente) a mired
docker network inspect mired                          # ver IPs, contenedores y subred
```

> ⚠️ **Ojo con el aislamiento:** dos contenedores en **redes distintas no se ven**, aunque estén en el mismo host. Cada red bridge es un puente separado. Para que hablen, o los pones en la misma red o los conectas a ambas con `docker network connect`.

Por dentro, Docker usa **pares veth**: un extremo virtual dentro del contenedor y otro en el puente del host. Es exactamente el mismo concepto de NIC virtual que viste con el vSwitch en [el punto 2](/ApuntesRedes/12-cloud-virtualizacion-futuro/02-virtualizacion-de-redes), pero aplicado a procesos.

---

## 🧠 Mini-chequeo

1. ¿Qué modo de red de Docker da el aislamiento total (solo loopback)?
2. Ejecutas `docker run -d --name web nginx` sin `--network`. ¿En qué red aterriza?
3. ¿Cómo haces que un contenedor que ya está corriendo se una a otra red?

<details>
<summary>🔄 Respuestas</summary>

1. **none** — sin interfaces de red, solo `loopback`.
2. En la red **bridge por defecto** (la llamada `bridge`), que aplica NAT hacia el exterior.
3. Con `docker network connect <red> <contenedor>` (por ejemplo `docker network connect mired web`).
</details>

---

## ✅ Resumen en 3 frases

- Los contenedores comparten el kernel y su red se elige por **modos**: bridge (NAT local), host (comparte la del host), none (aislado) y overlay (multi-host).
- Cada `docker network create` crea un **puente aislado**: contenedores en redes distintas no se comunican.
- Docker conecta cada contenedor con **pares veth** al puente, igual que el vSwitch conecta VMs.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| bridge | Red NAT local por defecto en Docker |
| host | El contenedor usa la pila de red del host |
| none | Sin red, solo loopback |
| overlay | Red multi-host con VXLAN (Docker Swarm) |
| veth | Par de interfaces virtuales que conecta el contenedor al puente |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-cloud-virtualizacion-futuro) · **Anterior:** [02 · Virtualización de redes](/ApuntesRedes/12-cloud-virtualizacion-futuro/02-virtualizacion-de-redes) · **Siguiente:** [04 · SDN](/ApuntesRedes/12-cloud-virtualizacion-futuro/04-sdn)