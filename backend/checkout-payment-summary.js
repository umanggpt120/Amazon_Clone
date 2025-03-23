function renderPaymentSummary(){

  let totalPrice = 0;
  let totalShipping = 0;
  let totalQuantity = 0;
  cart.forEach(cartItem => {

    totalQuantity += cartItem.quantity;
    let productId = cartItem.productId;
    let match = getProduct(productId);
    let price = match.priceCents;
    let deliveryOptionId = cartItem.deliveryOptionId;

    let ShippingPrice = 0;
    if(deliveryOptionId === '3') ShippingPrice = 999;
    else if(deliveryOptionId === '2') ShippingPrice = 499;
    else ShippingPrice = 0;


    totalPrice += cartItem.quantity * price;
    totalShipping += cartItem.quantity * ShippingPrice;
  });


  const totalBeforetax = totalPrice + totalShipping;
  const taxCents = totalBeforetax * 0.1;
  const totalCents = taxCents + totalBeforetax;

  const paymentSummaryHTML = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${totalQuantity}):</div>
          <div class="payment-summary-money">$${(totalPrice/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${(totalShipping/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${(totalBeforetax/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${(taxCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${(totalCents/100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary js-place-your-order">
          Place your order
        </button>
  `;

  document.querySelector('.js-payment-summary')
  .innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-your-order')
  .addEventListener('click', ()=>{
    window.location.href = "orders.html";
  })

}

renderPaymentSummary();


