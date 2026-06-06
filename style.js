/*Tải header/footer từ file HTML riêng.
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
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                el.innerHTML = doc.body ? doc.body.innerHTML : html;
                const btn =
                el.querySelector(".search-box button");

                const input =
                el.querySelector("#search-input");

                if(btn){
                  btn.addEventListener("click", executeSearch);
                }

                if(input){
                  input.addEventListener("keydown", e=>{
                     if(e.key === "Enter"){
                        executeSearch();
                }
       });
}
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
            // ĐÃ SỬA: Khóa chiều cao khít rịt để không bị khoảng trắng thừa
            iframe.style.height = name === 'header' ? '145px' : '380px';
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
        .then(() => injectPartial('header', 'header.html', 'header.html'))
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
    // Đợi layout ổn định rồi gán sự kiện cho nút email nếu chạy hệ Fetch
    const btn = document.querySelector('.newsletter-btn');
    if (btn && !btn.dataset.bound) {
        btn.dataset.bound = '1';
        btn.addEventListener('click', subscribeEmail);
    }
}

/* ========================================================
    LOGIC TÌM KIẾM VÀ EMAIL XUYÊN IFRAME
   ======================================================== */

// 1. Tìm kiếm sản phẩm
function executeSearch() {

    const input =
    document.getElementById("search-input");

    if (!input) {
        alert("Không tìm thấy ô tìm kiếm");
        return;
    }

    const query = input.value.trim();

    if (query) {
        window.location.href =
        "danh_muc.html?search=" +
        encodeURIComponent(query);
    }
}
// 2. Đăng ký nhận tin ở Footer
function subscribeEmail() {
    let emailInput = document.getElementById('newsletter-email');
    let message = document.getElementById('newsletter-message');

    // NẾU CHẠY OFFLINE (IFRAME): Phải lách vào trong iframe Footer để tìm
    if (!emailInput || !message) {
        const footerFrame = document.querySelector(".partial-frame--footer");
        if (footerFrame && footerFrame.contentDocument) {
            emailInput = footerFrame.contentDocument.getElementById('newsletter-email');
            message = footerFrame.contentDocument.getElementById('newsletter-message');
        }
    }

    if (!emailInput || !message) return;

    const email = emailInput.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
        message.textContent = 'Vui lòng nhập email';
        message.style.color = 'red'; // Ép chữ màu đỏ
    } else if (!pattern.test(email)) {
        message.textContent = 'Email không hợp lệ';
        message.style.color = 'red';
    } else {
        message.textContent = 'Đăng ký thành công 💖';
        message.style.color = 'green'; // Ép chữ màu xanh
        emailInput.value = '';
    }
}

// 3. Cập nhật giỏ hàng số lượng
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += item.quantity;
    });
    
    let cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = totalQuantity;
        cartCount.style.display = totalQuantity > 0 ? "flex" : "none";
    }

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

// Lắng nghe sự kiện load trang
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(updateCartCount, 500); 
});

window.addEventListener('storage', function(e) {
    if(e.key === 'cart') updateCartCount();
});