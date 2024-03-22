import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dish } from '../interface/dish';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-dish',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.scss'
})
export class DishComponent {

  @Input() dish!: Dish;
  @Output() delete = new EventEmitter<string>();

  constructor(private router: Router) {

  }

  deleteDish(): void { // deletes the dish
    if (confirm('Segur que vols eliminar aquest plat?')) {
      this.delete.emit(this.dish.id);
    }

  }
}
