import { CommonModule } from '@angular/common';
import { Product } from '../../../types/product';
import { CustomerService } from './../../services/customer/customer.service';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ProductCardComponent,
    CarouselModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 100,
    navText: ['', ''],
    nav: true
  }

  customerService = inject(CustomerService);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
  bannerImages: Product[] = [];

  ngOnInit(){
    this.customerService.getNewProducts().subscribe(res => {
      this.newProducts = res;
      this.bannerImages.push(...res);
    });

    this.customerService.getFeaturesProducts().subscribe(res => {
      this.featuredProducts = res;
      this.bannerImages.push(...res);
    });
  }
}
