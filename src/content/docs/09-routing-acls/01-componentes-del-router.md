---
title: 01 — Componentes del router
description: Qué hay dentro de un router y cómo enciende por la mañana 💾
---

<p><small>Qué hay dentro de un router y cómo enciende por la mañana 💾</small></p>

> 🗺️ **Estás en:** 🧭 **U09 · Routing y ACLs** → 01 · Componentes del router

---

## 📬 La idea en una frase

> Un router es un **ordenador especializado en reenviar paquetes**: tiene CPU, memoria y sistema operativo (IOS), pero sus tripas están organizadas para no perder ni un segundo decidiendo por dónde manda cada paquete.

A simple vista es una caja con LEDs parpadeantes. Por dentro es un mini-PC con una misión: **leer la dirección IP destino de cada paquete, consultar su tabla de rutas y reenviarlo** por la interfaz correcta. En la U08 tu switch aprendía MACs; el router, en cambio, trabaja en capa 3.

Para administrarlo tendrás que saber qué memoria guarda qué, y qué pasa cuando conectas la corriente. Eso es exactamente lo que hace el router durante sus primeros segundos de vida.

---

## 🧠 El cerebro, la memoria y el almacén

Un router se compone de piezas que guardan cosas distintas. Confundirlas es el error clásico del que no distingue una configuración en ejecución de una copia de seguridad:

| Componente | Tipo | Descripción |
|---|---|---|
| **CPU** | Procesador | Ejecuta el IOS, procesa paquetes (en routers modernos, el routing se hace en hardware/ASIC) |
| **RAM** | Volátil | Almacena la tabla de rutas, la tabla ARP, la configuración en ejecución (running-config) y los buffers de paquetes |
| **NVRAM** | No volátil | Almacena la configuración de arranque (startup-config) |
| **Flash** | No volátil | Almacena el IOS (el sistema operativo) y, a menudo, copias de seguridad de la configuración |
| **ROM** | Solo lectura | Contiene el monitor ROM (ROMMON) para recuperación de emergencias |
| **Interfaces** | E/S | Puertos físicos (GigabitEthernet, Serial, FastEthernet) por donde entra y sale el tráfico |

La regla de oro que debes grabarte:

> ⚠️ **El truco para no fallarla en el examen:** si apagas el router y se pierde, estaba en **RAM** (las tablas y la running-config). Si sobrevive al apagado, estaba en **NVRAM** (startup-config) o **Flash** (IOS). RAM es "la mesa de trabajo"; Flash y NVRAM son "el armario".

---

## ⚡ Secuencia de arranque (y por qué importa)

Cuando le das corriente a un router, ocurre esto en un abrir y cerrar de ojos:

1. **POST** (*Power-On Self Test*): verifica el hardware básico. Si algo está mal, se queda en silencio o muestra un error en consola.
2. **Boot ROM**: carga el monitor ROM (**ROMMON**), el "modo de emergencia" del router. Normalmente ni lo verás, pero existe para recuperaciones.
3. **Carga del IOS**: busca el sistema operativo en **Flash**. Si no lo encuentra, intenta cargarlo por **TFTP** desde un servidor.
4. **Carga de configuración**: busca el **startup-config** en **NVRAM**. Si no hay, entra en **setup mode** (asistente interactivo) o arranca con configuración vacía.

¿Por qué te cuento esto? Porque el día que un router "se queda colgado" en un banner flash rojo sin arrancar el IOS, necesitarás saber que tu Flash está dañado o el registro de boot está mal, y que ROMMON es tu única salida. Y en las entrevistas, esta secuencia sale más de lo que crees.

```
Secuencia de arranque
1. POST            → verifica hardware
2. Boot ROM        → carga ROMMON (modo emergencia)
3. IOS             → se carga desde Flash (o TFTP)
4. startup-config  → se carga desde NVRAM (o setup mode)
```

---

## 🖥️ Los tres shows que te salvan la vida

Una vez arrancado, tienes tres comandos que son el "¿y tú quién eres?" del router:

```bash
Router# show version          → IOS, uptime, memorias, series del equipo
Router# show running-config   → configuración actual activa (la de RAM)
Router# show startup-config   → configuración guardada (la de NVRAM)
```

| Comando | Respuesta que te da |
|---|---|
| `show version` | Versión y nombre del IOS, cuánto lleva encendido (uptime), RAM y Flash |
| `show running-config` | **Toda** la configuración que el router está aplicando ahora mismo en RAM |
| `show startup-config` | La configuración que se cargará en el **próximo arranque** (la que guardaste) |

La diferencia importante: si cambias algo y no haces `copy running-config startup-config` (o `write memory`), **el cambio se pierde al reiniciar**. La running-config es la mesa de trabajo; la startup-config, el armario.

---

## 🧠 Mini-chequeo

1. ¿En qué memoria vive la tabla de rutas? ¿Se pierde al apagar el router?
2. Ordena la secuencia de arranque: carga del IOS, POST, carga de la startup-config, boot ROM.
3. Acabas de cambiar el hostname. ¿Qué comando evita que se te olvide al apagar?

<details>
<summary>🔄 Respuestas</summary>

1. La tabla de rutas vive en **RAM**, así que es **volátil**: se pierde al apagar. Por eso necesita volver a llenarse (rutas estáticas al cargar la configuración, o rutas dinámicas al arrancar los protocolos de routing).
2. **POST → Boot ROM → carga del IOS → carga de la startup-config**.
3. `copy running-config startup-config` (o `write memory` / `wr`). Sin eso, al reiniciar tu cambio habrá desaparecido.
</details>

---

## ✅ Resumen en 3 frases

- El router es un mini-ordenador: **CPU + RAM + NVRAM + Flash + ROM + interfaces**.
- **RAM = volátil** (tablas y running-config), **NVRAM = startup-config**, **Flash = IOS**, **ROM = ROMMON**.
- El arranque sigue siempre el mismo orden (POST → ROM → IOS → config) y `show running-config`/`startup-config` te cuentan qué hay en cada memoria.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Running-config | Configuración activa en RAM, se pierde al apagar |
| Startup-config | Configuración guardada en NVRAM, se carga al arrancar |
| IOS | Sistema operativo del router, vive en Flash |
| ROMMON | Monitor de emergencia en ROM para recuperaciones |
| POST | Auto-test de hardware al encender |
| Uptime | Tiempo que lleva el router encendido (lo muestra `show version`) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/09-routing-acls) · **Anterior:** [Índice de la unidad](/ApuntesRedes/09-routing-acls) · **Siguiente:** [02 · Configuración básica](/ApuntesRedes/09-routing-acls/02-configuracion-basica)