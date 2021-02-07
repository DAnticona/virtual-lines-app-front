import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinesTabPageRoutingModule } from './lines-tab-routing.module';

import { LinesTabPage } from './lines-tab.page';
import { SharedModule } from '../../../shared/shared.module';
import { PipesModule } from '../../../services/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, PipesModule, LinesTabPageRoutingModule],
  declarations: [LinesTabPage],
})
export class LinesTabPageModule {}
