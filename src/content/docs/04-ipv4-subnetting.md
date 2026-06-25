---
title: U04 — IPv4 y subnetting
description: La calculadora maldita 🧮
---

<p><small>La calculadora maldita 🧮</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 Cable → 🏷️ **IP** → 🌍 IPv6 → 🔀 Switch → 🏢 VLAN → 🧭 Router → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*La red 192.168.1.0/24 está agotada. No quedan direcciones IP libres. Llegan 50 dispositivos nuevos y todos necesitan conectarse. Dividir la red en subredes más pequeñas parece la única solución.*

Bienvenido al mundo del subnetting, VLSM y DHCP. Prepárate para hacer cálculos binarios como nunca.

---

## 📚 Contenidos

- Estructura de IPv4: 32 bits, 4 octetos
- Binario para redes: conversión, AND, máscaras
- Clases de direcciones (A, B, C, D, E)
- Públicas vs privadas (RFC 1918)
- Máscara de subred / CIDR
- Subredes: dividir una red en partes más pequeñas
- VLSM: subredes de distinto tamaño
- DHCP: asignación automática de IPs

---

## 💻 Binario para redes

Antes de entender las IPs, necesitas dominar el binario. Una dirección IPv4 son **32 bits** divididos en **4 octetos** de 8 bits cada uno.

### Valor de cada bit en un octeto

```
Bit:    128  64  32  16   8   4   2   1
Peso:   2⁷  2⁶  2⁵  2⁴  2³  2²  2¹  2⁰
```

Cada octeto puede valer de 0 a 255. Para convertir un número a binario:

**Ejemplo:** 192 en binario
```
192 = 128 + 64 → bits 128 y 64 = 1, el resto 0
192 = 1 1 0 0 0 0 0 0
```

**Ejemplo:** 168 en binario
```
168 = 128 + 32 + 8
168 = 1 0 1 0 1 0 0 0
```

**Tabla de conversión rápida:**

| Decimal | Binario | Decimal | Binario |
|---|---|---|---|
| 0 | 00000000 | 128 | 10000000 |
| 1 | 00000001 | 192 | 11000000 |
| 2 | 00000010 | 224 | 11100000 |
| 3 | 00000011 | 240 | 11110000 |
| ... | ... | 248 | 11111000 |
| 15 | 00001111 | 252 | 11111100 |
| 16 | 00010000 | 254 | 11111110 |
| 32 | 00100000 | 255 | 11111111 |
| 64 | 01000000 | | |
| 127 | 01111111 | | |

### La operación AND

Para calcular la **dirección de red** a partir de una IP y su máscara, se hace un **AND lógico** bit a bit:

```
1 AND 1 = 1
1 AND 0 = 0
0 AND 1 = 0
0 AND 0 = 0
```

**Ejemplo:**
```
IP:      192.168.1.10  → 11000000.10101000.00000001.00001010
Máscara: 255.255.255.0 → 11111111.11111111.11111111.00000000
AND:                   → 11000000.10101000.00000001.00000000
Red:     192.168.1.0
```

La máscara tiene bits a 1 en la porción de red y bits a 0 en la porción de host.

---

## 📋 Estructura de IPv4

Una dirección IPv4 tiene 32 bits. Se representa en **notación decimal punteada**: cuatro números de 0 a 255 separados por puntos.

```
192.168.1.10
│  │  │  └─ Host (8 bits)
│  │  └──── Host (8 bits)
│  └─────── Host (8 bits)
└────────── Red (8 bits)
```

Pero con CIDR, el límite entre red y host no está fijo:

```
10.0.0.0/8       → Red: 8 bits (10.x.x.x), Host: 24 bits
172.16.0.0/16    → Red: 16 bits (172.16.x.x), Host: 16 bits
192.168.1.0/24   → Red: 24 bits, Host: 8 bits
192.168.1.128/25 → Red: 25 bits, Host: 7 bits
```

### Clases de direcciones (legacy)

Antes de CIDR (1993), las IPs se dividían en **clases fijas**:

| Clase | Primeros bits | Rango | Máscara por defecto | Uso |
|---|---|---|---|---|
| **A** | 0 | 0.0.0.0 - 127.255.255.255 | /8 | Grandes redes (16M hosts) |
| **B** | 10 | 128.0.0.0 - 191.255.255.255 | /16 | Redes medianas (65K hosts) |
| **C** | 110 | 192.0.0.0 - 223.255.255.255 | /24 | Redes pequeñas (254 hosts) |
| **D** | 1110 | 224.0.0.0 - 239.255.255.255 | — | Multicast |
| **E** | 1111 | 240.0.0.0 - 255.255.255.255 | — | Experimental |

> 💡 **CIDR** (Classless Inter-Domain Routing) eliminó las clases fijas. Hoy cualquier máscara puede usarse con cualquier red. Pero las clases aún se mencionan en exámenes y textos legacy.

### IPs especiales

| Dirección | Significado |
|---|---|
| **0.0.0.0/8** | "Esta red" (ruta por defecto) |
| **127.0.0.0/8** | Loopback (localhost: 127.0.0.1) |
| **169.254.0.0/16** | APIPA (Automatic Private IP Addressing): IP autoasignada cuando DHCP no responde |
| **224.0.0.0/4** | Multicast (ej. 224.0.0.5 = OSPF, 224.0.0.1 = todos los hosts) |
| **240.0.0.0/4** | Reservado (experimental) |
| **255.255.255.255** | Broadcast limitado (capa 2) |

### IPs privadas (RFC 1918)

La IANA reservó estos rangos para uso interno (no enrutables en Internet):

| Rango | Máscara CIDR | Nº de IPs | Uso típico |
|---|---|---|---|
| **10.0.0.0 - 10.255.255.255** | /8 | 16,777,216 | Grandes empresas |
| **172.16.0.0 - 172.31.255.255** | /12 | 1,048,576 | Empresas medianas |
| **192.168.0.0 - 192.168.255.255** | /16 | 65,536 | Hogar y pequeña oficina |

---

## 🧮 Subnetting paso a paso

Subnetear es **tomar bits prestados de la porción de host** para crear subredes más pequeñas.

### Fórmulas clave

```
Nº de subredes = 2ⁿ         (n = bits prestados a la máscara)
Nº de hosts por subred = 2ʰ - 2   (h = bits de host restantes)
```

Restamos 2 porque la primera IP es la **dirección de red** y la última es el **broadcast**.

### Ejemplo 1: Subredes iguales

**Red original:** 192.168.1.0/24
**Necesitas:** 4 subredes

**Paso 1:** ¿Cuántos bits necesitas prestar?
```
2ⁿ ≥ 4 → n = 2 (2² = 4)
```

**Paso 2:** Nueva máscara
```
Máscara original: /24 = 255.255.255.0   (11111111.11111111.11111111.00000000)
Bits prestados:   +2
Nueva máscara:    /26 = 255.255.255.192 (11111111.11111111.11111111.11000000)
```

**Paso 3:** Bits de host restantes
```
32 - 26 = 6 bits → 2⁶ - 2 = 62 hosts por subred
```

**Paso 4:** Calcular las subredes

El incremento entre subredes es: 256 - 192 = 64 (o 2⁶ = 64)

| Subred | Dirección de red | Primer host | Último host | Broadcast |
|---|---|---|---|---|
| 1 | 192.168.1.0/26 | 192.168.1.1 | 192.168.1.62 | 192.168.1.63 |
| 2 | 192.168.1.64/26 | 192.168.1.65 | 192.168.1.126 | 192.168.1.127 |
| 3 | 192.168.1.128/26 | 192.168.1.129 | 192.168.1.190 | 192.168.1.191 |
| 4 | 192.168.1.192/26 | 192.168.1.193 | 192.168.1.254 | 192.168.1.255 |

### Ejemplo 2: Subredes con máscara variable (VLSM)

**Escenario real:** Tienes 192.168.1.0/24 y necesitas:

| Departamento | Hosts necesarios |
|---|---|
| Ventas | 100 |
| RRHH | 30 |
| IT | 20 |
| Dirección | 5 |

Con subnetting clásico (máscara fija), todas las subredes tendrían el mismo tamaño. Con **VLSM**, cada una tiene el tamaño justo.

**Paso 1:** Ordenar de mayor a menor necesidad

Ventas (100) → RRHH (30) → IT (20) → Dirección (5)

**Paso 2:** Calcular cada subred

**Ventas (100 hosts):**
- Necesitas 2ʰ - 2 ≥ 100 → h = 7 (2⁷ - 2 = 126)
- Máscara: /25 (255.255.255.128)
- Rango: 192.168.1.0/25 → hosts: 192.168.1.1 - 192.168.1.126, broadcast: 192.168.1.127

**RRHH (30 hosts):**
- Necesitas h = 5 (2⁵ - 2 = 30)
- Máscara: /27 (255.255.255.224)
- Rango: 192.168.1.128/27 → hosts: 192.168.1.129 - 192.168.1.158, broadcast: 192.168.1.159

**IT (20 hosts):**
- Necesitas h = 5 (2⁵ - 2 = 30)
- Máscara: /27
- Rango: 192.168.1.160/27 → hosts: 192.168.1.161 - 192.168.1.190, broadcast: 192.168.1.191

**Dirección (5 hosts):**
- Necesitas h = 3 (2³ - 2 = 6)
- Máscara: /29 (255.255.255.248)
- Rango: 192.168.1.192/29 → hosts: 192.168.1.193 - 192.168.1.198, broadcast: 192.168.1.199

**Resumen VLSM:**

| Departamento | Red | Máscara | Rango | Broadcast |
|---|---|---|---|---|
| Ventas | 192.168.1.0 | /25 | .1 - .126 | .127 |
| RRHH | 192.168.1.128 | /27 | .129 - .158 | .159 |
| IT | 192.168.1.160 | /27 | .161 - .190 | .191 |
| Dirección | 192.168.1.192 | /29 | .193 - .198 | .199 |
| *Libre* | 192.168.1.200 | /29 | .201 - .206 | .207 |

### Tabla rápida de máscaras

| CIDR | Máscara | Nº IPs totales | Nº hosts útiles | Uso típico |
|---|---|---|---|---|
| /30 | 255.255.255.252 | 4 | **2** | Enlace punto a punto |
| /29 | 255.255.255.248 | 8 | **6** | Red muy pequeña |
| /28 | 255.255.255.240 | 16 | **14** | Grupo pequeño |
| /27 | 255.255.255.224 | 32 | **30** | Departamento pequeño |
| /26 | 255.255.255.192 | 64 | **62** | Departamento mediano |
| /25 | 255.255.255.128 | 128 | **126** | Departamento grande |
| /24 | 255.255.255.0 | 256 | **254** | Oficina estándar |
| /23 | 255.255.254.0 | 512 | **510** | Oficina grande |
| /22 | 255.255.252.0 | 1024 | **1022** | Edificio |
| /21 | 255.255.248.0 | 2048 | **2046** | Edificio grande |
| /16 | 255.255.0.0 | 65536 | **65534** | Empresa mediana |
| /8 | 255.0.0.0 | 16M | **~16M** | Gran empresa |

---

## 🤖 DHCP: configuración automática

El **DHCP** (Dynamic Host Configuration Protocol) asigna automáticamente IP, máscara, gateway y DNS a los dispositivos.

### Proceso DORA

```
PC                         Servidor DHCP
 │                              │
 ├──── DHCP DISCOVER ─────────►│  Búsqueda de servidor DHCP
 │◄──── DHCP OFFER ────────────┤  Oferta: "Toma 192.168.1.20"
 ├──── DHCP REQUEST ──────────►│  Aceptación: "Quiero esa IP"
 │◄──── DHCP ACK ──────────────┤  Confirmación: "Es tuya"
```

### Configuración típica en un router Cisco

```
ip dhcp pool VENTAS
 network 192.168.1.0 255.255.255.128
 default-router 192.168.1.1
 dns-server 8.8.8.8 1.1.1.1
 lease 8

ip dhcp excluded-address 192.168.1.1 192.168.1.10
```

### DHCP en Packet Tracer

En Packet Tracer, puedes configurar DHCP en:
1. **Router** con `ip dhcp pool` (como arriba)
2. **Servidor** dedicado (en la pestaña Config → DHCP)
3. **Switch multicapa** (comandos similares al router)

> 💡 **Siempre excluye las IPs estáticas** del rango DHCP (servidores, routers, impresoras de red). Si no, puede haber conflictos de IP.

---

## ⭐ Sé la IP

> *Eres la dirección IP 192.168.1.10/24. Tu máscara es 255.255.255.0.*

**Escenario:** Llega un paquete con destino 192.168.1.200. ¿Es para ti? ¿Está en tu red?

**Tú haces el cálculo mental:**
- Tu red: 192.168.1.0
- Broadcast: 192.168.1.255
- Rango válido: 192.168.1.1 - 192.168.1.254

**192.168.1.200** está en tu mismo rango. ✅ Es de tu red.

**Escenario 2:** Llega un paquete con destino 10.0.0.5. ¿Qué haces?

a) **Lo aceptas** → ❌ No, 10.0.0.5 no está en tu red /24. Necesitas el gateway.
b) **Lo envías al gateway** → ✅ Correcto. Si no está en tu subred, va al router.
c) **Lo ignoras y sigues con tu vida** → También, porque la NIC filtra por MAC y ni siquiera ves ese paquete. Pero conceptualmente, el SO sabe que debe ir al gateway.

---

## 🔥 Fireside Chat: IP Pública vs IP Privada

> *Dos IPs charlan en un café. Una es 192.168.1.10, la otra es 83.45.12.78.*

**Privada:** — Nadie me conoce fuera de mi red. Vivo feliz en mi NAT.

**Pública:** — Yo soy visible en todo Internet. Cualquiera puede conectarse a mí. Es una responsabilidad.

**Privada:** — Pero te pueden atacar. DDoS, escaneos... a mí nadie me llega desde fuera a menos que abra un puerto.

**Pública:** — Para eso está el firewall. Y además, soy única en el mundo. Tú, 192.168.1.10, eres una de las millones de IPs privadas exactamente iguales.

**Privada:** — Sí, pero funcionamos. Las LANs del mundo entero se sostienen sobre nosotras.

**Pública:** — Ya, pero sin mí no saldríais a Internet. Soy vuestra ventana al mundo.

**Privada:** — Nuestra... *NAT*. Sin nosotras, te habrías agotado en 1995.

**Pública:** — *Touché.*

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
5. **OSPF** — Open Shortest Path First.
6. **Loopback** — 127.0.0.1, también llamado localhost.

</details>

---

## 🤬 CONRAD VS EL MUNDO: Subnetting

**CONRAD:** — "Viene un alumno y me dice: *CONRAD, ¿por qué necesito subredes?* Pues mira, porque si pones 500 PCs en una sola red /24, te quedas sin IPs (#NoAlcancen). Y si los pones todos en la misma red, el tráfico broadcast es como un megáfono en una biblioteca: todo el mundo se entera de todo y nadie trabaja."

**CONRAD:** — "Y luego dicen *es que subnetting es difícil*. ¡Claro! Porque te empeñas en hacerlo decimal. Hazlo en binario. 192.168.1.0/24 → /26 es agarrar 2 bits de host. ¡2 BITS! No es magia, es AND lógico. La calculadora de Windows también sirve, pero entiende lo que haces, no solo aprietes botones."

**La lección:** Subnetear no solo ahorra IPs, también reduce el dominio de broadcast y mejora el rendimiento. Y hazlo en binario.

---

## ⚡ Laboratorio de Tortura: Diseño de direccionamiento

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

**Fallo intencionado:** Pon dos departamentos en la misma subred. ¿Qué pasa con la comunicación? Ahora configura un ACL que bloquee el tráfico de Ventas a Dirección, pero mal escrito: permites todo sin querer. Diagnostica por qué no funciona el filtro.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Binary Master** | Convertir 5 IPs a binario de memoria en menos de 2 minutos |
| 🏅 **Subnetting Pro** | Resolver un VLSM de 4 departamentos en papel sin calculadora |
| 🏅 **DHCP Whisperer** | Configurar DHCP en un router Cisco y que funcione a la primera |
| 🏅 **Rango Dominator** | Calcular el rango de hosts y broadcast de cualquier subred en 10 segundos |

---

## 🧠 Atrévete a Pensar

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
6. **Conflicto de IP.** El segundo dispositivo en conectarse no podrá comunicarse (o el primero pierde conectividad). Los switches y routers mostrarán errores de "duplicate IP". DHCP evita esto, pero con IPs estáticas puedes causarlo accidentalmente.

</details>

---

## 🧩 Crucigrama de Bits

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

## 💬 Preguntas de Entrevista de Trabajo

1. **"Te damos la red 192.168.1.0/24. Necesitas 3 subredes de 50 hosts cada una. ¿Cómo lo haces?"**
2. **"¿Qué es una máscara de subred? Explica para qué sirve con un ejemplo."**
3. **"¿Por qué hay IPs privadas y públicas? ¿Cómo se relacionan?"**
4. **"Si tienes 300 hosts en una oficina, ¿qué red usarías? ¿/24? ¿/23? Justifica."**
5. **"Explica el proceso DORA de DHCP. ¿Qué pasa si el servidor DHCP no responde?"**
6. **"¿Qué es VLSM y por qué es importante en el diseño de redes modernas?"**

---

## 🤷 No hay preguntas tontas

> ❓ **Si dos dispositivos en redes diferentes usan la misma IP privada, ¿cómo evitan conflictos?**

Las IPs privadas (definidas en RFC 1918: 10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16) solo son válidas dentro de una red local. Dos redes diferentes pueden usar las mismas direcciones privadas sin conflicto porque el router NAT (Network Address Translation) traduce esas direcciones a una IP pública única al salir a Internet. Es como dos personas llamadas "Juan" en ciudades distintas: dentro de cada ciudad no hay confusión, y al viajar al extranjero se identifican con su pasaporte (la IP pública).

---

> ❓ **¿Qué pasa si pongo una máscara /32?**

Una máscara /32 (255.255.255.255) significa que todos los bits son de red y ninguno de host. Solo hay una dirección posible: la propia IP. Se usa para rutas host específicas (por ejemplo, para identificar un único equipo en una tabla de rutas). No puedes asignar una IP /32 a un PC normal porque no podría comunicarse con nadie.

---

> ❓ **¿Por qué restamos 2 al calcular hosts?**

La primera dirección de cada subred es la **dirección de red** (todos los bits de host a 0). La última es la **dirección de broadcast** (todos los bits de host a 1). Ninguna de las dos puede asignarse a un dispositivo. Por eso, si tienes 8 direcciones totales (ej. red /29), solo 6 son utilizables.

---

> ❓ **¿Se pueden agotar las IPs IPv4?**

Ya se agotaron. La IANA asignó el último bloque de direcciones IPv4 en 2011. Desde entonces, las nuevas redes usan IPv6 o dependen de NAT para compartir una IP pública entre muchos dispositivos. Por eso IPv6 es el futuro.

---

## 🎬 Post-Créditos

Un host recibe la IP 10.0.1.10 mediante DHCP en una red privada. El tráfico viaja hacia Internet atravesando un router NAT, que traduce la IP privada a la IP pública del borde de red. En otra red corporativa, otro host tiene exactamente la misma IP privada 10.0.1.10, pero ambos conviven sin conflicto gracias a que el NAT aísla sus ámbitos. El direccionamiento privado (RFC 1918) permite la reutilización de direcciones a escala global.

**PRÓXIMAMENTE EN U05:** IPv6. Porque 32 bits se quedaron pequeños y hubo que inventar 128 bits. Las IPs privadas son un apaño, no una solución definitiva.

---

## ✅ Criterios de evaluación cubiertos

**RA2: Integra ordenadores y periféricos en redes cableadas e inalámbricas.**

| Criterio | Cubierto |
|---|---|
| d) Direccionamiento lógico IP | ✅ IPv4, subredes, CIDR, máscaras, VLSM |
| g) Conectividad entre dispositivos | ✅ Laboratorio Packet Tracer, DHCP |
