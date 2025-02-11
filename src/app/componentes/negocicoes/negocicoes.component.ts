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
 invalidarFormulario:boolean = false;
  

  formulario!:FormGroup;

  constructor(private dadosApi: FinanceApiService) { }
  ngOnInit(): void {

      setTimeout(()=>{

      },1000)
      this.formulario = new FormGroup({
        moedas: new FormControl('',[Validators.required])
      }
    )
      
  }
  
  

  esconderResults(){
    if(this.formulario.get('moedas')?.value == '' || this.formulario.get('moedas')?.value == null){
      this.moedas= []
    }
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
