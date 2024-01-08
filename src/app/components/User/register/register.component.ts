import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, UntypedFormBuilder } from '@angular/forms';
import { UserDTO } from 'src/app/models/user.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit{

  registerUser: UserDTO;
  responseOK = false;

  name: FormControl;
  email: FormControl;
  password: FormControl;
  password_confirmation: FormControl;
  zone: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private http: HttpClient,
  ){

    this.registerUser = new UserDTO('', '', '', '', '');
    this.isValidForm = null;

    this.name = new FormControl(this.registerUser.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.email = new FormControl(this.registerUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]);

    this.password_confirmation = new FormControl(this.registerUser.password_confirmation, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]);

    this.zone = new FormControl(this.registerUser.zone, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]);

    this.registerForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      password: this.password,
      zone: this.zone,
    });
  }

  ngOnInit(): void {
    
  }

  register(): void {

    try {
      this.authService.register(this.registerForm.value).subscribe({
        next: response => {
          console.log('Subscribe next: ' + JSON.stringify(response))
          this.responseOK = true;
        } ,
        error: error => console.log('Subscribe error: ' + JSON.stringify(error))
      }); //() => responseOK = true
      console.log(this.registerForm.value);

    } 
    catch (error: any) {
      console.log(error.error);
    }

  }

}
