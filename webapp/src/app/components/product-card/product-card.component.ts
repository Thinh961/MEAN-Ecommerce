import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../types/product';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  wishlistService = inject(WishlistService);
  get sellingPrice() {
    return Math.round(
      this.product.price - (this.product.price * this.product.discount) / 100
    );
  }

  addToWishList(product: Product) {
    console.log(product);
    if(this.isInWishList(product)){
      this.wishlistService.removeWishLists(product._id!).subscribe(res => {
        this.wishlistService.init();
      })
    } else {
      this.wishlistService.addWishList(product._id!).subscribe(res => {
        this.wishlistService.init();
      })
    }
  }

  isInWishList(product: Product) {
    let isExits = this.wishlistService.wishLists.find(
      (x) => x._id == product._id
    );
    if (isExits) return true;
    else return false;
  }
}
