import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterStorePageRoutingModule } from './register-store-routing.module';

import { RegisterStorePage } from './register-store.page';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDcNRcy02sBgI0YttiiKob_8diepj2_pjE',
    }),
    RegisterStorePageRoutingModule,
  ],
  declarations: [RegisterStorePage],
})
export class RegisterStorePageModule {}
