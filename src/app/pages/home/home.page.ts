import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { last } from 'rxjs';

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

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation()?.extras?.state;
    if (navigation && navigation['user']) {
      this.user = navigation['user']; // Aquí asignas el usuario que recibiste
    }
  }



  ngOnInit() {
  }

  


}
