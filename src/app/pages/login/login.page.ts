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

  ngOnInit() { }
  
  async login() {
    if (!this.username || !this.password) {
      this.showToast('Por favor, complete ambos campos.', 'warning');
      return;
    }

    this.userService.validateUser(this.username, this.password).subscribe(
      (users) => {
        if (users.length > 0) {
          this.showToast('Bienvenido, ' + this.username + '!', 'success'); 
          this.clear();
          this.router.navigate(['/home']);
        } else {
          this.showToast('Credenciales inválidas!', 'danger');
        }
      },
      (error) => {
        this.showToast('Error en el servidor, intenta más tarde.', 'danger');
      }
    );
  }


  register() {
    this.router.navigate(['/register']);
  }

  clear() {
    this.username = '';
    this.password = '';
  }

  showToast(message: string, color: string) {
    this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    }).then((toast) => {
      toast.present();
    });
  }
}
