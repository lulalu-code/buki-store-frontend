import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/user.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  selectedFile!: File;
  responseOK: boolean;

  name: FormControl;
  email: FormControl;
  password: FormControl;
  password_confirmation: FormControl;
  zone: FormControl;
  profile_image: FormControl;

  registerForm: FormGroup;
  registerUser: UserDTO;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
  ){
    this.responseOK = false;

    this.registerUser = new UserDTO('', '', '', '', '', '');
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

    this.profile_image = new FormControl(this.registerUser.profile_image);

    this.registerForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      password: this.password,
      zone: this.zone,
      profile_image: this.profile_image,
    });
  }

  ngOnInit(): void {
    this.name.setValue(this.registerUser.name);
    this.email.setValue(this.registerUser.email);
    this.password.setValue(this.registerUser.password);
    this.password_confirmation.setValue(this.registerUser.password_confirmation);
    this.zone.setValue(this.registerUser.zone);
    this.profile_image.setValue(this.registerUser.profile_image);
  }

  register(): void {
    this.registerUser = this.registerForm.value;
    try {
      this.authService.register(this.registerUser).subscribe({
        next: () => {
          this.responseOK = true;
          if (this.responseOK) {
            this.router.navigateByUrl('login');
          }
        } ,
        error: error => console.log('register error: ' + JSON.stringify(error))
      });
    } 
    catch (error: any) {
      console.log(error.error);
    }
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    //this.files.push(filePushed)
    let reader = new FileReader(); // 
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        //this.img = (<string>reader.result).split(',')[1]
        this.registerForm.get('profile_image')!.setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1] // https://stackoverflow.com/questions/52032591/error-property-split-does-not-exist-on-type-string-arraybuffer-property
        })
      };
    }
  }

}
