import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulesPageRoutingModule } from './schedules-routing.module';

import { SchedulesPage } from './schedules.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from '../../services/pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PipesModule,
    ComponentsModule,
    IonicModule,
    SchedulesPageRoutingModule,
  ],
  declarations: [SchedulesPage],
})
export class SchedulesPageModule {}
