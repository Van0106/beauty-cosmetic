// Hàm chính: Tìm đơn hàng theo SĐT
function checkOrder() {
    let inputEl = document.getElementById("orderPhone");
    let result = document.getElementById("orderResult");
    let listContainer = document.getElementById("list-container");

    if (!inputEl || !inputEl.value.trim()) {
        alert("Vui lòng nhập số điện thoại!");
        return;
    }

    let inputValue = inputEl.value.trim();
    let foundOrders = [];

    // 1. Quét dữ liệu
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key && key.startsWith("order_")) {
            try {
                let data = JSON.parse(localStorage.getItem(key));
                if (data && (data.phone === inputValue || data.telephone === inputValue)) {
                    data.code = key.replace("order_", "");
                    foundOrders.push(data);
                }
            } catch (e) { console.error(e); }
        }
    }

    // 2. Hiển thị danh sách hoặc báo lỗi
    if (foundOrders.length === 0) {
        alert("Không tìm thấy đơn hàng nào với SĐT này!");
        result.style.display = "none";
        return;
    }

    result.style.display = "block";
    // Ẩn chi tiết đơn cũ khi tìm kiếm mới
    document.getElementById("detail-container").style.display = "none"; 
    
    listContainer.innerHTML = '<h4>Chọn đơn hàng cần xem:</h4>';

    // 3. Tạo nút bấm
    foundOrders.forEach((order) => {
        let btn = document.createElement("button");
        btn.className = "order-item-btn"; // Dùng class CSS tớ đã chỉ cách thêm trước đó
        btn.style.cssText = "display:block; width:100%; padding:10px; margin-bottom:5px; cursor:pointer; background:#fff; border:1px solid #f292b1; border-radius:8px;";
        btn.innerText = `Đơn hàng: ${order.code} - Ngày: ${order.date}`;
        
        btn.addEventListener("click", function() {
            // Highlight nút đang chọn
            document.querySelectorAll('.order-item-btn').forEach(b => b.style.background = "#fff");
            btn.style.background = "#fff5f7";
            
            showDetail(order, order.code);
        });
        
        listContainer.appendChild(btn);
    });
}

// Hàm hiển thị chi tiết khi bấm nút
function showDetail(orderData, code) {
    // Hiện vùng chi tiết
    document.getElementById("detail-container").style.display = "block";
    
    // Bơm dữ liệu
    document.getElementById("showCode").innerText = code;
    document.getElementById("showDate").innerText = orderData.date || "Chưa cập nhật";
    document.getElementById("showPayment").innerText = orderData.payment || "Chưa cập nhật";
    document.getElementById("showTotal").innerText = orderData.total || "0đ";

    // Cập nhật Progress Bar (Status từ 1 đến 4)
    let steps = document.querySelectorAll(".step");
    let currentStatus = parseInt(orderData.status) || 0;
    
    steps.forEach((step, index) => {
        // index chạy từ 0, nên nếu status là 1 thì chỉ phần tử 0 active
        if (index < currentStatus) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
    });
}

// Giỏ hàng
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let badge = document.querySelector(".cart-badge");
    if (badge) badge.innerText = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}
window.onload = updateCartCount;