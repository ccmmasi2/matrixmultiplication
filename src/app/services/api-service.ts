import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inputList } from '@app/models/inputList.model';
import { environment } from 'enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getListInputOptions(): Observable<inputList[]> {
    return this.http.get<inputList[]>(`${this.baseUrl}/api/v1/User`);
  }
}
