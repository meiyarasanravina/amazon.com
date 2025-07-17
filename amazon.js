import {cart,addToCard} from "../data/cart.js";
import {products } from "../data/products.js";
import { farmatCurrency } from "./utils/money.js";
 let productsHtml=''; 
 export let cartQuantity;
products.forEach((products)=>{
   
   productsHtml += `
     <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${products.getStarsUrl()}">          
            <div class="product-rating-count link-primary">
            ${products.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${products.getPrice()}              
          </div>

          <div class="product-quantity-container">
            <select class="product-quantity-Selector-${products.id}">
              <option Selected value="1">1</option>
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
                 ${products.extraInfoHtml()}  
         
          <div class="product-spacer"> </div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary
          js-add-to-card "
          data-product-id="${products.id}"
          >
            Add to Cart
          </button>
        </div>
`
});

        document.querySelector('.products-html-grid')
        .innerHTML = productsHtml;
 
 
function updateQuantity(){

        cartQuantity = 0
      
  cart.forEach((cartItem)=>{
    localStorage.setItem('cartItemQuantity',
      JSON.stringify(cartItem.Quantity));   
  
         
         cartQuantity += JSON.parse(localStorage.getItem('cartItemQuantity'));
          }) 
            
            document.querySelector('.js-quantity')
              .innerHTML = cartQuantity;
          
            
    // localStorage.setItem('cartQuantity',JSON.stringify(cartQuantity));
    //   document.querySelector('.js-quantity')
    //   .innerHTML = JSON.parse(localStorage.getItem('cartQuantity'))


    }  

  document.querySelectorAll('.js-add-to-card')
    .forEach((button)=>{

      button.addEventListener('click',()=>{
        const productId = button.dataset.productId; 

          addToCard(productId);
            updateQuantity(); 

      })
      
  })




