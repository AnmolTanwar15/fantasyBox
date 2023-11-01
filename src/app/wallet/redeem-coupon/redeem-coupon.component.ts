import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-redeem-coupon',
  templateUrl: './redeem-coupon.component.html',
  styleUrls: ['./redeem-coupon.component.css']
})
export class RedeemCouponComponent {

  constructor(private fb : FormBuilder, private bottomSheet : MatBottomSheet){}

  redeem = this.fb.group({
    inp:['',Validators.required]
  })

  get f(){
    return this.redeem.controls;
  }

  onSubmit(){
    if(this.redeem.invalid){
      this.redeem.markAllAsTouched();
    }else{
      console.log(this.redeem.value);      
    }
  }

  onCancel(){
    this.bottomSheet.dismiss();
  }
}
