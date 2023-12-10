import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/Home/footer/footer.component';
import { HeaderComponent } from './components/Home/header/header.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { ProductFormComponent } from './components/Product/product-form/product-form.component';
import { ProductListComponent } from './components/Product/product-list/product-list.component';
import { ProductCardComponent } from './components/Product/product-card/product-card.component';
import { SearchBarComponent } from './components/Product/search-bar/search-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactFormComponent } from './components/User/contact-form/contact-form.component';
import { ProfileComponent } from './components/User/profile/profile.component';
import { RegisterComponent } from './components/User/register/register.component';
import { HomeComponent } from './components/Home/home/home.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AboutUsComponent,
    LoginComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductCardComponent,
    SearchBarComponent,
    RegisterComponent,
    ProfileComponent,
    ContactFormComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
