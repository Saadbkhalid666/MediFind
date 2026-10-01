import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Customer {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface Seller {
  pharmacyName: string;
  name: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  openingHours: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://192.168.100.14/api/v1/auth';

  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();
  private userRoleSbuject = new BehaviorSubject<string | null>(
    localStorage.getItem('role') || null,
  );
  userRole$ = this.userRoleSbuject.asObservable();

  constructor(private http: HttpClient) {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      this.usernameSubject.next(savedUsername);
    }
  }
  registerCustomer(customer: Customer): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registerCustomer`, customer);
  }

  registerSeller(seller: Seller): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registerSeller`, seller);
  }

  verifyOtp(data: { otp: string; email: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-otp`, data).pipe(
      tap((res) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.name);
          localStorage.setItem('role', res.role);

          this.usernameSubject.next(res.name);
          this.userRoleSbuject.next(res.role);
        }
      }),
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.name);
          localStorage.setItem('role', res.role);

          this.usernameSubject.next(res.name);
          this.userRoleSbuject.next(res.role);
        }
      }),
    );
  }
}
