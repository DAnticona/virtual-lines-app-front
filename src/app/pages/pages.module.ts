import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [PagesComponent],
  imports: [BrowserModule, CommonModule, IonicModule, SharedModule, PagesRoutingModule],
  providers: [StatusBar, SplashScreen],
  exports: [PagesComponent],
})
export class PagesModule {}
