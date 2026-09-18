---
title: 08 — Configuración y verificación
description: Manos al aire, con cable de red debajo 🛠️
---

<p><small>Manos al aire, con cable de red debajo 🛠️</small></p>

> 🗺️ **Estás en:** 📶 **UD11 · Redes inalámbricas** → 08 · Configuración y verificación

---

## 📬 La idea en una frase

> Configurar una WLAN en Packet Tracer es el mismo trabajo que en la vida real en miniatura: definir SSID y seguridad en el AP, integrarlo en VLANs con trunk, dar salida por el router y verificar con clientes reales (portátiles con adaptador WPC300N, smartphones…) que todo funciona.

---

## 🧪 Escenario base en Packet Tracer

Topología mínima completa:

```
[Router 2911]──[Switch 2960]──┬──[AP Home/PT]   (VLAN 10 y 99 vía trunk)
                              ├──[PC-1]         (VLAN 10, cable)
                              └──[Laptop-1]     (WiFi, adaptador inalámbrico)
```

Objetivo: dos SSIDs — `CORP` (VLAN 10, WPA2-PSK) e `INVITADOS` (VLAN 99, WPA2-PSK distinta, aislada) — con DHCP desde el router para ambas VLANs.

### Paso 1: el router, gateway y DHCP

```
Router(config)# interface gigabitEthernet 0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
Router(config)# interface gigabitEthernet 0/0.99
Router(config-subif)# encapsulation dot1Q 99
Router(config-subif)# ip address 192.168.99.1 255.255.255.0
Router(config)# ip dhcp pool VLAN10
Router(dhcp-config)# network 192.168.10.0 255.255.255.0
Router(dhcp-config)# default-router 192.168.10.1
Router(config)# ip dhcp pool VLAN99
Router(dhcp-config)# network 192.168.99.0 255.255.255.0
Router(dhcp-config)# default-router 192.168.99.1
```

### Paso 2: el switch, trunk hacia el AP

```
Switch(config)# interface fastEthernet 0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,99
```

### Paso 3: el AP, SSIDs y seguridad

En el AP doméstico (Home Wireless), pestaña Config → Wireless:

| Parámetro | CORP | INVITADOS |
|---|---|---|
| Network Name (SSID) | CORP | INVITADOS |
| Banda / canal | 2,4 GHz / canal 1 | 2,4 GHz / canal 11 |
| Seguridad | WPA2-PSK con AES | WPA2-PSK con AES |
| Frase | Cl4veC0rp2026 | bienv3nido2026 |

En APs con varias SSIDs se asigna cada SSID a su VLAN en la configuración; en los AP domésticos de Packet Tracer trabaja con una SSID principal, así que para el laboratorio multissid usa un AP profesional o dos APs (uno por SSID/VLAN), conectando cada uno a un puerto access de su VLAN.

> ⚠️ **Detalle clásico del laboratorio:** el portátil no trae antena inalámbrica por defecto. Apágalo (botón de encendido), cambia el módulo por un **WPC300N** y vuelve a encenderlo. El "no ve redes" de principiante casi siempre es eso.

### Paso 4: clientes y verificación

En la Laptop-1 → Desktop → PC Wireless:

1. Busca redes: deben aparecer `CORP` e `INVITADOS`.
2. Conecta a `CORP` con su frase → pestaña **Link Information**: señal y velocidad.
3. Desktop → Command Prompt: `ipconfig` → IP 192.168.10.x y gateway .1 entregados por DHCP.
4. `ping 192.168.10.1` → OK. Y desde PC-1 (cable, VLAN 10) `ping 192.168.10.50` → OK.
5. Repite con `INVITADOS` → IP 192.168.99.x. Y ahora `ping 192.168.10.50` → **debe fallar** (aislamiento entre VLANs, sin ruta o con ACL de la UD8).

---

## 🛠️ En un AP profesional (la idea que debes llevarte)

Aunque Packet Tracer simplifica, en un AP autónomo real (o en el módulo WLAN de un router IOS) el flujo es equivalente:

```
AP(config)# dot11 ssid CORP
AP(config-ssid)# vlan 10
AP(config-ssid)# authentication open
AP(config-ssid)# authentication key-management wpa version 2
AP(config-ssid)# guest-mode
AP(config)# interface dot11Radio 0
AP(config-if)# ssid CORP
AP(config-if)# channel 1
AP(config-if)# power local 50       ← potencia moderada
AP(config-subif)# encapsulation dot1Q 10
```

La estructura mental: **SSID → VLAN → subinterfaz radio + subinterfaz Ethernet**, el mismo patrón "router-on-a-stick" de la UD5, pero con radio.

---

## 🔍 Verificación y diagnóstico WLAN

| Comando/prueba | Dónde | Qué aporta |
|---|---|---|
| `show dot11 associations` | AP autónomo | Clientes asociados, RSSI, tiempo de conexión |
| `show interfaces dot11Radio 0` | AP | Canal, potencia, contadores de errores |
| PC Wireless → Link Information | Cliente | Señal, velocidad, calidad |
| `ipconfig /all` | Cliente | ¿Recibió IP por DHCP? ¿Gateway correcto? |
| `ping gateway` | Cliente | ¿Llega al router? |
| WiFi analyzer (móvil/laptop) | In situ | Canales en uso, redes vecinas, ruido |

Fallos típicos y su escalera:

1. Cliente "no ve la red" → SSID mal escrito, AP apagado, adaptador del cliente sin activar (o módulo inexistente).
2. Ve la red pero no conecta → frase/seguridad incorrecta (WPA2 vs WPA3, AES vs TKIP) o MAC filtrada.
3. Conecta pero sin IP → el SSID no está mapeado a su VLAN, el trunk del switch no permite esa VLAN o el pool DHCP no existe.
4. IP correcta pero "no navega" → gateway/ACL (recuerda la escalera de la UD10).

---

## 🤬 CONRAD VS EL MUNDO: "El WiFi no funciona, lo he reiniciado tres veces"

**Usuario:** — El WiFi de la sala no funciona. He reiniciado el AP tres veces. Nada.

**CONRAD:** — Tres veces el mismo error no es persistencia, es terquedad. ¿El cliente *ve* la red? ¿Conecta? ¿Tiene IP? ¿Pinge el gateway? ¿Resuelve nombres? Cinco preguntas, cinco escalones, y cada uno te dice en qué capa vives.

**CONRAD:** — Pero no, reiniciar y mirar las barras. Las barras. Contigo… Bueno, al menos dime que apuntaste si el problema es de un solo cliente o de todos. ¿No? Espectacular: arrancamos de cero.

**La lección:** "no funciona el WiFi" no es un dato. Cliente por cliente (¿uno o todos?), escalón por escalón (¿ve, conecta, IP, gateway, nombres?): el diagnóstico WLAN usa la misma escalera que toda tu vida como administrador.

---

## 🧠 Mini-chequeo

1. ¿Qué tres configuraciones separan a un SSID de otro en un AP profesional?
2. En el laboratorio, el cliente conecta a `CORP` pero recibe IP 192.168.99.x. ¿Qué se cruzó?
3. ¿Por qué conviene poner `INVITADOS` en el canal 11 si `CORP` está en el 1?
4. Cita la escalera de diagnóstico WLAN completa.

<details>
<summary>🔄 Respuestas</summary>

1. **SSID** (nombre), **VLAN** (a qué red cableada puentea) y **seguridad** (WPA2/WPA3, PSK o Enterprise, frase/credenciales).
2. El mapeo SSID→VLAN: `CORP` está etiquetando tráfico a la VLAN 99 (o el trunk/switch mapea el puerto a la VLAN equivocada). Revisa encapsulación dot1Q en AP/switch y el pool del que sale la IP.
3. Por el mismo plan de canales de la UD5 del aire: dos radios del mismo AP (o APs vecinos) en el mismo canal se pisarían; 1 y 11 no solapan.
4. ¿Ve la red? → ¿Conecta (seguridad)? → ¿IP (DHCP/VLAN)? → ¿Ping gateway? → ¿Nombres (DNS)? Un escalón por vez, sin saltar.
</details>

---

## ✅ Resumen en 3 frases

- La receta WLAN: **SSID → VLAN → seguridad → trunk → DHCP → verificación con cliente real**.
- El patrón interno es router-on-a-stick con radio: subinterfaces dot1Q por SSID/VLAN.
- El diagnóstico WLAN reutiliza la escalera universal: ¿ve, conecta, IP, gateway, nombres?

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| WPC300N | Adaptador inalámbrico de laptop en Packet Tracer |
| guest-mode | SSID difundido en beacon (visible) |
| Subinterfaz radio | Equivalente "por el aire" del router-on-a-stick |
| WiFi analyzer | App de medición de canales y señal |
| Aislamiento de clientes | Que invitados no se vean entre sí |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-redes-inalambricas) · **Anterior:** [07 · APs y controladores](/ApuntesRedes/11-redes-inalambricas/07-aps-y-wlc) · **Siguiente:** [09 · Cierre](/ApuntesRedes/11-redes-inalambricas/09-cierre)
