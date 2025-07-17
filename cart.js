export let cart;

  loadFromCard();
 export function loadFromCard(){
        cart = JSON.parse(localStorage.getItem('cart')) 

         if(!cart){
   
         cart = [{
              productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              Quantity:2,
              deliveryOptionId: '1',
            },
            {
              productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
              Quantity:2,
              deliveryOptionId: '2',
            } ];
          }
      } 
            function storeLocal(){

                localStorage.setItem('cart',JSON.stringify(cart));
            }
              

export function addToCard(productId){
      
         let matchingName;

      cart.forEach((cartItem)=>{
           
            if(productId === cartItem.productId){
              matchingName = cartItem ;
            }
            
      });

      const quantitySelector = document.querySelector(`
          .product-quantity-Selector-${productId}`);

        const Quantity =Number(quantitySelector.value)
       
        if(matchingName){

          matchingName.Quantity +=Quantity ;
       } 
      else{  
          cart.push({ 
           productId ,  
           Quantity ,
           deliveryOptionId: '1',
         })
       }
       
      storeLocal()
    }  

    
    
export function removeFromCart(productId){
           
   const newCart =[];
   
       cart.forEach((cartItem)=>{

        if(cartItem.productId !== productId){
           
             newCart.push(cartItem);
        }
       })
       
     cart = newCart ;
     storeLocal();     
}

export function updateDeliveryOption(productId, deliveryOptionId){
  
  let matchingName;
   cart.forEach((cartItem)=>{
       
        if(productId === cartItem.productId){
          matchingName = cartItem ;
        }      
   });

  matchingName.deliveryOptionId = deliveryOptionId;
  
  storeLocal();
}
