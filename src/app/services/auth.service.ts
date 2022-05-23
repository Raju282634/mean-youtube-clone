import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signupUrl = `http://localhost:5000/api/users`;
  loginUrl = `http://localhost:5000/api/auth`;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('token') !== null)
    {
      this.loggedIn.next(true);
    }
   }

   isLoggedIn(): boolean {
     if (localStorage.getItem('token') == null)
        { return false; }
     else { return true; }
   }

   SignUp(userData: User){
     return new Promise((resolve, reject) => {
       this.http.post<any>(this.signupUrl, JSON.stringify(userData), {headers: this.headers}).subscribe(
         (res) => {
           resolve(res);
           this.storeToken(res.token);
           this.loggedIn.next(true);
         },
         (err) => { reject(err); }
       );
     });
   }

   Login(userData: User){
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.signupUrl, JSON.stringify(userData), {headers: this.headers}).subscribe(
        (res) => {
          resolve(res);
          this.storeToken(res.token);
          this.loggedIn.next(true);
        },
        (err) => { reject(err); }
      );
    });
  }

  Logout(){
    if (localStorage.getItem('token') != null){
      localStorage.removeItem('token');
      this.loggedIn.next(false);
      // this.router.navigate(['/login']);
    }
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getUserInfo(token: any) {
    const headers = new HttpHeaders().set('x-auth-token', token);
    const httpOptions = {
      headers
    };
    return new Promise((resolve, reject) => {
      this.http.get(this.loginUrl, httpOptions).subscribe(
        (res) => { resolve(res); },
        (err) => { reject(err); }
      );
    });
  }

}
