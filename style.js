// Header - Update giỏ hàng số lượng
function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalQuantity = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
    });

    let cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = totalQuantity;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});

// Footer - Subscribe Email
function subscribeEmail() {

    let email = document.getElementById("newsletter-email").value;
    let message = document.getElementById("newsletter-message");

    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email === "") {
        message.innerHTML = "Vui lòng nhập email";
        message.className = "error";
    }

    else if (!email.match(pattern)) {
        message.innerHTML = "Email không hợp lệ";
        message.className = "error";
    }

    else {
        message.innerHTML = "Đăng ký thành công 💖";
        message.className = "success";
        document.getElementById("newsletter-email").value = "";
    }
}