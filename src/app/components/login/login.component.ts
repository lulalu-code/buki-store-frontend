import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthDTO } from 'src/app/models/auth.dto';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent  implements OnInit{


  loginUser: AuthDTO;
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
  ) {
    
    this.loginUser =  new AuthDTO('','','','');
    this.email = new FormControl(this.loginUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.loginUser.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }



  ngOnInit(): void {
    ;
  }

  async login(): Promise<void> {}



}
