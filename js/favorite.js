function addToFavorite() {
    let product = {
        name: document.getElementById("product-name").innerText,
        price: document.getElementById("product-price").innerText,
        image: document.getElementById("product-image").src,
        link: window.location.href
    };

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let exists = favorites.find(item => item.link === product.link);

    if (exists) {
        alert("Sản phẩm đã có trong yêu thích 💖");
        return;
    }

    favorites.push(product);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    alert("Đã thêm vào yêu thích 💖");
}
