import { Injectable } from '@angular/core';
import { Power } from './power';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PowerService {

  getPowers(): Observable<Power[]> {
    return this.http.get<Power[]>(this.powersUrl)
      .pipe(
        tap(_ => this.log('fetched Powers')),
        catchError(this.handleError<Power[]>('getPowers', []))
      );
  }

  getPower(id: number): Observable<Power> {
    const url = `${this.powersUrl}/${id}`;
      return this.http.get<Power>(url).pipe(
      tap(_ => this.log(`fetched Power id=${id}`)),
      catchError(this.handleError<Power>(`getPower id=${id}`))
    );
  }
  updatePower(power: Power): Observable<any> {
    //const id = typeof power === 'number' ? power : power.id;
    return this.http.put(`${this.powersUrl}/${power.id}` , power, this.httpOptions).pipe(
      tap(_ => this.log(`updated power id=${power.id}`)),
      catchError(this.handleError<any>('updatepower'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** POST: add a new power to the server */
  addPower(power: Power): Observable<Power> {
    return this.http.post<Power>(this.powersUrl, power, this.httpOptions).pipe(
      tap((newPower: Power) => this.log(`added power w/ id=${newPower.id}`)),
      catchError(this.handleError<Power>('addpower'))
    );
  }

  /** DELETE: delete the power from the server */
  deletePower(power: Power | number): Observable<Power> {
    const id = typeof power === 'number' ? power : power.id;
    const url = `${this.powersUrl}/${id}`;

    return this.http.delete<Power>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted power id=${id}`)),
      catchError(this.handleError<Power>('deletePower'))
    );
  }

  /* GET poweres whose name contains search term */
  searchPower(term: string): Observable<Power[]> {
    if (!term.trim()) {
      // if not search term, return empty power array.
      return of([]);
    }
    return this.http.get<Power[]>(`${this.powersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found poweres matching "${term}"`)),
      catchError(this.handleError<Power[]>('searchpoweres', []))
    );
  }
  assignedHeroes(id: number): Observable<any> {
    const url = `http://localhost:8080/api/power/hero/${id}`;
      return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched Assigned Heroes id=${id}`)),
      catchError(this.handleError<any>(`assignedHeroes id=${id}`))
    );
  }

  private powersUrl = 'http://localhost:8080/api/powers';

  private log(message: string) {
    this.messageService.add(`PowerService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
}
