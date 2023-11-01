import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material.module';
import { CountdownModule } from 'ngx-countdown';
import { CdTimerModule } from 'angular-cd-timer';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    HomeComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    CountdownModule,
    CdTimerModule,
    ReactiveFormsModule,
    NgxSpinnerModule, 
    NgxSpinnerModule.forRoot({ type: 'timer' })
  ],
  providers:[DatePipe ]
})
export class HomeModule { }
