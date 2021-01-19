import { OfferSkiService } from './../service/offer-ski.service';
import { OfferSki } from './../interface/offer-ski';
import { UserService } from './../service/user.service';
import { Company } from './../interface/company';
import { CompanyService } from './../service/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css']
})
export class ProfileCompanyComponent implements OnInit {
  companyId = 0;
  company: Company;
  userCompany: boolean = false;
  userDefault: boolean = false;
  userUnlogin: boolean = false;
  edit: boolean = false;
  notification: boolean = false;
  offerSkisCompany: OfferSki[];
  constructor(private route: ActivatedRoute, private companyService: CompanyService, private userService: UserService,
              private offerSkiService: OfferSkiService) { }

  ngOnInit(): void {
    this.setPermissions();
    this.companyId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCompanyById(this.companyId);
  }

  setPermissions(){
    if (this.userService.getPermissionUser() == null && this.userService.getPermissionCompany() == null) {
      this.userCompany = false;
      this.userDefault = false;
      this.userUnlogin = true;
    }else if (this.userService.getPermissionUser()){
      this.userDefault = true;
      this.userCompany = !this.userDefault;
      this.userUnlogin = !this.userDefault;
    }else if(this.userService.getPermissionCompany()){
      this.userCompany = true;
      this.userDefault = !this.userCompany;
      this.userUnlogin = !this.userCompany;
    }else{
      this.userCompany = false;
      this.userDefault = false;
      this.userUnlogin = false;
    }
  }

  clickEdit(){
    this.isEdit();
  }

  clickNotification(){
    this.isNotification();
  }

  isEdit(){
    if(this.userCompany){
      this.edit = !this.edit;
    }
  }

  isNotification(){
    if(this.userDefault){
      this.notification = !this.notification;
    }
  }
  
  getCompanyById(id){
    this.companyService.getById(id).subscribe((result: Company) => {
      this.company = result;
      this.getAllOfferSkiCompany(this.company);
    }, (error) => {});
  }

  getAllOfferSkiCompany(company: Company){
    this.offerSkiService.getAllCompanyActive(company).subscribe((result: OfferSki[]) => {
      this.offerSkisCompany = result;
    }, (error) => {});
  }

  saveCompany() {
    this.companyService.updateCompany(this.company).subscribe((success) => {
      this.isEdit();
      this.getCompanyById(this.companyId);
    }, (error => {
      console.log('Error');
    }));
  }

}
