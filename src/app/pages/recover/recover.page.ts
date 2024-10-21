import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastController, ModalController } from '@ionic/angular';
import { RecoverModalComponent } from './recover-modal.component';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  user = {
    id: '',
    username: '',
    name: '',
    lastname: '',
  };

  userId: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  isFormValid(): boolean {
    return this.user.username.trim() !== '' &&
      this.user.name.trim() !== '' &&
      this.user.lastname.trim() !== '';
  }

  findUser() {
    if (this.isFormValid()) {
      this.userService.findUser(this.user.username, this.user.name, this.user.lastname).subscribe((users) => {
        if (users.length > 0) {
          this.user.id = users[0].id.toString(); 
          this.openModal();
        } else {
          this.showToast('Usuario no encontrado', 'danger');
        }
      });
    } else {
      this.showToast('Todos los campos son requeridos', 'warning');
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: RecoverModalComponent,
      componentProps: {
        userId: this.user.id
      }
    });
    await modal.present();

    const { data, role } = await modal.onDidDismiss();

    if (role === 'confirm') {
      this.showToast('Contraseña actualizada', 'success');
      this.clearForm();
      this.router.navigate(['/login']);
    }else {
      this.showToast('Operación cancelada', 'danger');
    }
  }

  clearForm() {
    this.user.username = '';
    this.user.name = '';
    this.user.lastname = '';
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}
