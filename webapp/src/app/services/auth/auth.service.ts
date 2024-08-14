import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn);
  http = inject(HttpClient);
  router = inject(Router);

  constructor() { }

  register(name: string, email: string, password: string) {
    return this.http.post(environment.apiUrl+"/auth/register", {
      name, email, password
    });
  }

  login(email: string, password: string) {
    return this.http.post(environment.apiUrl+"/auth/login", {
      email, password
    }).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      this.loggedInSubject.next(true);
      this.router.navigate(['/']);
    });
  }

  get isLoggedIn() {
    let token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    return !!token;
  }

  get isLoggedIn$() {
    return this.loggedInSubject.asObservable();
  }

  get isAdmin(){
    let userData = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
    if(userData) {
      return JSON.parse(userData).isAdmin;
    }
    return false;
  }

  get routerAdmin(): boolean {
    return this.router.url.includes('/admin');
  }

  get userName(){
    let userData = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
    if(userData) {
      return JSON.parse(userData).name;
    }
    return null;
  }

  get userData() {
    let userData = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
    if(userData) {
      return JSON.parse(userData);
    }
    return null;
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
}
