let perPage =
window.innerWidth <= 768 ? 4 : 8;

window.addEventListener("resize", () => {

    perPage =
    window.innerWidth <= 768 ? 4 : 8;

    currentPage = 1;
    renderProducts();
});

let currentPage = 1;

const promoGrid =
document.getElementById("promoGrid");

let saleProducts =

danhSachSanPham.filter(
    sp => sp.phanTramGiam > 0
);

// ====================
// RENDER
// ====================

function renderProducts(){

    promoGrid.innerHTML = "";

    const start =
    (currentPage - 1) * perPage;

    const end =
    start + perPage;

    saleProducts
    .slice(start,end)
    .forEach(sp=>{

        const giaMoi =
        sp.giaGoc *
        (100 - sp.phanTramGiam)
        / 100;

        promoGrid.innerHTML += `

        <div
        class="card promo-card"
        data-price="${giaMoi}"
        data-sale="${sp.phanTramGiam}"
        >

            <span class="sale">
                -${sp.phanTramGiam}%
            </span>

            <img
            src="${sp.hinhAnh}"
            alt="${sp.ten}"
            >

            <h4>
                ${sp.ten}
            </h4>

            <div class="old-price">
                ${sp.giaGoc.toLocaleString()}đ
            </div>

            <div class="price">
                ${giaMoi.toLocaleString()}đ
            </div>

            <div class="action">

                <a href="chitietsanpham.html?id=${sp.id}">
                    Xem
                </a>

            </div>

        </div>

        `;
    });

    updatePagination();
}

function updatePagination(){

    const totalPages =

    Math.ceil(
        saleProducts.length / perPage
    );

    const box =
    document.querySelector(
        ".pagination"
    );

    box.innerHTML = "";

    for(
        let i = 1;
        i <= totalPages;
        i++
    ){

        const btn =
        document.createElement(
            "button"
        );

        btn.innerText = i;

        if(i === currentPage){

            btn.classList.add(
                "active"
            );
        }

        btn.onclick = ()=>{

            currentPage = i;

            renderProducts();
        };

        box.appendChild(btn);
    }
}

function sortProducts(){

    const value =
    document.querySelector(".sort").value;

    if(value === "Giá thấp đến cao"){

        saleProducts.sort((a,b)=>
            (a.giaGoc*(100-a.phanTramGiam)/100)
            -
            (b.giaGoc*(100-b.phanTramGiam)/100)
        );

    }

    else if(value === "Giá cao đến thấp"){

        saleProducts.sort((a,b)=>
            (b.giaGoc*(100-b.phanTramGiam)/100)
            -
            (a.giaGoc*(100-a.phanTramGiam)/100)
        );

    }

    else if(value === "Giảm giá nhiều nhất"){

        saleProducts.sort((a,b)=>
            b.phanTramGiam - a.phanTramGiam
        );

    }

    else{

        saleProducts.sort((a,b)=>
            b.id - a.id
        );
    }

    currentPage = 1;

    renderProducts();
}
window.addEventListener(
    "load",
    renderProducts
);

document.querySelector(".sort")
.addEventListener("change", sortProducts);