import { Component, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/models/product.dto';
import { ProductService } from 'src/app/services/product.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { EventTypesDTO } from 'src/app/models/event-types.dto';

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
  sortingForm: FormGroup;
  sortBy: FormControl;
  getAllProductsSubscription: Subscription;
  
  constructor(
    private productService: ProductService,
    private toastService: ToastService,
  ) {
    this.getAllProductsSubscription = new Subscription;
    this.sortBy = new FormControl("más nuevo");
    this.sortingForm = new FormGroup({
      sortBy: this.sortBy
    });

    }

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    this.getAllProductsSubscription.unsubscribe();
  }

  getAllProducts(): void {
    this.getAllProductsSubscription = this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.sortNewer();
      },
      error: error => {
        console.log('getAllProducts error: ' + JSON.stringify(error.error));
        this.toastService.openSnackBar(error.error.exception + ': ' + error.error.message, 'OK', EventTypesDTO.Error);
      }
    })
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

  public sortProducts(): void {
    let selectedValue = this.sortingForm.value.sortBy;
      if (selectedValue == 'precio asc') {
        this.sortProductsAsc();
      }
      else if (selectedValue == 'precio desc') {
        this.sortProductsDesc();
      }
      else if (selectedValue == "más nuevo") {
        this.sortNewer();
      }
  }

  public sortProductsAsc(): void {
    console.log('Sorting ascendant...');
    this.filteredProducts = [...this.filteredProducts].sort((a, b) => {
      if (b.price !== undefined && a.price !== undefined) {
        return a.price - b.price;
      } else {
        return 0;
      }
    });
  }

  public sortProductsDesc(): void {
    console.log('Sorting descendant...');
    this.filteredProducts = [...this.filteredProducts].sort((a, b) => {
      if (a.price !== undefined && b.price !== undefined) {
        return b.price - a.price;
      } else {
        return 0;
      }
    });
  }

  public sortNewer(): void {
    console.log('Sorting newer first...');
    this.filteredProducts = [...this.filteredProducts].sort((a, b) => {
      if (a.created_at != null && b.created_at != null) {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime(); // https://www.programiz.com/javascript/examples/convert-date-number and https://stackoverflow.com/questions/2627650/why-javascript-gettime-is-not-a-function
      } else {
        return 0;
      }
    });
  }
}

  

