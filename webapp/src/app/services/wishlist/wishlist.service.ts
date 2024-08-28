import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../../types/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  http = inject(HttpClient);
  wishLists: Product[] = [];
  constructor() { }

  init() {
    this.getWishLists().subscribe(res => {
      this.wishLists = res;
    })
  }

  getWishLists() {
    return this.http.get<Product[]>(environment.apiUrl + '/customer/wishlists');
  }

  addWishList(productId: string) {
    return this.http.post<Product[]>(environment.apiUrl + '/customer/wishlists/'+ productId, {});
  }

  removeWishLists(productId: string) {
    return this.http.delete<Product[]>(environment.apiUrl + '/customer/wishlists/'+ productId);
  }
}
