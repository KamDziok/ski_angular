import { Component, OnInit } from '@angular/core';
import {Permissions} from '../static/permissions';
import {User} from '../interface/user';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  errorMassage = '';
  userLoginData = {eMail: '', password: ''};
  userLogin = {id: 0, firstName: '', lastName: '', eMail: '', password: '', permissions: Permissions.user, company: null};
  userRegi = {eMail: '', password: '', firstName: '', lastName: '', permissions: Permissions.user, company: null};
  password = '';
  repeatPassword = '';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.errorMassage = '';
    this.userService.getLogin(this.userLoginData).subscribe( (result: User) => {
      this.userLogin = result;
      if (this.userLogin != null) {
        this.userService.logIn(this.userLogin);
        localStorage.setItem('user', JSON.stringify(result));
        switch (this.userLogin.permissions) {
          case Permissions.user:
            this.router.navigate(['login']);
            break;

          case Permissions.company:
            this.router.navigate(['company']);
            break;

          case Permissions.support:
            this.router.navigate(['support']);
            break;

          case Permissions.admin:
            this.router.navigate(['admin']);
            break;

          case Permissions.ban:
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

  regi(){
    if (this.password === this.repeatPassword){
      if (this.userService.isUserByEMail(this.userRegi.eMail)) {
        this.userRegi.password = this.password;
        this.userRegi.permissions = Permissions.user;
        this.userRegi.company = null;
        this.userService.addUser(this.userRegi).subscribe((success) => {
          console.log('Sukces');
          this.userRegi.eMail = '';
          this.userRegi.firstName = '';
          this.userRegi.lastName = '';
          this.password = '';
          this.repeatPassword = '';
          this.router.navigate(['']);
        }, (error => {
          console.log('Error');
          this.errorMassage = 'Coś poszło nie tak.';
        }));
      } else {
        this.errorMassage = 'Istnieje już konto na podany adres email.';
      }
    }else{
      this.errorMassage = 'Hasła nie są identyczne.';
    }
  }
}
