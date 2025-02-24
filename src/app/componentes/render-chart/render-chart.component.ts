import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartView, util } from 'echarts';
import { FinanceApiService } from 'src/app/services/finance-api.service';
import { ServiceWebsocketService } from 'src/app/services/service-websocket.service';




// Registra os tipos de gráficos do Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-render-chart',
  templateUrl: './render-chart.component.html',
  styleUrls: ['./render-chart.component.scss']
})
export class RenderChartComponent implements OnInit, OnDestroy {
  moedas:any[]= []
  dataWebsocket:any[]= []
  topDez:any[]= []
  private chart: any; // Variável para o gráfico
  
  private wsUrl: string = 'wss://stream.binance.com:9443/ws/ethusdt@kline_10m'; // URL do WebSocket
  private timeInterval = 0; // Para gerar labels de tempo incrementais
  private isWsClosed: boolean = false; // Flag para monitorar se a WebSocket foi fechada

  constructor(private websocketService: ServiceWebsocketService, private servicoMoedas: FinanceApiService) { }

  ngOnInit(): void {
    // Inicializar o gráfico
    this.initChart();

    // Conectar ao WebSocket usando o serviço
    this.websocketService.connect(this.wsUrl);

    // Inscrever-se para receber dados em tempo real do WebSocket
    this.websocketService.getData().subscribe((data) => {
      // Exemplo de dados do WebSocket: { timestamp: '2025-02-04T10:00:00Z', price: 100.5 }
      this.updateChartData(data);
      
      
    });
    setTimeout(()=>{
      this.servicoMoedas.getNegociacoes().subscribe(data=>{
        data.map((item:any)=>{
          this.moedas.push(item)
          //console.log(this.moedas)
          if(this.moedas.length > 10){
            this.moedas.slice(0,11).map((conj)=>{
              this.topDez.push(conj)
              
            })
            
            
          }
        })
      })
    },1000)
  }

  private initChart(): void {
    
    this.chart = new Chart('canvas', {
      type: 'line', // Tipo de gráfico
      data: {
        labels: [], // Rótulos do eixo X
        datasets: [{
          label: 'Preço em tempo real',
          data: [], // Dados do gráfico
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            type: 'linear', // Para garantir que a escala do eixo X seja numérica
            position: 'bottom'
          },
          y: {
            beginAtZero: true // Se necessário, você pode adicionar configurações para o eixo Y
          }
        }
      }
    });
  }

  private updateChartData(data: any): void {
    // Exibe os dados recebidos para depuração
    console.log('Atualizando gráfico com dados:', data);
  
    const price = data.price;  // Substitua conforme a estrutura de dados real
    const timestamp = this.timeInterval++;  // Usando um contador simples para representar o tempo
    
    
    // Adiciona os novos dados ao gráfico
    this.chart.data.labels.push(timestamp); // Adiciona um índice ou timestamp
    this.chart.data.datasets[0].data.push(price); // Adiciona o preço no eixo Y
  
    // Verifica os dados que foram adicionados ao gráfico
    console.log('Dados atuais do gráfico:', this.chart.data);
  
    // Atualiza o gráfico
    this.chart.update();
  }

  ngOnDestroy(): void {
    // Fechar a conexão WebSocket quando o componente for destruído, se ainda não foi fechada
    if (!this.isWsClosed) {
      this.websocketService.disconnect();
      this.isWsClosed = true; // Marca como fechado para evitar desconectar novamente
    }
  }
}
