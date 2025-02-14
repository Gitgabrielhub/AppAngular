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

  public moedas: any[]=[];
  public moedasfilter: any[]=[];
  invalidarFormulario:boolean = false;
  formulario!:FormGroup;
  data = new MatTableDataSource<any>();
  logo:any[] = [];
  totalItens = 0;
  pageSize = 10;
  
  @ViewChild(MatPaginator)paginator!:MatPaginator;

  constructor(private dadosApi: FinanceApiService, private paginatorService:PaginatorService, private logoMoedas:LogoCryptoService) { }

  ngOnInit(): void {
    this.esconderResults(); //não está funcionando esse codigo.
      this.dadosApi.getNegociacoes().subscribe((moedas) => {
        this.moedas = moedas
      })
      this.formulario = new FormGroup({
        moedas: new FormControl('',[Validators.required])
      })
    this.logoMoedas.getLogo().subscribe(data=>{
      this.logo.push(data)
      console.log(this.logo)
    })
  }
  ngAfterInit(){
    this.paginator.page.subscribe(()=>{
      this.loadPrices()
    })
    this.loadPrices()
  }
  loadPrices(){
    const page = this.paginator.pageIndex + 1;
    this.paginatorService.getMoedas(page, this.paginator.pageSize).subscribe(data=>{
      this.data.data = data;
      this.totalItens = 100;
    })
  }
  esconderResults(){
   let setarInput:any = document.getElementById('input-moeda');
    if(setarInput.value === ''){
      this.moedas = [];
    }else{
      this.moedasfilter = this.moedas.filter((moeda) => moeda.symbol.toLowerCase().includes(this.formulario.get('moedas')?.value.toLowerCase()))
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
