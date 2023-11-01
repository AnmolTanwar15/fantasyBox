import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

export interface BottomSheetData {
  key: any;
  challenge:any;
  teamid:any;
}

@Component({
  selector: 'app-bottom-sheet-contest',
  templateUrl: './bottom-sheet-contest.component.html',
  styleUrls: ['./bottom-sheet-contest.component.css']
})
export class BottomSheetContestComponent implements OnInit {

  contestInfo:any=[];

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: BottomSheetData, private _bottomSheetRef: MatBottomSheetRef<BottomSheetContestComponent>, private api : ApiService, private spinner : NgxSpinnerService, private tostr : ToastrService){}


  ngOnInit(): void {
    // this.spinner.show();
    console.log(this.data," CONTEST DATA");
    this.api.getUserBalance(this.data.challenge).subscribe((res:any)=>{
      this.contestInfo=res[0];
      console.log(this.contestInfo,"USER BALANCE");
      // this.spinner.hide();
    })
  }


  joinContest(){
    let obj:any={
      "matchkey":Number(this.data.key),
      "challengeid":this.data.challenge,
      "teamid":this.data.teamid,
    }
    this.api.postJoinLeague(obj).subscribe((res:any)=>{
      console.log(res,"CONTEST JOIN");
    },err=>{
      window.location.reload();
      this.tostr.success("Succesfully Joined Leauge")
    })
  }


}
