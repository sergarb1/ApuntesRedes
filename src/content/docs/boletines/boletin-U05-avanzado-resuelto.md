---
title: Boletín U05 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de IPv6 y Transición
---

# ✅ Boletín U05 — Avanzado (Resuelto)

---

## 1. Subnetting IPv6

a) **Máscara para sedes:** /48 → para 5 sedes necesitas 3 bits extra (2³ = 8). Cada sede tendría /51. Pero en IPv6 lo estándar es dar /48 a cada sede (todas son /48 independientes). Si solo tienes un /48 global, entonces usas /52 para 16 subredes (2⁴ = 16).

b) **Subredes /64 dentro de /48:** 64 - 48 = 16 bits → 2¹⁶ = **65.536 subredes** /64.

c) **Primeras 3 subredes /64:**
   - 2001:DB8:CAFE:0000::/64
   - 2001:DB8:CAFE:0001::/64
   - 2001:DB8:CAFE:0002::/64

## 2. EUI-64

a) **EUI-64:** 021A:2BFF:FE3C:4D5E
   (Invertir bit 7 del primer byte: 00 → 02, insertar FF:FE entre las mitades)

b) **IPv6 completa:** 2001:DB8:1:2:021A:2BFF:FE3C:4D5E/64

c) **Problema de privacidad:** La IP es siempre la misma para una MAC dada. Esto permite rastrear un dispositivo físico a través de redes. Las Privacy Extensions (RFC 4941) generan direcciones temporales que cambian periódicamente.

## 3. Diagnóstico IPv6

a) **Dos direcciones:** Una es Link-Local (fe80::...) necesaria para comunicación local, y otra es Global Unicast (2001:db8:...) para comunicación global. Es normal tener ambas.

b) **%12 (Zone ID):** Identifica la interfaz de red (en este caso, la número 12). Es necesario en Link-Local porque la misma dirección FE80 podría existir en múltiples interfaces.

c) **Sí puede acceder a Internet.** Tiene una Global Unicast (2001:db8::) que es enrutable, y un gateway configurado.

d) **Comando:** `ipconfig /all` en Windows, `ip addr` en Linux, `ifconfig -a` en macOS.

## 4. Diseño de transición

a) **Dual Stack en las LANs.** El ISP ofrece IPv6 nativo, así que ambas sedes pueden tener IPv4 e IPv6 simultáneamente. Es la opción más limpia y sin encapsulación extra.

b) **Conexión entre sedes:** Usando IPv6 nativo (el ISP ya lo ofrece). Cada sede tiene un rango /48 asignado. El enrutamiento IPv6 se hace con OSPFv3 o rutas estáticas.

c) **Acceso al servicio cloud solo-IPv4:** NAT64 + DNS64. El router de la sede central traduce el tráfico IPv6 de los clientes a IPv4 hacia el servidor cloud.

d) **Configuración en routers:**
   - Habilitar `ipv6 unicast-routing`
   - Configurar interfaz WAN con IPv6 del ISP
   - Configurar interfaz LAN con prefijo /64 de la sede
   - Configurar rutas IPv6 estáticas o dinámicas
   - Configurar NAT64 para el servicio cloud legacy

## 5. Análisis de Router Advertisement

a) **Método:** DHCPv6 Stateless (O Flag = 1, M Flag = 0). SLAAC da la IP, DHCPv6 da configuración adicional.

b) **La IP la da SLAAC** (el router anuncia el prefijo con RA, el cliente genera su IP). **El DNS lo da DHCPv6** (el cliente consulta al servidor DHCPv6 para obtener DNS y otros parámetros).

c) **No.** SLAAC puro no da DNS. Si el cliente solo soporta SLAAC, necesitaría DHCPv6 para DNS. Pero los clientes modernos suelen soportar RDNSS (DNS en RA), que permite al router anunciar DNS directamente en los RA sin DHCPv6.

d) **Si M Flag = 1:** DHCPv6 Stateful. El servidor DHCPv6 da tanto la IP como el DNS. SLAAC no se usa para la IP. Esto es más parecido al DHCP de IPv4.

## 6. NDP en acción

a) **Neighbor Solicitation (NS):** "¿Quién tiene 2001:DB8::20?"

b) **Dirección MAC destino:** Multicast Ethernet (01:80:C2:00:00:00 o 33:33:xx:xx:xx:xx). Concretamente, la dirección multicast derivada de la IP destino (solicited-node multicast).

c) **Dirección IPv6 destino:** **Multicast** (FF02::1:FF00:20 — la solicited-node multicast address). NO usa broadcast como ARP en IPv4.

d) **PC-B responde con un Neighbor Advertisement (NA)** unicast dirigido a PC-A, indicando su MAC.

e) **Este proceso se llama NDP** (Neighbor Discovery Protocol). Es parte de ICMPv6 y reemplaza a ARP. Es más eficiente que ARP porque usa multicast en lugar de broadcast, y solo los dispositivos interesados procesan el mensaje.

## 7. Diagnóstico ping6

Contexto: `ping fe80::1` (la Link-Local del gateway) funciona, así que el enlace, la MAC y NDP básico están OK. El fallo es exclusivo del destino *global* `2001:DB8:1::10`. Tres causas posibles:

a) **Firewall del PC destino (o del propio PC-A) bloqueando ICMPv6 hacia la GUA.** Muchos sistemas abren por defecto el tráfico a Link-Local y al descubrimiento de vecinos, pero responden peor (o no responden) a pings a su dirección global.
   - *Verificación:* intenta ping desde un tercer equipo; o desactiva temporalmente el firewall del PC destino y repite el ping. Si entonces funciona, es el firewall.

b) **La GUA destino está duplicada o no es la activa.** Si el PC destino tiene varios adaptadores, o SLAAC le dio un prefijo distinto, la dirección que pingueas puede estar asignada en otra interfaz o marcada como *tentative* (durante DAD). El host simplemente no responde en esa dirección en la interfaz que esperas.
   - *Verificación:* en el destino ejecuta `ipconfig /all` (Windows) o `ip -6 addr show` (Linux) y comprueba que `2001:DB8:1::10` exista y esté marcada como activa en esa interfaz (estado *preferred*). Prueba también `ping -6 2001:DB8:1::10%<id-interfaz>`.

c) **Prefijo/ámbito fuera de la subred (on-link).** Para un *origen* con un prefijo distinto o sin ruta hacia `2001:DB8:1::/64`, esa GUA NO es *on-link*: el tráfico saldría al router (gateway), no resolvería la MAC por NDP local. Si la LAN es realmente `2001:DB8:1::/64` pero el PC-A o el switch han sido configurados con otro prefijo, el ping "no tiene a quién preguntar".
   - *Verificación:* revisa que el prefijo del origen (`2001:db8:1:...`) y el destino compartan el mismo /64, y que el gateway `fe80::1` enrute correctamente. Un `pathping`/`tracert` IPv6 te dice si el salto intenta salir por el router o se queda en el enlace.

> ✅ Resumen rápido: misma LAN + ping a LLA OK → el fallo al ping a GUA casi siempre es **firewall**, **dirección no activa** (tentative/duplicada) o **prefijo mal / fuera de enlace**.

## 8. Tabla IPv4 vs IPv6

| Concepto | IPv4 | IPv6 |
|---|---|---|
| Bits de la dirección | 32 | **128** |
| Notación | Decimal con puntos | **Hexadecimal con dos puntos** (8 grupos) |
| Direcciones privadas | RFC 1918 (192.168…, 172.16…, 10…) | **ULA `FC00::/7`** (privada/organización) |
| Broadcast | Sí (envía a todos) | **No existe**: solo multicast (`FF02::1` ≈ todos los nodos) |
| Resolución IP → MAC | ARP | **NDP** (NS/NA vía ICMPv6, multicast) |
| Multicast de listeners | IGMP | **MLD** (Multicast Listener Discovery) |
| Configuración automática | DHCP | **SLAAC + DHCPv6** (stateless/stateful, flags M/O) |
| Loopback | 127.0.0.1 | **`::1`** |
| Fragmentación | La hacen cualquier router intermedio | **Solo la hace el origen** (Path MTU Discovery) |
| Seguridad / NAT | NAT compartido para las privadas | **Sin NAT**: extremo a extremo; firewall y (opcional) IPsec |

> 💡 La fila de *fragmentación* y la de *NAT* suelen ser las que más sorprende: en IPv6 los routers ya no fragmentan (lo hace el origen), y el NAT, además de feo, era una falsa sensación de seguridad. Se acabó el escondite.
