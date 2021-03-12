import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(public router: Router,private httpClient: HttpClient) { }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  base_path = 'http://192.168.31.53/SmartMirrorAPI/API/';

  getAllWeatherAPI_data(location):Observable<any>{
    return this.httpClient.post<any>(this.base_path+'getAllWeatherAPI_data.php',{location}).pipe(
      map((res) => {
        return res;
    }),
    catchError(this.handleError));
  }

  getAllNewsAPI_data():Observable<any>{
    return this.httpClient.post<any>(this.base_path+'getAllNewsAPI_data.php',{}).pipe(
      map((res) => {
        return res;
    }),
    catchError(this.handleError));
  }

  getOneQuote_data():Observable<any>{
    let headers = new HttpHeaders({
      "x-rapidapi-key": "323f2716f6msh0de975ca3228ce1p181117jsn3aa450a4c4a5",
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
      "useQueryString": 'true'
    });
    let options = {
      headers: headers
    }
  
    return this.httpClient.get<any>('https://quotes15.p.rapidapi.com/quotes/random/',options).pipe(
      map((res) => {
        return res;
    }),
    catchError(this.handleError));
  }

}
