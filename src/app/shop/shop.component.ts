import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { Dish } from '../interface/dish';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MatTableModule, MatSort, MatSortModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{

  shoppingCart: Dish[] = []; 

  displayedColumns: string[] = ['name', 'price', 'icons'];
  
  durationInSeconds = 5;

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

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  

}
