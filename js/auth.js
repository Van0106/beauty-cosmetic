const AUTH_USERS_KEY = "beauty_users";
const AUTH_SESSION_KEY = "beauty_session";

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_USERS_KEY)) || [];
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function getSession() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY));
    } catch {
        return null;
    }
}

function setSession(user, remember) {
    const session = {
        email: user.email,
        name: user.name,
        phone: user.phone
    };
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    if (remember) {
        localStorage.setItem("beauty_remember_email", user.email);
    } else {
        localStorage.removeItem("beauty_remember_email");
    }
}

function clearSession() {
    localStorage.removeItem(AUTH_SESSION_KEY);
}

function registerUser({ name, email, phone, password }) {
    const users = getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some(u => u.email === normalizedEmail)) {
        return { ok: false, message: "Email này đã được đăng ký." };
    }

    users.push({
        name: name.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        password,
        createdAt: Date.now()
    });

    saveUsers(users);
    return { ok: true, message: "Đăng ký thành công! Vui lòng đăng nhập." };
}

function loginUser(email, password) {
    const users = getUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email === normalizedEmail && u.password === password);

    if (!user) {
        return { ok: false, message: "Email hoặc mật khẩu không đúng." };
    }

    return { ok: true, user };
}

function initAuthHeader() {
    const session = getSession();
    const header = document.querySelector(".header-icons");
    if (!header) return;

    const userLink = header.querySelector('a[title="Đăng nhập"], a[title="Tài khoản"], a[title="Đăng xuất"]');
    if (!userLink) return;

    if (session) {
        userLink.href = "tai_khoan.html";
        userLink.title = "Tài khoản";
        userLink.innerHTML = '<i class="fa-solid fa-user" aria-hidden="true"></i>';
        userLink.onclick = null;
    } else {
        userLink.href = "tai_khoan.html";
        userLink.title = "Đăng nhập";
        userLink.innerHTML = '<i class="fa-regular fa-user" aria-hidden="true"></i>';
        userLink.onclick = null;
    }
}

function logoutUser() {
    clearSession();
    window.location.href = "tai_khoan.html";
}

function requireAuth(redirectTo) {
    if (!getSession()) {
        const next = encodeURIComponent(redirectTo || window.location.pathname.split("/").pop());
        window.location.href = "tai_khoan.html?return=" + next;
        return false;
    }
    return true;
}
