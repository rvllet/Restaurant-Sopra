import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { DishService } from './services/dish.service';
import { UserService } from './services/user.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import { ShoppingCartService } from './services/shopping-cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent, RouterLink, RouterLinkActive, MatToolbarModule, MatIconModule, MatMenuModule, MatBadgeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-gestionmenus-judit';

  
  constructor(private service:DishService, protected usersService: UserService, protected shopService: ShoppingCartService){

  }

  ngOnInit(): void {
    this.service.getMenu();
   
  }
}
