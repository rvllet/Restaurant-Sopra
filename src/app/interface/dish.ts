export interface IDish {

  id: string,
  name: string;
  description: string;
  ingredients: string;
  price: number;
  category: string;
  enabled?: boolean;
  image: string;

}

export class Dish {

  id: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  category: string;
  enabled?: boolean;
  image: string;

  constructor(dish: IDish) {

    this.id = dish.id;
    this.name = dish.name;
    this.description = dish.description;
    this.ingredients = dish.ingredients;
    this.price = dish.price;
    this.category = dish.category;
    this.enabled = dish.enabled;
    this.image = dish.image;

  }

}

export class MenuList {

  dishes: Dish[];


  constructor(dishes: IDish[]) {
    this.dishes = dishes.map(dish => { return new Dish(dish) });
  }

  sortByPriceAsc() {
    const isOrderAscending = true;
    return this.sortByPrice(isOrderAscending);
  }

  sortByPriceDesc() {
    const isOrderAscending = false;
    return this.sortByPrice(isOrderAscending);
  }

  filterByCategory(filterSeach: string){
    const filteredList: Dish[] = [];
    this.dishes.forEach(dish => {
        if(filterSeach.includes(dish.category)){
          filteredList.push(dish);
        }
    });
    return filteredList;
  }


  private sortByPrice(sortByPriceAsc: boolean) {
    if(this.dishes){
    return this.dishes.sort((a: Dish, b: Dish) => {
      if (sortByPriceAsc) {
        return a.price - b.price;
      }

      return b.price - a.price;

    })
  }
    return this.dishes
  }

}
