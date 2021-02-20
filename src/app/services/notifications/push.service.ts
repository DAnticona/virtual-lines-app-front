import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class PushService {
	subscriptorId: string;
	appId = environment.appId;
	project = environment.googleProjectNumber;
	constructor(private oneSignal: OneSignal) {}

	initConfig() {
		this.oneSignal.startInit(this.appId, this.project);

		this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

		this.oneSignal.handleNotificationReceived().subscribe(noti => {
			// do something when notification is received
			console.log('Notificacion recibida', noti);
		});

		this.oneSignal.handleNotificationOpened().subscribe(noti => {
			// do something when a notification is opened
			console.log('Notificacion abierta', noti);
		});

		// Obtener el id del suscriptor
		this.oneSignal.getIds().then(info => {
			this.subscriptorId = info.userId;
		});

		this.oneSignal.endInit();
	}
}
