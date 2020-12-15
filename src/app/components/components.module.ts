import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserNewComponent } from './user-new/user-new.component';

@NgModule({
  declarations: [UserNewComponent, UserEditComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, RouterModule],
  exports: [UserNewComponent, UserEditComponent],
})
export class ComponentsModule {}
