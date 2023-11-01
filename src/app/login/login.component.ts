import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  showPassword=false;

  constructor(private fb:FormBuilder, private api: ApiService, private toastr: ToastrService, private router: Router){}

  ngOnInit(): void {
    let localdata = localStorage.getItem('AuthKey')
    if(localdata!=null){
      this.router.navigate(['home'])
    }else{
      this.router.navigate(['']);
    }
  }

  loginForm = this.fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })

  get f(){
    return this.loginForm.controls;
  }

  togglePasswordVisibility(p:any){
    if(p==='password1'){
      this.showPassword = !this.showPassword;
    }
  }

  onSubmit(){
    if(!this.loginForm.valid){
      this.loginForm.markAllAsTouched();
    }else{
      console.log(this.loginForm.value);
      this.api.userName=this.loginForm.value.email;
      this.api.password=this.loginForm.value.password;
      this.api.getData().subscribe((res:any)=>{
        console.log(res,"ASDFGHJK");
        if(res[0].success == true){
          localStorage.setItem('AuthKey',res[0].auth_key);
          localStorage.setItem("UserId",res[0].userid);
          this.toastr.success(res[0].message);
          this.router.navigate(['home']);
        }
        else if(res[0].success == false){
          this.toastr.error(res[0].message);
        }
      })
    }
  }

}
