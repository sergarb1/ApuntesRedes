# HANDSOFF.md — Traspaso entre sesiones

Documento de continuidad del proyecto **Apuntes PAR**. Sustituye al antiguo
`planaseguir.txt`: al retomar el trabajo, leer esto primero y actualizarlo al
cerrar la sesión. Las convenciones permanentes (estructura de las unidades,
estilo, idioma es-ES, reglas de diagramas) viven en `AGENTS.md`; aquí solo va
el estado del trabajo.

- **Último estado:** revisión de diagramas UD01–UD13 completada; repaso
  estético de los tres diagramas de la unidad de enrutamiento estático.
- **Autoría:** solo Sergi Garcia Barea. Sin otros contribuidores y sin
  atribución a Codebuff/Freebuff en commits ni documentación (ver `AGENTS.md`).

## Qué se estaba haciendo

Revisar las **imágenes (diagramas Excalidraw)** de cada unidad siguiendo el
protocolo de `AGENTS.md` § «Revisión de diagramas de una unidad (checklist
reutilizable)»: inventario → huérfanos → duplicados ASCII → crear diagramas
solo donde aporten → verificar → actualizar la tabla de `AGENTS.md` → commit
solo con confirmación explícita.

## Hecho

- **UD01–UD04:** revisadas y con sus diagramas insertados.
- **UD05/06/07:** 5 diagramas nuevos (`u06-trunk-8021q`,
  `u06-router-on-a-stick`, `u07-dns-jerarquia`, `u07-ntp-strata`,
  `u07-escalera-servicio`), reutilización de `u04-dora` y 6 bloques ASCII
  sustituidos.
- **UD08:** `u08-secuencia-arranque`, `u08-topologia-r1-r2` y
  `u08-decision-router` creados y ASCII sustituido en los puntos 01, 03 y 05.
  **Repaso estético posterior:** routers dibujados como círculos, etiqueta del
  enlace WAN en una pastilla separada de la flecha, etiquetas `sí`/`no` fuera
  de las flechas, texto teal oscurecido a `#0f766e` para que se lea y flechas
  con punta limpia.
- **UD09–UD13:** 18 diagramas nuevos (`u09` ×5, `u10` ×3, `u11` ×2, `u12` ×4,
  `u13` ×4) y sus sustituciones de ASCII.
- **UD07–13, tanda extra:** `u07-dependencias`, `u07-lease-timeline`,
  `u07-dhcp-relay`, `u12-antenas-patron`, `u13-stp-failover`; `06-hsrp-cisco`
  reutiliza `u13-fhrp`.

## Pendiente (candidatos ya identificados)

No son urgentes: decidir caso a caso antes de crear nada.

1. UD03 `03-capa-de-enlace/03-trama-ethernet.md` — quitar el ASCII que replica
   literalmente `u03-trama-ethernet`.
2. `u04-anatomia-ip` → `04-direccionamiento-ip/01-estructura-ipv4.md`
   (32 bits = 4 octetos; no confundir con `u04-cabecera-ipv4`).
3. `u04-anycast` → `04-direccionamiento-ip/09-tipos-de-direcciones.md`.
4. `u06-trama-8021q` → `06-trunking-inter-vlan/01-trunks-y-8021q.md`
   (TPID 0x8100, PRI 3 bits, VLAN ID 12 bits).
5. `u05-router-broadcast` → `05-switching/03-dominios-colision-broadcast.md`.
6. `u05-bpduguard` → `05-switching/07-rstp-y-portfast.md`.
7. Coherencia en `07-servicios-red/01-por-que-servicios.md`: la cadena del
   diagrama es horizontal, así que el texto debe hablar del «primer eslabón
   (DHCP)» y no de «abajo/encima».

Se descartó convertir a diagrama: pesos de bit (04/02), sumarización (04/03),
conteos de examen (05/03), cabeceras de laboratorio (06/02, 09/04), relay de
06/07 (las IP chocarían con `u07-dhcp-relay`), 10/03, 10/08 y 12/08.

## Workflow de los diagramas

El MCP `mcp-excalidraw-server` necesita la pestaña del lienzo abierta
(`http://127.0.0.1:3000`, o `EXPRESS_SERVER_URL` si se usa otro puerto). Si no
está disponible, se puede regenerar el par `.excalidraw` + `.svg` con un script
de Node que emita la misma geometría y reutilice el bloque `<defs>` con la
fuente Cascadia incrustada de otro SVG del proyecto; **nunca** usar
`import-scene` para reimportar (degrada el SVG).

Pasos por diagrama:

1. JSON de elementos → `npx -y mcp-excalidraw-server add fichero.json`
   (o un script que escriba el `.excalidraw` y el SVG a la vez).
2. `describe` + `screenshot` → revisar el PNG y corregir solapes y textos
   truncados.
3. Exportar `.excalidraw` y el `.svg` en `public/diagrams/`.
4. `clear --yes` antes del siguiente diagrama; no paralelizar
   clear/import/export.
5. `node scripts/fix-fonts.mjs && node scripts/fix-text-align.mjs` (si tocan el
   `.excalidraw`, rehacer el SVG).
6. `npm run check:diagrams` → 0 fallos.

Reglas de diseño que no se rompen: `fontFamily: 3`, texto ≥16 (títulos 20–28),
`fillStyle: solid`, paleta azul `#2563eb` / teal `#4ecdc4` / rojo `#e03131`
(fondos `#eff6ff`, `#f0fdf4`, `#ffe3e3`, `#f8f9fa`), texto teal legible en
`#0f766e`, cajas ≥120×60, separación 40–80 px, rejilla de 20 px, texto suelto
con `textAlign: left` y etiquetas vinculadas centradas, flechas con
`startElementId`/`endElementId` y etiquetas **fuera** de la línea.

## Verificación antes de cerrar

1. `npm run check:diagrams` → 0 fallos.
2. `npm run check:unidad XX` → 0 FALLOs (o `all`).
3. `node scripts/check-uds.mjs` → 0 restos.
4. `node scripts/check-links.mjs` → OK.
5. `npx astro build` → 191 páginas.
6. `npm run docx` (Pandoc 3.11) → todos los DOCX, 0 fallos.
7. Contar los `word/media/*.svg` del DOCX de la unidad: uno por diagrama
   referenciado.
8. Borrar `.tmp-*` de `public/diagrams/` y los `docx/**/.~lock.*#`.
9. Commit en español, sin atribución a herramientas y **solo con confirmación
   explícita** del usuario.
