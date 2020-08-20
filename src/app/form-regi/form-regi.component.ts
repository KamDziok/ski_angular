import { Component, OnInit } from '@angular/core';
import {Permissions} from '../static/permissions';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-regi',
  templateUrl: './form-regi.component.html',
  styleUrls: ['./form-regi.component.css']
})
export class FormRegiComponent implements OnInit {
  user = {eMail: '', password: '', firstName: '', lastName: '', permissions: Permissions.USER, company: null};
  password = '';
  repeatPassword = '';
  errorMassage = '';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  regi(){
    if (this.password === this.repeatPassword){
      if (this.userService.isUserByEMail(this.user.eMail)) {
        this.user.password = this.password;
        this.user.permissions = Permissions.USER;
        this.user.company = null;
        this.userService.addUser(this.user).subscribe((success) => {
          console.log('Sukces');
          this.router.navigate(['form-login']);
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
