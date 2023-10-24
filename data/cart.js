export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },{productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
  }];
}

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, new_quantity){
  let matchingItem;

    cart.forEach((cartitem) => {
      if(productId === cartitem.productId){
        matchingItem = cartitem;
      }
    });
    if(matchingItem){
      matchingItem.quantity += new_quantity;
    }else{
      cart.push({
        productId: productId,
        quantity: new_quantity
      });
    }
    saveToStorage();
}
export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function cart_quantity(){
  let quantity = 0;
  cart.forEach((cartItem) => {
    quantity += cartItem.quantity;
  });
  return quantity;
}
export function updateQuantity(productId, newQuantity){
  cart.forEach(cartItem =>  {
    if(cartItem.productId === productId){
      cartItem.quantity = newQuantity;
    }
  });
  saveToStorage();
}


