// LOAD DỮ LIỆU RA GIOHANG.HTML
function loadCart(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let body = document.getElementById("cart-body");

    if(!body) return;

    if (cart.length === 0) {
        body.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:30px;">Giỏ hàng của bạn đang trống!</td></tr>';
        document.getElementById("subtotal").innerText = "0đ";
        document.getElementById("shipping").innerText = "0đ";
        document.getElementById("total").innerText = "0đ";
        return;
    }

    let html = "";
    let subtotal = 0;

    cart.forEach((item,index) => {
        let hinhAnh = item.hinhAnh || item.image || '';
        let ten = item.ten || item.name || 'Sản phẩm';
        let gia = item.gia || item.price || 0;

        subtotal += gia * item.quantity;

        html += `
        <tr>
            <td>
                <div class="product-info">
                    <img src="${hinhAnh}">
                    <span>${ten}</span>
                </div>
            </td>
            <td>${gia.toLocaleString()}đ</td>
            <td>
                <div class="quantity-box">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                 </div>
            </td>
            <td>${(gia * item.quantity).toLocaleString()}đ</td>
            <td>
                <button class="delete-btn" onclick="removeItem(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    });

    body.innerHTML = html;

    // phí ship
    let shipping = 0;
    let total = subtotal + shipping;

    document.getElementById("subtotal").innerText = subtotal.toLocaleString() + "đ";
    document.getElementById("shipping").innerText = shipping.toLocaleString() + "đ";
    document.getElementById("total").innerText = total.toLocaleString() + "đ";
}

// THAY ĐỔI SỐ LƯỢNG
function changeQuantity(index, amount){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += amount;

    if(cart[index].quantity <= 0){
        cart.splice(index,1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    if(typeof updateCartCount === 'function') updateCartCount();
    window.dispatchEvent(new Event('storage'));
}

// XÓA SẢN PHẨM KHỎI GIỎ
function removeItem(index){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index,1);
    
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    if(typeof updateCartCount === 'function') updateCartCount();
    window.dispatchEvent(new Event('storage'));
}

// CHẠY KHI LOAD TRANG
document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});
