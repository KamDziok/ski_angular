import { Injectable } from '@angular/core';
import { SetUpHttpService } from './../set-up-http.service';
import {User} from '../interface/user';
import {Permissions} from '../static/permissions';
import {OfferSki} from '../interface/offer-ski';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'api/user';
  offerSkiList: OfferSki[] = [];
  offerSkiListSize = 0;
  currentUser: User = null;
  admin = false;
  support = false;
  company = false;
  user = false;
  constructor(private httpClient: SetUpHttpService) { }

  logIn(user){
    if (user != null){
      this.currentUser = user;
      switch (user.permissions) {
        case Permissions.admin:
          this.admin = true;
          break;
        case Permissions.support:
          this.support = true;
          break;
        case Permissions.company:
          this.company = true;
          break;
        case Permissions.user:
          this.user = true;
          break;
      }
    }
  }

  logOut(){
    this.currentUser = null;
    this.admin = false;
    this.support = false;
    this.company = false;
    this.user = false;
  }

  addOfferSki(offerSki: OfferSki){
    this.offerSkiList.push(offerSki);
    this.offerSkiListSize++;
  }

  getAll() {
    return this.httpClient.get(this.url);
  }

  getAllWithOutCurrentUser(){
    return this.httpClient.get(this.url + '/user/' + this.currentUser.id);
  }

  getLogin(user){
    return this.httpClient.get(this.url + '/email/' + user.eMail + '/password/' + user.password);
  }

  isUserByEMail(eMail){
    return this.httpClient.get(this.url + '/email/' + eMail);
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
