import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../../services/store/stores.service';
import { UserService } from '../../../services/user/user.service';

declare var google: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  store: any = {};
  loading = false;
  latitude: number;
  longitude: number;
  map = null;
  markers = [];

  constructor(public userService: UserService, public storeService: StoresService) {
    this.store = this.userService.user.store;
    this.latitude = this.store.latitude;
    this.longitude = this.store.longitude;
  }

  ngOnInit() {
    this.loadMap();
  }

  getStore(storeId: string, event?: any) {
    this.storeService.getStoreById(storeId).subscribe((res: any) => {
      this.store = res.object;
      this.latitude = this.store.latitude;
      this.longitude = this.store.longitude;

      this.loadMap();

      if (event) {
        event.target.complete();
      }
    });
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

  save() {
    this.loading = true;
    this.store.latitude = this.latitude;
    this.store.longitude = this.longitude;
    this.storeService.updateStore(this.store).subscribe(
      () => {
        this.userService.user.store = this.store;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }
}
