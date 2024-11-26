import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Team } from 'src/app/models/user';



@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
  team: Team | null = null;
  users: User[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.team = navigation.extras.state['team'];
      this.users = navigation.extras.state['users'];
    }
  }

  getUserNameById(userId: number): string
  {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Desconocido';
  }

  goBack() {
    this.router.navigate(['/home']);
  }



}
