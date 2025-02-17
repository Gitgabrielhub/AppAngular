import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogoCryptoService {
//private url = "https://www.binance.com/bapi/composite/v1/public/promo/currency/logo?currencyCode=BTC";

  constructor(private http:HttpClient) { }

 /*  getLogo():Observable<any[]>{
    return this.http.get<any[]>(this.url)
  } */

}
