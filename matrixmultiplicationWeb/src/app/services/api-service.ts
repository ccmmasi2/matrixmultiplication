import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  
  getProcessById(id: number): Observable<InputCreate | undefined> {
    return this.http
      .get<{
        responseCode: number;
        message: string;
        status: boolean;
        data: InputCreate;
      }>(`${this.baseUrl}/api/Process/${id}`)
      .pipe(
        map((response) => response.data),
        catchError((error) => of(undefined))
      );
  }

  addProcess(inputCreate: InputCreate): Observable<number> {
    return this.http
      .post<{
        responseCode: number;
        message: string;
        status: boolean;
        data: number;
      }>(`${this.baseUrl}/api/Process`, inputCreate)
      .pipe(
        map((response) => response.data),
        catchError((error) => of(0))
      );
  }

}
