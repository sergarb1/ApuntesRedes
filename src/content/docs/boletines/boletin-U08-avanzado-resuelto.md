---
title: Boletín U08 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de Routing y ACLs
---

# ✅ Boletín U08 — Avanzado (Resuelto)

---

## 1. Configuración multi-routing

**R1:**
```bash
interface g0/0
 ip address 192.168.1.1 255.255.255.0
 no shutdown
interface g0/1
 ip address 10.0.0.1 255.255.255.252
 no shutdown
ip route 192.168.2.0 255.255.255.0 10.0.0.2
ip route 192.168.3.0 255.255.255.0 10.0.0.2
ip route 0.0.0.0 0.0.0.0 10.0.0.2
```

**R2:**
```bash
interface g0/0
 ip address 10.0.0.2 255.255.255.252
 no shutdown
interface g0/1
 ip address 10.0.0.5 255.255.255.252
 no shutdown
interface g0/2
 ip address 192.168.2.1 255.255.255.0
 no shutdown
ip route 192.168.1.0 255.255.255.0 10.0.0.1
ip route 192.168.3.0 255.255.255.0 10.0.0.6
```

**R3:**
```bash
interface g0/0
 ip address 10.0.0.6 255.255.255.252
 no shutdown
interface g0/1
 ip address 192.168.3.1 255.255.255.0
 no shutdown
ip route 192.168.1.0 255.255.255.0 10.0.0.5
ip route 192.168.2.0 255.255.255.0 10.0.0.5
ip route 0.0.0.0 0.0.0.0 10.0.0.5
```

## 2. ACL extendida: YouTube blocker

a) **ACL con time-range:**
```bash
time-range LABORAL
 periodic weekdays 9:00 to 18:00

ip access-list extended BLOQUEAR_YT
 deny tcp any 173.194.0.0 0.0.255.255 eq 80 time-range LABORAL
 deny tcp any 173.194.0.0 0.0.255.255 eq 443 time-range LABORAL
 permit ip any any
```

b) **Aplicar:** Outbound en G0/1 (hacia Internet), para filtrar tráfico saliente.

c) **Alternativa sin time-range:** Configurar dos ACLs y cambiar la aplicación manualmente cada día (no recomendado) o usar un script externo.

## 3. Diagnóstico de ACL

a) **Sí, es normal.** La línea 1 deniega explícitamente 192.168.1.10. La línea 2 permite al resto de la red. El deny any implícito está al final.

b) **Sí, 192.168.1.20 puede** porque coincide con la línea 2 (permit 192.168.1.0/24).

c) `show access-lists 10` — Muestra los contadores de hits de cada línea.

d) **No afecta.** La ACL está en G0/1 (outbound). El tráfico entre PCs de la misma LAN no pasa por el router, solo por el switch. Las ACLs en interfaces del router solo afectan al tráfico que pasa por el router.

## 4. Rutas flotantes

a) **Comandos:**
```bash
ip route 0.0.0.0 0.0.0.0 10.0.0.2        # AD=1 (por defecto)
ip route 0.0.0.0 0.0.0.0 10.0.1.2 5      # AD=5 (respaldo)
ip route 192.168.100.0 255.255.255.0 10.0.0.2
```

b) **Cuándo se activa:** Cuando la ruta primaria (10.0.0.2) desaparece de la tabla (el siguiente salto deja de ser accesible). Entonces la ruta con AD=5 aparece en la tabla.

c) **Verificación:** `show ip route 0.0.0.0` muestra qué ruta por defecto está activa. Si aparece la de 10.0.1.2, la primaria ha fallado.

## 5. ACL de firewall básico

```bash
ip access-list extended FIREWALL_INTERNO
 permit tcp 192.168.1.0 0.0.0.255 any eq 80
 permit tcp 192.168.1.0 0.0.0.255 any eq 443
 permit udp 192.168.1.0 0.0.0.255 any eq 53
 deny tcp 192.168.1.0 0.0.0.255 any eq 22
 permit tcp any 192.168.1.0 0.0.0.255 established
 deny ip any any

interface g0/1
 ip access-group FIREWALL_INTERNO out
```

## 6. Resolución de problemas de rutas

a) **No funciona.** La interfaz G0/1 está `shutdown` (administratively down). La ruta por defecto apunta a 10.0.0.2, que está en G0/1. Si la interfaz está caída, la ruta no se instala en la tabla.

b) `show ip route` — 0.0.0.0/0 no aparecerá. `show ip interface brief` — G0/1 aparece como "administratively down".

c) **Cambiar:**
```bash
interface g0/1
 no shutdown
```
Y verificar que el enlace esté físicamente conectado.
