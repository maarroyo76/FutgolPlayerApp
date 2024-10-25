import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = 'http://localhost:3000/teams';

  constructor(
    private http: HttpClient
  ) { }

  getTeams() {
    return this.http.get<Team[]>(this.apiUrl);
  }

  getTeamById(id: string) {
    return this.http.get<Team>(this.apiUrl + '/' + id);
  }

  createTeam(team: Team) {
    return this.http.post<Team>(this.apiUrl, team);
  }

  updateTeam(id: string, team: Team) {
    return this.http.put<Team>(this.apiUrl + '/' + id, team);
  }

  deleteTeam(id: string) {
    return this.http.delete<Team>(this.apiUrl + '/' + id);
  }

  findTeam(name: string, city: string, coach: string) {
    return this.http.get<Team[]>('http://localhost:3000/teams?name=' + name + '&city=' + city + '&coach=' + coach);
  }
}
