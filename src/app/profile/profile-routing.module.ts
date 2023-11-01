import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { VerifyAccComponent } from './verify-acc/verify-acc.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [{ path: '', component: ProfileComponent },{path:'edit-profile',component:EditProfileComponent},{path:'verify-account', component:VerifyAccComponent},{path:'leaderboard', component:LeaderboardComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
