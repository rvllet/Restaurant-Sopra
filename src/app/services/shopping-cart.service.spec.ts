import { TestBed } from '@angular/core/testing';

import { ShoppingCartService } from './shopping-cart.service';
import { Dish } from '../interface/dish';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;
  let controller: HttpTestingController;

  const dishMock: Dish = {
    id: '',
    name: '',
    description: '',
    ingredients: '',
    price: 0,
    category: '',
    image: ''
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ShoppingCartService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
