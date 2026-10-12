---
title: Boletín de Servicios de red — Inicial (Resuelto)
description: Soluciones de los ejercicios básicos de servicios de red (DHCP, DNS y NTP)
---

# ✅ Boletín de Servicios de red — Inicial (Resuelto)

---

## 1. ¿Qué servicio soy?

a) **DHCP** — Dynamic Host Configuration Protocol.
b) **DNS** — Domain Name System.
c) **NTP** — Network Time Protocol.
d) **DNS** — el navegador pregunta primero por el nombre antes de conectar.

## 2. Las cuatro fases de DHCP

1. c) Discover → 2. b) Offer → 3. a) Request → 4. d) Acknowledge

El cliente grita "¿hay algún servidor?" (Discover), el servidor ofrece una IP (Offer), el cliente la reclama (Request) y el servidor la confirma (Ack).

## 3. Verdadero o falso

a) **Verdadero.** La concesión se renueva a mitad de plazo si el cliente sigue activo.
b) **Falso.** Un registro A relaciona nombre con IPv4; para IPv6 es el registro **AAAA**.
c) **Verdadero.** NTP escucha y habla por UDP/123.
d) **Falso.** Una configuración manual completa necesita IP, máscara, gateway y DNS: sin DNS ni gateway no llegarías ni a Internet.
e) **Verdadero.** La oferta DHCP incluye opciones: máscara, gateway por defecto, DNS, dominio, TFTP…

## 4. ¿Qué registro DNS?

1 → c (A: nombre → IPv4)
2 → a (CNAME: alias de otro nombre)
3 → d (AAAA: nombre → IPv6)
4 → b (MX: servidor de correo del dominio)
5 → f (SOA/NS: autoridad y servidores del dominio)
6 → e (PTR: resolución inversa IP → nombre)

## 5. ¿Qué comando?

1 → b (`/renew` fuerza nueva negociación DHCP)
2 → c (nslookup consulta un servidor DNS)
3 → a (`/displaydns` muestra la caché)
4 → d (`/flushdns` la vacía)

## 6. El reloj y los logs

Falta **NTP**. Si el reloj del dispositivo no está sincronizado, las marcas de tiempo de los logs no sirven para reconstruir una incidencia: no puedes comparar "el switch avisó a las 08:59" con "el servidor registró el error a las 09:00" si cada uno lleva su hora. Con NTP todos los equipos apuntan a la misma fuente y los logs cuadran.

## 7. DHCP helper

Falta el **ip helper-address** en el router (o switch capa 3) de la VLAN 20. DHCP Discover es un broadcast y los broadcasts no cruzan VLANs: el agente de reenvío del router convierte ese broadcast en un unicast hacia 192.168.10.5:

```bash
interface vlan 20
 ip helper-address 192.168.10.5
```

## 8. Verifica tu red

a) Si aparece "DHCP habilitado: Sí" y una línea "Concesión obtenida / Concesión expira", es DHCP. Si no hay concesión y la IP la escribiste tú, es estática.
b) En la línea "Concesión expira" (típico: 24 horas en redes domésticas).
c) En "Servidores DNS": normalmente la IP del router de casa o las DNS del operador (y en muchas redes, un DNS interno de la empresa o del centro).