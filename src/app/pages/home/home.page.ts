import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: any = {
  id: '',
  name: '',
  lastname: '',
  username: '',
  password: '',
  email: ''
  };

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

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }
}
