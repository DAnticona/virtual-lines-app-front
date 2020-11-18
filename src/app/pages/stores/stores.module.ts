import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoresPageRoutingModule } from './stores-routing.module';

import { StoresPage } from './stores.page';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../services/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, StoresPageRoutingModule, SharedModule, PipesModule],
  declarations: [StoresPage],
})
export class StoresPageModule {}
