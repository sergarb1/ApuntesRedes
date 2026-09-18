---
title: Boletín UD6 — Avanzado (Resuelto)
description: Soluciones de los ejercicios avanzados de enrutamiento estático
---

# ✅ Boletín UD6 — Avanzado (Resuelto)

---

## 1. Configuración multi-router

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

## 2. Rutas flotantes

a) **Comandos:**
```bash
ip route 0.0.0.0 0.0.0.0 10.0.0.2        # AD=1 (por defecto)
ip route 0.0.0.0 0.0.0.0 10.0.1.2 5      # AD=5 (respaldo)
ip route 192.168.100.0 255.255.255.0 10.0.0.2
```

b) **Cuándo se activa:** Cuando la ruta primaria (10.0.0.2) desaparece de la tabla (el siguiente salto deja de ser accesible). Entonces la ruta con AD=5 aparece en la tabla.

c) **Verificación:** `show ip route 0.0.0.0` muestra qué ruta por defecto está activa. Si aparece la de 10.0.1.2, la primaria ha fallado.

## 3. Resolución de problemas de rutas

a) **No funciona.** La interfaz G0/1 está `shutdown` (administratively down). La ruta por defecto apunta a 10.0.0.2, que está en G0/1. Si la interfaz está caída, la ruta no se instala en la tabla.

b) `show ip route` — 0.0.0.0/0 no aparecerá. `show ip interface brief` — G0/1 aparece como "administratively down".

c) **Cambiar:**
```bash
interface g0/1
 no shutdown
```
Y verificar que el enlace esté físicamente conectado.

## 4. Longest prefix match

a) **192.168.1.30 → via 10.0.0.10** (la /28 cubre de .16 a .31: es la coincidencia más larga).

b) **192.168.1.200 → via 10.0.0.6** (cae en la /24; la /28 no la cubre y pesa más que la /16).

c) **192.168.3.44 → via 10.0.0.2** (solo la /16 la abarca: ni la /24 ni la /28 llegan a .3.x).

d) **192.168.1.15 → via 10.0.0.6** (está en la /24 pero fuera de la /28, que empieza en .16).

**Regla:** a mayor máscara (28 > 24 > 16), coincidencia más específica y elegida primero.

## 5. V/F con matices

a) **Falso.** La sintaxis es válida y el IOS la acepta en la config; lo que pasa es que no se *instala* en la tabla porque el next-hop es inalcanzable. Comprueba `show ip route` e interfaces.
b) **Verdadero.** En multiacceso (Ethernet con varios vecinos) una ruta con interfaz de salida hace que el router pregunte por ARP a cualquiera: solo es segura en punto a punto.
c) **Verdadero.** Es exactamente una ruta flotante: gana la de menor AD, la otra espera en la configuración.
d) **Verdadero.** Es la ruta de último recurso: solo se consulta cuando el longest prefix match no encuentra nada más específico.
e) **Falso.** El router necesita una ruta conectada (o aprendida) a la subred del next-hop; si no, la estática no se instala.

## 6. Diseño de rutas para una sede

a) **Cuatro:** dos rutas estáticas (LAN de R2 y LAN de R3) + la ruta por defecto a Internet. Las redes de enlace (10.0.0.0/30 y 10.0.0.4/30) no necesitan rutas en R1 porque son conectadas.

b) **En R1:**
```bash
ip route 192.168.2.0 255.255.255.0 10.0.0.2
ip route 192.168.3.0 255.255.255.0 10.0.0.6
ip route 0.0.0.0 0.0.0.0 <ip_del_proveedor>
```

c) **Una ruta por defecto al router central:**
```bash
ip route 0.0.0.0 0.0.0.0 10.0.0.1
```
Todo lo que no sea su propia LAN se lo entrega a R1, que ya sabe encaminarlo (sucursales) o lo manda a Internet.

## 7. Interferencia con rutas conectadas

**No pasa nada dramático:** la ruta estática se configura pero NO gana. En `show ip route` verías ambas entradas: la `C` (conectada, AD 0) activa y la `S` (estática, AD 1) entre corchetes como alternativa menos fiable. El router siempre prefiere la de menor AD para el mismo prefijo, así que el encaminamiento local sigue funcionando. Eso sí: es una config descuidada — sobra y conviene quitarla con `no ip route ...`.

## 8. Escenario completo de diagnóstico

a) **A R2 le faltan las rutas de vuelta** hacia 192.168.1.0/24 (y hacia 10.0.0.0/30 no hace falta: es conectada). Sin ruta de retorno, el paquete de ping llega pero la respuesta se pierde:
```bash
ip route 192.168.1.0 255.255.255.0 10.0.0.1
```

b) **A R1 le falta la ruta hacia 192.168.2.0/24:**
```bash
ip route 192.168.2.0 255.255.255.0 10.0.0.2
```

c) Porque el **traceroute usa respuestas ICMP time-exceeded** (o UDP con puerto inalcanzable) que algún router intermedio no genera o filtra. El forwarding puede estar perfecto y aun así el traceroute no pintar el último salto: no siempre es un problema de rutas.