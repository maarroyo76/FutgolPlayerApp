import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';

  private user= 'user';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  validateUser(username: string, password: string) {
    return this.http.get<User[]>('http://localhost:3000/users?username=' + username + '&password=' + password).pipe(
      tap(users => {
        if (users.length > 0) {
          localStorage.setItem(this.user, JSON.stringify(users[0]));
        }
      })
    );
  }

  isAuth(): boolean {
    const user = localStorage.getItem(this.user);
    return user !== null;
  }

  logOut() {
    localStorage.removeItem(this.user);
  }
}
