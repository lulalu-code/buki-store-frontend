import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { Product } from 'src/app/models/product.dto';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { EventTypesDTO } from 'src/app/models/event-types.dto';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  product: Product | undefined;
  getProductSubscription: Subscription = new Subscription;
  deleteProductSubscription: Subscription = new Subscription;
  identifier: string | null;
  connectedUserName: string | null;

  constructor(
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
    private storageService: StorageService,
  ){
    this.identifier = null;
    this.connectedUserName = null;
  }

  ngOnInit(): void {
    this.identifier = this.activatedRoute.snapshot.paramMap.get('id') || ''
    this.connectedUserName = this.storageService.getUser().author_name;

    this.getProductSubscription = this.productService.getProductById(this.identifier).subscribe({
      next: (product: Product) => {
        if(!product.id){
          this.router.navigateByUrl('/');
        }
        this.product = product;
      },
      error: (error: HttpErrorResponse) => {
        console.log('getProductById error: ' + JSON.stringify(error.error));
        this.toastService.openSnackBar(error.error.exception + ': ' + error.error.message, 'OK', EventTypesDTO.Error)
      }
    })
  }

  ngOnDestroy(): void {
    this.getProductSubscription.unsubscribe();
    this.deleteProductSubscription.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

  deleteProduct():void {
    if(this.identifier) {
      this.deleteProductSubscription = this.productService.deleteProductById(this.identifier).subscribe({
        next: () => {
          this.router.navigateByUrl('profile/' + this.connectedUserName);
          this.toastService.openSnackBar('Producto borrado con éxito', 'OK', EventTypesDTO.Success);
        },
        error: error => {
          console.log('getUserByName error: ' + JSON.stringify(error.error));
          this.toastService.openSnackBar(error.error.exception + ': ' + error.error.message, 'OK', EventTypesDTO.Error);
        }
      });
    }
  }

}
