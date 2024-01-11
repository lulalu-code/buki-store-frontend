import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  constructor(private location: Location) {}

 goBack(): void {
  this.location.back();
}

}
