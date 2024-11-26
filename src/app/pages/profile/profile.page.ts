import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any = {};

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    if (this.userService.isAuth()) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

}
