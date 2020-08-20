import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import {Permissions} from '../static/permissions';
import {User} from '../interface/user';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  errorMassage = '';
  userLogin = {eMail: '', password: ''};
  user = {id: 0, firstName: '', lastName: '', eMail: '', password: '', permissions: Permissions.USER, company: null};
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.errorMassage = '';
    this.userService.getLogin(this.userLogin).subscribe( (result: User) => {
      this.user = result;
      if (this.user != null) {
        this.userService.logIn(this.user);
        switch (this.user.permissions) {
          case Permissions.USER:
            this.router.navigate(['login']);
            break;

          case Permissions.COMPANY:
            this.router.navigate(['company']);
            break;

          case Permissions.SUPPORT:
            this.router.navigate(['support']);
            break;

          case Permissions.ADMIN:
            this.router.navigate(['admin']);
            break;

          case Permissions.BAN:
            this.errorMassage = 'Twoje konto zostało zablokowane.';
            break;

          default:
            this.errorMassage = 'Błędny login lub hasło.';
            break;
        }
      } else {
        this.errorMassage = 'Błędny login lub hasło.';
      }
    }, (error) => {});
  }
}
