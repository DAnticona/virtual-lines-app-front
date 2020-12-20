import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../services/pipes/pipes.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [IonicModule, RouterModule, CommonModule, PipesModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
