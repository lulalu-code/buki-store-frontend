import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Home/footer/footer.component';
import { HeaderComponent } from './Home/header/header.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './Auth/login/login.component';
import { ProductFormComponent } from './Product/product-form/product-form.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { ProductCardComponent } from './Product/product-card/product-card.component';
import { SearchBarComponent } from './Product/search-bar/search-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactFormComponent } from './User/contact-form/contact-form.component';
import { ProfileComponent } from './User/profile/profile.component';
import { RegisterComponent } from './User/register/register.component';
import { HomeComponent } from './Home/home/home.component';

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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
