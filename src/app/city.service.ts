import { Injectable } from '@angular/core';
import { City } from './city';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.cityUrl)
      .pipe(
        tap(_ => this.log('fetched Cities')),
        catchError(this.handleError<City[]>('getCities', []))
      );
  }

  getCity(id: number): Observable<City> {
    const url = `${this.cityUrl}/${id}`;
      return this.http.get<City>(url).pipe(
      tap(_ => this.log(`fetched City id=${id}`)),
      catchError(this.handleError<City>(`getCity id=${id}`))
    );
  }
  updateCity(city: City): Observable<any> {
    //const id = typeof power === 'number' ? power : power.id;
    return this.http.put(`${this.cityUrl}/${city.cityId}` , city, this.httpOptions).pipe(
      tap(_ => this.log(`updated city id=${city.cityId}`)),
      catchError(this.handleError<any>('updatecity'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** POST: add a new power to the server */
  addCity(city: City): Observable<City> {
    return this.http.post<City>(this.cityUrl, city, this.httpOptions).pipe(
      tap((newCity: City) => this.log(`added City w/ id=${newCity.cityId}`)),
      catchError(this.handleError<City>('addCity'))
    );
  }

  /** DELETE: delete the power from the server */
  deleteCity(city: City | number): Observable<City> {
    const id = typeof city === 'number' ? city : city.cityId;
    const url = `${this.cityUrl}/${id}`;

    return this.http.delete<City>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted City id=${id}`)),
      catchError(this.handleError<City>('deleteCity'))
    );
  }

  /* GET poweres whose name contains search term */
  searchPower(term: string): Observable<City[]> {
    if (!term.trim()) {
      // if not search term, return empty City array.
      return of([]);
    }
    return this.http.get<City[]>(`${this.cityUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found poweres matching "${term}"`)),
      catchError(this.handleError<City[]>('searchpoweres', []))
    );
  }

  addHeroCity(hid,cid,pcid){
    
    const url=`${this.cityUrl}/addHero`
    return this.http.put<any>(url,{hid,cid,pcid},this.httpOptions).pipe(
      tap((newCity: any) => this.log(`added City`)),
      catchError(this.handleError<any>('addCity'))
    );
  }
  removeHeroCity(hid,cid){
    
    const url=`${this.cityUrl}/removeHero`
    return this.http.put<any>(url,{hid,cid},this.httpOptions).pipe(
      tap((newCity: any) => this.log(`added City`)),
      catchError(this.handleError<any>('addCity'))
    );
  }

  fetchUnAssignedCities(){
    let url=`${this.cityUrl}/hero`
    return this.http.get<City[]>(url)
      .pipe(
        tap(_ => this.log('fetched Cities')),
        catchError(this.handleError<City[]>('getCities', []))
      );
  }
  assignedHeroes(cid: number): Observable<any> {
    const url = `http://localhost:8080/api/cities/assignedHero/${cid}`;
      return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched Assigned Heroes id=${cid}`)),
      catchError(this.handleError<any>(`assignedHeroes id=${cid}`))
    );
  }

 
  private cityUrl = 'http://localhost:8080/api/cities';

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
