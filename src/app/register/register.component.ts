import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  fname: String;
  lname: String;
  uname: String;
  password: String;
  dob: Date;
  messages: Object;
  success: Object;

  ngOnInit() {
    if(this.auth.isLoggedIn() !== null) {
      this.router.navigate(['']);
    }
  }

  registerButtonClick() {
    if(this.fname===''||this.lname===''||this.uname===''||this.password==='') {
      window.alert('Fields are Empty');
    } else if(this.dob===undefined || this.fname===undefined || this.lname===undefined || this.uname===undefined || this.password===undefined) {
      window.alert('Fields are Empty');
    } else {
      const user = {
      fname: this.fname, 
      lname: this.lname, 
      uname: this.uname, 
      pass: this.password, 
      dob: this.dob
      };
      this.auth.registerAuthTrigger(user).subscribe((res:any) => {
        if(res.message) {
          this.messages = res;
        } if(res.success) {
          this.success = res;
        }
      });
    }
  }

}
