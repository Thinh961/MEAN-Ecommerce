import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Category } from '../../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CustomerService } from '../../services/customer/customer.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink ,CommonModule, MatMenuModule, MatButtonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  collapseMenuDisplay: boolean = false;
  customerService = inject(CustomerService);
  authService = inject(AuthService);
  categoryList: Category[] = [];
  searchTerm!: string;

  private subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.customerService.getCategories().subscribe((res) => {
          this.categoryList = res;
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  router = inject(Router);
  onSearch(e: any) {
    if (e.target.value) {
      this.router.navigateByUrl('/products?search=' + e.target.value);
    }
  }

  searchCategory(id: string) {
    this.searchTerm = '';
    this.router.navigateByUrl('/products?categoryId=' + id);
  }

  handleClick() {
    this.collapseMenuDisplay = !this.collapseMenuDisplay;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
}
