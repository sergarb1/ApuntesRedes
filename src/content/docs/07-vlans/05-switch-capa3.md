---
title: 05 — Switch capa 3 y SVIs
description: Routing a velocidad de hardware dentro del propio switch ⚡
---

<p><small>Routing a velocidad de hardware dentro del propio switch ⚡</small></p>

> 🗺️ **Estás en:** 🏢 **U07 · VLANs** → 05 · Switch capa 3 y SVIs

---

## 📬 La idea en una frase

> Un **switch de capa 3** (multicapa) puede enrutar entre VLANs **sin router externo**: crea una interfaz virtual por VLAN llamada **SVI** (*Switch Virtual Interface*) y activa `ip routing`. El resultado es routing a **velocidad de hardware**, sin el cuello de botella del router-on-a-stick.

En el punto 4 el router-on-a-stick hacía todo el trabajo de capa 3, pero toda la oficina se aferraba a una sola interfaz. En redes con cientos de usuarios eso cruje. Aquí llega la alternativa de los campus modernos: el propio switch se convierte en router.

---

## 🧠 Las dos caras de un switch capa 3

Un switch multicapa (como un 3560 o un 3650) hace dos trabajos en el mismo aparato:

| Función | Qué hace | Cómo lo hace |
|---|---|---|
| **Switch (capa 2)** | Reenvía tramas entre puertos de la misma VLAN | Hardware de forwarding por MAC |
| **Router (capa 3)** | Reenvía paquetes entre VLANs e IPs | Hardware de forwarding por IP (ASIC) |

La clave está en que **ambos hacen forwarding en hardware**: el *routing* no pasa por la CPU ni por un cable externo, así que el rendimiento es brutal comparado con un router-on-a-stick de una interfaz.

> 💡 **Razonamiento de fondo:** el cuello de botella del punto 4 no era el router en sí, era la **interfaz única** por la que pasaba TODO. El switch de capa 3 enruta internamente, sin ningún cable físico entre VLANs: cada VLAN "se conecta" a una interfaz virtual interna.

---

## 🧮 SVI: la interfaz virtual de una VLAN

Un **SVI** es una interfaz lógica asociada a una VLAN entera. Es la "puerta de enlace" de esa VLAN dentro del switch. Todas las VLANs que quieras rutear necesitan su propio `interface vlan`.

Ejemplo con tres VLANs de la oficina (10 Ventas, 20 RRHH, 30 IT), cada una con su subred:

```bash
Switch(config)# vlan 10
Switch(config-vlan)# name Ventas
Switch(config)# vlan 20
Switch(config-vlan)# name RRHH
Switch(config)# vlan 30
Switch(config-vlan)# name IT
```

Activar el routing global una vez:

```bash
Switch(config)# ip routing
```

Y crear un SVI por VLAN:

```bash
Switch(config)# interface vlan 10
Switch(config-if)# ip address 192.168.10.1 255.255.255.0
Switch(config-if)# no shutdown

Switch(config)# interface vlan 20
Switch(config-if)# ip address 192.168.20.1 255.255.255.0
Switch(config-if)# no shutdown

Switch(config)# interface vlan 30
Switch(config-if)# ip address 192.168.30.1 255.255.255.0
Switch(config-if)# no shutdown
```

| Comando | Efecto |
|---|---|
| `ip routing` | Enciende el motor de enrutamiento del switch (sin él, los SVIs no rutearán entre sí) |
| `interface vlan 10` | Crea/entra en el SVI de la VLAN 10 |
| `ip address ...` | El gateway de esa VLAN (misma IP que en el router-on-a-stick) |
| `no shutdown` | Levanta el SVI (recuerda: si la VLAN no tiene ningún puerto UP, el SVI puede quedarse down/down) |

> ⚠️ **Trampa clásica:** sin `ip routing`, los SVIs están *up/up* pero **NO enrutan** entre VLANs. Es el fallo número uno en el laboratorio: gente configurando `interface vlan` de memoria y olvidando la única línea que hace virguerías.

---

## ⚖️ Switch capa 3 vs router-on-a-stick

¿Cuándo usar cada uno? La tabla que te piden en cualquier entrevista:

| Aspecto | Router-on-a-stick | Switch capa 3 (SVIs) |
|---|---|---|
| Hardware extra | Un router (o el del laboratorio) | Ninguno (el switch lo hace) |
| Rendimiento | Limitado por la interfaz única (cuello de botella) | Routing en hardware, sin cuello de botella |
| Nº de VLANs | 2-6 con comodidad; más, se satura | Decenas o cientos sin problema |
| Complejidad | Subinterfaces `dot1Q` por VLAN | `ip routing` + `interface vlan` por VLAN |
| Ideal para | Oficinas pequeñas, laboratorios, pruebas | Campus, core de red, oficinas con jaleo |
| Coste | Depende del router | El switch capa 3 es más caro que uno plano |

> 💡 **CONRAD resume:** "¿Una oficina de 15 personas? Router-on-a-stick y listo. ¿Un campus con mil usuarios? Switch capa 3 en el core. El router-on-a-stick con FastEthernet se ahoga cuando 4 VLANs generan 120 Mbps por una única interfaz de 100 Mbps: sube a Gigabit o pásate a SVIs."

---

## 🔌 Para qué más sirve un switch capa 3: la gestión

El SVI de la VLAN de gestión es donde pones la IP del switch para administrarlo. Este truco lo verás también en el punto 8:

```bash
Switch(config)# interface vlan 999
Switch(config-if)# ip address 10.0.99.2 255.255.255.0
Switch(config-if)# no shutdown
Switch(config)# ip default-gateway 10.0.99.1   # solo switch capa 2 (los capa 3 rutear por rutas conectadas)
```

Y como bonus, un switch capa 3 te permite **rutas estáticas o dinámicas hacia otros routers** (lo que enlaza con la U08): puedes anunciar varias subredes y conectar el campus a Internet. Por eso los switches capa 3 modernos han jubilado al router en muchas redes de distribución.

---

## 🧠 Mini-chequeo

1. ¿Qué dos líneas son imprescindibles para enrutar entre VLANs con un switch capa 3?
2. ¿Por qué los SVIs no tienen el problema de cuello de botella del router-on-a-stick?
3. ¿Cuándo elegirías router-on-a-stick y cuándo un switch capa 3?

<details>
<summary>🔄 Respuestas</summary>

1. `ip routing` (enciende el enrutamiento) y un `interface vlan X` con su `ip address` por cada VLAN. Sin `ip routing` los SVIs no enrutan entre sí.
2. Porque el switch capa 3 enruta **en el propio hardware** (ASIC) internamente, sin pasar por un único cable físico. No hay ni una interfaz física que se sature.
3. **Router-on-a-stick** en oficinas pequeñas/laboratorios con pocas VLANs y poco tráfico; **switch capa 3** en campus o redes con muchas VLANs y tráfico intenso entre ellas (el cuello de botella del router es inaceptable).

</details>

---

## ✅ Resumen en 3 frases

- Un **switch capa 3** enruta entre VLANs mediante **SVIs** (`interface vlan X`) con `ip routing` activado.
- El routing ocurre **en hardware**, sin el cuello de botella de una sola interfaz del router-on-a-stick.
- Úsalo cuando el número de VLANs o el tráfico entre ellas sea grande; el router-on-a-stick basta para oficinas pequeñas.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Switch capa 3 | Switch multicapa que además enruta (IP) |
| SVI | Interfaz virtual de una VLAN (gateway interno) |
| `ip routing` | Comando que activa el enrutamiento del switch |
| ASIC | Hardware del switch que reenvía a velocidad de línea |
| Cuello de botella | Interfaz única por la que pasa todo el tráfico inter-VLAN |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/07-vlans) · **Anterior:** [04 · Inter-VLAN routing](/ApuntesRedes/07-vlans/04-inter-vlan-routing) · **Siguiente:** [06 · VTP y DTP](/ApuntesRedes/07-vlans/06-vtp-y-dtp)