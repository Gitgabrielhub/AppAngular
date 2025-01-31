import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../enviroments';



@Injectable({
  providedIn: 'root'
})
export class FinanceApiService {
   private apiUrl = `http://api.binance.com/api/v3/ticker/price`;
   

  constructor(private http: HttpClient) { }

  getNegociacoes():Observable<any>{
    return this.http.get(this.apiUrl);
  }

}
