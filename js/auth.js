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
    
    // Support finding inside iframes
    const frames = document.querySelectorAll(".partial-frame--header");
    let docs = [document];
    frames.forEach(f => {
        try {
            if (f.contentDocument) docs.push(f.contentDocument);
        } catch(e) {}
    });

    docs.forEach(doc => {
        const header = doc.querySelector(".header-icons");
        if (!header) return;

        // Find the user link by icon class inside the header-icon-item
        const userIcon = header.querySelector('.fa-user');
        if (!userIcon) return;
        
        const userLink = userIcon.closest('.header-icon-item');
        if (!userLink) return;

        const textBottom = userLink.querySelector('.text-bottom');
        if (!textBottom) return;

        if (session) {
            userIcon.className = "fa-solid fa-user";
            textBottom.innerText = session.name;
        } else {
            userIcon.className = "fa-regular fa-user";
            textBottom.innerText = "Đăng nhập";
        }
    });
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
