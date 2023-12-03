import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { RegisterComponent } from './User/register/register.component';
import { ProfileComponent } from './User/profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductFormComponent } from './Product/product-form/product-form.component';
import { ProductCardComponent } from './Product/product-card/product-card.component';
import { ContactFormComponent } from './User/contact-form/contact-form.component';
import { LoginComponent } from './Auth/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'about', component: AboutUsComponent},
  { path: 'product', component: ProductCardComponent},
  { path: 'contact', component: ContactFormComponent},
  { path: 'login', component: LoginComponent},
  { path: 'product-form', component: ProductFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
