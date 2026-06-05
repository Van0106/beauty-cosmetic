/**
 * Tải header/footer từ file HTML riêng (folder Cuoiki).
 * http/https: fetch | file://: iframe
 */
function injectPartial(containerId, partialUrl, frameUrl) {
    const el = document.getElementById(containerId);
    if (!el) return Promise.resolve();

    const canFetch = location.protocol === 'http:' || location.protocol === 'https:';

    if (canFetch) {
        return fetch(partialUrl)
            .then(res => {
                if (!res.ok) throw new Error(res.status);
                return res.text();
            })
            .then(html => {
                el.innerHTML = html;
            })
            .catch(err => {
                console.warn('Fetch thất bại, chuyển sang iframe:', err);
                mountIframe(el, frameUrl, containerId);
            });
    }

    mountIframe(el, frameUrl, containerId);
    return Promise.resolve();
}

function mountIframe(container, frameUrl, name) {
    const iframe = document.createElement('iframe');
    iframe.src = frameUrl;
    iframe.className = 'partial-frame partial-frame--' + name;
    iframe.title = name;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    container.appendChild(iframe);

    iframe.addEventListener('load', () => {
        try {
            const doc = iframe.contentDocument;
            const height = Math.max(
                doc.body.scrollHeight,
                doc.documentElement.scrollHeight
            );
            iframe.style.height = height + 'px';
        } catch (_) {
            iframe.style.height = name === 'header' ? '195px' : '480px';
        }
    });
}

function ensureAuthScript() {
    return new Promise(resolve => {
        if (typeof initAuthHeader === 'function') {
            resolve();
            return;
        }
        const existing = document.querySelector('script[data-auth-js]');
        if (existing) {
            existing.addEventListener('load', resolve);
            existing.addEventListener('error', resolve);
            return;
        }
        const script = document.createElement('script');
        script.src = 'js/auth.js';
        script.dataset.authJs = '1';
        script.onload = resolve;
        script.onerror = resolve;
        document.head.appendChild(script);
    });
}

function loadHeader() {
    return ensureAuthScript()
        .then(() => injectPartial('header', 'header.html', 'header-page.html'))
        .then(() => {
            if (typeof initAuthHeader === 'function') initAuthHeader();
        });
}

function loadLayout() {
    const tasks = [loadHeader()];
    if (document.getElementById('footer')) {
        tasks.push(injectPartial('footer', 'footer.html', 'footer-page.html'));
    }
    return Promise.all(tasks).then(initFooter);
}

function initFooter() {
    const btn = document.querySelector('.newsletter-btn');
    if (btn && !btn.dataset.bound) {
        btn.dataset.bound = '1';
        btn.addEventListener('click', subscribeEmail);
    }
}

function subscribeEmail() {
    const emailInput = document.getElementById('newsletter-email');
    const message = document.getElementById('newsletter-message');
    if (!emailInput || !message) return;

    const email = emailInput.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
        message.textContent = 'Vui lòng nhập email';
        message.className = 'error';
    } else if (!pattern.test(email)) {
        message.textContent = 'Email không hợp lệ';
        message.className = 'error';
    } else {
        message.textContent = 'Đăng ký thành công';
        message.className = 'success';
        emailInput.value = '';
    }
}

// C?p nh?t gi? h�ng s? lu?ng
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += item.quantity;
    });
    
    // Cập nhật ở cửa sổ chính (nếu dùng fetch hoặc đang ở trang header)
    let cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = totalQuantity;
        cartCount.style.display = totalQuantity > 0 ? "flex" : "none";
    }

    // Cập nhật bên trong iframe (nếu chạy qua file://)
    let frames = document.querySelectorAll(".partial-frame--header");
    frames.forEach(f => {
        try {
            let fc = f.contentDocument.getElementById("cart-count");
            if (fc) {
                fc.innerText = totalQuantity;
                fc.style.display = totalQuantity > 0 ? "flex" : "none";
            }
        } catch(e) {}
    });
}

// L?ng nghe s? ki?n sau khi header du?c load
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(updateCartCount, 500); // �?i header load xong
});
// Ho?c c?p nh?t khi localStorage thay d?i
window.addEventListener('storage', function(e) {
    if(e.key === 'cart') updateCartCount();
});

