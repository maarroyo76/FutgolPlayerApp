import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  createUser(user: User) {
    return this.http.post('http://localhost:3000/users', user);
  }

  validateUser(username: string, password: string) {
    return this.http.get<User[]>('http://localhost:3000/users?username=' + username + '&password=' + password);
  }
}
