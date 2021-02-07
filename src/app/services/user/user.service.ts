import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AlertService } from '../alert/alert.service';
import { HttpService } from '../http/http.service';
import { environment } from '../../../environments/environment';
import { RoleEnum } from '../../enums/role.enum';
import { NavController } from '@ionic/angular';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	baseUrl = environment.url;
	user: any;
	token: string;

	constructor(
		public httpService: HttpService,
		private alertService: AlertService,
		private http: HttpClient,
		private navController: NavController,
		private fileTransfer: FileTransfer
	) {
		this.loadStorage();
	}

	loadStorage() {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.token = localStorage.getItem('token');
		// console.log(this.user);
	}

	saveStorage(user: any, token: string) {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('token', token);
		this.user = user;
		this.token = token;
	}

	isLogged() {
		return !!(this.token?.length > 5);
	}

	login(user: any) {
		const url = `${this.baseUrl}/login`;

		return this.http.post(url, user).pipe(
			map((res: any) => {
				this.user = res.object;

				if (this.user.role.roleId === RoleEnum.SUPERADMIN) {
					this.alertService.presentAlert('Error', user.email, 'No autorizado');
					return false;
				}

				this.token = res.object.token;
				this.saveStorage(this.user, this.token);
				return res;
			}),
			catchError(err => {
				console.log(err);
				// this.alertService.presentAlert('Error', user.email, err.error.message);
				this.alertService.presentAlertError(err.error);
				return throwError(err);
			})
		);
	}

	logout() {
		this.user = null;
		this.token = null;
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		this.navController.navigateRoot('/login');
	}

	newUser(user: any) {
		const url = `${this.baseUrl}/register/user/new-client-user`;

		return this.http.post(url, user).pipe(
			map(() => {
				this.alertService.presentToast('Registro exitoso', 'success');
				return true;
			}),
			catchError(err => {
				console.log(err);
				// this.alertService.presentAlert('Error', user.email, err.error.message);
				this.alertService.presentAlertError(err.error);
				return throwError(err);
			})
		);
	}

	newStoreUser(user: any) {
		const url = `${this.baseUrl}/user`;

		return this.http.post(url, user, this.httpService.getHttpOptions()).pipe(
			map(() => {
				this.alertService.presentToast('Registro exitoso', 'success');
				return true;
			}),
			catchError(err => {
				console.log(err);
				// this.alertService.presentAlert('Error', user.email, err.error.message);
				this.alertService.presentAlertError(err.error);
				return throwError(err);
			})
		);
	}

	updateUser(user: any) {
		const url = `${this.baseUrl}/user`;

		return this.http.post(url, user, this.httpService.getHttpOptions()).pipe(
			map((res: any) => {
				this.alertService.presentToast('Registro exitoso', 'success');
				this.updateStorage(res.object);
				return true;
			}),
			catchError(err => {
				console.log(err);
				// this.alertService.presentAlert('Error', user.email, err.error.message);
				this.alertService.presentAlertError(err.error);
				return throwError(err);
			})
		);
	}

	changePassword(user: any) {
		const url = `${this.baseUrl}/user/password`;

		return this.http.post(url, user, this.httpService.getHttpOptions()).pipe(
			map(() => {
				this.alertService.presentToast('Registro exitoso', 'success');
				return true;
			}),
			catchError(err => {
				console.log(err);
				// this.alertService.presentAlert('Error', user.email, err.error.message);
				this.alertService.presentAlertError(err.error);
				return throwError(err);
			})
		);
	}

	getUsersByStoreId(id: string) {
		const url = `${this.baseUrl}/store/${id}/users`;

		return this.http.get(url, this.httpService.getHttpOptions());
	}

	getUserByEmail(email: string) {
		const url = `${this.baseUrl}/user/${email}`;

		return this.http.get(url, this.httpService.getHttpOptions()).pipe(
			map((res: any) => {
				this.updateStorage(res.object);
				return res;
			})
		);
	}

	async changeUserAvatar(user: any, imagePath: string) {
		const url = `${this.baseUrl}/user/avatar`;

		const options: FileUploadOptions = {
			fileKey: 'file',
			headers: {
				Authorization: `${this.token}`,
			},
			params: {
				userId: user.userId,
			},
		};

		const fileTransfer: FileTransferObject = this.fileTransfer.create();

		return await fileTransfer.upload(imagePath, url, options);
	}

	isActive(email: string) {
		const url = `${this.baseUrl}/user/${email}`;

		return this.http.get(url, this.httpService.getHttpOptions()).pipe(
			map((res: any) => {
				return res.object.activeFg === 'S';
			})
		);
	}

	private updateStorage(user: any) {
		if (user.userId === this.user.userId) {
			this.user = user;
			this.saveStorage(user, this.token);
		}
	}
}
