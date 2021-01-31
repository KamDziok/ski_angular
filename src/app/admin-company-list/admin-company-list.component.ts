import { Picture } from './../interface/picture';
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
  newImg: Picture;
  selectedFile = [];
  companies: Company[] = [];
  disabledEdit: boolean[] = [];
  newCompany = {} as Company;
  constructor(private companyService: CompanyService, private subscribeDataAdminService: SubscribeDataAdminService) { }

  ngOnInit(): void {
    this.getAllCompanies();
  }

  clear(){
    this.newCompany = {} as Company;
  }

  refresh(){
    this.clear();
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.companyService.getAll().subscribe((result: Company[]) => {
      console.log(result);
      this.companies = result;
      this.disabledEdit = result.map(r => true);
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = !this.disabledEdit[id];
    if(this.disabledEdit[id] == true){
      this.getAllCompanies();
    }
  }

  uploadImg(company, i){
    this.newImg = null;
    const file = this.selectedFile[i];
    const uploadImageData = new FormData();
    if(this.selectedFile !== undefined){
      uploadImageData.append('imageFile', file, file.name);
      this.companyService.addImage(company, uploadImageData).subscribe((success: Picture) =>{
        this.newImg = success;
        company.profilePicture = this.newImg;
        this.companyService.updateCompany(company).subscribe((success) => {
          console.log('Sukces');
          this.refresh();
        }, (error => {
          console.log('Error');
        }));
      }, (error) => {
        console.log('Error');
      })
    }
  }

  delImg(id){
    this.companies[id].profilePicture = null;
  }

  addCompany() {
    this.companyService.addCompany(this.newCompany).subscribe((success) => {
      console.log('Sukces');
      this.refresh();
    }, (error) => {
      console.log('Error');
    });
    this.subscribeDataAdminService.getAllData();
  }

  save(id) {
    this.disabledEdit[id] = true;
    if(this.selectedFile[id] !== undefined){
      this.uploadImg(this.companies[id], id)
    }else{
      this.companyService.updateCompany(this.companies[id]).subscribe((success) => {
        console.log('Sukces');
        this.refresh();
      }, (error => {
        console.log('Error');
      }));
    }
  }
  delete(id) {
    this.companyService.delete(this.companies[id]).subscribe((success) => {
        this.companies.splice(id, 1);
        this.refresh();
      },
      (error) => {
        console.log('Error');
      });
  }

  public onFileChanged(event, i) {
    this.selectedFile[i] = event.target.files[0];
  }
}
