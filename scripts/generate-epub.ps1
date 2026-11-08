param($OutDir = "public/epub")

$ErrorActionPreference = "Stop"

$unitSlugs = @(
  "01-introduccion",
  "02-medios-y-cableado",
  "03-capa-de-enlace",
  "04-direccionamiento-ip",
  "05-switching",
  "06-trunking-inter-vlan",
  "07-servicios-red",
  "08-enrutamiento-estatico",
  "09-ospf",
  "10-nat-pat",
  "11-acl-seguridad",
  "12-redes-inalambricas",
  "13-alta-disponibilidad"
)

$boletinesCodes = @(
  "01",
  "02", "03", "04", "05", "06", "07",
  "08", "09", "10", "11", "12", "13"
)

$boletinSections = @(
  "inicial-resuelto",
  "inicial",
  "avanzado-resuelto",
  "avanzado",
  "ipv6-inicial-resuelto",
  "ipv6-inicial",
  "ipv6-avanzado-resuelto",
  "ipv6-avanzado",
  "packettracer-resuelto",
  "packettracer"
)

$metaTitle = "Apuntes PAR - Planificación y Administración de Redes"
$metaLang = "es"
$outFile = "ApuntesPAR.epub"

$srcDir = "src/content/docs"
$outPath = "$OutDir/$outFile"
$coverPath = Join-Path (Get-Location) "public/portada.png"

New-Item -ItemType Directory -Path $OutDir -Force | Out-Null

$sb = [System.Text.StringBuilder]::new()
$null = $sb.AppendLine("---")
$null = $sb.AppendLine("title: '$metaTitle'")
$null = $sb.AppendLine("author: 'Sergi Garcia Barea'")
$null = $sb.AppendLine("language: $metaLang")
$null = $sb.AppendLine("---")
$null = $sb.AppendLine("")

function Get-FrontTitle {
  param($Content, $Fallback)
  if ($Content -match '(?ms)^---\s*\n(.+?)\n^---') {
    $fm = $matches[1]
    if ($fm -match '(?m)^title:\s*"?([^"\r\n]+)"?') {
      return $matches[1].Trim()
    }
  }
  return $Fallback
}

function Shift-Headings {
  # Añade un '#' a cada encabezado ATX (## -> ###, # -> ##) fuera de bloques
  # de código con cercas, para bajar un nivel el contenido embebido.
  # La cerca puede ir sola, con sangría o tras un marcador de lista ("2. ```").
  param([string]$Text)
  $lines = $Text -split "`n"
  $inFence = $false
  $fenceRe = '^\s*(?:(?:\d+[.)]|[-*+])\s+)?(?:`{3,}[^`]*$|~{3,})'
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match $fenceRe) { $inFence = -not $inFence; continue }
    if (-not $inFence -and $lines[$i] -match '^#{1,6} ') { $lines[$i] = '#' + $lines[$i] }
  }
  return ($lines -join "`n")
}

function Get-Body {
  # Quita el frontmatter y reescribe las rutas /ApuntesRedes -> public/
  param($Content)
  $c = $Content -replace '(?ms)\A---.*?^---\s*', ''
  $c = $c.Trim()
  $c = $c -replace '/ApuntesRedes/cc-by-sa\.png', 'public/cc-by-sa.png'
  $c = $c -replace '/ApuntesRedes/diagrams/', 'public/diagrams/'
  $c = $c -replace '/ApuntesRedes/photos/', 'public/photos/'
  return $c
}

function Add-MdFile {
  param($Path, [int]$HeadingLevel)

  $content = Get-Content $Path -Raw -Encoding UTF8
  $title = Get-FrontTitle -Content $content -Fallback ([System.IO.Path]::GetFileNameWithoutExtension($Path))

  $content = Get-Body $content
  $content = Shift-Headings $content

  $level = '#' * $HeadingLevel
  $null = $sb.AppendLine("$level $title")
  $null = $sb.AppendLine("")
  if ($content) {
    $null = $sb.AppendLine($content)
    $null = $sb.AppendLine("")
  }
}

foreach ($u in $unitSlugs) {
  # --- Índice de la unidad (fichero raíz, p. ej. 02-medios-y-cableado.md) ---
  $indexFile = "$srcDir/$u.md"
  if (-not (Test-Path $indexFile)) { $indexFile = "$srcDir/$u.mdx" }
  if (Test-Path $indexFile) {
    # Nivel 1: cada unidad abre su propio capítulo del EPUB
    Add-MdFile -Path $indexFile -HeadingLevel 1
  }

  # --- Puntos de la unidad (subcarpeta, p. ej. 01-introduccion/01-*.md) ---
  $unitDir = "$srcDir/$u"
  if (Test-Path $unitDir) {
    $puntos = Get-ChildItem -Path $unitDir -Filter "*.md" -File | Sort-Object Name
    foreach ($p in $puntos) {
      # Nivel 2: los puntos cuelgan del índice de su unidad en el nav
      Add-MdFile -Path $p.FullName -HeadingLevel 2
    }
  }

  # --- Boletines de la unidad ---
  $code = ($u -split '-')[0]
  if ($boletinesCodes -contains $code) {
    foreach ($sec in $boletinSections) {
      $bfName = "boletin-U$code-$sec"
      $bfFile = "$srcDir/boletines/$bfName.md"
      if (-not (Test-Path $bfFile)) { $bfFile = "$srcDir/boletines/$bfName.mdx" }
      if (Test-Path $bfFile) {
        $eContent = Get-Content $bfFile -Raw -Encoding UTF8
        $eTitle = Get-FrontTitle -Content $eContent -Fallback $bfName

        $eContent = Get-Body $eContent
        # El boletine ya lleva su título en el frontmatter: se quita el H1
        # interno duplicado (en la web se ve el título repetido).
        $eContent = $eContent -replace '(?m)^#+\s+\S*\s*Boletín[^\r\n]*\r?\n\s*\r?\n?', ''
        $eContent = Shift-Headings $eContent

        # Nivel 2: los boletines cuelgan de su unidad en el nav
        $null = $sb.AppendLine("## $eTitle")
        $null = $sb.AppendLine("")
        if ($eContent) {
          $null = $sb.AppendLine($eContent)
          $null = $sb.AppendLine("")
        }
      }
    }
  }
}

$tempMd = [System.IO.Path]::GetTempFileName() + ".md"
[System.IO.File]::WriteAllText($tempMd, $sb.ToString(), [System.Text.Encoding]::UTF8)

$cssPath = Join-Path $PSScriptRoot "epub.css"
$pandoc = Get-ChildItem -Recurse -Filter "pandoc.exe" -Path "$env:LOCALAPPDATA\Microsoft\WinGet\Packages" -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName
if (-not $pandoc) { $pandoc = "pandoc" }
try {
  # --toc-depth=2: nav de dos niveles -> unidad (h1) -> puntos y boletines (h2)
  & $pandoc $tempMd --from markdown --to epub3 --toc --toc-depth=2 --epub-cover-image="$coverPath" --highlight-style=pygments --css $cssPath -o $outPath
  if ($LASTEXITCODE -eq 0) { Write-Host "OK: $outPath" } else { Write-Host "FAIL" }
} finally {
  Remove-Item $tempMd -Force -ErrorAction SilentlyContinue
}
