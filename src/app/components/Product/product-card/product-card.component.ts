import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent implements OnInit {
  product: Product | undefined;
  constructor(
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id') || ''
    console.log('Identifier --> ', identifier);

    this.productService.getProductById(identifier).subscribe((product) => {
      if(!product.id){
        this.router.navigateByUrl('/');
      }

      this.product = product;
      console.log('Product --> ', this.product);
    })
  }

}
