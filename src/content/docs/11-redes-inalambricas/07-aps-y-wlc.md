---
title: 07 — APs y controladores
description: Autónomos, ligeros y el cerebro que los dirige 🧠
---

<p><small>Autónomos, ligeros y el cerebro que los dirige 🧠</small></p>

> 🗺️ **Estás en:** 📶 **Redes inalámbricas** → 07 · APs y controladores

---

## 📬 La idea en una frase

> Un AP **autónomo** decide todo por sí mismo (y se configura uno por uno); un AP **lightweight** solo hace radio y obedece a un **controlador (WLC)** que centraliza configuración, roaming y seguridad: con tres APs da igual, con treinta es la diferencia entre una red y un zoológico.

---

## 🧍 Autónomo: el AP que se apaña solo

El AP autónomo (autonomous) es un equipo completo: configuración local, SSIDs locales, VLANs locales, seguridad local. Se gestiona por web o por CLI, uno a uno.

| Ventaja | Inconveniente |
|---|---|
| Barato y sencillo; no necesita nada más | Configuración repetida en cada AP |
| Perfecto para 1-5 APs, PYMEs, casas | Roaming entre APs "a lo bestia" (decide el cliente) |
| No hay punto único de fallo central | Sin visión global: canales y potencias a mano |

Configurar 10 autónomos = repetir 10 veces el mismo trabajo y rezar para no equivocarte en el 7º. Para eso nació el modelo controlado.

---

## 🧠 Lightweight: el AP como periférico de radio

En el modelo lightweight, el AP se "vacía": mantiene la parte física (radio, beacons, cifrado de tramas) y delega la gestión en un **WLC** (*Wireless LAN Controller*):

```
        CLIENTES WiFi
             │
   ┌─────────┴─────────┐
   │  AP lightweight   │  ← solo radio: beacons, asociaciones, cifrado
   └─────────┬─────────┘
             │ túnel CAPWAP (encapsulado, puede cruzar la red)
   ┌─────────┴─────────┐
   │        WLC        │  ← cerebro: SSIDs, VLANs, seguridad, RRM, roaming
   └─────────┬─────────┘
             │
        Red cableada
```

El túnel **CAPWAP** encapsula el tráfico de gestión (y, en modo central, el de datos) entre AP y WLC. Beneficios del modelo:

- **Configuración única:** defines SSIDs y políticas en el WLC y todos los APs las heredan.
- **RRM automático:** el WLC ajusta canales y potencias de toda la flota.
- **Roaming fluido:** el controlador coordina el paso de cliente entre APs (clave en voz/vídeo).
- **Seguridad centralizada:** 802.1X, listas de clientes, trap/alertas desde un solo sitio.

| | Autónomo | Lightweight + WLC |
|---|---|---|
| Gestión | Una a una | Centralizada |
| Roaming | Solo cliente | Coordinado (k/r/v) |
| Canales/potencias | Manuales | RRM automático |
| Coste inicial | Bajo | WLC (hardware o virtual) |
| Escala recomendada | ≤ ~5-10 APs | Decenas a miles |

> 💡 **El WLC ya no es siempre una caja:** además del WLC físico existe el **vWLC** (máquina virtual) y el modelo **cloud/ embedded** (el "controlador" vive en un AP o en la nube del fabricante, como UniFi o Meraki). El concepto manda: configuración central, APs ligeros.

---

## 🏗️ Integración con la red cableada: el trunk manda

Recuerda la [unidad de trunking e inter-VLAN](/ApuntesRedes/05-trunking-inter-vlan): un AP con varios SSIDs necesita un **trunk** hasta el switch, porque cada SSID vive en su VLAN:

```
Switch(config)# interface gigabitEthernet 1/0/24
Switch(config-if)# description AP-Aula-1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,99
```

- SSID "CORP" → VLAN 10, SSID "PROYECTORES" → VLAN 20, SSID "INVITADOS" → VLAN 99.
- El AP etiqueta el tráfico de cada SSID; el switch lo transporta por el trunk.
- Sin trunk (modo access), solo puedes servir un SSID/VLAN por puerto.

El AP también necesita **alimentación**: PoE (802.3af/at) es lo normal en despliegues profesionales — un cable, red y corriente — y evita chapuzas de enchufes en el techo.

---

## 🔍 Verificación y diagnóstico en Packet Tracer

Packet Tracer incluye APs domésticos/autónomos (AccessPoint-PT y el módulo WiFi de routers domésticos) y desde hace unas versiones un **WLC con APs lightweight** para practicar el modelo controlado:

| Comando/prueba | Qué aporta |
|---|---|
| `show dot11 associations` (AP autónomo) | Clientes asociados, RSSI por cliente |
| Interfaz web del AP: pestaña Wireless | SSIDs, seguridad, canal, potencia |
| Consola del WLC: `show wlan summary` | SSIDs definidos y su estado |
| Consola del WLC: `show ap summary` | APs registrados, modelo, banda |
| `debug capwap` (WLC real) | Registro/desregistro de APs |

Flujo típico de fallo: AP lightweight "no aparece en el WLC" → revisa que el AP reciba IP (¡DHCP con opción 43 o DNS para descubrir el WLC!), que el switch tenga el puerto trunk correcto y que versión de AP/controlador sea compatible.

---

## 🧠 Mini-chequeo

1. ¿Qué parte del trabajo conserva un AP lightweight y qué parte delega en el WLC?
2. Un centro tiene 25 APs autónomos y quieren roaming fluido y gestión centralizada. ¿Qué propones?
3. ¿Por qué el puerto del switch hacia un AP con 3 SSIDs debe ser trunk?
4. Un AP lightweight recién enchufado no aparece en el WLC. ¿Qué tres cosas revisas primero?

<details>
<summary>🔄 Respuestas</summary>

1. Conserva la **radio**: beacons, asociación de clientes y cifrado en el aire. Delega al WLC la configuración de SSIDs/VLANs, políticas, RRM (canales/potencias), roaming y seguridad centralizada.
2. Migrar a **lightweight + WLC** (físico, virtual o cloud según presupuesto): gestión central, RRM y roaming coordinado 802.11k/r/v.
3. Porque cada SSID va etiquetado a su **VLAN** distinta; un puerto access solo transporta una VLAN, y el AP necesita que el switch transporte las tres (trunk con VLANs permitidas).
4. Que el AP tenga **IP** (DHCP o estática), que el **descubrimiento del WLC** funcione (opción 43 de DHCP, DNS, o modo local) y que el puerto del switch/trunk y la compatibilidad de versión sean correctos.
</details>

---

## ✅ Resumen en 3 frases

- **Autónomo** = todo local, viable hasta ~5-10 APs; **lightweight** = radio local + cerebro central (WLC) vía CAPWAP.
- El WLC da configuración única, RRM, roaming coordinado y seguridad centralizada: escala o zoológico.
- En el cable, un AP multissid exige **trunk** (una VLAN por SSID) y, en profesional, **PoE** para no colgar enchufes del techo.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| AP autónomo | Equipo completo con configuración local |
| Lightweight | AP de solo radio, controlado por un WLC |
| WLC | Controlador WLAN: cerebro de la flota |
| CAPWAP | Túnel de control/datos entre AP y WLC |
| RRM | Ajuste automático de canales y potencias |
| PoE | Alimentación por el cable Ethernet |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-redes-inalambricas) · **Anterior:** [06 · Seguridad WLAN](/ApuntesRedes/11-redes-inalambricas/06-seguridad-wlan) · **Siguiente:** [08 · Configuración y verificación](/ApuntesRedes/11-redes-inalambricas/08-configuracion-wlan)
