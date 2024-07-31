import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Brand } from '../../../../../types/brand';
import { Category } from '../../../../../types/category';
import { CategoryService } from '../../../../services/category/category.service';
import { BrandService } from '../../../../services/brand/brand.service';
import { ProductService } from '../../../../services/product/product.service';
import { Product } from '../../../../../types/product';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(1)]],
    shortDescription: [null, [Validators.required, Validators.minLength(1)]],
    description: [null, [Validators.required, Validators.minLength(1)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
    isFeatured: [false],
    isNewProduct: [false],
  });

  categoryService = inject(CategoryService);
  brandService = inject(BrandService);
  productService = inject(ProductService);

  brands: Brand[] = [];
  categories: Category[] = [];
  id!:string;

  route = inject(ActivatedRoute);

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    });

    this.brandService.getBrands().subscribe(res => {
      this.brands = res;
    });

    this.id = this.route.snapshot.params["id"];
    if(this.id) {
      this.productService.getProductById(this.id).subscribe(res =>{
        for (let index = 0; index < res.images.length; index++) {
          this.addImage();
        }
        this.form.patchValue(res as any);
      });
    } else {
      this.addImage();
    }
  }

  router = inject(Router);

  addImage() {
    this.images.push(this.formBuilder.control(null));
  }

  removeImage() {
    this.images.removeAt(this.images.controls.length - 1);
  }

  get images() {
    return this.form.get('images') as FormArray;
  }

  add() {
    let value = this.form.value;
    this.productService.addProduct(value as any).subscribe(res => {
      alert("Thêm thành công!")
      this.router.navigateByUrl("/admin/products")
    });
  }

  update() {
    let value = this.form.value;
    this.productService.updateProduct(this.id, value as any).subscribe(res => {
      alert("Sửa thành công!")
      this.router.navigateByUrl("/admin/products")
    });
  }
}
