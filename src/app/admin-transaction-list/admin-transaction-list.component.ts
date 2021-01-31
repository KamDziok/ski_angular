import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscribeDataAdminService } from './../service/subscribe-data-admin.service';
import { TransactionService } from '../service/transaction.service';
import { UserService } from '../service/user.service';
import { OfferSkiService } from '../service/offer-ski.service';
import {Transaction} from '../interface/transaction';
import {User} from '../interface/user';
import {OfferSki} from '../interface/offer-ski';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-admin-transaction-list',
  templateUrl: './admin-transaction-list.component.html',
  styleUrls: ['./admin-transaction-list.component.css']
})
export class AdminTransactionListComponent implements OnInit, OnDestroy {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  offerSkis: OfferSki[] = [];
  offerSkiListLocal: OfferSki[] = [];
  offerSkiLocal: OfferSki = null;
  users: User[] = [];
  transactions: Transaction[] = [];
  disabledEdit: boolean[] = [];
  startOffer = '';
  stopOffer = '';
  offerSkiLocalEdit: OfferSki = null;
  newTransaction = {} as Transaction;
  constructor(private transactionService: TransactionService, private subscribeDataAdminService: SubscribeDataAdminService
              ) { }

  ngOnInit(): void {
    this.users = this.getAllUser();
    this.offerSkis = this.getAllOfferSki();
    this.getAllTransaction();
  }

  clear(){
    this.newTransaction = {} as Transaction;
  }

  refresh(){
    this.clear();
    this.getAllUser();
    this.getAllOfferSki();
    this.getAllTransaction();
  }

  getAllUser() {
    return this.subscribeDataAdminService.getUsers();
  }

  getAllOfferSki() {
    return this.subscribeDataAdminService.getOfferSkis();
  }

  getAllTransaction() {
    this.transactionService.getAll().subscribe((result: Transaction[]) => {
      this.transactions = result;
      this.transactions.forEach(transaction => {
        this.users.forEach(user => {
          if (transaction.user.id === user.id) {
            transaction.user = user;
          }
        })
      });
      this.disabledEdit = result.map(r => true);
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = !this.disabledEdit[id];
    if(this.disabledEdit[id] == true){
      this.getAllUser();
      this.getAllOfferSki();
      this.getAllTransaction();
    }
  }

  addOfferSkisLocal(){
    if (this.offerSkiLocal != null) {
      this.offerSkiListLocal.push(this.offerSkiLocal);
    }
  }

  addTransaction() {
    this.newTransaction.startTransaction = new Date(this.range.get('start').value);
    this.newTransaction.stopTransaction = new Date(this.range.get('ebd').value);
    this.newTransaction.offerSkiList = this.offerSkiListLocal;
    this.offerSkiListLocal = [];
    this.newTransaction.prepareTransaction = new Date();
    this.transactionService.addTransaction(this.newTransaction).subscribe((success) => {
      console.log('Sukces');
      this.refresh();
    }, (error) => {
      console.log('Error');
    });
    this.subscribeDataAdminService.getAllData();
  }

  save(id) {
    this.offerSkis[id].startOffer = new Date(this.offerSkis[id].startOffer);
    this.offerSkis[id].stopOffer = new Date(this.offerSkis[id].stopOffer);
    this.disabledEdit[id] = true;
    this.transactionService.updateTransaction(this.transactions[id]).subscribe((success) => {
      console.log('Sukces');
      this.refresh();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.transactionService.delete(this.transactions[id]).subscribe((success) => {
        this.transactions.splice(id, 1);
        this.refresh();
      },
      (error) => {
        console.log('Error');
      });
  }
  deleteOfferSki(idTransaction, idOfferSki) {
    this.transactions[idTransaction].offerSkiList.splice(idOfferSki, 1);
  }
  addToTransaction(idTransaction){
    this.transactions[idTransaction].offerSkiList.push(this.offerSkiLocalEdit);
  }
  ngOnDestroy() {
  }
}
