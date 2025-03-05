import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../enviroments';
import { APIs } from '../apis';




@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

private apiUrl = APIs.baseApiUrl

  constructor(private http:HttpClient) { }
  
  getMoedas(page:number, limit:number  ):Observable<any[]>{
    const url =`${this.apiUrl}?_page=${page}&_limit=${limit}` 
      return this.http.get<any[]>(url)

  }
}
