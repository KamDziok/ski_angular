import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../service/company.service';
import {UserService} from '../service/user.service';
import {User} from '../interface/user';
import {Company} from '../interface/company';
import {Permissions} from '../static/permissions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
  newCompany = {name: '', active: true};
  user: User;
  company: Company;
  constructor(private companyService: CompanyService, private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  createNewCompany(){
    this.companyService.addCompany(this.newCompany).subscribe((result: Company) => {
      if (result != null){
        this.company = result;
        this.user.permissions = Permissions.COMPANY;
        this.userService.updateUser(this.user).subscribe((success) => {
          console.log('Sukces');
        }, (error => {
          console.log('Error');
        }));
      }
      console.log('Sukces');
      this.userService.logOut();
      this.router.navigate(['']);
    }, (error) => {
      console.log('Error');
    });
  }
}
