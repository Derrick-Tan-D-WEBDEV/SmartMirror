import {  HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NiClockModule } from 'ni-clock';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { YoutubeMusicPlayerModule } from 'youtube-music-player';
import { DetectionComponent } from './detection/detection.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DetectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NiClockModule,
    FormsModule,
    QRCodeModule,
    IvyCarouselModule,
    YoutubeMusicPlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
