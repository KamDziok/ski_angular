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
    this.user = this.userService.currentUser;
    this.getAllTransaction();
  }

  getAllUser() {
    this.subscriptions.add(this.userService.getAll().subscribe((result: User[]) => {
      this.users = result;
      for (const user of this.users) {
        for (const transaction of this.transactions) {
          if (transaction.user.id === user.id) {
            transaction.user = user;
          }
        }
      }
      console.log(result);
    }, (error) => {}));
  }

  getAllOfferSki() {
    this.subscriptions.add(this.offerSkiService.getAll().subscribe((result: OfferSki[]) => {
      this.offerSkis = result;
      for (const offerSki of this.offerSkis) {
        for (const transaction of this.transactions) {
          for (const offerSkiInTransaction of transaction.offerSkiList) {
            if (offerSkiInTransaction.id === offerSki.id) {
              transaction.offerSkiList.push(offerSki);
            }
          }
        }
      }
      console.log(result);
    }, (error) => {}));
  }

  getAllTransaction() {
    this.transactionService.getAllUser(this.user).subscribe((result: Transaction[]) => {
      this.transactions = result;
      this.getAllOfferSki();
      this.getAllUser();
    }, (error) => {});
  }
}
