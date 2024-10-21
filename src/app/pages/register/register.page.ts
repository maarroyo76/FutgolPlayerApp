import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; 
import { UserService } from '../../services/user.service';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    id: 0,
    name: '',
    lastname: '',
    username: '',
    password: '',
    email: ''
  };
  lastUserId!: number;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  isFormValid(): boolean {
    return this.user.name !== '' && 
           this.user.lastname !== '' && 
           this.user.username !== '' && 
           this.user.password !== '' && 
           this.user.email !== '';
  }

  private assignUserId(): Observable<number> {
    return this.userService.getUsers().pipe(
      map(users => {
        return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      })
    );
  }

  register() {
    if (!this.isFormValid()) {
      this.showToast('Todos los campos son requeridos', 'danger');
      return;
    }

    this.assignUserId().pipe(
      switchMap(newId => {
        this.user.id = newId;
        return this.userService.createUser(this.user);
      })
    ).subscribe({
      next: () => {
        this.showToast('Registro exitoso!', 'success');
        this.clearForm();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.showToast('Nombre de usuario ya en uso', 'warning');
      }
    });
  }

  clearForm() {
    this.user = {
      id: 0,
      name: '',
      lastname: '',
      username: '',
      password: '',
      email: ''
    };
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
