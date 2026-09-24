# Setup de diagramas Excalidraw para sitios Astro/Starlight

Prompt reutilizable para montar en cualquier proyecto Astro/Starlight la misma pipeline de diagramas Excalidraw que usa este repositorio (MCP + skill + SVG en `public/`).

---

## 1. MCP + skill (una sola vez por equipo)

1. Añadir en `~/.config/opencode/opencode.json` el bloque:

   ```json
   "excalidraw": {
     "command": "npx",
     "args": ["-y", "mcp-excalidraw-server"]
   }
   ```

2. Instalar la skill del proyecto:

   ```bash
   npx -y mcp-excalidraw-server install-skill --dir "C:\Users\<user>\.config\opencode\skills"
   ```

   → Leer `excalidraw-skill/SKILL.md` **antes** de dibujar (workflow, anti-patrones, checklist).

3. Arrancar el servidor MCP y **abrir `http://127.0.0.1:3000` en el navegador**.
   - `screenshot` / `export_to_image` / `set_viewport` fallan sin pestaña abierta (`No frontend client`).
   - Fix: `Start-Process "http://127.0.0.1:3000/"`.

4. Comprobar:

   ```bash
   npx -y mcp-excalidraw-server status
   ```

   Debe decir `running: true` y `browserClients >= 1`.

---

## 2. Estructura en el repo

| Qué | Dónde |
|---|---|
| SVG exportado | `public/diagrams/NOMBRE.svg` |
| Fuente editable | `public/diagrams/NOMBRE.excalidraw` |
| Diccionario de iconos | `docs/excalidraw-icons.md` |
| Referencia en `.md` | `![Alt en es-ES](/BASE_PATH/diagrams/NOMBRE.svg)` |

- Si el sitio **no** tiene `basePath`, la ruta es `/diagrams/NOMBRE.svg`.
- **NO** usar SVG inline ni `@excalidraw/excalidraw` como React: solo ficheros estáticos en `public/`.

---

## 3. Workflow por diagrama (obligatorio)

1. Escribir JSON de elementos en un fichero temporal. Añadir con CLI (acepta `fillStyle`; el tool MCP `batch_create_elements` **no** lo admite):

   ```bash
   npx -y mcp-excalidraw-server add fichero.json
   ```

2. `describe` + **screenshot** → corregir solapes / texto truncado **hasta** que quede limpio.

3. Exportar:

   - `export_scene` → `public/diagrams/NOMBRE.excalidraw`
   - `export_to_image --format svg` → `public/diagrams/NOMBRE.svg`
   - **Verificar** que el SVG pesa >1 KB y contiene los textos (si sale 20×20 o vacío, reintentar con viewport `scrollToContent`).

4. `clear --yes` antes del siguiente diagrama.

5. Insertar la imagen en el `.md` y comprobar en el dev server que devuelve 200 con `image/svg+xml`.

---

## 4. Reglas de diseño (evitan el caos visual)

| Caso | Cómo |
|---|---|
| Caja de contenido | `"text"` **dentro** del rectangle/ellipse → bound-label centrado automático |
| Zona de fondo grande | **Sin** `text` dentro; título como texto libre arriba-izquierda |
| Flecha | `startElementId` + `endElementId` (+ `text` solo si ≤12 caracteres y aporta); gap ≥120 px si lleva etiqueta |
| Título / nota | Texto libre suelto |

- `fillStyle: "solid"` siempre (el hachurado por defecto parece borrador).
- Tamaño: texto ≥16 (títulos 20–28); shapes ≥120×60; gaps 40–80; rejilla de 20 px.
- Paleta sugerida (ajustar al tema del proyecto): stroke primario/secundario, fondos muy claros, texto casi negro, gris para notas, rojo solo para errores.
- **No** flechas diagonales que crucen zonas; preferir ortogonales.
- Lógica del diagrama > estética: la numeración y las flechas deben tener sentido pedagógico (si las piezas coexisten, no pintarlas como cadena 1→2→3→4).

---

## 5. Iconos de internet

1. Buscar librerías `.excalidrawlib` (zip con `scene.json`), p. ej. dwelle *network-topology-icons*, *network-elements*. Ojo: algunos packs vienen corruptos.
2. Copiar iconos a un JSON, desplazar `x`/`y`, regenerar `id`, `import_scene` con `mode: "merge"` (o `add`), y **borrar el JSON temporal del repo**.
3. Guardar el diccionario resultante en `docs/excalidraw-icons.md` para reutilizar.
4. Alternativa: dibujar con shapes (`rect` + `text`) si no hace falta un icono real.

---

## 6. Integración Astro/Starlight

- Los `.md` viven en `src/content/docs/…`; no crear `src/pages` ni MDX solo para esto.
- Tras insertar: `npm run dev` y abrir la página; verificar 200 + SVG servido.
- Build: si hay D2 CLI → `npm run build`; si no → `npx astro build` (D2 no instalado no debe romper).
- Idioma de alts y textos: es-ES, tono didáctico del proyecto.

---

## 7. Limpieza antes de commit

- Borrar JSON/scripts temporales y carpetas de descarga (`%TEMP%\…`).
- **No** tocar `astro.config.mjs` ni dependencias salvo que haga falta para la feature.
- Commit + push solo si el usuario lo pide explícitamente.

---

## Comandos CLI de referencia

```bash
npx -y mcp-excalidraw-server status
npx -y mcp-excalidraw-server add archivo.json
npx -y mcp-excalidraw-server describe
npx -y mcp-excalidraw-server screenshot --out captura.png
npx -y mcp-excalidraw-server export --out public/diagrams/x.excalidraw
npx -y mcp-excalidraw-server clear --yes
npx -y mcp-excalidraw-server install-skill --dir <skills-root>
```
