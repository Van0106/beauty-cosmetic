import os
import glob

html_files = glob.glob(r'd:\codeeznut\HTML\combine\Cuoikimain\*.html')
js_files = glob.glob(r'd:\codeeznut\HTML\combine\Cuoikimain\*.js')
js_dir_files = glob.glob(r'd:\codeeznut\HTML\combine\Cuoikimain\js\*.js')

for path in html_files + js_files + js_dir_files:
    try:
        with open(path, 'r', encoding='utf-8') as f:
            text = f.read()
            
        if 'chi_tiet.html' in text:
            text = text.replace('chi_tiet.html', 'chitietsanpham.html')
            with open(path, 'w', encoding='utf-8') as f:
                f.write(text)
            print(f"Updated {path}")
    except Exception as e:
        print(f"Failed {path}: {e}")
