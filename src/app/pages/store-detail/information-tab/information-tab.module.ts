import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationTabPageRoutingModule } from './information-tab-routing.module';

import { InformationTabPage } from './information-tab.page';
import { SharedModule } from '../../../shared/shared.module';
import { PipesModule } from '../../../services/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PipesModule,
    InformationTabPageRoutingModule,
  ],
  declarations: [InformationTabPage],
})
export class InformationTabPageModule {}
