import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { FinanceApiService } from 'src/app/services/finance-api.service';



@Component({
  selector: 'app-negocicoes',
  templateUrl: './negocicoes.component.html',
  styleUrls: ['./negocicoes.component.scss']
})
export class NegocicoesComponent {
  prices: any[] =[]; 
  moedas: any[] =[]; 
  formulario!:FormGroup;

  constructor(private financeApi: FinanceApiService) { }
  ngOnInit(): void {
    this.financeApi.getNegociacoes().subscribe((data) => {
      this.prices = data
      this.moedas = data.map((item:any) => item.symbol)
      this.prices.map((item) => {
        console.log(item.price = parseFloat(item.price).toFixed(2), item.symbol)
      })
    })

    this.formulario = new FormGroup(
      {
        moedas: new FormControl('',[Validators.required])
      }
    )
      
  }

  getMoedas(){
    return this.formulario.get('moedas');
  }
  pesquisar(){
    
    this.financeApi.getNegociacoes().subscribe((data)=>{
      this.moedas = data.map((item:any) => item.symbol.toLowerCase(), );
      this.moedas.filter((item:any) =>{
        if(item === this.formulario.value){
          console.log(item.symbol)
        }
      })
    })
  }
}
