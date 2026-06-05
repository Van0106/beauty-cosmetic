$path = "d:\codeeznut\HTML\combine\Cuoikimain\flash_sale.html"
$content = Get-Content $path -Raw
$content = $content -replace '<a href ="#"><button>Xem chi ti', '<a href="chi_tiet.html"><button>Xem chi ti'
$content = $content -replace '<a href="product-detail.html"', '<a href="chi_tiet.html"'
$content = $content -replace '<a href = "#"></a><img', '<a href="chi_tiet.html"></a><img'
Set-Content $path -Value $content -Encoding UTF8
