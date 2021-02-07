import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { AlertService } from '../alert/alert.service';
import { HttpService } from '../http/http.service';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class StoresService {
	baseUrl = environment.url;

	constructor(
		private userService: UserService,
		private alertService: AlertService,
		private httpService: HttpService,
		private http: HttpClient,
		private fileTransfer: FileTransfer
	) {}

	getStores() {
		const url = `${this.baseUrl}/store`;

		return this.http.get(url, this.httpService.getHttpOptions());
	}

	searchStoresByName(term: string) {
		const url = `${this.baseUrl}/store/search/${term}`;

		return this.http.get(url, this.httpService.getHttpOptions()).pipe(
			map((res: any) => {
				res.object = res.object.filter(store => store.activeFg === 'S');
				return res;
			})
		);
	}

	getStoreById(id: string) {
		const url = `${this.baseUrl}/store/${id}`;

		return this.http.get(url, this.httpService.getHttpOptions()).pipe(
			map((res: any) => {
				if (this.userService.user.store) {
					this.updateStorage(res.object);
				}
				return res;
			})
		);
	}

	updateStore(store: any) {
		const url = `${this.baseUrl}/store`;

		return this.http.put(url, store, this.httpService.getHttpOptions()).pipe(
			map((res: any) => {
				this.updateStorage(res.object);
				this.alertService.presentToast(`Datos actualizados`, 'success');
				return true;
			}),
			catchError(err => {
				console.log(err);
				// const message = `${err.error.message}
				// <br />
				// <br />
				// ${err.error.detailMessage || ''}`;

				// this.alertService.presentAlert('Error', store.publicName, message);
				this.alertService.presentAlertError(err.error);
				return throwError(err);
			})
		);
	}

	newStore(store: any) {
		const url = `${this.baseUrl}/register/store/new-store`;

		return this.http.post(url, store).pipe(
			map(res => {
				this.alertService.presentToast('Registro exitoso', 'success');
				return true;
			}),
			catchError(err => {
				console.log(err);
				// this.alertService.presentAlert('Error', store.publicName, err.error.message);
				this.alertService.presentAlertError(err.error);
				return throwError(err);
			})
		);
	}

	async changeStoreAvatar(store: any, avatarPath: string) {
		const url = `${this.baseUrl}/store/avatar`;

		const options: FileUploadOptions = {
			fileKey: 'file',
			headers: {
				Authorization: `${this.userService.token}`,
			},
			params: {
				storeId: store.storeId,
			},
		};

		const fileTransfer: FileTransferObject = this.fileTransfer.create();

		return await fileTransfer.upload(avatarPath, url, options);
	}

	async changeStoreImage(store: any, imagePath: string) {
		const url = `${this.baseUrl}/store/image`;

		const options: FileUploadOptions = {
			fileKey: 'file',
			headers: {
				Authorization: `${this.userService.token}`,
			},
			params: {
				storeId: store.storeId,
			},
		};

		const fileTransfer: FileTransferObject = this.fileTransfer.create();

		return await fileTransfer.upload(imagePath, url, options);
	}

	isActive(storeId: string) {
		const url = `${this.baseUrl}/store/${storeId}`;

		return this.http.get(url, this.httpService.getHttpOptions()).pipe(
			map((res: any) => {
				return res.object.activeFg === 'S';
			})
		);
	}

	private updateStorage(store: any) {
		this.userService.user.store = store;
		this.userService.saveStorage(this.userService.user, this.userService.token);
	}

	getStoresByCategory(categoryId) {
		const url = `${this.baseUrl}/store/category/${categoryId}`;

		return this.http.get(url, this.httpService.getHttpOptions()).pipe(
			map((res: any) => {
				res.object = res.object.filter(store => store.activeFg === 'S');
				return res;
			})
		);
	}
}
