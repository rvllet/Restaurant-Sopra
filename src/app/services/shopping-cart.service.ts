import { Injectable } from '@angular/core';
import { Dish } from '../interface/dish';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  shoppingCart: Dish[] = [];

  constructor() { }

  addDish(dish: Dish): void{
    this.shoppingCart.push(dish);
    this.saveLocalStorage();
  }

  getCart(){
    let storedCart = localStorage.getItem('shoppingCart');
    if(storedCart === null){
      this.shoppingCart = [];
    }else{
      this.shoppingCart = JSON.parse(storedCart);
    }
    return this.shoppingCart
  }
  

  removeDish(dish: Dish): void{
    if(!this.shoppingCart?.includes(dish)){
      return;
    }
    const position = this.shoppingCart.indexOf(dish);
    this.shoppingCart.splice(position, 1);
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
    if(!this.shoppingCart){
      return total;
    }
    this.shoppingCart.forEach(dish => {
      total += dish.price;
    });
    return total;
  }

  private saveLocalStorage(){
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

}
