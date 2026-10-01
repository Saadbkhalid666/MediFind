import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/authService/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  userType: 'customer' | 'seller' = 'customer';
  toasts:{message:string, type:"success" | "error"}[]=[];
  loading = false
  passwordvisible = false
  customerForm: FormGroup;
  sellerForm: FormGroup; 

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router){
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9+ ]{10,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.sellerForm = this.fb.group({
      pharmacyName: ['', Validators.required],
      ownerName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9+ ]{10,15}$')]],
      whatsappNo: ['', [Validators.required, Validators.pattern('^[0-9+ ]{10,15}$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      openingHours: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  setRole(role: 'customer' | 'seller'): void {
    this.userType = role;
  }

  get customerEmail(){
    return this.customerForm.get('email')
  }

  get customerPhone(){
    return this.customerForm.get('phone')
  }

  get customerPassword(){
    return this.customerForm.get('password')
  }

  get customerName(){
    return this.customerForm.get('name')
  }

  get sellerPhone(){
    return this.sellerForm.get('phone')
  }

  get sellerWhatsappNo(){
    return this.sellerForm.get('whatsappNo')
  }

  get sellerAddress(){
    return this.sellerForm.get('address')
  }

  get sellerCity(){
    return this.sellerForm.get('city')
  }

  get sellerOpeningHours(){
    return this.sellerForm.get('openingHours')
  }

  get sellerEmail(){
    return this.sellerForm.get('email')
  }

  get sellerPassword(){
    return this.sellerForm.get('password')
  }

  get sellerPharmacyName(){
    return this.sellerForm.get('pharmacyName')
  }

  get sellerOwnerName(){
    return this.sellerForm.get('ownerName')
  }

  togglePassword(){
    this.passwordvisible = !this.passwordvisible
  }
  showToasts(
  message: string,
  type: 'success' | 'error' = 'success'
) {
  const toast = { message, type };

  this.toasts.push(toast);

  setTimeout(() => {
    this.toasts = this.toasts.filter(t => t !== toast);
  }, 3000);
}



  onSubmit(): void {
  if (this.userType === 'customer') {

    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const customer = {
      name: this.customerForm.value.name,
      phone: this.customerForm.value.phone,
      email: this.customerForm.value.email,
      password: this.customerForm.value.password
    };

    this.authService.registerCustomer(customer).subscribe({
      next: (res) => {
        this.loading = false;

        this.showToasts(
          'Registration successful. OTP sent to your email.',
          'success'
        );

        this.router.navigate(['/otp'], {
          queryParams: {
            email: customer.email
          }
        });
      },

      error: (error) => {
        this.loading = false;

        this.showToasts(
          error?.error?.message || 'Registration failed.',
          'error'
        );
      }
    });

  } else {

    if (this.sellerForm.invalid) {
      this.sellerForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const seller = {
      pharmacyName: this.sellerForm.value.pharmacyName,
      name: this.sellerForm.value.ownerName,
      phone: this.sellerForm.value.phone,
      whatsapp: this.sellerForm.value.whatsappNo,
      address: this.sellerForm.value.address,
      city: this.sellerForm.value.city,
      openingHours: this.sellerForm.value.openingHours,
      email: this.sellerForm.value.email,
      password: this.sellerForm.value.password
    };

    this.authService.registerSeller(seller).subscribe({
      next: (res) => {
        this.loading = false;

        this.showToasts(
          'Registration successful. OTP sent to your email.',
          'success'
        );

        this.router.navigate(['/otp'], {
          queryParams: {
            email: seller.email
          }
        });
      },

      error: (error) => {
        this.loading = false;

        this.showToasts(
          error?.error?.message || 'Registration failed.',
          'error'
        );
      }
    });
  }
}
}