import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { AuthService } from '../services/auth.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private auth:AuthService, private todo:TodoService, private router:Router) { }

  title: String;
  User: any;
  messages: Object;
  success: Object;

  ngOnInit() {
  	const token = this.auth.isLoggedIn();
  	if(token === null) {
  		this.router.navigate(['sign-in-user']);
  	} else {
  		this.User = jwt_decode(token);
  	}
  }

  createTodo() {
  	this.todo.createTodoServer(this.title, this.User.user._id).subscribe( (res:any)=>{
      console.log(res);
  		if(res.message) {
        this.success = null;
        this.messages = res;
      } if(res.success) {
        this.messages = null;
        this.success = res;
      }
  	} );
  }

}
