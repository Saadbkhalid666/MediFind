 
import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ReactiveFormsModule,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/authService/auth-service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp.html',
  styleUrls: ['./otp.css'],
})
export class OtpComponent implements OnInit, OnDestroy {
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;

  otpForm: FormGroup;

  // Email comes from sessionStorage
  email: string = '';

  // 5 minutes = 300 seconds
  countdown: number = 300;

  timer: any;

  canResend: boolean = false;

  loading: boolean = false;

  resendLoading: boolean = false;

  errorMessage: string = '';

  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.otpForm = this.fb.group({
      digits: this.fb.array(
        Array(6)
          .fill('')
          .map(() =>
            this.fb.control('', [
              Validators.required,
              Validators.pattern('^[0-9]$'),
            ])
          )
      ),
    });
  }

  ngOnInit(): void {
    // Get email saved during registration
    this.email = sessionStorage.getItem('email') || '';

    if (!this.email) {
      this.errorMessage =
        'Email is missing. Please register again.';
      return;
    }

    // Start 5-minute countdown
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  get digitsControls(): FormArray {
    return this.otpForm.get('digits') as FormArray;
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;

    // Only allow numbers
    input.value = input.value
      .replace(/\D/g, '')
      .slice(0, 1);

    this.digitsControls
      .at(index)
      .setValue(input.value);

    // Move to next input
    if (input.value && index < 5) {
      const nextInput = this.inputs.toArray()[index + 1];

      if (nextInput) {
        nextInput.nativeElement.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (
      event.key === 'Backspace' &&
      !this.digitsControls.at(index).value &&
      index > 0
    ) {
      const prevInput = this.inputs.toArray()[index - 1];

      if (prevInput) {
        prevInput.nativeElement.focus();
      }
    }
  }

  startTimer(): void {
    // Clear existing timer
    if (this.timer) {
      clearInterval(this.timer);
    }

    // 5 minutes
    this.countdown = 300;

    this.canResend = false;

    this.timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.canResend = true;

        clearInterval(this.timer);
      }
    }, 1000);
  }

  resendCode(): void {
    if (
      !this.canResend ||
      !this.email ||
      this.resendLoading
    ) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.resendLoading = true;

    this.authService.resendOtp(this.email).subscribe({
      next: (response) => {
        this.resendLoading = false;

        console.log(
          'OTP resent successfully:',
          response
        );

        this.successMessage =
          'A new OTP has been sent to your email.';

        // Clear old OTP
        this.otpForm.reset();

        // Restart 5-minute timer
        this.startTimer();

        // Focus first input
        setTimeout(() => {
          const firstInput = this.inputs.first;

          if (firstInput) {
            firstInput.nativeElement.focus();
          }
        });
      },

      error: (error) => {
        this.resendLoading = false;

        console.error(
          'Resend OTP failed:',
          error
        );

        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'Unable to resend OTP. Please try again.';
      },
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }

    if (!this.email) {
      this.errorMessage =
        'Email is missing. Please register again.';

      return;
    }

    const otpCode =
      this.digitsControls.value.join('');

    this.loading = true;

    this.authService
      .verifyOtp({
        otp: otpCode,
        email: this.email,
      })
      .subscribe({
        next: (response) => {
          this.loading = false;

          console.log(
            'OTP verification successful:',
            response
          );

          this.successMessage =
            'OTP verified successfully.';

          // Stop timer
          if (this.timer) {
            clearInterval(this.timer);
          }

          // Go to login
          this.router.navigate(['/login']);
        },

        error: (error) => {
          this.loading = false;

          console.error(
            'OTP verification failed:',
            error
          );

          this.errorMessage =
            error?.error?.message ||
            error?.error?.error ||
            'Invalid or expired OTP. Please try again.';
        },
      });
  }
}
 
