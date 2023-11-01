import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContestRoutingModule } from './contest-routing.module';
import { ContestComponent } from './contest.component';
import { MaterialModule } from '../material.module';
import { ContestByCatComponent } from './contest-by-cat/contest-by-cat.component';
import { JoinDialogComponent } from './join-dialog/join-dialog.component';
import { BottomSheetContestComponent } from './bottom-sheet-contest/bottom-sheet-contest.component';
import { ContestDetailsComponent } from './contest-details/contest-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    ContestComponent,
    ContestByCatComponent,
    JoinDialogComponent,
    BottomSheetContestComponent,
    ContestDetailsComponent,
  ],
  imports: [
    CommonModule,
    ContestRoutingModule,
    MaterialModule,
    NgxSpinnerModule, 
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}
  ]
})
export class ContestModule { }
