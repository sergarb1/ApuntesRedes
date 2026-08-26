---
title: "09 — Cierre: consolida lo aprendido"
description: El broche final de la asignatura, con nube y futuro 🎬
---

<p><small>El broche final de la asignatura, con nube y futuro 🎬</small></p>

> 🗺️ **Estás en:** ☁️ U12 → 09 · Cierre

---

Has terminado la teoría. Este cierre es el aterrizaje: recorre todo lo aprendido con juegos, un laboratorio real con Docker y las preguntas que te harán en una entrevista. Y esta vez no es un cierre cualquiera: es el **cierre de la asignatura**. Has seguido al paquete desde que nace en un navegador (U01) hasta la nube y el futuro de Internet. Léelo justo después del [punto 8](/ApuntesRedes/12-cloud-virtualizacion-futuro/08-el-futuro-de-internet) y antes de abrir los boletines.

---

## ⭐ Sé la Nube

> *Eres un switch virtual en AWS. Tu trabajo es conectar instancias EC2 en una VPC. No tienes cables. No tienes LEDs. Eres 100% software.*

**Escenario:** Un desarrollador crea una nueva subred en la VPC. En 2 segundos, está operativa. Sin crimpar, sin racks, sin sudor.

**Pregunta:** ¿Qué ventajas tiene esto frente a una red física?

1. **Rapidez de provisión** → ✅ ¡Correcto! Una subred nueva en segundos, sin tocar un cable.
2. **Escalabilidad casi infinita** → ✅ También. Añadir recursos es clonar software.
3. **No necesitas comprar hardware** → ✅ Correcto, todo es infraestructura compartida.
4. **No necesitas conocimientos de redes** → ❌ ¡Falso! Los necesitas, y diferentes: subredes, rutas, ACLs, NAT. La nube no elimina el conocimiento, lo transforma.

> 💡 **La moraleja:** lo que has estudiado durante 11 unidades —subredes, routing, NAT, ACLs— sigue vigente en la nube. Solo cambia la interfaz: ahora lo escribes como configuración, no lo crimpas en un rack.

---

## 🔥 Fireside Chat: red tradicional vs SDN

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

**La lección:** CONRAD tiene razón. La nube es más rápida, más escalable y más barata... pero los errores se vuelven *lógicos*: una ruta mal puesta, un security group demasiado restrictivo, una ACL stateless que bloquea la respuesta. Todo lo aprendido en la asignatura te prepara para diagnosticar esos fallos.

---

## ⚡ Laboratorio de tortura: Docker Networking

> **Duración:** 1 hora
> **Herramientas:** Docker Desktop, terminal

**Escenario:** Crea 2 contenedores Docker y haz que se comuniquen.

```bash
# Crear red
docker network create mired

# Lanzar contenedores en la MISMA red
docker run -d --name c1 --network mired alpine sleep 3600
docker run -d --name c2 --network mired alpine sleep 3600

# Probar conectividad
docker exec c1 ping c2
```

**Tareas de verificación:**
a) ¿Funciona `docker exec c1 ping c2`? ¿Por qué funciona si no hay IPs escritas a mano? (Pista: Docker tiene **DNS interno** por nombre de contenedor.)
b) Ejecuta `docker network inspect mired`. ¿Qué IP tiene c1? ¿Y c2? ¿En qué subred están?
c) Lanza un tercer contenedor `c3` **sin** `--network mired`. ¿Puede c1 hacer ping a c3? ¿Por qué?
d) Ejecuta `docker network connect mired c3`. Ahora, ¿c1 y c3 se ven?

**Fallo intencionado:** Pon c1 en la red "mired" y c2 en la red "otrared" (crea primero `docker network create otrared`). ¿Pueden verse? **No.** Cada red Docker es un bridge aislado. Los contenedores en diferentes bridges no pueden comunicarse a menos que uses routing o los conectes a ambas redes.

> **Pista 1:** si el ping falla, mira primero si ambos contenedores están en la misma red con `docker network inspect`. El error "Name or service not known" del ping revela que el DNS interno no resuelve el nombre del otro contenedor: señal de que están en redes distintas.
>
> **Pista 2:** para el diagnóstico completo, entra en c1 con `docker exec -it c1 sh` y revisa sus interfaces con `ip a`: solo verás su `eth0` en el bridge de su red. Nada de tráfico cruzado entre bridges.

---

## 🏆 Logros Finales

| Logro | Cómo conseguirlo |
|---|---|
| 🎓 **Network Master** | Completar las 12 unidades y diagnosticar correctamente un fallo real en una red |
| 🏅 **Network Survivor** | Explicar el viaje completo de un paquete desde el origen hasta el destino |
| 🏅 **Cloud Ready** | Desplegar 2 contenedores y hacer que se comuniquen |
| 🏅 **SDN Explorer** | Explicar la diferencia entre plano de control y plano de datos |

---

## 🧠 Atrévete a pensar

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

## 🧩 Crucigrama de bits

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

## 💬 Preguntas de entrevista de trabajo

1. **"¿Cómo diseñarías la red para una aplicación cloud-native con microservicios?"**
2. **"¿Qué es SDN? Explica la diferencia entre plano de control y plano de datos."**
3. **"¿Cómo funciona el networking en Docker?"**
4. **"¿Crees que IPv6 es suficiente o necesitamos algo nuevo?"** (Pregunta de debate, no hay respuesta correcta)
5. **"Explica la diferencia entre IaaS, PaaS y SaaS con ejemplos."**

> 💡 **Cómo encararlas:** la 1 es la "pregunta reina": responde con VPC + subredes pública/privada, Security Groups por servicio, Internet Gateway para el front, NAT Gateway para el backend y balanceador. La 3: nombra los modos bridge/host/none/overlay. La 5: usa los ejemplos del punto 1 (EC2, Heroku, Gmail).

---

## 🤷 No hay preguntas tontas

> ❓ **¿Qué es realmente la nube?**

La nube es un conjunto de servidores, almacenamiento y recursos de red ubicados en centros de datos gestionados por proveedores como AWS, Azure o Google Cloud. Estos recursos se ofrecen bajo demanda a través de Internet. Aunque el término "nube" sugiere algo etéreo, la infraestructura física es real: cables de fibra, routers, switches y servidores como los que has estudiado en esta asignatura.

> ❓ **¿Por qué se usa el término "nube" si la infraestructura es física?**

El término "nube" se originó en los diagramas de red para representar una red compleja sin tener que dibujar todos sus componentes internos. Es una abstracción útil que simplifica la representación de infraestructuras extensas. Detrás de esa abstracción hay centros de datos reales con hardware físico, protocolos de routing y los mismos principios de redes que has aprendido.

> ❓ **¿Puedo aprender cloud sin saber redes tradicionales?**

Técnicamente sí, pero no lo hagas. Sin entender routing, subredes, DNS y firewalls, cometerás errores graves en cloud. La nube es redes tradicionales con otra interfaz. Aprende primero la base (estas 12 unidades) y luego especialízate en cloud.

---

## 🎬 Poscréditos Finales

> *El paquete ha completado su recorrido. Ha atravesado cables, switches, routers, NAT y cloud. Pero el aprendizaje continúa.*

**CONRAD:** — El viaje nunca termina. Cada día hay nuevas tecnologías, nuevos protocolos, nuevos fallos que diagnosticar. La red está viva. Mientras haya un bit que transmitir, habrá un paquete que viaje.

*FIN (de la asignatura, no del aprendizaje)*

---

## ✅ Criterios de evaluación cubiertos

| Criterio | Cubierto |
|---|---|
| d) Frame Relay, RDSI, ADSL | ✅ Mencionado en contexto histórico (punto 8) |
| e) WiFi vs WiMax | ✅ En U10 |
| f) UMTS y HSDPA | ✅ Mencionado en U10 |
| **Ampliación:** Cloud, SDN, virtualización | ✅ Unidad completa |
| **Ampliación:** IPv8 y futuro | ✅ Análisis y debate |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-cloud-virtualizacion-futuro) · **Anterior:** [08 · El futuro de Internet](/ApuntesRedes/12-cloud-virtualizacion-futuro/08-el-futuro-de-internet) · **Siguiente:** *(fin de la asignatura)*

**🏁 Fin del curso.**