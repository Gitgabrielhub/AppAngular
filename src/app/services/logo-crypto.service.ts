import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../enviroments';
import { APIs } from '../apis';



@Injectable({
  providedIn: 'root'
})
export class LogoCryptoService {
  private url = APIs.logoApiUrl;
  private urlprice = APIs.priceApiUrl;

  constructor(private http:HttpClient) { }

  getLogo():Observable<any[]>{
    return this.http.get<any[]>(this.url)
  }
  getprice():Observable<any[]>{
    return this.http.get<any[]>(this.urlprice)
  }

}
