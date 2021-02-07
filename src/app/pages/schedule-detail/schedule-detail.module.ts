import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleDetailPageRoutingModule } from './schedule-detail-routing.module';

import { ScheduleDetailPage } from './schedule-detail.page';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../services/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PipesModule,
    ScheduleDetailPageRoutingModule,
  ],
  declarations: [ScheduleDetailPage],
})
export class ScheduleDetailPageModule {}
