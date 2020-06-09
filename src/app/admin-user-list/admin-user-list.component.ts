import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Permissions } from './../static/permissions';
import { UserService } from './../service/user.service';
import { CompanyService } from './../service/company.service';
import { PermissionList } from './../static/permission-list';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  permissionList = PermissionList;
  companies: object[] = [];
  users: object[] = [];
  disabledEdit: boolean[] = [];
  disabledAddCompany = true;
  disabledEditCompany = true;
  newUser = {firstName: '', lastName: '', eMail: '', password: '', permission: Permissions.user, company: null};
  constructor(private userService: UserService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getAllUnits();
  }

  getAllCompanies() {
    // @ts-ignore
    this.subscriptions.add(this.companyService.getAll().subscribe((result: any[]) => {
      this.companies = result;
      for (const company of this.companies) {
        for (const user of this.users) {
          // @ts-ignore
          if (user.permissions === Permissions.support) {
            // @ts-ignore
            if (user.company.id === company.id) {
              // @ts-ignore
              user.company = company;
            }
          }
        }
      }
      console.log(result);
      this.disabledEdit = result.map(r => true);
      // this.getAllUnits();
    }, (error) => {}));
  }

  getAllUnits() {
    this.userService.getAll().subscribe((result: object[]) => {
      this.users = result;
      this.disabledEdit = result.map(r => true);
      this.newUser.company = result[0];
      this.getAllCompanies();
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  makeEnabledAddCompany(permissions){
    if (permissions === Permissions.company){
      this.disabledAddCompany = false;
    }else {
      this.disabledAddCompany = true;
    }
  }

  makeEnabledEditCompany(permissions){
    if (permissions === Permissions.company){
      this.disabledEditCompany = false;
    }else {
      this.disabledEditCompany = true;
    }
  }

  makeSelectedEditUserCompany(user, idCompany) {
    if (user.permissions === Permissions.company) {
      if (user.company.id === idCompany) {
        return true;
      }
    }
    return false;
  }

  addUser() {
    if (this.newUser.permission !== Permissions.company) {
      this.newUser.company = null;
    }
    this.userService.addUser(this.newUser).subscribe((success) => {
      console.log('Sukces');
      this.getAllUnits();
    }, (error) => {
      console.log('Error');
    });
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.userService.updateUser(this.users[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllUnits();
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
