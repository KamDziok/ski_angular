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
  startOffer = '';
  stopOffer = '';
  newTransaction = {prepareTransaction: null, startTransaction: null, stopTransaction: null, user: null, offerSkiList: []};
  constructor(private userService: UserService, private transactionService: TransactionService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.offerSkiList = this.userService.offerSkiList;
  }

  addTransaction() {
    this.newTransaction.startTransaction = new Date(this.startOffer);
    this.newTransaction.stopTransaction = new Date(this.stopOffer);
    this.newTransaction.offerSkiList = this.offerSkiList;
    this.offerSkiList = [];
    this.newTransaction.prepareTransaction = new Date();
    this.newTransaction.user = this.user;
    this.transactionService.addTransaction(this.newTransaction).subscribe((success) => {
      console.log('Sukces');
      this.router.navigate(['/login']);
    }, (error) => {
      console.log('Error');
    });
  }
}
