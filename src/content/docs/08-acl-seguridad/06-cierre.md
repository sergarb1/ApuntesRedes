---
title: "06 — Cierre: consolida lo aprendido"
description: El cierre práctico, con listas, wildcards y muñecos rusos 🛡️
---

<p><small>El cierre práctico, con listas, wildcards y muñecos rusos 🛡️</small></p>

> 🗺️ **Estás en:** 🛡️ **ACLs y seguridad de red** → 06 · Cierre

---

Has terminado la teoría: sabes cómo un paquete cruza las dos aduanas del router, escribes ACLs estándar y extendidas, colocas wildcards sin despeinarte, jugaste con time-range y established, y proteges puertos con Port Security. Este cierre es el aterrizaje: juegos, un laboratorio con filtrados rotos y las preguntas de la entrevista. Léelo justo después del [punto 5](/ApuntesRedes/08-acl-seguridad/05-port-security) y antes de abrir los boletines.

---

## ⭐ Sé el Paquete

> *Eres un paquete de un atacante simulado (bueno, de un alumno practicando) que intenta telnet al router de la empresa desde la red de invitados. Tu viaje va a encontrar un muro con tu nombre.*

**Paso 1:** Salgo de la VLAN de invitados (192.168.99.50) con destino 192.168.1.1 (el router), puerto TCP 23. Llego por el trunk hasta el router, por su subinterfaz G0/0.99.

**Paso 2:** El router consulta: ¿hay ACL **in** en G0/0.99? Sí: `access-list 120 deny tcp 192.168.99.0 0.0.0.255 any eq 23`. Coincido: origen mi red, destino cualquiera, puerto 23. **Deny.** Descartado en la aduana de entrada.

**Paso 3:** ¿Y si en vez de telnet fuera SSH (22)? La ACL solo niega el 23; la siguiente línea permite el resto. El router me deja pasar… pero la línea VTY del router solo acepta 192.168.1.0/24 (otra ACL), así que acabaría rechazado igual. Dos capas, dos aduanas, cero acceso.

**¿Qué ha pasado?**
1. **La ACL extendida de entrada bloqueó el telnet desde invitados y las VTY bloquean el SSH ajeno** → ✅ ¡Correcto! Filtrado de tráfico (ACL) y filtrado de administración (access-class en VTY) son capas distintas y complementarias.
2. **El firewall del operador me bloqueó** → ❌ El descarte fue local: lo hizo el router en su interfaz de entrada. Nada cruzó el ISP.
3. **El switch capa 3 me descartó por VLAN** → ❌ Entre VLANs hay enrutamiento (con switch L3 o router-on-a-stick); mi tráfico se encaminó correctamente hasta el router. Me paró la ACL, no la segmentación.

> 💡 **La moraleja del paquete curioso:** la seguridad en profundidad funciona por capas: una ACL para el tráfico y otra (access-class) para la administración; Port Security para el enchufe; contraseñas y SSH para el equipo. Un paquete malintencionado debe encontrar muchas puertas cerradas, y todas distintas.

---

## 🔥 Fireside Chat: ACL estándar vs ACL extendida

> *En la memoria del router, una ACL 10 y una ACL 120 discuten sobre quién filtra mejor.*

**Estándar (1-99):** — Yo solo miro el origen. Simple, rápida, una línea por regla. Para "que la contabilidad no salga a Internet", yo basto.

**Extendida (100-199):** — Y para "que la contabilidad salga a Internet pero sin FTP, y que nadie de invitados toque el puerto 23", me necesitas a mí: origen, destino, protocolo y puerto.

**Estándar:** — Pero ¿dónde te colocan? Cerca del **origen**, para no dejar viajar tráfico que luego se descarta. Eso te hace consumir recursos del router en todo el camino.

**Extendida:** — Y ¿a ti dónde te colocan? Cerca del **destino**, porque si te pones cerca del origen, cortas tráfico que no querías cortar: tú solo distingues por origen, y cualquier destino se te escapa del filtro.

**Estándar:** — Es mi naturaleza: soy generalista. Precisión cero, simplicidad máxima.

**Extendida:** — Y por eso existimos las dos: tú para políticas gruesas cerca del destino, yo para políticas finas cerca del origen. El que mezcla nuestras posiciones acaba bloqueando a su propio director.

**Estándar:** — …Y el que no pone ninguna, acaba con invitados en telnet. Cada cual con su talento.

---

## 🕵️ ¿Quién Soy?

1. Miro solo la IP de origen y me coloco cerca del destino.

2. Soy la máscara al revés: con un 0 fijo el bit y con un 255 dejo pasar el rango.

3. Soy la regla invisible que el IOS añade al final de toda ACL y por eso el orden de tus líneas importa.

4. Aprendo MACs por puerto y corto el enchufe cuando alguien se disfraza de otro.

<details>
<summary>🔄 Respuestas</summary>

1. **ACL estándar** — Filtra solo por origen; cerca del destino.
2. **Wildcard** — 0 = coincide exacto; 255 = comodín.
3. **El deny implícito** — Toda ACL termina en `deny any` invisible.
4. **Port Security** — Seguridad capa 2 por MAC en el puerto.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "Puse la ACL y la red entera se cayó"

**Administrador:** — Añadí una ACL estándar en la interfaz de salida y ahora nadie navega. ¿El IOS está mal?

**CONRAD:** — ¿Recordaste el deny implícito? Si tu ACL solo dice `permit 192.168.1.0 0.0.0.255` y nada más, TODO lo demás cae: no hay "permitir solo X" sin "negar explícitamente el resto o confiar en el implícito". Y si la escribiste al revés de lo planeado, permitiste lo que querías negar.

**CONRAD:** — Y de propina: ¿editaste la ACL numerada borrándola y recreándola? La borraste entera, la interfaz se quedó sin ACL y, mientras la reescribías, la red estaba abierta. Se usa ACL **nombrada** para editar línea a línea sin dejar la puerta abierta.

**La lección:** toda ACL termina en deny implícito (cuenta con él o usa un permit all al final si lo necesitas), el orden es sentido único (top-down) y las ACLs numeradas se sustituyen, no se editan "en caliente". Los tres errores clásicos, en un solo incidente.

---

## ⚡ Laboratorio de tortura: El filtrado que filtra de más

> **Duración:** 1,5 horas
> **Material:** Packet Tracer — 1 router 2911, 1 switch 3560, 3 VLANs (Corporativa 10, Servidores 20, Invitados 99), 1 servidor web/FTP y 4 PCs

**Montaje base:**
1. Router-on-a-stick con subinterfaces .10, .20 y .99 (o switch L3 con SVIs).
2. Servidor web+FTP en la VLAN 20 (192.168.20.10); PCs en las otras dos VLANs.
3. Verifica: todos pingeando y navegando por HTTP al servidor.

**Configura al inicio (política pedida por la empresa):**
1. La VLAN de invitados (99) **solo** puede HTTP al servidor: nada de ping, nada de FTP.
2. La VLAN corporativa (10) puede todo hacia servidores.
3. Nadie de invitados administra el router (SSH solo desde VLAN 10: access-class en VTY).
4. Verifica cada política con `ping`, navegador y `ftp 192.168.20.10` desde ambas VLANs.

**Ahora, SIN MIRAR, tu profesor introduce TRES fallos:**
- Fallo A: añade en la ACL de invitados una primera línea `deny ip any any` (arriba de los permits).
- Fallo B: invierte el orden: `permit ... eq ftp` después del deny tcp con wildcard `any eq 20`.
- Fallo C: aplica la ACL de invitados en la interfaz **errónea** (out en G0/0.20 en vez de in en G0/0.99).

**Reto:** con pings, navegador y `show access-lists` (mira los contadores de matches), diagnosticar cada fallo y corregir. Documenta síntoma → causa → solución.

**Fallo intencionado extra:** el profesor añade `permit tcp any 192.168.20.10 0.0.0.0 eq 80` con **wildcard 0.0.0.0** y luego un segundo permit con `host`. ¿Ambos funcionan? ¿Cuál es la forma canónica? Pista: `0.0.0.0` y `host` son lo mismo; wildcard `0.0.0.255` no.

> **Pista 1 (fallo A):** contadores en `show access-lists`: la primera línea hace match con TODO y ni un paquete pasa. El orden es sentido único.
>
> **Pista 2 (fallo B):** el deny con wildcard `0.0.0.255 eq 20` (rango de puertos, no solo 20) hace match antes del permit específico. Lee la ACL línea a línea en orden.
>
> **Pista 3 (fallo C):** los contadores de la ACL correcta no hacen match: ¿en qué interfaz y dirección está aplicada? `show ip interface` te lo dice.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Aduanero de élite** | Las 4 políticas del laboratorio verificadas a la primera |
| 🏅 **Matemático de wildcards** | Convertir 5 máscaras a wildcards sin papel |
| 🏅 **Colocador perfecto** | Justificar la colocación de cada ACL (estándar cerca del destino, extendida cerca del origen) |
| 🏅 **Guardaespaldas de puertos** | Port Security con shutdown y violación documentada |

---

## 🧠 Atrévete a pensar

1. Política: "solo la VLAN 10 puede administrar el router por SSH". ¿Dónde lo implementas: ACL de interfaz o access-class en VTY? ¿Por qué?
2. Escribe la ACL extendida que permite a invitados (192.168.99.0/24) solo HTTP (80) y HTTPS (443) hacia 192.168.20.10, y niega el resto hacia servidores sin cortarles Internet.
3. ¿Por qué el ICMP a veces se bloquea "a medias" (funciona ping, falla traceroute)? ¿Qué tipo de mensajes ICMP hay que cuidar en una ACL de perímetro?
4. Un switch con Port Security recibe un PC nuevo en un puerto con sticky aprendida. ¿Qué modos de violación existen y qué hace cada uno?

<details>
<summary>💡 Soluciones</summary>

1. **access-class en las líneas VTY**: el objetivo es proteger la administración del equipo (quién accede a las VTY), no el tráfico de tránsito. Una ACL de interfaz bloquearía también tráfico de usuarios hacia esa IP… y no protege las VTY de otras interfaces.
2. ```
   access-list 130 permit tcp 192.168.99.0 0.0.0.255 host 192.168.20.10 eq 80
   access-list 130 permit tcp 192.168.99.0 0.0.0.255 host 192.168.20.10 eq 443
   access-list 130 deny   ip  192.168.99.0 0.0.0.255 192.168.20.0 0.0.0.255
   access-list 130 permit ip  192.168.99.0 0.0.0.255 any
   ```
   (Denegar solo hacia la red de servidores, permitir lo demás para que salgan a Internet.)
3. El ping usa **echo/echo-reply**, pero traceroute usa **time-exceeded** (en cada salto) y **port-unreachable** (al final). Una ACL de perímetro que solo deja echo/echo-reply corta el traceroute "a medias": hay que cuidar qué mensajes ICMP se bloquean (y por eso ICMP no se bloquea a lo bruto).
4. **Protect**: descarta tramas de la MAC no permitida (sin aviso); **Restrict**: descarta y registra/log; **Shutdown** (por defecto): el puerto cae err-disabled. Con sticky, la MAC aprendida se escribe en la config del puerto.

</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. Lista que filtra solo por IP de origen
3. Máscara invertida usada en las ACLs
5. Regla invisible al final de toda ACL (3 palabras)
7. Comando que aplica una ACL a las líneas VTY (2 palabras)

Vertical:
2. ACL que filtra por origen, destino, protocolo y puerto
4. Modo de Port Security que apaga el puerto
6. Función que permite solo tráfico de retorno de sesiones iniciadas (1 palabra)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. ESTANDAR, 3. WILDCARD, 5. DENYIMPLICITO, 7. ACCESSCLASS

**Vertical:** 2. EXTENDIDA, 4. SHUTDOWN, 6. ESTABLISHED

</details>

---

## 💬 Preguntas de entrevista de trabajo

1. **"¿Diferencia entre ACL estándar y extendida y dónde colocarías cada una?"**
2. **"Escríbeme una ACL que bloquee el telnet a un servidor pero permita SSH."**
3. **"¿Qué es el deny implícito y qué consecuencias tiene al editar una ACL numerada?"**
4. **"¿Cómo protegerías el acceso de administración de un router Cisco?"**
5. **"¿Qué es Port Security y cuándo lo activarías?"**

> 💡 **Cómo encararlas:** la 1: estándar = solo origen, cerca del destino; extendida = origen+destino+protocolo+puerto, cerca del origen. La 2, algo así: `access-list 110 deny tcp any host 192.168.20.10 eq 23` + `access-list 110 permit ip any any` (y menciona que SSH es TCP 22, que ya pasa por el permit). La 3: toda ACL termina en deny any invisible; al borrar una numerada, la interfaz queda **sin filtro** mientras la reescribes → usa nombradas y edita línea a línea. La 4: contraseñas fuertes, SSH (no telnet), access-class en VTY con ACL, banner, usuarios locales y logging; en serio, AAA/RADIUS. La 5: seguridad de capa 2 por MAC en el puerto; en puertos de usuario y en accesos públicos, con sticky + restrict/shutdown según el entorno.

---

## 🤷 No hay preguntas tontas

> ❓ **¿Las ACLs afectan al tráfico generado por el propio router (ping desde el router, actualizaciones)?**

Las ACLs de interfaz **no** filtran el tráfico generado por el propio router (las de salida no lo ven). Para eso están otras ACLs específicas (por ejemplo, en las VTY o en los planes de protección). Es un matiz que sorprende: tu ping desde el router puede salir aunque la ACL diga que no.

> ❓ **¿Puedo poner dos ACLs en la misma interfaz (una in y otra out)?**

Sí, y es normal: una por dirección por interfaz (y por protocolo: IP/IPv6 separadas). El paquete puede pasar la de entrada, ser encaminado y verse sometido a la de salida de otra interfaz. Son dos aduanas distintas del mismo viaje.

> ❓ **¿Las ACLs cifran el tráfico o protegen de los usuarios internos "confiables"?**

Ni cifran ni leen la mente: filtran por cabeceras (IP, puertos), no por contenido ni por intención. Contra tráfico interno malicioso ayudan (segmentación + filtrado entre VLANs), pero no sustituyen a la autenticación (802.1X), la inspección (firewall) ni el cifrado (VPN/TLS).

---

## 🎬 Poscréditos

El paquete curioso de invitados volvió a casa con dos puertas en la cara (la ACL extendida y el access-class de las VTY) y una lección: en esta red, cada capa pregunta y ninguna fía. CONRAD, desde el terminal, lo dejó escrito en el banner del router: *"Las ACLs no son listas de la compra: son leyes con orden, wildcards y un deny implícito que todo lo abarca. Y si tocas lo que no entiendes, la única lista que te espera es la de despidos."*

**PRÓXIMAMENTE:** NAT y PAT: cómo toda tu red privada sale a Internet con una sola IP pública. Ahora que decides quién pasa, toca disfrazar a los que pasan.

---

## ✅ Criterios de evaluación cubiertos (RA4)

**RA4: Administra las funciones básicas de un router estableciendo opciones de configuración.**

| CE | Criterio | Cubierto |
|---|---|---|
| i) | Filtrado de tráfico | ✅ Puntos 2-3 y ⚡ Laboratorio |
| j) | Listas de control de acceso | ✅ Puntos 2-4 + 🧠 Atrévete (punto 6) |
| b) | Acceso y gestión segura del equipo | ✅ Puntos 1 y 5 + 💬 Entrevista (punto 6) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/08-acl-seguridad) · **Anterior:** [05 · Port Security](/ApuntesRedes/08-acl-seguridad/05-port-security) · **Siguiente:** [NAT y PAT](/ApuntesRedes/09-nat-pat)
