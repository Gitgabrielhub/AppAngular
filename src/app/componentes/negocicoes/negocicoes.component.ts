import { LowerCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { FinanceApiService } from 'src/app/services/finance-api.service';





@Component({
  selector: 'app-negocicoes',
  templateUrl: './negocicoes.component.html',
  styleUrls: ['./negocicoes.component.scss']
})
export class NegocicoesComponent {

  moedas: any[]=[];
  moedasfilter: any[]=[];
  searchMoedas:string="";
  

  formulario!:FormGroup;

  constructor(private dadosApi: FinanceApiService) { }
  ngOnInit(): void {
    this.dadosApi.getNegociacoes().subscribe((moedas) => {
      this.moedas = moedas
    })
    

    this.formulario = new FormGroup({
        moedas: new FormControl('',[Validators.required])
      }
    )
      
  }

  getMoedas(){
    return this.formulario.get('moedas');
  }
  search(event:Event):void{
    /* const target = event.target as HTMLInputElement;
    const value = target.value; */

    this.moedasfilter = this.moedas.filter((moeda) => moeda.symbol.toLowerCase().includes(this.formulario.get('moedas')?.value.toLowerCase()))
    
  }
}
