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





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    NegocicoesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
