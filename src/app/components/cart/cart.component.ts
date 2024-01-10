import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

constructor(private location: Location) {}

 goBack(): void {
  this.location.back();
}

}
