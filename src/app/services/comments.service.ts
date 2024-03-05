import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Comment } from '../interface/comment';


@Injectable({
  providedIn: 'root'
})

export class CommentsService {

  private commentsEndpoint = "comments";

  constructor(private http: HttpClient) { }

  getComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentsEndpoint}?dish_id=${id}`).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error rebent els comentaris. Còdi de servidor: ${resp.status}. Missatge: ${resp.message}`))
      ));
  }

  addComment(commentInput: Comment): void {
    this.http.post<Comment>(this.commentsEndpoint, commentInput).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error al crear el plat. Còdi de servidor: ${resp.status}. Missatge: ${resp.message}`))
      )).subscribe({
        next: () => this.getComments(commentInput.dish_id)
      });
  }
}


