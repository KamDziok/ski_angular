import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../interface/user';
import {Company} from '../interface/company';
import {Permissions} from '../static/permissions';
import {PermissionList} from '../static/permission-list';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user: User;
  company: Company = null;
  permissionList = PermissionList;
  permissions = Permissions;
  permission = '';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.currentUser;
    for (const p of this.permissionList){
      if (p.key === this.user.permissions){
        this.permission = p.value;
      }
    }
    if (this.user.permissions === Permissions.company){
      this.company = this.user.company;
    }
  }

}
