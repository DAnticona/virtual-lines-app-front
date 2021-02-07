import { Component, ViewChild } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';
import { IonList, IonSearchbar } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StoresService } from '../../services/store/stores.service';
import { LinesService } from '../../services/lines/lines.service';
import { CategoryService } from '../../services/category/category.service';
import { UserService } from '../../services/user/user.service';

@Component({
	selector: 'app-stores',
	templateUrl: './stores.page.html',
	styleUrls: ['./stores.page.scss'],
})
export class StoresPage {
	skeletons: any[] = newArray(30);
	stores: any[];
	categories: any[] = [];

	totalFounded: number;

	location: any = {};

	searching = false;

	@ViewChild('lista') lista: IonList;
	@ViewChild(IonSearchbar) searchBar: IonSearchbar;

	constructor(
		public storeService: StoresService,
		public lineService: LinesService,
		public categoryService: CategoryService,
		public userService: UserService,
		private geolocation: Geolocation
	) {
		this.getCategories();
		this.getGeoLocation();
	}

	getCategories() {
		this.categoryService.getCategories().subscribe((res: any) => {
			this.categories = [];
			const categories = res.object;
			categories.sort((a, b) => (a.name < b.name ? -1 : 1));

			categories.forEach(category => {
				this.storeService.getStoresByCategory(category.categoryId).subscribe((res1: any) => {
					if (res1.object.length > 0) {
						this.categories.push(category);
					}
				});
			});
		});
	}

	getGeoLocation(event?: any) {
		this.geolocation
			.getCurrentPosition()
			.then(resp => {
				this.location.latitude = resp.coords.latitude;
				this.location.longitude = resp.coords.longitude;

				this.getStores(event);
			})
			.catch(error => {
				console.log('Error getting location', error);
			});
	}

	getStores(event?: any) {
		this.storeService.getStores().subscribe((res: any) => {
			this.stores = res.object.filter(store => store.activeFg === 'S');

			this.stores.sort((a, b) => (a.publicName < b.publicName ? -1 : 1));

			this.stores.forEach(store => {
				store.distance = this.getDistance(
					this.location.latitude,
					this.location.longitude,
					store.latitude,
					store.longitude
				);

				this.searching = false;
				this.searchBar.disabled = false;

				if (event) {
					event.target.complete();
				}
			});
		});
	}

	onSearch() {
		this.stores = [];
		if (this.searchBar.value) {
			this.searching = true;

			this.geolocation.getCurrentPosition().then(resp => {
				this.storeService.searchStoresByName(this.searchBar.value).subscribe((res: any) => {
					this.stores = res.object;
					this.totalFounded = res.count;
					this.stores.forEach(store => {
						store.distance = this.getDistance(
							this.location.latitude,
							this.location.longitude,
							store.latitude,
							store.longitude
						);
					});
					this.searching = false;
				});
			});
		} else {
			this.totalFounded = undefined;
			this.getGeoLocation();
		}
	}

	onRefresh(event: any) {
		this.stores = [];
		this.searchBar.value = null;
		this.totalFounded = undefined;
		this.getCategories();
		this.getGeoLocation(event);
	}

	private getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
		const RADIO = 6378.137;

		const dLat = this.getRadians(lat2 - lat1);
		const dLong = this.getRadians(lon2 - lon1);

		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(this.getRadians(lat1)) *
				Math.cos(this.getRadians(lat2)) *
				Math.sin(dLong / 2) *
				Math.sin(dLong / 2);

		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const d = RADIO * c;

		return d.toFixed(3);
	}

	private getRadians(x: number) {
		return (x * Math.PI) / 180;
	}

	segmentChanged(event) {
		this.stores = [];
		this.searchBar.value = null;
		this.totalFounded = undefined;
		if (event.detail.value === 'all') {
			this.getGeoLocation();
		} else {
			this.geolocation.getCurrentPosition().then(resp => {
				this.storeService.getStoresByCategory(event.detail.value).subscribe(res => {
					this.stores = res.object;
					this.stores.forEach(store => {
						store.distance = this.getDistance(
							this.location.latitude,
							this.location.longitude,
							store.latitude,
							store.longitude
						);
					});
				});
			});
		}
	}
}
