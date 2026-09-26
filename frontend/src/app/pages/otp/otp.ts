import { Component, ElementRef, ViewChildren, QueryList, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp.html',
  styleUrls: ['./otp.css']
})
export class VerifyOtpComponent implements OnInit, OnDestroy {
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;

  otpForm: FormGroup;
  phoneNumber: string = '+92 3•• ••• 701';
  countdown: number = 30;
  timer: any;
  canResend: boolean = false;

  constructor(private fb: FormBuilder) {
    this.otpForm = this.fb.group({
      digits: this.fb.array(
        Array(6).fill('').map(() => this.fb.control('', [Validators.required, Validators.pattern('^[0-9]$')]))
      )
    });
  }

  ngOnInit(): void {
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
    const value = input.value;

    if (value && index < 5) {
      const nextInput = this.inputs.toArray()[index + 1];
      if (nextInput) {
        nextInput.nativeElement.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.digitsControls.at(index).value && index > 0) {
      const prevInput = this.inputs.toArray()[index - 1];
      if (prevInput) {
        prevInput.nativeElement.focus();
      }
    }
  }

  startTimer(): void {
    this.canResend = false;
    this.countdown = 30;
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
    if (!this.canResend) return;
    console.log('OTP Code Resent!');
    this.startTimer();
  }

  onSubmit(): void {
    if (this.otpForm.invalid) {
      return;
    }
    const otpCode = this.digitsControls.value.join('');
    console.log('Submitted OTP:', otpCode);
  }
}