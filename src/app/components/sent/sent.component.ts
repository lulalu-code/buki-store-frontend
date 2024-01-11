import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.sass']
})
export class SentComponent {
  constructor(private location: Location) {}

  goBack(): void {
   this.location.back();
 }
}
