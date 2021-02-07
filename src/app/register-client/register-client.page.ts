import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgControlStatus, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { ValidatorsService } from '../services/validators/validators.service';

@Component({
	selector: 'app-register-client',
	templateUrl: './register-client.page.html',
	styleUrls: ['./register-client.page.scss'],
})
export class RegisterClientPage implements OnInit {
	form: FormGroup;
	loading = false;
	user: any = {};

	constructor(
		public validators: ValidatorsService,
		public userService: UserService,
		public router: Router,
		private fb: FormBuilder
	) {
		this.initUser();
		this.createForm();
	}

	initUser() {
		this.user.storeFg = 'N';
		this.user.roleId = 3;
		this.user.activeFg = 'N';
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

	createForm() {
		this.form = this.fb.group(
			{
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

	ngOnInit() {}

	save() {
		if (!this.form.valid) {
			return Object.values(this.form.controls).forEach(control => {
				control.markAsTouched();
			});
		}
		this.loading = true;

		this.user.name = this.name.value;
		this.user.email = this.email.value;
		this.user.password = this.password1.value;

		this.userService.newUser(this.user).subscribe(
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
}
