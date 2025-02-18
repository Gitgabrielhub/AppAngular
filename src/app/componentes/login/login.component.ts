import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formulario!:FormGroup;
  dataForm:any[]=[]; 

  ngOnInit(): void {
    this.formulario = new FormGroup({
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required, Validators.minLength(8)])
    })
  }

  getEmail(){
    return this.formulario.get('email')
  }
  private getPassword(){
    return this.formulario.get('password')
  }

  enviarForm(e:Event){
    this.dataForm.push(this.formulario.value)
    console.log(this.dataForm)
  }
}
