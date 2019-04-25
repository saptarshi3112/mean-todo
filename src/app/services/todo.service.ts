import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
	constructor(private http:HttpClient, private router:Router) { }
	private url = 'http://localhost:5000/todo';

	createTodoServer(todo:String, uid: String) {
		return this.http.post(`${this.url}/add-new-todo`, {todo: todo, uid: uid})
		.pipe(map( (res:any)=>res ));
	}

	getAllTodos(uid: String) {
		return this.http.post(`${this.url}/get-all-todo/`, { uid: uid })
		.pipe(map( (res:any)=>res ));
	}

	deleteTodoServer(uid: String, todo: String) {
		return this.http.post(`${this.url}/delete-todo/`, { uid: uid, todo: todo })
		.pipe( map( (res:any)=>res ) );
	}

	doneTodoServer(uid: String, todo: String) {
		return this.http.post(`${this.url}/done-todo/`, { uid: uid, todo: todo })
		.pipe( map( (res:any)=>res ) );
	}

	searchKeyTodo(uid: String, todo: String) {
		return this.http.post(`${this.url}/type-todo/`, { uid: uid, todo: todo })
		.pipe( map( (res:any)=>res ) );
	}

	getDone(id: String) {
		return this.http.post(`${this.url}/get-done/`, { uid: id }).pipe( map( (res:any)=>res ) );
	}

	getNotDone(id: String) {
		return this.http.post(`${this.url}/get-not-done/`, { uid: id }).pipe( map( (res:any)=>res ) );
	}

}
