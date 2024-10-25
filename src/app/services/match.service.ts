import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private apiUrl = 'http://localhost:3000/matches';

  constructor(
    private http: HttpClient
  ) { }

  getMatches() {
    return this.http.get<Match[]>(this.apiUrl);
  }

  getMatchById(id: string) {
    return this.http.get<Match>(this.apiUrl + '/' + id);
  }

  createMatch(match: Match) {
    return this.http.post<Match>(this.apiUrl, match);
  }

  updateMatch(id: string, match: Match) {
    return this.http.put<Match>(this.apiUrl + '/' + id, match);
  }

  deleteMatch(id: string) {
    return this.http.delete<Match>(this.apiUrl + '/' + id);
  }

  findMatch(date: string, local: string, visitor: string) {
    return this.http.get<Match[]>('http://localhost:3000/matches?date=' + date + '&local=' + local + '&visitor=' + visitor);
  }

}
