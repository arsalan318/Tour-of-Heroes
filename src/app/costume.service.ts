import { Injectable } from '@angular/core';
import { Costume } from './costume';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CostumeService {

  getCostumes(): Observable<Costume[]> {
    return this.http.get<Costume[]>(this.costumeUrl)
      .pipe(
        tap(_ => this.log('fetched Costume')),
        catchError(this.handleError<Costume[]>('getCostume', []))
      );
  }

  getCostume(id: number): Observable<Costume> {
    const url = `${this.costumeUrl}/${id}`;
      return this.http.get<Costume>(url).pipe(
      tap(_ => this.log(`fetched Costume id=${id}`)),
      catchError(this.handleError<Costume>(`getCostume id=${id}`))
    );
  }
  updateCostume(costume: Costume): Observable<any> {
    //const id = typeof Costume === 'number' ? Costume : Costume.id;
    return this.http.put(`${this.costumeUrl}/${costume.costumeId}` , costume, this.httpOptions).pipe(
      tap(_ => this.log(`updated costume id=${costume.costumeId}`)),
      catchError(this.handleError<any>('updatecostume'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** POST: add a new Costume to the server */
  addCostume(costume: Costume): Observable<Costume> {
    return this.http.post<Costume>(this.costumeUrl, costume, this.httpOptions).pipe(
      tap((newCostume: Costume) => this.log(`added costume w/ id=${newCostume.costumeId}`)),
      catchError(this.handleError<Costume>('addcostume'))
    );
  }

  /** DELETE: delete the Costume from the server */
  deleteCostume(costume: Costume | number): Observable<Costume> {
    const id = typeof costume === 'number' ? costume : costume.costumeId;
    const url = `${this.costumeUrl}/${id}`;

    return this.http.delete<Costume>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Costume id=${id}`)),
      catchError(this.handleError<Costume>('deleteCostume'))
    );
  }
  //Add Hero Costume

  addHeroCostume(cid,hid): Observable<any> {
    return this.http.put(`${this.costumeUrl}/hero`,{cid,hid}, this.httpOptions).pipe(
      tap(_ => this.log(`hero Costume added costume id=${cid}`)),
      catchError(this.handleError<any>('addHeroCostume'))
    );
  }
  removeHeroCostume(hid): Observable<any> {
    return this.http.put(`${this.costumeUrl}/hero/remove`,{hid}, this.httpOptions).pipe(
      tap(_ => this.log(`hero Costume removed`)),
      catchError(this.handleError<any>('removeHeroCostume'))
    );
  }
 
  //Get Assigned Heroes
  assignedHeroes(cid: number): Observable<any> {
    const url = `${this.costumeUrl}/assignedHero/${cid}`;
      return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched Assigned Heroes id=${cid}`)),
      catchError(this.handleError<any>(`assignedHeroes id=${cid}`))
    );
  }

  private costumeUrl = 'http://localhost:8080/api/costume';

  private log(message: string) {
    this.messageService.add(`CostumeService: ${message}`);
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
