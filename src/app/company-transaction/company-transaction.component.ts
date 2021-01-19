import { OfferSki } from './../interface/offer-ski';
import { UserService } from './../service/user.service';
import { TransactionService } from './../service/transaction.service';
import { User } from './../interface/user';
import { Transaction } from './../interface/transaction';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-transaction',
  templateUrl: './company-transaction.component.html',
  styleUrls: ['./company-transaction.component.css']
})
export class CompanyTransactionComponent implements OnInit {
  user: User;
  transactions: Transaction[] = [];
  transactionListFilter: Transaction[] = [];
  date: Date;
  month: number;
  year: number;
  
  constructor(private transactionService: TransactionService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.date = new Date();
    this.month = this.date.getMonth()+1;
    this.year = this.date.getFullYear();
    this.getAllTransaction();
    this.transactionListFilter = this.filterTransaction(Object.assign([], this.transactions), this.month, this.year);
  }

  getAllTransaction() {
    this.transactionService.getAllCompany(this.user.company).subscribe((result: Transaction[]) => {
      console.log(result)
      this.transactions = result;
      this.transactionListFilter = this.filterTransaction(Object.assign([], this.transactions), this.month, this.year);
    }, (error) => {});
  }

  filterTransaction(transactionList: Transaction[], mounth: number, year: number){
    return transactionList.filter(transaction => new Date(transaction.startTransaction).getMonth()+1 == mounth &&
                                                new Date(transaction.startTransaction).getFullYear() == year);
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

  sumPriceTransactionList(transactionList: Transaction[]){
    let sum = 0.0;
    transactionList.forEach(transaction => {
      sum += this.sumPriceTransaction(transaction);
    });
    return sum;
  }

  sumPrice(offerSkiList: OfferSki[]){
    let sum = 0.0;
    offerSkiList.forEach(offerSki => {
      sum += offerSki.priceForDay;
    });
    return sum;
  }

  monthUp(){
    this.month += 1;
    if(this.month > 12){
      this.month = 1;
      this.year += 1;
    }
    this.transactionListFilter = this.filterTransaction(Object.assign([], this.transactions), this.month, this.year);
  }

  monthDown(){
    this.month -= 1;
    if(this.month < 1){
      this.month = 12;
      this.year -= 1;
    }
    this.transactionListFilter = this.filterTransaction(Object.assign([], this.transactions), this.month, this.year);
  }

}
