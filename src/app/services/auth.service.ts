import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router:Router) { }

  private url = 'http://localhost:5000/user';

  isLoggedIn() {
  	let token = localStorage.getItem('token');
  	if(token !== undefined) {
  		return token;
  	} else {
  		return null;
  	}
  }

  getUserDetails(id:String) {
    return this.http.post(`${this.url}/get-user-details/`, {id: id})
    .pipe((map((res:any)=>(res))));
  }
  
  registerAuthTrigger(user:Object) {
  	return this.http.post(`${this.url}/sign-up-user/`, user)
  	.pipe(map((res:any)=>res));
  }

  loginAuthTrigger(auth:Object) {
  	return this.http.post(`${this.url}/sign-in-user/`, auth)
  	.pipe(map((res:any)=>res));
  }

  logoutTrigger() {
  	localStorage.clear();
  	this.router.navigate(['']);
  }
}
