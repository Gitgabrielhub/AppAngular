import { LowerCasePipe } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { FinanceApiService } from 'src/app/services/finance-api.service';
import { LogoCryptoService } from 'src/app/services/logo-crypto.service';
import { PaginatorService } from 'src/app/services/paginator.service';


@Component({
  selector: 'app-negocicoes',
  templateUrl: './negocicoes.component.html',
  styleUrls: ['./negocicoes.component.scss']
})
export class NegocicoesComponent {

  public moedasData: any[]=[];
  public moedasfilter: any[]=[];
  public moedasZeradas:any[]=[];
  public moedasNaoZeradas:any[]=[];
  public moedasIguais:any[]=[];
  logo:any[] = [];
  invalidarFormulario:boolean = false;
  formulario!:FormGroup;
  data = new MatTableDataSource<any>();
  isLoader:boolean = true;
  totalItens = 0;
  pageSize = 10;
  
  

  constructor(private dadosApi: FinanceApiService, private paginatorService:PaginatorService, private logoMoedas:LogoCryptoService) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      moedas: new FormControl('',[Validators.required])
    })
    //this.esconderResults(); //não está funcionando esse codigo.
      setTimeout(()=>{
        this.dadosApi.getNegociacoes().subscribe((moedas)=>{
          this.isLoader = false;
          this.moedasData.push(moedas)
          this.moedasData.forEach((item)=>{
            item.find((moeda:any)=>{ ////// substituir o array de moedas por um array de moedas zeradas e nao zeradas para pegar no filtro quando o usuario pesquisar.
              moeda.price === "0.00000000" ? this.moedasZeradas.push(moeda): this.moedasNaoZeradas.push(moeda);
              //this.moedasfilter = this.moedas.filter((moeda) => moeda.symbol.toLowerCase().includes(this.formulario.get('moedas')?.value.toLowerCase()))
            }
          ) 
          })
          //console.log(this.moedasZeradas)
        })
      })
      //esta função abaixo serve para limitar o array de moedas para os 10 primeiros resultados.
      for(let i = 0; i < this.moedasData.length; i++){
        if(i === 10){
          //console.log(this.moedasData[i])
        }
      }
      this.logoMoedas.getprice().subscribe((price:any)=>{
        console.log(price)
      })
     this.logoMoedas.getLogo().subscribe((logo:any)=>{
        
       logo.forEach((item:any)=>{
       
        this.logo.push(item)
        
        this.logo.forEach((item:any)=>{
          //console.log(item)
        })
      })
       
      })
      
      
    }
    
    esconderResults(){
      let setarInput:any = document.getElementById('input-moeda');
      if(setarInput.value === ''){
        this.moedasData = [];
      }
      
      //this.moedasfilter = this.moedas.filter((moeda) => moeda.symbol.toLowerCase().includes(this.formulario.get('moedas')?.value.toLowerCase()))
    }
    
    getMoedas(){
      return this.formulario.get('moedas');
    }
  search(event:Event):void{
    /* const target = event.target as HTMLInputElement;
    const value = target.value; */
    this.moedasfilter = this.moedasData.filter((moeda) => moeda.symbol.toLowerCase().includes(this.formulario.get('moedas')?.value.toLowerCase())) 
  }
  
}
