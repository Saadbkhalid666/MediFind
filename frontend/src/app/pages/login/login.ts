
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/authService/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  userType: 'customer' | 'seller' = 'customer';
  passwordvisible = false
  loginForm: FormGroup;

  isLoading: boolean = false;

  errorMessage: string = '';
  successMessage: string = '';

  togglePassword(){
    this.passwordvisible = !this.passwordvisible
  }
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      emailOrPhone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  setRole(role: 'customer' | 'seller'): void {
    this.userType = role;

    // Clear previous errors when switching role
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const { emailOrPhone, password } = this.loginForm.value;

    const loginData = {
      email: emailOrPhone,
      password: password,
    };

    console.log('Logging in:', {
      ...loginData,
      password: '********',
      role: this.userType,
    });

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.isLoading = false;

        console.log('Login successful:', response);

        this.successMessage = 'Login successful.';

        // AuthService already stores:
        // token
        // username
        // role

        this.router.navigate(['/home']);
      },

      error: (error) => {
        this.isLoading = false;

        console.error('Login failed:', error);

        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'Invalid email/phone or password. Please try again.';
      },
    });
  }
}
