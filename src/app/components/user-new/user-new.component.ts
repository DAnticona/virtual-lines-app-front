import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators/validators.service';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role/role.service';
import { UserService } from '../../services/user/user.service';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss'],
})
export class UserNewComponent implements OnInit {
  user: any;
  form: FormGroup;
  loading = false;

  roles: Observable<any>;
  store: any = {};

  constructor(
    public userService: UserService,
    public roleService: RoleService,
    public validators: ValidatorsService,
    public router: Router,
    private fb: FormBuilder,
    public modalController: ModalController
  ) {
    this.store = this.userService.user.store;
    this.createForm();
    this.roles = this.roleService.getRolesStore();
  }

  ngOnInit() {
    this.initUser();
  }

  initUser() {
    this.user = {};
    this.user.storeFg = 'S';
    this.user.activeFg = 'S';
  }

  createForm() {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        roleId: ['', Validators.required],
        activeFg: [true, Validators.required],
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

    this.user.storeId = this.store.storeId;
    this.user.name = this.name.value;
    this.user.email = this.email.value;
    this.user.roleId = this.roleId.value;
    this.user.activeFg = this.activeFg.value ? 'S' : 'N';
    this.user.password = this.password1.value;

    this.userService.newStoreUser(this.user).subscribe(
      () => {
        this.loading = false;
        this.form.reset();
        this.dismiss();
      },
      () => {
        this.loading = false;
      }
    );
  }

  dismiss() {
    this.form.reset();
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  // Getters
  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get roleId() {
    return this.form.get('roleId');
  }
  get activeFg() {
    return this.form.get('activeFg');
  }
  get password1() {
    return this.form.get('password1');
  }
  get password2() {
    return this.form.get('password2');
  }
}
