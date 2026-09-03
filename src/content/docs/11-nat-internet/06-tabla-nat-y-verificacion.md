---
title: 06 — Tabla NAT y verificación
description: Leer la tabla NAT y saber si NAT trabaja 🔍
---

<p><small>Leer la tabla NAT y saber si NAT trabaja 🔍</small></p>

> 🗺️ **Estás en:** 🌐 U11 → 06 · Tabla NAT y verificación

---

## 📬 La idea en una frase

> La **tabla NAT** es la memoria del router: registra cada traducción activa para poder deshacerla cuando llega la respuesta. Leerla y verificarla es la habilidad que separa al que "configura NAT" del que "sabe que NAT funciona".

Configurar PAT (punto 4) y abrir puertos (punto 5) es solo la mitad del trabajo. La otra mitad es **verificar**: mirar la tabla, comprobar estadísticas, borrar traducciones y saber interpretar lo que ves. Aquí tienes todas las herramientas de Cisco para ello.

---

## 🧾 Los 4 campos de la tabla

Cuando un PC (192.168.1.10:54321) accede a Google (8.8.8.8:80), la tabla NAT muestra:

```
Pro Inside global      Inside local       Outside local      Outside global
tcp 83.45.12.78:60001  192.168.1.10:54321  8.8.8.8:80         8.8.8.8:80
```

| Campo | Qué es |
|---|---|
| **Inside local** | La IP real del PC en la LAN (tal como la ve tu red) |
| **Inside global** | La IP pública traducida (tal como la ve Internet) |
| **Outside local** | El destino tal como lo ve el PC (normalmente igual al global) |
| **Outside global** | El destino real en Internet (8.8.8.8) |

> 💡 **Regla de oro:** los campos "local" son la vista **dentro de tu red**; los "global" son la vista **en Internet**. En NAT de origen solo cambia la columna *Inside*; el destino exterior (Outside) casi siempre es el mismo en ambos.

### Ejemplo con dos PCs a la vez

```
Pro Inside global      Inside local       Outside local      Outside global
tcp 83.45.12.78:60001  192.168.1.10:54321  8.8.8.8:53         8.8.8.8:53
tcp 83.45.12.78:60002  192.168.1.20:54321  8.8.8.8:53         8.8.8.8:53
```

Ambos PCs usan el puerto origen 54321 y van al mismo destino. ¿Cómo sabe el router quién es quién? Por el **Inside global**: el `60001` pertenece a 192.168.1.10 y el `60002` a 192.168.1.20. Es el mismo mecanismo que viste en PAT: el puerto global desambigua conexiones idénticas.

---

## 🖥️ Comandos de verificación en Cisco

```bash
R1# show ip nat translations          → Tabla NAT activa
R1# show ip nat statistics            → Estadísticas NAT
R1# clear ip nat translation *        → Borrar todas las traducciones
R1# debug ip nat                     → Ver traducciones en tiempo real
```

| Comando | Para qué |
|---|---|
| `show ip nat translations` | Ver las entradas activas (la tabla completa) |
| `show ip nat statistics` | Contadores: cuántas traducciones se han creado, hits, misses… |
| `clear ip nat translation *` | Vaciar la tabla (fuerza a empezar de cero, útil al depurar) |
| `debug ip nat` | Mostrar en vivo cada traducción que ocurre (con cuidado: satura la consola) |

Ejemplo de salida de `show ip nat statistics`:

```
Total active translations: 3 (0 static, 3 dynamic; 3 extended)
Hits: 1024  Misses: 5
```

- **Hits:** paquetes que encontraron su traducción en la tabla (bien).
- **Misses:** paquetes que no tenían entrada y obligaron a crearla (normal en tráfico nuevo).

---

## ⏱️ Timeouts: cuánto vive una entrada

Las entradas dinámicas (PAT, pool) no viven para siempre: tienen **timeout**. Es lo que evita que la tabla se llene con conexiones fantasma:

| Protocolo | Timeout típico |
|---|---|
| **UDP** | ~24 horas (aunque las implementaciones lo acortan) |
| **TCP** | Variable según el estado de la conexión (menos si se cierra limpiamente) |
| **ICMP** | Corto (segundos/minutos) |

Cuando una entrada expira, se borra y su puerto global queda libre para otra conexión. Si la tabla se llena, los nuevos paquetes **se descartan** hasta que expiran entradas antiguas. De ahí que "NAT saturado" sea un diagnóstico real en redes con mucho P2P o muchas conexiones cortas.

---

## 🔍 Cómo verificar que NAT funciona

Orden mental para confirmar que tu NAT está vivo:

```
1. Genera tráfico: haz ping o abre una web desde un PC interno.
2. R1# show ip nat translations   → debe aparecer una entrada nueva.
3. R1# show ip nat statistics     → Hits aumentando, sin Misses raros.
4. Desde un PC, ping a la IP pública del router: si responde, hay camino.
5. R1# debug ip nat              → ves la traducción ocurrir en directo.
```

> ⚠️ **Síntoma clásico:** la tabla NAT vacía a pesar del tráfico. Suele significar que falta `ip nat inside` / `ip nat outside` en las interfaces, o que la access-list no coincide con la red. Es el fallo que protagoniza el [⚡ Laboratorio de tortura del cierre](/ApuntesRedes/11-nat-internet/09-cierre) y el boletín avanzado.

---

## 🧠 Mini-chequeo

1. Explica qué significan *Inside local* e *Inside global* con un ejemplo.
2. ¿Qué comando borra todas las traducciones activas? ¿Cuándo lo usarías?
3. ¿Qué pasa cuando la tabla NAT se llena?

<details>
<summary>🔄 Respuestas</summary>

1. **Inside local** es la IP real del equipo interno (192.168.1.10) y **Inside global** la IP pública traducida (83.45.12.78): la misma conexión vista desde la LAN y desde Internet.
2. `clear ip nat translation *`. Lo usarías al depurar, para resetear el estado y empezar traducciones limpias.
3. Los nuevos paquetes **se descartan** hasta que expiran entradas antiguas (timeouts de UDP ~24h, TCP variable), porque no hay hueco en la tabla.
</details>

---

## ✅ Resumen en 3 frases

- La tabla NAT tiene 4 campos: *Inside local*, *Inside global*, *Outside local* y *Outside global* — la misma conexión vista desde dentro y desde fuera.
- Verificar NAT es `show ip nat translations` + `show ip nat statistics` (+ `debug ip nat` cuando toca).
- Las entradas caducan por timeout (UDP ~24h) y, si la tabla se llena, el tráfico nuevo se descarta.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Inside local | IP del equipo interno vista desde la LAN |
| Inside global | IP pública traducida vista desde Internet |
| Outside local/global | Destino visto desde dentro / desde fuera |
| Timeout NAT | Tiempo de vida de una entrada dinámica |
| clear ip nat translation * | Vaciar la tabla NAT |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-nat-internet) · **Anterior:** [05 · NAT destino (port forwarding)](/ApuntesRedes/11-nat-internet/05-nat-destino) · **Siguiente:** [07 · Problemas y soluciones](/ApuntesRedes/11-nat-internet/07-problemas-y-soluciones)