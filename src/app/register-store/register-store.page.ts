import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from '../services/validators/validators.service';
import { UserService } from '../services/user/user.service';
import { CategoryService } from '../services/category/category.service';
import { SubcategoryService } from '../services/category/subcategory.service';
import { StoresService } from '../services/store/stores.service';

// declare var google: any;

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

  // map: any;
  // @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(
    public storeService: StoresService,
    public categoryService: CategoryService,
    public subcategoryService: SubcategoryService,
    public validators: ValidatorsService,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.initStore();
    this.createForm();
  }

  initStore() {
    this.store.storeFg = 'S';
    this.store.activeFg = 'S';
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res.object;
      console.log(this.categories);
    });
  }

  selectCategory(categoryId: string) {
    this.subcategoryService.getSubcategoriesByCategoryId(categoryId).subscribe((res: any) => {
      this.subcategories = res.object;
    });
  }

  createForm() {
    this.form = this.fb.group(
      {
        publicName: ['', Validators.required],
        website: [''],
        phone: [''],
        description: ['', Validators.required],
        categoryId: ['', Validators.required],
        subcategoryId: ['', Validators.required],
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
    this.store.subcategoryId = this.subcategoryId.value;
    this.store.phone = this.phone.value;
    this.store.website = this.website.value;
    this.store.name = this.name.value;
    this.store.email = this.email.value;
    this.store.password = this.password1.value;

    this.store.latitude = -136.123;
    this.store.longitude = -12.123;

    this.storeService.newStore(this.store).subscribe(
      () => {
        this.loading = false;
        this.form.reset();
        this.router.navigate(['login']);
      },
      () => {
        this.loading = false;
      }
    );
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
  get subcategoryId() {
    return this.form.get('subcategoryId');
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

  // ionViewDidEnter() {
  //   this.showmap();
  // }

  // showmap() {
  //   const location = new google.mapsLatLng(-17.824858, 31.053028);
  //   const options = {
  //     center: location,
  //     zoom: 15,
  //     disableDefaultUI: true,
  //   };
  //   this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  // }
}
