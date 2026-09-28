---
title: Boletín de Servicios de red — Inicial
description: Ejercicios básicos de servicios de red (DHCP, DNS y NTP)
---

# 📝 Boletín de Servicios de red — Inicial

> Ejercicios básicos para afianzar los conceptos de DHCP, DNS y NTP.

---

## 1. ¿Qué servicio soy?

Adivina el servicio por su descripción:

a) Reparto direcciones IP a los equipos que se conectan a la red.
b) Traduzco nombres de dominio en direcciones IP.
c) Mantengo sincronizado el reloj de todos los dispositivos de la red.
d) Me mencionas cada vez que escribes `www.google.com` en el navegador.

## 2. Las cuatro fases de DHCP

Ordena las fases de la negociación DORA:

a) Request
b) Offer
c) Discover
d) Acknowledge

## 3. Verdadero o falso

a) DHCP entrega una IP durante un tiempo limitado llamado concesión (lease).
b) Un registro A de DNS relaciona un nombre con una dirección IPv6.
c) NTP usa el puerto UDP 123.
d) Si falla DHCP, puedes configurar la IP a mano pero no la puerta de enlace.
e) El servidor DHCP puede entregar también máscara, gateway y servidores DNS.

## 4. ¿Qué registro DNS?

Relaciona cada situación con el registro adecuado:

| Situación | Registro |
|---|---|
| 1. dominio.com → 203.0.113.10 | a) CNAME |
| 2. www → dominio.com (alias) | b) MX |
| 3. dominio.com → 2001:db8::10 | c) A |
| 4. El servidor de correo del dominio | d) AAAA |
| 5. Saber quién es dueño de un dominio | e) PTR |
| 6. 203.0.113.10 → dominio.com (inverso) | f) SOA/NS |

## 5. ¿Qué comando?

Relaciona el comando con su función:

| Comando | Función |
|---|---|
| 1. `ipconfig /renew` | a) Ver la caché DNS del equipo |
| 2. `nslookup www.ejemplo.es` | b) Forzar nueva petición DHCP |
| 3. `ipconfig /displaydns` | c) Consultar un servidor DNS concreto |
| 4. `ipconfig /flushdns` | d) Vaciar la caché DNS |

## 6. El reloj y los logs

El switch del centro guarda sus logs, pero al revisarlos a las 9:00 aparece todo con fecha del día anterior y una hora sin sentido. ¿Qué servicio falta y por qué importa para diagnosticar incidencias?

## 7. DHCP helper

Un servidor DHCP está en la VLAN 10 (192.168.10.5). Los equipos de la VLAN 20 no reciben IP. ¿Qué falta configurar y en qué dispositivo?

## 8. Verifica tu red

En tu portátil, ejecuta `ipconfig /all` (o `ip addr` en Linux) e identifica:

a) ¿Tu IP es DHCP o estática? ¿Cómo lo sabes?
b) ¿Cuándo expira tu concesión?
c) ¿Qué servidores DNS te han asignado?
