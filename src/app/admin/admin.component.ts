import { SubscribeDataAdminService } from './../service/subscribe-data-admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import {User} from '../interface/user';
import {LocalStorageKey} from '../static/local-storage-key';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  currentUser: User = null;
  // subscribeDataAdminService: SubscribeDataAdminService;
  
  constructor(private userService: UserService, private router: Router,
              private subscribeDataAdminService :SubscribeDataAdminService
              ) { }

  ngOnInit(): void {
    // this.currentUser = this.userService.currentUser;
    this.currentUser = this.userService.getCurrentUser();
    this.subscribeDataAdminService.getAllData();
  }

  logOut(){
    this.userService.logOut();
    this.router.navigate(['']);
  }
}
