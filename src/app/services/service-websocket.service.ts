import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class ServiceWebsocketService {
    // A variável que mantém a conexão WebSocket
    private ws!: WebSocket;
  private dataSubject = new Subject<any>();  // Usado para emitir os dados recebidos do WebSocket

  constructor() {}

  // Método para abrir a conexão com o WebSocket
  connect(url: string): void {
    this.ws = new WebSocket(url);

    // Quando a mensagem é recebida do WebSocket, emitimos para os subscribers
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.dataSubject.next(data);
    };

    // Caso a conexão seja fechada ou ocorra um erro
    this.ws.onclose = () => {
      console.log("Conexão WebSocket fechada.");
    };
    this.ws.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };
  }

  // Método para fechar a conexão WebSocket
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
    }
  }

  // Método para assinar os dados recebidos do WebSocket
  getData() {
    return this.dataSubject.asObservable();
  }
}
