---
title: Boletín U05 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de IPv6 y Transición
---

# ✅ Boletín U05 — Avanzado (Resuelto)

---

## 1. Subnetting IPv6

a) **Máscara para sedes:** /48 → para 5 sedes necesitas 3 bits extra (2³ = 8). Cada sede tendría /51. Pero en IPv6 lo estándar es dar /48 a cada sede (todas son /48 independientes). Si solo tienes un /48 global, entonces usas /52 para 16 subredes (2⁴ = 16).

b) **Subredes /64 dentro de /48:** 64 - 48 = 16 bits → 2¹⁶ = **65,536 subredes** /64.

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
