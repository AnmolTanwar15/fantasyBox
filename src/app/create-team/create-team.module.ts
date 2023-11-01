import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTeamRoutingModule } from './create-team-routing.module';
import { CreateTeamComponent } from './create-team.component';
import { MaterialModule } from '../material.module';
import { ViewTeamComponent } from './view-team/view-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    CreateTeamComponent,
    ViewTeamComponent,
    EditTeamComponent
  ],
  imports: [
    CommonModule,
    CreateTeamRoutingModule,
    MaterialModule,
    NgxSpinnerModule, 
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class CreateTeamModule { }
