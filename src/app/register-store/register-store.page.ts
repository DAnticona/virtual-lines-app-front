import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from '../services/validators/validators.service';
import { CategoryService } from '../services/category/category.service';
import { StoresService } from '../services/store/stores.service';

declare var google: any;
@Component({
	selector: 'app-register-store',
	templateUrl: './register-store.page.html',
	styleUrls: ['./register-store.page.scss'],
})
export class RegisterStorePage implements OnInit {
	form: FormGroup;
	loading = false;
	store: any = {};
	categories: any[] = [];
	subcategories: any[] = [];
	latitude: number;
	longitude: number;

	map = null;
	markers = [];

	constructor(
		public storeService: StoresService,
		public categoryService: CategoryService,
		public validators: ValidatorsService,
		public router: Router,
		private fb: FormBuilder
	) {
		this.latitude = -12.045993928475266;
		this.longitude = -77.03055381774902;

		this.initStore();
		this.createForm();

		this.categoryService.getCategories().subscribe((res: any) => {
			this.categories = res.object;
		});
	}

	initStore() {
		this.store.storeFg = 'S';
		this.store.activeFg = 'N';
	}

	ngOnInit() {
		this.loadMap();
	}

	createForm() {
		this.form = this.fb.group(
			{
				publicName: ['', Validators.required],
				website: [''],
				phone: [''],
				description: ['', Validators.required],
				categoryId: ['', Validators.required],
				name: ['', Validators.required],
				email: ['', [Validators.required, Validators.email]],
				password1: ['', Validators.required],
				password2: ['', Validators.required],
			},
			{
				validators: this.validators.passwordValid('password1', 'password2'),
			}
		);
	}

	save() {
		if (!this.form.valid) {
			return Object.values(this.form.controls).forEach(control => {
				control.markAsTouched();
			});
		}
		this.loading = true;

		this.store.publicName = this.publicName.value;
		this.store.description = this.description.value;
		this.store.categoryId = this.categoryId.value;
		this.store.phone = this.phone.value;
		this.store.website = this.website.value;
		this.store.name = this.name.value;
		this.store.email = this.email.value;
		this.store.password = this.password1.value;

		this.store.latitude = this.latitude;
		this.store.longitude = this.longitude;

		this.storeService.newStore(this.store).subscribe(
			() => {
				this.loading = false;
				this.router.navigate(['login']);
			},
			() => {
				this.loading = false;
			}
		);
	}

	loadMap() {
		const mapElement: HTMLElement = document.getElementById('map');

		const initialLocation = { lat: this.latitude, lng: this.longitude };

		this.map = new google.maps.Map(mapElement, {
			center: initialLocation,
			zoom: 12,
		});

		this.addMarker(initialLocation);

		google.maps.event.addListener(this.map, 'click', (event: any) => {
			// console.log(event.latLng.toJSON().lat, event.latLng.toJSON().lng);
			this.latitude = event.latLng.toJSON().lat;
			this.longitude = event.latLng.toJSON().lng;

			this.addMarker(event.latLng);
		});
	}

	addMarker(location) {
		const marker = new google.maps.Marker({
			position: location,
			map: this.map,
		});
		this.cleanMarkers();
		this.markers.push(marker);
	}

	cleanMarkers() {
		for (const marker of this.markers) {
			marker.setMap(null);
		}
		this.markers = [];
	}

	// Getters
	get publicName() {
		return this.form.get('publicName');
	}
	get description() {
		return this.form.get('description');
	}
	get phone() {
		return this.form.get('phone');
	}
	get website() {
		return this.form.get('website');
	}
	get categoryId() {
		return this.form.get('categoryId');
	}
	get name() {
		return this.form.get('name');
	}
	get email() {
		return this.form.get('email');
	}
	get password1() {
		return this.form.get('password1');
	}
	get password2() {
		return this.form.get('password2');
	}
}
