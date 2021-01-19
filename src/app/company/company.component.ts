import { SubscribeDataCompanyService } from './../service/subscribe-data-company.service';
import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {User} from "../interface/user";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  currentUser: User = null;
  constructor(private userService: UserService, private router: Router,
              private subscribeDataCompanyService: SubscribeDataCompanyService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.subscribeDataCompanyService.getAllData();
  }

  logOut(){
    this.userService.logOut();
    this.router.navigate(['']);
  }
}
