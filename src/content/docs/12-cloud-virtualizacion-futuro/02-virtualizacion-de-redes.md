---
title: 02 — Virtualización de redes
description: Hypervisors, switches virtuales y VRF 🖥️
---

<p><small>Hypervisors, switches virtuales y VRF 🖥️</small></p>

> 🗺️ **Estás en:** ☁️ U12 → 02 · Virtualización de redes

---

## 📬 La idea en una frase

> La virtualización permite **partir una máquina física en muchas VMs** y, con ello, **partir una red física en muchas redes virtuales** que se comportan como si fueran reales.

En [el punto 1](/ApuntesRedes/12-cloud-virtualizacion-futuro/01-modelos-cloud) alquilabas VMs por Internet. Esta es la tecnología que lo hace posible: un **hypervisor** que reparte el hardware entre varias máquinas, y unos **switches virtuales** que las conectan sin un solo cable. Todo lo que sabes de la asignatura —IP, switches, VLANs, routing— existe ahora también en versión software.

---

## 🧱 Hypervisors: el casero de las VMs

El hypervisor es el software que **crea y gestiona las VMs**: reparte CPU, RAM y red entre ellas y las aísla unas de otras. Hay dos tipos:

| Tipo | Ejemplo | Cómo funciona |
|---|---|---|
| **Tipo 1** (bare-metal) | VMware ESXi, Hyper-V, KVM | Corre directamente sobre el hardware, sin SO intermedio |
| **Tipo 2** (hosted) | VirtualBox, VMware Workstation | Corre sobre un SO existente (Windows, Linux…) |

El **Tipo 1** es el de los datacenters y la nube: al no haber un SO de por medio, es más rápido, más estable y puede aprovechar todo el hardware. El **Tipo 2** es el del laboratorio de tu casa: instalas VirtualBox sobre Windows y listo, pero pagas el coste de la capa extra.

```
┌───────────────────────────────────────────────┐
│  HARDWARE físico (CPU, RAM, NIC, disco)        │
├───────────────────────────────────────────────┤
│  HYPERVISOR Tipo 1 (ESXi, KVM, Hyper-V)        │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ │
│  │  VM A      │ │  VM B      │ │  VM C      │ │
│  │ pila TCP/IP│ │ pila TCP/IP│ │ pila TCP/IP│ │
│  │ NIC virt.  │ │ NIC virt.  │ │ NIC virt.  │ │
│  └─────┬──────┘ └─────┬──────┘ └─────┬──────┘ │
│        └────── vSwitch ────┬─────────┘        │
│                            │                  │
│                      Red física / uplink      │
└───────────────────────────────────────────────┘
```

---

## 🔀 Switches virtuales (vSwitch)

Cada VM tiene su **propia pila TCP/IP** y su propia **NIC virtual**. Para conectarlas, el hypervisor crea **switches virtuales (vSwitch)**: un programa que reenvía tramas entre VMs y hacia la red física exactamente como lo haría un switch de verdad, pero sin puertos ni LEDs.

- Las VMs conectadas al mismo vSwitch **se ven entre sí** por MAC e IP sin salir a la red física.
- Para aislar grupos de VMs se usan **VLANs** (recuerda la U07): el vSwitch etiqueta las tramas con 802.1Q.
- El tráfico hacia fuera sale por un **uplink** físico, normalmente con NAT, routing o en modo bridge.

> 💡 **Analogía de la pensión:** cada VM es un huésped con su propia maleta (pila TCP/IP). El vSwitch es el conserje que pasa cartas entre habitaciones sin salir del edificio, y solo sale a la calle cuando la carta va a otra dirección. Los huéspedes ni se enteran de cuántos comparten piso.

---

## 🗺️ VRF: varios routers dentro de un router

En el punto anterior viste las VLANs, que separan **redes de capa 2**. Ahora sube un nivel: **VRF (Virtual Routing and Forwarding)** permite tener **múltiples tablas de routing independientes en un mismo router físico**. Cada VRF es como un **router virtual separado** que ignora las rutas de los demás.

```
       Router físico con 2 VRF
┌──────────────────────────────────────┐
│ VRF CLIENTE-A        VRF GESTION     │
│ tablas: 10.0.0.0/24  tablas: 192.168.0.0/24
│ rutas propias        rutas propias   │
│ ┌────────────────┐  ┌──────────────┐ │
│ │ ospf 1         │  │ static       │ │
│ └────────────────┘  └──────────────┘ │
└──────────────────────────────────────┘
```

Útil para:
- **Aislar clientes en MPLS/VPN** — cada cliente ve solo su red aunque compartan el mismo hardware.
- **Separar tráfico de gestión del tráfico de datos** — la red de administración no puede alcanzar (ni ser alcanzada por) la red de usuarios.

Si pensabas que con VLANs bastaba: las VLANs separan **dominios de broadcast** (capa 2); los VRF separan **tablas de routing** (capa 3). Un router con VRF es a un router normal lo que un vSwitch es a un switch: **misma función, múltiples copias lógicas**.

---

## 🧠 Mini-chequeo

1. ¿Qué tipo de hypervisor corre directamente sobre el hardware? Pon dos ejemplos.
2. ¿Qué conexión permite que dos VMs del mismo host se comuniquen sin salir a la red física?
3. Un ISP quiere que dos clientes compartan un router pero que sus tablas de rutas nunca se mezclen. ¿Qué tecnología usa?

<details>
<summary>🔄 Respuestas</summary>

1. **Tipo 1 (bare-metal)**: VMware ESXi, Microsoft Hyper-V o KVM.
2. Un **switch virtual (vSwitch)** creado por el hypervisor: las tramas se reenvían en software sin llegar al uplink físico.
3. **VRF (Virtual Routing and Forwarding)**: cada cliente tiene su propia tabla de routing independiente en el mismo router.
</details>

---

## ✅ Resumen en 3 frases

- El **hypervisor** reparte el hardware entre VMs (Tipo 1 bare-metal en nube, Tipo 2 hosted en casa).
- El **vSwitch** conecta las VMs en software y puede usar VLANs para aislarlas.
- El **VRF** separa tablas de routing en un mismo router: perfecto para aislar clientes o la gestión del tráfico de datos.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Hypervisor Tipo 1 | Corre sobre el hardware (ESXi, Hyper-V, KVM) |
| Hypervisor Tipo 2 | Corre sobre un SO (VirtualBox, Workstation) |
| vSwitch | Switch virtual del hypervisor que conecta VMs |
| NIC virtual | Tarjeta de red simulada de cada VM |
| VRF | Múltiples tablas de routing en un mismo router |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-cloud-virtualizacion-futuro) · **Anterior:** [01 · Modelos cloud](/ApuntesRedes/12-cloud-virtualizacion-futuro/01-modelos-cloud) · **Siguiente:** [03 · Docker networking](/ApuntesRedes/12-cloud-virtualizacion-futuro/03-docker-networking)