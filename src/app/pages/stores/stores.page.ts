import { Component, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { StoresService } from '../../services/store/stores.service';
import { LinesService } from '../../services/lines/lines.service';
import { newArray } from '@angular/compiler/src/util';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage {
  skeletons: any[] = newArray(30);
  stores: any[];

  @ViewChild('lista') lista: IonList;
  constructor(public storeService: StoresService, public lineService: LinesService) {
    this.getStores();
  }

  getStores(event?: any) {
    this.storeService.getStores().subscribe((res: any) => {
      const stores = res.object;
      stores.forEach(store => {
        this.lineService.getLinesByStoreId(store.storeId).subscribe((res1: any) => {
          store.linesNumber = res1.count;
        });
      });
      stores.sort((a, b) => (a.publicName < b.publicName ? -1 : 1));
      this.stores = stores;
      if (event) {
        event.target.complete();
      }
    });
  }
}
