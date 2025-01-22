import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular';
  formulario!: FormGroup;
  data: any[] = []

  ngOnInit(): void {
    this.formulario = new FormGroup({
      name: new FormControl("",[Validators.required, Validators.minLength(5)]),
      lastname: new FormControl("",[Validators.required, Validators.maxLength(5)]),
      email: new FormControl("",[Validators.required, Validators.email]),
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

  submit(){
    
      this.data.push(this.formulario.value)
      console.log(this.data)

      this.formulario = new FormGroup({
        name: new FormControl(""),
        lastname: new FormControl(""),
        email: new FormControl(""),
      })
    
  }

}
