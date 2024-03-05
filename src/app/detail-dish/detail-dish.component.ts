import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DishComponent } from '../dish/dish.component';
import { Dish } from '../interface/dish';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Subscription } from 'rxjs';
import { CommentsService } from '../services/comments.service';
import { Comment } from '../interface/comment';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-detail-dish',
  standalone: true,
  imports: [CommonModule, DishComponent, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './detail-dish.component.html',
  styleUrl: './detail-dish.component.scss'
})

export class DetailDishComponent implements OnInit{

  suscription: Subscription | null = null;
  dish: Dish | null = null;
  comments: Comment[] | null = null;
  inputComment: Comment = {
      id: '',
      user_id: '1',
      dish_id: '',
      comment: '',
      rating: 0,
  }


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: DishService,
    private commentservice: CommentsService,
    private userservice: UserService,
    protected usersService: UserService

  ) { }

  ngOnInit(){ // fetches the data from the this on inizialize

    const id = this.route.snapshot.params['id'];
    this.getDish(id);
    this.getComments(id);

  }

  ngOnDestroy(): void { // unsuscribes
    this.suscription?.unsubscribe();
  }

  goBack() { // navigates the routes
    this.router.navigate(['dishes']);
  }

  newComment(){ // adds a new comment
    const id = this.route.snapshot.params['id'];
    this.inputComment.user_id = this.userservice.getId();
    this.inputComment.dish_id = id;
    this.inputComment.id = this.generateId();
    this.commentservice.addComment(this.inputComment);
    this.getComments(id);

  }

  private getDish(id: string){ // gets the dish by id
    this.suscription = this.service.getDish(id).subscribe({
      next: response =>{
        this.dish = response
      },
      error: err => console.error(err),
      complete: () => console.log('Plat obtingut')
    });
  }


  private getComments(id: string){
    this.suscription = this.commentservice.getComments(id).subscribe({
      next: response =>{
        this.comments = response
      },
      error: err => console.error(err),
      complete: () => console.log('Plat obtingut')
    });
  }

  private generateId(): string {

    const randomId = Math.floor(Math.random() * 999999999);
    return randomId.toString();
  }
}
