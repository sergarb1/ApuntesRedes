---
title: "09 — Cierre: consolida lo aprendido"
description: El cierre práctico de la unidad, con chicha y diagnóstico real 🧠
---

<p><small>El cierre práctico de la unidad, con chicha y diagnóstico real 🧠</small></p>

> 🗺️ **Estás en:** 🩺 U11 → 09 · Cierre

---

Has terminado la teoría. Este cierre es el aterrizaje: recorre lo aprendido con juegos, un laboratorio real con Packet Tracer y Wireshark, y las preguntas que te harán en una entrevista. Léelo justo después del [punto 8](/ApuntesRedes/11-diagnostico-monitorizacion/08-caso-practico-de-diagnostico) y antes de abrir los boletines.

---

## ⭐ Sé el Diagnóstico

> *Un usuario dice: "No puedo acceder a intranet.empresa.com". Tú, como administrador, sigues el método OSI de abajo arriba:*

1. **Capa 1:** ¿El cable está conectado? ¿LEDs? ✅ Sí.
2. **Capa 2:** ¿La MAC está aprendida en el switch? `show mac address-table` ✅.
3. **Capa 3:** ¿Tiene IP? `ipconfig`. Sí. ¿Hace ping al gateway? Sí. ¿Hace ping a 8.8.8.8? No.
4. **Capa 4:** ¿Puerto 443 accesible? `telnet intranet.empresa.com 443` — No responde.
5. **Capa 7:** ¿El DNS resuelve? `nslookup intranet.empresa.com` — ¡Resuelve a otra IP! El registro DNS está obsoleto.

**Problema:** DNS desactualizado. Solución: Actualizar registro DNS o limpiar caché local.

> 💡 **¿Qué habrías hecho tú?** Antes de leer el desenlace, piensa: si el ping a 8.8.8.8 falla pero el gateway responde, ¿qué capa acotarías primero? La respuesta está en la [regla de oro del punto 1](/ApuntesRedes/11-diagnostico-monitorizacion/01-metodologia-de-diagnostico): el problema está en la salida de la red, no en la LAN del usuario.

---

## 🔥 Fireside Chat: Ping vs Traceroute

> *Dos comandos de diagnóstico discuten en la terminal.*

**Ping:** — Yo soy el primero en usarse. Mando un Echo Request y espero un Reply. Si lo recibo, hay conectividad. Simple.

**Traceroute:** — Simple, sí. Pero si falla, no dices nada más. Yo te muestro CADA SALTO. Te digo dónde se pierde el paquete.

**Ping:** — A veces es suficiente saber que no hay comunicación.

**Traceroute:** — Y a veces necesitas saber si el problema está en tu router, en el ISP, o al otro lado del mundo. Para eso estoy yo.

**SNMP:** — Callaos los dos. Mientras vosotros esperáis a que alguien grite, yo monitorizo 24/7 y os aviso antes de que el usuario se queje.

**Syslog:** — Y yo guardo el historial de todo lo que pasa. Cuando algo falla, tengo los logs.

**NetFlow:** — Y si alguien pregunta *quién* consume la red, no le basta con el ping ni con los contadores: necesito registrar flujos, y ahi estoy yo.

**Ping:** — Vale, vale. Pero sin mí, ninguno sabríais si hay conectividad básica.

---

## 🕵️ ¿Quién Soy?

1. Te digo si un host está reachable. Mando ICMP Echo Request. Espero Echo Reply.
2. Muestro cada salto que da un paquete hasta el destino.
3. Capturo paquetes en tiempo real. Analizo protocolos. Soy la navaja suiza del administrador.
4. Soy un protocolo que permite monitorizar dispositivos de red. Leo variables como uso de CPU, tráfico, temperatura.
5. Soy un sistema de logging centralizado. Recibo mensajes de routers, switches y servidores.

<details>
<summary>🔄 Respuestas</summary>

1. **Ping** (ICMP).
2. **Traceroute** (tracert en Windows, traceroute en Linux).
3. **Wireshark**.
4. **SNMP** (Simple Network Management Protocol).
5. **Syslog**.
</details>

---

## 🤬 CONRAD VS EL MUNDO: "He probado ping y no funciona"

**CONRAD:** — "Usuario dice: *He probado ping y no funciona*. Vale, ¿a dónde? *A no sé, a Internet*. ¿Qué es 'Internet'? ¿8.8.8.8? ¿google.com? ¿El ping a tu gateway funciona? *No lo he probado*. Pues PRUÉBALO. Si el ping al gateway falla, el problema está en tu casa. Si funciona pero a 8.8.8.8 no, el problema está más allá."

**Regla de oro:** Ping a tu gateway primero. Luego a 8.8.8.8. Luego a google.com. Aísla el problema progresivamente.

**CONRAD:** — "Y no me vengas con 'he probado ping y ya'. Un ping fallido puede ser el firewall bloqueando ICMP. Si sospechas de un servicio, prueba un PUERTO: `telnet ip 443`. El ping es un síntoma, no un veredicto."

---

## ⚡ Laboratorio de tortura: Red averiada

> **Duración:** 1,5 horas
> **Herramienta:** Packet Tracer, Wireshark

**Escenario:** Te dan una red preconfigurada con 5 fallos ocultos:
1. Un cable desconectado
2. Una interfaz de router "shutdown"
3. Una ACL que bloquea ICMP
4. Una ruta estática con máscara incorrecta
5. Un servidor DNS con IP incorrecta

**Tareas:** Usa ping para identificar dónde falla la comunicación, traceroute para ver hasta dónde llega, Wireshark para capturar y analizar el tráfico, y documenta cada fallo y cómo lo resolviste.

**Verificación por capas (la guía que te salvará):**

| Capa | Qué compruebas | Comando / prueba |
|---|---|---|
| 1 Física | ¿El enlace está up? | `show ip interface brief` — interfaz con estado `down` |
| 2 Enlace | ¿La MAC está aprendida? | `show mac address-table` |
| 3 Red | ¿Hay ruta y conectividad IP? | `ping gateway` → `ping 8.8.8.8` → `show ip route` |
| 4 Transporte | ¿El puerto responde? | `telnet destino puerto` |
| 7 Aplicación | ¿El nombre resuelve? | `nslookup dominio` → `ping dominio` |

**Fallo intencionado extra:** antes de empezar, desactiva Wireshark durante la primera captura y analiza luego la captura guardada. ¿Qué pistas ves que en vivo habrías podido saltarte? Documenta tu proceso: un troubleshooting sin notas es un diagnóstico que no enseña nada.

> **Pista 1:** si el ping a una IP funciona pero los nombres no, el fallo 5 (DNS) es el culpable: captura con el filtro `dns` y verás las consultas que "salen y no vuelven".
>
> **Pista 2:** si una interfaz aparece `down/down` en `show ip interface brief`, o es el fallo 1 (cable) o el fallo 2 (shutdown). Si aparece `up/down`, el problema está en la capa 3 de esa interfaz.
>
> **Pista 3:** la ruta con máscara incorrecta se detecta con `show ip route`: la ruta existe pero no coincide con la subred real, y el tráfico muere en el router. Comprueba con `traceroute` dónde se detiene el paquete.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Ping Master** | Diagnosticar un fallo de conectividad en menos de 5 minutos |
| 🏅 **Wireshark Ninja** | Capturar y analizar un handshake TCP completo |
| 🏅 **SNMP Explorer** | Leer una OID remota y obtener un valor |
| 🏅 **Troubleshooter** | Resolver los 5 fallos del laboratorio |

---

## 🧠 Atrévete a pensar

1. ¿Qué comando usarías para ver la ruta completa hasta un destino?
2. ¿Cómo detectarías un bucle de routing con traceroute?
3. ¿Qué diferencia hay entre SNMP v1, v2c y v3?
4. ¿Qué es una OID en SNMP? Pon un ejemplo.
5. Si ves muchos "TCP Retransmission" en Wireshark, ¿qué está pasando?

<details>
<summary>💡 Soluciones</summary>

1. **traceroute** (Linux) o **tracert** (Windows).
2. Si ves los mismos routers repitiéndose en la salida de traceroute (RouterA → RouterB → RouterA → RouterB...), hay un bucle.
3. **v1:** básico, comunidades en texto claro. **v2c:** mejoras en rendimiento, sigue texto claro. **v3:** cifrado y autenticación (SHA + AES).
4. **OID** (Object Identifier) identifica una variable SNMP. Ej: `1.3.6.1.2.1.1.5.0` = nombre del sistema (sysName).
5. Hay **pérdida de paquetes** o **congestión** en la red. El emisor no recibe ACKs y reenvía. Causas: buffer lleno, ancho de banda insuficiente, cable defectuoso.
</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. Protocolo de monitorización de dispositivos (4 letras)
4. Variable que identifica un recurso SNMP (3 letras)
5. Puerto por defecto de SNMP (2 dígitos)
7. Sistema de logging centralizado (6 letras)
8. Herramienta de captura de paquetes (9 letras)

Vertical:
2. Herramienta gráfica de captura de paquetes (9 letras)
3. Comando que muestra la ruta hasta un destino en Windows (6 letras)
6. Protocolo usado por ping (4 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. SNMP, 4. OID, 5. 161, 7. SYSLOG, 8. WIRESHARK
**Vertical:** 2. WIRESHARK, 3. TRACERT, 6. ICMP

</details>

---

## 💬 Preguntas de entrevista de trabajo

1. **"Un usuario no puede navegar. Descríbeme tu proceso de diagnóstico paso a paso."**
2. **"¿Qué diferencia ves entre SNMP v2c y v3?"**
3. **"Has visto en Wireshark muchos paquetes TCP Retransmission. ¿Qué significa?"**
4. **"Configura un sistema de monitorización básico con SNMP."**
5. **"¿Qué es NetFlow? ¿En qué se diferencia de SNMP?"**

> 💡 **Cómo encararlas:** la 1 es la "pregunta reina". Recorre el mismo camino del ⭐ Sé el Diagnóstico: capa 1 (cable/LEDs) → capa 2 (MAC table) → capa 3 (ping al gateway y más allá) → capa 4 (telnet al puerto) → capa 7 (DNS y aplicación). Si lo cuentas con fluidez y mencionas que confirmarías con Wireshark, ya eres medio administrador.

---

## 🤷 No hay preguntas tontas

> ❓ **¿Cuál es el comando de diagnóstico más eficaz en routers Cisco?**

No existe un único comando más eficaz, ya que depende del problema. Sin embargo, `show running-config | include <patrón>` permite filtrar la configuración en ejecución para mostrar solo las líneas que contienen un término específico, lo que agiliza la localización de configuraciones concretas. Otros comandos esenciales son `show ip interface brief`, `show ip route`, `ping` y `traceroute`. La clave está en aplicar una metodología estructurada de diagnóstico.

> ❓ **¿Wireshark puede ver el tráfico de todos los PCs de la red?**

Solo si la red está configurada para ello. En un switch normal, cada puerto solo ve su tráfico. Para capturar todo, necesitas: **port mirroring** (SPAN) en el switch, un hub (obsoleto), o una tap de red.

> ❓ **¿SNMP es seguro?**

Depende de la versión. SNMP v1 y v2c envían la comunidad (contraseña) en texto claro. Cualquiera con Wireshark puede leerla. Para entornos de producción, usa **SNMP v3** con cifrado AES y autenticación SHA.

---

## 🎬 Poscréditos

> *La red es un organismo vivo: a veces se cae, a veces se recupera. La clave está en tener una metodología de diagnóstico sólida.*

*El enemigo no es el router, el switch o el cable. El enemigo es la falta de metodología.*

Y cuando la red se cae a las 3 de la madrugada, tu mejor amigo es el sistema que montaste cuando todo iba bien: el SNMP que te avisó del pico, el syslog que guardó el evento y el NetFlow que te contó quién lo causó. El diagnóstico es el arte; la monitorización, la ciencia que lo hace posible.

**PRÓXIMAMENTE EN U12:** *El futuro. Cloud, virtualización, SDN, IPv8. La red ya no es solo cables y routers. Es software.*

---

## ✅ Criterios de evaluación cubiertos

**RA2/Transversal: Diagnóstico y monitorización.**

| Criterio | Cubierto |
|---|---|
| h) Mapa físico y lógico | ✅ Metodología OSI + ⚡ Laboratorio |
| i) Monitorización SNMP | ✅ Teoría y configuración + 🧠 Atrévete |
| j) Herramientas de diagnóstico | ✅ Ping, traceroute, Wireshark + 🔥 Fireside |
| k) Syslog y logging | ✅ Configuración y niveles + 💬 Entrevista |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-diagnostico-monitorizacion) · **Anterior:** [08 · Caso práctico de diagnóstico](/ApuntesRedes/11-diagnostico-monitorizacion/08-caso-practico-de-diagnostico) · **Siguiente:** **[U12 · Cloud, virtualización y futuro](/ApuntesRedes/12-cloud-virtualizacion-futuro)**