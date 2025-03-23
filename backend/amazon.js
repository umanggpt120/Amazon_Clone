

// sliding bar created 


let slideLeft = document.querySelector('.js-slider-btn-left');
let slideRight = document.querySelector('.js-slider-btn-right');
let imageItem = document.querySelectorAll('.hero-image');

let startSlider = 0;
let endSlider = (imageItem.length-1)*100;

slideLeft.addEventListener('click',()=>{
  if(startSlider < 0){
    startSlider = startSlider + 100;
  }
  else startSlider = -endSlider;

  imageItem.forEach((value)=>{
    value.style.transform = `translateX(${startSlider}%)`;
  });
});

slideRight.addEventListener('click',()=>{

  if(startSlider >= -endSlider + 100){
    startSlider = startSlider - 100;
  }
  else startSlider = 0;

  imageItem.forEach((value)=>{
    value.style.transform = `translateX(${startSlider}%)`;
  });
});


// creating html by js

let productsGrid = ``;

products.forEach((product)=>{
  productsGrid += `
        <div class="product-container">

        <div class="product-image-container">
          <img class="product-image" src="${product.image}" alt="">
        </div>

        <div class="product-name">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars*10}.png">
          <div class="product-rating-count">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${product.priceCents/100}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected="" value="1">1</option>
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
        
        <div class = "add-to-cart-poppop poppop-${product.id}">

        </div>

        <button class="add-to-cart-button js-add-to-cart"
        data-product-id = "${product.id}">
        Add to Cart
        </button>

      </div>
  `;

});


function showpoppop(productId){
  let ele = document.querySelector(`.poppop-${productId}`);
  ele.innerHTML = `
          <img  class="check-icon" src="images/icons/checkmark.png"></img>
          <P>Added</P>
  `;

  setTimeout(function() {
    ele.innerHTML = ``;}
    , 1000);
}

let grid = document.querySelector('.product-grid');
grid.innerHTML = productsGrid;

function updateCartQuantity(){

  let cartQuantity = 0;
  
  cart.forEach(ele=>{
    cartQuantity += ele.quantity;
  })

  document.querySelector('.js-cart-quantity')
  .innerHTML = `${cartQuantity}`;
}



document.querySelectorAll('.js-add-to-cart')
.forEach((button)=>{
  button.addEventListener(('click'),()=>{

    
    const productId = button.dataset.
    productId;

    showpoppop(productId);
    addToCart(productId);
    updateCartQuantity();
  });
});

updateCartQuantity();

