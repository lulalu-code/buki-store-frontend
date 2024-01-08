import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  images: string[] = ['../../../../assets/images/banner_buki3.webp', '../../../../assets/images/banner_buki.webp', '../../../../assets/images/banner_buki2.webp'];
  currentImageIndex = 0;
  imagesMini: string[] = ['../../../../assets/images/bannerbukimini3.webp', '../../../../assets/images/bannerbukimini.webp', '../../../../assets/images/bannerbukimini2.webp']

  ngOnInit() {
    this.startCarousel();
  }

  startCarousel() {
    setInterval(() => {
      this.showNextImage();
    }, 4000); // Cambia la imagen cada 4 segundos
  }

  showNextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }
}
