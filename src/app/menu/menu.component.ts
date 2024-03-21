import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dish, IDish, MenuList } from '../interface/dish';
import { CommonModule } from '@angular/common';
import { DishComponent } from '../dish/dish.component';
import { DishService } from '../services/dish.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DishFilterPipe } from '../pipes/dish-filter.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, DishComponent, RouterLink, FormsModule, DishFilterPipe, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, OnDestroy {

  dishes: IDish[] = [];

  filteredList: Dish[] | null = null;

  listMenu: MenuList | null = null;

  suscription: Subscription | null = null;

  filterSearch = '';

  sortByDateAsc = false;

  sortByPriceAsc = false;


  constructor(
    private service: DishService,
    private shopService: ShoppingCartService
  ) { }

  ngOnDestroy(): void { //unsuscribes
    this.suscription?.unsubscribe();
  }

  ngOnInit() { // get all the dishes from the database
    this.loadDishes();
  }

  addToCart(dish: Dish): void {
    this.shopService.addDish(dish);
    console.log('added');
  }

  sortByPrice() { // sorts the dishes by price
    if (!this.listMenu) return

    this.sortByPriceAsc = !this.sortByPriceAsc;
    this.listMenu.dishes = this.sortByPriceAsc ? this.listMenu.sortByPriceAsc() : this.listMenu.sortByPriceDesc();

  }

  private loadDishes() { // get all the dishes from the database
    this.suscription = this.service.dishes$.subscribe({
      next: response => {
        this.listMenu = response

      },
      error: err => console.error(err),
      complete: () => console.log('Plats obtinguts')

    });
  }
}
