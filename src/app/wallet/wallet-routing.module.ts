import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from './wallet.component';
import { AddCashComponent } from './add-cash/add-cash.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ScratchCardsComponent } from './scratch-cards/scratch-cards.component';

const routes: Routes = [{ path: '', component: WalletComponent },{path:'add-cash', component:AddCashComponent},{path:'my-transactions', component:TransactionsComponent},{path:'scratch-card', component:ScratchCardsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
