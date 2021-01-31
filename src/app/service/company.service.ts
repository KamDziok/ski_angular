import { Injectable } from '@angular/core';
import { SetUpHttpService } from './../set-up-http.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  url = 'api/company';
  constructor(private httpClient: SetUpHttpService) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  getById(id) {
    return this.httpClient.get(this.url + '/id/' + id);
  }

  delete(company) {
    return this.httpClient.delete(this.url, company);
  }

  updateCompany(company) {
    return this.httpClient.put(this.url, company);
  }

  addCompany(company) {
    return this.httpClient.post(this.url, company);
  }

  addImage(company, body){
    return this.httpClient.post(this.url + "/" + company.id, body);
  }
}
