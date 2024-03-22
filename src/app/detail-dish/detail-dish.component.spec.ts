import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDishComponent } from './detail-dish.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Dish } from '../interface/dish';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Comment } from '../interface/comment';
import { CommentsService } from '../services/comments.service';
import { UserService } from '../services/user.service';
import { User } from '../interface/user';

describe('DetailDishComponent', () => {
  let component: DetailDishComponent;
  let dishesServiceMock: any;
  let commentsServiceMock: any;
  let userServiceMock: any;
  let fixture: ComponentFixture<DetailDishComponent>;
  const ActivatedRouteMock = {
    snapshot: {
      params: {
        id: '1',
      },
    },
  };

  const dishMock: Dish = {
    id: '1',
    name: '',
    description: '',
    ingredients: '',
    price: 0,
    category: '',
    image: '',
  };
  const commentMock: Comment = {
    id: '',
    user_id: '',
    dish_id: '1',
    comment: '',
    rating: 0
  };
  const commentsListMock: Comment[] = [];
  const userMock: User = {
    id: '1',
    username: '',
    password: '',
    email: '',
    role: ''
  };
  let shopServiceMock = {
    addDish: jasmine.createSpy(),
    getDish: jasmine.createSpy().and.returnValue(dishMock)
  };

  beforeEach(async () => {
    dishesServiceMock = {
      getDish: jasmine.createSpy().and.returnValue(of(dishMock)),
    };

    commentsServiceMock = {
      getComments: jasmine.createSpy().and.returnValue(of(commentsListMock)),
      addComment: jasmine.createSpy().and.returnValue(of(commentMock))
    };
    userServiceMock = {
      getId: jasmine.createSpy().and.returnValue(userMock.id),
      getCurrentSession: jasmine.createSpy(),
    }
    await TestBed.configureTestingModule({
      imports: [DetailDishComponent, RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      providers: [
        { provide: DishService, useValue: dishesServiceMock },
        { provide: CommentsService, useValue: commentsServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: ShoppingCartService, useValue: shopServiceMock },
        { provide: ActivatedRoute, useValue: ActivatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call methods on Init', () => {
    //cal comprovar els metodes privats ja que es fa a través d'una cridada
    expect(dishesServiceMock.getDish).toHaveBeenCalledWith(ActivatedRouteMock.snapshot.params.id);
    expect(component.dish).toEqual(dishMock);

    expect(commentsServiceMock.getComments).toHaveBeenCalledWith(ActivatedRouteMock.snapshot.params.id);
    expect(component.comments).toEqual(commentsListMock);
  });

  it('should add to Cart', () => {
    component.addToCart(dishMock);
    expect(shopServiceMock.addDish).toHaveBeenCalledWith(dishMock);
  });

  it('should create a new comment', () => {
    component.newComment();
    expect(userServiceMock.getId).toHaveBeenCalled();
    expect(component.inputComment.user_id).toEqual(userMock.id);
    expect(component.inputComment.dish_id).toEqual(ActivatedRouteMock.snapshot.params.id);
    expect(component.inputComment.id).toEqual(component.inputComment.id); //???????????????
    expect(commentsServiceMock.addComment).toHaveBeenCalledOnceWith(component.inputComment);
    expect(commentsServiceMock.getComments).toHaveBeenCalledWith(ActivatedRouteMock.snapshot.params.id);
    expect(component.comments).toEqual(commentsListMock);
  });
});
