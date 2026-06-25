---
title: U12 — Cloud, virtualización y futuro
description: La nube que no es vapor ☁️
---

<p><small>La nube que no es vapor ☁️</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 Cable → 🏷️ IP → 🌍 IPv6 → 🔀 Switch → 🏢 VLAN → 🧭 Router → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ **CLOUD**

---

*El recorrido del paquete ha llegado a su punto más avanzado. El mundo ha cambiado: ya no se trata solo de cables y routers físicos, ahora todo es "nube". Servidores en datacenters remotos que llamamos "cloud".*

La última unidad explora el futuro de las redes: virtualización, SDN, contenedores, y cómo será Internet en los próximos años.

---

## 📚 Contenidos

- Virtualización de redes: VLANs, VRF, hypervisors
- Contenedores y Docker networking (bridge, host, overlay)
- SDN (Software Defined Networking): OpenFlow, controladores
- NFV (Network Functions Virtualization)
- Cloud networking: VPC, subnets cloud, security groups
- Modelos cloud: IaaS, PaaS, SaaS
- IoT, 5G y edge computing
- IPv8: propuesta experimental (draft-thain-ipv8)
- El futuro de Internet: RINA, NDN, más allá de IP

---

## ☁️ Modelos Cloud

| Modelo | Qué ofrece | Ejemplo |
|---|---|---|
| **IaaS** (Infraestructure as a Service) | VMs, almacenamiento, redes virtuales | AWS EC2, Azure VMs |
| **PaaS** (Platform as a Service) | Plataforma de desarrollo + despliegue | Heroku, Google App Engine |
| **SaaS** (Software as a Service) | Aplicación completa | Gmail, Office 365, Dropbox |

### Tipos de Cloud

| Tipo | Descripción |
|---|---|
| **Pública** | Recursos compartidos, Internet, multitenant |
| **Privada** | Dedicada a una organización, on-premise |
| **Híbrida** | Mezcla de pública y privada con interconexión |

---

## 🖥️ Virtualización de redes

### Hypervisors

| Tipo | Ejemplo | Cómo funciona |
|---|---|---|
| **Tipo 1** (bare-metal) | VMware ESXi, Hyper-V, KVM | Corre directamente sobre el hardware |
| **Tipo 2** (hosted) | VirtualBox, VMware Workstation | Corre sobre un SO existente |

Cada VM tiene su propia pila TCP/IP. El hypervisor crea **switches virtuales** (vSwitch) que conectan las VMs entre sí y con el mundo exterior.

### VRF (Virtual Routing and Forwarding)

Permite tener **múltiples tablas de routing independientes** en un mismo router. Cada VRF es como un router virtual separado. Útil para:
- Aislar clientes en MPLS/VPN
- Separar tráfico de gestión del tráfico de datos

---

## 🐳 Docker Networking

| Modo de red | Descripción | Aislamiento |
|---|---|---|
| **bridge** (default) | Red NAT local. Contenedores se ven entre sí por IP | Medio |
| **host** | Comparte la pila de red del host. Sin NAT | Bajo |
| **none** | Sin red. Solo loopback | Total |
| **overlay** | Red distribuida entre múltiples hosts (Docker Swarm) | Medio |

### Comandos útiles

```bash
docker network create --driver bridge mired
docker run -d --name c1 --network mired nginx
docker network connect mired c2
docker network inspect mired
```

---

## 🔄 SDN (Software Defined Networking)

### Arquitectura tradicional vs SDN

| Componente | Red tradicional | SDN |
|---|---|---|
| **Plano de control** | Distribuido (cada router decide) | Centralizado (controlador) |
| **Plano de datos** | En cada router | Switches "tontos" siguen órdenes |
| **Decisión de reenvío** | Cada router (routing protocol) | Controlador programa flujos |

### OpenFlow

Protocolo estándar que permite al controlador SDN instalar **reglas de flujo** en los switches:

```bash
# Ejemplo de regla OpenFlow (conceptual)
match: ip.src=10.0.0.0/8, tcp.dst=80
action: output=port3
```

### Beneficios de SDN

- **Visibilidad global:** el controlador sabe todo lo que pasa
- **Programabilidad:** puedes escribir software que controle la red
- **Automatización:** cambios de red sin tocar cada router manualmente

---

## 📦 NFV (Network Functions Virtualization)

NFV reemplaza appliances físicos (firewalls, load balancers, WAN optimizers) por **máquinas virtuales** que ejecutan esas funciones.

| Función | Appliance físico | Alternativa NFV |
|---|---|---|
| Firewall | Cisco ASA 5500 | pfSense VM, OPNsense |
| Load Balancer | F5 BIG-IP | HAProxy, NGINX VM |
| WAN Optimizer | Riverbed | WANdisco, Squid VM |

---

## 🌐 Cloud Networking (AWS como ejemplo)

Amazon Web Services es el proveedor cloud más grande. Sus conceptos de red son representativos de todos los cloud providers.

| Concepto AWS | Equivalente tradicional |
|---|---|
| **VPC** (Virtual Private Cloud) | Red privada aislada |
| **Subnet** | Subred (pública o privada) |
| **Internet Gateway** | Router NAT para salida a Internet |
| **NAT Gateway** | PAT gestionado |
| **Security Group** | Firewall stateful a nivel de instancia |
| **Network ACL** | ACL stateless a nivel de subred |
| **Route Table** | Tabla de enrutamiento de la VPC |

### Arquitectura típica en AWS

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

---

## 📡 IoT, 5G y Edge Computing

| Tecnología | Descripción | Implicaciones de red |
|---|---|---|
| **IoT** | Miles de millones de dispositivos conectados | Necesitas IPv6 sí o sí |
| **5G** | Baja latencia (<1ms), alta velocidad | Core basado en SDN/NFV |
| **Edge computing** | Procesar datos cerca del origen | Reduce tráfico hacia el cloud central |

---

## ⭐ Sé la Nube

> *Eres un switch virtual en AWS. Tu trabajo es conectar instancias EC2 en una VPC. No tienes cables. No tienes LEDs. Eres 100% software.*

**Escenario:** Un desarrollador crea una nueva subred en la VPC. En 2 segundos, está operativa. Sin crimpar, sin racks, sin sudor.

**Pregunta:** ¿Qué ventajas tiene esto frente a una red física?
a) Rapidez de provisión ✅
b) Escalabilidad casi infinita ✅
c) No necesitas comprar hardware ✅
d) No necesitas conocimientos de redes ❌ (¡Sí necesitas! Pero diferentes)

---

## 🔥 Fireside Chat: Red Tradicional vs SDN

> *Un router tradicional y un controlador SDN debaten en un datacenter.*

**Tradicional:** — Yo tomo mis propias decisiones. Cada router decide por su cuenta. Descentralizado. Democrático.

**SDN:** — Y por eso mismo es un caos. Con SDN, un controlador central tiene la visión completa de la red y programa las tablas de flujo en cada switch. Eficiencia global.

**Tradicional:** — ¿Y si el controlador se cae?

**SDN:** — Los switches pueden seguir funcionando con las últimas reglas. Y tengo controladores redundantes. No es tan frágil como parece.

**Tradicional:** — Prefiero mi autonomía.

**SDN:** — Prefiero mi optimización.

**Cloud:** — ¿Por qué no los dos? Red tradicional como backbone, SDN en el datacenter. No es blanco o negro.

---

## 🕵️ ¿Quién Soy?

1. Soy una red virtual en la nube. Aíslo recursos de otros clientes. Soy como una VLAN pero a escala cloud.

2. Soy la tecnología que separa el plano de control del plano de datos en redes.

3. Soy un estándar de red para contenedores. Creo redes virtuales entre contenedores en el mismo host o entre hosts.

4. Soy una propuesta experimental de direccionamiento que combina ASN + IPv4 para ampliar el espacio de direcciones.

5. Reemplazo appliances físicos (firewalls, load balancers) por software virtualizado.

<details>
<summary>🔄 Respuestas</summary>

1. **VPC** (Virtual Private Cloud).
2. **SDN** (Software Defined Networking).
3. **CNI** (Container Network Interface) — Ej: Flannel, Calico, Weave.
4. **IPv8** — Propuesta experimental (no es un estándar oficial).
5. **NFV** (Network Functions Virtualization).

</details>

---

## 🤬 CONRAD VS EL MUNDO: "La nube soluciona todos los problemas"

**CONRAD:** — *RISOTADA* "La nube no soluciona nada, solo cambia dónde están los problemas. En lugar de un cable roto, tienes un security group mal configurado. En lugar de un switch que muere, tienes una subred mal enrutada. La física se convierte en lógica, pero los problemas SIGUEN AHÍ."

**CONRAD:** — "Y luego dicen: *es que en la nube es más fácil*. Sí, hasta que tienes que entender por qué el tráfico entre dos VPCs no fluye. Entonces necesitas saber exactamente lo mismo que sabías antes: routing, ACLs, NAT, DNS. La nube no elimina el conocimiento, lo transforma."

---

## ⚡ Laboratorio de Tortura: Docker Networking

> **Duración:** 1 hora
> **Herramientas:** Docker Desktop, terminal

**Escenario:** Crea 2 contenedores Docker y haz que se comuniquen.

```bash
# Crear red
docker network create mired

# Lanzar contenedores
docker run -d --name c1 --network mired alpine sleep 3600
docker run -d --name c2 --network mired alpine sleep 3600

# Probar conectividad
docker exec c1 ping c2
```

**Fallo intencionado:** Pon c1 en la red "mired" y c2 en la red "otrared". ¿Pueden verse? No. Cada red Docker es un bridge aislado. Los contenedores en diferentes bridges no pueden comunicarse a menos que uses routing o los conectes a ambas redes.

---

## 🏆 Logros Finales

| Logro | Cómo conseguirlo |
|---|---|
| 🎓 **Network Master** | Completar las 12 unidades y diagnosticar correctamente un fallo real en una red |
| 🏅 **Network Survivor** | Explicar el viaje completo de un paquete desde el origen hasta el destino |
| 🏅 **Cloud Ready** | Desplegar 2 contenedores y hacer que se comuniquen |
| 🏅 **SDN Explorer** | Explicar la diferencia entre plano de control y plano de datos |

---

## 🧠 Atrévete a Pensar

1. ¿Qué diferencia hay entre virtualización (VMware) y contenedores (Docker) en términos de red?
2. ¿Qué es un hypervisor? ¿Cómo afecta a la red?
3. Investiga IPv8: ¿qué problema intenta resolver? ¿Por qué no es un estándar?
4. Debate: **¿IPv6 es suficiente o necesitamos otra Internet?**
5. ¿Cuál es la diferencia entre SDN y NFV?

<details>
<summary>💡 Soluciones</summary>

1. **VMs:** cada una tiene su propia pila TCP/IP, su propia MAC. Los switches físicos ven cada VM como un dispositivo independiente. **Contenedores:** comparten el kernel del host. La red suele ser NAT o bridge local. Menos aislamiento, más ligero.
2. **Hypervisor** (tipo 1: VMware ESXi, Hyper-V) virtualiza el hardware. Cada VM tiene su NIC virtual. El hypervisor puede conectar VMs en redes virtuales sin necesidad de switches físicos.
3. **IPv8** (draft-thain-ipv8) propone direcciones basadas en ASN + IPv4 (ej: ASN:IP). No es un estándar, no tiene implementación real, no es compatible con Internet actual. Es más una reflexión teórica que una solución viable.
4. Debate abierto. IPv6 resuelve el problema de direcciones pero no el de routing global (tablas de BGP crecen sin control). Algunos proponen repensar Internet desde cero (RINA, NDN). IPv6 es lo que tenemos y funciona.
5. **SDN** separa control y datos para centralizar la gestión de la red. **NFV** virtualiza funciones de red (firewall, router) para ejecutarlas como software. SDN gestiona el plano de red; NFV elimina hardware especializado. Pueden usarse juntos.

</details>

---

## 🧩 Crucigrama de Bits

```
Horizontal:
1. Propuesta experimental de direccionamiento IPv8 (3 caracteres + dígito)
4. Red virtual privada en la nube (3 letras)
5. Tecnología que separa control y datos (3 letras)
7. Virtualización de funciones de red (3 letras)
8. Proveedor cloud más grande (3 letras)

Vertical:
2. Estándar de red para contenedores (3 letras)
3. Interfaz de red virtual en Linux (4 letras)
6. Modelo cloud de software (4 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. IPV8, 4. VPC, 5. SDN, 7. NFV, 8. AWS
**Vertical:** 2. CNI, 3. TUN, 6. SAAS

</details>

---

## 💬 Preguntas de Entrevista de Trabajo

1. **"¿Cómo diseñarías la red para una aplicación cloud-native con microservicios?"**
2. **"¿Qué es SDN? Explica la diferencia entre plano de control y plano de datos."**
3. **"¿Cómo funciona el networking en Docker?"**
4. **"¿Crees que IPv6 es suficiente o necesitamos algo nuevo?"** (Pregunta de debate, no hay respuesta correcta)
5. **"Explica la diferencia entre IaaS, PaaS y SaaS con ejemplos."**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Qué es realmente la nube?**

La nube es un conjunto de servidores, almacenamiento y recursos de red ubicados en centros de datos gestionados por proveedores como AWS, Azure o Google Cloud. Estos recursos se ofrecen bajo demanda a través de Internet. Aunque el término "nube" sugiere algo etéreo, la infraestructura física es real: cables de fibra, routers, switches y servidores como los que has estudiado en esta asignatura.

---

> ❓ **¿Por qué se usa el término "nube" si la infraestructura es física?**

El término "nube" se originó en los diagramas de red para representar una red compleja sin tener que dibujar todos sus componentes internos. Es una abstracción útil que simplifica la representación de infraestructuras extensas. Detrás de esa abstracción hay centros de datos reales con hardware físico, protocolos de routing y los mismos principios de redes que has aprendido.

---

> ❓ **¿Puedo aprender cloud sin saber redes tradicionales?**

Técnicamente sí, pero no lo hagas. Sin entender routing, subredes, DNS y firewalls, cometerás errores graves en cloud. La nube es redes tradicionales con otra interfaz. Aprende primero la base (estas 12 unidades) y luego especialízate en cloud.

---

## 🎬 Post-Créditos (Post-Créditos Finales)

> *El paquete ha completado su recorrido. Ha atravesado cables, switches, routers, NAT y cloud. Pero el aprendizaje continúa.*

**CONRAD:** — El viaje nunca termina. Cada día hay nuevas tecnologías, nuevos protocolos, nuevos fallos que diagnosticar. La red está viva. Mientras haya un bit que transmitir, habrá un paquete que viaje.

*FIN (de la asignatura, no del aprendizaje)*

---

## 🏆 Logro Final

| Logro | Cómo conseguirlo |
|---|---|
| 🎓 **Network Master** | Completar las 12 unidades y diagnosticar correctamente un fallo real en una red |
| 🏅 **Network Survivor** | Explicar el viaje completo de un paquete desde el origen hasta el destino |
| 🏅 **Cloud Ready** | Desplegar 2 contenedores y hacer que se comuniquen |

---

## ✅ Criterios de evaluación cubiertos

| Criterio | Cubierto |
|---|---|
| d) Frame Relay, RDSI, ADSL | ✅ Mencionado en contexto histórico |
| e) WiFi vs WiMax | ✅ En U10 |
| f) UMTS y HSDPA | ✅ Mencionado en U10 |
| **Ampliación:** Cloud, SDN, virtualización | ✅ Unidad completa |
| **Ampliación:** IPv8 y futuro | ✅ Análisis y debate |
