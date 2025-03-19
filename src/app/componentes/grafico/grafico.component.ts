import { Component, OnInit, OnDestroy } from '@angular/core';
import { GraficoService } from 'src/app/services/grafico.service';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit, OnDestroy {
  cryptoData: any[] = [];
  ethKlines: any[] = [];
  chart: any;
  updateTimeout: any;

  constructor(private webSocketService: GraficoService) {}

  ngOnInit() {
    // Subscrição para dados históricos de velas (Klines)
    this.webSocketService.getETHKlines('1m', 100).subscribe((data) => {
      this.ethKlines = data;
      console.log('Dados históricos de velas:', this.ethKlines);

      // Extraindo os dados para o gráfico de linha
      const lineChartData = this.ethKlines.map(item => ({
        t: item[0],  // timestamp
        c: parseFloat(item[4])  // preço de fechamento
      }));

      // Inicializa o gráfico com os dados históricos
      this.initializeChart(lineChartData);
    });

    // Subscrição para dados em tempo real
    this.webSocketService.getCryptoData().subscribe((data: any) => {
      // Adiciona os dados recebidos ao array
      const newPrice = {
        t: data.t,  // timestamp
        c: data.c   // preço de fechamento
      };
      
      this.cryptoData.push(newPrice);

      // Limita a frequência de atualização do gráfico para cada 1 segundo
      if (this.updateTimeout) {
        clearTimeout(this.updateTimeout); // Limpa o timeout anterior
      }

      this.updateTimeout = setTimeout(() => {
        this.updateChart(); // Atualiza o gráfico com os novos dados após 1 segundo
      }, 1000);
    });
  }

  ngOnDestroy() {
    // Limpa o timeout quando o componente é destruído
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
  }

  // Função para inicializar ou atualizar o gráfico com os dados de linha
  initializeChart(data: any[]) {
    const ctx = document.getElementById('cryptoChart') as HTMLCanvasElement;

    // Se o gráfico já estiver inicializado, apenas atualiza os dados
    if (this.chart) {
      this.chart.data.datasets[0].data = data;
      this.chart.update();
      return;
    }

    // Criando o gráfico com o tipo 'line'
    this.chart = new Chart(ctx, {
      type: 'line',  // Tipo de gráfico (linha)
      data: {
        datasets: [{
          label: 'Preço de Fechamento (ETH/USDT)',  // Título do gráfico
          data: data,  // Dados de preços de fechamento
          borderColor: 'rgba(75, 192, 192, 1)',  // Cor da linha
          borderWidth: 1,
          fill: false  // Não preencher a área sob a linha
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,  // Permite que o gráfico se ajuste ao tamanho disponível
        scales: {
          y: {
            beginAtZero: false,  // Não forçar o eixo Y a começar em zero
            ticks: {
              stepSize: 10,  // Ajuste conforme necessário para uma boa visualização
              maxTicksLimit: 10  // Limite de ticks no eixo Y
            }
          },
          x: {
            type: 'time',  // O eixo X será do tipo 'time' para mostrar timestamps
            time: {
              unit: 'minute',  // A unidade de tempo será o minuto
              tooltipFormat: 'll HH:mm',  // Formatação do tooltip
            },
            ticks: {
              autoSkip: true,  // Faz com que o gráfico pule ticks no eixo X para não sobrecarregar
              maxTicksLimit: 20  // Limita o número de ticks no eixo X
            }
          }
        }
      }
    });
  }

  // Função para atualizar o gráfico com os dados em tempo real
  updateChart() {
    if (this.chart) {
      // Supondo que os dados da cripto contêm um valor de 'price' e um 'timestamp'
      const lastData = this.cryptoData[this.cryptoData.length - 1];

      const newData = {
        t: lastData.t,  // Timestamp
        c: lastData.c   // Preço de fechamento
      };

      // Adiciona os novos dados ao gráfico
      this.chart.data.datasets[0].data.push(newData);

      // Limita o número de pontos no gráfico para 50
      const maxPoints = 50;
      if (this.chart.data.datasets[0].data.length > maxPoints) {
        // Remove o primeiro ponto (mais antigo)
        this.chart.data.datasets[0].data.shift();
      }

      // Atualiza o gráfico com os novos dados
      this.chart.update();
    }
  }
  
}
