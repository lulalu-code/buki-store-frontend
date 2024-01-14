import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/Home/home/home.component';
import { RegisterComponent } from './components/User/register/register.component';
import { ProfileComponent } from './components/User/profile/profile.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ProductFormComponent } from './components/Product/product-form/product-form.component';
import { ProductCardComponent } from './components/Product/product-card/product-card.component';
import { ContactFormComponent } from './components/User/contact-form/contact-form.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { SentComponent } from './components/sent/sent.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile/:author_name', component: ProfileComponent},
  { path: 'profile/edit/:author_name', component: RegisterComponent},
  { path: 'about', component: AboutUsComponent},
  { path: 'product/:id', component: ProductCardComponent},
  { path: 'contact', component: ContactFormComponent},
  { path: 'login', component: LoginComponent},
  { path: 'product-form/:id', component: ProductFormComponent},
  { path: 'product-form', component: ProductFormComponent},
  { path: 'cart', component: CartComponent},
  { path: 'sent', component: SentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
