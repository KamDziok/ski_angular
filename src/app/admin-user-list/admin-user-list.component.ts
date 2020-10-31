import { SubscribeDataAdminService } from './../service/subscribe-data-admin.service';
import { Company } from './../interface/company';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Permissions } from '../static/permissions';
import { UserService } from '../service/user.service';
import { CompanyService } from '../service/company.service';
import { PermissionList } from '../static/permission-list';
import {User} from '../interface/user';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  permissionList = PermissionList;
  companies: Company[] = [];
  users: User[] = [];
  disabledEdit: boolean[] = [];
  disabledAddCompany = true;
  disabledEditCompany = true;
  newUser = {firstName: '', lastName: '', eMail: '', password: '', permissions: Permissions.USER, company: null};
  constructor(private userService: UserService, private subscribeDataAdminService: SubscribeDataAdminService
    // private companyService: CompanyService
    ) { }

  ngOnInit(): void {
    this.getAllCompanies();
    // setTimeout(this.getAllUsers, 1000);
    this.getAllUsers();
  }

  getAllCompanies() {
    console.log('ładowanie...');
    this.companies = this.subscribeDataAdminService.getCompanies();
    console.log(this.companies);
    console.log('załadowane.');
    // this.subscriptions.add(this.companyService.getAll().subscribe((result: Company[]) => {
    //   this.companies = result;
    //   for (const company of this.companies) {
    //     for (const user of this.users) {
    //       if (user.permissions === Permissions.SUPPORT) {
    //         if (user.company.id === company.id) {
    //           user.company = company;
    //         }
    //       }
    //     }
    //   }
    //   console.log(result);
    //   this.disabledEdit = result.map(r => true);
    // }, (error) => {}));
  }

  getAllUsers() {
    // this.getAllCompanies();
    setTimeout(() => {
      this.userService.getAllWithOutCurrentUser().subscribe((result: User[]) => {
        this.users = result;
        for (const user of this.users) {
          console.log(this.companies);
          for (const company of this.companies) {
            if (user.permissions === Permissions.COMPANY) {
              if (user.company.id === company.id) {
                user.company = company;
                break;
              }
            }
          }
        }
        this.disabledEdit = result.map(r => true);
        // this.newUser.company = result[0];
      }, (error) => {});
    }, 5000);
    // this.userService.getAllWithOutCurrentUser().subscribe((result: User[]) => {
    //   this.users = result;
    //   for (const user of this.users) {
    //     for (const company of this.companies) {
    //       if (user.permissions === Permissions.COMPANY) {
    //         if (user.company.id === company.id) {
    //           user.company = company;
    //           break;
    //         }
    //       }
    //     }
    //   }
    //   this.disabledEdit = result.map(r => true);
    //   // this.newUser.company = result[0];
    // }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  makeEnabledAddCompany(permissions){
    if (permissions === Permissions.COMPANY){
      this.disabledAddCompany = false;
    }else {
      this.disabledAddCompany = true;
    }
  }

  makeEnabledEditCompany(permissions){
    if (permissions === Permissions.COMPANY){
      this.disabledEditCompany = false;
    }else {
      this.disabledEditCompany = true;
    }
  }

  makeSelectedEditUserCompany(user, idCompany) {
    if (user.permissions === Permissions.COMPANY) {
      if (user.company.id === idCompany) {
        return true;
      }
    }
    return false;
  }

  addUser() {
    if (this.newUser.permissions !== Permissions.COMPANY) {
      this.newUser.company = null;
    }
    this.userService.addUser(this.newUser).subscribe((success) => {
      console.log('Sukces');
      this.getAllUsers();
    }, (error) => {
      console.log('Error');
    });
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.userService.updateUser(this.users[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllUsers();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.userService.delete(this.users[id]).subscribe((success) => {
        this.users.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
