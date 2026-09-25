---
title: 08 — Plan de continuidad
description: Cuando el diseño no basta, el procedimiento salva 📋
---

<p><small>Cuando el diseño no basta, el procedimiento salva 📋</small></p>

> 🗺️ **Estás en:** 🔁 **Alta disponibilidad y redundancia** → 08 · Plan de continuidad

---

## 📬 La idea en una frase

> Toda la redundancia técnica puede quedarse corta ante un incendio, un ransomware o un traslado urgente: el **plan de continuidad** es la capa humana de la alta disponibilidad —copias de configuración, procedimientos escritos, servicios duplicados y sustitutos preparados— para que el MTTR no dependa de la memoria de una persona.

---

## 🗺️ El mapa de continuidad en 4 capas

| Capa | Pregunta | Herramientas |
|---|---|---|
| **Prevenir** | ¿Qué SPOFs puedo eliminar con diseño? | Todo lo de los puntos 2-7 (STP, EtherChannel, stack, HSRP, rutas) |
| **Sobrevivir** | Cuando algo muere, ¿continúa el servicio solo? | Failover automático, alimentación redundante (SAI), segunda línea |
| **Restaurar** | Si hay que rehacer algo, ¿cuánto tarda y quién sabe cómo? | Backups de configuración, imágenes de equipos, procedimientos |
| **Aprender** | ¿El incidente dejó documentación y ajustes? | Post-mortem, actualización del mapa y del plan |

La HA real no termina en el hardware: una red con HSRP perfecto y **sin copia de las configuraciones** es un castillo con puerta blindada y sin llave.

---

## 💾 Backups de configuración: la primera hora de la vida de un equipo

Cada equipo de red debe tener su configuración respaldada **cada vez que se cambia algo** (y periódicamente aunque no):

| Método | Cómo | Cuándo usarlo |
|---|---|---|
| Local (`copy run start`) | Guarda en NVRAM | Siempre, mínimo vital |
| Copia a TFTP/SCP | `copy running-config tftp:` | Antes y después de cada cambio |
| Programado | `archive` + kron/eem en IOS | Redes medianas y grandes |
| Git interno | Repositorio con las configs | La forma moderna: histórico y diff |

```
Router# copy running-config tftp:
Address or name of remote host []? 192.168.1.200
Destination filename [router-confg]? r1-config-2026-09-18
```

> 💡 **La regla del cambio:** ninguna modificación en producción sin (1) copia previa de la config, (2) ventana y plan de vuelta atrás, (3) verificación posterior. El "respaldo antes de tocar" es la diferencia entre un incidente y una anécdota.

---

## 📄 Documentación: el mapa que te salvará

El mínimo profesional que toda red debe tener:

1. **Mapa físico** (dónde está cada caja, cada cable, cada toma) y **mapa lógico** (VLANs, subredes, IPs de gestión, rutas principales).
2. **Inventario** con modelo, versión de IOS, garantía y contraseña de consola (en un gestor, no en un post-it).
3. **Procedimientos** escritos: alta de un usuario/VLAN, sustitución del switch de acceso, restauración de configuración, plan de vuelta atrás de cambios.
4. **Contactos y responsables**: quién avisa a qué ISP, con qué número de cliente y qué SLA firmado.
5. **El plan de desastre en una página**: qué se restaura primero (gateway y core), cómo (equipo de sustitución con config cargada por TFTP), y quién decide.

> ⚠️ **El test de la taquilla:** coge a tu mejor técnico, sácalo de la ecuación (vacaciones, baja, despido) y pregúntate: ¿alguien más puede restaurar el servicio solo con lo que está escrito? Si la respuesta es no, tu peor SPOF tiene nombre y apellidos.

---

## 🏗️ Servicios duplicados: lo que aprendiste antes, aplicado

El plan de continuidad reutiliza todo el curso:

- **DHCP:** dos servidores con rangos divididos (o failover coordinado). Recuerda: lease largo = red sobrevive a la caída del servidor durante horas.
- **DNS:** secundarios/zonas replicadas; el primario cae y los clientes siguen resolviendo.
- **NTP:** varias fuentes (ya lo montaste).
- **Ruteo:** OSPF interno + salida doble al borde (punto 7).
- **Perímetro:** dos líneas, dos firewalls si el negocio lo exige.

La idea transversal: **todo servicio crítico tiene un plan B identificado, probado y documentado**. Y ojo: "probado" significa ensayado, no teórico. Un failover que nunca se ha probado es una hipótesis.

---

## 🧯 El simulacro: probar el plan antes de necesitarlo

La única forma de saber si tu HA funciona es **romperla a propósito** (en ventana de mantenimiento):

1. Avisa a los usuarios (o hazlo de madrugada).
2. Tira el enlace principal / apaga al activo de HSRP / desconecta el switch master del stack.
3. Cronometra: ¿cuántos segundos/pings se pierden? ¿Quién se entera y por qué medio?
4. Restaura: ¿vuelve todo al estado correcto (preempt, rutas, ACLs)?
5. Documenta tiempos y ajustes: eso es tu MTTR real medido, no el teórico.

Un simulacro anual por SPOF importante convierte el plan en confianza. Y cada incidente real debe acabar en post-mortem: qué falló, cuánto tardó, qué se cambia para la próxima.

---

## 🤬 CONRAD VS EL MUNDO: "La configuración está en el propio equipo, para qué copiarla"

**Administrador:** — La config está guardada en la NVRAM del switch. ¿Por qué la voy a copiar a ningún sitio?

**CONRAD:** — ¿Y si el switch se muere del todo (fuente, flash, o se lo lleva el fontanero con el rack)? ¿Reescribir 400 líneas de memoria? ¿Con qué certeza de que queda igual? ¿Y la config de los otros 20 equipos?

**CONRAD:** — Copia antes de cada cambio, guarda con fecha, y tienes tres regalos: vuelta atrás en minutos, un sustituto listo en 10 minutos (`copy tftp: start`) y un histórico que te dice quién tocó qué. Pero claro, eso requiere disciplina, y tú ya me estás mirando con cara de "algún día".

**La lección:** el backup de configuración es la HA más barata del universo: cero hardware, cinco segundos por copia, y convierte el desastre en una restauración rutinaria. Si no está automatizado, al menos que sea ritual.

---

## 🧠 Mini-chequeo

1. Enumera las 4 capas del plan de continuidad y pon un ejemplo de cada.
2. ¿Qué debe contener como mínimo la documentación de una red?
3. ¿Por qué un failover "teórico" no vale? ¿Cómo se convierte en real?
4. ¿Qué es el "test de la taquilla" y qué SPOF desenmascara?

<details>
<summary>🔄 Respuestas</summary>

1. **Prevenir** (diseño sin SPOFs: HSRP, EtherChannel…), **sobrevivir** (failover automático, SAI), **restaurar** (backups de config, procedimientos, sustitutos preparados) y **aprender** (post-mortem y actualización del plan).
2. Mapas físico y lógico, inventario con versiones, procedimientos escritos (alta, sustitución, restauración), contactos/SLAs de proveedores y plan de desastre de una página.
3. Porque puede fallar por detalles que solo aparecen al ejecutarse (tiempos, dependencias, quemados de config). Se convierte en real **simulándolo en ventana de mantenimiento**, cronometrando y documentando el resultado.
4. Simular la ausencia de tu técnico clave y preguntar si otro puede restaurar el servicio solo con lo escrito. Desenmascara el SPOF humano: el conocimiento que solo vive en una cabeza.
</details>

---

## ✅ Resumen en 3 frases

- La continuidad tiene 4 capas: **prevenir, sobrevivir, restaurar y aprender**; la técnica solo cubre las dos primeras.
- El backup de configuración (antes/después de cada cambio) es la HA más barata y más olvidada.
- Un plan sin **simulacro** es una hipótesis; mide tu MTTR real y documenta el post-mortem.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Continuidad | Capacidad de seguir operando durante y tras un fallo |
| Post-mortem | Análisis documentado tras un incidente |
| Ventana de mantenimiento | Franja acordada para cambios y simulacros |
| Vuelta atrás (rollback) | Plan para deshacer un cambio |
| TFTP/SCP | Transporte clásico de configs e imágenes |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-alta-disponibilidad) · **Anterior:** [07 · Redundancia en capa 3](/ApuntesRedes/12-alta-disponibilidad/07-redundancia-l3) · **Siguiente:** [09 · Cierre](/ApuntesRedes/12-alta-disponibilidad/09-cierre)
