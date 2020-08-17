import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationUserService } from '../service/notification-user.service';
import { UserService } from '../service/user.service';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-admin-notification-user-list',
  templateUrl: './admin-notification-user-list.component.html',
  styleUrls: ['./admin-notification-user-list.component.css']
})
export class AdminNotificationUserListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  users: object[] = [];
  companies: object[] = [];
  notificationUsers: object[] = [];
  disabledEdit: boolean[] = [];
  newNotificationUser = {description: '', user: null, company: null};
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
      this.disabledEdit = result.map(r => true);
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
      this.disabledEdit = result.map(r => true);
      // this.getAllUnits();
    }, (error) => {}));
  }

  getAllNotificationUser() {
    this.notificationUserService.getAll().subscribe((result: object[]) => {
      this.notificationUsers = result;
      this.disabledEdit = result.map(r => true);
      this.getAllUsers();
      this.getAllCompany();
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addNotificationUser() {
    this.notificationUserService.addNotificationUser(this.newNotificationUser).subscribe((success) => {
      console.log('Sukces');
      this.getAllNotificationUser();
    }, (error) => {
      console.log('Error');
    });
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.notificationUserService.updateNotificationUser(this.notificationUsers[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllNotificationUser();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.notificationUserService.delete(this.notificationUsers[id]).subscribe((success) => {
        this.notificationUsers.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
