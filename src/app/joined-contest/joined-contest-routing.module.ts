import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinedContestComponent } from './joined-contest.component';
import { JoinedLeaugesComponent } from './joined-leauges/joined-leauges.component';
import { LeaugesDetailsComponent } from './leauges-details/leauges-details.component';
import { JoinedLeaugesUpcomingComponent } from './joined-leauges-upcoming/joined-leauges-upcoming.component';
import { LeaugesDetailsUpcomingComponent } from './leauges-details-upcoming/leauges-details-upcoming.component';

const routes: Routes = [
  { path: '', component: JoinedContestComponent },
  {path:'my-leauges',component:JoinedLeaugesComponent},
  {path:'leauges-details',component:LeaugesDetailsComponent},
  {path:'upcoming-leauges',component:JoinedLeaugesUpcomingComponent},
  {path:'upcoming-leauges-details',component:LeaugesDetailsUpcomingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoinedContestRoutingModule { }
