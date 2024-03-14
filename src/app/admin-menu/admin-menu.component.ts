import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDish, MenuList } from '../interface/dish';
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



@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [CommonModule, DishComponent, RouterLink, DishFilterPipe, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.scss'
})
export class AdminMenuComponent implements OnInit, OnDestroy {

  dishes: IDish[] = [];

  listMenu: MenuList | null = null;

  sortByDateAsc = false;

  sortByPriceAsc = false;

  suscription: Subscription | null = null;

  filterSearch = '';


  constructor(
    private service: DishService,
  ) { }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  ngOnInit() {
    this.loadDishes();
  }

  sortByPrice() {
    if (!this.listMenu) return

    this.sortByPriceAsc = !this.sortByPriceAsc;
    this.listMenu.dishes = this.sortByPriceAsc ? this.listMenu.sortByPriceAsc() : this.listMenu.sortByPriceDesc();

  }

  deleteDish(id: string) {
    this.service.deleteDish(id);
  }


  private loadDishes() {
    this.suscription = this.service.dishes$.subscribe({
      next: response => {
        console.log(response);
        this.listMenu = response

      },
      error: err => console.error(err),
      complete: () => console.log('Plats obtinguts')

    });
  }
}



