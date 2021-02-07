import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { StoresService } from '../../../services/store/stores.service';
import { UserService } from '../../../services/user/user.service';
import { AlertService } from '../../../services/alert/alert.service';
import { CameraOptionEnum } from '../../../enums/camera-option.enum';
import { StoreImageTypeEnum } from '../../../enums/store-image-type.enum';
import { CategoryService } from '../../../services/category/category.service';

declare var window: any;
@Component({
	selector: 'app-general',
	templateUrl: './general.page.html',
	styleUrls: ['./general.page.scss'],
})
export class GeneralPage {
	form: FormGroup;
	loading = false;
	store: any = {};
	categories: any[] = [];
	avatarStore: string;
	imageStore: string;

	constructor(
		private fb: FormBuilder,
		public storeService: StoresService,
		private categoryService: CategoryService,
		public userService: UserService,
		public actionSheetController: ActionSheetController,
		private alertService: AlertService,
		private camera: Camera
	) {
		this.avatarStore = `url('${this.userService.user.store.avatar}')`;
		this.imageStore = `url('${this.userService.user.store.image}')`;
		this.store = this.userService.user.store;
		this.createForm();
		this.getData(this.store.storeId);
	}

	ionViewWillEnter() {
		this.initForm();
	}

	getData(storeId: string, event?: any) {
		this.categoryService.getCategories().subscribe((res: any) => {
			this.categories = res.object;
			this.storeService.getStoreById(storeId).subscribe((res1: any) => {
				this.store = res1.object;
				this.publicName.setValue(this.store.publicName);
				this.website.setValue(this.store.website);
				this.phone.setValue(this.store.phone);
				this.description.setValue(this.store.description);
				if (event) {
					event.target.complete();
				}
			});
		});
	}

	createForm() {
		this.form = this.fb.group({
			publicName: ['', Validators.required],
			categoryId: ['', Validators.required],
			website: [''],
			phone: [''],
			description: ['', Validators.required],
		});
	}

	initForm() {
		this.publicName.setValue(this.store.publicName);
		this.categoryId.setValue(this.store.category.categoryId);
		this.website.setValue(this.store.website);
		this.phone.setValue(this.store.phone);
		this.description.setValue(this.store.description);
	}

	save() {
		this.loading = true;
		this.store.publicName = this.publicName.value;
		this.store.category = null;
		this.store.categoryId = this.categoryId.value;
		this.store.website = this.website.value;
		this.store.phone = this.phone.value;
		this.store.description = this.description.value;

		this.storeService.updateStore(this.store).subscribe(
			() => {
				this.userService.user.store = this.store;
				this.userService.saveStorage(this.userService.user, this.userService.token);
				this.loading = false;
			},
			() => {
				this.loading = false;
			}
		);
	}

	saveAvatar(options: CameraOptions) {
		this.camera.getPicture(options).then(
			imageData => {
				const img = window.Ionic.WebView.convertFileSrc(imageData);
				this.storeService
					.changeStoreAvatar(this.store, imageData)
					.then((res: any) => {
						this.store = JSON.parse(res.response).object;
						this.avatarStore = `url('${this.store.avatar}')`;
						const user = this.userService.user;
						user.store = this.store;
						this.userService.saveStorage(user, this.userService.token);
					})
					.catch(err => {
						console.log(err);
						const error = JSON.parse(err.body);
						this.alertService.presentAlert('Error', this.store.publicName, error.detailMessage);
					});
			},
			() => {}
		);
	}

	saveImage(options: CameraOptions) {
		this.camera.getPicture(options).then(
			imageData => {
				const img = window.Ionic.WebView.convertFileSrc(imageData);
				this.storeService
					.changeStoreImage(this.store, imageData)
					.then((res: any) => {
						this.store = JSON.parse(res.response).object;
						this.imageStore = `url('${this.store.image}')`;
						const user = this.userService.user;
						user.store = this.store;
						this.userService.saveStorage(user, this.userService.token);
					})
					.catch(err => {
						console.log(err);
						const error = JSON.parse(err.body);
						this.alertService.presentAlert('Error', this.store.publicName, error.detailMessage);
					});
			},
			() => {}
		);
	}

	changeImage(type: StoreImageTypeEnum) {
		this.saveImage(this.getOptions(CameraOptionEnum.PHOTOLIBRARY));
	}

	private getOptions(type: CameraOptionEnum) {
		const options: CameraOptions = {
			quality: 60,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation: true,
			sourceType:
				type === CameraOptionEnum.CAMERA
					? this.camera.PictureSourceType.CAMERA
					: this.camera.PictureSourceType.PHOTOLIBRARY,
		};

		return options;
	}

	async presentActionSheet(type: StoreImageTypeEnum) {
		const actionSheet = await this.actionSheetController.create({
			cssClass: 'my-custom-class',
			buttons: [
				{
					text: 'Seleccionar imagen',
					icon: 'image',
					handler: () => {
						if (type === StoreImageTypeEnum.AVATAR) {
							this.saveAvatar(this.getOptions(CameraOptionEnum.PHOTOLIBRARY));
						} else {
							this.saveImage(this.getOptions(CameraOptionEnum.PHOTOLIBRARY));
						}
					},
				},
				{
					text: 'Tomar foto',
					icon: 'camera',
					handler: () => {
						if (type === StoreImageTypeEnum.AVATAR) {
							this.saveAvatar(this.getOptions(CameraOptionEnum.CAMERA));
						} else {
							this.saveImage(this.getOptions(CameraOptionEnum.CAMERA));
						}
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

	get publicName() {
		return this.form.controls.publicName;
	}

	get categoryId() {
		return this.form.get('categoryId');
	}

	get website() {
		return this.form.controls.website;
	}

	get phone() {
		return this.form.controls.phone;
	}

	get description() {
		return this.form.controls.description;
	}
}
