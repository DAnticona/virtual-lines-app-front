import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreDetailPageRoutingModule } from './store-detail-routing.module';

import { StoreDetailPage } from './store-detail.page';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../services/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, PipesModule, StoreDetailPageRoutingModule],
  declarations: [StoreDetailPage],
})
export class StoreDetailPageModule {}
