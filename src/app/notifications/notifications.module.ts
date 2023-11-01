import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { MaterialModule } from '../material.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    MaterialModule,
    NgxSpinnerModule, 
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class NotificationsModule { }
