const cart =
JSON.parse(
    localStorage.getItem("cart")
) || [];

const orderItems =
document.getElementById(
    "orderItems"
);

const orderTotal =
document.getElementById(
    "orderTotal"
);

let total = 0;

cart.forEach(item => {

    const thanhTien =
    item.gia * item.quantity;

    total += thanhTien;

    orderItems.innerHTML += `

        <div class="checkout-item">

            <img src="${item.hinhAnh}">

            <div>

                <p>${item.ten}</p>

                <p>
                    ${item.quantity}
                    ×
                    ${item.gia.toLocaleString()}đ
                </p>

            </div>

            <strong>
                ${thanhTien.toLocaleString()}đ
            </strong>

        </div>

    `;
});

const shipping = total >=500000 ? 0 :30000; 

const finalTotal =
total + shipping;

document.getElementById("subTotal").innerText =
total.toLocaleString() + "đ";

document.getElementById("shippingFee").innerText =
shipping.toLocaleString() + "đ";

document.getElementById("orderTotal").innerText =
finalTotal.toLocaleString() + "đ";

function datHang() {
     const currentCart =
    JSON.parse(localStorage.getItem("cart")) || [];

    if(currentCart.length === 0){

        alert("Giỏ hàng đang trống!");

        window.location.href = "gio_hang.html";

        return;
    }

    const fullname =
    document.getElementById("fullname").value.trim();

    const phone =
    document.getElementById("phone").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const address =
    document.getElementById("address").value.trim();

    if(
        !fullname ||
        !phone ||
        !email ||
        !address ||
        !province.value ||
        !district.value ||
        !ward.value
    ){
        alert("Vui lòng nhập đầy đủ thông tin nhận hàng!");
        return;
    }


    // TẠO MÃ ĐƠN HÀNG DUY NHẤT
    const orderCode = Date.now(); 

    // GÓI DỮ LIỆU ĐƠN HÀNG
    const orderData = {
        phone: phone, // Bắt buộc phải có để trang kiểm tra tìm được
        date: new Date().toLocaleDateString("vi-VN"),
        payment: document.querySelector('input[name="paymentMethod"]:checked')?.value || "COD",
        total: finalTotal.toLocaleString() + "đ",
        status: "0" // 0: Đã xác nhận, 1: Chuẩn bị, 2: Giao, 3: Hoàn thành
    };

    // LƯU VÀO LOCALSTORAGE VỚI KEY LÀ "order_" + mã
    localStorage.setItem("order_" + orderCode, JSON.stringify(orderData));

    alert("Đặt hàng thành công! Mã đơn của bạn là: DH" + orderCode);

    // Dọn dẹp giỏ hàng
    localStorage.removeItem("cart");

    // Chuyển trang
    window.location.href = "trang_chu.html";
}

document
.getElementById("btnOrder")
.addEventListener(
    "click",
    datHang
);

// ====================
// DỮ LIỆU ĐỊA CHỈ
// ====================

const addressData = {

    "Hà Nội":{
        "Ba Đình":[
            "Phúc Xá",
            "Trúc Bạch",
            "Ngọc Hà"
        ],
        "Cầu Giấy":[
            "Dịch Vọng",
            "Mai Dịch",
            "Nghĩa Tân"
        ]
    },

    "TP Hồ Chí Minh":{
        "Quận 1":[
            "Bến Nghé",
            "Bến Thành",
            "Cầu Kho"
        ],
        "Quận 7":[
            "Tân Phú",
            "Tân Quy",
            "Phú Mỹ"
        ],
        "Thủ Đức":[
            "Linh Trung",
            "Linh Tây",
            "Hiệp Bình Chánh"
        ]
    },

    "Đà Nẵng":{
        "Hải Châu":[
            "Hòa Thuận Tây",
            "Thanh Bình",
            "Thuận Phước"
        ],
        "Sơn Trà":[
            "An Hải Bắc",
            "An Hải Đông",
            "Mân Thái"
        ]
    },

    "Cần Thơ":{
        "Ninh Kiều":[
            "An Cư",
            "An Hòa",
            "Tân An"
        ]
    },

    "Hải Phòng":{
        "Lê Chân":[
            "An Biên",
            "Dư Hàng",
            "Trại Cau"
        ]
    }

};

const province =
document.getElementById(
    "province"
);

const district =
document.getElementById(
    "district"
);

const ward =
document.getElementById(
    "ward"
);

// LOAD TỈNH

for(let p in addressData){

    province.innerHTML += `
        <option value="${p}">
            ${p}
        </option>
    `;
}

// LOAD QUẬN

province.addEventListener(
    "change",
    function(){

        district.innerHTML =
        `<option value="" disabled selected>
            Chọn Quận/Huyện
        </option>`;

        ward.innerHTML =
        `<option value="" disabled selected>
            Chọn Phường/Xã
        </option>`;

        for(let d in addressData[this.value]){

            district.innerHTML += `
                <option value="${d}">
                    ${d}
                </option>
            `;
        }
    }
);

// LOAD PHƯỜNG

district.addEventListener(
    "change",
    function(){

        ward.innerHTML =
        `<option value="" disabled selected>
            Chọn Phường/Xã
        </option>`;

        const wards =
        addressData[
            province.value
        ][
            district.value
        ];

        wards.forEach(w => {

            ward.innerHTML += `
                <option value="${w}">
                    ${w}
                </option>
            `;
        });
    }
);

const paymentInfo =
document.getElementById("paymentInfo");

document
.querySelectorAll('input[name="paymentMethod"]')
.forEach(radio => {

    radio.addEventListener("change", function(){
    const phoneInput =
    document.getElementById("phone");

    phoneInput.addEventListener("input", () => {

    const transferContent =
    document.getElementById("transferContent");

    if(transferContent){
        transferContent.innerText =
        phoneInput.value || "Nhập SĐT trước";
    }

});
        if(this.value === "bank"){

            paymentInfo.innerHTML = `
                <div class="payment-box">
                    <h6>Thông tin chuyển khoản</h6>

                    <p>
                        Ngân hàng: MB Bank
                    </p>

                    <p>
                        STK: 123456789
                    </p>

                    <p>
                        Chủ TK: NGUYEN THI THANH VAN    
                    </p>
                    <div class="transfer-note">
                       <span>Nội dung chuyển khoản</span>
                       <strong id="transferContent">
                           ${document.getElementById("phone").value.trim() || "Nhập SĐT trước"}
                       </strong>
                    </div>
                </div>
            `;
        }

        else if(this.value === "momo"){

            paymentInfo.innerHTML = `
                <div class="payment-box">
                    <h6>Thanh toán MoMo</h6>

                    <p>
                        SĐT MoMo: 0868515565
                    </p>

                    <p>
                        Chủ TK: Nguyễn Thị Thanh Vân
                    </p>
                    <div class="transfer-note">
                       <span>Nội dung chuyển khoản</span>
                       <strong id="transferContent">
                           ${document.getElementById("phone").value.trim() || "Nhập SĐT trước"}
                       </strong>
                    </div>
                </div>
            `;
        }

        else{

            paymentInfo.innerHTML = "";
        }

    });

});

