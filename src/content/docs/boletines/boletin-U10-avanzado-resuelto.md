---
title: Boletín U10 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de NAT
---

# ✅ Boletín U10 — Avanzado (Resuelto)

---

## 1. Traducción manual

| Pro | Inside global | Inside local | Outside local | Outside global |
|---|---|---|---|---|
| tcp | 83.45.12.78:**60001** | 192.168.1.10:50000 | 8.8.8.8:80 | 8.8.8.8:80 |
| udp | **83.45.12.78:60002** | 192.168.1.20:50000 | 8.8.8.8:53 | 8.8.8.8:53 |

NAT asigna puertos únicos (60001, 60002) aunque los puertos origen sean iguales (50000).

## 2. Problema con FTP activo

**Falla porque el servidor FTP externo intenta conectar directamente a 192.168.1.10:1025, pero esa IP es privada y no es accesible desde fuera.** Además, NAT no traduce IPs dentro del payload del protocolo FTP (comando PORT).

**Soluciones:**
- Usar **FTP pasivo**: el cliente inicia ambas conexiones.
- Activar **ALG FTP** en el router para que inspeccione y traduzca las IPs en el comando PORT.
- Usar FTP sobre TLS/SSH.

## 3. Configuración multi-NAT

```bash
R1(config)# ip nat inside source static tcp 192.168.1.10 80 83.45.12.78 8080
R1(config)# ip nat inside source static tcp 192.168.1.10 443 83.45.12.78 8443
R1(config)# ip nat inside source static tcp 192.168.1.20 22 83.45.12.78 2222
```

## 4. NAT + VPN

**IPsec no pasa NAT porque NAT modifica la cabecera IP, y los protocolos AH y ESP usan hashes que verifican la integridad de la cabecera IP.** Al cambiar la IP, el hash no coincide y el paquete se rechaza.

**Solución:** **NAT-T (NAT Traversal)** — encapsula paquetes IPsec dentro de UDP (puerto 4500). NAT puede traducir UDP sin problemas, y IPsec viaja encapsulado.

## 5. Análisis de timeouts

**El problema no es NAT, es el firewall o el propio router que tiene un timeout de sesión TCP menor que el de NAT.** Muchos firewalls cierran conexiones TCP inactivas después de unos minutos. También puede ser el **keepalive TCP** del cliente o servidor SSH.

**Solución:** Configurar keepalive SSH en el cliente (`ServerAliveInterval 60`), o ajustar el timeout de sesión TCP en el router.

## 6. NAT y servidores duales

```bash
! PAT para todos los internos
R1(config)# access-list 1 permit 192.168.10.0 0.0.0.255
R1(config)# ip nat inside source list 1 interface g0/1 overload

! NAT destino para servidor web (IP pública 83.45.12.78)
R1(config)# ip nat inside source static tcp 192.168.10.10 80 83.45.12.78 80
R1(config)# ip nat inside source static tcp 192.168.10.10 443 83.45.12.78 443

! NAT destino para servidor correo (IP pública 83.45.12.79)
R1(config)# ip nat inside source static tcp 192.168.10.20 25 83.45.12.79 25
R1(config)# ip nat inside source static tcp 192.168.10.20 587 83.45.12.79 587
R1(config)# ip nat inside source static tcp 192.168.10.20 993 83.45.12.79 993

! Interfaces
R1(config)# interface g0/0
R1(config-if)# ip nat inside
R1(config)# interface g0/1
R1(config-if)# ip nat outside
```
