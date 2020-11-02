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
  errorLoginMassage = '';
  errorRegiMassage = '';
  userLoginData = {eMail: '', password: ''};
  userLogin = {id: 0, firstName: '', lastName: '', eMail: '', password: '', permissions: Permissions.USER, company: null};
  userRegi = {eMail: '', password: '', firstName: '', lastName: '', permissions: Permissions.USER, company: null};
  password = '';
  repeatPassword = '';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if(this.userService.getPermissionAdmin()){
      this.router.navigate(['admin']);
    }else if(this.userService.getPermissionCompany()){
      this.router.navigate(['company']);
    }else if(this.userService.getPermissionSupport()){
      this.router.navigate(['support']);
    }else if(this.userService.getPermissionUser()){
      this.router.navigate(['login']);
    } else {
      this.userService.logOut();
    }
  }

  login(){
    this.errorLoginMassage = '';
    this.userService.getLogin(this.userLoginData).subscribe( (result: User) => {
      this.userLogin = result;
      if (this.userLogin != null) {
        this.userService.logIn(this.userLogin);
        // localStorage.setItem(LocalStorageKey.USER, JSON.stringify(this.userLogin));
        switch (this.userLogin.permissions) {
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
            this.errorLoginMassage = 'Twoje konto zostało zablokowane.';
            break;

          default:
            this.errorLoginMassage = 'Błędny login lub hasło.';
            break;
        }
      } else {
        this.errorLoginMassage = 'Błędny login lub hasło.';
      }
    }, (error) => {});
  }

  regi(){
    this.errorRegiMassage = '';
    if (this.password === this.repeatPassword){
      if (this.userService.isUserByEMail(this.userRegi.eMail)) {
        this.userRegi.password = this.password;
        this.userRegi.permissions = Permissions.USER;
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
          this.errorRegiMassage = 'Coś poszło nie tak.';
        }));
      } else {
        this.errorRegiMassage = 'Istnieje już konto na podany adres email.';
      }
    }else{
      this.errorRegiMassage = 'Hasła nie są identyczne.';
    }
  }
}
