import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  loading = false;
  user: any = {};
  constructor(public userService: UserService, public alertController: AlertController) {
    console.log(this.userService.user);
    this.user = this.userService.user;
    this.user.storeId = this.userService.user.store ? this.userService.user.store.storeId : null;
    this.user.roleId = this.userService.user.role.roleId;
  }

  ngOnInit() {}

  async openChangePassword() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Contraseña',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Escriba la nueva contraseña',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: data => {
            this.changePassword(data.password);
          },
        },
      ],
    });

    await alert.present();
  }

  changePassword(password: string) {
    this.loading = true;

    this.user.password = password;

    this.userService.changePassword(this.user).subscribe(
      () => {
        this.loading = false;
        this.userService.logout();
      },
      () => {
        this.loading = false;
      }
    );
  }

  save() {
    this.loading = true;
    this.userService.newUser(this.user).subscribe((res: any) => {
      this.loading = false;
    });
  }

  changeListener($event): void {
    // this.file = $event.target.files[0];
    console.log($event);
  }
}
