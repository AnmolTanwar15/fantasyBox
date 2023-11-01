import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }, 
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) }, 
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),canActivate:[AuthGuard],},
  { path: 'contest', loadChildren: () => import('./contest/contest.module').then(m => m.ContestModule) },
  { path: 'createTeam', loadChildren: () => import('./create-team/create-team.module').then(m => m.CreateTeamModule) },
  { path: 'wallet', loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule) },
  { path: 'joined-contest', loadChildren: () => import('./joined-contest/joined-contest.module').then(m => m.JoinedContestModule) },
  { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
