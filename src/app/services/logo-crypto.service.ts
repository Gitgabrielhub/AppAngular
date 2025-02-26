import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../enviroments';


@Injectable({
  providedIn: 'root'
})
export class LogoCryptoService {
  private url = enviroments.logoApiUrl;

  constructor(private http:HttpClient) { }

  getLogo():Observable<any[]>{
    return this.http.get<any[]>(this.url)
  }

}
