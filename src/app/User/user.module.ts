import { NgModule } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../app.component';




@NgModule({
    declarations: [
      RegisterComponent,
      ProfileComponent,
      ContactFormComponent,
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }