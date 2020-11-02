import { Transaction } from './../interface/transaction';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../interface/user';
import {OfferSki} from '../interface/offer-ski';
import {TransactionService} from '../service/transaction.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  user: User;
  offerSkiList: OfferSki[];
  transactionList: Transaction[];
  startOffer = '';
  stopOffer = '';
  newTransaction = {prepareTransaction: null, startTransaction: null, stopTransaction: null, user: null, offerSkiList: []};
  constructor(private userService: UserService, private transactionService: TransactionService,
              private router: Router, private loginComponent: LoginComponent) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.offerSkiList = this.userService.offerSkiList;
    this.transactionList = this.userService.transactionList;
  }

  calDays(start: Date, stop: Date){
    let startDate = new Date(start);
    let stopDate = new Date(stop);
    let time = Math.abs(startDate.getTime() - stopDate.getTime());
    return Math.ceil(time / (1000 * 3600 * 24));
  }

  sumPriceOfferSki(start: Date, stop: Date, offerSki: OfferSki){
    let days = this.calDays(start, stop);
    return offerSki.priceForDay * days;
  }

  sumPriceTransaction(transaction: Transaction){
    let sum = 0.0;
    let days = this.calDays(transaction.startTransaction, transaction.stopTransaction);
    transaction.offerSkiList.forEach(offerSki => {
      sum += offerSki.priceForDay * days;
    });
    return sum;
  }

  // addTransaction() {
  //   // this.newTransaction.startTransaction = new Date(this.startOffer);
  //   // this.newTransaction.stopTransaction = new Date(this.stopOffer);
  //   this.newTransaction.startTransaction = this.userService.transaction.startTransaction;
  //   this.newTransaction.stopTransaction = this.userService.transaction.stopTransaction;
  //   this.newTransaction.offerSkiList = this.offerSkiList;
  //   this.offerSkiList = [];
  //   this.newTransaction.prepareTransaction = new Date();
  //   this.newTransaction.user = this.user;
  //   this.transactionService.addTransaction(this.newTransaction).subscribe((success) => {
  //     console.log('Sukces');
  //     this.newTransaction.startTransaction = null;
  //     this.newTransaction.stopTransaction = null;
  //     this.newTransaction.offerSkiList = [];
  //     this.offerSkiList = [];
  //     this.loginComponent.basketSize = 0;
      
  //     this.router.navigate(['/login']);
  //   }, (error) => {
  //     console.log('Error');
  //   });
  // }

  addTransaction() {
    let now = new Date();
    let user = this.user;
    this.transactionList.forEach(transaction => {
      transaction.user = user;
      transaction.prepareTransaction = now;
      this.transactionService.addTransaction(transaction).subscribe((success) => {
        console.log('Sukces');
      }, (error) => {
        console.log('Error');
      });
    });
    this.transactionList = [];
    this.router.navigate(['/login']);
  }

  delTransaction(idTrasaction){
    this.userService.delTransaction(idTrasaction);
    this.transactionList = this.userService.transactionList;
  }

  delOfferSkiFromTransaction(idTransaction, idOfferSki){
    this.userService.delOfferSkiFromTransaction(idTransaction, idOfferSki);
    this.transactionList = this.userService.transactionList;
  }

}
