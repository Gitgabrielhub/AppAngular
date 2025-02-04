import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  private socket$;
  private baseUrl = 'https://api.binance.com/api/v3/klines';
  
  constructor(private http: HttpClient) {
    // Inicializa o WebSocket para dados em tempo real de velas
    this.socket$ = webSocket('wss://stream.binance.com:9443/ws/ethusdt@kline_1m');
  }

  // Método para buscar dados históricos de velas (Klines)
  public getETHKlines(interval: string, limit: number = 100): Observable<any> {
    const url = `${this.baseUrl}?symbol=ETHUSDT&interval=${interval}&limit=${limit}`;
    return this.http.get<any[]>(url);
  }

  // Método para conectar e ouvir os dados do WebSocket (dados em tempo real)
  public getCryptoData(): Observable<any> {
    return new Observable(observer => {
      // O WebSocket envia dados em tempo real e precisamos extrair a informação da vela
      this.socket$.subscribe((data: any) => {
        // Verifica se a resposta do WebSocket tem a estrutura correta
        if (data && data.k) {
          const candle = {
            t: data.k.t,  // Timestamp
            o: parseFloat(data.k.o), // Preço de abertura
            h: parseFloat(data.k.h), // Preço mais alto
            l: parseFloat(data.k.l), // Preço mais baixo
            c: parseFloat(data.k.c)  // Preço de fechamento
          };

          // Emite os dados de cada vela para quem está ouvindo
          observer.next(candle);
        }
      });
    });
  }

  // Método para enviar dados para o WebSocket (caso necessário)
  public sendData(data: any): void {
    this.socket$.next(data);
  }

}
