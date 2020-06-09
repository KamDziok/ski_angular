import { Component, OnInit } from '@angular/core';
import { CompanyService } from './../service/company.service';

@Component({
  selector: 'app-admin-company-list',
  templateUrl: './admin-company-list.component.html',
  styleUrls: ['./admin-company-list.component.css']
})
export class AdminCompanyListComponent implements OnInit {
  companies: object[] = [];
  disabledEdit: boolean[] = [];
  newCompany = {name: '', active: false, description: ''};
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.companyService.getAll().subscribe((result: object[]) => {
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
