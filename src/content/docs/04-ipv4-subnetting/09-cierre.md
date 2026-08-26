---
title: "09 — Cierre: consolida lo aprendido"
description: El cierre práctico de la unidad, con subnetting, VLSM, DHCP y diagnóstico real 🧮
---

<p><small>El cierre práctico de la unidad, con subnetting, VLSM, DHCP y diagnóstico real 🧮</small></p>

> 🗺️ **Estás en:** 🧮 **U04 · IPv4 y subnetting** → 09 · Cierre

---

Has terminado la teoría. Este cierre es el aterrizaje: recorre lo aprendido con juegos, un laboratorio de direccionamiento de verdad y las preguntas que te harán en una entrevista. Léelo justo después del [punto 8](/ApuntesRedes/04-ipv4-subnetting/08-dhcp) y antes de abrir los boletines. Eso sí: deja la calculadora a mano... pero aprende a no necesitarla.

---

## ⭐ Be the Packet, my friend...

> *Eres la dirección IP **192.168.1.10/24**. Tu máscara es 255.255.255.0 y acabas de despertarte en una red que huele a café de la oficina.*

**Escenario:** Llega un paquete con destino 192.168.1.200. ¿Es para ti? ¿Está en tu red?

**Tú haces el cálculo mental:**
- Tu red: 192.168.1.0
- Broadcast: 192.168.1.255
- Rango válido: 192.168.1.1 - 192.168.1.254

**192.168.1.200** está en tu mismo rango. ✅ Es de tu red. El paquete va a otro equipo vecino: la NIC se entera por la capa 2 y no necesitas al router.

**Escenario 2:** Llega un paquete con destino 10.0.0.5. ¿Qué haces?

a) **Lo aceptas** → ❌ No, 10.0.0.5 no está en tu red /24. Es otro vecindario.
b) **Lo envías al gateway** → ✅ Correcto. Si no está en tu subred, va al router.
c) **Lo ignoras y sigues con tu vida** → También, porque la NIC filtra por MAC y ni siquiera ves ese paquete. Pero conceptualmente, el SO sabe que debe ir al gateway.

> 💡 **Ese cálculo es la prueba del AND en acción:** con tus bits de red fijos (/24), cualquier IP que comparta los 24 primeros bits es vecina. Todo lo demás, al gateway. Olvida este micro-cálculo en una entrevista y verás caras largas.

---

## 🔥 Fireside Chat: IP pública vs IP privada

> *Dos IPs charlan en un café. Una es 192.168.1.10, la otra es 83.45.12.78.*

**Privada:** — Nadie me conoce fuera de mi red. Vivo feliz en mi NAT.

**Pública:** — Yo soy visible en todo Internet. Cualquiera puede conectarse a mí. Es una responsabilidad.

**Privada:** — Pero te pueden atacar. DDoS, escaneos... a mí nadie me llega desde fuera a menos que abra un puerto.

**Pública:** — Para eso está el firewall. Y además, soy única en el mundo. Tú, 192.168.1.10, eres una de las millones de IPs privadas exactamente iguales.

**Privada:** — Sí, pero funcionamos. Las LANs del mundo entero se sostienen sobre nosotras.

**Pública:** — Ya, pero sin mí no saldríais a Internet. Soy vuestra ventana al mundo.

**Privada:** — Nuestra... *NAT*. Sin nosotras, te habrías agotado en 1995.

**Pública:** — *Touché.*

**Privada:** — Y que conste que esto es temporal. En cuanto IPv6 (U05) dé 128 bits a cada ser vivo, las públicas seréis de verdad para todos.

**Pública:** — Uy, toca madera. Que 128 bits de direcciones es otra historia... pero eso ya es otro episodio.

---

## 🕵️ ¿Quién Soy?

1. Soy una IP que empieza por 10. No viajo por Internet. Me quedo en casa.
2. Mi máscara es 255.255.255.0. En notación /?, soy /24.
3. Soy el servidor que asigna IPs automáticamente cuando un dispositivo se conecta.
4. Soy una técnica para dividir una red en subredes de distintos tamaños, sin desperdiciar IPs.
5. Soy el protocolo que usan los routers para anunciar redes entre sí. Empiezo por O.
6. Soy la IP que representa "este equipo". 127.0.0.1 es mi dirección más famosa.

<details>
<summary>🔄 Respuestas</summary>

1. **IP privada clase A** — 10.0.0.0/8 (RFC 1918).
2. **CIDR /24** — 255.255.255.0 = /24.
3. **DHCP** — Dynamic Host Configuration Protocol.
4. **VLSM** — Variable Length Subnet Mask.
5. **OSPF** — Open Shortest Path First (lo verás a fondo en la U09).
6. **Loopback** — 127.0.0.1, también llamado localhost.

</details>

---

## 🤬 CONRAD VS EL MUNDO: Subnetting

**CONRAD:** — "Viene un alumno y me dice: *CONRAD, ¿por qué necesito subredes?* Pues mira, porque si pones 500 PCs en una sola red /24, te quedas sin IPs (#NoAlcancen). Y si los pones todos en la misma red, el tráfico broadcast es como un megáfono en una biblioteca: todo el mundo se entera de todo y nadie trabaja."

**CONRAD:** — "Y luego dicen *es que subnetting es difícil*. ¡Claro! Porque te empeñas en hacerlo decimal. Hazlo en binario. 192.168.1.0/24 → /26 es agarrar 2 bits de host. ¡2 BITS! No es magia, es AND lógico. La calculadora de Windows también sirve, pero entiende lo que haces, no solo aprietes botones."

**CONRAD:** — "Y el colmo: *¿para qué sirve excluir IPs en DHCP?* ¡Para no duplicar direcciones! Que luego llega un servidor con IP estática repetida y me montan un conflicto de IP para llorar. Excluye, excluye y excluye."

**La lección:** Subnetear no solo ahorra IPs, también reduce el dominio de broadcast y mejora el rendimiento. Y hazlo en binario.

---

## ⚡ Laboratorio de tortura: Diseño de direccionamiento

> **Duración:** 1 hora
> **Herramienta:** Packet Tracer, calculadora

**Escenario:**
Eres el administrador de redes de una empresa con:
- **Ventas:** 100 dispositivos
- **RRHH:** 30 dispositivos
- **IT:** 20 dispositivos
- **Dirección:** 5 dispositivos
- **Enlaces entre routers:** 2 IPs por enlace (3 enlaces)

Te dan la red **10.0.0.0/24**. ¿Cabe todo? **No.** Te dan **172.16.0.0/16**. Ahora sí.

**Tareas:**
1. Diseña el VLSM para que cada departamento tenga su subred con el menor desperdicio posible.
2. Asigna IPs a los routers para los enlaces entre sedes (usa /30).
3. Configura DHCP para Ventas y RRHH (rango dinámico). IT y Dirección usarán IPs estáticas.
4. Configura rutas estáticas para que todas las subredes se vean entre sí.

**Fallo intencionado 1 (segmentación):** Pon **dos departamentos en la SAME subred** (por ejemplo, IT y Dirección compartiendo el mismo rango).

**Pistas para diagnosticar el fallo 1:**
- Si han ocupado el mismo rango IP, los **paquetes ARP** se pisan: los dispositivos de un departamento "ven" los del otro en la misma VLAN/capa 2.
- Revisa las **tablas de enrutamiento** de cada router: si en las rutas aparecen solo 3 subredes en vez de 4, dos departamentos están "fusionados" sin querer.
- Calcula de nuevo el VLSM en papel: el patrón *encadenado* (cada subred arranca donde terminó la anterior) te delata dónde se solapan.

**Fallo intencionado 2 (seguridad):** Configura un **ACL que bloque el tráfico de Ventas a Dirección**, pero **mal escrito: permites todo sin querer**.

**Pistas para diagnosticar el fallo 2:**
- La ACL clásica del "permit all": una línea `permit ip any any` colocada antes de la regla que querías hace que todo pase. Comprueba el **orden** de las líneas: las ACL se evalúan en cascada, de arriba abajo, y la primera coincidencia gana.
- Verifica con **`show access-lists`** si la regla de bloqueo tiene contadores de coincidencias (todos en cero = nunca se aplica).
- Haz un ping desde Ventas a la IP de Dirección: si responde, esa regla no está bloqueando nada. El filtro no funciona y nadie lo nota... hasta el día de la auditoría.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Binary Master** | Convertir 5 IPs a binario de memoria en menos de 2 minutos |
| 🏅 **Subnetting Pro** | Resolver un VLSM de 4 departamentos en papel sin calculadora |
| 🏅 **DHCP Whisperer** | Configurar DHCP en un router Cisco y que funcione a la primera |
| 🏅 **Rango Dominator** | Calcular el rango de hosts y broadcast de cualquier subred en 10 segundos |

---

## 🧠 Atrévete a pensar

1. ¿Cuántas IPs útiles tiene una red /27? ¿Y /30?
2. ¿Qué dirección es la de broadcast de 192.168.1.128/25?
3. Divide 10.0.0.0/24 en 4 subredes iguales. ¿Qué máscara usas? ¿Cuántas IPs por subred?
4. ¿Por qué 127.0.0.1 se llama "localhost"? ¿Qué pasa si haces ping a 127.0.0.1?
5. Tienes 192.168.0.0/24. Necesitas 3 subredes: 60 hosts, 30 hosts, 10 hosts. Diseña el VLSM.
6. ¿Qué pasa si dos dispositivos tienen la misma IP estática en la misma red?

<details>
<summary>💡 Soluciones</summary>

1. **/27** → 32 - 2 = 30 IPs útiles. **/30** → 4 - 2 = 2 IPs útiles (perfecto para enlaces punto a punto).
2. Broadcast = **192.168.1.255** (el último de ese rango /25: 192.168.1.128 - 192.168.1.255).
3. Máscara **/26** (255.255.255.192). 4 subredes: .0/26, .64/26, .128/26, .192/26. Cada una con **62 IPs útiles**.
4. **127.0.0.1** es la interfaz de loopback. Hacer ping ahí es "hablarse a uno mismo". Sirve para probar que la pila TCP/IP funciona aunque no tengas red.
5. **VLSM:**
   - 60 hosts → /26 (62 hosts) → 192.168.0.0/26
   - 30 hosts → /27 (30 hosts) → 192.168.0.64/27
   - 10 hosts → /28 (14 hosts) → 192.168.0.96/28
   - Sobrante: 192.168.0.112/28 en adelante
6. **Conflicto de IP.** El segundo dispositivo en conectarse no podrá comunicarse (o el primero pierde conectividad). Los switches y routers mostrarán errores de "duplicate IP". DHCP evita esto, pero con IPs estáticas puedes causarlo accidentalmente (y sin exclusiones, el propio DHCP se lo crea él solito).

</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
3. Protocolo de asignación dinámica de IPs (4 letras)
4. Notación de máscara: 255.255.255.0 es /__ (2 dígitos)
5. Última dirección de una subred, para todos los hosts (9 letras)
7. Máscara /30 en decimal (255.255.255.xxx) (3 dígitos)
8. Bits de una dirección IPv4 (2 dígitos)

Vertical:
1. Técnica de subdivisión de redes con máscaras variables (4 letras)
2. Rango de IPs privadas 192.168.0.0/16 (4 letras)
6. IP de bucle local (127.0.0._) (1 dígito)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 3. DHCP, 4. 24, 5. BROADCAST, 7. 252, 8. 32
**Vertical:** 1. VLSM, 2. CLASE, 6. 1

</details>

---

## 💬 Preguntas de entrevista de trabajo

1. **"Te damos la red 192.168.1.0/24. Necesitas 3 subredes de 50 hosts cada una. ¿Cómo lo haces?"**
2. **"¿Qué es una máscara de subred? Explica para qué sirve con un ejemplo."**
3. **"¿Por qué hay IPs privadas y públicas? ¿Cómo se relacionan?"**
4. **"Si tienes 300 hosts en una oficina, ¿qué red usarías? ¿/24? ¿/23? Justifica."**
5. **"Explica el proceso DORA de DHCP. ¿Qué pasa si el servidor DHCP no responde?"**
6. **"¿Qué es VLSM y por qué es importante en el diseño de redes modernas?"**

> 💡 **Cómo encararlas:** la 6 es la que remata la entrevista. Empieza por la regla de oro (ordenar de mayor a menor, `2ʰ − 2 ≥ hosts`) y acompáñala de un mini-ejemplo mental (100→/25, 30→/27, 2→/30). Y en la 1, cuidado con la trampa: 3 subredes de 50 hosts **no** se resuelven con /25 a lo loco; busca la máscara justa para cada una y menciona que se puede afinar con VLSM.

---

## 🤷 No hay preguntas tontas

> ❓ **¿Si dos dispositivos en redes diferentes usan la misma IP privada, ¿cómo evitan conflictos?**

Las IPs privadas (definidas en RFC 1918: 10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16) solo son válidas dentro de una red local. Dos redes diferentes pueden usar las mismas direcciones privadas sin conflicto porque el router NAT (Network Address Translation) traduce esas direcciones a una IP pública única al salir a Internet. Es como dos personas llamadas "Juan" en ciudades distintas: dentro de cada ciudad no hay confusión, y al viajar al extranjero se identifican con su pasaporte (la IP pública).

> ❓ **¿Qué pasa si pongo una máscara /32?**

Una máscara /32 (255.255.255.255) significa que todos los bits son de red y ninguno de host. Solo hay una dirección posible: la propia IP. Se usa para rutas host específicas (por ejemplo, para identificar un único equipo en una tabla de rutas). No puedes asignar una IP /32 a un PC normal porque no podría comunicarse con nadie.

> ❓ **¿Por qué restamos 2 al calcular hosts?**

La primera dirección de cada subred es la **dirección de red** (todos los bits de host a 0). La última es la **dirección de broadcast** (todos los bits de host a 1). Ninguna de las dos puede asignarse a un dispositivo. Por eso, si tienes 8 direcciones totales (ej. red /29), solo 6 son utilizables.

> ❓ **¿Se pueden agotar las IPs IPv4?**

Ya se agotaron. La IANA asignó el último bloque de direcciones IPv4 en 2011. Desde entonces, las nuevas redes usan IPv6 o dependen de NAT para compartir una IP pública entre muchos dispositivos. Por eso IPv6 es el futuro... y la próxima unidad.

---

## 🎬 Poscréditos

Un host recibe la IP 10.0.1.10 mediante DHCP en una red privada. El tráfico viaja hacia Internet atravesando un router NAT, que traduce la IP privada a la IP pública del borde de red. En otra red corporativa, otro host tiene exactamente la misma IP privada 10.0.1.10, pero ambos conviven sin conflicto gracias a que el NAT aísla sus ámbitos. El direccionamiento privado (RFC 1918) permite la reutilización de direcciones a escala global y, sobre las subredes bien calculadas con VLSM, se levantan redes de cientos de oficinas sin desperdiciar ni una dirección.

**PRÓXIMAMENTE EN U05:** IPv6. Porque 32 bits se quedaron pequeños y hubo que inventar 128 bits. Las IPs privadas son un apaño, no una solución definitiva: teléfonos, sensores, coches... todos con su propia dirección pública de verdad.

---

## ✅ Criterios de evaluación cubiertos (RA2)

**RA2: Integra ordenadores y periféricos en redes cableadas e inalámbricas.**

| CE | Criterio | Cubierto |
|---|---|---|
| d) | Direccionamiento lógico IP | ✅ IPv4, subredes, CIDR, máscaras, VLSM (puntos 1-7) |
| g) | Conectividad entre dispositivos | ✅ DHCP y proceso DORA (punto 8) + ⚡ Laboratorio Packet Tracer |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/04-ipv4-subnetting) · **Anterior:** [08 · DHCP](/ApuntesRedes/04-ipv4-subnetting/08-dhcp) · **Siguiente:** **[U05 · IPv6 y transición](/ApuntesRedes/05-ipv6-transicion)**