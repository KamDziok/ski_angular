import { SubscribeDataAdminService } from './../service/subscribe-data-admin.service';
import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import {Company} from '../interface/company';

@Component({
  selector: 'app-admin-company-list',
  templateUrl: './admin-company-list.component.html',
  styleUrls: ['./admin-company-list.component.css']
})
export class AdminCompanyListComponent implements OnInit {
  companies: Company[] = [];
  disabledEdit: boolean[] = [];
  newCompany = {name: '', active: false, description: ''};
  constructor(private companyService: CompanyService, private subscribeDataAdminService: SubscribeDataAdminService) { }

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.companyService.getAll().subscribe((result: Company[]) => {
      this.companies = result;
      this.disabledEdit = result.map(r => true);
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addCompany() {
    this.companyService.addCompany(this.newCompany).subscribe((success) => {
      console.log('Sukces');
      this.getAllCompanies();
    }, (error) => {
      console.log('Error');
    });
    this.subscribeDataAdminService.getAllData();
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.companyService.updateCompany(this.companies[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllCompanies();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.companyService.delete(this.companies[id]).subscribe((success) => {
        this.companies.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }
}
