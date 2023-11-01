import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-verify-acc',
  templateUrl: './verify-acc.component.html',
  styleUrls: ['./verify-acc.component.css']
})
export class VerifyAccComponent implements OnInit {
  userInfo:any=[];

  constructor(private fb : FormBuilder, private api : ApiService, private spinner : NgxSpinnerService){}

  verify = this.fb.group({
    email:['', Validators.required],
    mob:['']
  })

  get f(){
    return this.verify.controls;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.api.getUserDetails().subscribe((res:any)=>{
      this.userInfo = res[0];
      console.log(this.userInfo);   
      this.patchValue();
      this.spinner.hide();

    })
  }

  patchValue(){
    this.verify.patchValue({
      email:this.userInfo.email,
      mob:this.userInfo.mobile,
    })
  }

}
