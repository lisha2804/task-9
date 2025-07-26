// checkout.js

// Constants
const cartItemsContainer = document.getElementById("cart-items");
const subtotalEl = document.getElementById("subtotal");
const shippingEl = document.getElementById("shipping");
const totalEl = document.getElementById("total");

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render cart items
function renderCart() {
  cartItemsContainer.innerHTML = ""; 

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    subtotalEl.textContent = "0";
    shippingEl.textContent = "0";
    totalEl.textContent = "0";
    return;
  }

  let subtotal = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("checkout-item");

    itemDiv.innerHTML = `
      <div class="item-details">
        <h4>${item.title}</h4>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: ₹${itemTotal}</p>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  // Shipping 
  const shipping = subtotal < 3999 ? 399 : 0;
  const total = subtotal + shipping;

  subtotalEl.textContent = subtotal;
  if (shipping === 0) {
  shippingEl.innerHTML = `0 <span class="free-shipping-msg">🎁 Free Shipping Applied!</span>`;
} else {
  shippingEl.textContent = shipping;
}

  totalEl.textContent = total;
totalEl.classList.add("highlight-total");

}


// Place Order 
function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add items before placing an order.");
    return;
  }

  alert("🎉 Order placed successfully!");

  // Clear cart
  localStorage.removeItem("cart");

  // Reload to update the page
  location.reload();
}

// Run on page load
renderCart();


// Hamburger nav

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
});