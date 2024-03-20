import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDishComponent } from './detail-dish.component';

xdescribe('DetailDishComponent', () => {
  let component: DetailDishComponent;
  let fixture: ComponentFixture<DetailDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailDishComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetailDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
