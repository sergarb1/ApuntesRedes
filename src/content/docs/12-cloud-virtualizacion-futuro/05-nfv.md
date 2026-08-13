---
title: 05 — NFV
description: Firewalls y balanceadores que son puro software 📦
---

<p><small>Firewalls y balanceadores que son puro software 📦</small></p>

> 🗺️ **Estás en:** ☁️ U12 → 05 · NFV

---

## 📬 La idea en una frase

> **NFV (Network Functions Virtualization)** reemplaza los appliances físicos (firewalls, load balancers, WAN optimizers) por **máquinas virtuales o contenedores** que ejecutan esas mismas funciones como software.

Si en [el punto 4](/ApuntesRedes/12-cloud-virtualizacion-futuro/04-sdn) separabas el "cerebro" de la red del hardware, aquí vas un paso más: **eliminar el hardware especializado** y correr cada función de red en un servidor estándar. NFV y SDN son primos: SDN gestiona el plano de red de forma central; NFV convierte cada servicio de red en una app que se despliega bajo demanda.

---

## 📦 ¿Qué se virtualiza?

Históricamente, cada función de red era una **caja de metal** con su software propietario. Con NFV, esa caja se convierte en una imagen de VM o contenedor que se arranca, copia y actualiza como cualquier software:

| Función | Appliance físico | Alternativa NFV |
|---|---|---|
| Firewall | Cisco ASA 5500 | pfSense VM, OPNsense |
| Load Balancer | F5 BIG-IP | HAProxy, NGINX VM |
| WAN Optimizer | Riverbed | WANdisco, Squid VM |

La tabla resume el salto: el **Cisco ASA** de siempre ahora es una **pfSense VM**; el **F5** es un **HAProxy** en contenedor; el **Riverbed** se sustituye por cachés y optimizadores en software.

---

## ⚡ Ventajas de NFV frente a las cajas

- **Provisioning inmediato:** levantar un firewall es arrancar una VM, no pedir hardware con semanas de plazo.
- **Escalado elástico:** ¿más tráfico? Clonas otra instancia del load balancer, sin comprar otra caja.
- **Coste:** hardware commodity + licencias de software, frente a appliances carísimos.
- **Agilidad de operaciones:** actualizar, copiar, migrar y eliminar son operaciones de software.

Y el contrapunto (porque CONRAD siempre lo recuerda): NFV **no elimina los problemas de red**, los transforma. El tráfico ahora atraviesa VMs, así que el rendimiento depende de la CPU y de la configuración del hypervisor, y un fallo de software puede tumbar varios "firewalls" a la vez si no se diseñan bien.

---

## 🔄 SDN y NFV: ¿primos o gemelos?

Mucha gente los mezcla. La regla rápida:

```
SDN → separe control y datos para GESTIONAR la red de forma central.
NFV → virtualice los SERVICIOS de red (firewall, LB, router) como software.
```

Pueden usarse juntos: NFV provee el servicio virtualizado (un router virtual, un firewall virtual) y SDN programa por dónde circula el tráfico hacia él. De hecho, el **core de 5G** combina ambos (verás el detalle en [el punto 7](/ApuntesRedes/12-cloud-virtualizacion-futuro/07-iot-5g-y-edge)). Pero no son lo mismo: SDN es arquitectura de control; NFV es modelo de despliegue de funciones.

> 💡 **Analogía de la flota:** SDN es la central de tráfico que decide las rutas (control). NFV es tener los camiones (firewalls, balanceadores) alquilados como servicio bajo demanda en vez de comprarlos. Puedes tener la central sin alquilar los camiones, pero juntos son imparables.

---

## 🧩 Anatomía de una VNF: ¿qué hay dentro?

Cuando virtualizas un firewall, no es "una sola VM" y ya está: una **VNF** (Virtual Network Function) suele tener varias piezas:

| Pieza | Qué es |
|---|---|
| **VNF** | La función en sí (firewall, load balancer, router) corriendo en VM/contenedor |
| **VNF Manager** | Software que la despliega, monitoriza y actualiza |
| **NFV Orchestrator (MANO)** | Orquesta todo el ciclo de vida: aprovisiona recursos, encadena VNFs, escala |
| **NFV Infrastructure** | Los servidores, storage y red donde corren las VNFs (tu punto 2) |

Con **MANO** puedes encadenar servicios: un firewall VNF → un load balancer VNF → un router VNF, todo desplegado y escalado con una sola petición. Es exactamente lo que el [punto 6](/ApuntesRedes/12-cloud-virtualizacion-futuro/06-cloud-networking) hace en el plano de red, pero aplicado a los servicios.

---

## 🛠️ Un ejemplo real: el firewall como servicio

Imagina que despliegas un firewall NFV con pfSense sobre ESXi/KVM:

```bash
# Conceptual: levantar la VNF del firewall en el hypervisor
vm_create --name vfw01 --template pfSense --vnic net-dmz
# Conectarla a las redes virtuales que debe proteger
vm_attach vfw01 --net LAN-dmz
vm_attach vfw01 --net WAN-isp
# Escalar cuando la petición de tráfico suba
vm_clone vfw02 --from vfw01
```

Lo importante: el **firewall deja de ser una caja física** y pasa a ser una imagen que se clona, se mueve entre hosts y se actualiza con un simple reinicio de la VM. Ese es el cambio de paradigma: **el hardware deja de importar**.

---

## 🧠 Mini-chequeo

1. ¿Qué appliance físico sustituye un HAProxy en el modelo NFV?
2. Nombra dos ventajas de NFV frente a las cajas físicas.
3. ¿En qué se diferencia SDN de NFV?

<details>
<summary>🔄 Respuestas</summary>

1. El **F5 BIG-IP** (load balancer) — HAProxy y NGINX VM son sus alternativas NFV.
2. **Provisioning inmediato** (arrancar una VM en segundos) y **escalado elástico** (clonar instancias sin comprar hardware). También coste y agilidad de operaciones.
3. **SDN** separa el plano de control del de datos para gestionar la red centralmente; **NFV** virtualiza las funciones de red (firewall, LB, router) como software. Son complementarios, no equivalentes.
</details>

---

## ✅ Resumen en 3 frases

- NFV **convierte en software** los appliances de red: pfSense por Cisco ASA, HAProxy por F5, y así con todo.
- Sus ventajas son **velocidad de despliegue, escalado elástico, coste y agilidad**.
- NFV y SDN son complementarios: uno virtualiza los servicios y el otro centraliza el control de la red.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| NFV | Virtualizar funciones de red como software |
| VNF | Virtual Network Function (el firewall/LB virtualizado) |
| Appliance | Caja de hardware dedicada a una función de red |
| Load Balancer | Distribuye tráfico entre servidores |
| WAN Optimizer | Acelera y comprime tráfico entre sedes |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-cloud-virtualizacion-futuro) · **Anterior:** [04 · SDN](/ApuntesRedes/12-cloud-virtualizacion-futuro/04-sdn) · **Siguiente:** [06 · Cloud networking](/ApuntesRedes/12-cloud-virtualizacion-futuro/06-cloud-networking)