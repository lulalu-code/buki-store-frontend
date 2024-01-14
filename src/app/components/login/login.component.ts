import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthDTO, LoginResponse } from 'src/app/models/auth.dto';
import { EventTypesDTO } from 'src/app/models/event-types.dto';
import { HeaderMenus } from 'src/app/models/header-menu.dto';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderMenusService } from 'src/app/services/header-menus.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';


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
  loginSubscription: Subscription;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private headerMenusService: HeaderMenusService,
    private storageService: StorageService,
    private toastService: ToastService,
  ) {
    this.loginSubscription = new Subscription;
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

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  login(): void {
    
    this.loginSubscription = this.authService.login(this.loginForm.value).subscribe({
      next: (response: LoginResponse) => {
        this.headerMenusService.headerManagement.next({ showAuthSection: true });
        this.storageService.saveUser(response);
        this.router.navigateByUrl('/');
        this.isLoggedIn = true;
        this.toastService.openSnackBar('Sessión iniciada con éxito', 'OK', EventTypesDTO.Success);
      },
      error: error => {
        console.log('login error: ' + JSON.stringify(error.error));
        this.isLoggedIn = false;
        this.headerMenusService.headerManagement.next({ showAuthSection: false });
        this.toastService.openSnackBar(error.error.exception + ': ' + error.error.message, 'OK', EventTypesDTO.Error);
      }
    });

  }

}
