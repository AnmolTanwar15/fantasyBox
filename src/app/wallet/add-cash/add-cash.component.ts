import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-cash',
  templateUrl: './add-cash.component.html',
  styleUrls: ['./add-cash.component.css']
})
export class AddCashComponent implements OnInit {
  
  value:any=1000;
  userDetails:any=[];

  constructor(private fb : FormBuilder, private api : ApiService, private spinner : NgxSpinnerService){}

  ngOnInit(): void {
    this.spinner.show();

    this.api.getUserDetails().subscribe((res:any)=>{
      console.log(res,"USERS DETAILS");
      this.userDetails=res[0];
      console.log(this.userDetails,"USER");   
      this.spinner.hide();

    })
  }

  addCash = this.fb.group({
    cash:[Number(this.value),Validators.required],
  })

  addAmount(amt:any){
    if(amt === '100'){
      this.value=Number(this.value) + Number(100);
    }
    else if(amt === '500'){
      this.value=Number(this.value) + Number(500);
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

  onCancel(){
    this.value='';
  }
}
