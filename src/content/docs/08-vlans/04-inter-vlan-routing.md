---
title: 04 — Inter-VLAN routing
description: Cómo hacer que VLANs aisladas se hablen gracias a un router 🧭
---

<p><small>Cómo hacer que VLANs aisladas se hablen gracias a un router 🧭</small></p>

> 🗺️ **Estás en:** 🏢 **U08 · VLANs** → 04 · Inter-VLAN routing

---

## 📬 La idea en una frase

> Las VLANs aíslan en **capa 2**, pero los departamentos necesitan hablarse (el servidor de Ventas está en VLAN 10, el de RRHH en VLAN 20). La solución es el **inter-VLAN routing**: un router (o switch de capa 3) enruta el tráfico entre VLANs en **capa 3**.

En los puntos 1 y 3 conseguiste **aislar** el tráfico: Ventas no ve a RRHH. Pero una oficina real necesita que RRHH consulte la nómina del servidor de Ventas y que IT administre todo. Aislar sin un plan de interconexión es dispararte en el pie.

---

## 🧭 Por qué las VLANs "no se ven" y cómo se conectan

La regla de oro que repetimos en esta unidad: **el switch no reenvía tramas entre VLANs**. ¿Por qué? Porque el switch toma decisiones solo mirando la MAC (capa 2), y la MAC no tiene concepto de "VLAN 10 quiere hablar con VLAN 20". Cada VLAN es un dominio de broadcast cerrado.

La solución es que haya un **dispositivo de capa 3** en medio:

```
                    ┌─────────────┐
                    │   ROUTER    │
                    │ 10.1  20.1  │
                    └──────┬──────┘
                           │   [trunk 802.1Q]
                    ┌──────┴──────┐
                    │   SWITCH    │
              VLAN 10└──┐     ┌──┘VLAN 20
                  Ventas │     │ RRHH
```

Cuando el PC de Ventas quiere hablar con RRHH:
1. El tráfico hacia otra VLAN es **tráfico "hacia fuera"** → el PC lo manda a su **gateway** (la IP del router en esa VLAN).
2. El router recibe la trama etiquetada como VLAN 10, la **reencapsula** como VLAN 20 y la reenvía por el mismo cable.
3. El switch la entrega al PC de RRHH de la VLAN 20.

> 💡 **Analogía del pasaporte:** dentro de una VLAN eres un paquete que viaja "en región Schengen" (sin controles). Salir de tu VLAN es cruzar una frontera: necesitas una aduana (el router) que te selle el nuevo pasaporte (la etiqueta VLAN 20).

---

## 🍡 Router-on-a-stick: un router, muchos sombreros

La técnica clásica: **una sola interfaz física** del router atiende **todas** las VLANs. Sobre la interfaz física `Fa0/0` montas una **subinterfaz lógica por VLAN** (`.10`, `.20`, `.30`…), cada una con su etiqueta 802.1Q y su IP de gateway.

```
Router Fa0/0.10 → VLAN 10 (192.168.10.1/24)
Router Fa0/0.20 → VLAN 20 (192.168.20.1/24)
Router Fa0/0.30 → VLAN 30 (192.168.30.1/24)
         │
      [Trunk 802.1Q]
         │
      [Switch]
```

Ventajas: mínimo hardware (un puerto), fácil de entender y perfecto para redes pequeñas. Desventaja: **una sola interfaz es un cuello de botella** (todos los inter-VLAN atraviesan el mismo cable), algo que ataca el switch de capa 3 del punto 5.

---

## ⚙️ Configuración del router-on-a-stick en Cisco IOS

Paso a paso. Lo primero, la interfaz física activada:

```bash
Router(config)# interface fa0/0
Router(config-if)# no shutdown
```

Después, una subinterfaz por VLAN. El orden manda: primero la **encapsulación 802.1Q** (qué VLAN es) y luego la **IP de gateway**:

```bash
Router(config)# interface fa0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0

Router(config)# interface fa0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0

Router(config)# interface fa0/0.30
Router(config-subif)# encapsulation dot1Q 30
Router(config-subif)# ip address 192.168.30.1 255.255.255.0
```

| Comando | Qué hace |
|---|---|
| `interface fa0/0.10` | Crea la subinterfaz lógica `.10` |
| `encapsulation dot1Q 10` | Etiqueta toda la subinterfaz con la VLAN 10 |
| `ip address ...` | El gateway de esa VLAN (la IP a la que apunta el PC) |
| `no shutdown` | Activa la **interfaz física** (¡no vale solo con las subinterfaces!) |

> ⚠️ **CONRAD avisa:** dos fallos que hunden medio examen. Primero, olvidar `no shutdown` en la interfaz física: las subinterfaces están "muertas" sin ella. Segundo, cambiar el orden y poner la IP antes que `encapsulation dot1Q`: el router la rechaza o la asocia mal.

---

## 🤝 El destino de las tramas: el gateway de cada PC

Para que todo funcione, **cada PC debe tener como gateway la IP de su subinterfaz**:

| VLAN | Subred | Gateway (router) |
|---|---|---|
| 10 Ventas | 192.168.10.0/24 | 192.168.10.1 (`Fa0/0.10`) |
| 20 RRHH | 192.168.20.0/24 | 192.168.20.1 (`Fa0/0.20`) |
| 30 IT | 192.168.30.0/24 | 192.168.30.1 (`Fa0/0.30`) |

Si un PC de Ventas tiene como gateway `192.168.10.1` pero el router no tiene subinterfaz `.10` con `encapsulation dot1Q 10`, el tráfico sale de la VLAN y no encuentra puerta. **El gateway y la etiqueta dot1Q deben corresponder exactamente.**

---

## 🔍 Verificación

```bash
Router# show ip interface brief        # subinterfaces UP/UP y sus IPs
Router# show ip route                  # las rutas conectadas 192.168.10.0/24, 20.0/24, 30.0/24
```

En el switch, el puerto hacia el router debe ser trunk: `switchport mode trunk` (o `switchport trunk allowed vlan 10,20,30`). Y para probar la conectividad, `ping` desde un PC de VLAN 10 a otro de VLAN 20: debe responder atravesando el router.

---

## 🧠 Mini-chequeo

1. ¿Por qué un switch "normal" no reenvía tráfico entre dos VLANs?
2. Dibuja el flujo de una trama del PC de Ventas (VLAN 10) al de RRHH (VLAN 20) en un router-on-a-stick.
3. ¿Qué dos comandos (en ese orden) configuran la subinterfaz de la VLAN 10?

<details>
<summary>🔄 Respuestas</summary>

1. Porque el switch trabaja en **capa 2** mirando solo MACs, y las MACs no transportan "de qué VLAN viene ni a dónde va". Cada VLAN es un dominio cerrado; cruzar entre VLANs exige un dispositivo de **capa 3** que reencapsule con la nueva etiqueta.
2. PC(VLAN 10) → trama con etiqueta 10 al trunk → llega a la subinterfaz `.10` del router → el router decide reenviarlo hacia VLAN 20 → lo vuelve a etiquetar como 20 → sale por el trunk → el switch lo entrega al PC de RRHH.
3. `encapsulation dot1Q 10` y después `ip address 192.168.10.1 255.255.255.0` (en ese orden).

</details>

---

## ✅ Resumen en 3 frases

- Las VLANs aíslan en **capa 2**; el **inter-VLAN routing** las conecta en **capa 3**.
- El **router-on-a-stick** usa una sola interfaz física dividida en **subinterfaces** (una por VLAN) con `encapsulation dot1Q`.
- Cada PC apunta a su gateway (la subinterfaz) y todo el tráfico entre VLANs atraviesa la misma interfaz: su cuello de botella.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Inter-VLAN routing | Enrutar tráfico entre VLANs con capa 3 |
| Subinterfaz | Interfaz lógica sobre una física, una por VLAN (`.10`, `.20`…) |
| `encapsulation dot1Q 10` | Etiqueta la subinterfaz con la VLAN 10 |
| Gateway | La IP que el PC usa para "huir" hacia otra subnet |
| Router-on-a-stick | Técnica con una interfaz física y varias subinterfaces |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/08-vlans) · **Anterior:** [03 · Trunks y 802.1Q](/ApuntesRedes/08-vlans/03-trunks-y-8021q) · **Siguiente:** [05 · Switch capa 3 y SVIs](/ApuntesRedes/08-vlans/05-switch-capa3)