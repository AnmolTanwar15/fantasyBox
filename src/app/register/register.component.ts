import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showPassword=false;
  showPassword2=false;
  tempUser:any;
  otpForm=false;
  otp:any;
    
  constructor(private fb : FormBuilder, private api : ApiService, private tostr: ToastrService,private router : Router){}

  ngOnInit(): void {
    
  }

  regiForm = this.fb.group({
    email:['',[
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]],
    mob:['',[
      Validators.required,
      Validators.pattern("^[0-9]{10}$")
    ]],
    password1:['',[
      Validators.required,
      (c: AbstractControl) => Validators.required(c),
    ]],
    password:['',[
      Validators.required,
      (c: AbstractControl) => Validators.required(c),
    ]],
  },
  {
    validator: this.ConfirmedValidator('password1', 'password'),
  })

  OTP = this.fb.group({
    otp:['',Validators.required]
  })

  get f(){
    return this.regiForm.controls;
  }

  get f2(){
    return this.OTP.controls;
  }
  
  onSubmit(){
    if(!this.regiForm.valid){
      this.regiForm.markAllAsTouched();
    }
    else{
      console.log(this.regiForm.value,"Register Form");
      let data={
          "email":this.regiForm.value.email,
          "password":this.regiForm.value.password,
          "mobile":this.regiForm.value.mob,
      }
      this.api.postData(data).subscribe((res:any)=>{
        console.log(res,"Res");
        this.tempUser=res[0].tempuser;
        if(res[0].success == false){
          this.tostr.error(res[0].message);
        }
        else if(res[0].success == true){
          this.tostr.success(res[0].message);
          this.otpForm=true;
          this.regiForm.disable();
        }
      })
    }   
  }

  onSubmitOTP(){
    // if(!this.OTP.valid){
    //   this.OTP.markAllAsTouched();
    // }else{
      console.log(this.otp,"OTP");
      let data={
        "tempuser":this.tempUser,
        "otp":Number(this.otp),
      }
      this.api.postOTP(data).subscribe((res:any)=>{
        console.log(res,"OTP res");
        if(res[0].success == false){
          this.tostr.error(res[0].message);
        }
        else if(res[0].success == true){
          this.tostr.success(res[0].message);
          this.router.navigate([''])
        }
      })
    // }
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  togglePasswordVisibility(p:any){
    if(p==='password1'){
      this.showPassword = !this.showPassword;
    }
    else if(p==='password'){
      this.showPassword2 = !this.showPassword2;
    }
  }

  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  onOtpChange(e:any){
    console.log(e,"EVENT");
    this.otp=e;
  }
}
