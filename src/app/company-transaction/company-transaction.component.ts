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
    this.getAllTransaction();
    this.date = new Date();
    this.month = this.date.getMonth()+1;
    this.year = this.date.getFullYear();
    console.log(this.transactions);
    console.log(this.transactionListFilter);
    this.transactionListFilter = this.filterTransaction(Object.assign([], this.transactions), this.month, this.year);
    console.log(this.transactions);
    console.log(this.transactionListFilter);
  }

  getAllTransaction() {
    this.transactionService.getAllCompany(this.user.company).subscribe((result: Transaction[]) => {
      console.log(result)
      this.transactions = result;
    }, (error) => {});
  }

  filterTransaction(transactionList: Transaction[], mounth: number, year: number){
    // console.log(transactionList);
    // console.log(transactionList.filter(transaction => transaction.startTransaction.getMonth()+1 == mounth &&
    // transaction.startTransaction.getFullYear() == year));
    return transactionList.filter(transaction => new Date(transaction.startTransaction).getMonth()+1 == mounth &&
                                                new Date(transaction.startTransaction).getFullYear() == year);
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
