import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { MaterialModule } from '../material.module';
import { AddCashComponent } from './add-cash/add-cash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionsComponent } from './transactions/transactions.component';
import { RedeemCouponComponent } from './redeem-coupon/redeem-coupon.component';
import { ScratchCardsComponent } from './scratch-cards/scratch-cards.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    WalletComponent,
    AddCashComponent,
    TransactionsComponent,
    RedeemCouponComponent,
    ScratchCardsComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule, 
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
,
providers:[DatePipe ]
})
export class WalletModule { }
