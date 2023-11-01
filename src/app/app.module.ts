import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './header/header.component';
import { CountdownModule } from 'ngx-countdown';
import { DatePipe } from '@angular/common';
import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CountdownModule,
    ToastrModule.forRoot(),
    NgxSimpleCountdownModule,
    NgxSpinnerModule, 
    NgxSpinnerModule.forRoot({ type: 'timer' })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
