---
title: Boletín UD10 — Avanzado (Resuelto)
description: Soluciones de los ejercicios avanzados de servicios de red (DHCP, DNS y NTP)
---

# ✅ Boletín UD10 — Avanzado (Resuelto)

---

## 1. DHCP en el router Cisco

a)
```bash
ip dhcp excluded-address 192.168.1.1 192.168.1.20
ip dhcp pool LAN1
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 8.8.8.8 1.1.1.1
 lease 3
```

b) Secuencia de diagnóstico:
1. `show running-config | section dhcp` → ¿existe el pool y las exclusiones?
2. `show ip dhcp binding` → ¿ha entregado alguna dirección alguna vez? Si nadie tiene concesión, el problema es de alcance (VLAN/helper) o de pool.
3. `show ip interface brief` → ¿la interfaz de la LAN está Up/Up con su IP? (si está down, el pool no sirve)
4. En el PC: `ipconfig /renew` y mira si llega Offer; si no llega, comprueba que PC y servidor comparten red o que existe `ip helper-address` en la VLAN.
5. Repasa exclusiones: si por error excluyes toda la subred, el pool no tiene nada que ofrecer.

## 2. DNS jerárquico

a) Recorrido:
1. El resolver del PC pregunta al DNS configurado (p. ej. el router o el DNS del centro).
2. Si ese resolver no tiene la respuesta en caché, pregunta a un **servidor raíz**: "¿quién es la autoridad de `.es`?"
3. El raíz responde con los servidores del **TLD** `.es`.
4. El resolver pregunta al TLD, que le da los servidores **autoritativos** de `ejemplo.es`.
5. El autoritativo responde el registro A de `www.ejemplo.es`.
6. El resolver entrega la IP al PC y la guarda en su caché.

b) La segunda vez la respuesta sale de la **caché** del resolver (y probablemente también de la del propio PC): ni raíz ni TLD ni autoritativo se consultan.

c) El **TTL** define cuántos segundos puede reutilizarse una respuesta cacheada. TTL corto = cambios rápidos pero más consultas; TTL largo = menos tráfico pero cambios lentos en propagarse.

## 3. Selección de registros para un mini-proyecto

a)
```
instituto.edu.      A      198.51.100.10
instituto.edu.      AAAA   2001:db8::10
www                 A      198.51.100.10
www                 AAAA   2001:db8::10
aulas               CNAME  www.instituto.edu.
instituto.edu.      MX 10  mail.proveedor.com.
```
(En los registros MX el nombre del servidor de correo debe tener su propio A/AAAA.)

b) El **MX** del dominio apuntando a `mail.proveedor.com.` (con punto final), más el A/AAAA de ese host si no lo gestiona el proveedor.

c) **No.** La RFC prohíbe CNAME en el apex del dominio (convive con SOA/NS). Para el raíz se usan registros A/AAAA directos, o ALIAS/ANAME donde el proveedor lo ofrezca.

## 4. Diagnóstico con nslookup

a) El **servidor DNS configurado no responde** (timeout). La consulta no se resuelve: problema de alcance o del propio servidor 192.168.1.1.

b) Consulta correcta: `www` es un **CNAME** hacia `web.ejemplo.es`, que resuelve a 203.0.113.99. Todo normal: la cadena de alias termina en un A.

c) El **DNS funciona pero el navegador no**: prueba caché del navegador corrupta (vaciarla), un proxy configurado, un archivo hosts con una entrada vieja, o un firewall local. El DNS es una capa; la navegación depende de más cosas.

## 5. NTP con jerarquía

a) **Diseño:**
- R1 (borde) sincroniza con servidores públicos (p. ej. `pool.ntp.org` o el NTP del proveedor) → quedará en estrato 2 o 3.
- S1 sincroniza con R1 → estrato 3 o 4.
- Los switches de acceso y demás equipos sincronizan con S1 (o con R1 si la red es pequeña) → un estrato más abajo.
Nunca todos los equipos contra Internet: peor control, más tráfico y menos consistencia interna.

b)
```bash
! R1 (borde)
ntp server pool.ntp.org
! (opcional) ntp master 3  si no hay acceso público garantizado

! S1
ntp server <ip_de_R1>
```

c)
```bash
show ntp status
show ntp associations
```
En `show ntp status` buscas la línea de sincronización y el estrato; en `associations`, el peer elegido (marcado con `*`), su IP y su estrato.

## 6. Los tres servicios en un solo caso

a) **DHCP** caído o inalcanzable. El rango 169.254.0.0/16 es **APIPA** (Automatic Private IP Addressing): el PC se autoasigna una IP de ese rango cuando nadie le contesta al Discover.

b) DHCP Discover es un **broadcast**, y los broadcasts no cruzan VLANs (ni routers). Si el PC está en otra VLAN distinta a la del servidor DHCP sin un `ip helper-address` en el router de esa VLAN, la petición nunca llega.

c) Ahora falla **DNS**. Compruebas con `nslookup` (o `Resolve-DnsName` en PowerShell): si `nslookup www.google.com 8.8.8.8` funciona pero con el DNS asignado no, el problema es el servidor DNS asignado por DHCP (o su helper). Complementa con `ping 8.8.8.8` para confirmar que hay salida a Internet.

d) El PC estaba bien porque los **PCs ya sincronizaban su reloj** (con NTP interno o con Windows por Internet cuando hubo red). El switch, sin embargo, lleva su reloj propio sin fuente NTP configurada: tras el corte eléctrico perdió la hora (los switches sin NTP arrancan con fecha por defecto). De ahí la importancia de configurar NTP en los equipos de red, no solo en los PCs.

## 7. DHCPv6 y doble pila

a) **SLAAC:** el PC construye su propia dirección a partir del prefijo que anuncia el router (RA) + su identificador de interfaz (EUI-64 o aleatorio), sin servidor que lleve registro. **Stateful DHCPv6:** un servidor DHCPv6 asigna y registra las direcciones, como DHCPv4 pero en IPv6.

b) **SLAAC + stateless DHCPv6:** los RA anuncian el prefijo (flag O=1, M=0) y el DHCPv6 solo entrega "otra información": DNS, dominio, NTP.

c)
```bash
ipv6 unicast-routing
interface g0/0
 ipv6 address fe80::1 link-local
 ipv6 address 2001:db8:ab::1/64
 ipv6 nd other-config-flag
ipv6 dhcp pool CLIENTES
 dns-server 2001:4860:4860::8888
 domain-name instituto.edu
interface g0/0
 ipv6 dhcp server CLIENTES
```

## 8. El "no tiene Internet" clásico

a) **Sano:** DHCP (IP y gateway correctos), routing básico (llega a 1.1.1.1, si nslookup contra 1.1.1.1 funciona hay salida a Internet). **Roto:** el **DNS configurado** en el equipo (el asignado no responde; uno externo sí).

b) 1) Arreglar/renombrar el servidor DNS configurado (por ejemplo poner 1.1.1.1 u 8.8.8.8 a mano) y 2) corregir de raíz el DNS que entrega el DHCP del router del centro (opción `dns-server` en el pool) o el propio servidor DNS caído.

c) **NTP** solo sincroniza relojes; **DHCP** está funcionando (hay IP y gateway); **routing** hay: las consultas a 1.1.1.1 van y vuelven. El único servicio que falla es la resolución de nombres con el servidor asignado.