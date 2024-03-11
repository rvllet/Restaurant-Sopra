import { Injectable } from '@angular/core';
import { Dish } from '../interface/dish';
import { shopDish } from '../interface/shopDish';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  shoppingCart: shopDish[] = [];
  itemsTotals: number = 0;

  addDish(dish: Dish): void{ //is in Shop funció que sols comprove si existeixs array.some()
    let exists: boolean = false;
    
    this.shoppingCart.forEach(addedDish => {
      if(addedDish.dish.id === dish.id){
        exists = true;
        addedDish.quantity++;
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
    }
    this.shoppingCart = JSON.parse(storedCart!);
    return this.shoppingCart
  }
  

  removeDish(position: number): void{ 
    if(this.shoppingCart[position].quantity > 1){
      this.shoppingCart[position].quantity--;
    }else{
      this.shoppingCart.splice(position, 1);
    } 
    this.saveLocalStorage();
  }

  removeCart(): void{
    localStorage.removeItem('shoppingCart');
    this.itemsTotals = this.totalItems();// asignar una variable al service
  }
  
  //total items i total price estarien més correctes a la classe
  totalItems(): number{
    console.log('vaa?')
    if(!this.shoppingCart?.length){
      return this.itemsTotals
    }
    return this.itemsTotals = this.shoppingCart.length;
  }
  
  totalPrice(): number{
    const inicialValue = 0;
    return this.shoppingCart.reduce((total, dishCurrent) => total + (dishCurrent.dish.price*dishCurrent.quantity), inicialValue)
  }

  private saveLocalStorage(){
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

}
