import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular';
  formulario!: FormGroup;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      name: new FormControl("",Validators.required),
      lastname: new FormControl("",Validators.required),
      email: new FormControl("",Validators.required),
    })
  }
  onSubmit(){
    console.log(this.formulario)
  }

}
