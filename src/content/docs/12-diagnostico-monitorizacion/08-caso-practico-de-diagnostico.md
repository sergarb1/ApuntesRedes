---
title: 08 — Caso práctico de diagnóstico
description: Un día de troubleshooting real con las 5 capas del modelo OSI 🚑
---

<p><small>Un día de troubleshooting real con las 5 capas del modelo OSI 🚑</small></p>

> 🗺️ **Estás en:** 🩺 U12 → 08 · Caso práctico de diagnóstico

---

## 📬 La idea en una frase

> Este capítulo es la **puesta en escena de todo lo anterior**: un usuario no puede entrar en `intranet.empresa.com` y tú, administrador, lo resuelves aplicando el método OSI de abajo arriba del [punto 1](/ApuntesRedes/12-diagnostico-monitorizacion/01-metodologia-de-diagnostico), con los comandos del [punto 2](/ApuntesRedes/12-diagnostico-monitorizacion/02-comandos-esenciales) y el ojo de Wireshark del [punto 3](/ApuntesRedes/12-diagnostico-monitorizacion/03-wireshark).

Ningún fallo real se presenta con un cartel luminoso. Se presenta como "no puedo entrar a la intranet", y de ahí a la causa hay que recorrer cinco capas descartando hipótesis. Vamos a hacerlo juntos.

---

## 🚨 El escenario

> **Usuario:** "No puedo acceder a intranet.empresa.com". Ni el navegador ni la aplicación interna cargan.

Antes de tocar nada, anota el método: **OSI de abajo arriba**. El [punto 1](/ApuntesRedes/12-diagnostico-monitorizacion/01-metodologia-de-diagnostico) te dio la tabla de capas. Ahora la aplicamos paso a paso, como si fuera el ⭐ Sé el Diagnóstico que te espera en el [cierre](/ApuntesRedes/12-diagnostico-monitorizacion/09-cierre).

---

## 🪜 Paso a paso por las 5 capas

**Capa 1 — Física.** ¿El cable está conectado? ¿LEDs encendidos? ✅ Sí. Los enlaces no muestran `CRC errors` en `show interface`. Descartada.

**Capa 2 — Enlace.** ¿La MAC del equipo está aprendida en el switch? `show mac address-table` ✅ la muestra en el puerto correcto, en la VLAN correcta. `show spanning-tree` sin bloqueos anómalos. Descartada.

**Capa 3 — Red.** ¿Tiene IP válida? `ipconfig` ✅. ¿Ping al gateway? ✅ responde. ¿Ping a 8.8.8.8? **❌ No responde.** Aquí ya acotamos: la LAN está bien, el problema está en la salida (router de borde, NAT, ACL o ISP). Es exactamente la progresión de la regla de oro del [punto 1](/ApuntesRedes/12-diagnostico-monitorizacion/01-metodologia-de-diagnostico).

```
ping 192.168.1.1      →  ✅ responde     (LAN ok)
ping 8.8.8.8          →  ❌ timeout      (falla la salida)
```

**Capa 4 — Transporte.** ¿El puerto 443 responde? `telnet intranet.empresa.com 443` — **No conecta**. Pero espera: el ping a 8.8.8.8 ya fallaba, así que el puerto no puede responder aunque esté abierto. Sigamos subiendo.

**Capa 7 — Aplicación.** ¿Resuelve el nombre? `nslookup intranet.empresa.com` — **¡Resuelve a una IP distinta de la esperada!** El registro DNS está obsoleto: apunta al antiguo servidor, que ya no existe. Por eso el ping a 8.8.8.8 fallaba (salida rota) y por eso la intranet tampoco carga (DNS obsoleto). Son dos problemas encadenados.

```
nslookup intranet.empresa.com
Server:  8.8.8.8
Address: 8.8.8.8#53

Name:    intranet.empresa.com
Address: 203.0.113.10        ← IP vieja, el servidor real está en 10.10.10.5
```

**Problema:** registro DNS desactualizado. **Solución:** actualizar el registro DNS a la IP real del servidor (o limpiar la caché local si el registro ya estaba corregido).

---

## 📸 Confirmar con Wireshark (opcional pero elegante)

La teoría se confirma con una captura en el equipo del usuario, tal como aprendiste en el [punto 3](/ApuntesRedes/12-diagnostico-monitorizacion/03-wireshark):

- **Filtro `dns`:** verás la consulta `intranet.empresa.com` y la **respuesta con la IP obsoleta**. Ese paquete es la prueba del crimen.
- **Filtro `icmp`:** verás los Echo Requests saliendo hacia 8.8.8.8 sin respuestas: nadie los descarta con *Destination Unreachable*, simplemente no vuelven (ISP o firewall silencioso).

> 💡 **Fallo intencionado para practicar:** cambia en el laboratorio el DNS a `192.0.2.99` (IP de documentación que no existe). El ping a 8.8.8.8 seguirá funcionando, pero el navegador no cargará nada: la captura mostrará consultas DNS que salen y nunca vuelven. Es la misma lección: **conectividad ≠ resolución de nombres**.

---

## 🧠 Mini-chequeo

1. En el caso anterior, ¿por qué `telnet intranet.empresa.com 443` fallaba aunque el servicio estuviera abierto?
2. ¿Qué paquete exacto de la captura Wireshark confirmaría el diagnóstico de DNS obsoleto?
3. El usuario insiste en que "el servidor está caído". ¿Qué dato del caso demuestra que no lo está (todavía no lo sabes)?

<details>
<summary>🔄 Respuestas</summary>

1. Porque telnet primero **resuelve el nombre** y luego abre TCP. Como el DNS devolvía la IP vieja (inexistente), la conexión TCP no podía establecerse aunque el servicio real estuviera vivo.
2. El paquete **DNS response** que contiene la dirección IP obsoleta de `intranet.empresa.com`: con la consulta a la izquierda y la respuesta a la derecha (filtro `dns`), tienes la prueba documentada.
3. Ninguno, en realidad: el ping a 8.8.8.8 fallaba, así que aún no podías saber si el servidor estaba vivo. Eso es justo lo que enseña el método: **no saltes a conclusiones**; descarta capa por capa.
</details>

---

## 🗺️ Más allá: cuando el caso no es tan claro

El escenario anterior era "clásico". Los casos de entrevista lo complican con señales contradictorias:

| Síntoma | Sospecha clásica | Trampa |
|---|---|---|
| Ping a fuera falla, ping al gateway funciona | ACL o NAT mal | ¿El firewall bloquea ICMP? Confírmalo con un puerto |
| Web lenta desde las 9:00 | Saturación de enlace | Usa NetFlow del [punto 6](/ApuntesRedes/12-diagnostico-monitorizacion/06-netflow-y-ipfix) para ver quién consume |
| Un sitio remoto no ve al otro, ping sí | ACL que bloquea el puerto | Comprueba `show access-lists` en ambos extremos |
| Intermitente: funciona y falla | Cable o puerto defectuoso | Mira CRC errors y syslog del [punto 5](/ApuntesRedes/12-diagnostico-monitorizacion/05-syslog-y-logging) |

La regla que te salva en todos: **el síntoma delata la capa, pero la prueba final es siempre una captura o un log**. Wireshark, syslog y NetFlow no mienten; los usuarios, a veces sí (sin querer).

---

## ✅ Resumen en 3 frases

- Un caso real se resuelve aplicando el **método OSI de abajo arriba**: cada capa descartada te acerca a la causa.
- El diagnóstico del ejemplo combinó **ping** (capa 3), **telnet** (capa 4) y **nslookup** (capa 7): tres comandos, una causa: DNS obsoleto.
- Cuando el caso se complica, la prueba definitiva la ponen **Wireshark, syslog y NetFlow**: los registros no mienten.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Descarte | Eliminar hipótesis capa por capa hasta quedarse con la causa |
| Síntoma | Lo que el usuario ve; la capa lo delata |
| Registro obsoleto | Entrada DNS que apunta a una IP que ya no existe |
| Caché local | Resolución DNS guardada en el equipo, a veces desactualizada |
| Confirmación | Evidencia definitiva (captura o log) que cierra el caso |
| Correlación | Cruzar logs de varios equipos con la misma hora |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-diagnostico-monitorizacion) · **Anterior:** [07 · Herramientas de monitorización](/ApuntesRedes/12-diagnostico-monitorizacion/07-herramientas-de-monitorizacion) · **Siguiente:** [09 · Cierre](/ApuntesRedes/12-diagnostico-monitorizacion/09-cierre)