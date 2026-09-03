---
title: 02 — Tipos de VLAN
description: Datos, nativa, voz y gestión; estática frente a dinámica 🗂️
---

<p><small>Datos, nativa, voz y gestión; estática frente a dinámica 🗂️</small></p>

> 🗺️ **Estás en:** 🏢 **U08 · VLANs** → 02 · Tipos de VLAN

---

## 📬 La idea en una frase

> No toda VLAN sirve para lo mismo: hay VLANs que transportan datos de usuario, una que viaja **sin etiquetar** por los trunks, una reservada para teléfonos IP y otra para administrar el propio switch. Además, puedes asignar los puertos **a mano** (estática) o dejar que el switch **decida por la MAC** (dinámica).

En el punto 1 viste el concepto y la motivación. Aquí te llevas el mapa completo de qué tipos de VLAN existen y cuándo usar cada uno. Este vocabulario es oro en una entrevista: "¿cuál es la diferencia entre una VLAN de datos y una nativa?" es pregunta estrella.

---

## 🗂️ Los cuatro tipos clásicos de VLAN

Todos los manuales distinguen cuatro roles de VLAN. Aprende la tabla de memoria:

| Tipo de VLAN | Función | Ejemplo | Obsesión del administrador |
|---|---|---|---|
| **Datos** | Tráfico normal de usuario (PCs, impresoras) | VLAN 10 Ventas, VLAN 20 RRHH | Que cada departamento tenga su número |
| **Nativa** | La única que NO se etiqueta en el trunk | VLAN 1 (predeterminada) o 999 | Que sea igual en los dos extremos del trunk |
| **Voz** | Teléfonos IP, prioridad de QoS | VLAN 100 voz | Que el puerto acepte un PC + un teléfono a la vez |
| **Gestión** | Administración del switch (SSH, SNMP, web) | VLAN 999 gestión | Que NO sea accesible desde todos los sitios |

### VLAN de datos

Es la que transporta el tráfico del día a día: navegación, correo, impresoras, copias de seguridad de archivos. Cada departamento o función suele tener la suya (Ventas = 10, RRHH = 20, IT = 30…). Es la VLAN por defecto donde acaba todo lo que no se configura para otra cosa.

### VLAN nativa

Es la VLAN especial del trunk (punto 3). En un enlace troncal, **todas** las tramas se etiquetan con 802.1Q… excepto las de la native VLAN, que viajan tal cual, sin etiqueta. Por defecto es la VLAN 1. Si en cada extremo del trunk usas VLANs nativas distintas, las tramas sin etiquetar "caen" en VLANs diferentes a cada lado y se producen fallos de conectividad (o ataques de double tagging).

### VLAN de voz

Los teléfonos IP necesitan su propia VLAN por dos motivos: **calidad de servicio** (priorizar el audio sobre el tráfico de datos, para que una descarga no te corte la llamada) y **seguridad** (el teléfono no debe compartir red con un PC del usuario). En un puerto access puedes activar `switchport voice vlan 100` para que la VLAN de voz se configure sola sobre la de datos.

### VLAN de gestión

Sirve para administrar el switch: **SSH**, **SNMP**, interfaz web. Se recomienda separarla del tráfico de usuario para que un fallo de red de datos (o un usuario malicioso en broadcast) no comprometa la administración. La *management VLAN* suele asignarse al mismo SVI (interfaz virtual) `interface vlan 999`.

---

## 🎛️ VLAN estática vs VLAN dinámica

Ahora la decisión de despliegue: cómo se decide en qué VLAN cae cada puerto.

| Característica | **Estática** (puerto→VLAN) | **Dinámica** (MAC→VLAN) |
|---|---|---|
| Asignación | Manual: configuras cada puerto | Automática: el switch mira la MAC (vía VMPS) |
| Flexibilidad | Baja: cambiar de VLAN = reconfigurar el puerto | Alta: la máquina "arrastra" su VLAN a cualquier puerto |
| Administración | Simple, perfecta para redes pequeñas | Compleja: requiere servidor VMPS y mantenimiento |
| Riesgo | Cambiar el cable de puerto cambia de VLAN | La MAC cambia (tarjeta nueva) y el dispositivo "se pierde" |
| Uso típico | El 90% de las implementaciones reales | Redes muy grandes con movimiento constante de equipo |

> 🔥 Siempre que veas un "¿cuándo usarías dinámica?", la respuesta corta es: **casi nunca**. El coste de mantener el servidor VMPS y depender de las MACs no compensa salvo en entornos enormes con movilidad extrema (hospitales, campus). CONRAD resume la estática así: *"puerto 5 = VLAN fija, y el administrador no adivina nada"*.

---

## 🏢 Ejemplos reales por departamento

Planificar la numeración es un arte. El esquema habitual en oficinas:

| VLAN | Nombre | Puertos | Motivo |
|---|---|---|---|
| 10 | Ventas | 1-12 | Datos de un departamento concreto |
| 20 | RRHH | 13-24 | Datos sensibles: aislar del resto |
| 30 | IT | 25-32 | Datos + acceso a gestión de todo |
| 100 | Voz | — | Teléfonos IP de todos los departamentos |
| 999 | Gestión | — | Administración del switch |

> 💡 **Regla de oro de numeración:** deja huecos entre VLANs (10, 20, 30…), usa un número "redondo" para voz y uno además alto (999) para gestión. Es más fácil de operar y de auditar que un pufo de números consecutivos sin criterio.

### ¿Cuándo usar cada tipo?

- **VLAN de datos:** siempre que haya tráfico de usuarios o servidores que deba separarse (departamentos, servicios, invitados).
- **VLAN nativa:** únicamente en trunks; elige un número distinto de la VLAN de datos (jamás la 1) y que coincida en ambos extremos.
- **VLAN de voz:** en cualquier despliegue con telefonía IP, para proteger y priorizar el audio.
- **VLAN de gestión:** siempre que ataques SSH/SNMP; aíslala del tráfico de usuario y limita el acceso con ACL.
- **VLAN dinámica:** solo en redes grandes con movilidad constante y servidor VMP S; en el 90% de los casos, estática y a otra cosa.

---

## 🧠 Mini-chequeo

1. ¿Cuál es la diferencia esencial entre la VLAN de datos y la VLAN nativa?
2. ¿Por qué la VLAN de voz tiene prioridad QoS?
3. ¿Cuándo merece la pena una VLAN dinámica frente a una estática?

<details>
<summary>🔄 Respuestas</summary>

1. La VLAN de **datos** transporta tráfico de usuario normal; la **nativa** es la única que **no se etiqueta** en el trunk (viaja "pelada"). Por defecto la nativa es la VLAN 1 y en los trunks debe coincidir en ambos extremos.
2. Porque el **audio debe tener prioridad** sobre el tráfico de datos: si el teléfono comparte la red con los PCs, una descarga puede saturar la cola y cortar o entrecortar las llamadas. La prioridad la marca el campo **802.1p (PRI)** de la etiqueta 802.1Q.
3. Solo en **redes muy grandes con mover constante de equipos** y servidor VMPS disponible. En oficinas normales, la **estática** es más simple, predecible y barata de mantener.

</details>

---

## ✅ Resumen en 3 frases

- El switch distingue cuatro roles: **datos, nativa, voz y gestión**, cada uno con su propósito.
- La asignación puede ser **estática (puerto→VLAN)**, el estándar del 90% de las redes, o dinámica (MAC→VLAN vía VMPS), reservada para casos grandes.
- La planificación de números con huecos (10, 20, 30…) y una VLAN alta para gestión te ahorrará dolores de cabeza.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| VLAN de datos | Tráfico normal de usuario |
| VLAN nativa | VLAN sin etiquetar en el trunk (VLAN 1 por defecto) |
| VLAN de voz | Teléfonos IP, con prioridad 802.1p |
| VLAN de gestión | Administración del switch (SSH, SNMP) |
| VLAN estática | Asignación manual puerto → VLAN |
| VLAN dinámica | Asignación automática MAC → VLAN (VMPS) |
| VMPS | Servidor que centraliza la asignación dinámica |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/08-vlans) · **Anterior:** [01 · ¿Qué es una VLAN?](/ApuntesRedes/08-vlans/01-que-es-una-vlan) · **Siguiente:** [03 · Trunks y 802.1Q](/ApuntesRedes/08-vlans/03-trunks-y-8021q)