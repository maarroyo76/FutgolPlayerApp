import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: any = {
    id: '',
    name: '',
    lastname: '',
    username: '',
    password: '',
    email: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
