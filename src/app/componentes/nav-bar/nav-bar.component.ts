import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  formulario!:FormGroup;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      moedas: new FormControl('',[Validators.required])
    })
  }
  getMoedas(){
    return this.formulario.get('moedas');
  }

}
