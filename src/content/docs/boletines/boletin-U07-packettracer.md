---
title: Boletín de Servicios de red — Packet Tracer
description: Prácticas guiadas de DHCP, DNS y NTP en Packet Tracer 🖥️
---

# 🖥️ Boletín de Servicios de red — Packet Tracer

> **Variante práctica de nivel único** (no es el par inicial/avanzado). Ocho micro-prácticas de baja dificultad en **Packet Tracer** para que los tres servicios dejen de ser magia: repartir IPs con DHCP en el router, montar registros DNS en el servidor de PT, poner en hora los equipos con NTP y, de camino, diagnosticar tres fallos intencionados con la escalera de diagnóstico. Ideal tras leer los puntos 1–8 de la unidad.

> 🧰 **Requisitos:** Cisco Packet Tracer. Para el DNS usas un **Server** de PT (*Services → DNS*); los ejercicios 6 y 7 necesitan **dos routers** (o un router y un switch capa 3). El resuelto está justo al lado: úsalo solo cuando te atasques.

---

## 1. DHCP en el router: la IP sale sola

Monta **1 router (`R1`) + 1 switch + 2 PCs**. Dale `192.168.1.1/24` a G0/0, excluye los primeros números (`.1` a `.10`) y crea un pool con `network`, `default-router` y `dns-server 8.8.8.8`. Pon las PCs en **DHCP** y comprueba con `ipconfig /all` que cada una recibe una IP del rango.

> 💡 **Pista:** no olvides `no shutdown`; `show ip dhcp binding` te enseña quién ha recibido qué y cuándo caduca.

## 2. Fallo 1: gateway que no existe

Modifica el pool para que `default-router` sea `192.168.1.254` (una IP que **no es del router**) y renueva la IP de una PC. Ahora la PC tiene IP "buena"... pero no sale a ninguna parte.

Diagnostica el fallo solo con comandos del cliente y del router, y arréglalo.

> 💡 **Pista:** en la PC: `ipconfig /all` (¿qué gateway te dio?); en el router: `show ip dhcp pool` y la config. Recuerda la regla: ¿asigna? ¿navega?

## 3. Relay entre subredes

Añade una segunda red al router: `G0/1 → 192.168.10.1/24` con una PC nueva (`PC2`). Configura un pool para esa subred... y comprueba: **¿recibe IP `PC2` sin más?**

Si se queda en `169.254.x.x`, es que el Discover no llega: pon el `ip helper-address` donde toca y vuelve a renovar.

> 💡 **Pista:** el broadcast no cruza interfaces; el agente de reenvío se configura en la interfaz **por la que llega** el cliente, apuntando al servidor (aquí, el propio router).

## 4. DNS en PT: nombres que funcionan

Cambia el `dns-server` del pool a la IP de un **Server** de PT conectado al switch (p. ej. `192.168.1.10`). En *Services → DNS* activa el servicio y crea el registro `www.empresa.local → 192.168.1.10` (y un CNAME `web.empresa.local → www.empresa.local`).

Desde una PC: `nslookup www.empresa.local` y `nslookup web.empresa.local`. Después, ¿qué IP te da `ping www.empresa.local`?

> 💡 **Pista:** si nslookup no contesta, revisa tres cosas en orden: DNS activo en el Server, registro escrito bien, y que la PC use **ese** servidor DNS (`ipconfig /all`).

## 5. Fallo 2: el DNS que no está

Borra (o desactiva) el registro `www.empresa.local` en el Server. Desde la PC: prueba primero `ping` a la IP del Server (¿funciona?) y después `nslookup www.empresa.local` (¿qué dice?).

Restaura el registro y confirma con un navegador del escritorio de la PC.

> 💡 **Pista:** la escalera: IP y gateway ✅, IPs alcanzables ✅, nombres ❌ → escalón DNS. Fuerza la consulta contra el servidor con `nslookup www.empresa.local 192.168.1.10`: si él tampoco sabe, el problema es del registro o del servicio, no del equipo.

## 6. NTP entre routers: todos con el mismo reloj

Con **dos routers** conectados (`R1` y `R2`), convierte `R1` en fuente (`ntp master 2`) y apunta `R2` a su IP (`ntp server <IP-de-R1>` — en PT, **IP y no nombre**). Comprueba con `show ntp status` y `show clock` en `R2`.

> 💡 **Pista:** `show ntp status` debe decir `Clock is synchronized`; si dice `unsynchronized`, espera unos segundos y revisa conectividad con el `ping` antes de culpar a NTP.

## 7. Fallo 3: hora de la mentira

En `R2`: quita la fuente NTP (`no ntp server …`) y ponle una hora absurda con `clock set 03:00:00 1 Jan 2019` (modo privilegiado, no `configure terminal`).

Observa `show clock` y comprueba qué diría un log de este equipo. Restaura la configuración NTP del ejercicio 6 y mira cómo `R2` recupera la hora correcta.

> 💡 **Pista:** `show ntp status` te delata (`unsynchronized`), y con `show ntp associations` ves siquiera queda algún peer. ¿Qué le pasa a los logs de dos equipos con horas distintas?

## 8. El reto: la escalera de principio a fin

Escenario final: **tres fallos a la vez** en la misma red (tu profesor los introduce o te los dejas preparados tú):

- `PC1` en `169.254.x.x` (APIPA).
- Con DHCP arreglado, `ping` a IPs OK pero `nslookup www.empresa.local` falla.
- Los logs de los equipos no cuadran entre sí.

Diagnostica los tres **en orden con la escalera** (IP → gateway → Internet → nombres → hora), anota síntoma → escalón → causa → solución y solo después de capturar el estado (`show`, `ipconfig`, `nslookup`) reconfigura nada.

> 💡 **Pista:** los tres fallos clásicos del laboratorio de la unidad: pool/helper, registro DNS y fuente NTP. El orden no es opcional: sin el escalón 1 en verde, el 4 no tiene sentido.

---

## 📋 Criterios de esta práctica

| Ejercicio | Concepto | Punto |
|---|---|---|
| 1 | Pool DHCP, exclusiones, binding | 2–3 |
| 2 | default-router (fallo) | 3 |
| 3 | Relay con ip helper-address | 3 |
| 4 | Registros DNS en PT | 4–5 |
| 5 | Diagnóstico DNS con nslookup (fallo) | 5, 8 |
| 6 | Jerarquía NTP en IOS | 6–7 |
| 7 | Hora desajustada (fallo) | 6–7 |
| 8 | Escalera del servicio | 8 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/07-servicios-red) · **También:** [Resuelto](/ApuntesRedes/boletines/boletin-u07-packettracer-resuelto)
