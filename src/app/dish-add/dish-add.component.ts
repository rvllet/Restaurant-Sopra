import { Component } from '@angular/core';
import { Dish } from '../interface/dish';
import { DishService } from '../services/dish.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-dish-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,MatFormFieldModule,MatSelectModule, MatInputModule,MatButtonModule],
  templateUrl: './dish-add.component.html',
  styleUrl: './dish-add.component.scss'
})
export class DishAddComponent {

  inputDish: Dish = {
    id: '',
    name: '',
    description: '',
    ingredients: '',
    price: 0,
    category: '',
    enabled: true,
    image: '',
  }

  constructor( // Injects dependencies
    private service: DishService,
    private router: Router,
  ) { }

  newDish() { // adds new dish to the database
    this.inputDish.id = this.generateId();
    this.service.addDish(this.inputDish);
    this.goBack();
  }

  changeImage(fileInput: HTMLInputElement) { // Updates dish image
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.inputDish.image = reader.result as string;
    });
  }

  private goBack() {
    this.router.navigate(['dishes/edit']);
  }

  private generateId(): string {

    const randomId = Math.floor(Math.random() * 999999999);
    return randomId.toString();
  }
}
