import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestComponent } from './contest.component';
import { ContestByCatComponent } from './contest-by-cat/contest-by-cat.component';
import { ContestDetailsComponent } from './contest-details/contest-details.component';

const routes: Routes = [{ path: '', component: ContestComponent },{path: 'contestByCat', component:ContestByCatComponent},{path:'contest-details', component:ContestDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestRoutingModule { }
