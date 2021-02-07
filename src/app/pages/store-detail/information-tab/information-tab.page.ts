import { Component } from '@angular/core';
import { StoresService } from '../../../services/store/stores.service';
import { UserService } from '../../../services/user/user.service';
import { AlertController } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-information-tab',
  templateUrl: './information-tab.page.html',
  styleUrls: ['./information-tab.page.scss'],
})
export class InformationTabPage {
  store: any = {};
  slot: any = {};
  lines: any[] = [];
  linesNumber: number;
  map = null;
  markers = [];

  constructor(
    public storeService: StoresService,
    public userService: UserService,
    public alertController: AlertController
  ) {
    const storeId = localStorage.getItem('storeId') || null;
    this.getStore(storeId);
  }

  loadMap() {
    const mapElement: HTMLElement = document.getElementById('map');

    const initialLocation = { lat: this.store.latitude, lng: this.store.longitude };

    this.map = new google.maps.Map(mapElement, {
      center: initialLocation,
      zoom: 12,
    });

    this.addMarker(initialLocation);
  }

  addMarker(location) {
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
    });
    this.markers.push(marker);
  }

  getStore(storeId: string, event?: any) {
    this.storeService.getStoreById(storeId).subscribe((res: any) => {
      this.store = res.object;
      this.loadMap();

      if (event) {
        event.target.complete();
      }
    });
  }
}
