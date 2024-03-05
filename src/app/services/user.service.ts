import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersEndpoint = "users";

  constructor(private http: HttpClient, private router: Router,) { }

  getUser(username: string): Observable<User>{

    return this.http.get<User[]>(`${this.usersEndpoint}?username=${username}`).pipe(
      map(resp => resp[0]),
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error rebent el usuari. Còdi de servidor: ${resp.status}. Missatge: ${resp.message}`))
      ));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersEndpoint}`).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error rebent els comentaris. Còdi de servidor: ${resp.status}. Missatge: ${resp.message}`))
      ));
  }

  storeSession(user: User){
    localStorage.setItem('user', JSON.stringify(user))
  }

  userIsAChef(user: User){
    if (user.role == 'chef'){
      return true;
    }
    return false;

  }

  getCurrentSession(){
    const userJson = localStorage.getItem('user')
    if(userJson != null){
      return JSON.parse(userJson)
    }
    return null;
  }

  getUsername(): string{
    const user = this.getCurrentSession()
    return user.username;
  }

  getEmail(): string{
    const user = this.getCurrentSession()
    return user.email;
  }

  getId(): string{
    const user = this.getCurrentSession()
    return user.id;
  }

  getRole(): string{
    const user = this.getCurrentSession()
    return user.role;
  }

  removeSession(){

      localStorage.removeItem('user');
      this.router.navigate(['/welcome']);

  }

}
