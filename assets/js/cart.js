function updateCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartCount = document.getElementById("cart-count");
  const totalPrice = document.getElementById("total-price");

  cartItemsContainer.innerHTML = ""; // Xóa nội dung cũ

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      "<p>Giỏ hàng của bạn đang trống. Hãy quay lại mua sắm!</p>";
    cartCount.textContent = "Bạn đang có 0 sản phẩm trong giỏ hàng";
    totalPrice.textContent = "0 VNĐ";
  } else {
    cartCount.textContent = `Bạn đang có ${cart.length} sản phẩm trong giỏ hàng`;

    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.price.toLocaleString("vi-VN")} đ</p>
                    <p>Màu sắc: ${item.color}</p>
                    <p>Kích thước: ${item.size}</p>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-total">${(
                  item.price * item.quantity
                ).toLocaleString("vi-VN")} đ</div>
                <button class="remove-btn" onclick="removeItem(${index})">✕</button>
            `;
      cartItemsContainer.appendChild(cartItem);
    });

    const totalAmt = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    totalPrice.textContent = `${totalAmt.toLocaleString("vi-VN")} đ`;
  }
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function changeQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function proceedToCheckout() {
  window.location.href = "/pages/checkout.html";
}

// Cập nhật giỏ hàng khi trang load
document.addEventListener("DOMContentLoaded", updateCart);
