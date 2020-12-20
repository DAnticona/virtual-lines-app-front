import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoresService } from '../../../services/store/stores.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage {
  form: FormGroup;
  loading = false;
  store: any = {};

  constructor(private fb: FormBuilder, public storeService: StoresService, public userService: UserService) {
    this.store = this.userService.user.store;
    this.createForm();
  }

  getStore(storeId: string, event?: any) {
    this.storeService.getStoreById(storeId).subscribe((res: any) => {
      this.store = res.object;
      this.publicName.setValue(this.store.publicName);
      this.website.setValue(this.store.website);
      this.phone.setValue(this.store.phone);
      this.description.setValue(this.store.description);
      if (event) {
        event.target.complete();
      }
    });
  }

  createForm() {
    this.form = this.fb.group({
      publicName: [this.store.publicName, Validators.required],
      website: [this.store.website],
      phone: [this.store.phone],
      description: [this.store.description, Validators.required],
    });
  }

  save() {
    this.loading = true;
    this.store.publicName = this.publicName.value;
    this.store.website = this.website.value;
    this.store.phone = this.phone.value;
    this.store.description = this.description.value;

    this.storeService.updateStore(this.store).subscribe(
      () => {
        this.userService.user.store = this.store;
        this.userService.saveStorage(this.userService.user, this.userService.token);
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  get publicName() {
    return this.form.controls.publicName;
  }

  get website() {
    return this.form.controls.website;
  }

  get phone() {
    return this.form.controls.phone;
  }

  get description() {
    return this.form.controls.description;
  }
}
