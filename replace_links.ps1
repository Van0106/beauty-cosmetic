$files = Get-ChildItem "d:\codeeznut\HTML\combine\Cuoikimain\*.html"
$files += Get-ChildItem "d:\codeeznut\HTML\combine\Cuoikimain\*.js"
$files += Get-ChildItem "d:\codeeznut\HTML\combine\Cuoikimain\js\*.js"

$utf8NoBom = New-Object System.Text.UTF8Encoding $false

foreach ($file in $files) {
    try {
        $text = [System.IO.File]::ReadAllText($file.FullName, $utf8NoBom)
        if ($text -match "chi_tiet\.html") {
            $text = $text -replace "chi_tiet\.html", "chitietsanpham.html"
            [System.IO.File]::WriteAllText($file.FullName, $text, $utf8NoBom)
            Write-Host "Updated $($file.FullName)"
        }
    } catch {
        Write-Host "Error processing $($file.FullName)"
    }
}
