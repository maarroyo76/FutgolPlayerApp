import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { ToastController } from '@ionic/angular'; // Importa ToastController

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: { 
    id: string, 
    name: string, 
    lastname: string, 
    username: string, 
    password: string, 
    email: string 
  } = {
    id: '',
    name: '',
    lastname: '',
    username: '',
    password: '',
    email: ''
  };

  constructor(private router: Router, private toastController: ToastController) { } // Inyecta el ToastController

  ngOnInit() { }

  get isFormValid(): boolean {
    return this.user.name !== '' && 
           this.user.lastname !== '' && 
           this.user.username !== '' && 
           this.user.password !== '' && 
           this.user.email !== '';
  }

  async register() { 
    if (this.isFormValid) {
      console.log('Usuario registrado con éxito:', this.user);
      localStorage.setItem('user', JSON.stringify(this.user));
      await this.showToast('Usuario registrado con éxito', 'success'); 

      this.router.navigate(['/home']);
    } else {
      await this.showToast('Por favor, completa todos los campos', 'danger'); 
    }
  }

  async showToast(message: string, color: string) { 
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom' 
    });
    toast.present();
  }
}
