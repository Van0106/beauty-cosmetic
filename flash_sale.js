
document.addEventListener("DOMContentLoaded", function () {

    if (typeof danhSachSanPham === 'undefined') {
        console.error("Lỗi: Không tìm thấy mảng 'danhSachSanPham'. Vui lòng kiểm tra lại file sanpham.js!");
        return;
    }

    const sanPhamFlashSale = danhSachSanPham.filter(sp => sp.phanTramGiam >= 15);
    const container = document.getElementById("danh-sach-flash-sale");
    if (!container) return;
    container.innerHTML = ""; 

    function formatMoney(num) {
        return Math.round(num).toLocaleString('vi-VN') + 'đ';
    }

    sanPhamFlashSale.forEach(sp => {
        const giaSauGiam = sp.giaGoc * (1 - sp.phanTramGiam / 100);
        const phanTramDaBan = Math.floor(Math.random() * (95 - 50 + 1)) + 50;
        const cardHTML = `
            <div class="product-card">
                <span class="sale">-${sp.phanTramGiam}%</span>
                
                <a href="chi_tiet.html?id=${sp.id}">
                    <img src="${sp.hinhAnh}" alt="${sp.ten}">
                </a>
                
                <h3>
                    <a href="chi_tiet.html?id=${sp.id}" style="color: inherit; text-decoration: none;">
                        ${sp.ten}
                    </a>
                </h3>

                <div class="price">
                    <span class="new-price">${formatMoney(giaSauGiam)}</span>
                    <span class="old-price">${formatMoney(sp.giaGoc)}</span>
                </div>

                <div class="sold-bar">
                    <div class="sold-process" style="width: ${phanTramDaBan}%;"></div>
                </div>
                <p class="sold-text">Đã bán ${phanTramDaBan}%</p>

                <a href="chi_tiet.html?id=${sp.id}">
                    <button>Xem chi tiết</button>
                </a>
            </div>
        `;

        container.innerHTML += cardHTML;
    });
});


const flashTimes = [2, 9, 12, 15, 17];
const saleDuration = 2; //sale 2 tiếng
const now = new Date();
const currentHour = now.getHours();
let activeIndex = -1;
let startHour = 0;
let endHour = 0;


for(let i = 0; i < flashTimes.length; i++){
    let start = flashTimes[i];
    let end = start + saleDuration;
    if(currentHour >= start && currentHour < end){
        activeIndex = i;
        startHour = start;
        endHour = end;
        break;
    }
}


const flashItems =
document.querySelectorAll(".flash-time");

const statusText =
document.getElementById("flash-status");

if(activeIndex !== -1){
    flashItems.forEach((item,index)=>{
        item.classList.remove("active");
        if(index === activeIndex){
            item.classList.add("active");
            item.querySelector("p").innerHTML =
            "Đang diễn ra";
        }else{
            item.querySelector("p").innerHTML =
            "Sắp diễn ra";
        }
    });
}else{

    let nextIndex = 0;
    for(let i = 0; i < flashTimes.length; i++){
        if(currentHour < flashTimes[i]){
            nextIndex = i;
            break;
        }
        if(currentHour >= flashTimes[flashTimes.length - 1]){
            nextIndex = 0;
        }
    }

    flashItems.forEach((item,index)=>{
        item.classList.remove("active");
        if(index === nextIndex){
            item.classList.add("active");
        }
        item.querySelector("p").innerHTML =
        "Sắp diễn ra";
    });
}

const targetTime = new Date();

if(activeIndex !== -1){
    statusText.innerHTML =
    " kết thúc trong:";
    targetTime.setHours(endHour);
    if(endHour >= 24){
        targetTime.setDate(targetTime.getDate() + 1);
        targetTime.setHours(endHour - 24);
    }

}else{
    statusText.innerHTML =
    "Flash Sale bắt đầu trong:";
    let nextHour = 0;
    for(let i = 0; i < flashTimes.length; i++){
        if(currentHour < flashTimes[i]){
            nextHour = flashTimes[i];
            break;
        }
    }

    if(currentHour >= flashTimes[flashTimes.length - 1]){
        nextHour = flashTimes[0] + 24;
    }

    if(nextHour >= 24){
        targetTime.setDate(targetTime.getDate() + 1);
        targetTime.setHours(nextHour - 24);
    }else{
        targetTime.setHours(nextHour);
    }

}

targetTime.setMinutes(0);
targetTime.setSeconds(0);

function updateCountdown(){
    const now = new Date().getTime();
    const distance =
    targetTime.getTime() - now;

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );
    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    document.getElementById("hours").innerHTML =
    String(hours).padStart(2,'0');

    document.getElementById("minutes").innerHTML =
    String(minutes).padStart(2,'0');

    document.getElementById("seconds").innerHTML =
    String(seconds).padStart(2,'0');
   
    if(distance < 0){
        location.reload();
    }

}

setInterval(updateCountdown,1000);

updateCountdown();

