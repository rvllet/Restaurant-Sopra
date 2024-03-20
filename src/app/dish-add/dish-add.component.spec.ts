import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishAddComponent } from './dish-add.component';

xdescribe('DishAddComponent', () => {
  let component: DishAddComponent;
  let fixture: ComponentFixture<DishAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishAddComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DishAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
