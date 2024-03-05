import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { Dish } from '../interface/dish';
import {MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MatTableModule, MatSort, MatSortModule, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{

  shoppingCart: Dish[] = []; 

  displayedColumns: string[] = ['name', 'price'];
  
  constructor(
    private shopService: ShoppingCartService
  ){}

  ngOnInit() { // get all the dishes from the cart
    this.shoppingCart = this.shopService.getCart();
    console.log(this.shoppingCart)
  }
}
