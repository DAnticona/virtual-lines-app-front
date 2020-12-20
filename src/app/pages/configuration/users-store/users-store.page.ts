import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ModalController } from '@ionic/angular';
import { UserNewComponent } from '../../../components/user-new/user-new.component';
import { UserEditComponent } from '../../../components/user-edit/user-edit.component';

@Component({
  selector: 'app-users-store',
  templateUrl: './users-store.page.html',
  styleUrls: ['./users-store.page.scss'],
})
export class UsersStorePage {
  loading: boolean;
  users: any[] = [];
  store: any = {};
  user: any = {};

  constructor(public userService: UserService, public modalController: ModalController) {
    this.loading = false;
    this.store = this.userService.user.store;
    this.getUsers();
  }

  getUsers(event?: any) {
    this.userService.getUsersByStoreId(this.store.storeId).subscribe((res: any) => {
      this.users = res.object;
      if (event) {
        event.target.complete();
      }
    });
  }

  async updateUser(user: any) {
    const modal = await this.modalController.create({
      component: UserEditComponent,
      cssClass: 'my-custom-class',
      componentProps: { user },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data.refresh) {
      this.getUsers();
    }
  }

  async saveUser(user?: any) {
    const modal = await this.modalController.create({
      component: UserNewComponent,
      cssClass: 'my-custom-class',
      componentProps: { user },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.getUsers();
    }
  }
}
