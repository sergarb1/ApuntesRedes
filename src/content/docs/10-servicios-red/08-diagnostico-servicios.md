---
title: 08 — Diagnóstico de servicios
description: "El usuario dice «no funciona»: tú sabes dónde mirar 🔍"
---

<p><small>El usuario dice "no funciona": tú sabes dónde mirar 🔍</small></p>

> 🗺️ **Estás en:** 🗄️ **UD10 · Servicios de red: DHCP, DNS y NTP** → 08 · Diagnóstico de servicios

---

## 📬 La idea en una frase

> Cuando un usuario dice "no funciona", su frase es verdadera e inútil a la vez: tu trabajo es convertirla en datos, y en servicios de red eso significa seguir la cadena **DHCP → conectividad → DNS → hora**, en ese orden, con los comandos correctos para cada eslabón.

---

## 🪜 La escalera del servicio

El método es el mismo que aprendiste en la Unidad 01 (la escalera del ping), pero aplicado a los servicios:

```
1. ¿Tiene IP, máscara y gateway?          → DHCP      (ipconfig / ip addr)
2. ¿Pinge su gateway?                     → L2/L3 local
3. ¿Pinge 8.8.8.8?                        → routing/NAT
4. ¿Resuelve nombres?                     → DNS       (nslookup/dig)
5. ¿Está la hora en orden?                → NTP       (solo servers/audit)
```

La regla es inquebrantable: **no subas de escalón hasta que el actual esté verde**. Si el paso 1 falla, el problema es DHCP aunque el usuario jure que "se ha caído Internet".

---

## 🧰 Comandos por servicio

### DHCP (desde el cliente y el servidor)

| Dónde | Comando | Qué aporta |
|---|---|---|
| Cliente Windows | `ipconfig /all` | IP, máscara, gateway, DNS y si vino de DHCP (DHCP Enabled: Yes) |
| Cliente Windows | `ipconfig /release` + `/renew` | Repite el DORA completo |
| Servidor Cisco | `show ip dhcp binding` | Concesiones activas (MAC → IP) |
| Servidor Cisco | `show ip dhcp pool` | Estado y uso de cada pool |
| Servidor Cisco | `show ip dhcp conflict` | Duplicados detectados |
| Servidor Cisco | `debug ip dhcp server events` | El DORA en directo |

### DNS (la caja de herramientas del resolutor)

| Comando | Dónde | Qué aporta |
|---|---|---|
| `nslookup www.ejemplo.es` | Cualquier SO | La respuesta (y quién responde: "Server:") |
| `nslookup www.ejemplo.es 8.8.8.8` | Cualquier SO | Fuerza la consulta contra otro resolver: ¿mi resolver miente? |
| `nslookup -type=MX ejemplo.es` | Cualquier SO | Registros MX del dominio |
| `dig www.ejemplo.es` | Linux/macOS | Respuesta completa con TTL y sección AUTHORITATIVE |
| `dig +trace www.ejemplo.es` | Linux/macOS | Toda la cadena: raíz → TLD → autoritativo |
| `ipconfig /flushdns` | Windows | Vacía la caché local (adiós respuestas viejas) |

> 💡 **La prueba maestra de DNS:** compara `nslookup dominio.com` (tu resolver) contra `nslookup dominio.com 8.8.8.8` (otro resolver). Si difieren, tu resolver está mal o su caché está vieja. Si coinciden y fallan, el problema está en la zona del dominio.

### NTP (cuando la hora importa)

| Comando | Dónde | Qué aporta |
|---|---|---|
| `show ntp status` | Cisco | ¿Synchronized? ¿Stratum? |
| `show ntp associations` | Cisco | Fuentes, offsets y alcance (`reach`) |
| `w32tm /query /status` | Windows | Estado del servicio de tiempo |
| `timedatectl status` | Linux (systemd) | Sincronización y fuentes NTP |

---

## 🕵️ Tres casos reales, paso a paso

### Caso 1: "El portátil no navega"

1. `ipconfig /all` → tiene IP 169.254.x.x (**APIPA**): el DORA falló. Problema en la escalera: **paso 1**.
2. `show ip dhcp pool` en el router → pool agotado: las exclusiones se comieron el rango.
3. Amplías el rango / ajustas exclusiones → `ipconfig /renew` → IP normal → navega.

### Caso 2: "Navega por IP pero no por nombre"

1. `ping 8.8.8.8` OK, `ping www.ejemplo.es` falla → **paso 4** (DNS).
2. `nslookup www.ejemplo.es` → "Server: UnKnown", sin respuesta: el DNS entregado por DHCP es una IP muerta.
3. Corriges `dns-server` en el pool → `ipconfig /renew` → resuelve.

### Caso 3: "No puedo iniciar sesión en el dominio" (solo en horarios raros)

1. Credenciales correctas, red perfecta, DNS perfecto… pero el equipo está **dos meses atrasado**.
2. Kerberos rechaza (tolerancia 5 min) → **paso 5** (hora).
3. El equipo apuntaba a un servidor NTP interno desmontado hace un año. Corriges la fuente → login OK.

> 🧠 **El patrón de los tres casos:** el síntoma lo cuenta el usuario ("no navega", "no va el correo", "no entra en el dominio"); la causa la encuentras tú subiendo la escalera en orden. Saltarte escalones es como medir la tensión con el interruptor pegado: verás algo, pero no lo que importa.

---

## 🤬 CONRAD VS EL MUNDO: "Reinicio el router y ya está"

**Usuario del soporte:** — Cada vez que algo falla, reinicio el router. Funciona siempre.

**CONRAD:** — Claro, y si tu coche arranca mal, lo tiras al río y compras otro. Reiniciar es un botón de pánico, no un diagnóstico. Cuando ese "arreglo" dure menos cada vez, y llegue el día en que reiniciar ya no arregle nada… estarás diagnosticando en frío, sin datos y con el jefe encima.

**CONRAD:** — Y lo peor: al reiniciar el router pierdes el estado: las concesiones DHCP, los contadores de errores, la tabla de vecinos… la evidencia. Has borrado las huellas del crimen ANTES de que llegue la policía.

**La lección:** antes de reiniciar nada: `show` (captura el estado), `debug` si hace falta, y solo entonces, si el plan lo dice, reiniciar. El diagnóstico es un método, no un exorcismo.

---

## 🧠 Mini-chequeo

1. Enumera la escalera del servicio en orden y di qué comando abre cada escalón en un cliente Windows.
2. Un PC tiene IP 169.254.10.34. ¿Qué significa y en qué escalón estás trabajando?
3. ¿Qué comparación harías para saber si el problema de resolución está en tu resolver interno o en el dominio remoto?
4. ¿Por qué reiniciar el router puede ser contraproducente durante un diagnóstico?

<details>
<summary>🔄 Respuestas</summary>

1. **1) IP/Gateway** (`ipconfig /all`), **2) gateway** (`ping 192.168.1.1`), **3) Internet por IP** (`ping 8.8.8.8`), **4) DNS** (`nslookup`), **5) hora** (`show ntp status` en servidores / `w32tm` en Windows). No se sube de escalón hasta que el actual falla o está verde.
2. Es una dirección **APIPA** (169.254.0.0/16): el cliente no encontró servidor DHCP. Estás en el escalón 1; revisa pools, exclusiones, helper o conectividad con el servidor.
3. `nslookup dominio.com` (mi resolver) contra `nslookup dominio.com 8.8.8.8` (resolver externo). Difieren → tu resolver/caché. Coinciden mal → zona remota.
4. Porque borra el **estado** (concesiones, contadores, tablas, debugs) que es justamente la evidencia del problema: diagnostico primero, reiniciar después.
</details>

---

## ✅ Resumen en 3 frases

- Diagnóstico de servicios = **escalera en orden**: DHCP → conectividad → DNS → hora.
- Cada escalón tiene sus comandos: `ipconfig`/`show ip dhcp`, `ping`, `nslookup`/`dig`, `show ntp`.
- La prueba maestra de DNS es comparar resolvers; y nunca reinicies antes de capturar el estado.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| APIPA | Auto-IP 169.254.x.x cuando el DORA falla |
| Resolver | Servidor DNS con el que habla tu equipo |
| Recursivo/iterativo | Tipos de consulta DNS (PC→resolver / resolver→jerarquía) |
| Reach | Alcance NTP (377 = 8/8 sondeos OK) |
| Escalera del servicio | Orden de diagnóstico: IP → gateway → Internet → nombres → hora |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-servicios-red) · **Anterior:** [07 · NTP en Cisco: configuración y verificación](/ApuntesRedes/10-servicios-red/07-ntp-cisco) · **Siguiente:** [09 · Cierre](/ApuntesRedes/10-servicios-red/09-cierre)
