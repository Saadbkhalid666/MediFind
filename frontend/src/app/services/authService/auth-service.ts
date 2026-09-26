import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Customer{
  name:string,
  phone:string,
  email:string,
  password:string
}

export interface Seller{
  pharmacyName:string,
  name:string,
  phone:string,
  whatsapp:string,
  address:string,
  city:string,
  openingHours:string
  email:string,
  password:string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = "url"

  private usernameSubject = new BehaviorSubject<string|null>(null)
  username$ = this.usernameSubject.asObservable()
  private userRoleSbuject = new BehaviorSubject<string|null>(localStorage.getItem("role") || null)
  userRole$ = this.userRoleSbuject.asObservable()

  constructor(private http:HttpClient){

    const savedUsername = localStorage.getItem("username")
    if (savedUsername){
      this.usernameSubject.next(savedUsername)
    }
  }

  

}
