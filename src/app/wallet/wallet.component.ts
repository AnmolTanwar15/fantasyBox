import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RedeemCouponComponent } from './redeem-coupon/redeem-coupon.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  value:any;
  userDetails:any=[];

  constructor(private api : ApiService, private router : Router, private bottomSheet : MatBottomSheet, private spinner : NgxSpinnerService){}

  ngOnInit(): void {
    this.spinner.show();

    this.api.getUserDetails().subscribe((res:any)=>{
      console.log(res,"USERS DETAILS");
      this.userDetails=res[0];
      console.log(this.userDetails,"USER");
      if(this.userDetails.balance>0){
        this.value=100;
      }     
      this.spinner.hide();
    })
  }


  onAddCash(){
    this.router.navigate(['wallet/add-cash'])
  }

  onCoupon(){
    this.bottomSheet.open(RedeemCouponComponent)
  }


  onLogout(){
    localStorage.clear();
    this.router.navigate(['']);
}
}
