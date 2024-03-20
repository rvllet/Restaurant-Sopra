import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopComponent } from './shop.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { shopDish } from '../interface/shopDish';
import { Dish } from '../interface/dish';

describe('ShopComponent', () => {
  const dishMock: Dish = {
    id: '',
    name: '',
    description: '',
    ingredients: '',
    price: 0,
    category: '',
    image: ''
  }
  const totalPriceMock = 100;
  const cartMock: shopDish[] = []; // array de shoplist
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;

  let shopServiceMock = {
    getCart: jasmine.createSpy().and.returnValue(cartMock),
    removeDish: jasmine.createSpy(),
    shopCart: jasmine.createSpy(),
    removeCart: jasmine.createSpy(),
    totalPrice: jasmine.createSpy().and.returnValue(totalPriceMock)
  }
  let matSnackbarMock = {
    open: jasmine.createSpy()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopComponent],
      providers: [{ provide: ShoppingCartService, useValue: shopServiceMock }, { provide: MatSnackBar, useValue: matSnackbarMock }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define shoppingCart in OnInit', () => {
    expect(shopServiceMock.getCart).toHaveBeenCalled();
    expect(component.shoppingCart).toEqual(cartMock);
  });

  it('should call removeDish and getCart', () => {
    component.removeDish(dishMock);
    expect(shopServiceMock.removeDish).toHaveBeenCalledWith(dishMock);

    expect(shopServiceMock.getCart).toHaveBeenCalled();
    expect(component.shoppingCart).toEqual(cartMock);

  });

  it('should call shopCart', () => {
    component.shopCart();
    expect(shopServiceMock.removeCart).toHaveBeenCalled();
    expect(shopServiceMock.getCart).toHaveBeenCalled();
    expect(component.shoppingCart).toEqual(cartMock);
    expect(matSnackbarMock.open).toHaveBeenCalled();

  });

  it('should call totalPrice', () => {
    component.totalPrice();
    expect(shopServiceMock.totalPrice).toHaveBeenCalled();
    expect(component.totalPayment).toEqual(totalPriceMock);
  });

  it('should call open in errorCart', () => {
    component.errorCart();
    expect(matSnackbarMock.open).toHaveBeenCalled();
  });

});  