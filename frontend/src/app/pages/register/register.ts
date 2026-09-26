import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  userType: 'customer' | 'seller' = 'customer';
  
  customerForm: FormGroup;
  sellerForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

  onSubmit(): void {
    if (this.userType === 'customer') {
      if (this.customerForm.invalid) {
        this.customerForm.markAllAsTouched();
        return;
      }
      console.log('Customer Registration Data:', this.customerForm.value);
    } else {
      if (this.sellerForm.invalid) {
        this.sellerForm.markAllAsTouched();
        return;
      }
      console.log('Seller Registration Data:', this.sellerForm.value);
    }
  }
}