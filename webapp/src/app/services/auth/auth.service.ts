import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  http = inject(HttpClient);
  router = inject(Router);

  register(name: string, email: string, password: string) {
    return this.http.post(environment.apiUrl+"/auth/register", {
      name, email, password
    });
  }

  login(email: string, password: string) {
    return this.http.post(environment.apiUrl+"/auth/login", {
      email, password
    });
  }

  get isLoggedIn() {
    let token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if(token) {
      return true;
    }
    return false;
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
  }
}
