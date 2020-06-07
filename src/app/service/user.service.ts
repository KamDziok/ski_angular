import { Injectable } from '@angular/core';
import { SetUpHttpService } from './../set-up-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'api/user';
  constructor(private httpClient: SetUpHttpService) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  delete(user) {
    return this.httpClient.delete(this.url, user);
  }

  updateUser(user) {
    return this.httpClient.put(this.url, user);
  }

  addUser(user) {
    return this.httpClient.post(this.url, user);
  }
}
