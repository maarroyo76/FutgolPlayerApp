import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from 'src/app/models/match'; 
import { Team } from 'src/app/models/user';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {
  match: Match | null = null;
  teams: Team[] = [];

  user: any = {};

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.match = navigation.extras.state['match'];
      this.teams = navigation.extras.state['teams'];
    }
  }

  getTeamNameById(teamId: number): string {
    const team = this.teams.find(t => t.id === teamId);
    return team ? team.name : 'Desconocido';
  }

  isMeetingActive = false;

  openJitsi() {
    if (!this.match) {
      console.error('El partido no está definido.');
      return;
    }

    this.isMeetingActive = true;

    const teamAName = this.getTeamNameById(this.match.teams.teamA);
    const teamBName = this.getTeamNameById(this.match.teams.teamB);

    const domain = 'meet.jit.si';
    const options = {
      roomName: `Partido ${teamAName} vs ${teamBName}`,
      parentNode: document.querySelector('#meet'),
      userInfo: {
        displayName: 'Usuario',
      },
    };

    try {
      const api = new (window as any).JitsiMeetExternalAPI(domain, options);
      api.addEventListener('videoConferenceJoined', () => {
        console.log('Conferencia iniciada.');
      });
      api.addEventListener('videoConferenceLeft', () => {
        console.log('Conferencia finalizada.');
        this.isMeetingActive = false; // Desactiva el contenedor al salir.
      });
    } catch (error) {
      console.error('Error al inicializar Jitsi:', error);
      this.isMeetingActive = false;
    }
  }


  goBack() {
    this.router.navigate(['/home']);
  }
}
