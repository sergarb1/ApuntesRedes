---
title: 05 — Registros y zonas DNS
description: El directorio de tu dominio, fila a fila 📝
---

<p><small>El directorio de tu dominio, fila a fila 📝</small></p>

> 🗺️ **Estás en:** 🗄️ **UD10 · Servicios de red: DHCP, DNS y NTP** → 05 · Registros y zonas DNS

---

## 📬 La idea en una frase

> Si DNS es la guía telefónica de Internet, una **zona** es tu página del directorio y los **registros** son las líneas que escribes en ella: cada línea tiene un tipo, un nombre, un valor y un TTL, y escribirlas bien es la diferencia entre "todo funciona" y "¿por qué el correo no sale?".

---

## 🏗️ Anatomía de una zona

Una zona DNS es el bloque de autoridad que administras: para `empresa.local`, todos los nombres que cuelgan de ese dominio. En su interior conviven:

```
empresa.local  → SOA + NS (los metadatos y los servidores que mandan)
  ├─ www       → A     192.168.1.10
  ├─ web       → CNAME www
  ├─ mail      → A     192.168.1.20
  ├─ @         → MX 10 mail.empresa.local
  ├─ ftp       → A     192.168.1.30
  └─ impresoras→ A     192.168.1.40
```

La `@` significa "el propio dominio, sin host delante". El **SOA** (Start of Authority) es la primera fila obligatoria: declara el administrador, el número de serie de la zona y los temporizadores de replicación y caché. Cada vez que editas la zona, **sube el serial** (o lo hace el software solo): si no, los secundarios no se enteran de que hay cambios.

---

## ✍️ Cómo se crea y se replica una zona

| Concepto | Qué es | Detalle práctico |
|---|---|---|
| Zona primaria | Donde se edita | El servidor con la copia de lectura/escritura |
| Zona secundaria | Copia de solo lectura | Recibe las transferencias de zona del primario |
| Transferencia AXFR/IXFR | Replicación | AXFR completa, IXFR solo los cambios incrementales |
| Delegación | Subdominio a otro servidor | `sucursales.empresa.local` gestionado por otra máquina |

La replicación primario → secundarios da **tolerancia a fallos y reparto de carga**: si el primario se cae, los secundarios siguen respondiendo. No confundas secundario con "esclavo antiguo": es un peer con copia de solo lectura que los clientes consultan igual.

> ⚠️ **CONRAD dice:** "Transferencias de zona abiertas a cualquiera: el mejor regalo que puedes hacer a un atacante, que se lleva el mapa completo de tu red con nombres, IPs y servicios. Limita las AXFR a los secundarios declarados. Gracias por venir."

---

## 🏠 DNS en la empresa: reenviadores y privacidad

Un DNS interno casi nunca habla directamente con la raíz: se configura con **reenviadores condicionales** o globales:

- **Reenviador global:** "todo lo que no conozca, mándaselo a 8.8.8.8". Sencillo, pero filtros de contenido y caché corporativa dejan de funcionar.
- **Reenviador condicional:** "las consultas de `partner.com` mándaselas a 10.20.30.40". Imprescindible cuando te fusionas con otra empresa o usas dominios de socio.

En Packet Tracer, el servidor DNS integrado (pestaña Services → DNS) permite montar una zona pequeña con registros A, CNAME y hacer pruebas de resolución extremo a extremo con PCs. Es el laboratorio ideal para "romper" registros y ver el efecto.

---

## 🧠 Mini-chequeo

1. ¿Qué contiene el registro SOA y por qué el número de serie es crítico?
2. ¿Diferencia entre zona primaria y secundaria? ¿Y entre AXFR e IXFR?
3. Tu empresa colabora con un socio que tiene su propio DNS interno. ¿Qué configuras para que los usuarios resuelvan los nombres del socio sin exponer tu zona?
4. ¿Por qué es un riesgo de seguridad una transferencia de zona abierta?

<details>
<summary>🔄 Respuestas</summary>

1. El SOA declara el **administrador**, el **serial** de la zona y los timers (refresh, retry, expire, mínimo TTL). El serial es crítico porque los servidores secundarios lo comparan para saber si hay cambios que transferir; si no sube, no se replica nada.
2. **Primaria:** copia editable. **Secundaria:** copia de solo lectura alimentada por transferencias. **AXFR** transfiere la zona completa; **IXFR** solo los cambios incrementales desde la última versión.
3. Un **reenviador condicional** hacia los servidores DNS del socio para su dominio, sin dar acceso a tu zona ni replicarla.
4. Porque devuelve el **mapa completo** de tu infraestructura: nombres de servidores, IPs internas, servicios. Es información de reconocimiento para un atacante.
</details>

---

## ✅ Resumen en 3 frases

- Una zona es tu bloque de autoridad: **SOA + NS** mandan y el resto son registros de servicio (A, CNAME, MX…).
- Los **secundarios** replican por AXFR/IXFR y dan redundancia; el **serial** del SOA decide si hay transferencia.
- Los **reenviadores** (globales o condicionales) conectan tu DNS interno con el resto del mundo sin exponer tu zona.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| SOA | Registro inicial de la zona: admin, serial y timers |
| Serial | Número de versión de la zona; sube con cada cambio |
| Zona secundaria | Réplica de solo lectura de una zona |
| AXFR / IXFR | Transferencia completa / incremental de zona |
| Reenviador condicional | DNS que manda ciertos dominios a servidores concretos |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-servicios-red) · **Anterior:** [04 · DNS: la guía telefónica de Internet](/ApuntesRedes/10-servicios-red/04-dns) · **Siguiente:** [06 · NTP: la hora es sagrada](/ApuntesRedes/10-servicios-red/06-ntp)
