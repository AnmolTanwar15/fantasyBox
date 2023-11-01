import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinedContestRoutingModule } from './joined-contest-routing.module';
import { JoinedContestComponent } from './joined-contest.component';
import { MaterialModule } from '../material.module';
import { JoinedLeaugesComponent } from './joined-leauges/joined-leauges.component';
import { LeaugesDetailsComponent } from './leauges-details/leauges-details.component';
import { CdTimerModule } from 'angular-cd-timer';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JoinedLeaugesUpcomingComponent } from './joined-leauges-upcoming/joined-leauges-upcoming.component';
import { LeaugesDetailsUpcomingComponent } from './leauges-details-upcoming/leauges-details-upcoming.component';


@NgModule({
  declarations: [
    JoinedContestComponent,
    JoinedLeaugesComponent,
    LeaugesDetailsComponent,
    JoinedLeaugesUpcomingComponent,
    LeaugesDetailsUpcomingComponent,
  ],
  imports: [
    CommonModule,
    JoinedContestRoutingModule,
    MaterialModule,
    CdTimerModule,
    NgxSpinnerModule, 
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class JoinedContestModule { }
