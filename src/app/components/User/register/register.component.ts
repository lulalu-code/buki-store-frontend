import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventTypesDTO } from 'src/app/models/event-types.dto';
import { UserDTO } from 'src/app/models/user.dto';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  selectedFile!: File;
  responseOK: boolean;
  private isUpdateMode: boolean;
  private userName: string | null;
  private connectedUser: string | null;

  name: FormControl;
  email: FormControl;
  password: FormControl;
  password_confirmation: FormControl;
  zone: FormControl;
  profile_image: FormControl;

  registerForm: FormGroup;
  registerUser: UserDTO;
  isValidForm: boolean | null;
  registerSubscription: Subscription;
  editSubscription: Subscription;
  getUserSubscription: Subscription;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
  ){
    this.responseOK = false;
    this.registerSubscription = new Subscription;
    this.editSubscription = new Subscription;
    this.getUserSubscription = new Subscription;
    this.isUpdateMode = false;
    this.connectedUser = null;
    this.userName = this.activatedRoute.snapshot.paramMap.get('author_name');

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
    this.connectedUser = this.storageService.getUser().author_name;
    if (this.connectedUser && this.connectedUser === this.userName) {
      this.isUpdateMode = true;
      this.getUserSubscription = this.userService.getUserByName(this.connectedUser).subscribe({
        next: (user: UserDTO) => {
          this.name.setValue(user.name);
          this.email.setValue(user.email);
          this.password.setValue(null);
          this.password_confirmation.setValue(null);
          this.zone.setValue(user.zone);
          this.profile_image.setValue(user.profile_image);
        },
        error: error => {
          console.log('getUserByName error: ' + JSON.stringify(error.error));
          this.toastService.openSnackBar(error.error.exception + ': ' + error.error.message, 'OK', EventTypesDTO.Error);
        }
      })
    }
    else {
      this.isUpdateMode = false;
    }

  }

  ngOnDestroy(): void {
    this.registerSubscription.unsubscribe();
    this.editSubscription.unsubscribe();
  }

  register(): void {
    this.registerUser = this.registerForm.value;
    this.registerSubscription = this.authService.register(this.registerUser).subscribe({
        next: () => {
          this.toastService.openSnackBar('¡Usuario registrado con éxito!', 'OK', EventTypesDTO.Success);
          this.router.navigateByUrl('login');
        } ,
        error: error => {
          console.log('register error: ' + JSON.stringify(error.error));
          this.toastService.openSnackBar(error.error.exception + ': ', 'OK' + error.error.message, EventTypesDTO.Error);
        }
      }
    );
  }

  editUser(): void {
    this.registerUser = this.registerForm.value;
    console.log('connectedUser is: ' + this.connectedUser)
    console.log('registerUser is: ' + JSON.stringify(this.registerUser))
    try {
    if(this.connectedUser) {
      this.editSubscription = this.userService.updateUser(this.connectedUser, this.registerUser).subscribe({
        next: () => {
          this.toastService.openSnackBar('¡Usuario actualizado con éxito!', 'OK', EventTypesDTO.Success);
          this.router.navigateByUrl('profile/' + this.connectedUser);
        } ,
        error: error => {
          console.log('register error: ' + JSON.stringify(error.error));
          this.toastService.openSnackBar(error.error.exception + ': ', 'OK' + error.error.message, EventTypesDTO.Error);
        }
      });
    }
  }
  catch(e) {
    console.log(JSON.stringify(e))
  }
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    let reader = new FileReader(); // 
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.registerForm.get('profile_image')!.setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1] // https://stackoverflow.com/questions/52032591/error-property-split-does-not-exist-on-type-string-arraybuffer-property
        })
      };
    }
  }

  saveUser(): void{
    if(this.registerForm.invalid) {
      return;
    }
    this.registerUser = this.registerForm.value;
    if(this.isUpdateMode) {
      this.editUser();
    } else {
      this.register();
    }
  }

}
