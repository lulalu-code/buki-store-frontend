import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.dto';

const baseUrl = 'http://127.0.0.1:8000/api/';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl + 'products');
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(baseUrl + 'products/' + id);
  }

  deleteProductById(id: string): Observable<Object> {
    return this.http.delete(baseUrl + 'products/' + id);
  }

  createProduct(product: Object): Observable<Object> {
    console.log("PRODUCT FOR THE REQUEST :", JSON.stringify(product));
    return this.http.post(baseUrl + 'products', product);
  }

  updateProduct(id: string, product: Product): Observable<Object> {
    return this.http.put(baseUrl + 'products/' + id, product);
  }

}
