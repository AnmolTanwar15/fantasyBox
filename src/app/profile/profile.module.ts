import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../material.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyAccComponent } from './verify-acc/verify-acc.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    VerifyAccComponent,
    LeaderboardComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxSpinnerModule, 
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class ProfileModule { }
