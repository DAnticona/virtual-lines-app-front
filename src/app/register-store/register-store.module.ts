import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterStorePageRoutingModule } from './register-store-routing.module';

import { RegisterStorePage } from './register-store.page';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule, RegisterStorePageRoutingModule],
  declarations: [RegisterStorePage],
})
export class RegisterStorePageModule {}
