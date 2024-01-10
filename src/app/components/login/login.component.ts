import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDTO } from 'src/app/models/auth.dto';
import { HeaderMenus } from 'src/app/models/header-menu.dto';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderMenusService } from 'src/app/services/header-menus.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{

  loginUser: AuthDTO;
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;
  userService: any;
  productForm: any;
  isLoggedIn = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private headerMenusService: HeaderMenusService,
    private storageService: StorageService
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
    if(this.storageService.isLoggedIn()){
      this.isLoggedIn = true;
    }
  }

  login(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    
    try {
      this.authService.login(this.loginForm.value).subscribe({
        next: response => {
          this.storageService.saveUser(response);
          this.isLoggedIn = true;
          this.headerMenusService.headerManagement.next({ showAuthSection: true });
          window.location.reload();
          this.router.navigateByUrl('/');
        },
        error: err => {
          console.log('Login error: ' + err.error.message);
          this.isLoggedIn = false;
          this.headerMenusService.headerManagement.next({ showAuthSection: false });
        }
      });
      responseOK = true;
    } 
    catch (error: any) {
      errorResponse = error.error;
      responseOK = false;
      console.log(errorResponse);
    }

    this.router.navigateByUrl('/');

  }

}
