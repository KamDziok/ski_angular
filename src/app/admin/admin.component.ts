import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import {User} from '../interface/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentUser: User = null;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
  }

  logOut(){
    this.userService.logOut();
    this.router.navigate(['']);
  }
}
