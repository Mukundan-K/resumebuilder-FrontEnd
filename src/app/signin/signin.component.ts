import { Component, OnInit } from '@angular/core';
import {Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import { LoginService } from '../service/login.service'
import{Router} from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    hide = true;
    user={ 
        email:'',
        password:''
    }

  constructor(private fb : FormBuilder,private login: LoginService,private router: Router) { }

  ngOnInit(): void {
  }

  signinForm= this.fb.group(
    {            
      email:['',[Validators.pattern('^[a-z0-9,%+]+@[a-z0-9.-]+\.[a-z]{2,4}$'),Validators.required]],
      password:['',[Validators.minLength(6),Validators.required]]
    }
  );

  loginUser () {
  this.login.loginUser(this.user)
  .subscribe(
      res=>{
          localStorage.setItem('token',res.token)
          localStorage.setItem('data',JSON.stringify(res.data))
          this.router.navigate(['/userhome'])
      },
      err => {
          console.log(err);
          document.getElementById('alert').innerHTML="<div class=alert&#32;alert-danger role=alert>Enter a Valid Email or Password!</div>";
          this.signinForm.reset();
        }
  )
}
}
