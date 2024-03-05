import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../interface/dish';

@Pipe({
  name: 'dishFilter',
  standalone: true
})
export class DishFilterPipe implements PipeTransform {


  transform(dish: Dish[], filterBy: string): Dish[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    if (filter) {
      return dish.filter((event: Dish) =>
        event.description.toLocaleLowerCase().includes(filter));
    }
    return dish;
  }

}
