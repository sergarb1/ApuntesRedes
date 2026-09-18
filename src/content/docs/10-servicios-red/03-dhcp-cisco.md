---
title: 03 — DHCP en Cisco y el agente de reenvío
description: Un pool, unas exclusiones y un helper 🧰
---

<p><small>Un pool, unas exclusiones y un helper 🧰</small></p>

> 🗺️ **Estás en:** 🗄️ **UD10 · Servicios de red: DHCP, DNS y NTP** → 03 · DHCP en Cisco y el agente de reenvío

---

## 📬 La idea en una frase

> Un router Cisco puede hacer de servidor DHCP con un puñado de comandos, y cuando el servidor vive en otra subred, el router local hace de **agente de reenvío** con `ip helper-address`: convierte broadcasts en unicast para que el DORA cruce el router.

---

## 🧰 Servidor DHCP básico en IOS

Escenario: el router es el gateway de la red 192.168.1.0/24 y reparte direcciones del rango .100 al .200, dejando los números bajos para equipos con IP fija.

```
Router> enable
Router# configure terminal
Router(config)# ip dhcp excluded-address 192.168.1.1 192.168.1.99
Router(config)# ip dhcp excluded-address 192.168.1.201 192.168.1.254
Router(config)# ip dhcp pool LAN-1
Router(dhcp-config)# network 192.168.1.0 255.255.255.0
Router(dhcp-config)# default-router 192.168.1.1
Router(dhcp-config)# dns-server 192.168.1.10
Router(dhcp-config)# domain-name empresa.local
Router(dhcp-config)# lease 1 12        ← 1 día y 12 horas
Router(dhcp-config)# end
```

Qué es cada pieza:

| Comando | Para qué |
|---|---|
| `ip dhcp excluded-address a b` | Reserva un rango: el servidor nunca ofrecerá esas IPs |
| `ip dhcp pool NOMBRE` | Crea el pool (el "bolso" de direcciones) y entra en su configuración |
| `network` | La subred y máscara desde la que se sacan las direcciones |
| `default-router` | Opción 3: el gateway que entregará a los clientes |
| `dns-server` | Opción 6: los servidores DNS |
| `domain-name` | Opción 15: el sufijo DNS |
| `lease` | Duración de la concesión (días [horas [minutos]]) |

> ⚠️ **Orden importa poco, coherencia importa mucho:** si el `default-router` no es una IP del propio router, los clientes tendrán dirección pero no saldrán a otras redes. Es el fallo clásico de laboratorio.

### Reservas por MAC (asignación manual)

```
Router(config)# ip dhcp pool IMPRESORA-FLOT
Router(dhcp-config)# host 192.168.1.50 255.255.255.0
Router(dhcp-config)# client-identifier 01aa.bbcc.ddee.ff
Router(dhcp-config)# default-router 192.168.1.1
```

El `client-identifier` empieza por `01` + la MAC (formato especial de Cisco). En Packet Tracer suele bastar con la MAC tal cual. Ojo: si la IP reservada cae dentro del rango del pool general, exclúyela también o puede haber conflicto.

---

## 📡 El problema: DHCP no cruza routers

Recuerda del [punto 2](/ApuntesRedes/10-servicios-red/02-dhcp): Discover y Request son **broadcasts**. Y los routers **no reenvían broadcasts**. Consecuencia: un servidor DHCP en la central no puede servir directamente a una sucursal al otro lado de un enlace WAN.

La solución no es "permitir broadcasts" (sería un agujero), sino un intermediario: el **agente de reenvío** (*DHCP relay agent*). Se configura en el router de la red del cliente:

```
Router-Sucursal(config)# interface gigabitEthernet 0/0
Router-Sucursal(config-if)# ip helper-address 10.0.0.5
```

Con esa línea, cuando el router recibe un broadcast DHCP en Gi0/0, lo **encapsula en un unicast** hacia 10.0.0.5 (el servidor central), indicando en qué subred se originó. El servidor responde también en unicast, y el router entrega la respuesta al cliente.

```
CLIENTE                    ROUTER SUCURSAL                SERVIDOR 10.0.0.5
   |                             |                              |
   |─ DISCOVER (broadcast) ─────►|                              |
   |                             |─ unicast DISCOVER ──────────►|
   |                             |  (con subred de origen)      |
   |                             |◄─ unicast OFFER ─────────────|
   |◄─ OFFER ────────────────────|                              |
   |─ REQUEST (broadcast) ──────►|   … y así hasta el ACK       |
```

> 💡 **`ip helper-address` no es solo DHCP:** reenvía por defecto otros broadcasts útiles (TFTP, DNS antiguo, NetBIOS, TFTP…). Si quieres afinar, existe `ip forward-protocol` para elegir qué dejar pasar.

---

## 🏗️ Dos pools, dos subredes: el mismo router, el mismo proceso

Un router puede servir varias subredes a la vez. La regla: el cliente recibe dirección del pool **cuya red coincide con la interfaz por la que llegó su Discover**. Con helper, coincide con la subred indicada por el agente.

```
ip dhcp pool VLAN10-VENTAS
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
ip dhcp pool VLAN20-RRHH
 network 192.168.20.0 255.255.255.0
 default-router 192.168.20.1
```

Con los SVIs de la [UD5](/ApuntesRedes/05-trunking-inter-vlan) configurados (192.168.10.1 y 192.168.20.1 en el switch capa 3), cada VLAN recibirá direcciones de su pool automáticamente. Recuerda que si el DHCP server está fuera, cada SVI necesita su `ip helper-address`.

---

## 🔍 Verificación y depuración

| Comando | Qué te cuenta |
|---|---|
| `show ip dhcp binding` | Concesiones activas: MAC → IP, fecha de expiración |
| `show ip dhcp pool` | Uso de cada pool: direcciones ofrecidas, Solicitado, expiradas |
| `show ip dhcp conflict` | Conflictos detectados (dos equipos con la misma IP) |
| `debug ip dhcp server events` | El DORA en vivo (¡con cuidado en producción!) |

Flujo de diagnóstico rápido:

1. Cliente sin IP → ¿hay pool para su red? ¿Quedan direcciones libres (no excluidas)?
2. Cliente con IP pero sin salida → ¿`default-router` correcto? ¿Está esa IP configurada en el router?
3. Cliente en otra subred → ¿hay `ip helper-address` en la interfaz correcta?

---

## 🤬 CONRAD VS EL MUNDO: "El servidor DHCP está caído, no hay red"

**Usuario:** — No hay red, señor. El DHCP se ha caído.

**CONRAD:** — ¿Y tú sabes lo que significa eso, chaval? Que tienes una red entera de clientes con concesiones vigentes que seguirán funcionando horas, y un montón de equipos NUEVOS que no podrán entrar. No es lo mismo "no hay red" que "no se reparten direcciones nuevas".

**CONRAD:** — Y encima me hablas de un router que "hace DHCP" pero los clientes de la VLAN 20 se quedan sin IP… ¿comprobaste si la SVI de la VLAN 20 tiene helper? No, claro, pusiste helper en la VLAN 10 y creíste que se contagia. Los helpers no se contagian. Se configuran.

**La lección:** diferencia entre "no asigna" y "no navega": son fallos distintos con causas distintas. Y un helper se configura **en cada interfaz que recibe broadcasts** de clientes DHCP.

---

## 🧠 Mini-chequeo

1. ¿Qué diferencia hay entre `excluded-address` y una reserva con `host`?
2. ¿Por qué no basta con un solo pool en el servidor central para servir a todas las sucursales?
3. ¿Dónde se configura `ip helper-address` exactamente, y por qué ahí?
4. Cliente con IP 192.168.1.100/24, gateway 192.168.1.254… y el router es 192.168.1.1. ¿Síntoma y causa?

<details>
<summary>🔄 Respuestas</summary>

1. `excluded-address` **retira** un rango del reparto (nunca se ofrecerá); la reserva con `host` **fija** una IP concreta a una MAC concreta (siempre se le dará esa).
2. Porque el Discover del cliente es un broadcast que **no cruza el router**: sin `ip helper-address` en la interfaz de la red del cliente, el servidor nunca se entera de que existe.
3. En la **interfaz (o SVI) de la red del cliente**. Ahí es donde el router recibe el broadcast que no puede reenviar tal cual y lo convierte en unicast hacia el servidor.
4. Síntoma: navega en su propia red pero **no sale a Internet ni a otras redes**. Causa: el gateway entregado por DHCP (`default-router` del pool) es incorrecto.
</details>

---

## ✅ Resumen en 3 frases

- Un router Cisco reparte direcciones con `ip dhcp pool` + `network` + `default-router`, y protege rangos con `excluded-address`.
- DHCP no cruza routers: `ip helper-address` en la interfaz del cliente convierte el broadcast en unicast hacia el servidor.
- Diagnóstico: `show ip dhcp binding`, `show ip dhcp pool` y la regla de oro "¿asigna? ¿navega? ¿cruzó el router?".

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Pool | Rango de direcciones que un servidor ofrece |
| Excluded-address | Rango que el servidor nunca ofrecerá |
| Reserva (host) | IP fija ligada a una MAC |
| Relay agent / helper | Router que reenvía DHCP entre subredes |
| `default-router` | El gateway entregado a los clientes |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-servicios-red) · **Anterior:** [02 · DHCP: el repartidor de IPs](/ApuntesRedes/10-servicios-red/02-dhcp) · **Siguiente:** [04 · DNS: la guía telefónica de Internet](/ApuntesRedes/10-servicios-red/04-dns)
