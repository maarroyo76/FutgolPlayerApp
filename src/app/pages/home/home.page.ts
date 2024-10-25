import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastController, LoadingController, IonTabs } from '@ionic/angular';
import { TeamService } from 'src/app/services/team.service';
import { MatchService } from 'src/app/services/match.service';
import { Team } from 'src/app/models/user';

interface Match {
  id: number;
  date: string;
  location: string;
  teams: { teamA: number; teamB: number };
  score: { teamA: number; teamB: number };
  status: 'Scheduled' | 'Ongoing' | 'Finished';
  createdBy: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('myTabs', { static: false }) tabs!: IonTabs;
  user: any = {};
  match: Match = {
    id: 0,
    date: '',
    location: '',
    teams: { teamA: 0, teamB: 0 },
    score: { teamA: 0, teamB: 0 },
    status: 'Scheduled',
    createdBy: ''
  };

  userTeam: Team | null = null;
  matches: Match[] = [];
  teams: Team[] = [];
  loadingMatches = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastController: ToastController,
    private teamService: TeamService,
    private matchService: MatchService,
    private loadingController: LoadingController
  ) {
    if (this.userService.isAuth()) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.getMatches();
    this.getTeams();
  }

  matchStatusTranslations = {
    'Scheduled': 'Programado',
    'Ongoing': 'En Progreso',
    'Finished': 'Finalizado'
  };

  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      message,
      duration: 2000, // Duración del loading
      spinner: 'crescent',
    });
    await loading.present();
  }

  async getMatches() {
    this.loadingMatches = true; // Iniciar carga
    await this.presentLoading('Cargando partidos...'); // Mostrar loader

    this.matchService.getMatches().subscribe(
      (matches) => {
        this.matches = matches;
        this.loadingMatches = false; // Finalizar carga
        this.loadingController.dismiss(); // Ocultar loader
      },
      (error) => {
        console.error('Error al obtener partidos:', error);
        this.loadingMatches = false; // Finalizar carga en caso de error
        this.loadingController.dismiss(); // Ocultar loader
      }
    );
  }

  getTeamNameById(teamId: number): string {
    const team = this.teams.find(t => t.id === teamId);
    return team ? team.name : 'Desconocido';
  }

  async getTeams() {
    await this.presentLoading('Cargando equipos...'); // Mostrar loader

    this.teamService.getTeams().subscribe(
      (teams) => {
        this.teams = teams;
        this.setUserTeam();
        this.loadingController.dismiss(); // Ocultar loader
      },
      (error) => {
        console.error('Error al obtener equipos:', error);
        this.showToast('No se pudieron cargar los equipos', 'danger');
        this.loadingController.dismiss(); // Ocultar loader
      }
    );
  }

  setUserTeam() {
    this.userTeam = this.teams.find((team) => team.players.includes(this.user.id)) || null;
  }

  createMatch() {
    if (!this.match.date || !this.match.teams.teamA || !this.match.teams.teamB) {
      this.showToast('Por favor completa todos los campos requeridos.', 'danger');
      return;
    }

    if (this.match.teams.teamA === this.match.teams.teamB) {
      this.showToast('Los equipos deben ser diferentes.', 'danger');
      return;
    }
    
    this.match.createdBy = this.user.username; // Cambiar a nombre de usuario
    this.presentLoading('Creando partido...'); // Mostrar el loader

    this.matchService.createMatch(this.match).subscribe({
      next: (newMatch) => {
        this.matches.push(newMatch);
        this.tabs.select('search-matches'); // Cambiar a la pestaña de partidos
        this.showToast('Partido creado exitosamente!', 'success');
        this.resetMatch(); // Reiniciar el objeto match
        this.loadingController.dismiss(); // Ocultar el loader
      },
      error: (error) => {
        const errorMessage = error.error?.message || 'Error al crear el partido';
        this.showToast(errorMessage, 'danger');
        this.loadingController.dismiss();
      }
    });
  }

  resetMatch() {
    this.match = {
      id: 0,
      date: '',
      location: '',
      teams: { teamA: 0, teamB: 0 },
      score: { teamA: 0, teamB: 0 },
      status: 'Scheduled',
      createdBy: ''
    };
  }

  logOut() {
    this.userService.logOut();
    this.showToast('Sesión cerrada con éxito!', 'success');
    this.router.navigate(['/login']);
  }

  showToast(message: string, color: string) {
    this.toastController.create({
      message,
      color,
      duration: 2000,
      position: 'bottom'
    }).then(toast => toast.present());
  }
}
