class Cart {

    cartItem;          //cartItem = undefined;
    #localStorageKey;  //localStorageKey = undefined;
    
      constructor(localStorageKey){
          this.#localStorageKey = localStorageKey;
          this.#loadFromCard();   
                
    }
           
    #loadFromCard() {
        this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey)) 
                    
        if(!this.cartItem){
  
        this.cartItem = [{
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

      storeLocal(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItem));
    }

    addToCart(productId){
            
        let matchingName;

     this.cartItem.forEach((cartItem)=>{
          
           if(productId === cartItem.productId){
             matchingName = cartItem ;
           }
           
     });  

     const quantitySelector =document.querySelectorAll(`
         .product-quantity-Selector-${productId}`);

       const Quantity =Number(quantitySelector.value)
      
       if(matchingName){

          matchingName.Quantity += Quantity ;
       } 
    else {  
      this.cartItem.push({ 
       productId ,  
       Quantity ,
       deliveryOptionId : '1',
     })
   }
   
  this.storeLocal();
   }
        
   removeFromCart(productId){
               
    const newCart =[];
    
        this.cartItem.forEach((cartItem)=>{
 
         if(cartItem.productId !== productId){
            
              newCart.push(cartItem);
         }
        })
        
     this.cartItem= newCart ;
      this.storeLocal();     
 } 
  updateDeliveryOption(productId, deliveryOptionId){
      
    let matchingName;
     this.cartItem.forEach((cartItem)=>{
         
          if(productId === cartItem.productId){
            matchingName = cartItem ;
          }      
     });
  
    matchingName.deliveryOptionId = deliveryOptionId;
    
    this.storeLocal();
  }
  
}
  
    const cart= new Cart('cart-oop')
    const business = new Cart('cart-business')
    
    console.log(cart)
    console.log(business);
    console.log(business instanceof Cart) 
    
    
    
     
    
     
     
     
             
    
    
    