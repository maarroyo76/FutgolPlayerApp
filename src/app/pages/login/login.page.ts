import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username!: string;
  password!: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  async login() {
    this.userService.validateUser(this.username, this.password).subscribe(async (response) => {
      if (response.length > 0) {
        const navigationExtras = {
          state: {
            user: response[0]
          }
        };
        this.createToast('Bienvenido ' + response[0].name, 'success');
        this.router.navigate(['/home'], navigationExtras);
      } else {
        this.createToast('Usuario o contraseña incorrectos', 'danger');
      }
    });
  }

  register() {
    this.router.navigate(['/register']); // Redirige a la página de registro
  }

  createToast(message: string, color: string) {
    this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    }).then((toast) => {
      toast.present();
    });
  }
}
