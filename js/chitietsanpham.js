const TEN_DANH_MUC = {
    chamsocda: "Chăm sóc da",
    trangdiem: "Trang điểm",
    chongnang: "Chống nắng",
    chamsoctoc: "Chăm sóc tóc"
};

function getProductIdFromUrl() {
    const id = parseInt(new URLSearchParams(window.location.search).get("id"), 10);
    return Number.isFinite(id) ? id : 1;
}

function formatPriceVnd(gia) {
    return gia.toLocaleString("vi-VN") + "đ";
}

function tinhGiaBan(sp) {
    return Math.round(sp.giaGoc * (100 - sp.phanTramGiam) / 100);
}

function laySanPhamTheoId(id) {
    return danhSachSanPham.find(sp => sp.id === id);
}

function trichDungTich(ten) {
    const match = ten.match(/\d+(?:\.\d+)?\s*(?:ml|g|kg|l|oz)/i);
    return match ? match[0] : "Theo quy cách đóng gói";
}

function layMoTa(sp) {
    if (sp.moTa) return sp.moTa;
    return sp.ten + " thuộc thương hiệu " + sp.thuongHieu +
        ". Sản phẩm chính hãng, cam kết chất lượng tại Beauty Cosmetic.";
}

function layThanhPhan(sp) {
    if (sp.thanhPhan) return sp.thanhPhan;

    const map = {
        chamsocda: "<strong>Thành phần nổi bật:</strong><br>- <em>Hyaluronic Acid & Glycerin:</em> Cấp nước tức thì, giữ cho làn da luôn căng mọng và ngậm nước.<br>- <em>Niacinamide (Vitamin B3):</em> Hỗ trợ làm sáng da, mờ thâm nám và thu nhỏ lỗ chân lông.<br>- <em>Chiết xuất thiên nhiên:</em> Làm dịu da, giảm kích ứng, phù hợp với làn da nhạy cảm nhất.<br>Cam kết không chứa paraben, cồn khô hay hương liệu gây hại, an toàn tuyệt đối cho người sử dụng.",
        trangdiem: "<strong>Thành phần nổi bật:</strong><br>- <em>Hạt phấn siêu mịn (Micro-powder):</em> Giúp che phủ khuyết điểm hoàn hảo mà không làm bí da hay nặng mặt.<br>- <em>Dầu dưỡng ẩm tự nhiên:</em> Ngăn ngừa tình trạng mốc nền (cakey), giữ cho lớp trang điểm mướt mịn.<br>- <em>Khoáng chất tự nhiên:</em> Giúp bắt sáng nhẹ nhàng, tạo hiệu ứng rạng rỡ và lâu trôi suốt cả ngày.",
        chongnang: "<strong>Thành phần nổi bật:</strong><br>- <em>Màng lọc UV thế hệ mới:</em> Bảo vệ da tối ưu khỏi cả tia UVA và UVB, ngăn ngừa sạm nám và lão hóa sớm.<br>- <em>Zinc Oxide & Titanium Dioxide:</em> Tạo màng chắn vật lý an toàn, lành tính trên bề mặt da.<br>- <em>Vitamin E & tinh chất rau má:</em> Dưỡng ẩm, chống oxy hóa và làm dịu vùng da bị cháy nắng.",
        chamsoctoc: "<strong>Thành phần nổi bật:</strong><br>- <em>Keratin & Axit Amin:</em> Thâm nhập sâu vào lõi tóc, lấp đầy các khoảng trống hư tổn, giúp tóc chắc khỏe từ gốc.<br>- <em>Tinh dầu Argan / Tsubaki:</em> Cung cấp độ ẩm dồi dào, mang lại mái tóc bóng mượt, vào nếp tức thì.<br>- <em>Protein lúa mì:</em> Tạo lớp màng bảo vệ tóc trước tác động của nhiệt độ (máy sấy, máy uốn) và khói bụi."
    };

    return map[sp.danhMuc] || "Sản phẩm chứa các thành phần được chọn lọc kỹ lưỡng, đạt tiêu chuẩn chất lượng và an toàn tuyệt đối cho người sử dụng. Không chứa các chất gây kích ứng.";
}

function layHuongDan(sp) {
    if (sp.huongDan) return sp.huongDan;

    const map = {
        chamsocda: "<strong>Hướng dẫn sử dụng chi tiết:</strong><br>1. Làm sạch da mặt bằng nước tẩy trang và sữa rửa mặt.<br>2. Cân bằng da với toner/nước hoa hồng.<br>3. Lấy một lượng sản phẩm vừa đủ (khoảng 1-2 hạt đậu) chấm đều lên 5 điểm trên mặt (trán, mũi, cằm, hai má).<br>4. Massage nhẹ nhàng theo chiều từ dưới lên trên, từ trong ra ngoài để dưỡng chất thẩm thấu hoàn toàn.<br><em>Lưu ý: Dùng đều đặn mỗi sáng và tối để đạt hiệu quả tốt nhất.</em>",
        trangdiem: "<strong>Hướng dẫn sử dụng chi tiết:</strong><br>1. Hoàn thành các bước dưỡng da cơ bản trước khi trang điểm.<br>2. Dùng cọ, bông mút hoặc ngón tay để lấy một lượng sản phẩm vừa đủ.<br>3. Tán đều sản phẩm lên các vùng cần che phủ hoặc tạo điểm nhấn.<br>4. Có thể dặm thêm nhiều lớp mỏng để đạt độ che phủ như mong muốn mà không sợ lớp nền bị dày.<br><em>Lưu ý: Luôn tẩy trang kỹ lưỡng vào cuối ngày để bảo vệ da.</em>",
        chongnang: "<strong>Hướng dẫn sử dụng chi tiết:</strong><br>1. Sử dụng vào buổi sáng, ở bước cuối cùng của chu trình dưỡng da (trước khi trang điểm).<br>2. Lấy một lượng kem vừa đủ (khoảng 2 đốt ngón tay cho toàn mặt).<br>3. Chấm đều và vỗ nhẹ nhàng để kem tệp vào da, không miết mạnh để tránh làm vỡ màng lọc UV.<br><em>Lưu ý: Nên thoa kem trước khi ra nắng khoảng 15-20 phút. Đừng quên thoa lại sau mỗi 2-3 giờ nếu hoạt động ngoài trời liên tục.</em>",
        chamsoctoc: "<strong>Hướng dẫn sử dụng chi tiết:</strong><br>1. Làm ướt toàn bộ tóc và da đầu bằng nước ấm.<br>2. Lấy một lượng sản phẩm vừa đủ ra tay, tạo bọt và thoa đều lên da đầu và ngọn tóc.<br>3. Massage nhẹ nhàng da đầu bằng phần thịt của ngón tay trong 2-3 phút để làm sạch bụi bẩn và kích thích tuần hoàn máu.<br>4. Xả sạch lại với nước. Có thể dùng thêm dầu xả hoặc kem ủ ở phần ngọn tóc để tăng cường độ bóng mượt."
    };

    return map[sp.danhMuc] || "Vui lòng đọc kỹ hướng dẫn sử dụng in trên bao bì trước khi dùng. Nếu có bất kỳ dấu hiệu kích ứng nào, hãy ngưng sử dụng và tham khảo ý kiến chuyên gia.";
}

function layLoaiPhuHop(sp) {
    if (sp.loaiDa) return sp.loaiDa;

    const map = {
        chamsocda: "Mọi loại da",
        trangdiem: "Mọi loại da",
        chongnang: "Mọi loại da",
        chamsoctoc: "Mọi loại tóc"
    };

    return map[sp.danhMuc] || "Phù hợp đa dạng nhu cầu";
}

function loadProductDetail() {
    const sp = laySanPhamTheoId(getProductIdFromUrl());

    if (!sp) {
        document.getElementById("product-name").textContent = "Không tìm thấy sản phẩm";
        return;
    }

    const giaBan = tinhGiaBan(sp);
    const daBan = sp.daBan || (50 + sp.id * 17 % 280);

    document.title = sp.ten + " - Beauty Cosmetic Beauty";

    const mainImg = document.getElementById("product-image");
    mainImg.src = sp.hinhAnh;
    mainImg.alt = sp.ten;

    document.querySelectorAll(".main-image img, .thumbnail-row img").forEach(img => {
        img.src = sp.hinhAnh;
        img.alt = sp.ten;
    });

    document.getElementById("product-name").textContent = sp.ten;
    document.getElementById("product-sold").textContent = daBan + " Đã bán";
    document.getElementById("product-price").textContent = formatPriceVnd(giaBan);

    const oldPriceEl = document.getElementById("product-old-price");
    const saleBadge = document.getElementById("product-sale-badge");

    if (sp.phanTramGiam > 0) {
        oldPriceEl.textContent = formatPriceVnd(sp.giaGoc);
        oldPriceEl.style.display = "";
        saleBadge.textContent = "-" + sp.phanTramGiam + "%";
        saleBadge.style.display = "";
    } else {
        oldPriceEl.style.display = "none";
        saleBadge.style.display = "none";
    }

    let extraDesc = "";
    let packagingImg = "";
    if (sp.danhMuc === 'chamsocda') {
        extraDesc = "Được thiết kế với công thức vượt trội, sản phẩm thẩm thấu sâu vào các lớp biểu bì, giúp nuôi dưỡng làn da từ sâu bên trong. Sử dụng thường xuyên sẽ mang lại làn da căng bóng, mịn màng và rạng rỡ. Hơn nữa, bao bì của hãng luôn đề cao tính tối giản nhưng vô cùng sang trọng, chất liệu thủy tinh/nhựa cao cấp giúp bảo quản dưỡng chất tốt nhất.";
        packagingImg = "images/skincare_packaging.png";
    } else if (sp.danhMuc === 'trangdiem') {
        extraDesc = "Sở hữu kết cấu mỏng nhẹ nhưng độ che phủ cực tốt, mang đến lớp nền hoàn hảo không tì vết. Thiết kế nhỏ gọn, tiện lợi để mang theo bất cứ đâu. Vỏ ngoài tinh xảo với các điểm nhấn kim loại và màu sắc pastel nhã nhặn, tôn lên vẻ thanh lịch của người dùng.";
        packagingImg = "images/makeup_packaging.png";
    } else if (sp.danhMuc === 'chongnang') {
        extraDesc = "Tạo màng lọc tia UV mạnh mẽ, bảo vệ da tối ưu khỏi tác hại của ánh nắng mặt trời, ngăn ngừa lão hóa. Thiết kế dạng tuýp hoặc chai thông minh giúp dễ dàng kiểm soát lượng kem lấy ra, đồng thời nắp vặn chắc chắn đảm bảo không bị tràn khi để trong túi xách.";
        packagingImg = "images/sunscreen_packaging.png";
    } else {
        extraDesc = "Cung cấp độ ẩm và dưỡng chất thiết yếu, chăm sóc mái tóc khỏe đẹp từ gốc đến ngọn. Bao bì được thiết kế với dung tích lớn, vòi pump vô cùng tiện dụng và chắc tay, màu sắc tinh tế làm bừng sáng cả không gian phòng tắm của bạn.";
        packagingImg = "images/haircare_packaging.png";
    }

    document.getElementById("tab-mota").innerHTML =
        "<p style='font-size: 16px;'><strong>" + sp.ten + "</strong> là dòng sản phẩm cao cấp thuộc thương hiệu danh tiếng <strong>" + sp.thuongHieu + "</strong>, được rất nhiều tín đồ làm đẹp săn đón nhờ chất lượng vượt trội.</p>" +
        "<p style='line-height: 1.8;'>" + layMoTa(sp) + "</p>" +
        "<p style='line-height: 1.8;'>" + extraDesc + "</p>" +
        "<p style='background-color: #fcfcfc; padding: 15px; border-left: 4px solid #E85D8E; margin-top: 20px;'>" +
        "<strong>Vì sao bạn nên mua hàng tại Beauty Cosmetic?</strong><br>" +
        "✔ Cam kết hàng chính hãng 100% từ thương hiệu " + sp.thuongHieu + ".<br>" +
        "✔ Hỗ trợ đổi trả miễn phí trong vòng 7 ngày nếu có lỗi từ nhà sản xuất.<br>" +
        "✔ Miễn phí giao hàng toàn quốc cho đơn hàng từ 500k.</p>";

    document.getElementById("tab-thongso").innerHTML =
        "<table style='width: 100%; border-collapse: collapse; margin-top: 10px;'>" +
        "  <tr><th style='text-align: left; padding: 10px; border-bottom: 1px solid #ddd; width: 30%;'>Thương hiệu</th><td style='padding: 10px; border-bottom: 1px solid #ddd;'>" + sp.thuongHieu + "</td></tr>" +
        "  <tr><th style='text-align: left; padding: 10px; border-bottom: 1px solid #ddd;'>Danh mục</th><td style='padding: 10px; border-bottom: 1px solid #ddd;'>" + (TEN_DANH_MUC[sp.danhMuc] || sp.danhMuc) + "</td></tr>" +
        "  <tr><th style='text-align: left; padding: 10px; border-bottom: 1px solid #ddd;'>Quy cách / Dung tích</th><td style='padding: 10px; border-bottom: 1px solid #ddd;'>" + trichDungTich(sp.ten) + "</td></tr>" +
        "  <tr><th style='text-align: left; padding: 10px; border-bottom: 1px solid #ddd;'>Loại da / tóc phù hợp</th><td style='padding: 10px; border-bottom: 1px solid #ddd;'>" + layLoaiPhuHop(sp) + "</td></tr>" +
        "  <tr><th style='text-align: left; padding: 10px; border-bottom: 1px solid #ddd;'>Xuất xứ thương hiệu</th><td style='padding: 10px; border-bottom: 1px solid #ddd;'>Theo thông tin in trên bao bì sản phẩm</td></tr>" +
        "  <tr><th style='text-align: left; padding: 10px; border-bottom: 1px solid #ddd;'>Hạn sử dụng</th><td style='padding: 10px; border-bottom: 1px solid #ddd;'>3 năm kể từ ngày sản xuất (xem trên bao bì)</td></tr>" +
        "</table>";

    document.getElementById("tab-thanhphan").innerHTML = "<p>" + layThanhPhan(sp) + "</p>";
    document.getElementById("tab-hdsd").innerHTML = "<p>" + layHuongDan(sp) + "</p>";
}

function initQuantityControls() {
    const btnDecrease = document.getElementById("btn-decrease");
    const btnIncrease = document.getElementById("btn-increase");
    const qtyInput = document.getElementById("quantity-input");

    if (!btnDecrease || !btnIncrease || !qtyInput) return;

    btnDecrease.addEventListener("click", () => {
        const val = parseInt(qtyInput.value, 10);
        if (val > 1) qtyInput.value = val - 1;
    });

    btnIncrease.addEventListener("click", () => {
        qtyInput.value = parseInt(qtyInput.value, 10) + 1;
    });
}

function initProductTabs() {
    const tabItems = document.querySelectorAll(".tab-item");
    const tabContents = {
        mota: document.getElementById("tab-mota"),
        thongso: document.getElementById("tab-thongso"),
        thanhphan: document.getElementById("tab-thanhphan"),
        hdsd: document.getElementById("tab-hdsd"),
        danhgia: document.getElementById("tab-danhgia")
    };

    tabItems.forEach(tab => {
        tab.addEventListener("click", () => {
            tabItems.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            Object.values(tabContents).forEach(c => {
                if (c) c.style.display = "none";
            });

            const target = tabContents[tab.dataset.tab];
            if (target) target.style.display = "block";
        });
    });
}

function initProductGallery() {
    const productImage = document.getElementById("product-image");
    const thumbRow = document.querySelector(".thumbnail-row");

    if (!productImage) return;

    // Do sản phẩm hiện tại chỉ có 1 ảnh duy nhất, ẩn phần hiển thị 5 thumbnail giống nhau đi
    if (thumbRow) {
        thumbRow.style.display = "none";
    }
}

function initAddToCart() {
    const btnAddCart = document.querySelector(".add-cart");
    if (!btnAddCart) return;

    btnAddCart.addEventListener("click", () => {
        const sp = laySanPhamTheoId(getProductIdFromUrl());
        if (!sp) return;
        
        const qtyInput = document.getElementById("quantity-input");
        const quantity = parseInt(qtyInput ? qtyInput.value : 1, 10);
        
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        const existingIndex = cart.findIndex(item => item.id === sp.id);
        if (existingIndex !== -1) {
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push({
                id: sp.id,
                ten: sp.ten,
                hinhAnh: sp.hinhAnh,
                gia: tinhGiaBan(sp),
                quantity: quantity
            });
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        
        if (typeof updateCartCount === 'function') {
            updateCartCount();
        }
        
        // Kích hoạt event storage thủ công trên cùng 1 tab để iframe nhận được cập nhật (trong trường hợp file://)
        window.dispatchEvent(new Event('storage'));
        
        alert("Đã thêm " + quantity + " sản phẩm vào giỏ hàng!");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadHeader().then(() => {
        loadProductDetail();
        initQuantityControls();
        initProductTabs();
        initProductGallery();
        initAddToCart();
    });
});
