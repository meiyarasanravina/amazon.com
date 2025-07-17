import { cart,removeFromCart,updateDeliveryOption} from "../data/cart.js";
import {products,getProduct } from "../../data/products.js";
import { farmatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { deliveryOptions, getDeliveryOption } from "../data/deliveryOptions.js";
import {renderpaymentSummary} from "../checkout/paymentSummary.js"
import { cartQuantity } from "../amazon.js";
export function renderOrderSummary(){
    let cartSummaryHtml;
    let checkout;
    cart.forEach((cartItem)=>{   
            const productId = cartItem.productId ;
                
    const macthingProduct = getProduct(productId);
    
    const deliveryOptionId = cartItem.deliveryOptionId;
        
    const deliveryOption = getDeliveryOption(deliveryOptionId) ;
    
       
     
        const today = dayjs();
        const deliveryDay = today.add(
            deliveryOption.deliveryDay, 'days'
        );
        const date = deliveryDay.format(
            'dddd, MMMM D'
        )
             
       cartSummaryHtml += ` 
            <div class="cart-item-container
               checkout-cantainer-${macthingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${date}
                 </div>
    
                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${macthingProduct.image}">
    
                <div class="cart-item-details">
                    <div class="product-name">
                    ${macthingProduct.name}
                    </div>
                    <div class="product-price">
                    $${macthingProduct.getPrice()}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.Quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary delete-item-checkout"
                    data-delete-id="${macthingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>
    
                <div class="delivery-options">
               <div class="delivery-options-title">
               Choose a delivery option:
                </div>
                   ${deliveryOptionsHtml(macthingProduct,cartItem)}     
                </div>
                </div>
            </div>
        `
    });
     
      function deliveryOptionsHtml(macthingProduct,cartItem){
    
        let html = ''
        deliveryOptions.forEach((deliveryOption)=>{
          
           const today = dayjs();
           const deliveryDay = today.add(
            deliveryOption.deliveryDay, 'days'
           );
           const dateString = deliveryDay.format(
            'dddd, MMMM D'
           )
     
            const priceShipping = deliveryOption.priceCents === 0
            ? 'FREE'
            : `$${farmatCurrency(deliveryOption.priceCents)}`
          
              const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    
            html += `
    
            <div class="delivery-option 
             js-delivery-option"
            data-product-id="${macthingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" 
             ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${macthingProduct.id}">
            <div>
                <div class="delivery-option-date">
                ${dateString}
                </div>
                <div class="delivery-option-price">
                ${priceShipping} -Shipping
                </div>
            </div>
            </div> 
    `
        });
        
        return html;
      }
    
      document.querySelector('.items-checkout')
      .innerHTML = cartSummaryHtml ;
    
    document.querySelectorAll('.delete-item-checkout')
      .forEach((deleteButton) => {
        deleteButton.addEventListener('click',()=>{
           const productId =  deleteButton.dataset.deleteId;
            removeFromCart(productId);
            const removeItem =  document.querySelector(`.checkout-cantainer-${productId}`)    
                  removeItem.remove();
                  renderpaymentSummary();
        })
    
    });

   
 
 document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
    element.addEventListener('click',()=>{
            const {productId , deliveryOptionId} = element.dataset;
            
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderpaymentSummary();
    });
    });
   
}

