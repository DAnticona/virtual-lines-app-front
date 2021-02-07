import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StoresService } from '../../services/store/stores.service';
import { LinesService } from '../../services/lines/lines.service';
import { SlotService } from '../../services/slot/slot.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.page.html',
  styleUrls: ['./store-detail.page.scss'],
})
export class StoreDetailPage implements OnDestroy {
  store: any = {};
  slot: any = {};
  lines: any[] = [];
  linesNumber: number;
  map = null;
  markers = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public storeService: StoresService,
    public lineService: LinesService,
    public slotService: SlotService,
    public userService: UserService,
    public alertController: AlertController
  ) {
    this.activatedRoute.params.subscribe(params => {
      const storeId = params.id;
      localStorage.setItem('storeId', storeId);
      this.storeService.getStoreById(storeId).subscribe((res: any) => {
        this.store = res.object;
      });
    });
  }

  ngOnDestroy() {
    localStorage.removeItem('storeId');
  }
}
