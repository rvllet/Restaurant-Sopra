import { Dish } from "./dish";

export class shopDish {

    dish: Dish;
    quantity: number;
    
    constructor(dish: Dish, quantity : number) {
        this.dish = dish;
        this.quantity = quantity;
    }
}