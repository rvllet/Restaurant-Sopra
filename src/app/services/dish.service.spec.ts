import { TestBed } from '@angular/core/testing';

import { DishService } from './dish.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Dish, MenuList } from '../interface/dish';

describe('DishService', () => {
  let service: DishService;
  let controller: HttpTestingController;

  const dishMock: Dish = {
    id: '1',
    name: '',
    description: '',
    ingredients: '',
    price: 0,
    category: '',
    image: ''
  }
  const dishListMock: Dish[] = [];
  const menuMock = new MenuList(dishListMock);


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DishService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the menuList with getMenu', (done: DoneFn) => {
    //ens conectem a la variable publica per a vore si esta inicialitzada correctament
    const initialSuscribe = service.dishes$.subscribe((response) => {
      expect(response).toEqual(null);
    });
    //tanquem la suscripció
    initialSuscribe.unsubscribe();

    //cridem al metode i fem les comprovacions de request
    service.getMenu();
    const req = controller.expectOne(`dishes`);
    expect(req.request.method).toBe('GET');
    req.flush(dishListMock);

    //comprovem si la variable observable ha rebut canvis
    service.dishes$.subscribe((response) => {
      expect(response).toEqual(menuMock);
      done();
    });
  });

  it('should get a dish with getDish', (done: DoneFn) => {
    service.getDish(dishMock.id).subscribe((response) => {
      expect(response).toBe(dishMock);
      done();
    });
    const req = controller.expectOne(`dishes/${dishMock.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(dishMock);
  });

  it('should add a dish with addDish', (done: DoneFn) => {
    const getMenuSpy = spyOn(service, 'getMenu');
    const initialSuscribe = service.dishes$.subscribe((response) => {
      expect(response).toEqual(null);
    });
    initialSuscribe.unsubscribe();

    service.addDish(dishMock);
    const req = controller.expectOne(`dishes`, dishMock.id);
    expect(req.request.method).toBe('POST');
    req.flush(dishListMock);
    done();

    expect(getMenuSpy).toHaveBeenCalled();
  });

  it('should edit a dish with editDish', (done: DoneFn) => {
    service.editDish(dishMock.id, dishMock).subscribe((response) => {
      expect(response).toBe(dishMock);
      done();
    });
    const req = controller.expectOne(`dishes/${dishMock.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(dishMock);
  });

  it('should delete a dish with deleteDish', () => {
    const getMenuSpy = spyOn(service, 'getMenu');
    const initialSuscribe = service.dishes$.subscribe((response) => {
      expect(response).toEqual(null);
    });
    initialSuscribe.unsubscribe();

    service.deleteDish(dishMock.id);
    const req = controller.expectOne(`dishes/${dishMock.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dishListMock);

    expect(getMenuSpy).toHaveBeenCalled();

  });

});
