import { Injectable } from '@angular/core';
import { Dish } from '../interface/dish';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  shoppingCart: Dish[] = [];

  constructor() { }

  getCart(){
    return this.shoppingCart
  }
  
  addDish(dish: Dish): void{
    this.shoppingCart.push(dish);
    console.log(this.shoppingCart);
  }

  removeDish(dish: Dish): void{
    if(!this.shoppingCart?.includes(dish)){
      return;
    }
    const position = this.shoppingCart.indexOf(dish);
    this.shoppingCart.splice(position, 1);
  }
  
  totalItems(): number{
    if(!this.shoppingCart?.length){
      return 0
    }
    return this.shoppingCart.length
  }

}
