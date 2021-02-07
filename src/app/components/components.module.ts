import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserNewComponent } from './user-new/user-new.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  declarations: [UserNewComponent, UserEditComponent, ScheduleComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, RouterModule],
  exports: [UserNewComponent, UserEditComponent, ScheduleComponent],
})
export class ComponentsModule {}
