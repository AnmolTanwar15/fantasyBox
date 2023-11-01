import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTeamComponent } from './create-team.component';
import { ViewTeamComponent } from './view-team/view-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';

const routes: Routes = [
  { path: '', component: CreateTeamComponent},
  { path:'view-team', component:ViewTeamComponent },
  { path:'edit-team', component:EditTeamComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTeamRoutingModule { }
