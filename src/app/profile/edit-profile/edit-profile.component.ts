import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{
  
  userInfo:any=[];
    
  constructor(private api : ApiService, private fb : FormBuilder, private datePipe : DatePipe, private spinner : NgxSpinnerService, private tostr : ToastrService,private router : Router){}
  
  ngOnInit(): void {
    this.spinner.show();
    this.api.getUserDetails().subscribe((res:any)=>{
      this.userInfo = res[0];
      console.log(this.userInfo);   
      this.patchValue();
      this.spinner.hide();   
    })
  }
  
  editForm = this.fb.group({
    t_name:['', Validators.required],
    y_name:['', Validators.required],
    date:['',Validators.required],
    gender:['', Validators.required],
    email:['', Validators.required],
    mob:['', Validators.required],
    address:['', Validators.required],
    state:['', Validators.required],
    pin:['', Validators.required],
  })

  get f(){
    return this.editForm.controls;
  }


  patchValue(){
    this.editForm.patchValue({
      t_name:this.userInfo.team,
      y_name:this.userInfo.username,
      date:this.datePipe.transform(this.userInfo.dob,'yyyy-MM-dd'),
      gender:this.userInfo.gender,
      email:this.userInfo.email,
      mob:this.userInfo.mobile,
      address:this.userInfo.address,
      state:this.userInfo.state,
      pin:this.userInfo.pincode,
    })
  }

  onSubmit(){
    if(this.editForm.invalid){
      this.editForm.markAllAsTouched();
    }
    else{
      console.log(this.editForm.value);
      let data={
        "team":this.editForm.value.t_name,
        "username":this.editForm.value.y_name,
        "dob":this.editForm.value.date,
        "gender":this.editForm.value.gender,
        "email":this.editForm.value.email,
        "mobile":this.editForm.value.mob,
        "address":this.editForm.value.address,
        "state":this.editForm.value.state,
        "pincode":this.editForm.value.pin,
      }
      this.api.postEditPofile(data).subscribe((res:any)=>{
        console.log(res);       
      },err=>{
        this.tostr.success("Profile Updated Succesfully")
        this.router.navigate(['profile'])
      })
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

  onKey(evt:any){
    evt.preventDefault();
  }
}
