import { Component, Input } from '@angular/core';
import { FinanceApiService } from 'src/app/services/finance-api.service';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  dataCurrency:any[] =[];

  @Input() dataCurrencyInput:any;
  

  constructor(private data: FinanceApiService){}

  showingDta(){
    this.data.getNegociacoes().subscribe(data =>{
      this.dataCurrency = data
    })
  }

  page:number = 1;
  itensPage:number = 10;

  paginacao(){
    return this.dataCurrency.slice((this.page - 1) * this.itensPage, this.page * this.itensPage)
  }

 mudarPagina(page:number){
    this.page = page;
  } 

  totalPages(){
    return Math.ceil(this.dataCurrency.length / this.itensPage)
  }
}
