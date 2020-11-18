import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterClientPageRoutingModule } from './register-client-routing.module';

import { RegisterClientPage } from './register-client.page';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule, RegisterClientPageRoutingModule],
  declarations: [RegisterClientPage],
})
export class RegisterClientPageModule {}
