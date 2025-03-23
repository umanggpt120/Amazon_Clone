//let cart = JSON.parse( localStorage.getItem('cart'));

 let cart = JSON.parse( localStorage.getItem('cart'));
 
 if(!cart){
  cart =  [{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 1,
    deliveryOptionId : '2'
  }];
 }

function saveToLocalStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

function addToCart(productId){

  document.querySelectorAll('.add-to-cart-poppop')
  .innerHTML = `<img class="check-icon" src = "images/icons/checkmark.png"></img>
                <p> Added </p>`;

  let match;

    cart.forEach(item => {
      if(productId === item.productId){
        match = item;
      }
    });

  if(match){
    match.quantity += 1;
  }
  else{
    cart.push({
    productId : productId,
    quantity : 1,
    deliveryOptionId : '1'
  });
  }

  saveToLocalStorage(); 
}

function removeFromCart(productId){
  cart.forEach((ele,index)=>{
    if(ele.productId === productId){
      cart.splice(index,1);
    }
  });
  saveToLocalStorage(); 
}

const deliveryOptions =  [{
  id : '1',
  deliveryDays : 7,
  priceCents : 0
},
{
  id : '2',
  deliveryDays : 3,
  priceCents : 499
},
{
  id : '3',
  deliveryDays : 1,
  priceCents : 999
}];

function updateDeliveryOption(productId, deliveryOptionId){
  
  let match;
  cart.forEach((item) => {
    if(productId === item.productId){
      match = item;
      
    }
  });

  match.deliveryOptionId = deliveryOptionId;
  
  saveToLocalStorage();
}