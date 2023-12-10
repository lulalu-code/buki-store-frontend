import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://127.0.0.1:8000/api/';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Object> {
    return this.http.get(baseUrl + 'products');
  }

  getProductById(id:string): Observable<Object> {
    return this.http.get(baseUrl + 'products/' + id);
  }

  deleteProductById(id: string): Observable<Object> {
    return this.http.delete(baseUrl + 'products/' + id)
  }

  createProduct(product: Object): Observable<Object> {
    return this.http.post(baseUrl + 'products', product)
  }

}
