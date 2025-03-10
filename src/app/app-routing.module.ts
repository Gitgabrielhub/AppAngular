import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { NegocicoesComponent } from './componentes/negocicoes/negocicoes.component';
import { GraficoComponent } from './componentes/grafico/grafico.component';
import { RenderChartComponent } from './componentes/render-chart/render-chart.component';
import { LoginComponent } from './componentes/login/login.component';


//futuramente implementar lazy loading

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'negociacoes', component:NegocicoesComponent },
  {path: 'grafico', component: GraficoComponent},
  {path:'renderChart', component: RenderChartComponent},
  {path:'entrar', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
