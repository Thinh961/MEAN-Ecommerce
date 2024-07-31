import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    RouterLink,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formbuilder = inject(FormBuilder);

  loginForm = this.formbuilder.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.minLength(5)]],
  })
  authService = inject(AuthService);
  router = inject(Router);

  login() {
    let value = this.loginForm.value;
    this.authService.login(value.email!, value.password!).subscribe((res:any) => {
      console.log(res);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      this.router.navigateByUrl("/")
    })
  }
}
