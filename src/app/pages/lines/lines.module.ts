import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinesPageRoutingModule } from './lines-routing.module';

import { LinesPage } from './lines.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, LinesPageRoutingModule],
  declarations: [LinesPage],
})
export class LinesPageModule {}
