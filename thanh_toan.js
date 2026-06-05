const cart =
JSON.parse(
    localStorage.getItem("cart")
) || [];

if(cart.length === 0){

    alert(
        "Giỏ hàng đang trống!"
    );

    window.location.href =
    "gio_hang.html";
}
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

const shipping =
total >= 500000 ? 0 : 30000;

const finalTotal =
total + shipping;

document.getElementById("subTotal").innerText =
total.toLocaleString() + "đ";

document.getElementById("shippingFee").innerText =
shipping.toLocaleString() + "đ";

document.getElementById("orderTotal").innerText =
finalTotal.toLocaleString() + "đ";

function datHang(){
    const paymentMethod =
    document.querySelector(
    'input[name="paymentMethod"]:checked'
    );
    const maDon =

    "DH" +

    Date.now();
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
        !ward.value ||
        !paymentMethod
    ){
        alert(
            "Vui lòng nhập đầy đủ thông tin nhận hàng!"
        );
        return;
    }

    if(cart.length === 0){

        alert(
            "Giỏ hàng đang trống!"
        );

        return;
    }

    alert(
        "Đặt hàng thành công!"
    );
    const donHang = {

    maDon: maDon,

    hoTen: fullname,

    soDienThoai: phone,

    tongTien: finalTotal,

    ngayDat: new Date().toLocaleString(),

    sanPham: cart

    };

    let danhSachDonHang =

    JSON.parse(
      localStorage.getItem("orders")
    ) || [];

    danhSachDonHang.push(
      donHang
    );
    
    localStorage.setItem(
      "orders",
      JSON.stringify(danhSachDonHang)
    );

    alert(
      "Đặt hàng thành công!\n\n" +
      "Mã đơn hàng của bạn:\n" +
      maDon
    );
    localStorage.setItem(
      "orders",
      JSON.stringify(danhSachDonHang)
    );

    localStorage.setItem(
       "lastOrderCode",
        maDon
    );

    localStorage.setItem(
     "order_" + maDon,
      JSON.stringify({
      date: new Date().toLocaleString(),
      payment: paymentMethod.value,
      total: finalTotal.toLocaleString() + "đ",
      status: 1
    })
);

    localStorage.removeItem(
     "cart"
    );

    window.location.href =
    
    "trang_chu.html";
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
        `<option value=""selected>
            Chọn Quận/Huyện
        </option>`;

        ward.innerHTML =
        `<option value=""selected>
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
        `<option value=""selected>
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

const paymentRadios =
document.querySelectorAll(
    'input[name="paymentMethod"]'
);

const paymentInfo =
document.getElementById(
    "paymentInfo"
);

paymentRadios.forEach(radio => {

    radio.addEventListener(
        "change",
        function(){

            if(this.value === "bank"){

                paymentInfo.innerHTML = `

                <div class="payment-box">

                    <h6>
                        Thông tin chuyển khoản
                    </h6>

                    <p>
                        Ngân hàng: MB Bank
                    </p>

                    <p>
                        STK: 0868515565
                    </p>

                    <p>
                        Chủ tài khoản:
                        NGUYEN THI THANH VAN
                    </p>

                </div>

                `;
            }

            else if(
                this.value === "momo"
            ){

                paymentInfo.innerHTML = `

                <div class="payment-box">

                    <h6>
                        Thanh toán MoMo
                    </h6>

                    <p>
                        SĐT: 0868515565
                    </p>

                    <p>
                        Chủ ví:
                        NGUYEN THI THANH VAN
                    </p>

                </div>

                `;
            }

            else{

                paymentInfo.innerHTML = "";

            }
        }
   );
});
