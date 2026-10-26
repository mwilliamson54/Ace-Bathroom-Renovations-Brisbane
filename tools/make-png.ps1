Add-Type -AssemblyName System.Drawing

$out = Join-Path (Get-Location) "public\images"
New-Item -ItemType Directory -Force -Path $out | Out-Null

function New-RoundedPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $p.AddArc($x, $y, $d, $d, 180, 90)
  $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure()
  return $p
}

function New-Logo([int]$size, [string]$file) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.Clear([System.Drawing.Color]::Transparent)

  $teal = [System.Drawing.ColorTranslator]::FromHtml("#004155")
  $blue = [System.Drawing.ColorTranslator]::FromHtml("#1F99D8")
  $path = New-RoundedPath 0 0 $size $size ($size * 0.06)
  $brush = New-Object System.Drawing.SolidBrush $teal
  $g.FillPath($brush, $path)

  $white = [System.Drawing.Color]::White
  $wb = New-Object System.Drawing.SolidBrush $white
  $pts = @(
    (New-Object System.Drawing.PointF (($size * 0.5), ($size * 0.19))),
    (New-Object System.Drawing.PointF (($size * 0.22), ($size * 0.81))),
    (New-Object System.Drawing.PointF (($size * 0.355), ($size * 0.81))),
    (New-Object System.Drawing.PointF (($size * 0.405), ($size * 0.665))),
    (New-Object System.Drawing.PointF (($size * 0.595), ($size * 0.665))),
    (New-Object System.Drawing.PointF (($size * 0.645), ($size * 0.81))),
    (New-Object System.Drawing.PointF (($size * 0.78), ($size * 0.81)))
  )
  $g.FillPolygon($wb, [System.Drawing.PointF[]]$pts)

  $cut = New-Object System.Drawing.SolidBrush $teal
  $cutPts = @(
    (New-Object System.Drawing.PointF (($size * 0.5), ($size * 0.40))),
    (New-Object System.Drawing.PointF (($size * 0.425), ($size * 0.575))),
    (New-Object System.Drawing.PointF (($size * 0.575), ($size * 0.575)))
  )
  $g.FillPolygon($cut, [System.Drawing.PointF[]]$cutPts)

  $bb = New-Object System.Drawing.SolidBrush $blue
  $drop = New-Object System.Drawing.Drawing2D.GraphicsPath
  $cx = $size * 0.795
  $cy = $size * 0.31
  $drop.AddBezier($cx, ($cy - $size * 0.105), ($cx + $size * 0.085), ($cy + $size * 0.015), ($cx + $size * 0.07), ($cy + $size * 0.09))
  $drop.AddBezier(($cx + $size * 0.07), ($cy + $size * 0.09), ($cx + $size * 0.055), ($cy + $size * 0.155), ($cx - $size * 0.055), ($cy + $size * 0.155))
  $drop.AddBezier(($cx - $size * 0.055), ($cy + $size * 0.155), ($cx - $size * 0.07), ($cy + $size * 0.09), ($cx - $size * 0.07), ($cy + $size * 0.09))
  $drop.AddBezier(($cx - $size * 0.07), ($cy + $size * 0.09), ($cx - $size * 0.085), ($cy + $size * 0.015), $cx, ($cy - $size * 0.105))
  $drop.CloseFigure()
  $g.FillPath($bb, $drop)

  $bmp.Save((Join-Path $out $file), [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose(); $brush.Dispose(); $wb.Dispose(); $cut.Dispose(); $bb.Dispose(); $path.Dispose(); $drop.Dispose()
}

New-Logo 512 "logo.png"

$logo = [System.Drawing.Image]::FromFile((Join-Path $out "logo.png"))
foreach ($s in @(@(32, "favicon-32.png"), @(180, "apple-touch-icon.png"), @(192, "icon-192.png"), @(512, "icon-512.png"))) {
  $bmp = New-Object System.Drawing.Bitmap $s[0], $s[0]
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::Transparent)
  $g.DrawImage($logo, 0, 0, $s[0], $s[0])
  $bmp.Save((Join-Path $out $s[1]), [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}
$logo.Dispose()

# ---------- Open Graph / social image ----------
$w = 1200; $h = 630
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$c1 = [System.Drawing.ColorTranslator]::FromHtml("#004155")
$c2 = [System.Drawing.ColorTranslator]::FromHtml("#0A5F78")
$grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, $c1, $c2, 25
$g.FillRectangle($grad, $rect)

# soft circles
$blue = [System.Drawing.ColorTranslator]::FromHtml("#1F99D8")
$glow = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(36, 31, 153, 216))
$g.FillEllipse($glow, 820, -180, 620, 620)
$glow2 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(22, 127, 208, 244))
$g.FillEllipse($glow2, -160, 380, 520, 520)

# outline bathroom illustration on right
$line = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(80, 207, 227, 233)), 2
$line2 = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(42, 207, 227, 233)), 2
$g.DrawRectangle($line2, 860, 155, 250, 330)
$g.DrawEllipse($line, 925, 190, 120, 120)
$g.DrawLine($line, 985, 190, 985, 310)
$g.DrawRectangle($line2, 880, 360, 210, 84)
$g.DrawEllipse($line, 930, 348, 110, 26)
$g.DrawLine($line, 985, 320, 985, 348)
$g.DrawLine($line2, 860, 485, 1110, 485)
$g.DrawLine($line2, 900, 485, 900, 590)
$g.DrawLine($line2, 1070, 485, 1070, 590)

# accent bar
$gold = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#7FD0F4"))
$g.FillRectangle($gold, 80, 86, 64, 6)

$white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$pale = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#CFE3E9"))
$blueText = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#7FD0F4"))

$fontBig = New-Object System.Drawing.Font "Segoe UI", 104, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$fontSub = New-Object System.Drawing.Font "Segoe UI", 31, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$fontSmall = New-Object System.Drawing.Font "Segoe UI", 22, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$fontPhone = New-Object System.Drawing.Font "Segoe UI", 27, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)

$g.DrawString("ACE", $fontBig, $white, 76, 118)
$g.DrawString("BATHROOM RENOVATIONS BRISBANE", $fontSub, $white, 80, 258)
$g.DrawString("QBCC licensed builder  ?|  One accountable team", $fontSmall, $pale, 82, 312)
$g.DrawString("Fixed written scope  ?|  AS 3740 waterproofing", $fontSmall, $pale, 82, 346)

$g.DrawString("(07) 8590 6941", $fontPhone, $white, 80, 470)
$g.DrawString("acebathroomrenovationsbrisbane.com", $fontSmall, $blueText, 80, 516)
$g.DrawString("Open 7am???10pm, 7 days", $fontSmall, $pale, 80, 556)

$bmp.Save((Join-Path $out "og-image.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $grad.Dispose(); $glow.Dispose(); $glow2.Dispose(); $line.Dispose(); $line2.Dispose(); $gold.Dispose(); $white.Dispose(); $pale.Dispose(); $blueText.Dispose(); $fontBig.Dispose(); $fontSub.Dispose(); $fontSmall.Dispose(); $fontPhone.Dispose()

Write-Host "Wrote logo, favicons and og-image.png"

