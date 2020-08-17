import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationCompanyService } from '../service/notification-company.service';
import { UserService } from '../service/user.service';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-support-notification-company',
  templateUrl: './support-notification-company.component.html',
  styleUrls: ['./support-notification-company.component.css']
})
export class SupportNotificationCompanyComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  users: object[] = [];
  companies: object[] = [];
  notificationCompanies: object[] = [];
  disabledEdit: boolean[] = [];
  newNotificationCompany = {description: '', company: null, user: null};
  constructor(private notificationCompanyService: NotificationCompanyService, private userService: UserService,
              private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getAllNotificationCompany();
  }

  getAllUsers() {
    // @ts-ignore
    this.subscriptions.add(this.userService.getAll().subscribe((result: any[]) => {
      this.users = result;
      for (const user of this.users) {
        for (const notificationCompany of this.notificationCompanies) {
          // @ts-ignore
          if (notificationCompany.user.id === user.id) {
            // @ts-ignore
            notificationCompany.user = user;
          }
        }
      }
      console.log(result);
      this.disabledEdit = result.map(r => true);
    }, (error) => {}));
  }

  getAllCompany() {
    // @ts-ignore
    this.subscriptions.add(this.companyService.getAll().subscribe((result: any[]) => {
      this.companies = result;
      for (const company of this.companies) {
        for (const notificationnotificationCompany of this.notificationCompanies) {
          // @ts-ignore
          if (notificationCompany.company.id === company.id) {
            // @ts-ignore
            notificationCompany.company = company;
          }
        }
      }
      console.log(result);
      this.disabledEdit = result.map(r => true);
    }, (error) => {}));
  }

  getAllNotificationCompany() {
    this.notificationCompanyService.getAll().subscribe((result: object[]) => {
      this.notificationCompanies = result;
      this.disabledEdit = result.map(r => true);
      this.getAllUsers();
      this.getAllCompany();
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addNotificationCompany() {
    this.notificationCompanyService.addNotificationCompany(this.newNotificationCompany).subscribe((success) => {
      console.log('Sukces');
      this.getAllNotificationCompany();
    }, (error) => {
      console.log('Error');
    });
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.notificationCompanyService.updateNotificationCompany(this.notificationCompanies[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllNotificationCompany();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.notificationCompanyService.delete(this.notificationCompanies[id]).subscribe((success) => {
        this.notificationCompanies.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
