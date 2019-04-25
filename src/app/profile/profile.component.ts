import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router, private todo:TodoService) { }
	
	User: any;
	todos: any;
  
  ngOnInit() {
  	const token = this.auth.isLoggedIn();
  	if(token === null) {
  		this.router.navigate(['sign-in-user']);
  	} else {
  		this.auth.getUserDetails(jwt_decode(token).user._id).subscribe((res:any)=>{
  			if(res) {
  				this.User = res;
  			}
  		});
   	}
  }
}
