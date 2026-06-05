function checkOrder() {


    let code = document.getElementById("orderCode")
        .value.trim().toUpperCase();


    let result = document.getElementById("orderResult");


    // lấy dữ liệu từ localStorage
    let data = localStorage.getItem("order_" + code);


    // nếu không có đơn
    if (!data) {
        result.style.display = "block";
        result.innerHTML = `
            <p style="color:red; font-size:18px;">
                Không tìm thấy mã đơn hàng: ${code}
            </p>
        `;
        return;
    }


    // parse dữ liệu đơn hàng
    let order = JSON.parse(data);


    result.style.display = "block";


    // hiển thị thông tin
    document.getElementById("showCode").innerHTML = code;
    document.getElementById("showDate").innerHTML = order.date;
    document.getElementById("showPayment").innerHTML = order.payment;
    document.getElementById("showTotal").innerHTML = order.total;


    // xử lý trạng thái
    let steps = document.querySelectorAll(".step");


    steps.forEach((step, index) => {
        step.classList.remove("active");


        if (index < order.status) {
            step.classList.add("active");
        }
    });
}


//CẬP NHẬT GIỎ HÀNG
function addToCart(product) {


    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    cart.push(product);


    localStorage.setItem("cart", JSON.stringify(cart));


    updateCartCount(); // cập nhật luôn
}
function updateCartCount() {


    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    let totalQty = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);


    document.querySelector(".cart-badge").innerText = totalQty;
}
window.onload = function () {
    updateCartCount();
};

const lastOrderCode =
localStorage.getItem(
    "lastOrderCode"
);

if(lastOrderCode){

    document.getElementById(
        "orderCode"
    ).value =
    lastOrderCode;

    checkOrder();
}