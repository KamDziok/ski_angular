import { SubscribeDataAdminService } from './subscribe-data-admin.service';
import { Transaction } from './../interface/transaction';
import { User } from './../interface/user';
import { Injectable } from '@angular/core';
import { SetUpHttpService } from './../set-up-http.service';
import {Permissions} from '../static/permissions';
import {OfferSki} from '../interface/offer-ski';
import {LocalStorageKey} from '../static/local-storage-key';
import { Statement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'api/user';
  offerSkiList: OfferSki[] = [];
  transactionList: Transaction[] = [];
  public offerSkiListSize = 0;
  transaction = {startTransaction: null, stopTransaction: null, offerSkiList: null};
  add: boolean = false;
  // currentUser: User = null;
  // admin = false;
  // support = false;
  // company = false;
  // user = false;
  constructor(private httpClient: SetUpHttpService//, private subscribeDataAdminService :SubscribeDataAdminService
    ) { }

  logIn(user){
    if (user != null){
      // this.currentUser = user;
      localStorage.setItem(LocalStorageKey.USER_CURRENT, JSON.stringify(user));
      switch (user.permissions) {
        case Permissions.ADMIN:{
          // this.admin = true;
          // this.subscribeDataAdminService.getAllData();
          this.setPermissions(true, false, false, false);
          break;
        }
        case Permissions.SUPPORT:
          // this.support = true;
          this.setPermissions(false, true, false, false);
          break;
        case Permissions.COMPANY:
          // this.company = true;
          this.setPermissions(false, false, true, false);
          break;
        case Permissions.USER:
          // this.user = true;
          this.setPermissions(false, false, false, true);
          break;
      }
    }
  }

  setPermissions (admin: boolean, support: boolean, company: boolean, user: boolean) {
    localStorage.setItem(LocalStorageKey.ADMIN, JSON.stringify(admin));
    localStorage.setItem(LocalStorageKey.SUPPORT, JSON.stringify(support));
    localStorage.setItem(LocalStorageKey.COMPANY, JSON.stringify(company));
    localStorage.setItem(LocalStorageKey.USER, JSON.stringify(user));
  }

  getPermissionAdmin(): boolean {
    return JSON.parse(localStorage.getItem(LocalStorageKey.ADMIN));
  }

  getPermissionSupport(): boolean {
    return JSON.parse(localStorage.getItem(LocalStorageKey.SUPPORT));
  }

  getPermissionCompany(): boolean {
    return JSON.parse(localStorage.getItem(LocalStorageKey.COMPANY));
  }

  getPermissionUser(): boolean {
    return JSON.parse(localStorage.getItem(LocalStorageKey.USER));
  }

  getCurrentUser (): User {
    // return (JSON.parse(localStorage.getItem(LocalStorageKey.USER)) as User);
    return JSON.parse(localStorage.getItem(LocalStorageKey.USER_CURRENT));
  }

  logOut(){
    // this.currentUser = null;
    // this.admin = false;
    // this.support = false;
    // this.company = false;
    // this.user = false;
    this.setPermissions(false, false, false, false);
    localStorage.clear();
  }

  // addOfferSki(offerSki: OfferSki, start: Date, stop: Date){
  //   // console.log(start)
  //   // console.log(stop)
  //   this.transaction.startTransaction = start;
  //   this.transaction.stopTransaction = stop;
  //   this.offerSkiList.push(offerSki);
  //   this.transaction.offerSkiList = this.offerSkiList;
  //   this.offerSkiListSize++;
  // }

  addTransaction(offerSki: OfferSki, start: Date, stop: Date){
    let transactionTMP = {offerSkiList: []} as Transaction;
    transactionTMP.startTransaction = start;
    transactionTMP.stopTransaction = stop;
    transactionTMP.offerSkiList.push(offerSki);
    return transactionTMP;
  }

  delTransaction(idTransaction){
    this.transactionList.splice(idTransaction, 1);
  }

  delOfferSkiFromTransaction(idTransaction, idOfferSki){
    this.transactionList[idTransaction].offerSkiList.splice(idOfferSki, 1);
  }

  addOfferSki(offerSki: OfferSki, start: Date, stop: Date){
    this.add = false;
    if(this.transactionList.length > 0){
      this.transactionList.forEach( (transaction) => {
        let tStrat = new Date(transaction.startTransaction);
        let aStart = new Date(start);
        let tStop = new Date(transaction.stopTransaction);
        let aStop = new Date(stop);
        if(tStrat.getTime() === aStart.getTime() && tStop.getTime() === aStop.getTime()){
          transaction.offerSkiList.push(offerSki);
          this.add = true;
        }
      } );
      if(!this.add){
        this.transactionList.push(this.addTransaction(offerSki, start, stop));
      }
    }else{
      this.transactionList.push(this.addTransaction(offerSki, start, stop));
    }
    // this.transaction.startTransaction = start;
    // this.transaction.stopTransaction = stop;
    // this.offerSkiList.push(offerSki);
    // this.transaction.offerSkiList = this.offerSkiList;
    // this.offerSkiListSize++;
  }

  getAll() {
    return this.httpClient.get(this.url);
  }

  getAllWithOutCurrentUser(){
    return this.httpClient.get(this.url + '/user/' + this.getCurrentUser().id);
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
