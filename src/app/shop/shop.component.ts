import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { Dish } from '../interface/dish';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MatTableModule, MatSort, MatSortModule, CommonModule,MatIconModule,MatButtonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{

  shoppingCart: Dish[] = []; 

  displayedColumns: string[] = ['name', 'price', 'icons'];
  
  constructor(
    private shopService: ShoppingCartService
  ){}

  ngOnInit() { // get all the dishes from the cart
    this.shoppingCart = this.shopService.getCart();
    console.log(this.shoppingCart)
  }

  removeDish(dish: Dish): void{
    this.shopService.removeDish(dish);
    this.shoppingCart = this.shopService.getCart();
  }
  removeCart(){
    //mostrará un mensaje tipo "ha ocurrido un error, inténtalo de nuevo mas tarde"
  }

  shopCart(){
    this.shopService.removeCart();
    this.shoppingCart = this.shopService.getCart();
  }

  totalPrice(): number{
    return this.shopService.totalPrice();
  }

}
