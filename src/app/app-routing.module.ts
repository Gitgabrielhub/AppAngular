import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { NegocicoesComponent } from './componentes/negocicoes/negocicoes.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'negociacoes', component:NegocicoesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
