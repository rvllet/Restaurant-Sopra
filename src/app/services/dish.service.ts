import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Dish, MenuList } from '../interface/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private dishesEndpoint = "dishes";
  private _dishes = new BehaviorSubject<MenuList | null>(null);
  dishes$ = this._dishes.asObservable();

  constructor(private http: HttpClient) { }

  getMenu(): void {

    this.http.get<Dish[]>(this.dishesEndpoint).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error rebent els plats. Còdi de servidor: ${resp.status}. Missatge: ${resp.message}`))
      )).subscribe({
        next: (response: Dish[]) => {
          const listMenu = new MenuList(response);
          this._dishes.next(listMenu)
        }
      });

  }

  getDish(id: string): Observable<Dish> {

    return this.http.get<Dish>(`${this.dishesEndpoint}/${id}`).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error rebent el plat. Còdi de servidor: ${resp.status}. Missatge: ${resp.message}`))
      ));
  }

  addDish(dishInput?: Dish): void {

    this.http.post<Dish>(this.dishesEndpoint, dishInput).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error al crear el plat. Còdi de servidor: ${resp.status}. Missatge: ${resp.message}`))
      )).subscribe({
        next: () => this.getMenu()
      });
  }

  editDish(id: string, dishInput: Dish): Observable<Dish> {

    return this.http.put<Dish>(`${this.dishesEndpoint}/${id}`, dishInput).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error al editar el plat. Còdi de servidor: ${resp.status}. Missatge: ${resp.message}`))
      ));
  }

  deleteDish(id: string): void {

    this.http.delete<void>(`${this.dishesEndpoint}/${id}`).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error al eliminar el plat. Còdi de servidor: ${resp.status}. Missatge: ${resp.message}`)
        )
      )).subscribe({
        next: () => this.getMenu()
      });
  }

}

