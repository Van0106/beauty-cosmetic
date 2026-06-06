function checkOrder() {
    let inputEl = document.getElementById("orderPhone");
    let result = document.getElementById("orderResult");

    if (!inputEl) {
        alert("Lỗi: Không tìm thấy ô nhập số điện thoại trên giao diện!");
        return;
    }

    let inputValue = inputEl.value.trim();

    // Nếu người dùng để trống
    if (!inputValue) {
        alert("Vui lòng nhập số điện thoại để kiểm tra!");
        return;
    }

    let targetOrder = null;
    let orderCodeText = "";

    // Quét localStorage tìm kiếm theo số điện thoại
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key && key.startsWith("order_")) {
            try {
                let orderData = JSON.parse(localStorage.getItem(key));
                if (orderData && (orderData.phone === inputValue || orderData.telephone === inputValue)) {
                    targetOrder = orderData;
                    orderCodeText = key.replace("order_", "");
                }
            } catch (e) {
                console.error("Lỗi đọc dữ liệu:", e);
            }
        }
    }

    // Nếu không tìm thấy
    if (!targetOrder) {
        alert("Không tìm thấy đơn hàng nào gắn với số điện thoại này!");
        result.style.display = "none";
        return;
    }

    // Hiển thị vùng kết quả và cập nhật nội dung chữ
    result.style.display = "block";
    document.getElementById("showCode").innerText = orderCodeText;
    document.getElementById("showDate").innerText = targetOrder.date || "Chưa cập nhật";
    document.getElementById("showPayment").innerText = targetOrder.payment || "Chưa cập nhật";
    document.getElementById("showTotal").innerText = targetOrder.total || "0đ";

    // Cập nhật trạng thái các bước (Thêm/Xóa class active)
    let steps = document.querySelectorAll(".step");
    let currentStatus = parseInt(targetOrder.status) || 0;

    steps.forEach((step, index) => {
        if (index < currentStatus) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
    });
}

// --- QUẢN LÝ GIỎ HÀNG (GIỮ NGUYÊN) ---
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    let badge = document.querySelector(".cart-badge");
    if (badge) badge.innerText = totalQty;
}

window.onload = function () {
    updateCartCount();
};

// Tự động tạo đơn hàng mẫu để chạy thử nghiệm (F5 lại trang là có)
localStorage.setItem("order_TEST123", JSON.stringify({
    phone: "0912345678",
    date: "05/06/2026",
    payment: "Thanh toán khi nhận hàng (COD)",
    total: "550.000đ",
    status: 2
}));