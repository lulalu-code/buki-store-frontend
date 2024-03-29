import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product.dto';
import { environment } from './../../environments/environment';
import { StorageService } from './storage.service';


const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .set('Access-Control-Allow-Origin', 'http://127.0.0.1:8000/api/products')
  .set('Access-Control-Allow-Credentials', 'true');

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private storageService: StorageService) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.api_url + 'products', { headers: headers });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(environment.api_url + 'products/' + id, { headers: headers });
  }

  getProductsByAuthorName(author_name: string): Observable<Product[]> {
    return this.http.get<Product[]>(environment.api_url + author_name + '/products', { headers: headers });
  }

  deleteProductById(id: string): Observable<any> {
    const tokenHeaders = headers.set('Authorization', 'Bearer ' + this.storageService.getUser().token);
    return this.http.delete(environment.api_url + 'products/' + id, { headers: tokenHeaders });
  }

  createProduct(product: Product): Observable<Product> {
    const tokenHeaders = headers.set('Authorization', 'Bearer ' + this.storageService.getUser().token);
    return this.http.post<Product>(environment.api_url + 'products', product, { headers: tokenHeaders });
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    const tokenHeaders = headers.set('Authorization', 'Bearer ' + this.storageService.getUser().token);
    return this.http.put<Product>(environment.api_url + 'products/' + id, product, { headers: tokenHeaders });
  }

}
