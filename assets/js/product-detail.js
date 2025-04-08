// Hàm hiển thị thông tin sản phẩm
function loadProductDetails() {
  console.log("Local Storage Product:", localStorage.getItem("currentProduct"));
  const productInfo = JSON.parse(localStorage.getItem("currentProduct"));

  if (!productInfo) {
    console.error("Không tìm thấy thông tin sản phẩm");
    document.getElementById("mainProductImage").alt = "Không tìm thấy sản phẩm";
    document.getElementById("productTitle").textContent =
      "Không tìm thấy sản phẩm";
    return;
  }

  console.log("Product Info:", productInfo);
  let imageSrc = productInfo.image;
  if (imageSrc && !imageSrc.startsWith("/")) {
    imageSrc = "/" + imageSrc;
  }
  console.log("Image Source:", imageSrc);

  const mainImage = document.getElementById("mainProductImage");
  mainImage.onerror = function () {
    console.error("Không thể tải ảnh:", this.src);
    this.src = "/assets/imgs/placeholder.jpg";
    this.alt = "Không thể tải ảnh sản phẩm";
  };
  mainImage.src = imageSrc || "/assets/imgs/placeholder.jpg";

  document.getElementById("productTitle").textContent =
    productInfo.name || "Tên sản phẩm";
  document.getElementById("productPrice").textContent = `Giá: ${parseInt(
    productInfo.price
  ).toLocaleString("vi-VN")} VNĐ`;

  // Xử lý gallery ảnh
  const thumbnailImages = document.getElementById("thumbnailImages");
  thumbnailImages.innerHTML = "";
  const productImages = [
    imageSrc,
    "/assets/imgs/hunter1.webp",
    "/assets/imgs/hunter1.webp",
  ].filter(Boolean);

  productImages.forEach((src, index) => {
    const thumbnailImg = document.createElement("img");
    thumbnailImg.onerror = function () {
      console.error("Không thể tải thumbnail:", this.src);
      this.style.display = "none";
    };
    thumbnailImg.src = src;
    thumbnailImg.alt = `Ảnh sản phẩm ${index + 1}`;
    if (index === 0) {
      thumbnailImg.classList.add("active");
    }

    thumbnailImg.addEventListener("click", () => {
      mainImage.src = src;
      thumbnailImages
        .querySelectorAll("img")
        .forEach((img) => img.classList.remove("active"));
      thumbnailImg.classList.add("active");
    });

    thumbnailImages.appendChild(thumbnailImg);
  });
}

// Hàm xử lý size, màu và thêm vào giỏ hàng
function loadSizeAndColorOptions() {
  const sizes = [
    { value: "36", available: true },
    { value: "37", available: true },
    { value: "38", available: true },
    { value: "39", available: true },
    { value: "40", available: true },
    { value: "41", available: true },
    { value: "42", available: true },
  ];

  const colors = [
    { name: "Đen", code: "#000000", available: true },
    { name: "Trắng", code: "#FFFFFF", available: true },
  ];

  const sizeButtons = document.getElementById("sizeButtons");
  sizes.forEach((size) => {
    const button = document.createElement("button");
    button.classList.add("size-button");
    button.textContent = size.value;
    if (!size.available) {
      button.disabled = true;
      button.classList.add("disabled");
      button.style.opacity = "0.5";
      button.style.cursor = "not-allowed";
    }
    button.addEventListener("click", () => {
      sizeButtons
        .querySelectorAll(".size-button")
        .forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
    });
    sizeButtons.appendChild(button);
  });

  const colorButtons = document.getElementById("colorButtons");
  colors.forEach((color) => {
    const button = document.createElement("button");
    button.classList.add("color-button");
    const colorSpan = document.createElement("span");
    colorSpan.textContent = color.name;
    button.appendChild(colorSpan);
    button.style.backgroundColor = color.code;
    if (color.code === "#FFFFFF") button.style.border = "1px solid #000";
    if (!color.available) {
      button.disabled = true;
      button.style.opacity = "0.3";
      button.style.cursor = "not-allowed";
    }
    button.addEventListener("click", () => {
      colorButtons
        .querySelectorAll(".color-button")
        .forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
    });
    colorButtons.appendChild(button);
  });

  // Xử lý nút "Thêm vào giỏ hàng"
  const addToCartBtn = document.querySelector(".add-to-cart-btn");
  addToCartBtn.addEventListener("click", () => {
    const selectedSize = document.querySelector(".size-button.selected");
    const selectedColor = document.querySelector(".color-button.selected");

    if (!selectedSize || !selectedColor) {
      alert("Vui lòng chọn size và màu trước khi thêm vào giỏ hàng");
      return;
    }

    const productInfo = JSON.parse(localStorage.getItem("currentProduct"));
    if (!productInfo) {
      alert("Không tìm thấy thông tin sản phẩm!");
      return;
    }

    let imageSrc = productInfo.image;
    if (imageSrc && !imageSrc.startsWith("/")) {
      imageSrc = "/" + imageSrc;
    }

    const cartItem = {
      name: productInfo.name,
      price: parseInt(productInfo.price),
      image: imageSrc,
      size: selectedSize.textContent,
      color: selectedColor.querySelector("span").textContent,
      quantity: 1,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm sản phẩm vào giỏ hàng!");
    window.location.href = "/pages/cart.html";
  });
}

// Gọi các hàm khi trang load
document.addEventListener("DOMContentLoaded", () => {
  loadProductDetails();
  loadSizeAndColorOptions();
});
