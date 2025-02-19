import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { NegocicoesComponent } from './componentes/negocicoes/negocicoes.component';
import { HttpClientModule } from '@angular/common/http';
import { enviroments } from './enviroments';
import { GraficoComponent } from './componentes/grafico/grafico.component';
import { RenderChartComponent } from './componentes/render-chart/render-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { LoginComponent } from './componentes/login/login.component';
import { FooterComponent } from './componentes/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    NegocicoesComponent,
    GraficoComponent,
    RenderChartComponent,
    LoginComponent,
    FooterComponent, 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
