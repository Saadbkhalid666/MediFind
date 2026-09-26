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
  private apiUrl = 'url';

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

  registerSeller(seller: Seller): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registerSeller`, seller).pipe(
      tap((res) => {
        if (res?.token && res?.username) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username);
          this.usernameSubject.next(res.username);
        }
      }),
    );
  }

  registerCustomer(cust: Customer): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registerCustomer`, cust).pipe(
      tap((res) => {
        if (res?.token && res?.username) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.name);
          this.usernameSubject.next(res.username);
        }
      }),
    );
  }

  verifyOtp(otp: { otp: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-otp`, otp).pipe(
      tap((res) => {
        if (res?.username && res?.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.name);
          localStorage.setItem('role', res.role);
          this.usernameSubject.next(res.username);
          this.userRoleSbuject.next(res.role);
        }
      }),
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        if (res?.username && res?.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.name);
          localStorage.setItem('role', res.role);
          this.usernameSubject.next(res.username);
          this.userRoleSbuject.next(res.role);
        }
      }),
    );
  }
}
