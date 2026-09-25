---
title: 7 — DHCP por VLAN
description: Reparte IPs automáticamente en cada VLAN y olvídate de configurar nada a mano 🤖
---

<p><small>Reparte IPs automáticamente en cada VLAN y olvídate de configurar nada a mano 🤖</small></p>

> 🗺️ **Estás en:** 🌉 **Trunking y enrutamiento inter-VLAN** → 7 · DHCP por VLAN

---

## 📬 La idea en una frase

> Cada VLAN es una **subred distinta** con su propio dominio de broadcast, así que cada una necesita su **propio pool DHCP**: con tres líneas por VLAN dejas de configurar IPs estáticas a mano en cada laboratorio.

En la [unidad de dirección IP](/ApuntesRedes/03-direccionamiento-ip/08-dhcp) ya montaste un pool DHCP y viste el baile DORA. La diferencia aquí es de escenario: con VLANs, el servidor DHCP está en una subred concreta y los PCs de **otras** VLANs mandan un DISCOVER que es **broadcast**… y el broadcast no cruza un router. Resolver eso es el trabajo de este punto.

> 💡 **Atajo pedagógico:** si el laboratorio tiene 6 PCs y tú tecleas 6 veces `ip address` + `subnet mask` + `default-router`, llevas media hora perdida. Con un pool por VLAN, cada PC encendida se configura sola. Por eso vemos DHCP aquí y no esperamos a la [unidad de servicios de red](/ApuntesRedes/10-servicios-red): **las VLANs sin DHCP convierten los prácticos en trámites de tecleo**.

---

## 🏗️ El montaje: un pool por subred

La regla es de sentido común: **un VLAN = una subred = un pool**. Con el router-on-a-stick del [punto 3](/ApuntesRedes/05-trunking-inter-vlan/03-inter-vlan-routing), los pools se crean en el propio router, que ya tiene la IP de cada VLAN en su subinterfaz:

```bash
Router(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.10
Router(config)# ip dhcp excluded-address 192.168.20.1 192.168.20.10

Router(config)# ip dhcp pool VENTAS
Router(dhcp-config)# network 192.168.10.0 255.255.255.0
Router(dhcp-config)# default-router 192.168.10.1
Router(dhcp-config)# dns-server 8.8.8.8 1.1.1.1

Router(config)# ip dhcp pool RRHH
Router(dhcp-config)# network 192.168.20.0 255.255.255.0
Router(dhcp-config)# default-router 192.168.20.1
Router(dhcp-config)# dns-server 8.8.8.8 1.1.1.1
```

Desgranando lo que importa:

| Comando | Qué aporta en un escenario con VLANs |
|---|---|
| `network 192.168.10.0/24` | **Debe coincidir exactamente** con la subred de esa VLAN |
| `default-router 192.168.10.1` | La IP de la subinterfaz/SVI de esa VLAN (su gateway) |
| `ip dhcp excluded-address` | Aparta el gateway y los servidores del reparto (¡nunca los cuentes!) |

> ⚠️ **CONRAD avisa:** el error clásico es copiar un pool y olvidar cambiar el `network`. Si el pool VENTAS reparte `192.168.20.x` en la VLAN 10, los PCs reciben una IP de la subred equivocada, su gateway no está en esa subnet y no salen ni a la puerta. **Subred del pool = subred de la VLAN = rango del excluded-address**, las tres lo mismo.

En un **switch de capa 3** ([punto 4](/ApuntesRedes/05-trunking-inter-vlan/04-switch-capa3)) el proceso es idéntico: mismo `ip dhcp pool`, misma `network`, y el `default-router` apunta a la SVI correspondiente. Solo cambia dónde vives: en lugar de subinterfaz, en la `interface vlan X`.

---

## 📡 DHCP relay: cuando el servidor está en otra VLAN

Si el servidor DHCP real vive en la VLAN 30 (servidores) y un PC de la VLAN 10 grita su DISCOVER, ese **broadcast se queda en la VLAN 10**: el router no reenvía broadcasts entre interfaces. El PC se queda sin respuesta y acaba en **APIPA** (169.254.x.x), que ya vimos en unidades anteriores.

La solución es que el router haga de **agente de reenvío** (*relay*): recibe el broadcast en una interfaz y lo reenvía **en unicast** al servidor:

```bash
Router(config)# interface fa0/0.10
Router(config-subif)# ip helper-address 192.168.30.10
```

Con eso, cualquier DISCOVER que entre por la subinterfaz `.10` se redirige al servidor `192.168.30.10`. Se pone **una línea por interfaz/subinterfaz/SVI** desde la que quieras alcanzar el servidor.

```text
PC VLAN 10                          Servidor VLAN 30
   │  DISCOVER (broadcast)              │
   ├──────────────────────────────────►│  (relay unicast)
   │                                   ├─ OFFER ─► PC
   │◄─ REQUEST ────────────────────────┤
   │◄─ ACK ────────────────────────────┤
```

> 💡 **Analogía del conserje:** el PC solo grita dentro de su pasillo (su VLAN). El relay es el administrador que oye el grito, cruza el edificio y se lo transmite al conserje (el servidor) por el pasillo de atrás, sin que nadie tenga que gritar en todos los pasillos.

---

## 🔍 Verificación

```bash
Router# show ip dhcp binding        # qué IPs ha repartido y a qué MAC
Router# show ip dhcp pool           # IPs usadas/libres y configuración del pool
Router# show ip dhcp server statistics   # contadores DORA (Discover recibidos…)
```

En los PCs, el flujo práctico en Packet Tracer: pon la IP en **DHCP** (`ipconfig /renew` en la simulación de comandos), espera unos segundos y comprueba con `ipconfig /all` que la IP, la máscara y el gateway son de **su** subred. Si sale `169.254.x.x`:

1. ¿Existe el pool con `network` correcto? (`show ip dhcp pool`)
2. ¿La interfaz del router de esa VLAN está UP/UP?
3. ¿El PC está en la VLAN correcta? (`show vlan brief` en el switch)
4. ¿El servidor está en otra VLAN sin `ip helper-address`? (el caso relay)

---

## 🔬 Wireshark en vivo: mira el DORA cruzar las VLANs

La captura de paquetes es la mejor forma de comprobar que el relay funciona. En Packet Tracer puedes capturar en la interfaz del router o usar Wireshark sobre una simulación real:

1. Abre una captura en la interfaz del router hacia la VLAN 10 (`fa0/0.10` o la SVI).
2. Filtro: `dhcp` (o `bootp` en versiones antiguas de Wireshark).
3. Reinicia la IP de un PC a DHCP y observa los cuatro mensajes: **DISCOVER → OFFER → REQUEST → ACK**.
4. Comprueba en el DISCOVER que la capa 2 está **etiquetada VLAN 10** y que, tras el relay, el mensaje sale hacia la VLAN 30 como unicast.
5. **Fallo típico para diagnosticar:** solo ves DISCOVER y nada más → el servidor no contesta (pool mal, helper ausente o servidor apagado). Ni siquiera DISCOVER → el PC no está en la VLAN correcta o el puerto está en shutdown.

Si en unidades anteriores capturaste el EtherType de una trama, aquí das un paso más: ahora ves **el mismo proceso DORA atravesando una frontera entre VLANs**.

---

## 🧠 Mini-chequeo

1. ¿Por qué un PC de la VLAN 10 no puede recibir OFFER de un servidor de la VLAN 30 sin ayuda del router?
2. En un pool por VLAN, ¿qué tres cosas deben coincidir siempre?
3. ¿Qué comando convierte al router en agente de reenvío y en qué interfaz se pone?

<details>
<summary>🔄 Respuestas</summary>

1. Porque el DISCOVER del PC es un **broadcast de capa 2** y cada VLAN es un dominio de broadcast cerrado: el router no reenvía broadcasts entre subinterfaces. Hace falta un `ip helper-address` (relay) que lo reenvíe en unicast al servidor.
2. La `network` del pool, la subred de esa VLAN (y el rango del `ip dhcp excluded-address`) y el `default-router` (que debe ser la IP de la subinterfaz/SVI de esa VLAN).
3. `ip helper-address <IP-del-servidor>`, puesto en la interfaz (o subinterfaz/SVI) desde la que los PCs van a pedir su IP.

</details>

---

## ✅ Resumen en 3 frases

- **Un VLAN = una subred = un pool DHCP** con `network`, `default-router` y sus IPs excluidas.
- El DISCOVER es broadcast y el broadcast **no cruza VLANs**: el router lo soluciona con `ip helper-address` (relay).
- El PC en APIPA (169.254.x.x) es la señal de que algo falla en la cadena pool → VLAN → relay, y con Wireshark se ve en qué eslabón.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Pool DHCP | Conjunto de IPs que un servidor reparte en una subred |
| `ip dhcp excluded-address` | Rango que DHCP nunca entrega (gateways, servidores) |
| DHCP relay / `ip helper-address` | El router reenvía el broadcast DHCP a otra red |
| APIPA | IP automática 169.254.0.0/16 cuando DHCP no responde |
| Binding | Registro de la IP asignada a una MAC (`show ip dhcp binding`) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/05-trunking-inter-vlan) · **Anterior:** [6 · Seguridad en VLANs](/ApuntesRedes/05-trunking-inter-vlan/06-seguridad-en-vlans) · **Siguiente:** [8 · Cierre](/ApuntesRedes/05-trunking-inter-vlan/08-cierre)
