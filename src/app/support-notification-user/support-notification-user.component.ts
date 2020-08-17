import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationUserService } from '../service/notification-user.service';
import { UserService } from '../service/user.service';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-support-notification-user',
  templateUrl: './support-notification-user.component.html',
  styleUrls: ['./support-notification-user.component.css']
})
export class SupportNotificationUserComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  users: object[] = [];
  companies: object[] = [];
  notificationUsers: object[] = [];
  constructor(private notificationUserService: NotificationUserService, private userService: UserService,
              private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getAllNotificationUser();
  }

  getAllUsers() {
    // @ts-ignore
    this.subscriptions.add(this.userService.getAll().subscribe((result: any[]) => {
      this.users = result;
      for (const user of this.users) {
        for (const notificationUser of this.notificationUsers) {
          // @ts-ignore
          if (notificationUser.user.id === user.id) {
            // @ts-ignore
            notificationUser.user = user;
          }
        }
      }
      console.log(result);
      // this.getAllUnits();
    }, (error) => {}));
  }

  getAllCompany() {
    // @ts-ignore
    this.subscriptions.add(this.companyService.getAll().subscribe((result: any[]) => {
      this.companies = result;
      for (const company of this.companies) {
        for (const notificationUser of this.notificationUsers) {
          // @ts-ignore
          if (notificationUser.company.id === company.id) {
            // @ts-ignore
            notificationUser.company = company;
          }
        }
      }
      console.log(result);
      // this.getAllUnits();
    }, (error) => {}));
  }

  getAllNotificationUser() {
    this.notificationUserService.getAll().subscribe((result: object[]) => {
      this.notificationUsers = result;
      this.getAllUsers();
      this.getAllCompany();
    }, (error) => {});
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
