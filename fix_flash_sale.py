import os

path = r'd:\codeeznut\HTML\combine\Cuoikimain\flash_sale.html'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('<a href ="#"><button>Xem chi ti', '<a href="chi_tiet.html"><button>Xem chi ti')
text = text.replace('<a href="product-detail.html"', '<a href="chi_tiet.html"')
text = text.replace('<a href = "#"></a><img', '<a href="chi_tiet.html"></a><img')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)
print('Done!')
