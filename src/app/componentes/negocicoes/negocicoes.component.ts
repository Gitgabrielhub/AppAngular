import { Component } from '@angular/core';
import { map } from 'rxjs';
import { FinanceApiService } from 'src/app/services/finance-api.service';


@Component({
  selector: 'app-negocicoes',
  templateUrl: './negocicoes.component.html',
  styleUrls: ['./negocicoes.component.scss']
})
export class NegocicoesComponent {
  prices: any[] =[]; 
  constructor(private financeApi: FinanceApiService) { }
  ngOnInit(): void {
    this.financeApi.getNegociacoes().subscribe((data) => {
      this.prices = data
      this.prices.map((item) => {
        console.log(item.price = parseFloat(item.price).toFixed(2))
      })
    })
  }
}
