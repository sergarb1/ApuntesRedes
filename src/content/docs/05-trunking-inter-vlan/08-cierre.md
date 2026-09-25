---
title: "08 — Cierre: consolida lo aprendido"
description: El cierre práctico, con trunks, VLANs y routers de por medio 🌉
---

<p><small>El cierre práctico, con trunks, VLANs y routers de por medio 🌉</small></p>

> 🗺️ **Estás en:** 🌉 **Trunking y enrutamiento inter-VLAN** → 08 · Cierre

---

Has terminado la teoría: sabes cómo un trunk transporta todas las VLANs, por qué la native VLAN manda, cómo un router-on-a-stick o un switch capa 3 hacen hablar a VLANs separadas y qué papeles juegan VTP, DTP y la seguridad. Este cierre es el aterrizaje: juegos, un laboratorio con fallos intencionados y las preguntas de la entrevista. Léelo justo después del [punto 7](/ApuntesRedes/05-trunking-inter-vlan/07-dhcp-por-vlan) y antes de abrir los boletines.

---

## ⭐ Sé el Paquete

> *Eres un paquete de un portátil de la VLAN 20 (RRHH) que necesita imprimir en la impresora de la VLAN 30. Tu viaje va a cruzar la frontera más estudiada del curso.*

**Paso 1:** Salgo de mi portátil hacia el switch de acceso. Mi destino (la impresora) está en otra subred, así que mi gateway (la SVI de la VLAN 20) es mi primera parada.

**Paso 2:** Llego al switch capa 3 por el trunk etiquetado con la VLAN 20. La SVI VLAN 20 acepta el paquete, mira su tabla de rutas y decide: la 192.168.30.0/24 está conectada, por la SVI VLAN 30.

**Paso 3:** Reencapsulado con nueva MAC (la de la SVI 30) y misma IP de destino, bajo por el trunk hacia el switch de acceso y llego a la impresora. Nadie cambió ninguna VLAN: yo cambié de red lógica por decisión de capa 3.

**¿Qué ha pasado?**
1. **Enrutamiento inter-VLAN con switch capa 3 (SVIs + trunk)** → ✅ ¡Correcto! El trunk llevó mi etiqueta VLAN 20, la SVI enruta y reencapsula, y el trunk me entrega en VLAN 30.
2. **El switch de capa 2 ha cambiado mi etiqueta de 20 a 30** → ❌ Un switch puro no reescribe subredes: solo conmuta tramas dentro de la misma VLAN. Lo que me cruzó fue un dispositivo de capa 3 (SVI o router).
3. **Un hub ha propagado el paquete a todas las VLANs** → ❌ Un hub ni entiende de VLANs ni de etiquetas; y el broadcast no cruza fronteras. Mi viaje fue enrutado, no difundido.

> 💡 **La moraleja del paquete bisabuelo:** para cruzar VLANs hace falta **capa 3**: subinterfaces (router-on-a-stick) o SVIs (switch L3). El trunk es el túnel que lleva las etiquetas; el enrutamiento es la frontera con su aduana.

---

## 🔥 Fireside Chat: Router-on-a-Stick vs Switch Capa 3

> *En el rack, un router 2911 con una sola interfaz activa y un switch capa 3 discuten sobre quién enruta mejor entre VLANs.*

**Router-on-a-Stick:** — Yo soy el clásico: una interfaz física, subinterfaces por VLAN, encap dot1Q. Conmigo entiendes el flujo de arriba abajo, y en Packet Tracer soy el rey de los laboratorios.

**Switch L3:** — Y yo soy el presente: SVIs por VLAN, rutas en hardware, y ni un salto extra. Todo el tráfico inter-VLAN viaja en el propio switch a velocidad de backplane.

**Router-on-a-Stick:** — Pero todo tu tráfico entre VLANs pasa por un solo equipo. Si mueres, mueren todas las fronteras.

**Switch L3:** — Y tu único enlace gigante entre router y switch también es un cuello de botella y un SPOF, amiguito. Al menos mis SVIs escalan sin saturar un puerto.

**Router-on-a-Stick:** — Tengo un punto a favor: NAT, ACLs avanzadas y WAN viven conmigo. Cuando sale a Internet, por mí pasa.

**Switch L3:** — Y por eso el diseño real nos junta: yo enruto entre VLANs dentro, tú sales afuera. Cada uno donde brilla.

**Router-on-a-Stick:** — Trato: en el laboratorio, yo; en la empresa, tú; en producción, los dos.

**Switch L3:** — Como siempre: se trata de saber qué frontiera estás cruzando.

---

## 🕵️ ¿Quién Soy?

1. Transporto tramas de todas las VLANs por un solo cable y me presento con encapsulación dot1Q.

2. Soy la VLAN que viaja sin etiqueta en un trunk y por eso te digo: cámbiame y cámbiame en ambos extremos.

3. Soy una interfaz virtual del switch que tiene IP, actúa de gateway y enruta como un router.

4. Me llamo subinterfaz y soy el truco del router que enruta varias VLANs por un único cable.

<details>
<summary>🔄 Respuestas</summary>

1. **El trunk (802.1Q)** — Enlace etiquetado multip VLAN.
2. **La native VLAN** — Sin tag; debe coincidir en ambos extremos.
3. **La SVI (interface vlan X)** — Gateway virtual del switch capa 3.
4. **Router-on-a-Stick** — Subinterfaces G0/0.10, G0/0.20… con dot1Q.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "El trunk va mal, cambié la native VLAN solo en un extremo"

**Administrador:** — He cambiado la native VLAN a 99 por seguridad… en el switch de acceso. El de distribución lo haré mañana.

**CONRAD:** — ¡Mañana! ¿Y esta noche qué? Esta noche tu trunk se rasga: cada extremo piensa que la native es otra, los CDP gritan error y el tráfico de gestión acaba cruzándose sin etiquetar. Los trunk no se cambian a medias: se cambian en AMBOS extremos en la misma ventana.

**CONRAD:** — Y si es por seguridad: cambia native, desactiva DTP y no uses la 1 para nada. Pero las tres cosas juntas, o la media configuración es peor que ninguna.

**La lección:** un trunk es un contrato bilateral: 802.1Q, native VLAN y modo (trunk/acceso) deben coincidir en ambos extremos. La mitad de un contrato es un desacuerdo, y en redes el desacuerdo se paga en incidentes.

---

## ⚡ Laboratorio de tortura: Inter-VLAN con fallo escondido

> **Duración:** 1,5 horas
> **Material:** Packet Tracer — 1 router 2911 (o switch L3 3560), 1 switch 2960, 4 PCs en 2 VLANs

**Montaje base (elige modo A o B):**
- **Modo A (router-on-a-stick):** Router con G0/0.10 (VLAN 10) y G0/0.20 (VLAN 20); switch con trunk hacia el router; PCs en VLAN 10 y 20.
- **Modo B (switch L3):** 3560 con `ip routing`, SVIs 192.168.10.1 y 192.168.20.1; PCs conectados al switch.

**Configura al inicio:**
1. VLANs 10 (Ventas) y 20 (RRHH) creadas y asignadas a puertos.
2. Trunk entre switch y router/SVL con native 99 y DTP desactivado (`switchport nonegotiate`).
3. Gateways correctos en los PCs (192.168.10.1 y 192.168.20.1).
4. Verifica: PC de VLAN 10 pinge a PC de VLAN 20 y viceversa.

> 🤖 **Variante exprés (recomendada):** en lugar del paso 3, monta los pools DHCP del [punto 7](/ApuntesRedes/05-trunking-inter-vlan/07-dhcp-por-vlan) (uno por VLAN, con su `default-router` y sus excluded-address) y deja que cada PC pida IP sola. Si alguna queda en `169.254.x.x`, diagnostica la cadena pool → VLAN → relay antes de seguir: un PC en APIPA arruina el resto del laboratorio.

**Ahora, SIN MIRAR, tu profesor introduce TRES fallos:**
- Fallo A: quita la subinterfaz G0/0.20 (o el `ip routing` del switch L3).
- Fallo B: cambia la native VLAN a 55 solo en el switch de acceso.
- Fallo C: apaga (`shutdown`) la SVI de la VLAN 20.

**Reto:** diagnosticar con `show vlan brief`, `show interfaces trunk`, `show ip route` y pings. Documenta síntoma → causa → solución de cada fallo.

**Fallo intencionado extra:** el profesor configura el trunk del router con encapsulación ISL en una subinterfaz (`encapsulation isl 20`). Los PCs de VLAN 20 no llegan a nada y el error no es de IP. Pista: ¿qué encapsulación soporta el hardware moderno?

> **Pista 1 (fallo A):** los PCs de VLAN 20 pingean su gateway y falla. ¿Existe la subinterfaz/SVI? ¿Está up/up?
>
> **Pista 2 (fallo B):** `show interfaces trunk` mostrará Native VLAN mismatch. El CDP, si está activo, te lo susurra en los logs.
>
> **Pista 3 (fallo C):** `show ip interface brief` — la SVI apagada no responde ARP aunque el trunk esté perfecto.

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Contratista de trunks** | Montar un trunk 802.1Q con native 99 y nonegotiate en ambos extremos |
| 🏅 **Fronterero** | Hacer ping entre dos VLANs por router-on-a-stick y luego por switch L3 |
| 🏅 **Cazador de nativas** | Detectar el native VLAN mismatch solo con `show interfaces trunk` |
| 🏅 **Llanero espacial** | Explicar la diferencia SVI/subinterfaz sin apuntes en menos de 1 minuto |

---

## 🧠 Atrévete a pensar

1. ¿Por qué un trunk con native VLAN por defecto (1) y VLAN 1 "usada para datos" es una mala combinación de seguridad?
2. Diseña la migración de una red plana (todos en VLAN 1) a 3 VLANs con inter-VLAN por switch L3, en una empresa que no puede parar. ¿Qué pasos y en qué orden?
3. Un trunk transporta VLANs 10, 20 y 99. ¿Qué pasa con una trama de la VLAN 30 (no permitida) que llega al trunk?
4. ¿Qué ventaja real aporta `switchport nonegotiate` en los trunks y dónde lo pondrías?

<details>
<summary>💡 Soluciones</summary>

1. La native viaja **sin etiqueta**: cualquier equipo que enchufe en un puerto y hable "sin tag" acaba en VLAN 1 junto al tráfico de gestión/CDP/VTP. Usar la 1 para datos multiplica el ruido y la superficie de ataque; hay que separar gestión, datos y native.
2. (a) Crear VLANs y SVIs con `ip routing` activado (sin tocar aún los puertos); (b) migrar departamentos por tandas: cambiar el puerto a `access vlan X` y el gateway del equipo (o dejar DHCP en la nueva subred); (c) verificar inter-VLAN con pings entre tandas; (d) al final, retirar la antigua VLAN 1 de datos (reservarla como native/gestión).
3. Nada: el trunk solo lleva las VLANs permitidas (`switchport trunk allowed vlan`). La trama de la 30 llega en el switch de destino y, si esa VLAN no existe o el puerto no la admite, se descarta (o queda limitada a la local si existe).
4. DTP negocia trunks/desea automáticamente: un atacante que "negocie" trunk puede saltarse la segmentación. `nonegotiate` en los puertos de usuario y en los enlaces fijos evita que alguien convierta un access en trunk; se pone en **todos los puertos que no deben negociar**.

</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. Enlace etiquetado que transporta varias VLANs
3. Interfaz virtual del switch capa 3 con IP (2 palabras)
5. Protocolo de etiquetado de trunks IEEE (sigla)
7. Modo DTP que fuerza trunk sin negociar (2 palabras)

Vertical:
2. VLAN que viaja sin etiqueta en el trunk
4. Tecnología Cisco precursora de 802.1Q (sigla)
6. Comando que activa el enrutamiento en un switch L3 (2 palabras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. TRUNK, 3. SVI, 5. DOT1Q (802.1Q), 7. MODETRUNK

**Vertical:** 2. NATIVE, 4. ISL, 6. IPROUTING

</details>

---

## 💬 Preguntas de entrevista de trabajo

1. **"¿Qué es un trunk y qué diferencia hay con un puerto access?"**
2. **"¿Cómo harías comunicación entre VLANs? ¿Qué opciones hay y cuándo usarías cada una?"**
3. **"¿Qué riesgos tiene la native VLAN y cómo la aseguras?"**
4. **"¿Qué es VTP? ¿Lo activarías en producción?"**
5. **"Un usuario de la VLAN 10 no llega a la VLAN 20. Enumera tus comprobaciones."**

> 💡 **Cómo encararlas:** la 1: trunk = enlace etiquetado multip VLAN (802.1Q), access = un solo VLAN sin etiqueta; el trunk une switches y llega a routers/SVIs. La 2: router-on-a-stick (subinterfaces, ideal para redes pequeñas o docencia) frente a switch capa 3 (SVIs + ip routing, ideal en producción por rendimiento); en el borde, el router para NAT/WAN. La 3: viaja sin etiqueta, atrapa tráfico sin tag; se cambia (a una VLAN dedicada no usada) **en ambos extremos**, con DTP off y VLAN 1 fuera de datos. La 4: replica bases de datos de VLANs entre switches; conveniente no usarlo (transparente u off) en redes estables para evitar una propagación que borre VLANs; si se usa, modo/contraseña y revisión. La 5: ¿gateway correcto en el PC? ¿SVI/subinterfaz de la VLAN 20 up? ¿trunk permite ambas VLANs? ¿`ip routing`/rutas? ¿ACL que bloquee? Sube la escalera capa a capa.

---

## 🤷 No hay preguntas tontas

> ❓ **¿Un trunk puede llevar también tráfico "normal" de un puerto access?**

El trunk lleva tramas de todas las VLANs permitidas, vengan de puertos access o de otro trunk: lo que define el trunk es la etiqueta. Un switch de acceso con un solo trunk hacia el núcleo y 40 puertos access es el patrón normal: los access "visten" su VLAN local y el trunk la lleva etiquetada.

> ❓ **¿Cuántas VLANs puede tener un switch? ¿Y cuántas "reales" en un trunk?**

En Cisco, el rango tradicional es 1-1005 y con VLAN extendidas hasta 4094 (limite del campo 802.1Q de 12 bits). En un trunk concreto, "reales" son las que permites y usas: Buen diseño no apila 300 VLANs "por si acaso" porque cada una es un dominio de broadcast y una entrada de rutas/SVIs si enrutas.

> ❓ **Si el switch capa 3 enruta entre VLANs, ¿necesito aún router?**

Para inter-VLAN, no (SVIs bastan). Pero el router (o firewall) sigue siendo el punto de salida a Internet, NAT, VPN y ACLs complejas. El switch L3 te evita el cuello de botella del router-on-a-stick, no la existencia del perímetro.

---

## 🎬 Poscréditos

El paquete de RRHH imprimió su acta de auditoría en la impresora de la VLAN 30 y volvió a su VLAN con la conciencia tranquila. En el trunk, una trama sin etiqueta se cruzó con él, y se saludaron como vecinos: una con etiqueta, otra sin ella, ambas en su sitio. CONRAD, desde la consola del switch, murmuró: *"Segmentado, etiquetado, enrutado. Así se ordena un edificio. Los humanos, con carpetas; los switches, con VLANs. Y todos los días alguien intenta ponerlo todo en la misma."*

**PRÓXIMAMENTE:** Enrutamiento estático: componentes del router, configuración desde cero y cómo un router decide por dónde mandar tu paquete. Ahora que las VLANs se hablan entre sí, toca enseñar a los routers a hablar con redes enteras.

---

## ✅ Criterios de evaluación cubiertos (RA3/RA4/RA5)

| CE | Criterio | Cubierto |
|---|---|---|
| RA3 | Administración de conmutadores | ✅ Puntos 1-2 y 7 + ⚡ Laboratorio |
| RA4 | Enrutamiento entre redes | ✅ Puntos 3-4 + 🧠 Atrévete (punto 8) |
| RA5 | Segmentación y aislamiento de tráfico | ✅ Puntos 1, 5 y 6 + 💬 Entrevista (punto 8) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/05-trunking-inter-vlan) · **Anterior:** [07 · DHCP por VLAN](/ApuntesRedes/05-trunking-inter-vlan/07-dhcp-por-vlan) · **Siguiente:** [Enrutamiento estático](/ApuntesRedes/06-enrutamiento-estatico)
