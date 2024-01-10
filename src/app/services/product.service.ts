import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.dto';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authService: AuthService, private storageService: StorageService) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.api_url + 'products', { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.storageService.getUser().token})});
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(environment.api_url + 'products/' + id);
  }

  getProductsByAuthorName(author_name: string): Observable<Product[]> {
    return this.http.get<Product[]>(environment.api_url + author_name + '/products');
  }

  deleteProductById(id: string): Observable<Object> {
    return this.http.delete(environment.api_url + 'products/' + id, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.storageService.getUser().token})});
  }

  createProduct(product: Object): Observable<Object> {
    return this.http.post(environment.api_url + 'products', product, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.storageService.getUser().token})});
  }

  updateProduct(id: string, product: Product): Observable<Object> {
    return this.http.put(environment.api_url + 'products/' + id, product, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.storageService.getUser().token})});
  }

}
