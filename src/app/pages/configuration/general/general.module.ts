import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralPageRoutingModule } from './general-routing.module';

import { GeneralPage } from './general.page';
import { SharedModule } from '../../../shared/shared.module';
import { PipesModule } from '../../../services/pipes/pipes.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		SharedModule,
		PipesModule,
		IonicModule,
		GeneralPageRoutingModule,
	],
	declarations: [GeneralPage],
})
export class GeneralPageModule {}
