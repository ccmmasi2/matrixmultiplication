import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessPpal } from '@app/interfaces/ProcessPpal';
import { InputCreate } from '@app/models/inputCreate.model';
import { inputList } from '@app/models/inputList.model';
import { environment } from 'enviroment/enviroment';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getListInputOptions(): Observable<inputList[]> {
    return this.http.get<inputList[]>(`${this.baseUrl}/api/Process/GetInputList`);
  }

  getProcessById(id: number): Observable<ProcessPpal | undefined> {
    return this.http
      .get<ProcessPpal>(`${this.baseUrl}/api/Process/${id}`)
      .pipe(
        catchError((error) => of(undefined))
      );
  }

  addProcess(inputCreate: ProcessPpal): Observable<number> {
    const url = `${this.baseUrl}/api/Process`;  

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post<number>(url, inputCreate, httpOptions)
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error:', error);
          return of(0); 
        })
      );
  }

}
