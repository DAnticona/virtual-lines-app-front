import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';

declare var window: any;
@Component({
	selector: 'app-my-account',
	templateUrl: './my-account.page.html',
	styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage {
	loading = false;
	user: any = {};
	imageUser: string;
	constructor(
		public userService: UserService,
		public alertController: AlertController,
		public actionSheetController: ActionSheetController,
		private alertService: AlertService,
		private camera: Camera
	) {
		this.user = this.userService.user;
		this.user.storeId = this.userService.user.store ? this.userService.user.store.storeId : null;
		this.user.roleId = this.userService.user.role.roleId;
		this.imageUser = `url('${this.userService.user.image}')`;
	}

	getUser(email: string, event?: any) {
		this.userService.getUserByEmail(email).subscribe((res: any) => {
			this.user = res.object;
			if (event) {
				event.target.complete();
			}
		});
	}

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
		this.userService.updateUser(this.user).subscribe(
			() => {
				this.loading = false;
			},
			() => {
				this.loading = false;
			}
		);
	}

	changeImage() {
		const options: CameraOptions = {
			quality: 60,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation: true,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		};

		this.camera.getPicture(options).then(
			imageData => {
				const img = window.Ionic.WebView.convertFileSrc(imageData);
				this.userService
					.changeUserAvatar(this.user, imageData)
					.then((res: any) => {
						this.user = JSON.parse(res.response).object;
						this.imageUser = `url('${this.user.image}')`;
						this.userService.saveStorage(this.user, this.userService.token);
					})
					.catch(err => {
						console.log(err);
						const error = JSON.parse(err.body);
						this.alertService.presentAlert('Error', this.user.email, error.detailMessage);
					});
			},
			() => {}
		);
	}

	takePicture() {
		const options: CameraOptions = {
			quality: 60,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation: true,
			sourceType: this.camera.PictureSourceType.CAMERA,
		};

		this.camera.getPicture(options).then(
			imageData => {
				const img = window.Ionic.WebView.convertFileSrc(imageData);
				this.userService
					.changeUserAvatar(this.user, imageData)
					.then((res: any) => {
						this.user = JSON.parse(res.response).object;
						this.imageUser = `url('${this.user.image}')`;
						this.userService.saveStorage(this.user, this.userService.token);
					})
					.catch(err => {
						console.log(err);
						const error = JSON.parse(err.body);
						this.alertService.presentAlert('Error', this.user.email, error.detailMessage);
					});
			},
			() => {}
		);
	}

	async presentActionSheet() {
		const actionSheet = await this.actionSheetController.create({
			cssClass: 'my-custom-class',
			buttons: [
				{
					text: 'Seleccionar imagen',
					icon: 'image',
					handler: () => {
						this.changeImage();
					},
				},
				{
					text: 'Tomar foto',
					icon: 'camera',
					handler: () => {
						this.takePicture();
					},
				},
				{
					text: 'Cancel',
					icon: 'close',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					},
				},
			],
		});
		await actionSheet.present();
	}
}
