import { Injectable } from '@angular/core';
import { Dish } from '../interface/dish';
import { shopDish } from '../interface/shopDish';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  shoppingCart: shopDish[] = [];

  constructor() { }

  addDish(dish: Dish): void{
    let exists: boolean = false;
    
    this.shoppingCart.forEach(addedDish => {
      if(addedDish.dish.id === dish.id){
        exists = true;
        ++addedDish.quantity;
      }
    });
    if(!exists){
      const addDish = new shopDish(dish, 1);
      this.shoppingCart.push(addDish);
    }
    this.saveLocalStorage();

  }

  getCart(){
    let storedCart = localStorage.getItem('shoppingCart');
    if(!storedCart){
      this.shoppingCart = [];
    }else{
      this.shoppingCart = JSON.parse(storedCart);
    }
    return this.shoppingCart
  }
  

  removeDish(position: number): void{ 
    if(this.shoppingCart[position].quantity > 1){
      --this.shoppingCart[position].quantity;
    }else if (this.shoppingCart[position].quantity = 1) {
      this.shoppingCart.splice(position, 1);
    } 
    this.saveLocalStorage();
  }

  removeCart(): void{
    localStorage.removeItem('shoppingCart');
    this.totalItems();
  }
  
  totalItems(): number{
    if(!this.shoppingCart?.length){
      return 0
    }
    return this.shoppingCart.length
  }
  
  totalPrice(): number{
    let total = 0;
    this.shoppingCart.forEach(existingDish => {
      total += existingDish.dish.price*existingDish.quantity
    });
    return total;
  }

  private saveLocalStorage(){
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

}
