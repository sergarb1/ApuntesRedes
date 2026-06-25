param($OutDir = "public/epub")

$ErrorActionPreference = "Stop"

$units = @(
  "01-fundamentos-redes",
  "02-modelos-osi-analisis",
  "03-infraestructura-fisica",
  "04-ipv4-subnetting",
  "05-ipv6-transicion",
  "06-switching-stp",
  "07-vlans",
  "08-routing-acls",
  "09-routing-dinamico",
  "10-nat-internet",
  "11-diagnostico-monitorizacion",
  "12-cloud-virtualizacion-futuro"
)

$boletinFiles = @(
  "boletines/boletin-U{0}-inicial-resuelto",
  "boletines/boletin-U{0}-inicial",
  "boletines/boletin-U{0}-avanzado-resuelto",
  "boletines/boletin-U{0}-avanzado"
)

$metaTitle = "Apuntes PAR - Planificacion y Administracion de Redes"
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

foreach ($u in $units) {
  # --- Unit content ---
  $file = "$srcDir/$u.md"
  if (-not (Test-Path $file)) {
    $file = "$srcDir/$u.mdx"
  }
  if (Test-Path $file) {
    $content = Get-Content $file -Raw -Encoding UTF8

    $title = ""
    if ($content -match '(?ms)^---\s*\n(.+?)\n^---') {
      $frontmatter = $matches[1]
      if ($frontmatter -match '^title:\s*"(.+?)"') {
        $title = $matches[1]
      }
    }
    if (-not $title) {
      $title = ($u -replace '^\d+-', '' -replace '-', ' ')
    }

    $content = $content -replace '(?ms)^---.*?^---\s*', ''
    $content = $content.Trim()
    $content = $content -replace '/ApuntesRedes/cc-by-sa\.png', 'public/cc-by-sa.png'
    $content = $content -replace '/diagrams/', 'public/diagrams/'

    $null = $sb.AppendLine("# $title")
    $null = $sb.AppendLine("")
    if ($content) {
      $null = $sb.AppendLine($content)
      $null = $sb.AppendLine("")
    }
  }

  # --- Boletines ---
  $nn = ($u -split '-')[0]
  foreach ($bf in $boletinFiles) {
    $bfName = $bf -f $nn
    $bfFile = "$srcDir/$bfName.md"
    if (-not (Test-Path $bfFile)) {
      $bfFile = "$srcDir/$bfName.mdx"
    }
    if (Test-Path $bfFile) {
      $eContent = Get-Content $bfFile -Raw -Encoding UTF8

      $eTitle = ""
      if ($eContent -match '(?ms)^---\s*\n(.+?)\n^---') {
        $efront = $matches[1]
        if ($efront -match '^title:\s*"(.+?)"') {
          $eTitle = $matches[1]
        }
      }

      $eContent = $eContent -replace '(?ms)^---.*?^---\s*', ''
      $eContent = $eContent.Trim()
      $eContent = $eContent -replace '/ApuntesRedes/cc-by-sa\.png', 'public/cc-by-sa.png'
      $eContent = $eContent -replace '/diagrams/', 'public/diagrams/'

      $eContent = $eContent -replace '(?m)^(#+)', '#$1'

      if ($eTitle) {
        $null = $sb.AppendLine("## $eTitle")
        $null = $sb.AppendLine("")
      }
      if ($eContent) {
        $null = $sb.AppendLine($eContent)
        $null = $sb.AppendLine("")
      }
    }
  }
}

$tempMd = [System.IO.Path]::GetTempFileName() + ".md"
[System.IO.File]::WriteAllText($tempMd, $sb.ToString(), [System.Text.Encoding]::UTF8)

$cssPath = Join-Path $PSScriptRoot "epub.css"
try {
  & pandoc $tempMd --from markdown --to epub3 --toc --toc-depth=3 --epub-cover-image="$coverPath" --syntax-highlighting pygments --css $cssPath -o $outPath
  if ($LASTEXITCODE -eq 0) { Write-Host "OK: $outPath" } else { Write-Host "FAIL" }
} finally {
  Remove-Item $tempMd -Force -ErrorAction SilentlyContinue
}
