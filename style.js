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
        tasks.push(injectPartial('footer', 'footer.html', 'footer.html'));
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
    let searchInput = document.getElementById("search-input");
    
    // NẾU CHẠY OFFLINE (IFRAME): Phải lách vào trong iframe Header để tìm ô input
    if (!searchInput) {
        const headerFrame = document.querySelector(".partial-frame--header");
        if (headerFrame && headerFrame.contentDocument) {
            searchInput = headerFrame.contentDocument.getElementById("search-input");
        }
    }
    
    if (!searchInput) return;
    let query = searchInput.value.trim();
    if (query !== "") {
        window.location.href = "danh_muc.html?search=" + encodeURIComponent(query);
    }
}

// 1.5 Hiển thị gợi ý tìm kiếm
function showSuggestions(query) {
    let suggestionsBox = document.getElementById("search-suggestions");
    let inIframe = false;
    
    if (!suggestionsBox) {
        const headerFrame = document.querySelector(".partial-frame--header");
        if (headerFrame && headerFrame.contentDocument) {
            suggestionsBox = headerFrame.contentDocument.getElementById("search-suggestions");
            inIframe = true;
        }
    }
    
    if (!suggestionsBox) return;

    query = query.trim().toLowerCase();
    if (query === "") {
        suggestionsBox.style.display = "none";
        return;
    }

    if (typeof danhSachSanPham === 'undefined') return;

    let matches = danhSachSanPham.filter(sp => sp.ten.toLowerCase().includes(query));
    
    matches.sort((a, b) => {
        let aStart = a.ten.toLowerCase().startsWith(query);
        let bStart = b.ten.toLowerCase().startsWith(query);
        if (aStart && !bStart) return -1;
        if (!aStart && bStart) return 1;
        return 0;
    });
    
    if (matches.length === 0) {
        suggestionsBox.innerHTML = '<div style="padding: 10px 15px; color: #777; font-size: 14px;">Không tìm thấy sản phẩm</div>';
        suggestionsBox.style.display = "block";
        return;
    }

    matches = matches.slice(0, 5);
    
    suggestionsBox.innerHTML = "";
    matches.forEach(sp => {
        const giaMoi = sp.giaGoc * (100 - sp.phanTramGiam) / 100;
        const item = document.createElement("a");
        item.className = "search-suggestion-item";
        item.href = "chitietsanpham.html?id=" + sp.id;
        
        if (inIframe) {
            item.target = "_parent";
        }
        
        item.innerHTML = `
            <img src="${sp.hinhAnh}" alt="">
            <div class="search-suggestion-info">
                <span class="search-suggestion-name">${sp.ten}</span>
                <span class="search-suggestion-price">${giaMoi.toLocaleString()}đ</span>
            </div>
        `;
        suggestionsBox.appendChild(item);
    });
    
    suggestionsBox.style.display = "block";
}

document.addEventListener("click", function(e) {
    let suggestionsBox = document.getElementById("search-suggestions");
    let searchInput = document.getElementById("search-input");
    
    if (!suggestionsBox && !searchInput) {
        const headerFrame = document.querySelector(".partial-frame--header");
        if (headerFrame && headerFrame.contentDocument) {
            suggestionsBox = headerFrame.contentDocument.getElementById("search-suggestions");
            searchInput = headerFrame.contentDocument.getElementById("search-input");
        }
    }

    if (suggestionsBox && e.target !== searchInput && !suggestionsBox.contains(e.target)) {
        suggestionsBox.style.display = "none";
    }
});

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

// Resize iframe when dropdown shows
window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'resizeHeader') {
        const headerFrame = document.querySelector(".partial-frame--header");
        if (headerFrame) {
            headerFrame.style.height = e.data.height + "px";
        }
    }
});