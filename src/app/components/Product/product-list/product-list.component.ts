import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/models/product.dto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent {
  products: Product[] = [];
  constructor(
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,){}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    return  this.productService
      .getAllProducts()
      .subscribe((products) => {
        console.log("products is:" + JSON.stringify(products))
        this.products = products;
      });
    }
}
