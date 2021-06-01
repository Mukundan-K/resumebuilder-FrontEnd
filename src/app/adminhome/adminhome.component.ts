import { Component, OnInit } from '@angular/core';
import {Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

    hide = true;
    admindata={
        email:'',
        password:''
    }
    users=[{
        username:'',
        email:'',
        password:''}];
    admins=[{
        username:'',
        email:'',
        password:''}];

  constructor(private fb : FormBuilder,private signup: LoginService) {}

  ngOnInit(): void {
    this.signup.getuser().subscribe((data)=>{
        this.users=JSON.parse(JSON.stringify(data));
    })
    this.signup.getadmin().subscribe((data)=>{
        this.admins=JSON.parse(JSON.stringify(data));
    })
        document.getElementById('adminsignup').removeAttribute("hidden");
        document.getElementById('admindata').setAttribute("hidden","");
        document.getElementById('userdata').setAttribute("hidden","");
  }
    adminForm= this.fb.group(
    {   
        email:['',[Validators.pattern('^[a-z0-9,%+]+@[a-z0-9.-]+\.[a-z]{2,4}$'),Validators.required]],
        password:['',[Validators.minLength(6),Validators.required]]
    });
    addadmin(){
        this.signup.adminadd(this.admindata).subscribe(
            res=>{
                console.log(res)
            },
            err => {
                if(err.status == 401){
                    document.getElementById('alert').innerHTML="<div class=alert&#32;alert-danger role=alert>Found an Admin with this Email id.</div>";
                    this.adminForm.reset(); 
                }
                else{
                    document.getElementById('alert').innerHTML='<div class=alert&#32;alert-success role=alert>Admin Added!</div>'; 
                    setTimeout(function() {document.getElementById('alert').innerHTML='';},2000);
                    this.adminForm.reset(); 
                }
              }
        )
    }

    add(){
        document.getElementById('adminsignup').removeAttribute("hidden");
        document.getElementById('admindata').setAttribute("hidden","");
        document.getElementById('userdata').setAttribute("hidden","");
    }
    user(){
        document.getElementById('adminsignup').setAttribute("hidden","");
        document.getElementById('admindata').setAttribute("hidden","");
        document.getElementById('userdata').removeAttribute("hidden");
    }
    admin(){
        document.getElementById('adminsignup').setAttribute("hidden","");
        document.getElementById('admindata').removeAttribute("hidden");
        document.getElementById('userdata').setAttribute("hidden","");
    }
    delete(){
        localStorage.removeItem("token");
    }
}
