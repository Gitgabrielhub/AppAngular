import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
   formulario!: FormGroup;
    data: any[] = []
  
    ngOnInit(): void {
      this.formulario = new FormGroup({
        name: new FormControl("",[Validators.required, Validators.minLength(5)]),
        lastname: new FormControl("",[Validators.required, Validators.maxLength(5)]),
        email: new FormControl("",[Validators.required, Validators.email]),
        checkbox: new FormControl(false)
        
      })
    }
  
    get name(){
      return this.formulario.get('name')!;
    }
    get lastname(){
      return this.formulario.get('lastname')!;
    }
    get email(){
      return this.formulario.get('email')!;
    }
    get checkbox(){
      return this.formulario.get('checkbox')!;
    }
  
    submit(){
      this.data.push(this.formulario.value)
      console.log(this.data)
      
      this.formulario = new FormGroup({
        name: new FormControl(""),
        lastname: new FormControl(""),
        email: new FormControl(""),
        checkbox: new FormControl(false)
      })
      if (this.formulario.invalid){
        return
      }
      
    }
}
