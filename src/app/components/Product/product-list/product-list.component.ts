import { Component, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/models/product.dto';
import { ProductService } from 'src/app/services/product.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  p: number = 1;
  productsByAuthorName: Product[] = [];
  
  constructor(
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    return  this.productService
      .getAllProducts()
      .subscribe((products) => {
        this.products = products;
        this.filteredProducts = products;
      });
    }

    filterProducts(text: string) {
      if (!text) {
        this.filteredProducts = this.products; // Si la búsqueda no coincide, muestra todos los productos.
        return;
      }
  
      this.filteredProducts = this.products.filter(
        (product) => product.title.toLowerCase().includes(text.toLowerCase())
      );
    }

    public sortProductsDesc(): void {
      this.filteredProducts = [...this.filteredProducts].sort((a, b) => {
        if (a.price !== undefined && b.price !== undefined) {
          return b.price - a.price;
        } else {
          return 0;
        }
      });
    }
    public sortProductsAsc(): void {
      this.filteredProducts = [...this.filteredProducts].sort((b, a) => {
        if (b.price !== undefined && a.price !== undefined) {
          return a.price - b.price;
        } else {
          return 0;
        }
      });
    }
  }

  

