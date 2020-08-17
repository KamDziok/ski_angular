import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { TransactionService } from '../service/transaction.service';
import { UserService } from '../service/user.service';
import { OfferSkiService } from '../service/offer-ski.service';
import {Transaction} from '../interface/transaction';
import {User} from '../interface/user';
import {OfferSki} from '../interface/offer-ski';

@Component({
  selector: 'app-admin-transaction-list',
  templateUrl: './admin-transaction-list.component.html',
  styleUrls: ['./admin-transaction-list.component.css']
})
export class AdminTransactionListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  offerSkis: OfferSki[] = [];
  offerSkiListLocal: OfferSki[] = [];
  offerSkiLocal: OfferSki = null;
  users: User[] = [];
  transactions: Transaction[] = [];
  disabledEdit: boolean[] = [];
  startOffer = '';
  stopOffer = '';
  newTransaction = {prepareTransaction: null, startTransaction: null, stopTransaction: null, user: null, offerSkiList: []};
  constructor(private transactionService: TransactionService, private userService: UserService,
              private offerSkiService: OfferSkiService) { }

  ngOnInit(): void {
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
      this.disabledEdit = result.map(r => true);
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
      this.disabledEdit = result.map(r => true);
    }, (error) => {}));
  }

  getAllTransaction() {
    this.transactionService.getAll().subscribe((result: Transaction[]) => {
      this.transactions = result;
      this.disabledEdit = result.map(r => true);
      this.getAllOfferSki();
      this.getAllUser();
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addOfferSkisLocal(){
    if (this.offerSkiLocal != null) {
      this.offerSkiListLocal.push(this.offerSkiLocal);
    }
  }

  addTransaction() {
    this.newTransaction.startTransaction = new Date(this.startOffer);
    this.newTransaction.stopTransaction = new Date(this.stopOffer);
    this.newTransaction.offerSkiList = this.offerSkiListLocal;
    this.offerSkiListLocal = [];
    this.newTransaction.prepareTransaction = new Date();
    this.transactionService.addTransaction(this.newTransaction).subscribe((success) => {
      console.log('Sukces');
      this.getAllTransaction();
    }, (error) => {
      console.log('Error');
    });
  }

  save(id) {
    this.offerSkis[id].startOffer = new Date(this.offerSkis[id].startOffer);
    this.offerSkis[id].stopOffer = new Date(this.offerSkis[id].stopOffer);
    this.disabledEdit[id] = true;
    this.transactionService.updateTransaction(this.transactions[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllTransaction();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.transactionService.delete(this.transactions[id]).subscribe((success) => {
        this.transactions.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
