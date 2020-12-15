import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersStorePageRoutingModule } from './users-store-routing.module';

import { UsersStorePage } from './users-store.page';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    UsersStorePageRoutingModule,
  ],
  declarations: [UsersStorePage],
})
export class UsersStorePageModule {}
