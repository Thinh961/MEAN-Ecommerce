import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  product!: Product;

  selectedImage!: string;
  thumbnails: string[] = [];

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  customerSv = inject(CustomerService);
  route = inject(ActivatedRoute);
  similarProduct: Product[] = [];

  ngOnInit() {
    this.route.params.subscribe((x:any) => {
      this.getProductDetail(x.id);
    })
  }

  getProductDetail(id: string) {
    this.customerSv.getProductDetail(id).subscribe(res => {
      this.product = res;
      this.selectedImage = this.product.images[0];
      if(this.product.images.length > 0) {
        this.product.images.map(image => {
          this.thumbnails.push(image)
        });
      };

      //SP tương tự
      this.customerSv.getProducts('', this.product.categoryId, '', -1, '', 1, 4).subscribe(res => {
        this.similarProduct = res;
      })
    });
  }

  get sellingPrice() {
    return Math.round(this.product.price - ((this.product.price*this.product.discount) / 100)) ;
  }
}
