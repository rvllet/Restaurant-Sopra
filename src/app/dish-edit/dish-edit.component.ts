import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Dish } from '../interface/dish';
import { Subscription } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-dish-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,MatFormFieldModule,MatSelectModule, MatInputModule,MatButtonModule],
  templateUrl: './dish-edit.component.html',
  styleUrl: './dish-edit.component.scss'
})

export class DishEditComponent implements OnInit{

  suscription: Subscription | null = null;
  dish: Dish = {
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
    private router: Router,
    private service: DishService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(){ // Fetches dish data on component initialization
    const id = this.route.snapshot.params['id'];
    this.getDish(id);
  }

  ngOnDestroy(): void {  // Unsubscribe from dish data stream on component destruction
    this.suscription?.unsubscribe();
  }

  editDish(){ // Edits a dish
    console.log(this.dish.id);
    console.log(this.dish);
    this.service.editDish(this.dish.id, this.dish).subscribe({
      next: () => this.service.getMenu(),
      error: err => console.error(err),
      complete: () => console.log('Plat editat')
    });
    this.router.navigate(['dishes/edit']);
  }

  changeImage(fileInput: HTMLInputElement) { // Updates dish image
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.dish.image = reader.result as string;
    });
  }

  private getDish(id: string){ // Fetches dish details by ID
    this.suscription = this.service.getDish(id).subscribe({
      next: response =>{
        this.dish = response
      },
      error: err => console.error(err),
      complete: () => console.log('Plat obtingut')
    });
  }
}
