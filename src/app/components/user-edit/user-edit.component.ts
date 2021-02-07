import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { RoleService } from '../../services/role/role.service';
import { ValidatorsService } from '../../services/validators/validators.service';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
	@Input() user: any = {};
	form: FormGroup;
	form2: FormGroup;
	loading = false;

	roles: Observable<any>;
	store: any = {};

	constructor(
		public userService: UserService,
		public roleService: RoleService,
		public validators: ValidatorsService,
		public router: Router,
		private fb: FormBuilder,
		public modalController: ModalController,
		public alertController: AlertController
	) {
		this.store = this.userService.user.store;
		this.getRoles();
		this.createForm();
	}

	ionViewWillEnter() {
		this.initForm(this.user);
	}

	getRoles() {
		this.roles = this.roleService.getRolesStore();
	}

	createForm() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
			roleId: ['', Validators.required],
			activeFg: ['', Validators.required],
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

	initForm(user: any) {
		this.name.setValue(user.name);
		this.email.setValue(user.email);
		this.roleId.setValue(user.role.roleId);
		this.activeFg.setValue(user.activeFg === 'S' ? true : false);
	}

	save() {
		if (!this.form.valid) {
			return Object.values(this.form.controls).forEach(control => {
				control.markAsTouched();
			});
		}
		this.loading = true;

		this.user.storeId = this.store.storeId;
		this.user.name = this.name.value;
		this.user.email = this.email.value;
		this.user.roleId = this.roleId.value;
		this.user.activeFg = this.activeFg.value ? 'S' : 'N';

		this.userService.newStoreUser(this.user).subscribe(
			() => {
				this.loading = false;
			},
			() => {
				this.loading = false;
			}
		);
	}

	changePassword(password: string) {
		this.loading = true;

		this.user.storeId = this.store.storeId;
		this.user.password = password;

		this.userService.changePassword(this.user).subscribe(
			() => {
				this.loading = false;
				if (this.user.userId === this.userService.user.userId) {
					this.dismiss(false);
					this.userService.logout();
				}
			},
			() => {
				this.loading = false;
			}
		);
	}

	dismiss(refresh: boolean) {
		this.modalController.dismiss({
			refresh,
		});
	}

	// Getters
	get name() {
		return this.form.get('name');
	}
	get email() {
		return this.form.get('email');
	}
	get roleId() {
		return this.form.get('roleId');
	}
	get activeFg() {
		return this.form.get('activeFg');
	}
	get password1() {
		return this.form2.get('password1');
	}
	get password2() {
		return this.form2.get('password2');
	}
}
