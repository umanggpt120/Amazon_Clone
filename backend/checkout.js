

function renderOrderSummary(){
  let cartHTML = ``;

  cart.forEach( (cartItem)=> {

  const productId = cartItem.productId;

  let match;

  products.forEach( value => {
    if(value.id === productId){
      match = value;
    }
  });

  const deliveryOptionId = cartItem
  .deliveryOptionId;

  let days ;

  if(deliveryOptionId === '3') days = 1;
  else if(deliveryOptionId === '2') days = 3;
  else days = 7;

  let day = dayjs();
  let deliveryDate = day.add(days,'days');
  deliveryDate = deliveryDate.format('dddd, MMMM D');

  cartHTML += 
        ` <div class="cart-item-container cart-item-container-${match.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${match.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${match.name}
                </div>
                <div class="product-price">
                  $${match.priceCents /100}
                </div>

                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label quantity-${match.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary 
                  js-update-link" data-product-id = "${match.id}">
                    Update
                  </span>


                  <span class="delete-quantity-link link-primary 
                  js-delete-link" data-product-id = "${match.id}">
                    Delete
                  </span>

                  <div class="update-cart-quantity-${match.id}" style="display: none;">
                    <input type="number"  style="width: 40px;"value="${cartItem.quantity}" min = "0" class="new-quantity-${match.id}" name="newQuantity">
                  </div>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                ${deliveryOptionHTML(match,cartItem)}
              </div>
            </div>
          </div>
    `;

  });

  document.querySelector('.js-order-summary')
  .innerHTML = cartHTML;


  function deliveryOptionHTML(match,cartItem){

    let HTML = '';

    deliveryOptions.forEach((deliveryOption) => {

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      const date = deliveryDate.format('dddd, MMMM D');
      const price = deliveryOption.priceCents ? `$${(deliveryOption.priceCents)/100} - Shipping` : 'Free Shipping';

      const ischecked = deliveryOption.id  ===
      cartItem.deliveryOptionId;
    

    HTML += 
     ` <div class="delivery-option js-delivery-option"
          data-product-id = "${match.id}"
          data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio"
            ${ischecked ? 'checked': ''}
            class="delivery-option-input"
            name="delivery-option-${match.id}">
          <div>
            <div class="delivery-option-date">
              ${date}
            </div>
            <div class="delivery-option-price">
              ${price}
            </div>
          </div>
        </div>
      `;
    });

    return HTML;
  }

document.querySelectorAll('.js-delivery-option')
.forEach((ele)=>{
  ele.addEventListener('click',()=>{
    
    const productId = ele.dataset.productId;
    const deliveryOptionId = ele.dataset.deliveryOptionId;

    updateDeliveryOption(productId,deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
  });
});

document.querySelectorAll('.js-delete-link')
.forEach((link)=>{

  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(
      `.cart-item-container-${productId}`
    );
    container.remove();
    updateCartQuantityIncheckout();
    renderPaymentSummary();

  });
 
});


document.querySelectorAll('.js-update-link')
.forEach((link)=>{

  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;

    let ele = document.querySelector(`.update-cart-quantity-${productId}`);
    ele.style.display = 'block';

    let value = document.querySelector(`.new-quantity-${productId}`)
    .value;

    let match;
    cart.forEach((item) => {
      if(productId === item.productId){
        match = item;
      }
    });
    match.quantity = Number(value);
    document.querySelector(`.quantity-${productId}`)
    .innerHTML = `${match.quantity}`;
    saveToLocalStorage(cart);
    updateCartQuantityIncheckout();
    renderPaymentSummary();
  });
});

document.querySelectorAll('.')


function updateCartQuantityIncheckout(){
  let cartQuantity = 0;

  cart.forEach(ele=>{
    cartQuantity += ele.quantity;
  })

  document.querySelector('.return-to-home-link')
  .innerHTML = `${cartQuantity} items`;
}

updateCartQuantityIncheckout();

}

renderOrderSummary();


