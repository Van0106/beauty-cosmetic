let perPage =
window.innerWidth <= 768 ? 4 : 8;

window.addEventListener("resize", () => {
    perPage =
    window.innerWidth <= 768 ? 4 : 8;

    currentPage = 1;
    renderProducts();
});

let currentPage = 1;

let allCards = [];

const grid =
document.getElementById("productGrid");

function loadProducts(){

    if(!grid) return;

    grid.innerHTML = "";

    danhSachSanPham.forEach(sp=>{

        const giaMoi =
        sp.giaGoc *
        (100 - sp.phanTramGiam)
        / 100;

        grid.innerHTML += `
        <div
            class="card"
            data-category="${sp.danhMuc}"
            data-brand="${sp.thuongHieu.toLowerCase()}"
            data-price="${giaMoi}"
        >

            <span class="sale">
                -${sp.phanTramGiam}%
            </span>

            <img src="${sp.hinhAnh}">

            <h4>${sp.ten}</h4>

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

    allCards =
    [...document.querySelectorAll(".card")];

    renderProducts();
}

function renderProducts(){

    const visibleCards =
    allCards.filter(
        card => card.dataset.hidden !== "true"
    );

    grid.innerHTML = "";

    const start =
    (currentPage - 1) * perPage;

    const end =
    start + perPage;

    const countText =
    document.querySelector(".product-count");

    if(countText){
    countText.innerText =
    `Hiển thị ${start + 1}-${Math.min(end, visibleCards.length)} / ${visibleCards.length} sản phẩm`;
}

    visibleCards
    .slice(start, end)
    .forEach(card => {
        grid.appendChild(card);
    });

    updatePagination(
        visibleCards.length
    );
}

function updatePagination(total){

    const box =
    document.querySelector(".pagination");

    box.innerHTML = "";

    const totalPages =
    Math.ceil(total / perPage);

    for(let i=1;i<=totalPages;i++){

        const btn =
        document.createElement("button");

        btn.innerText = i;

        if(i === currentPage){
            btn.classList.add("active");
        }

        btn.onclick = ()=>{

            currentPage = i;

            renderProducts();
        };

        box.appendChild(btn);
    }
}

function filterProducts(){

    const categories =
    [...document.querySelectorAll(".category:checked")]
    .map(x=>x.value);

    const brands =
    [...document.querySelectorAll(".brand:checked")]
    .map(x=>x.value);

    const price =
    document.querySelector(
        'input[name="price"]:checked'
    );

    allCards.forEach(card=>{

        let hide = false;

        const p =
        parseInt(card.dataset.price) / 1000;

        if(window.searchFilterQuery){
            const name = card.querySelector("h4").textContent.toLowerCase();
            if(!name.includes(window.searchFilterQuery)){
                hide = true;
            }
        }

        if(
            categories.length &&
            !categories.includes(card.dataset.category)
        ){
            hide = true;
        }

        if(
            brands.length &&
            !brands.includes(card.dataset.brand)
        ){
            hide = true;
        }

        if(price){

            const value = price.value;

            if(
                value==="200" &&
                p>=200
            ){
                hide=true;
            }

            if(
                value==="500" &&
                (
                    p<200 ||
                    p>500
                )
            ){
                hide=true;
            }

            if(
                value==="9999" &&
                p<=500
            ){
                hide=true;
            }
        }

        card.dataset.hidden = hide;
    });

    currentPage = 1;

    renderProducts();
}

function sortProducts() {

    const value =
    document.querySelector(".sort").value;

    allCards.sort((a,b)=>{

        const pa = +a.dataset.price;
        const pb = +b.dataset.price;

        if(value === "Giá từ thấp đến cao"){
            return pa - pb;
        }

        if(value === "Giá từ cao đến thấp"){
            return pb - pa;
        }

        if(value === "Mới nhất"){
            return 0;
        }

    });

    currentPage = 1;

    renderProducts();
}


document.querySelectorAll('input[name="price"]').forEach(radio => {

    radio.addEventListener('click', function() {

        if (this.dataset.checked === "true") {

            this.checked = false;
            this.dataset.checked = "false";

            filterProducts();

        } else {

            document
            .querySelectorAll('input[name="price"]')
            .forEach(r => r.dataset.checked = "false");

            this.dataset.checked = "true";
        }

    });

});

window.addEventListener("load", () => {

    loadProducts();

    loadCategoryFromUrl();

});
