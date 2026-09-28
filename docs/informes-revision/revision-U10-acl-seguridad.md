# Revisión — U10 ACLs y seguridad de red

> Fecha: 2026-09-28 · Sesión de la revisión vigente (12 unidades, numeración post-reorganización: esta sesión ya se numera U10)
> Los números de línea de los hallazgos son los del estado detectado (previo a las correcciones).

## 1. Auditoría automática

| Check | Resultado |
|---|---|
| `node scripts/check-unidad.mjs 10` | ✅ 0 fallos · 0 avisos (antes y después de los cambios) |
| `node scripts/check-uds.mjs` | ✅ `restos: 0` |
| `node scripts/check-links.mjs` | ✅ OK: todos los enlaces internos existen |
| `npm run check:diagrams` | ⚠️ 55 fallos / 19 diagramas = baseline sin tocar |
| `npx astro build` | ✅ 183 páginas |
| `npm run docx` | ✅ 68 generados, 0 fallos |

## 2. Hallazgos internos

Etiquetas: 🟡 corregir ya · 🔵 ampliar · ⚪ dejar · 🔴 mover/quitar (requiere decisión).

| # | Fichero:línea | Etiqueta | Hallazgo | Acción/estado |
|---|---|---|---|---|
| 1 | `01-enrutamiento-y-acls.md:2,8,102` | 🟡 | Numeración con relleno inconsistente dentro de la unidad: `title: 01 —`, migaja `→ 01 ·` y pie `Siguiente: [02 ·` frente al resto de puntos (02–05 van sin relleno) y a la unidad vecina de enrutamiento (puntos 1–5 sin relleno; solo los cierres van rellenos) | → `1 —`, `→ 1 ·`, `[2 ·`. El índice y sus tablas se quedan con relleno (patrón de la casa) |
| 2 | `02-acls-conceptos.md:65` | 🟡 | Frase garbleada: "La diferencia práctica importa para el byte en cuestión de eficiencia" | → "La diferencia práctica se resume en la eficiencia:" |
| 3 | `02-acls-conceptos.md:76` | 🟡 | CONRAD: "DOS ACLs por interfaz (una in + una out) un día te darán sorpresas" contradice la FAQ del cierre ("¿Puedo poner dos ACLs en la misma interfaz? — Sí, y es normal") | → texto reescrito: convivir in/out es normal; lo que hay que vigilar es que evalúan en sitios distintos de la cadena |
| 4 | `02-acls-conceptos.md:94` | 🟡 | Typo: "¿En qué se diferencian **paran** "inbound" y "outbound"…?" | → "¿Qué diferencia hay entre "inbound" y "outbound"…?" |
| 5 | `03-acl-estandar.md:16` | 🟡 | "En el punto 6 viste el mapa de los tipos" — el mapa/tipos está en el punto 2 (`02-acls-conceptos`) | → "En el punto 2…" |
| 6 | `03-acl-estandar.md:28` | 🟡 | "Pero hay **un trampa**" | → "una trampa" |
| 7 | `03-acl-estandar.md:39` | 🟡 | CONRAD: "La máscara normal es cosa de `ip route` (punto 3)" — ambiguo: dentro de esta unidad el punto 3 es este mismo fichero (el `ip route` vive en la unidad de enrutamiento estático) | → "cosa de `ip route`, en la unidad de enrutamiento estático" (sin número) |
| 8 | `04-acl-extendida-y-nombrada.md:28` | 🟡 | Resto de migración: "Y lee este ejemplo del archivo original" + incoherencia "el clásico web solo hacia Google DNS" (el ejemplo es HTTP a 8.8.8.8 + DNS a cualquier destino) | → "Un ejemplo clásico: solo web y DNS hacia donde tú digas." |
| 9 | `04-acl-extendida-y-nombrada.md:66` | 🟡 | Bala con autocrítica en caliente: "`173.194.0.0` sin wildcard más que la de host… espera: aquí sería…" | → frase limpia: `host` = una IP; rango completo de YouTube/Google = `173.194.0.0 0.0.255.255` |
| 10 | `04-acl-extendida-y-nombrada.md:103` | 🟡 | Nota "(los retornos UDP van por puertos efímeros…)" escrita como si fuera CLI dentro del bloque de configuración | → anotación con `→` (estilo de la casa, como en el bloque de `show`) |
| 11 | `04-acl-extendida-y-nombrada.md:122` | 🟡 | `show access-lists BLOQUEAR_YT`: no existe ninguna ACL con ese nombre en el punto (las definidas son `BLOQUEAR_YOUTUBE` y `BLOQUEAR_YT_LABORAL`) | → `BLOQUEAR_YT_LABORAL` |
| 12 | `05-port-security.md:52` | 🟡 | Tabla de parámetros: a `restrict` le falta "genera log y contadores" (inconsistente con la sol. 4 del cierre y con el boletín avanzado resuelto) | → añadido "genera log y contadores" |
| 13 | `06-cierre.md:22` ↔ `:24` | 🟡 | ⭐ Paso 2 solo cita la línea `deny`, pero el Paso 3 dice "la siguiente línea permite el resto" sin que exista; además, si el SSH muriera en la ACL nunca llegaría la capa VTY de la moraleja "dos capas" | → a la cita se le añade `access-list 120 permit tcp 192.168.99.0 0.0.0.255 any` (el SSH pasa la ACL y lo para el access-class) |
| 14 | `06-cierre.md:43` | 🟡 | Fireside: la frase final del Estándar ("Eso te hace consumir recursos del router en todo el camino") no se sigue de lo anterior (cerca del origen justamente ahorra viaje) | → reescrita como hipótesis: si te pusieran cerca del destino, el tráfico consumiría recursos en todo el camino para acabar descartado igual |
| 15 | `06-cierre.md:107,116` | 🟡 **mayor** | **Fallo B del laboratorio incoherente**: "invierte el orden: `permit ... eq ftp` después del deny tcp con wildcard `any eq 20`" mezcla wildcard de direcciones con puertos, `eq 20` no es un rango de puertos y FTP no es solo el 20 (20+21) | → fallo reescrito como regla general subida arriba (`permit ip 192.168.99.0 0.0.0.255 any` en primera línea) y pista 2 en espejo de la pista 1: A = todo bloqueado · B = todo pasa · C = interfaz errónea |
| 16 | `10-acl-seguridad.md:67-69` ↔ `06-cierre.md:226-228` | 🟡 | Tablas CE desalineadas (índice i) = "Puntos 1-3" vs cierre = "Puntos 2-3"; b) con textos distintos: "Gestión segura" vs "Acceso y gestión segura") y, sobre todo, **la fila `b)` no es el CE oficial**: en el temario unificado el RA4·b) era "Acceso a la configuración" (hoy en la unidad de enrutamiento estático); "Gestión segura del equipo" es un texto propio de esta unidad | → dos filas idénticas en índice y cierre: i) "Filtrado de tráfico (ACLs) — Puntos 1-4 + ⚡ Laboratorio (punto 6)" y j) "Listas de control de acceso — Puntos 2-4 + 🧠 Atrévete a pensar (punto 6)"; fila b) eliminada de ambos |
| 17 | `01-introduccion/10-mapa-del-curso.md:58` | 🟡 | "Si la tabla de las 12 etapas era el plano" — la tabla tiene 11 etapas (11 filas; la introducción es el vestíbulo). El "mapa de 12 paradas" de la línea 44 sí es correcto (diagrama con la introducción) | → "la tabla de las 11 etapas" |

Sin hallazgos 🔴 de movimiento/eliminación de contenido. La lectura de los seis puntos no encontró errores factuales adicionales (el ⭐, CONRAD, el Atrévete y los labs cuadran con la teoría).

## 3. Fronteras con otras unidades

| Concepto | Aparece en | Veredicto |
|---|---|---|
| NAT/PAT | ACL: solo el mapa de bienvenida (`10-acl-seguridad.md:8`, "NAT → 🛡️ AQUÍ ESTÁS") | ✅ puente de identidad, sin desarrollo → fila NAT lado ACL cerrada |
| ACL | NAT: `09-nat-pat/03-nat-estatico-y-dinamico.md:78` (la `access-list` del NAT + forward pointer "la verás a fondo en la unidad de seguridad"), `09-cierre` (PRÓXIMAMENTE) y el checklist del firewall | ✅ legítimo (la ACL de NAT es suya); el forward pointer existe → 🔵 opcional: hipervincular "la unidad de seguridad" (ver §5) |
| ACL | introducción (5), switching (3), trunking (22), enrutamiento estático (2), OSPF (7) | ✅ cerradas en las sesiones 01–07: Port Security solo como punta (sesión 04), VACL/puente (sesión 05), puentes forward y diagnóstico `show access-lists` (sesión 07) |
| ACL | servicios (2: "routing/ACL" en el diagnóstico de NTP), inalámbricas (6: "ACLs/firewall" como medida de seguridad WLAN, sin sintaxis), alta disponibilidad (2: HSRP/continuidad en troubleshooting) | ✅ menciones operativas sin desarrollar sintaxis → sin duplicado; se cierran en sus propias sesiones (06, 11 y 12) |
| DNS / ICMP / OSPF en la unidad | punto 4 (UDP/53 en ejemplos), Atrévete/laboratorio (ping y traceroute como herramientas) | ✅ usos operativos; la teoría vive en sus unidades |

**Sin candidatos a mover/quitar.**

## 4. Boletines de la unidad

Par inicial/avanzado (+resueltos), sin imágenes, soluciones en `<details>`, crucigramas correctos. Hallazgos:

| # | Fichero:línea | Etiqueta | Hallazgo | Acción/estado |
|---|---|---|---|---|
| 18 | `boletin-U10-avanzado.md:24` | 🟡 | Ex 2 sin dirección de aplicación ("aplica esta ACL en G0/0" sin in/out); las respuestas a), b) y c) solo cuadran con `in` | → enunciado con "sentido **in** (hacia el router)" |
| 19 | `boletin-U10-avanzado.md:44-47` + `boletin-U10-avanzado-resuelto.md:50-56` | 🟡 **mayor** | **Ex 3 roto en la solución**: `FIREWALL_RETORNO` solo permite TCP `established`, así que las respuestas DNS (UDP) mueren en el `deny ip any any` — la consulta sale y la respuesta no vuelve, aunque el enunciado pedía permitir DNS saliente | → regla 5 nueva en el enunciado ("respuestas DNS entrantes, UDP con puerto de origen 53"), línea `permit udp any eq 53 192.168.1.0 0.0.0.255 any` en la solución y nota que explica por qué `established` no basta |
| 20 | `boletin-U10-avanzado.md:78` + `boletin-U10-avanzado-resuelto.md:85-93` | 🟡 | Ex 6: el enunciado no decía que el ping debía seguir funcionando (y la respuesta lo daba por hecho), y la solución proponía editar la numerada con `ip access-list extended 110` + `no 20`, contradiciendo la propia pista ("en una ACL numerada no puedes reordenar") y al CONRAD del cierre | → enunciado aclara "sin cortar el ping de diagnóstico"; solución canónica = `no access-list 110` y reescribir en orden, con la alternativa ACL nombrada con secuencias como recorrido a futuro |
| 21 | `boletin-U10-avanzado.md:102` | 🟡 menor | Ex 8: el enunciado no nombraba el puerto y la solución recupera `fa0/1` | → enunciado pasa a nombrar "el puerto Fa0/1" |
| 22 | `boletin-U10-inicial-resuelto.md:55` | 🟡 | Ex 7a: el paréntesis "(Otra opción correcta: … sentido in)" contradice la regla que el propio ejercicio acaba de enunciar (estándar cerca del destino) y la frase que viene detrás | → paréntesis eliminado; respuesta canónica única (`out` en la interfaz hacia el destino) |
| 23 | títulos de los 4 boletines | ⚪ | "Boletín de ACL y seguridad" usa nombre corto en vez del título completo | → sin cambios: coincide exactamente con la etapa 9 del mapa ("ACL y seguridad"), mismo criterio aceptado que "Boletín de OSPF"; separador em-dash (U+2014) coherente con la casa |
| 24 | `boletin-U10-inicial.md:78-80` | ⚪ | La tabla "Comandos de verificación" cruza 1→b y 2→a | → correcto a propósito: es un "relaciona" y la solución 1→b, 2→a, 3→c es la esperada |
| 25 | `06-cierre.md:200` | ⚪ | FAQ "las ACLs de interfaz no filtran el tráfico generado por el propio router (las de salida no lo ven)" | → verificado con la documentación de Cisco ("an access list can control traffic arriving at a device or leaving a device, but not traffic originating at a device") → correcta, se deja |

## 5. Decisiones pendientes del profe 🔴

- [x] **CE `b)` eliminado de las tablas** (hallazgo 16) — ✅ **aprobado: se mantiene la eliminación** (índice y cierre con solo i) y j), idénticos). No se inventa una fila de seguridad propia sin letra oficial (era la única alternativa y quedaba vetable).
- [x] **Fallo B del laboratorio reescrito** (hallazgo 15) — ✅ **aprobado: se mantiene el fallo actual** (regla general `permit ip … any` subida a la primera línea, con la pista 2 en espejo de la pista 1: A = todo bloqueado · B = todo pasa · C = interfaz errónea). La alternativa ("deny de FTP mal colocado") quedaba más floja técnicamente.
- [x] (🔵) **Hipervincular el forward pointer de NAT** — ✅ **aplicado en la pasada de decisiones:** `03-nat-estatico-y-dinamico.md:78` enlaza ahora a `/ApuntesRedes/10-acl-seguridad`.

## 6. Verificación y commit

- [x] `check:unidad 10` sin FALLOs · `check-uds` en 0 · `check-links` OK · `check:diagrams` 54 (nuevo baseline; era 55) · build 183 — re-verificado tras la pasada de decisiones (enlace NAT→ACL aplicado)
- [x] DOCX regenerado (`npm run docx`, 68/68)
- [x] Comprobación lingüística es-ES
- [x] Matriz de solapamientos + README de estado actualizados (ACL = ✅ revisada; nota de renumeración ampliada: las revisiones nuevas ya usan la numeración vigente)
- [x] Commit `Revisión U10: …` (sesión original) · decisiones menores cerradas en la pasada posterior (commit de la pasada de decisiones)
