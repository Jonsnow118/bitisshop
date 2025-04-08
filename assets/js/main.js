// Hamburger Menu
function toggleMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
}

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const icon = document.querySelector(".dark-mode-toggle i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
}

if (localStorage.getItem("darkMode") === "true") {
  toggleDarkMode();
}

// Slideshow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

setInterval(() => {
  plusSlides(1);
}, 3000);

// Tìm kiếm
document
  .querySelector(".search-bar button")
  .addEventListener("click", function () {
    const query = document.querySelector(".search-bar input").value.trim();
    if (query) {
      window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
    }
  });

// Khởi tạo danh sách sản phẩm
if (!localStorage.getItem("products")) {
  const products = [
    {
      id: 1,
      name: "Giày Thể Thao Nam Biti’s Hunter X LiteDash",
      price: 856000,
      oldPrice: 1070000,
      image: "assets/imgs/008500XM.webp",
      category: "nam",
      discount: 20,
    },
    {
      id: 2,
      name: "Dép Eva Bé Gái Doraemon BEG003522TRG",
      price: 245000,
      image: "assets/imgs/hunter1.webp",
      category: "be-gai",
      isNew: true,
      freeShip: true,
    },
    {
      id: 3,
      name: "Giày Hunter 1",
      price: 869000,
      image: "assets/imgs/hunter1.webp",
      category: "nam",
      isNew: true,
      freeShip: true,
    },
    {
      id: 4,
      name: "Giày Thể Thao Nữ Biti’s Hunter Street",
      price: 799000,
      oldPrice: 999000,
      image: "assets/imgs/hunter1.webp",
      category: "nu",
      discount: 20,
    },
    {
      id: 5,
      name: "Giày Bé Trai Biti’s Active",
      price: 450000,
      image: "assets/imgs/hunter1.webp",
      category: "be-trai",
      isNew: true,
    },
    {
      id: 6,
      name: "Dép Nam Biti’s Classic",
      price: 199000,
      image: "assets/imgs/hunter1.webp",
      category: "nam",
      freeShip: true,
    },
    {
      id: 7,
      name: "Giày Thể Thao Nữ Biti’s Lite",
      price: 650000,
      image: "assets/imgs/hunter1.webp",
      category: "nu",
      isNew: true,
    },
    {
      id: 8,
      name: "Giày Bé Gái Biti’s Doraemon",
      price: 399000,
      oldPrice: 499000,
      image: "assets/imgs/hunter1.webp",
      category: "be-gai",
      discount: 20,
    },
    {
      id: 9,
      name: "Giày Thể Thao Nam Biti’s Hunter Core",
      price: 950000,
      image: "assets/imgs/hunter1.webp",
      category: "nam",
      isNew: true,
      freeShip: true,
    },
    {
      id: 10,
      name: "Dép Nữ Biti’s Floral",
      price: 250000,
      image: "assets/imgs/hunter1.webp",
      category: "nu",
      freeShip: true,
    },
    {
      id: 11,
      name: "Giày Bé Trai Biti’s Sport",
      price: 480000,
      image: "assets/imgs/hunter1.webp",
      category: "be-trai",
      isNew: true,
    },
    {
      id: 12,
      name: "Giày Thể Thao Nữ Biti’s Hunter X",
      price: 880000,
      oldPrice: 1100000,
      image: "assets/imgs/hunter1.webp",
      category: "nu",
      discount: 20,
    },
    {
      id: 13,
      name: "Giày Thể Thao Nam Biti’s Urban",
      price: 820000,
      image: "assets/imgs/hunter1.webp",
      category: "nam",
      isNew: true,
    },
    {
      id: 14,
      name: "Dép Bé Gái Biti’s Unicorn",
      price: 220000,
      image: "assets/imgs/hunter1.webp",
      category: "be-gai",
      freeShip: true,
    },
    {
      id: 15,
      name: "Giày Bé Trai Biti’s Dino",
      price: 460000,
      image: "assets/imgs/hunter1.webp",
      category: "be-trai",
      isNew: true,
    },
    {
      id: 16,
      name: "Giày Thể Thao Nam Biti’s Hunter Pro",
      price: 920000,
      image: "assets/imgs/hunter1.webp",
      category: "nam",
      isNew: true,
    },
    {
      id: 17,
      name: "Dép Nữ Biti’s Summer",
      price: 230000,
      image: "assets/imgs/hunter1.webp",
      category: "nu",
      freeShip: true,
    },
    {
      id: 18,
      name: "Giày Bé Gái Biti’s Princess",
      price: 410000,
      image: "assets/imgs/hunter1.webp",
      category: "be-gai",
      isNew: true,
    },
    {
      id: 19,
      name: "Giày Thể Thao Nam Biti’s Hunter Max",
      price: 990000,
      image: "assets/imgs/hunter1.webp",
      category: "nam",
      isNew: true,
      freeShip: true,
    },
    {
      id: 20,
      name: "Dép Bé Trai Biti’s Dino",
      price: 200000,
      image: "assets/imgs/hunter1.webp",
      category: "be-trai",
      freeShip: true,
    },
    {
      id: 21,
      name: "Giày Thể Thao Nữ Biti’s Urban",
      price: 850000,
      image: "assets/imgs/hunter1.webp",
      category: "nu",
      isNew: true,
    },
    {
      id: 22,
      name: "Giày Bé Gái Biti’s Unicorn",
      price: 430000,
      image: "assets/imgs/hunter1.webp",
      category: "be-gai",
      isNew: true,
    },
    {
      id: 23,
      name: "Giày Thể Thao Nam Biti’s Hunter Lite",
      price: 870000,
      image: "assets/imgs/hunter1.webp",
      category: "nam",
      isNew: true,
    },
    {
      id: 24,
      name: "Dép Nữ Biti’s Classic",
      price: 210000,
      image: "assets/imgs/hunter1.webp",
      category: "nu",
      freeShip: true,
    },
  ];
  localStorage.setItem("products", JSON.stringify(products));
}

// Quản lý số lượng sản phẩm hiển thị
const productsPerPage = {
  "top-search": 6,
  "new-products": 8,
};
const productState = {
  "top-search": { page: 1, products: [] },
  "new-products": { page: 1, products: [] },
};

// Hiển thị sản phẩm
async function displayProducts(sectionId, filter = {}, append = false) {
  const spinner = document.getElementById(`${sectionId}-spinner`);
  spinner.style.display = "block";

  // Giả lập delay để thấy spinner
  await new Promise((resolve) => setTimeout(resolve, 500));

  const products = JSON.parse(localStorage.getItem("products")) || [];
  const container = document.querySelector(`#${sectionId}`);
  let filteredProducts = products;

  if (filter.topSearch) {
    filteredProducts = products.filter((p) => p.discount > 0);
  } else if (filter.newProducts) {
    filteredProducts = products.filter((p) => p.isNew);
  }

  const category = document.getElementById("category-filter").value;
  const sort = document.getElementById("sort-price").value;

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  if (sort) {
    filteredProducts.sort((a, b) =>
      sort === "asc" ? a.price - b.price : b.price - a.price
    );
  }

  const state = productState[sectionId];
  state.products = filteredProducts;
  const perPage = productsPerPage[sectionId];
  const start = append ? 0 : (state.page - 1) * perPage;
  const end = append ? state.page * perPage : start + perPage;
  const paginatedProducts = filteredProducts.slice(0, end);

  if (!append) {
    container.innerHTML = "";
  }

  container.innerHTML += paginatedProducts
    .map(
      (product) => `
        <div class="product-card">
            ${
              product.discount
                ? `<span class="sale-banner">SALE ${product.discount}%</span>`
                : ""
            }
            ${
              product.freeShip
                ? `<span class="sale-banner ship">Freeship</span>`
                : ""
            }
            ${product.isNew ? `<span class="sale-banner new">Mới</span>` : ""}
            <i class="far fa-heart like-icon" data-id="${product.id}"></i>
            <a href="/pages/product-detail.html" onclick="saveProductInfo(event, '${
              product.name
            }', '${product.price}', '${product.image}')">
                <img src="${product.image}" alt="${
        product.name
      }" loading="lazy">
            </a>
            <div class="infor">
                <p>6 Size</p>
                <p>1 Màu sắc</p>
            </div>
            <div class="product-info desc">
                <a href="/pages/product-detail.html" onclick="saveProductInfo(event, '${
                  product.name
                }', '${product.price}', '${product.image}')">
                    ${product.name}
                </a>
                <p class="price ${product.discount ? "" : "new-price"}">
                    ${product.price.toLocaleString("vi-VN")} VNĐ
                    ${
                      product.oldPrice
                        ? `<span class="old-price">${product.oldPrice.toLocaleString(
                            "vi-VN"
                          )} VNĐ</span>`
                        : ""
                    }
                    ${
                      product.discount
                        ? `<span class="discount">-${product.discount}%</span>`
                        : ""
                    }
                </p>
            </div>
        </div>
    `
    )
    .join("");

  document.querySelectorAll(".like-icon").forEach((icon) => {
    icon.addEventListener("click", toggleLike);
  });

  spinner.style.display = "none";

  // Ẩn nút "Xem thêm" nếu không còn sản phẩm
  const loadMoreBtn = document.getElementById(`${sectionId}-load-more`);
  if (state.page * perPage >= filteredProducts.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

// Load thêm sản phẩm
function loadMoreProducts(sectionId) {
  productState[sectionId].page++;
  displayProducts(
    sectionId,
    sectionId === "top-search" ? { topSearch: true } : { newProducts: true },
    true
  );
}

// Hàm lưu thông tin sản phẩm
function saveProductInfo(event, name, price, image) {
  event.preventDefault();
  const productInfo = {
    name: name,
    price: parseInt(price),
    image: image,
  };
  localStorage.setItem("currentProduct", JSON.stringify(productInfo));
  window.location.href = event.target.closest("a").getAttribute("href");
}

// Chức năng thêm sản phẩm yêu thích
function toggleLike(event) {
  const likeIcon = event.target.closest(".like-icon");
  likeIcon.classList.toggle("fas");
  likeIcon.classList.toggle("far");

  const productId = likeIcon.getAttribute("data-id");
  let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  if (likeIcon.classList.contains("fas")) {
    if (!wishlist.some((item) => item.id == productId)) {
      const product = JSON.parse(localStorage.getItem("products")).find(
        (p) => p.id == productId
      );
      wishlist.push(product);
      showToast("Đã thêm vào danh sách yêu thích!");
    }
  } else {
    wishlist = wishlist.filter((item) => item.id != productId);
    showToast("Đã xóa khỏi danh sách yêu thích!");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateCartAndWishlistCount();
}

// Cập nhật số lượng giỏ hàng và yêu thích
function updateCartAndWishlistCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  document.querySelector(".icons .fa-heart + .badge").textContent =
    wishlist.length;
  document.querySelector(".icons .fa-shopping-bag + .badge").textContent =
    cart.length;
}

// Hiển thị thông báo toast
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// Back to Top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
  const backToTop = document.querySelector(".back-to-top");
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

// Sự kiện
document.addEventListener("DOMContentLoaded", () => {
  updateCartAndWishlistCount();
  displayProducts("top-search", { topSearch: true });
  displayProducts("new-products", { newProducts: true });
});

document.getElementById("category-filter").addEventListener("change", () => {
  productState["top-search"].page = 1;
  productState["new-products"].page = 1;
  displayProducts("top-search", { topSearch: true });
  displayProducts("new-products", { newProducts: true });
});

document.getElementById("sort-price").addEventListener("change", () => {
  productState["top-search"].page = 1;
  productState["new-products"].page = 1;
  displayProducts("top-search", { topSearch: true });
  displayProducts("new-products", { newProducts: true });
});
// Xử lý tìm kiếm và hiển thị kết quả ngay dưới thanh tìm kiếm
// Lắng nghe sự kiện nhập liệu vào ô tìm kiếm
document
  .querySelector(".search-bar input")
  .addEventListener("input", function () {
    const query = this.value.trim();
    const searchResults = document.querySelector(".search-results");

    // Nếu ô tìm kiếm rỗng, ẩn kết quả tìm kiếm
    if (!query) {
      searchResults.style.display = "none";
      return;
    }

    // Lọc sản phẩm từ localStorage dựa trên từ khóa tìm kiếm
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    // Nếu có kết quả tìm kiếm, hiển thị chúng
    if (filteredProducts.length > 0) {
      searchResults.innerHTML = filteredProducts
        .map(
          (product) => `
            <div class="result-item" onclick="selectProduct('${product.name}')">
              ${product.name}
            </div>
          `
        )
        .join("");
      searchResults.style.display = "block";
    } else {
      searchResults.innerHTML = `<div class="result-item">Không tìm thấy kết quả</div>`;
      searchResults.style.display = "block";
    }
  });

// Xử lý khi người dùng chọn một sản phẩm từ kết quả tìm kiếm
function selectProduct(productName) {
  const searchInput = document.querySelector(".search-bar input");
  searchInput.value = productName;

  // Ẩn kết quả tìm kiếm sau khi chọn sản phẩm
  document.querySelector(".search-results").style.display = "none";
}
