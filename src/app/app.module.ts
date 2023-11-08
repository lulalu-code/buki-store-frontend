import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './User/register/register.component';
import { ProfileComponent } from './User/profile/profile.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { HeaderComponent } from './Shared/header/header.component';
import { ContactFormComponent } from './User/contact-form/contact-form.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './Auth/login/login.component';
import { ProductFormComponent } from './Product/product-form/product-form.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { ProductCardComponent } from './Product/product-card/product-card.component';
import { SearchBarComponent } from './Product/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ProfileComponent,
    FooterComponent,
    HeaderComponent,
    ContactFormComponent,
    AboutUsComponent,
    LoginComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductCardComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
