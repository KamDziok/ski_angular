import { Component, OnInit } from '@angular/core';
import {User} from '../interface/user';
import {OfferSki} from '../interface/offer-ski';
import {Transaction} from '../interface/transaction';
import {Subscription} from 'rxjs';
import {TransactionService} from '../service/transaction.service';
import {UserService} from '../service/user.service';
import {OfferSkiService} from '../service/offer-ski.service';

@Component({
  selector: 'app-my-transaction',
  templateUrl: './my-transaction.component.html',
  styleUrls: ['./my-transaction.component.css']
})
export class MyTransactionComponent implements OnInit {
  user: User;
  subscriptions: Subscription = new Subscription();
  offerSkis: OfferSki[] = [];
  users: User[] = [];
  transactions: Transaction[] = [];
  constructor(private transactionService: TransactionService, private userService: UserService,
              private offerSkiService: OfferSkiService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getAllTransaction();
  }

  getAllOfferSki() {
    this.offerSkiService.getAll().subscribe((result: OfferSki[]) => {
      this.offerSkis = result;
      console.log(result);
    }, (error) => {});
  }

  getAllTransaction() {
    this.transactionService.getAllUser(this.user).subscribe((result: Transaction[]) => {
      this.transactions = result;
      this.getAllOfferSki();
    }, (error) => {});
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
  
}
