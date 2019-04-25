import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router, private todo:TodoService)
  { }

  User: any;
  todos: any;
  searchBar: String;

  ngOnInit() {
  	const token = this.auth.isLoggedIn();
  	if(token === null) {
  		this.router.navigate(['sign-in-user']);
  	} else {
  		this.User = jwt_decode(token);
      this.todo.getAllTodos(this.User.user._id).subscribe( (res:any) => {
        if(res.todos) {
          this.todos = res.todos;
        }
      });
  	}
  }

  deleteTodo(todo) {
    if(window.confirm("Delete this task ?")) {
      this.todo.deleteTodoServer(this.User.user._id, todo)
      .subscribe( (res:any)=> {
        if(res.success) {
          window.location.reload();
        }
      });
    }
  }

  doneTodo(todo: String) {
    if(window.confirm("Complete this task ?")) {
      this.todo.doneTodoServer(this.User.user._id, todo)
      .subscribe( (res:any) => {
        if(res.success) {
          window.location.reload();
        }
      } );
    }
  }

  showAll() {
    this.todo.getAllTodos(this.User.user._id).subscribe( (res:any) => {
      if(res.todos) {
        this.todos = res.todos;
        this.searchBar = '';
      }
    });
  }

  typingBar() {
    if(this.searchBar !== '' || this.searchBar !== undefined) {
      this.todo.searchKeyTodo(this.User._id, this.searchBar).subscribe((res:any) => {
        if(res.todo) {
          this.todos = res.todo;
        }
      });
    } else if(this.searchBar === '' || this.searchBar === undefined) {
      this.todos = null;
    }
  }
}
