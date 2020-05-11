import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  // Base url
  baseurl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

 // POST
  signIn(data): Observable<any> {
    return this.http.post<any>(this.baseurl + '/signin/', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }  

    // GET
  getPost(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/posts')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  sendComment(data): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    }
    return this.http.put<any>(this.baseurl + '/post/comment',data, httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  signOut(): Observable<any> {
    return this.http.get<any>(this.baseurl + '/signout')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  sendPost(data, userId): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    }
    return this.http.post<any>(this.baseurl + `/post/new/${userId}`, data, httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }  

   // Error handling
  errorHandl(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }

}