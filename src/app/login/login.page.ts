import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any = {};
  loading = false;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.loading = true;
    this.userService.login(this.user).subscribe(
      (res: any) => {
        this.loading = false;
        this.router.navigate(['/home']);
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }
}
