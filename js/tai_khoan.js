function showAuthMessage(text, type) {
    const el = document.getElementById("auth-message");
    if (!el) return;
    el.textContent = text;
    el.className = "auth-message " + type;
    el.hidden = false;
}

function hideAuthMessage() {
    const el = document.getElementById("auth-message");
    if (el) el.hidden = true;
}

function switchTab(tab) {
    const isLogin = tab === "login";

    document.querySelectorAll(".auth-tab").forEach(btn => {
        const active = btn.dataset.tab === tab;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    document.getElementById("form-login").hidden = !isLogin;
    document.getElementById("form-login").classList.toggle("active", isLogin);
    document.getElementById("form-register").hidden = isLogin;
    document.getElementById("form-register").classList.toggle("active", !isLogin);

    hideAuthMessage();
}

function initTabs() {
    document.querySelectorAll(".auth-tab").forEach(btn => {
        btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });

    const params = new URLSearchParams(window.location.search);
    if (params.get("tab") === "register" || params.get("tab") === "dangky") {
        switchTab("register");
    }
}

function initTogglePassword() {
    document.querySelectorAll(".toggle-password").forEach(btn => {
        btn.addEventListener("click", () => {
            const input = document.getElementById(btn.dataset.target);
            if (!input) return;
            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";
            btn.querySelector("i").className = isPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
        });
    });
}

function redirectAfterLogin() {
    const params = new URLSearchParams(window.location.search);
    const ret = params.get("return");
    window.location.href = ret ? decodeURIComponent(ret) : "trang_chu.html";
}

function renderLoggedInView() {
    const session = getSession();
    if (!session) return false;

    const card = document.querySelector(".auth-card");
    if (!card) return true;

    card.innerHTML =
        '<div class="auth-logged-in">' +
        '<div class="auth-avatar"><i class="fa-solid fa-user"></i></div>' +
        "<h2>Xin chào, " + escapeHtml(session.name) + "!</h2>" +
        "<p><strong>Email:</strong> " + escapeHtml(session.email) + "</p>" +
        (session.phone ? "<p><strong>SĐT:</strong> " + escapeHtml(session.phone) + "</p>" : "") +
        '<div class="auth-logged-actions">' +
        '<a href="trang_chu.html" class="auth-btn auth-btn-outline">Về trang chủ</a>' +
        '<a href="gio_hang.html" class="auth-btn auth-btn-outline">Giỏ hàng</a>' +
        '<button type="button" class="auth-btn" id="btn-logout">Đăng xuất</button>' +
        "</div></div>";

    document.getElementById("btn-logout").addEventListener("click", logoutUser);
    return true;
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function initLoginForm() {
    const form = document.getElementById("form-login");
    if (!form) return;

    const remembered = localStorage.getItem("beauty_remember_email");
    if (remembered) {
        document.getElementById("login-email").value = remembered;
        document.getElementById("login-remember").checked = true;
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        hideAuthMessage();

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;
        const remember = document.getElementById("login-remember").checked;

        if (!email || !password) {
            showAuthMessage("Vui lòng nhập đầy đủ email và mật khẩu.", "error");
            return;
        }

        const result = loginUser(email, password);
        if (!result.ok) {
            showAuthMessage(result.message, "error");
            return;
        }

        setSession(result.user, remember);
        showAuthMessage("Đăng nhập thành công! Đang chuyển hướng...", "success");
        setTimeout(redirectAfterLogin, 800);
    });
}

function initRegisterForm() {
    const form = document.getElementById("form-register");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        hideAuthMessage();

        const name = document.getElementById("reg-name").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const phone = document.getElementById("reg-phone").value.trim();
        const password = document.getElementById("reg-password").value;
        const confirm = document.getElementById("reg-confirm").value;
        const agree = document.getElementById("reg-agree").checked;

        if (!name || !email || !phone || !password) {
            showAuthMessage("Vui lòng điền đầy đủ thông tin.", "error");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showAuthMessage("Email không hợp lệ.", "error");
            return;
        }

        if (!/^0\d{9}$/.test(phone)) {
            showAuthMessage("Số điện thoại phải có 10 số và bắt đầu bằng 0.", "error");
            return;
        }

        if (password.length < 6) {
            showAuthMessage("Mật khẩu tối thiểu 6 ký tự.", "error");
            return;
        }

        if (password !== confirm) {
            showAuthMessage("Mật khẩu xác nhận không khớp.", "error");
            return;
        }

        if (!agree) {
            showAuthMessage("Bạn cần đồng ý điều khoản sử dụng.", "error");
            return;
        }

        const result = registerUser({ name, email, phone, password });
        if (!result.ok) {
            showAuthMessage(result.message, "error");
            return;
        }

        showAuthMessage(result.message, "success");
        form.reset();
        setTimeout(() => switchTab("login"), 1200);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (renderLoggedInView()) return;
    initTabs();
    initTogglePassword();
    initLoginForm();
    initRegisterForm();
});
