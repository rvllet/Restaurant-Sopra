import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { Dish } from '../interface/dish';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';

import {MatSnackBar} from '@angular/material/snack-bar';
import { shopDish } from '../interface/shopDish';


@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MatTableModule, MatSort, MatSortModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{

  shoppingCart: shopDish[] = []; 

  displayedColumns: string[] = ['name','quantity', 'price', 'icons'];
  
  durationInSeconds = 5;

  totalPayment: number = 0;

  constructor(
    private shopService: ShoppingCartService,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit() { // get all the dishes from the cart
    this.shoppingCart = this.shopService.getCart();
    console.log(this.shoppingCart)
  }

  removeDish(dish: Dish): void{
    this.shopService.removeDish(dish); 
    this.shoppingCart = this.shopService.getCart();
  }

  errorCart(){
    this._snackBar.open('Error al realitzar la compra.', 'D\'acord');
  }

  shopCart(){
    this.shopService.removeCart();
    this.shoppingCart = this.shopService.getCart();
    this._snackBar.open('Compra realitzada amb éxit', 'D\'acord');
  }

  totalPrice(): void{
    this.totalPayment = this.shopService.totalPrice();
  }



}
