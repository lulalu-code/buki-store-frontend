import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.dto';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { EventTypesDTO } from 'src/app/models/event-types.dto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  product: Product | undefined;
  getProductSubscription: Subscription = new Subscription;

  constructor(
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
  ){}

  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id') || ''
    console.log('Identifier --> ', identifier);

    this.getProductSubscription = this.productService.getProductById(identifier).subscribe({
      next: (product: Product) => {
        if(!product.id){
          this.router.navigateByUrl('/');
        }

        this.product = product;
        console.log('Product --> ', this.product);
      },
      error: (error: HttpErrorResponse) => {
        console.log('getProductById error: ' + JSON.stringify(error.error));
        this.toastService.openSnackBar(error.error.exception + ': ' + error.error.message, 'OK', EventTypesDTO.Error)
      }
    })
  }

  ngOnDestroy(): void {
    this.getProductSubscription.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

}
