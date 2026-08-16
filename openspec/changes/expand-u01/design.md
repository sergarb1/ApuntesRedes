## Context

La U01 es la primera unidad del curso y, tras la llegada del Tema 0 (`add-tema0`), es la primera que debe cumplir el estándar de profundidad `contenido-unidad`. Hoy es un solo archivo de 742 líneas. `docsLoader` de Starlight ya resuelve slugs como `01-fundamentos-redes` y `01-fundamentos-redes/01-...` (idéntico patrón al Tema 0). El script de EPUB ya itera subcarpetas de unidades y sus boletines (cambio `add-tema0`), y el PDF (starlight-to-pdf) sigue el sidebar.

## Goals / Non-Goals

**Goals:**
- Dividir la U01 en un índice + 9 puntos navegables, cada uno ≈120–200 líneas.
- Nivel de entrada cero: definir todo término (MAC, OSI, PDU, gateway…) en su primer uso, con analogías.
- Mantener (y ampliar) las secciones de consolidación en el punto 9 con fallo intencionado en el laboratorio.
- Tabla de CEs (RA1) en el índice de la unidad con estado de cobertura.
- Encadenado correcto "anterior/siguiente" entre puntos y hacia la U02.

**Non-Goals:**
- No ampliar otras unidades (U02–U12) en este change.
- No rediseñar CSS ni layout; no cambiar `scripts/*` (ya recorren subcarpetas).
- No revisar aún los boletines U01 (queda para un cambio posterior).

## Decisions

### D1: Estructura de archivos
- Índice: `src/content/docs/01-fundamentos-redes.md` (tabla de CEs, contenidos, enlaces a boletines).
- Puntos: `src/content/docs/01-fundamentos-redes/01-…md` … `09-cierre.md`.
- **Razón:** mismo patrón que `add-tema0`; slugs cortos estables ya conocidos por el PDF y la portada.

### D2: División en 9 puntos
1. `01-que-es-una-red` — definición, componentes, cliente/servidor vs P2P (amplía).
2. `02-tipos-y-alcance` — PAN/LAN/CAN/MAN/WAN + criterios (medio, propiedad, velocidad).
3. `03-topologias` — física vs lógica, estrella/bus/anillo/malla, árbol/híbrida + diagramas.
4. `04-dispositivos` — repetidor, hub, bridge, switch, router, AP, módem, firewall y tablas por capa.
5. `05-modelo-osi` — por qué 7 capas, tabla por capa, encapsulación, OSI vs TCP/IP + diagramas.
6. `06-protocolos` — qué son, puertos (well-known/registrados/dinámicos), TCP vs UDP, tabla de protocolos.
7. `07-direcciones-mac-ip` — MAC (OUI), IPv4, máscara, direcciones especiales, pública vs privada, analogía completa.
8. `08-conectividad-basica` — gateway, ping/ipconfig/arp/tracert, escenario completo, método en 6 pasos + diagrama ARP.
9. `09-cierre` — cierre pedagógico: Be the Packet, Fireside, Quién Soy, CONRAD, Laboratorio, Logros, Atrévete, Crucigrama, Entrevista, FAQ, Post-Créditos.
- **Razón:** cada punto alcanza ~120–200 líneas sin hinchar el índice; el cierre pedagógico queda autoconsistente en un solo archivo.

### D3: Nivel de entrada cero
Todos los acrónimos se expanden y definen en su primer uso dentro de cada punto ("MAC (Media Access Control) — un número..."). Los puntos reutilizan la plantilla del Tema 0: frase inicial, secciones `##`, tabla y analogía, "Resumen en 3 frases", bloque de vocabulario con `>` y enlaces `Anterior/Siguiente` (además de `[Volver al índice]`).

### D4: Diagramas reutilizados (no se generan nuevos)
- `topologia-estrella|bus|anillo|malla.svg` → punto 3.
- `red-domestica.svg` → punto 1.
- `dispositivos-osi.svg` → punto 4.
- `modelo-osi-capas.svg` y `flujo-encapsulacion.svg` → punto 5.
- `flujo-arp-gateway.svg` → punto 8.
- **Razón:** no requieren regeneración de D2 y siguen siendo correctos.

### D5: Cierre y continuidad
- Post-Créditos en punto 9 con "PRÓXIMAMENTE EN U02: Modelos OSI y análisis de tráfico".
- Índice: tabla de CEs del RA1 con estado ✅/apartado, y enlace a los 4 boletines (trayectoria al cambio de boletines posterior).

## Risks / Trade-offs

- [Unidad con solo índice y cabecera sin más profundidad] → el índice ancla la navegación con mapa de puntos; el contenido de cada punto es la fuente principal, no es redundante.
- [Fallo intencionado del laboratorio basado en VLANs puede despistar] → se mantiene porque lo reclama el estándar; se incluyen pistas escalonadas y una nota "esto se verá en U07".
- [PDF más largo por U01 separada] → deseado: libro de verdad.