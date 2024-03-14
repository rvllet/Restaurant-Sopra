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
   
    if(!this.isInCart(dish)){
      const newDish = new shopDish(dish, 1);
      this.shoppingCart.push(newDish);
    }else{
      let position = this.findPositionInArray(dish);
      this.shoppingCart[position].quantity++;
    }
    this.updateItemsList();
    this.saveLocalStorage();

  }

  getCart(){
    let storedCart = localStorage.getItem('shoppingCart');
    if(!storedCart){
      console.log('no esta entrant aci')
      this.shoppingCart = [];
    }
    console.log('esta entrant aci')
    this.shoppingCart = JSON.parse(storedCart!);
    
    return this.shoppingCart;
  }

  removeDish(dish: Dish): void{ 
    if(this.isInCart(dish)){

      let position = this.findPositionInArray(dish);

      if(this.shoppingCart[position].quantity > 1){
        this.shoppingCart[position].quantity--;
      }else{
        this.shoppingCart.splice(position, 1);
      } 
    }
    this.updateItemsList();
    this.saveLocalStorage();
  }

  removeCart(): void{
    localStorage.removeItem('shoppingCart'); 
    this.saveLocalStorage();
  
  }

  updateItemsList(): void{
    this.itemsTotals = this.shoppingCart.length;
    
  }
  
  totalPrice(): number{
    const inicialValue = 0;
    return this.shoppingCart.reduce((total, dishCurrent) => total + (dishCurrent.dish.price*dishCurrent.quantity), inicialValue)
  }

  private findPositionInArray(dish: Dish): number{
    const elementFound = this.shoppingCart.find((cart) => cart.dish.id === dish.id);
    return this.shoppingCart.indexOf(elementFound!);
  }

  private isInCart(dish: Dish): boolean{
    return this.shoppingCart.some((cart) => cart.dish.id === dish.id);
  }
  private saveLocalStorage(){
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

}
