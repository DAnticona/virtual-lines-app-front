import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LineDetailPageRoutingModule } from './line-detail-routing.module';

import { LineDetailPage } from './line-detail.page';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../services/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, PipesModule, LineDetailPageRoutingModule],
  declarations: [LineDetailPage],
})
export class LineDetailPageModule {}
