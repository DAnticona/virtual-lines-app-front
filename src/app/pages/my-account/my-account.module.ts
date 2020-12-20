import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAccountPageRoutingModule } from './my-account-routing.module';

import { MyAccountPage } from './my-account.page';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../services/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MyAccountPageRoutingModule, SharedModule, PipesModule],
  declarations: [MyAccountPage],
})
export class MyAccountPageModule {}
