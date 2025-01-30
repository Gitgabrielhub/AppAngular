import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../enviroments';



@Injectable({
  providedIn: 'root'
})
export class FinanceApiService {
   private apiUrl = `${enviroments.baseApiUrl}/api/finance`;
   //private apiKey = '';

  constructor(private http: HttpClient) { }

  getNegociacoes():Observable<any>{
    return this.http.get(this.apiUrl);
  }

}
