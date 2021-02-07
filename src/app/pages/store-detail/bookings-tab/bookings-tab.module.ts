import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsTabPageRoutingModule } from './bookings-tab-routing.module';

import { BookingsTabPage } from './bookings-tab.page';
import { SharedModule } from '../../../shared/shared.module';
import { PipesModule } from '../../../services/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, PipesModule, BookingsTabPageRoutingModule],
  declarations: [BookingsTabPage],
})
export class BookingsTabPageModule {}
