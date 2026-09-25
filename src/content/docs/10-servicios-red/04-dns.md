---
title: "04 — DNS: la guía telefónica de Internet"
description: Nombres para humanos, IPs para máquinas 📖
---

<p><small>Nombres para humanos, IPs para máquinas 📖</small></p>

> 🗺️ **Estás en:** 🗄️ **Servicios de red: DHCP, DNS y NTP** → 04 · DNS: la guía telefónica de Internet

---

## 📬 La idea en una frase

> **DNS** (*Domain Name System*) traduce nombres de dominio —que tú recuerdas— en direcciones IP —que los equipos necesitan— mediante un sistema jerárquico y distribuido que es, probablemente, el servicio más exitoso de la historia de Internet.

En unidades anteriores viste DNS como "el servicio que hace la web usable". Ahora lo abrimos del todo: quién resuelve, cómo se reparte el trabajo y por qué este diseño aguanta miles de millones de consultas al día sin despeñarse.

---

## 🌳 La jerarquía: un árbol invertido

DNS no es una base de datos gigante: es un **árbol** repartido por el mundo. De derecha a izquierda en un nombre:

```
                    .  (raíz)
                    |
      ┌─────────┬───┴────┬──────────┐
     .es       .com      .org      .eu   (TLD)
      |
  ┌───┴────┐
 .gob     .edu            (segundo nivel)
  |
 ejemplo.es                (dominio del propietario)
  |
 www.ejemplo.es            (host / subdominio)
```

Cada nivel delega en el de abajo: la raíz no sabe dónde está `www.ejemplo.es`, pero sabe quién gestiona el `.es`; los servidores del `.es` saben quién gestiona `ejemplo.es`; y los servidores de `ejemplo.es` conocen por fin la IP de `www`. Esa delegación en cadena es la clave del sistema.

---

## 🔄 Resolución recursiva vs iterativa

Cuando escribes `www.ejemplo.es` en el navegador, la conversación real es esta:

| Paso | Conversación | Tipo |
|---|---|---|
| 1 | PC → servidor DNS configurado (el *resolver*): "dame la IP de www.ejemplo.es" | **Recursiva** (el resolver responde SIEMPRE con la respuesta final o un error) |
| 2 | Resolver → servidor raíz: "¿quién gestiona .es?" | **Iterativa** (el raíz contesta: "pregunta a estos") |
| 3 | Resolver → servidor .es: "¿quién gestiona ejemplo.es?" | Iterativa |
| 4 | Resolver → servidor de ejemplo.es: "¿IP de www?" | Iterativa |
| 5 | El servidor autoritativo contesta la IP → el resolver la entrega al PC | — |

La diferencia conceptual:

- **Recursiva:** "consíguemelo y no vuelvas sin la respuesta" (cliente → resolver).
- **Iterativa:** "yo no lo sé, pero pregunta ahí" (resolver → jerarquía).

Tu PC hace **una** pregunta y recibe **una** respuesta. El trabajo sucio lo hace el resolver de tu ISP o de la empresa, que encima guarda el resultado en **caché**.

---

## ⚡ La caché: memoria del sistema

Cada respuesta DNS viaja con un **TTL** (time to live, en segundos): cuánto tiempo puede guardarse en caché. La caché existe en el PC, en el resolver y en medio de todos. Consecuencias prácticas:

- Lo que ya se resolvió, se responde al instante y sin salir a la red.
- Al cambiar un registro DNS, el mundo no lo ve al instante: hay que esperar a que expiren los TTL.
- Cuando diagnosticas DNS, siempre debes preguntarte: "¿estoy viendo una respuesta fresca o una caché vieja?"

En Windows, `ipconfig /displaydns` y `ipconfig /flushdns` te dejan espiar y vaciar esa memoria.

---

## 📝 Los registros: qué hay dentro de una zona

Un servidor DNS no guarda "nombres e IPs" a secas: guarda **registros tipados**. Los esenciales:

| Registro | Qué guarda | Ejemplo |
|---|---|---|
| **A** | Nombre → IPv4 | www.ejemplo.es → 203.0.113.10 |
| **AAAA** | Nombre → IPv6 | www.ejemplo.es → 2001:db8::10 |
| **CNAME** | Alias → otro nombre | web.ejemplo.es → www.ejemplo.es |
| **MX** | Servidores de correo del dominio (con prioridad) | 10 mail.ejemplo.es |
| **NS** | Servidores DNS autoritativos de la zona | ns1.ejemplo.es |
| **PTR** | IP → nombre (resolución inversa) | 10.113.0.203.in-addr.arpa → www.ejemplo.es |
| **SOA** | Metadatos de la zona: administrador, seriales, timers | — |

> 💡 **MX y la tolerancia a fallos del correo:** los registros MX llevan número de prioridad; si el servidor de correo principal no responde, el remitente prueba con el siguiente. Es balanceo por planificación, no por hardware.

---

## 🪞 Zona directa y zona inversa

- **Zona directa:** nombres → IPs (registros A/AAAA). Es la que todos conocen.
- **Zona inversa:** IPs → nombres (registros PTR dentro de dominios especiales `in-addr.arpa`). La usan los servidores de correo para verificar que quien les habla es quien dice ser, y muchas herramientas de log para mostrar nombres en vez de números.

Si un día un correo tuyo sale rechazado por "no reverse DNS", ya sabes: a tu IP pública le falta su PTR.

---

## 🧠 Mini-chequeo

1. ¿Qué diferencia hay entre una consulta recursiva y una iterativa? ¿Quién hace cuál?
2. ¿Para qué sirve el TTL de un registro DNS y qué implica al cambiar una IP de un servidor?
3. ¿Qué registro usarías para: (a) un alias de web, (b) los servidores de correo, (c) la resolución inversa?
4. Un usuario "no navega" pero `ping 8.8.8.8` funciona. ¿Qué compruebas primero y con qué comando?

<details>
<summary>🔄 Respuestas</summary>

1. **Recursiva:** el que pregunta exige la respuesta final (la hace el PC hacia su resolver). **Iterativa:** cada servidor remite al siguiente (las hace el resolver contra la jerarquía: raíz, TLD, autoritativo).
2. El TTL define cuántos segundos puede estar el registro en caché. Si cambias una IP, los resolvers del mundo seguirán sirviendo la antigua hasta que expire su TTL; por eso se baja el TTL antes de una migración.
3. (a) **CNAME**, (b) **MX**, (c) **PTR**.
4. Sospechas de **DNS** (la conectividad funciona). Compruebas con `nslookup www.ejemplo.es` (o `dig`): verás si la resolución falla, responde mal o apunta a una IP incorrecta.
</details>

---

## ✅ Resumen en 3 frases

- DNS es un árbol jerárquico delegado: raíz → TLD → dominio → host, y nadie guarda la tabla entera.
- El cliente pregunta en **recursivo**; el resolver trabaja en **iterativo** y todo lo guarda en caché según los **TTL**.
- Los registros tipados (A, AAAA, CNAME, MX, NS, PTR) son el idioma de las zonas; la inversa (PTR) importa más de lo que crees.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Resolver | Servidor DNS que hace las consultas en tu nombre |
| Autoritativo | Servidor que tiene la respuesta oficial de una zona |
| TTL | Segundos que una respuesta puede vivir en caché |
| Zona | Porción del árbol DNS que gestiona un servidor |
| in-addr.arpa | Dominio especial de la resolución inversa |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-servicios-red) · **Anterior:** [03 · DHCP en Cisco y el agente de reenvío](/ApuntesRedes/10-servicios-red/03-dhcp-cisco) · **Siguiente:** [05 · Registros y zonas DNS](/ApuntesRedes/10-servicios-red/05-registros-dns)
