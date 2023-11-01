import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{

  dateOfBirth:any;
  maxDate=new Date("01/01/2005");

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getFullYear();
    return day!<2006;
  };

  constructor(private fb : FormBuilder, private api : ApiService, public dialog : MatDialog, public datePipe : DatePipe, private tostr : ToastrService, private spinner : NgxSpinnerService){}

  editProfile = this.fb.group({
    team:['',[Validators.required,Validators.pattern('^(?=[^\s]*?[0-9])(?=[^\s]*?[a-zA-Z])[a-zA-Z0-9]*$')]],
    dob:['',Validators.required],
    state:['',Validators.required],
  })

  get f(){
    return this.editProfile.controls;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.spinner.hide();

  }

  onSubmit(){
    if(this.editProfile.invalid){
      this.editProfile.markAllAsTouched();
    }else{
      console.log(this.editProfile.value,"Value");
      let data={
        "dob":this.datePipe.transform(this.editProfile.value.dob, 'dd-MM-yyyy'),
        "state":this.editProfile.value.state,
        "team":this.editProfile.value.team,
      }
      this.api.postEditPofile(data).subscribe((res:any)=>{
        console.log(res,"REsponse");
        if(res.success == true){
          this.tostr.success(res.message);
          this.dialog.closeAll();
        }else{
          this.tostr.error(res.message);
        }
      },err=>{
        window.location.reload();
      })
    }   
  }

}
