import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions:any=[];
  date:any;
  allDate:any=[];
  setDate:any=[];
  constructor(private api : ApiService, private datepipe: DatePipe, private spinner : NgxSpinnerService){}

  ngOnInit(): void {
    this.spinner.show();
    this.api.getTransactions().subscribe((res:any)=>{
      this.transactions=res;
      console.log(this.transactions,"All Transactions");
      this.date=res[0].date_time;
      console.log(this.date,"DATE");
      this.transactions.filter((x:any)=>{
        this.allDate.push(this.datepipe.transform(x.date_time))
      })
      console.log(this.allDate,"ALL DATE");
      
      this.setDate = [... new Set(this.allDate)];
      console.log(this.setDate,"SET");
      
      this.spinner.hide();
     
    })
  }

}
