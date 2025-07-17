import {cart} from "../data/cart.js"
import { getProduct } from "../data/products.js"
import { getDeliveryOption } from "../data/deliveryOptions.js";
import {farmatCurrency} from "../utils/money.js"

export function renderpaymentSummary(){
  
      let productPriceCentes = 0;
      let shippingPriceCentes = 0;

    cart.forEach((cartItem) => {

        const product = getProduct(cartItem.productId);
        productPriceCentes += (product.priceCents * cartItem.Quantity);

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
        shippingPriceCentes += deliveryOption.priceCents;

      });
      const totalBeforeTaxCentes = productPriceCentes + shippingPriceCentes;
      const taxCentes = (totalBeforeTaxCentes * 0.1);
      const totalOrder = totalBeforeTaxCentes + taxCentes;
      
      const paymentSummaryHtml = 
     `
      <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.Quantity}):</div>
            <div class="payment-summary-money">$${farmatCurrency(productPriceCentes)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${farmatCurrency(shippingPriceCentes)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${farmatCurrency(totalBeforeTaxCentes)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${farmatCurrency(taxCentes)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${farmatCurrency(totalOrder)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
      </div>
     `
    document.querySelector('.js-review-order') 
     .innerHTML = paymentSummaryHtml;
}     