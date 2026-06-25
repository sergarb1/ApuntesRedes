---
title: U03 — Infraestructura física de red
description: El cable traicionero 🔌
---

<p><small>El cable traicionero 🔌</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 **CABLE** → 🏷️ IP → 🌍 IPv6 → 🔀 Switch → 🏢 VLAN → 🧭 Router → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*Los bits viajan por el cable UTP a 1 Gbps. De repente, el mundo se vuelve ruido: interferencias electromagnéticas, atenuación, diafonía. Los 1s y 0s se distorsionan y las tramas comienzan a llegar con errores CRC.*

Bienvenido al mundo físico. Donde los cables son heroes anónimos... hasta que fallan.

---

## 📚 Contenidos

- Medios de transmisión: cobre, fibra, aire
- Cable UTP: categorías (Cat5e, Cat6, Cat6a, Cat7, Cat8)
- Cable directo vs cruzado vs consola
- Crimpado RJ45 y comprobación
- Normativa T568A vs T568B (pinout completo)
- Fibra óptica: monomodo vs multimodo, conectores
- WiFi: estándares 802.11
- Conceptos: ancho de banda, atenuación, diafonía, latencia
- Cableado estructurado: patch panel, keystone, latiguillos

---

## 🔌 Medios de transmisión

Los datos pueden viajar por tres medios físicos:

| Medio | Material | Velocidad típica | Distancia máxima | Coste |
|---|---|---|---|---|
| **Cobre** (UTP/STP) | Hilos de cobre trenzados | 1-10 Gbps | 100 m | Bajo |
| **Fibra óptica** | Vidrio o plástico | 10-400 Gbps | 40+ km | Alto |
| **Aire** (WiFi, radio) | Ondas electromagnéticas | 0.1-9.6 Gbps | Variable (10-100 m) | Medio |

### Cobre: cable UTP

El cable UTP (*Unshielded Twisted Pair*) es el rey de las LAN. Está formado por **8 hilos de cobre** organizados en **4 pares trenzados**. Cada hilo tiene un color específico:

| Pin | Par | Color (T568B) | Color (T568A) |
|---|---|---|---|
| 1 | 2 | Blanco/Naranja | Blanco/Verde |
| 2 | 2 | Naranja | Verde |
| 3 | 3 | Blanco/Verde | Blanco/Naranja |
| 4 | 1 | Azul | Azul |
| 5 | 1 | Blanco/Azul | Blanco/Azul |
| 6 | 3 | Verde | Naranja |
| 7 | 4 | Blanco/Marrón | Blanco/Marrón |
| 8 | 4 | Marrón | Marrón |

> 💡 **Diferencia clave:** T568B intercambia los pares 2 y 3 respecto a T568A. El estándar más común en Europa es **T568B**. En EE.UU. es más frecuente T568A (obligatorio en instalaciones gubernamentales).

### Categorías de cable UTP

| Categoría | Frecuencia máx | Velocidad máx | Distancia | Uso típico |
|---|---|---|---|---|
| **Cat5e** | 100 MHz | 1 Gbps | 100 m | Oficinas antiguas, aún funcional |
| **Cat6** | 250 MHz | 1 Gbps (10 Gbps hasta 55 m) | 100 m | Estándar actual en oficinas |
| **Cat6a** | 500 MHz | 10 Gbps | 100 m | Datacenters, redes de alta velocidad |
| **Cat7** | 600 MHz | 10 Gbps | 100 m | Entornos con alta interferencia (STP) |
| **Cat8** | 2000 MHz | 25-40 Gbps | 30 m | Datacenters, cortas distancias |

### ¿Por qué se trenzan los pares?

El trenzado soluciona dos problemas físicos:

1. **Cancelación electromagnética:** las interferencias externas (motores, fluorescentes, cables de corriente) afectan por igual a ambos hilos del par. Al restar las señales en el receptor, el ruido se cancela y la señal original se recupera.

2. **Reducción de diafonía (crosstalk):** la interferencia de un par sobre otro se minimiza porque cada par tiene un paso de trenzado diferente.

### Cable directo vs cruzado vs consola

**Cable directo (straight-through):** ambos extremos con la misma norma (T568B o T568A). Conecta dispositivos de distinto tipo:
- PC ↔ Switch
- Router ↔ Switch
- PC ↔ Hub

**Cable cruzado (crossover):** un extremo T568A, el otro T568B (pares 2 y 3 intercambiados). Conecta dispositivos del mismo tipo:
- PC ↔ PC
- Switch ↔ Switch
- Router ↔ Router

> 💡 **Auto MDI-X:** Los switches modernos detectan automáticamente si el cable es directo o cruzado y ajustan sus puertos. Desde 2006, prácticamente todos los switches lo soportan. Pero en routers y PCs antiguos, el cable cruzado sigue siendo necesario para conexiones directas.

**Cable de consola (rollover):** todos los pines invertidos (1↔8, 2↔7, etc.). Conecta el puerto serie (o USB) del PC al puerto de consola del switch/router Cisco para configuración inicial.

---

## 🔬 Fibra óptica

La fibra óptica transmite datos mediante pulsos de luz a través de un núcleo de vidrio. Ventajas frente al cobre:

- **Mayor velocidad:** hasta 400 Gbps y más
- **Mayor distancia:** kilómetros sin repetidor
- **Inmunidad electromagnética:** no le afectan interferencias
- **Seguridad:** es muy difícil interceptar la señal sin ser detectado

### Monomodo vs Multimodo

| Característica | Monomodo (SMF) | Multimodo (MMF) |
|---|---|---|
| Núcleo | 9 µm (muy fino) | 50-62.5 µm (más grueso) |
| Fuente de luz | Láser | LED |
| Distancia máx | 40+ km | 550 m (10 Gbps) |
| Coste | Más caro (láser + conectores de precisión) | Más barato |
| Uso típico | WAN, ISP, larga distancia | LAN, datacenter, campus |

### Conectores de fibra

| Conector | Tipo | Uso |
|---|---|---|
| **LC** | Pequeño, push-pull | Estándar en datacenters y SFP |
| **SC** | Cuadrado, push-pull | Redes de telecomunicaciones |
| **ST** | Redondo, bayoneta | Redes legacy |
| **FC** | Rosca | Entornos de vibración |

> 💡 **SFP (Small Form-factor Pluggable):** son módulos intercambiables que permiten a un switch usar fibra o cobre según el conector que se inserte. Un puerto SFP puede ser 1000Base-T (cobre, RJ45) o 1000Base-LX (fibra, LC).

---

## 📶 WiFi: el medio inalámbrico

Cuando el cable no llega o no es práctico, usamos el aire. Los estándares WiFi (IEEE 802.11) evolucionan rápido:

| Estándar | Banda | Velocidad máxima | Año |
|---|---|---|---|
| **802.11n** (WiFi 4) | 2.4 + 5 GHz | 600 Mbps | 2009 |
| **802.11ac** (WiFi 5) | 5 GHz | 3.5 Gbps | 2014 |
| **802.11ax** (WiFi 6) | 2.4 + 5 GHz | 9.6 Gbps | 2019 |
| **802.11be** (WiFi 7) | 2.4 + 5 + 6 GHz | 46 Gbps | 2024 |

**Consideraciones prácticas:**
- La velocidad real WiFi suele ser el 30-50% de la velocidad teórica
- Las obstrucciones (paredes, muebles) atenúan la señal
- El canal compartido: cuantos más dispositivos, menos ancho de banda por dispositivo
- Interferencias con vecinos en la misma frecuencia

---

## 📐 Conceptos físicos clave

### Ancho de banda

Capacidad máxima de transmisión de un medio. Se mide en **bps** (bits por segundo):

```
1 Kbps = 10³ bps
1 Mbps = 10⁶ bps
1 Gbps = 10⁹ bps
10 Gbps = 10¹⁰ bps
```

> ⚠️ **No confundir con el ancho de banda en Hz.** El ancho de banda en Hz mide el rango de frecuencias que puede transmitir un medio. Están relacionados por el **teorema de Nyquist**: capacidad = 2 × ancho_de_banda × log₂(niveles). En la práctica, usamos "ancho de banda" como sinónimo de "velocidad máxima de transmisión".

### Throughput (rendimiento)

Es el **ancho de banda real** que obtienes en la práctica. Siempre menor que el ancho de banda teórico por:
- Overhead de protocolos (cabeceras)
- Colisiones y retransmisiones
- Congestión de red
- Limitaciones del hardware

### Latencia

Tiempo que tarda un paquete en viajar del origen al destino. Se mide en milisegundos (ms):

| Tipo | Latencia | Ejemplo |
|---|---|---|
| LAN | < 1 ms | Misma oficina |
| Campus | 1-5 ms | Misma universidad |
| WAN | 20-150 ms | España ↔ EE.UU. |
| Satélite | 250-600 ms | Internet vía satélite |

### Atenuación

Pérdida de intensidad de la señal con la distancia. En cables de cobre, la atenuación aumenta con la frecuencia y la temperatura. Por eso los cables tienen una **distancia máxima** (100 m para UTP).

### Diafonía (Crosstalk)

Interferencia de un par de hilos sobre otro par adyacente. Tipos:

- **NEXT (Near-End Crosstalk):** interferencia medida en el extremo cercano
- **FEXT (Far-End Crosstalk):** interferencia medida en el extremo lejano
- **PS NEXT (Power Sum NEXT):** suma de todas las interferencias sobre un par

---

## 🏗️ Cableado estructurado

El cableado estructurado es la forma profesional de cablear un edificio. Sigue el estándar **TIA/EIA-568** y consta de:

```
[PC] ←→ [Latiguillo] ←→ [Keystone/Patch panel] ←→ [Cable horizontal] ←→ [Patch panel] ←→ [Latiguillo] ←→ [Switch]
```

### Elementos

- **Latiguillo (patch cord):** cable flexible de 1-5 m que conecta el PC al keystone o el patch panel al switch
- **Keystone:** conector hembra RJ45 que va en la roseta de pared
- **Patch panel:** panel con 12-48 puertos RJ45 que concentra todos los cables del edificio
- **Cable horizontal:** cable UTP sólido (no flexible) que va del patch panel al keystone, dentro de las paredes o falsos techos

### Ventajas del cableado estructurado

- **Organización:** cada toma de red está identificada y etiquetada
- **Flexibilidad:** cambiar un PC de ubicación solo requiere un latiguillo nuevo
- **Mantenimiento:** el cable horizontal fijo rara vez se estropea; los latiguillos se cambian fácilmente
- **Certificación:** se puede certificar que la instalación cumple la categoría (Cat6, etc.)

---

## ⭐ Sé el Cable

> *Eres un cable UTP Cat6 de 2 metros. Te acaban de crimpar con la norma T568B en ambos extremos. Estás conectado entre un PC y un switch.*

Tu día a día:
- Ves pasar bits a 1 Gbps.
- A veces sientes interferencias porque hay un cable de corriente cerca.
- Cuando un humano te pisa con la silla, sufres en silencio.

**Escenario:** El PC no recibe datos. ¿Qué puede haber pasado?

a) **El cable está crimpado con T568A en un extremo y T568B en el otro** → Eso es un **cable cruzado**. Entre PC y switch hoy en día funciona (Auto MDI-X), pero en equipos viejos no.
b) **Un hilo del cable está roto por la pisada de una silla** → ❌ El cable sufre daño físico. El tester lo detecta.
c) **El RJ45 no está bien insertado en el puerto** → El clip de plástico se rompió. El cable se sale solo.

---

## 🔥 Fireside Chat: Cobre vs Fibra

> *En el rack de comunicaciones, un cable UTP Cat6 y una fibra óptica discuten.*

**Cobre:** — Yo llego a 100 metros, 10 Gbps si soy Cat6a. Y lo mejor: barato. Cualquiera me crimpa.

**Fibra:** — 100 metros, dices. Yo llego a 40 KILÓMETROS sin repetidor. 100 Gbps. Y no me afectan las interferencias electromagnéticas.

**Cobre:** — Vale, pero mis conectores RJ45 cuestan 0.50€. Los tuyos cuestan 20€ y necesitas un fusion splicer.

**Fibra:** — Calidad, amigo. Calidad. En los datacenters no se juega. Y no me electrocutas cuando hay una tormenta.

**Cobre:** — Tampoco como ensalada. Cada cual con sus ventajas.

**Fibra:** — Ventajas... tú te doblas, te rompes, te dañan las ratas. Yo paso por conductos con curvas cerradas, no me corroo, y duro 25 años.

**Cobre:** — Vale, pero cuando un usuario tira de un cable porque "tropieza", es más barato reemplazarme a mí.

**Fibra:** — *sonríe* En 5 años todos serán WiFi 7 y tú acabarás en un museo.

**Cobre:** — El WiFi necesita switches. Y los switches necesitan cables. Así que no me jubilo tan pronto.

---

## 🕵️ ¿Quién Soy?

1. Tengo 8 hilos de cobre trenzados en 4 pares. Me usan en oficinas. Termino en RJ45.

2. No me afectan las interferencias. Transmito con luz. Soy delgada y frágil.

3. Conecto dispositivos del mismo tipo (PC a PC, switch a switch). Mis pares están intercambiados.

4. Soy el estándar de crimpado que pone el par verde antes que el naranja.

5. Mido la potencia de la señal que llega al receptor. Si soy muy baja, hay errores.

6. Vivo en el rack. Tengo 24 puertos. Cada cable horizontal del edificio termina en mí.

<details>
<summary>🔄 Respuestas</summary>

1. **Cable UTP** — Universal, económico, 8 hilos.
2. **Fibra óptica** — Luz, no electricidad.
3. **Cable cruzado (Crossover)** — Los pines 1-2 y 3-6 están cruzados.
4. **T568A** — Verde/blanco es el pin 1.
5. **Atenuación** — Pérdida de señal con la distancia.
6. **Patch panel** — Punto de concentración del cableado horizontal.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "El LED del switch se enciende pero no hay conectividad"

**CONRAD:** — Me encanta este clásico. Usuario: *El LED del switch se enciende, así que el cable funciona*. CONRAD: *Te enciendo una bombilla y te digo que Internet funciona. El LED solo indica que hay voltaje en el circuito, NO que los datos pasen correctamente.*

**Realidad:** Un LED encendido significa que hay conexión física básica. Pero puede haber:
- Pares rotos → errores CRC
- Cable demasiado largo (>100m) → atenuación
- Interferencias → colisiones y retransmisiones
- Cable mal crimpado → conexión intermitente
- Solo 2 pares conectados en lugar de 4 → negociación a 100 Mbps en lugar de 1 Gbps

Usa un **comprobador de cables**. No confíes solo en los LEDs.

---

## ⚡ Laboratorio de Tortura: Crimpado y diagnóstico de cables

> **Duración:** 1 hora
> **Material:** Cable UTP, conectores RJ45, crimpadora, comprobador de cables

**Escenario:**
1. Crimpa 3 cables UTP con norma T568B en ambos extremos.
2. Comprueba que pasan el test del comprobador (todos los LEDs del 1 al 8 en orden).
3. Ahora, SIN MIRAR, introduce UN fallo en cada cable:
   - Cable 1: intercambia los pares 2 y 3 en un extremo
   - Cable 2: deja el hilo 4 sin conectar
   - Cable 3: haz un cable cruzado (T568A en un lado, T568B en el otro)

**Reto:** Pásale los cables a un compañero. ¿Puede detectar los fallos solo con el comprobador? ¿Y conectándolos a la red?

**Pregunta extra:** ¿El cable cruzado funciona en switches modernos? Investiga **Auto MDI-X**.

**Fallo intencionado:** Durante el crimpado del cable 3, "sin querer" metes el hilo blanco/naranja en el pin 3 en lugar del pin 1 en el extremo T568B. El comprobador mostrará una pares incorrectos (split pair). El cable parecerá funcionar a baja velocidad pero generará errores intermitentes.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Crimpmaster** | Crimpar un cable directo perfecto a la primera |
| 🏅 **Cable Detective** | Encontrar el fallo intencionado del laboratorio sin comprobador |
| 🏅 **Pinout Pro** | Recitar de memoria el pinout T568B |
| 🏅 **Fiber Fan** | Explicar 3 diferencias entre monomodo y multimodo sin apuntes |

---

## 🧠 Atrévete a Pensar

1. ¿Por qué los pares están trenzados en un cable UTP? ¿Qué problema físico soluciona el trenzado?
2. ¿Qué categoría de cable necesitas para soportar 10 Gbps a 100 metros?
3. ¿Cuántos hilos usa 100Base-TX? ¿Y 1000Base-T?
4. ¿Qué es el **crosstalk** (diafonía)? ¿Cómo se mitiga?
5. ¿Por qué la fibra óptica no sufre interferencias electromagnéticas?
6. Tienes que cablear un edificio de 4 plantas con 30 PCs por planta. ¿Qué equipamiento necesitas a grandes rasgos?

<details>
<summary>💡 Soluciones</summary>

1. **Cancelación electromagnética.** El trenzado hace que las interferencias externas afecten por igual a ambos hilos del par, y al restarse en el receptor se cancelan.
2. **Cat6a** (o Cat7). Cat6 solo llega a 10 Gbps hasta 55 metros.
3. **100Base-TX** usa 2 pares (4 hilos). **1000Base-T** usa 4 pares (8 hilos).
4. **Crosstalk** es la interferencia de un par sobre otro. Se mitiga con: trenzado, distancia entre pares, apantallamiento (STP/FTP).
5. Porque la luz no es una señal eléctrica. Los campos electromagnéticos externos (motores, fluorescentes) no afectan a los fotones viajando por el vidrio.
6. Por planta: 1 switch de 48 puertos, cable horizontal desde cada puesto hasta el patch panel, latiguillos del patch panel al switch, y un enlace de fibra o cobre entre switches de planta (uplink) hasta el switch/core del edificio.

</details>

---

## 🧩 Crucigrama de Bits

```
Horizontal:
1. Conector de 8 pines para UTP (4 letras + número)
4. Herramienta que verifica la continuidad del cable (8 letras)
5. Tipo de cable trenzado sin apantallar (3 letras)
7. Estándar WiFi de 5 GHz con 3.5 Gbps (9 letras)
8. Módulo intercambiable para puertos de switch (3 letras)

Vertical:
2. Fenómeno de pérdida de señal con la distancia (10 letras)
3. Norma de crimpado con naranja primero (letra + número)
6. Medida del tiempo de ida y vuelta de un paquete (7 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. RJ45, 4. TESTER, 5. UTP, 7. AC

**Vertical:** 2. ATENUACIÓN, 3. T568B, 6. LATENCIA

</details>

---

## 💬 Preguntas de Entrevista de Trabajo

1. **"¿Me crimpas un cable directo? Explícame qué haces paso a paso."**
2. **"¿Cuándo usarías fibra óptica y cuándo cobre?"**
3. **"¿Qué significa que un cable sea Cat6? ¿Qué lo diferencia de Cat5e?"**
4. **"Un usuario reporta lentitud en la red. Sospechas del cableado. ¿Qué pruebas haces?"**
5. **"¿Qué es el cableado estructurado? ¿Qué ventajas tiene frente a cablear sin planificar?"**

---

## 🤷 No hay preguntas tontas

> ❓ **Si un cable UTP tiene 8 hilos, ¿por qué no se transmiten 8 bits simultáneamente?**

En el estándar 1000Base-T (Gigabit Ethernet sobre UTP) los 4 pares de hilos transmiten simultáneamente en ambas direcciones gracias a la tecnología full-duplex y al procesado digital de señales. Cada par transmite y recibe a la vez usando técnicas de cancelación de eco y ecualización. Por tanto, sí se transmiten datos por los 8 hilos de forma simultánea, pero no como 8 bits individuales independientes, sino como 4 canales bidireccionales que en conjunto alcanzan 1 Gbps.

---

> ❓ **¿Puedo usar cable Cat5e para 10 Gbps?**

Técnicamente sí, a distancias muy cortas (< 30 m) y en condiciones ideales. Pero no está certificado para ello. Si necesitas 10 Gbps de forma fiable, usa Cat6a o superior. Con Cat5e tendrás errores CRC, retransmisiones y un rendimiento muy por debajo de lo esperado.

---

> ❓ **¿Es verdad que los cables de red tienen una longitud máxima de 100 metros?**

Sí, para UTP en Ethernet. Es una limitación física: la atenuación hace que la señal sea demasiado débil para ser interpretada correctamente más allá de 100 m. Para distancias mayores necesitas: repetidores, switches intermedios, o fibra óptica.

---

> ❓ **¿Qué diferencia hay entre un hub y un switch a nivel físico?**

El hub opera en capa 1 (física): repite la señal por todos los puertos sin ningún tipo de procesamiento. El switch opera en capa 2: examina las tramas, aprende MACs y reenvía selectivamente. Pero ambos usan los mismos conectores RJ45 y el mismo cableado. La diferencia está en el *procesamiento* de la señal, no en el medio físico.

---

## 🎬 Post-Créditos

Un cable Cat6 transporta 1 Gbps sin problemas hasta que una silla pasa por encima. El impacto físico daña el par 3-6, provocando errores CRC y retransmisiones continuas. El comprobador de cables revela una falta de continuidad en el pin 3. El cable debe ser reemplazado. Lección aprendida: la capa física es la base de todo; si falla, nada funciona.

**PRÓXIMAMENTE EN U04:** Direccionamiento IPv4, subredes, máscaras y por qué 192.168.1.256 no existe.

---

## ✅ Criterios de evaluación cubiertos

**RA2: Integra ordenadores y periféricos en redes cableadas e inalámbricas.**

| Criterio | Cubierto |
|---|---|
| a) Estándares para redes cableadas | ✅ Categorías, T568A/B, Auto MDI-X |
| b) Montaje de cables | ✅ Laboratorio de crimpado |
| c) Comprobadores de conectividad | ✅ Tester de cables, LEDs |
| d) Direccionamiento lógico IP | ✅ (Introducción — se verá en U04) |
| e) Estándares inalámbricos | ✅ WiFi 4/5/6/7 |
| f) Integración de dispositivos | ✅ Cableado estructurado |
