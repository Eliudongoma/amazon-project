import { cart, addToCart, cart_quantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
      <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>
      <div class="product-name limit-text-to-2-lines">
       ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
  
});
let id;
let timers = [];

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity(){ 
  document.querySelector('.js-cart-quantity').innerHTML = cart_quantity();   
}
updateCartQuantity();

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () =>{
    const productId = button.dataset.productId;
   
    const selectorQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    const added = document.querySelector(`.js-added-to-cart-${productId}`); 

    clearId(added);  
    addToCart(productId, selectorQuantity);   
    updateCartQuantity();
  });
});
setInterval(() => {
  timers.forEach(timer => {
    timer.time -= 1000;
    if(timer.time === 0)
      clearTimeout(timer.id);
  });
}, 1000);

function clearId(added){    
  added.classList.add('js-added-to-cart');
  let time = 2000;
    id = setTimeout(() => {
      added.classList.remove('js-added-to-cart');
    }, time); 
    timers.push([id,time]);
}