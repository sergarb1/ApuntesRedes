---
title: 04 — SNMP
description: Arquitectura, MIB, OID, versiones y configuración Cisco 🔭
---

<p><small>Arquitectura, MIB, OID, versiones y configuración Cisco 🔭</small></p>

> 🗺️ **Estás en:** 🩺 U11 → 04 · SNMP

---

## 📬 La idea en una frase

> **SNMP** (*Simple Network Management Protocol*) es el protocolo estándar que permite a un **gestor** leer y escribir variables en dispositivos de red (routers, switches, servidores) para **monitorizarlos**: uso de CPU, tráfico de interfaces, temperatura, estado de puertos...

En el [punto 3](/ApuntesRedes/11-diagnostico-monitorizacion/03-wireshark) esperabas a que el fallo pasara delante de ti para verlo. Con SNMP, la red se **autoinforma** a cada momento: el gestor pregunta "¿cuánto tráfico hay?", "¿cuánta CPU usas?", y si algo se sale de lo normal, avisa antes de que el usuario se queje. Es la diferencia entre ser bombero y tener detectores de humo.

---

## 🏗️ Arquitectura: quién pregunta y quién responde

```
Gestor (NMS) ←──────────────→ Agente SNMP (router, switch, servidor)
    │                               │
    │  1. GET  "dame el valor de X" │
    │ ────────────────────────────→ │
    │  2. RESPONSE "aquí tienes X"  │
    │ ←─────────────────────────── │
    │  3. TRAP "¡acabo de caerme!" │
    │ ←─────────────────────────── │
```

Los actores, de memoria:

- **NMS** (*Network Management System*): el gestor, el "centro de control". Ejemplos: Zabbix, PRTG, Nagios (los verás en detalle en el [punto 7](/ApuntesRedes/11-diagnostico-monitorizacion/07-herramientas-de-monitorizacion)).
- **Agente SNMP**: software que vive **en el dispositivo monitorizado** y expone sus variables.
- **MIB** (*Management Information Base*): la "base de datos" lógica de variables que el agente sabe responder.
- **OID** (*Object Identifier*): el **identificador único** de cada variable, como un número de teléfono dentro del árbol de la MIB.

> 💡 **Analogía del parte médico:** la MIB es el formulario de salud (frecuencia cardíaca, temperatura, tensión), el OID es la casilla concreta del formulario ("temperatura", línea 3), el agente es el paciente que se lo lee, y el NMS es el médico que pregunta. SNMP es simplemente el idioma en el que el médico y el paciente se entienden.

---

## 🌳 OIDs: el árbol de variables

Las OIDs se escriben como números separados por puntos y forman un **árbol jerárquico**. Los más usados pertenecen a `1.3.6.1.2.1` (internet → mgmt → mib-2), la rama pública de gestión:

```bash
1.3.6.1.2.1.1.5.0        → sysName (nombre del dispositivo)
1.3.6.1.2.1.1.3.0        → sysUpTime (tiempo activo / uptime)
1.3.6.1.2.1.2.2.1.10     → ifInOctets (tráfico entrante de la interfaz)
1.3.6.1.2.1.2.2.1.16     → ifOutOctets (tráfico saliente de la interfaz)
1.3.6.1.2.1.25.3.3.1.2   → hrProcessorLoad (carga de CPU)
```

Fíjate en el detalle de las dos de tráfico: `ifInOctets` y `ifOutOctets` son **contadores** (octetos acumulados desde que el equipo arrancó). El gestor los lee dos veces, resta y divide entre el tiempo para obtener la **velocidad**: leer una vez a secas no sirve para medir tráfico. Es el clásico error de principiante que verás en el [Crucigrama del cierre](/ApuntesRedes/11-diagnostico-monitorizacion/09-cierre).

---

## 🛡️ Versiones SNMP: la seguridad marca la diferencia

| Versión | Seguridad | Uso |
|---|---|---|
| **v1** | Comunidad en texto claro | Obsoleto |
| **v2c** | Comunidad en texto claro | Común en redes internas |
| **v3** | Cifrado y autenticación (SHA + AES) | Recomendado para producción |

La **comunidad** es la "contraseña" de SNMP v1/v2c: una cadena de texto que viaja **sin cifrar**. En v2c, además de la comunidad, se añadieron mejoras de rendimiento y tipos de datos (contadores de 64 bits). La **v3** es la versión moderna: autentica al gestor (SHA) y cifra el tráfico (AES), por lo que nadie puede espiar ni suplantar las consultas. Si te preguntan en una entrevista, la respuesta corta es: *v1 y v2c son texto claro; v3 es segura*.

---

## ⚙️ Configurar SNMP en Cisco

```bash
R1(config)# snmp-server community publicia ro     # comunidad RO (solo lectura)
R1(config)# snmp-server community privatilla rw   # comunidad RW (lectura-escritura)
R1(config)# snmp-server location SalaServidores
R1(config)# snmp-server contact admin@empresa.com
R1(config)# snmp-server enable traps              # enviar traps al gestor
R1(config)# snmp-server host 192.168.1.100 traps version 2c publicia
```

Desglose importante:

- **`ro` vs `rw`**: la comunidad `publicia` solo permite leer (seguro); `privatilla` permite escribir (peligroso: alguien podría reiniciar o reconfigurar el equipo si la conoce). En producción, **solo `ro`**.
- **`location` y `contact`** alimentan las variables `sysLocation` y `sysContact` de la MIB: identifica el equipo físicamente y a su responsable.
- **`enable traps` + `host ... traps`**: activa las **notificaciones activas** (traps). En lugar de esperar a que el gestor pregunte, el agente avisa por su cuenta cuando ocurre algo (caída de interfaz, reinicio). Así el NMS se entera al instante.

El resultado se lee desde el gestor con herramientas como `snmpget` o directamente desde Zabbix, como montarás en el [punto 7](/ApuntesRedes/11-diagnostico-monitorizacion/07-herramientas-de-monitorizacion) y practicarás en el [boletín avanzado](/ApuntesRedes/boletines/boletin-u11-avanzado).

---

## 🧠 Mini-chequeo

1. ¿Qué significa que una comunidad sea `rw`? ¿Por qué es peligrosa?
2. ¿Para qué sirve el sufijo `.0` al final de una OID como `1.3.6.1.2.1.1.5.0`?
3. ¿Cómo mide un NMS la velocidad de una interfaz a partir de `ifInOctets`?

<details>
<summary>🔄 Respuestas</summary>

1. `rw` (read-write) permite **leer y escribir** variables: alguien con esa comunidad podría cambiar la configuración o reiniciar el equipo. Solo debe usarse en entornos controlados, y mejor no usarla.
2. El `.0` indica la **instancia de la variable**: para variables escalares como `sysName` la instancia única es siempre `.0`.
3. Leer `ifInOctets` **dos veces** separadas en el tiempo, restar ambos valores (octetos nuevos) y dividir entre los segundos transcurridos. Da octetos/segundo (bytes/s).
</details>

---

## ✅ Resumen en 3 frases

- SNMP permite a un **gestor (NMS)** interrogar a los **agentes** de los dispositivos a través de variables de la **MIB**, identificadas por **OIDs**.
- La seguridad depende de la versión: **v1/v2c** usan comunidad en texto claro; **v3** autentica (SHA) y cifra (AES).
- En Cisco se configura con `snmp-server community`, `location`, `contact` y `host ... traps` para recibir notificaciones.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| NMS | Gestor de red que consulta a los agentes |
| Agente | Software en el dispositivo que expone sus variables |
| MIB | Base de datos lógica de variables que el agente soporta |
| OID | Identificador numérico de una variable SNMP |
| Comunidad | "Contraseña" en texto claro de SNMP v1/v2c |
| Trap | Notificación activa enviada por el agente al gestor |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-diagnostico-monitorizacion) · **Anterior:** [03 · Wireshark y análisis TCP](/ApuntesRedes/11-diagnostico-monitorizacion/03-wireshark) · **Siguiente:** [05 · Syslog y logging](/ApuntesRedes/11-diagnostico-monitorizacion/05-syslog-y-logging)