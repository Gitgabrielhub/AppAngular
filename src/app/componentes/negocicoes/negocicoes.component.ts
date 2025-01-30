import { Component } from '@angular/core';
import { FinanceApiService } from 'src/app/services/finance-api.service';


@Component({
  selector: 'app-negocicoes',
  templateUrl: './negocicoes.component.html',
  styleUrls: ['./negocicoes.component.scss']
})
export class NegocicoesComponent {
  constructor(private financeApi: FinanceApiService) { }
  ngOnInit(): void {
    this.financeApi.getNegociacoes().subscribe((data) => {
      console.log(data);
    })
  }
}
