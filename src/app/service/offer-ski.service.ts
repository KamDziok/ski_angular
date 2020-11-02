import { Company } from './../interface/company';
import { Injectable } from '@angular/core';
import { SetUpHttpService } from './../set-up-http.service';

@Injectable({
  providedIn: 'root'
})
export class OfferSkiService {
  url = 'api/offer-ski';
  constructor(private httpClient: SetUpHttpService) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  getAllCompany(company: Company) {
    return this.httpClient.get(this.url + '/company/' + company.id);
  }

  getAllCompanyActive(company: Company) {
    return this.httpClient.get(this.url + '/company/' + company.id + '/active');
  }

  getAllFromCity(city){
    return this.httpClient.get( (this.url + '/' + city));
  }

  getAllByData(begin, end){
    return this.httpClient.get( (this.url + '/start-date/' + begin + '/stop-date/' + end));
    // return this.httpClient.get( this.url + '/sctive' );
  }

  getAllByDataAndCity(begin, end, city){
    return this.httpClient.get( (this.url + '/start-date/' + begin + '/stop-date/' + end + "/city/" + city));
  }

  delete(offerSki) {
    return this.httpClient.delete(this.url, offerSki);
  }

  updateOfferSki(offerSki) {
    return this.httpClient.put(this.url, offerSki);
  }

  addOfferSki(offerSki) {
    return this.httpClient.post(this.url, offerSki);
  }
}
