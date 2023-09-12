import { cart, removeFromCart, cart_quantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = ``;
let matchingProduct;
let new_quantity = 0;
let error_message = ``;

cart.forEach((cartitem) =>{
  const {productId} = cartitem;

  products.forEach((product) =>{
    if(product.id === productId){
      matchingProduct = product;
    }
  });
  cartSummaryHTML +=
  `<div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>
    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
         ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartitem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link js-update-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}"">
            Update
          </span>
          <input type="text" class="quantity-input js-quantity-input-${matchingProduct.id} js-quantity-input" data-product-id="${matchingProduct.id}">
          <span class="save-quantity-input link-primary js-save-link js-save-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">save</span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
          <div class="error-message js-error-message-${matchingProduct.id}"></div>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
  `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    updateCartQuantity();
  });
})
updateCartQuantity();
function updateCartQuantity(){
  document.querySelector('.js-total-quantity').innerHTML = cart_quantity() + ' item(s)';  
}
document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const {productId} = link.dataset;
    document.querySelector(`.js-quantity-input-${productId}`).classList.add('is-editing-quantity');
    document.querySelector(`.js-save-link-${productId}`).classList.add('is-editing-quantity');   
    document.querySelector(`.js-update-link-${productId}`).classList.add('toggle-save-link');
  });    
})
document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () =>{
    const {productId} = link.dataset;    
    quantityInput(productId);
  });
})
function removeClass(product_Id){
    document.querySelector(`.js-quantity-input-${product_Id}`).classList.remove('is-editing-quantity');
    document.querySelector(`.js-save-link-${product_Id}`).classList.remove('is-editing-quantity');   
    document.querySelector(`.js-update-link-${product_Id}`).classList.remove('toggle-save-link');
}

function validateQuantity(newQuantity){
  let quantity = 0;
  if(!(newQuantity >= 0 && newQuantity < 1000))
    error_message = "Quantity is below 0 or above 1000!!";
  else
    error_message = ``;
  return quantity = newQuantity;  
}

document.querySelectorAll(`.js-quantity-input`).forEach(input => {
    input.addEventListener('keyup',(events) =>{
      const {productId} = input.dataset;
      if(events.key === 'Enter'){
       quantityInput(productId);
      }
    })
});
function quantityInput (product_Id){
  new_quantity = Number(document.querySelector(`.js-quantity-input-${product_Id}`).value);  
  new_quantity = validateQuantity(new_quantity);

  if(!errorMessage(product_Id)){
    removeClass(product_Id);
  }
  updateQuantity(product_Id, new_quantity);
  document.querySelector(`.js-quantity-label-${product_Id}`).innerHTML = new_quantity;
  updateCartQuantity();  
}
function errorMessage(product_Id){
  let isError = false;
  if(error_message){
    document.querySelector(`.js-error-message-${product_Id}`).innerHTML = error_message;
    isError = true;
  }else{
    document.querySelector(`.js-error-message-${product_Id}`).innerHTML = '';
    isError = false;
  }  
  return isError;
}