import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  username: String;
  password: String;

  messages: Object;

  ngOnInit() {
  	if(this.auth.isLoggedIn() !== null) {
  		this.router.navigate(['']);
  	}
  }

  loginButtonClick() {
  	if(this.username=='' || this.password==='' || this.username==undefined || this.password===undefined) {
  		window.alert('Fields are Empty');
  	} else {
  		const Auth = {
  		uname: this.username,
  		pass: this.password
	  	};
	  	this.auth.loginAuthTrigger(Auth).subscribe((res:any)=> {
	  		if(res.token) {
	  			localStorage.setItem('token', JSON.stringify(res.token));
	  			this.router.navigate(['']);
	  		} if(res.message) {
	  			this.messages = res;
	  		}
	  	});
  	}
  }

}
