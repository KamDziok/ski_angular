import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {User} from '../interface/user';
import {OfferSki} from '../interface/offer-ski';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: User = null;
  basket: OfferSki[] = [];
  basketSize = 0;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    // this.basket = this.userService.offerSkiList;
    // this.basketSize = this.userService.offerSkiListSize;
  }

  logOut(){
    this.userService.logOut();
    this.router.navigate(['']);
  }
}
