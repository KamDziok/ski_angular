import { SubscribeDataAdminService } from './subscribe-data-admin.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscribeDataCompanyService {

  constructor(private subscribeDataAdminService: SubscribeDataAdminService) { }

  public getAllData() {
    this.getProducers();
    this.getSkis();
  }

  public getSkis() {
    return this.subscribeDataAdminService.getSkis();   
  }

  public getProducers() {
    return this.subscribeDataAdminService.getProducers();
  }

  // public getPrices() {
  //   return this.subscribeDataAdminService.getPrices();
  // }
}
