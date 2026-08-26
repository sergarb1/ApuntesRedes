---
title: "09 — Cierre: consolida lo aprendido"
description: El cierre práctico de la U03, con cables, luz y caos controlado 🔌
---

<p><small>El cierre práctico de la U03, con cables, luz y caos controlado 🔌</small></p>

> 🗺️ **Estás en:** 🔌 **U03 · Infraestructura física** → 09 · Cierre

---

Has terminado la teoría: sabes por qué se trenza el cobre, cómo se crimpa un RJ45, cuándo la fibra manda, por qué el WiFi miente y cómo se cablea un edificio en serio. Este cierre es el aterrizaje: recorres lo aprendido con juegos, un laboratorio real de crimpado y las preguntas que te harán en una entrevista. Léelo justo después del [punto 8](/ApuntesRedes/03-infraestructura-fisica/08-cableado-estructurado) y antes de abrir los boletines.

---

## ⭐ Be the Packet, my friend...

> *Eres un bit mordido por la vida: un 1 binario viajando por un cable UTP Cat6 de 95 metros que une un switch con un PC. Acabas de salir del puerto del switch cuesta abajo hacia la roseta de pared.*

**Paso 1:** Naces como un pulso eléctrico al salir del puerto del switch. Tu misión: llegar intacto al receptor de la tarjeta de red del PC.

**Paso 2:** El tramo de cable pasa junto a un **cable de corriente** y bajo la pata de una silla que ayer lo pisó. Sientes que el mundo se llena de ruido.

**Paso 3:** Tras 95 metros de viaje, llegas al receptor **mucho más débil** de lo que naciste. El receptor intenta decidir si eres un 1 o un 0... y no lo tiene claro.

**¿Qué ha pasado?**
1. **La señal se ha atenuado demasiado:** 95 m es legal (el límite son 100), pero el ruido del cable de corriente y la pisada han degradado la relación señal/ruido → ✅ ¡Correcto! El receptor errará algunos bits, las tramas llegarán con errores CRC y habrá retransmisiones. Eso es **atenuación + interferencia** combinadas.
2. **El switch se ha configurado mal y manda a un puerto equivocado** → ❌ Si fuera eso, la señal no llegaría al receptor, no llegaría "débil". El síntoma es de capa 1, no de configuración.
3. **El PC tiene el antivirus comiendo CPU** → ❌ Eso explica lentitud de la aplicación, no errores de señal en el cable. Los bits no saben (ni les importa) si la CPU está ocupada.

> 💡 **La moraleja del bit agotado:** el cable puede estar dentro de norma (95 m) y aun así fallar por **atenuación acumulada + interferencias + daño físico**. Por eso el comprobador de cables y la inspección visual son obligatorios antes de tirar el cable y culpar al switch.

---

## 🔥 Fireside Chat: Cobre vs Fibra

> *En el rack de comunicaciones, un cable UTP Cat6 y una fibra óptica discuten mientras unos ventiladores enfrían la discusión.*

**Cobre:** — Yo llego a 100 metros, 10 Gbps si soy Cat6a. Y lo mejor: barato. Cualquiera me crimpa.

**Fibra:** — 100 metros, dices. Yo llego a 40 KILÓMETROS sin repetidor. 100 Gbps. Y no me afectan las interferencias electromagnéticas.

**Cobre:** — Vale, pero mis conectores RJ45 cuestan 0,50 €. Los tuyos cuestan 20 € y necesitas un fusion splicer.

**Fibra:** — Calidad, amigo. Calidad. En los datacenters no se juega. Y no me electrocutas cuando hay una tormenta.

**Cobre:** — Tampoco como ensalada. Cada cual con sus ventajas.

**Fibra:** — Ventajas... tú te doblas, te rompes, te dañan las ratas. Yo paso por conductos con curvas cerradas, no me corroo, y duro 25 años.

**Cobre:** — Vale, pero cuando un usuario tira de un cable porque "tropieza", es más barato reemplazarme a mí.

**Fibra:** — *sonríe* En 5 años todos serán WiFi 7 y tú acabarás en un museo.

**Cobre:** — El WiFi necesita switches. Y los switches necesitan cables. Así que no me jubilo tan pronto.

**Fibra:** — Los switches de hoy también tienen puertos SFP... y en uno de esos puertos puedo meterme yo. Mete eso en tu museo, chatarrilla.

**Cobre:** — *suspira* Oye, una pregunta seria: en el puesto de un administrativo, ¿qué pondrías tú?

**Fibra:** — En un puesto fijo a 5 metros del switch... pones a este, al Cobre. Yo brillo donde él se ahoga: entre edificios, kilómetros, backbones. El cobre no va al museo: va al escritorio. Yo voy al core.

**Cobre:** — ¿Acabamos de llegar a un acuerdo?

**Fibra:** — *parpadea* Siempre se llegó. Ninguno de los dos puede con todo.

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

**CONRAD:** — Y no me vengas con el "pero si el LED parpadea, la luz verde está preciosa". El "link LED" te dice: *hay dos extremos que se ven y han negociado una velocidad*. Nada más. Puedes tener la luz más bonita del rack y estar transportando basura por dentro.

**Realidad:** Un LED encendido significa que hay conexión física básica. Pero puede haber:
- Pares rotos → errores CRC
- Cable demasiado largo (>100m) → atenuación
- Interferencias → colisiones y retransmisiones
- Cable mal crimpado → conexión intermitente
- Solo 2 pares conectados en lugar de 4 → negociación a 100 Mbps en lugar de 1 Gbps

**CONRAD:** — ¿Y qué hacemos con el usuario? NADA de tocar configuraciones. Primero el **comprobador de cables**, luego el tester de señal, y si el cable pasa, entonces sí: hablamos de capas superiores. No confíes solo en los LEDs. Los LEDs son para que la caja parezca viva, no para diagnosticar.

**La lección:** el LED de enlace es capa 1 *mínima*, no garantía de nada. Diagnostica de abajo hacia arriba y deja la bombilla para iluminar, no para justificar.

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

> **Pista 1 (split pair):** no te fíes de que "los 8 LEDs encienden". Comprueba que **las parejas reales coinciden**: en un directo los pares B devem conservar sus parejas 1-2, 3-6, 4-5 y 7-8 en AMBOS extremos. Si blanco/naranja acaba en un pin distinto del que corresponde a su pareja, es split pair.
>
> **Pista 2 (negociación):** conecta cada cable a la red y mira la velocidad negociada. Un cable de solo 2 pares (7-8 muertos) negociará **100 Mbps** en vez de 1 Gbps. Un split pair puede "funcionar" a 100 con errores raros y fallar al probar Gigabit.
>
> **Pista 3 (cruzado vs directo):** el comprobador te lo delata al instante si en el segundo módulo los pares aparecen cruzados. En la red puede pasar desapercibido por Auto MDI-X, pero en equipos antiguos es la diferencia entre "conecta" y "nada".

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
7. Estándar WiFi de 5 GHz con 3,5 Gbps (9 letras)
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

> 💡 **Cómo encararlas:** la 1 es la "pregunta de examen práctico": narra los 6 pasos (pelar, ordenar T568B, cortar, insertar, crimpar, comprobar) y menciona el tester. La 2 es de criterio: distancias cortas → cobre/WiFi; kilómetros, interferencias o datacenter → fibra. La 3 cae en el detalle: Cat6 es 250 MHz (vs 100 de Cat5e), llega a 10 Gbps hasta 55 m, y Cat6a lo hace a 100. La 4 exige método: tester de pares, velocidad negociada, categoría y longitud. La 5 demuestra que has visto un rack de verdad: TIA/EIA-568, cable horizontal + patch panels + latiguillos y sus ventajas de mantenimiento.

---

## 🤷 No hay preguntas tontas

> ❓ **Si un cable UTP tiene 8 hilos, ¿por qué no se transmiten 8 bits simultáneamente?**

En el estándar 1000Base-T (Gigabit Ethernet sobre UTP) los 4 pares de hilos transmiten simultáneamente en ambas direcciones gracias a la tecnología full-duplex y al procesado digital de señales. Cada par transmite y recibe a la vez usando técnicas de cancelación de eco y ecualización. Por tanto, sí se transmiten datos por los 8 hilos de forma simultánea, pero no como 8 bits individuales independientes, sino como 4 canales bidireccionales que en conjunto alcanzan 1 Gbps. Y ojo: por eso necesita los **4 pares**; si solo tienes 2 (cable nuevo mal crimpado), el enlace negocia a 100 Mbps.

> ❓ **¿Puedo usar cable Cat5e para 10 Gbps?**

Técnicamente sí, a distancias muy cortas (< 30 m) y en condiciones ideales. Pero no está certificado para ello. Si necesitas 10 Gbps de forma fiable, usa Cat6a o superior. Con Cat5e tendrás errores CRC, retransmisiones y un rendimiento muy por debajo de lo esperado. La categoría es el techo garantizado, no una sugerencia.

> ❓ **¿Es verdad que los cables de red tienen una longitud máxima de 100 metros?**

Sí, para UTP en Ethernet. Es una limitación física: la **atenuación** hace que la señal sea demasiado débil para ser interpretada correctamente más allá de 100 m. Para distancias mayores necesitas: repetidores, switches intermedios, o **fibra óptica** (y ahí los kilómetros dejan de ser problema).

> ❓ **¿Qué diferencia hay entre un hub y un switch a nivel físico?**

El hub opera en capa 1 (física): repite la señal por todos los puertos sin ningún tipo de procesamiento. El switch opera en capa 2: examina las tramas, aprende MACs y reenvía selectivamente. Pero ambos usan los mismos conectores RJ45 y el mismo cableado. La diferencia está en el *procesamiento* de la señal, no en el medio físico: puedes cambiar un hub por un switch y el cableado no cambia ni una sola prise.

---

## 🎬 Post-Créditos

Un cable Cat6 transporta 1 Gbps sin problemas hasta que una silla pasa por encima. El impacto físico daña el par 3-6, provocando errores CRC y retransmisiones continuas. El comprobador de cables revela una falta de continuidad en el pin 3. El cable debe ser reemplazado. Lección aprendida: la capa física es la base de todo; si falla, nada funciona. Y CONRAD, desde el fondo del rack, añade: *"El cable lo dice todo. Cuando el paquete se rompe, mirad los pines antes que el router."*

**PRÓXIMAMENTE EN U04:** Direccionamiento IPv4, subredes, máscaras y por qué 192.168.1.256 no existe. Ahora que los bits ya viajan por un buen cable, toca darles una dirección que no se pierda.

---

## ✅ Criterios de evaluación cubiertos (RA2)

**RA2: Integra ordenadores y periféricos en redes cableadas e inalámbricas.**

| CE | Criterio | Cubierto |
|---|---|---|
| a) | Estándares para redes cableadas | ✅ Categorías, T568A/B, Auto MDI-X (puntos 2-3) |
| b) | Montaje de cables | ✅ Laboratorio de crimpado (⚡) |
| c) | Comprobadores de conectividad | ✅ Tester de cables, LEDs, split pair (puntos 4 y 7) |
| d) | Direccionamiento lógico IP | ✅ (Introducción — se verá en U04) |
| e) | Estándares inalámbricos | ✅ WiFi 4/5/6/7 (punto 6) |
| f) | Integración de dispositivos | ✅ Cableado estructurado (punto 8) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-infraestructura-fisica) · **Anterior:** [08 · Cableado estructurado](/ApuntesRedes/03-infraestructura-fisica/08-cableado-estructurado) · **Siguiente:** **[U04 · IPv4 y subnetting](/ApuntesRedes/04-ipv4-subnetting)**