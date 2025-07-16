const products = [
  {
    id: 1,
    name: "Watch 1",
    price: 50,
    image: "assets/product 2.jpg",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
  },
  {
    id: 2,
    name: "Watch 2",
    price: 75,
    image: "assets/product 1.jpg",
    description: "Elegant and stylish, perfect for all occasions."
  },
  {
    id: 3,
    name: "Watch 3",
    price: 90,
    image: "assets/product 3.jpg",
    description: "Classic design with modern features."
  },
  {
    id: 4,
    name: "Watch 4",
    price: 120,
    image: "assets/product 4.jpg",
    description: "Premium materials and timeless look."
  }
];

function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "section";

    card.innerHTML = `
      <div class="image" style="background-image: url('${product.image}'); height: 200px; background-size: cover; background-position: center;"></div>
      <center><h4><b>${product.name}</b></h4></center>
      <h5>Price: Rs${product.price}</h5>
      <p>${product.description}</p>
      <center><button class="button" onclick="addToCart(${product.id})">Add to cart</button></center>
    `;

    productList.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (cart[id]) {
    cart[id].quantity += 1;
  } else {
    cart[id] = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    };
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}





function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let totalQty = 0;
  let totalPrice = 0;

  for (let id in cart) {
    const item = cart[id];

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    itemDiv.innerHTML = `
      <div class="img" style="background-image: url('${item.image}')"></div>
      <div class="cart-details">
        <h4>${item.name}</h4>
        <p>Rs ${item.price}</p>
      </div>
      <div class="cart-controls">
        <button onclick="changeQty(${item.id}, 1)"><i class="fa fa-plus"></i></button>
        <p>${item.quantity}</p>
        <button onclick="changeQty(${item.id}, -1)"><i class="fa fa-minus"></i></button>
        ${item.quantity <= 1 ? `<button onclick="removeItem(${item.id})" class="remove-btn"><i class="fa fa-trash"></i></button>` : ""}
      </div>
    `;

    cartItems.appendChild(itemDiv);

    totalQty += item.quantity;
    totalPrice += item.price * item.quantity;
  }

  document.getElementById("total-quantity").textContent = totalQty;
  document.getElementById("total-price").textContent = totalPrice;
}

function changeQty(productId, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (!cart[productId]) return;

  cart[productId].quantity += delta;
  if (cart[productId].quantity <= 0) {
    delete cart[productId];
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function removeItem(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  delete cart[productId];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  let totalQty = 0;
  for (let id in cart) {
    totalQty += cart[id].quantity;
  }
  if (cartCount) cartCount.textContent = totalQty;
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();   // Only works on index.html
  renderCart();       // Only works on cart.html
  updateCartCount();  // Works on both
});

