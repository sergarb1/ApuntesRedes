---
title: "09 — Cierre: consolida lo aprendido"
description: El cierre práctico, con DORA, dominios y relojes en hora 🗄️
---

<p><small>El cierre práctico, con DORA, dominios y relojes en hora 🗄️</small></p>

> 🗺️ **Estás en:** 🗄️ **Servicios de red: DHCP, DNS y NTP** → 09 · Cierre

---

Has terminado la teoría: sabes cómo un cliente consigue IP con DORA, cómo se monta un pool en Cisco, cómo DNS resuelve nombres en cadena y por qué sin NTP no hay auditoría que valga. Este cierre es el aterrizaje: recorres lo aprendido con juegos, un laboratorio de red con servicios averiados y las preguntas que te harán en una entrevista. Léelo justo después del [punto 8](/ApuntesRedes/10-servicios-red/08-diagnostico-servicios) y antes de abrir los boletines.

---

## ⭐ Sé el Paquete

> *Eres un portátil recién sacado de la caja, conectado al switch de una oficina. Tu usuario aprieta el botón de encender. Tú no tienes ni idea de quién eres: ni IP, ni nombre, ni hora. Empieza tu bautizo de red.*

**Paso 1:** Tu pila arranca y grita al mundo un **DISCOVER** en broadcast. El switch lo inunda por todos sus puertos de la VLAN 10.

**Paso 2:** El router de la VLAN escucha. Tiene un pool para tu red, excluye las 40 primeras direcciones y te ofrece la .57 con lease de 24 horas, gateway .1 y DNS 10.0.0.5.

**Paso 3:** Aceptas con REQUEST, confirmas con el ACK y, ya con identidad, tu navegador pregunta por `intranet.empresa.local`. El resolver responde con la 10.0.0.20. Pero hay un detalle raro: tu reloj marca 2019 y el servidor de la intranet te rechaza el acceso.

**¿Qué ha pasado?**
1. **El DORA fue correcto pero el NTP está sin configurar** → ✅ ¡Correcto! IP y nombres fluyen, pero la hora desajustada rompe la autenticación con el servidor. Toque final: `ntp server` en el portátil.
2. **El DHCP entregó una IP equivocada** → ❌ Si la IP fuera errónea, ni siquiera habrías resuelto el nombre de la intranet. El síntoma no está en el escalón 1 sino en el 5.
3. **El DNS está caído** → ❌ El nombre resolvió (te dio la IP). El rechazo es posterior y temporal: es hora, no nombres.

> 💡 **La moraleja del portátil recién nacido:** un equipo se integra en la red en capas de servicio: primero identidad IP (DHCP), luego memoria de nombres (DNS) y por último consenso horario (NTP). Cuando algo falla, pregunta primero en qué capa de servicio te quedaste atascado.

---

## 🔥 Fireside Chat: DHCP vs DNS

> *En la sala de servidores, mientras un técnico instala un rack nuevo, el servidor DHCP y el servidor DNS discuten sobre quién es más importante.*

**DHCP:** — Sin mí, no hay fiesta. Yo le doy la IP a cada equipo que entra. Yo soy el anfitrión.

**DNS:** — Anfitrión de qué, de números? Los usuarios no escriben 192.168.1.57 en el navegador. Escriben nombres. Yo soy la memoria de esta casa.

**DHCP:** — Pues curiosidad: cuando me preguntan por opciones, yo entrego TU dirección en la opción 6. Soy yo quien les dice dónde vives, creo.

**DNS:** — Y yo guardo registros PTR que dicen quién es quién por IP. Somos incluso espejo el uno del otro, a ratos.

**DHCP:** — Lo que me molesta es que cuando caigo, la culpa la tienes tú: el usuario ve "no navega" y grita "¡el DNS!".

**DNS:** — Te entiendo. Cuando yo caigo, gritan "¡no hay Internet!", que es mentir un poquito también. La red está; lo que se cayó es la traducción.

**DHCP:** — ¿Y el NTP? Ese calla siempre.

**DNS:** — Ese no discute: dice la hora y punto. Pero ojo, cuando se desajusta, caen los certificados y la autenticación, y entonces nos culpan a los dos.

**DHCP:** — …¿O sea que somos correa de transmisión el uno del otro?

**DNS:** — Siempre lo fuiste. Yo entrego nombres que apuntan a IPs que tú repartes. Bienvenido al servicio, compañero.

---

## 🕵️ ¿Quién Soy?

1. Soy una conversación de cuatro mensajes y acabo dándote una identidad.

2. Guardo el mapa de mi dominio en registros tipados y cobro TTL por cada recuerdo.

3. No discuto, no negocio: solo digo la hora, pero si me caigo, los certificados y el dominio se caen conmigo.

4. Convierto broadcasts en unicast para que DHCP cruce el router.

<details>
<summary>🔄 Respuestas</summary>

1. **DHCP** — Discover, Offer, Request, Ack.
2. **DNS** — Zonas con registros A, CNAME, MX… y caché por TTL.
3. **NTP** — Sincronización horaria; sin ella, Kerberos y TLS fallan.
4. **El agente de reenvío (ip helper-address)** — El router que reenvía DHCP entre subredes.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "Puse el DNS de Google en todos los equipos y todo solucionado"

**Administrador junior:** — He puesto 8.8.8.8 como DNS en todos los PCs de la empresa. Ahora resolvemos seguro y rápido.

**CONRAD:** — Claro. Y cuando el usuario escriba `intranet`, ¿quién le contesta? ¿Los señores de Google? Ellos no saben que tu `intranet.empresa.local` es la 10.0.0.20. Ese registro vive en TU servidor DNS interno, que acabas de dejar sin visitantes.

**CONRAD:** — Y de propina: has perdido la caché corporativa, los filtros de dominio y el registro de consultas. Seguridad, gestión y rendimiento, los tres regalos del día.

**La lección:** el DNS interno manda dentro, y el reenviador conecta con fuera. En el cliente se configura el DNS interno; el interno, a su vez, reenvía lo desconocido a 8.8.8.8. La cadena importa: cliente → DNS interno → reenviador → mundo.

---

## ⚡ Laboratorio de tortura: Red con servicios averiados

> **Duración:** 1,5 horas
> **Material:** Packet Tracer — 1 router 2911, 1 switch 2960, 3 PCs, 1 servidor (DHCP/DNS/NTP)

**Montaje:** Router → Switch → 3 PCs. Servidor conectado al switch en la 192.168.1.200.

**Configura al inicio:**
1. Router como gateway 192.168.1.1 y **servidor DHCP** (pool .101-.150, excluye .1-.100).
2. Servidor con DNS activado: registro `www.empresa.local` → 192.168.1.200, y NTP activado como stratum 4.
3. Router sincronizado con el servidor NTP (`ntp server 192.168.1.200`).
4. Comprueba que los 3 PCs obtienen IP y resuelven `www.empresa.local` en el navegador.

**Ahora, SIN MIRAR, tu profesor introduce TRES fallos:**
- Fallo A: elimina `default-router` del pool DHCP.
- Fallo B: borra el registro DNS `www.empresa.local` del servidor.
- Fallo C: quita `ntp server` del router y desajusta su reloj con `clock set`.

**Reto por equipos:** cada grupo recibe la red averiada y debe diagnosticar los tres fallos **sin ver la configuración**, solo con comandos `show`, `ipconfig`, `nslookup` y pruebas de navegador. Documenta síntoma → escalón → causa → solución de cada uno.

**Fallo intencionado extra:** el profesor cambia la MAC reservada de la impresora en el servidor, de modo que la reserva apunta a una MAC que no existe en la red. La impresora, con IP estática .50 mal elegida, choca con la reserva. Diagnóstico: `show ip dhcp conflict`.

> **Pista 1 (fallo A):** los PCs tendrán IP pero "no navega nada". Sube la escalera: ¿IP? sí. ¿Gateway ping? falla. Mira `ipconfig /all`: ¿qué gateway entregó DHCP?
>
> **Pista 2 (fallo B):** `ping 192.168.1.200` funciona pero el navegador no encuentra `www.empresa.local`. Escalón 4. ¿Qué responde `nslookup www.empresa.local 192.168.1.200`?
>
> **Pista 3 (fallo C):** `show ntp status` en el router dice "Clock is unsynchronized". Y `show clock` te delata la fecha ridícula.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Repartidor oficial** | Configurar un pool DHCP con exclusiones y reservas a la primera |
| 🏅 **Traductor jurado** | Explicar la cadena raíz → TLD → autoritativo sin mirar apuntes |
| 🏅 **Cronometrista** | Dejar 3 equipos sincronizados con NTP autenticado |
| 🏅 **Cazador de fallos** | Diagnosticar los 3 fallos del laboratorio en menos de 30 minutos |

---

## 🧠 Atrévete a pensar

1. ¿Por qué el Discover y el Request viajan en broadcast pero el Offer puede ir en unicast? ¿Qué depende para que el servidor elija una u otra forma?
2. Diseña el plan de servicios de una sucursal con 50 equipos, un router y un enlace WAN a la central donde vive el servidor DHCP central. ¿Qué configuras y dónde?
3. Cambias el servidor web de la empresa a una IP nueva. ¿Qué tres cosas miras antes de tocar nada para que el cambio no rompa el acceso?
4. Un compañero propone `ntp master` en todos los routers "para que nunca falte la hora". ¿Qué le respondes?

<details>
<summary>💡 Soluciones</summary>

1. El Offer puede ir en unicast si el cliente ya indicó su IP (o el agente la conoce) y la red lo permite; si el cliente aún no tiene IP, solo puede recibir broadcast. Depende del flag broadcast del cliente y de si hay relay.
2. Router de sucursal: `ip helper-address` apuntando al servidor central en la interfaz LAN; servidor central: pool dedicado para la subred de la sucursal (con `default-router` correcto). Opcional: un servidor DHCP local de respaldo con un pool pequeño para sobrevivir a cortes WAN.
3. (a) Bajar el TTL del registro A de `www` con antelación (p. ej. a 300 s) para que la caché se renueve rápido; (b) el serial de la zona sube al guardar; (c) verificar la resolución desde fuera (`nslookup` contra un resolver externo) antes y después.
4. Que un máster en cada router significa relojes autoritativos en desacuerdo: mejor un diseño jerárquico (core sincronizado con fuentes externas + `ntp master` solo como respaldo del core, y todos los demás clientes del core). "Nunca falte la hora" se resuelve con redundancia de fuentes, no con másters rivales.

</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. Diálogo completo de asignación DHCP (sigla)
3. Registro DNS que guarda un alias
5. Nivel de profundidad respecto a la fuente horaria
7. Comando IOS que reenvía DHCP a otra subred (2 palabras, 15 letras)

Vertical:
2. Mensaje con el que el servidor confirma la concesión
4. Registro DNS de los servidores de correo
6. Tiempo de vida de una respuesta DNS en caché (sigla)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. DORA, 3. CNAME, 5. STRATUM, 7. IPHELPERADDRESS

**Vertical:** 2. ACK, 4. MX, 6. TTL

</details>

---

## 💬 Preguntas de entrevista de trabajo

1. **"Explícame qué pasa, mensaje a mensaje, cuando conecto un PC a la red."**
2. **"Un usuario no navega. ¿Qué orden de comprobaciones sigues?"**
3. **"¿Qué registros DNS mínimos montarías para una empresa con web, correo y resolución inversa?"**
4. **"¿Por qué es importante NTP en una red con logs centralizados?"**
5. **"¿Cómo harías que una IP concreta sea siempre la misma sin configurarla en el equipo?"**

> 💡 **Cómo encararlas:** la 1 pide el DORA completo mencionando broadcast/unicast y las opciones entregadas (gateway, DNS, lease). La 2 es la escalera: IP → gateway → Internet por IP → nombres → hora; nómbrala como método, no como adivinanza. La 3: A/AAAA para la web, MX (con prioridad) para correo, NS/SOA como estructura y PTR para la inversa. La 4: correlación de incidentes, certificados y Kerberos; cita la tolerancia de 5 minutos si recuerdas datos. La 5: reserva DHCP por MAC, con la ventaja de gestión centralizada frente a la IP estática.

---

## 🤷 No hay preguntas tontas

> ❓ **¿Puedo tener dos servidores DHCP en la misma red?**

Sí, y es práctica recomendada para tolerancia a fallos (con rangos divididos o con Windows Server en modo failover). Lo que NO debes hacer es duplicar rangos completos a ciegas: dos servidores ofreciendo la misma IP a dos equipos distintos = conflictos. Divide el rango (por ejemplo, .100-.149 en uno y .150-.199 en otro) o usa mecanismos de failover coordinado.

> ❓ **Si cambio el DNS en el pool de DHCP, ¿los PCs lo notan al momento?**

No hasta que renueven concesión o les hagas `ipconfig /renew`. La IP del DNS viaja con la concesión: mientras no se renueve, el cliente sigue usando el antiguo. En urgencias: renew en los clientes afectados (o reinicio de la NIC) y, si el problema era de caché DNS, `ipconfig /flushdns`.

> ❓ **¿La hora se puede sincronizar sin NTP? ¿Y eso no vale?**

Existen alternativas (SNTP en dispositivos simples, PTP para precisión de microsegundos en industrias concretas, o `w32tm` jerárquico en Windows), pero NTP es el estándar de red por precisión, seguridad (autenticación) y disponibilidad de fuentes públicas. "La pongo a mano en cada equipo" no es una alternativa: es la garantía de que dentro de un mes ningún log concuerde con otro.

---

## 🎬 Poscréditos

El portátil recién estrenado consigue su IP, aprende a pronunciar nombres ajenos y, tras una pelea con el reloj, consigue poner en hora su vida. Su usuario solo sabe que "todo funciona". CONRAD, desde la consola, murmuró: *"Ese usuario no sabe lo que ha tenido que pasar por DORA, una jerarquía DNS y un stratum para poder ver gatos en Internet. Y lo peor es que no quiere saberlo. Somos los invisibles del invisible."*

**PRÓXIMAMENTE:** Redes inalámbricas: SSIDs, canales, estándares y por qué tu vecino es tu peor enemigo. Ahora que la red da servicios, toca liberar los cables… y pagar el precio en interferencias.

---

## ✅ Criterios de evaluación cubiertos (RA2)

**RA2: Integra ordenadores y periféricos en redes cableadas e inalámbricas.**

| CE | Criterio | Cubierto |
|---|---|---|
| d) | Direccionamiento lógico IP (automatizado) | ✅ Puntos 2-3 y ⚡ Laboratorio |
| g) | Servicios de configuración automática | ✅ Puntos 2-3 + 🧠 Atrévete (punto 9) |
| h) | Servicios de resolución de nombres | ✅ Puntos 4-5 + 💬 Entrevista (punto 9) |
| i) | Servicios de infraestructura de red | ✅ Puntos 6-7 + ⚡ Laboratorio (NTP) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-servicios-red) · **Anterior:** [08 · Diagnóstico de servicios](/ApuntesRedes/10-servicios-red/08-diagnostico-servicios) · **Siguiente:** [Redes inalámbricas](/ApuntesRedes/11-redes-inalambricas)
