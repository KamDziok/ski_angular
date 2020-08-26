import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferSkiService } from '../service/offer-ski.service';
import { PriceService } from '../service/price.service';
import { CompanyService } from '../service/company.service';
import { SkiService } from '../service/ski.service';
import { UserService } from './user.service';
import { ProducerService } from './producer.service';
import {OfferSki} from '../interface/offer-ski';
import {Price} from '../interface/price';
import {Company} from '../interface/company';
import {Ski} from '../interface/ski';
import { User } from './../interface/user';
import { Producer } from './../interface/producer';

@Injectable({
  providedIn: 'root'
})
export class SubscribeDataAdminService {

  subscriptions: Subscription = new Subscription();
  offerSkis: OfferSki[] = [];
  prices: Price[] = [];
  companies: Company[] = [];
  skis: Ski[] = [];
  users: User[] = [];
  producers: Producer[] = [];

  constructor(private priceService: PriceService, private offerSkiService: OfferSkiService, 
              private companyService: CompanyService, private skiService: SkiService,
              private userService: UserService, private producerService: ProducerService) { }

  public getOfferSkis() {
    if (this.offerSkis.length === 0) {
      this.getAllOfferSki();
    }
    return this.offerSkis;
  }

  public getPrices() {
    if (this.prices.length === 0) {
      this.getAllPrices();
    }
    return this.prices;
  }

  public getCompanies() {
    if (this.companies.length === 0) {
      this.getAllCompany();
    }
    return this.companies;
  }

  public getSkis() {
    if (this.skis.length === 0) {
      this.getAllSki();
    }
    return this.skis;
  }

  public getUsers() {
    if (this.users.length === 0) {
      this.getAllUser();
    }
    return this.users;
  }

  public getProducers() {
    if (this.producers.length === 0) {
      this.getAllProducers();
    }
    return this.producers;
  }

  private getAllOfferSki() {
    this.subscriptions.add(this.offerSkiService.getAll().subscribe((result: OfferSki[]) => {
      this.offerSkis = result;
    }, (error) => {}));
  }

  private getAllPrices() {
    this.subscriptions.add(this.priceService.getAll().subscribe((result: Price[]) => {
      this.prices = result;
    }, (error) => {}));
  }

  private getAllCompany() {
    this.subscriptions.add(this.companyService.getAll().subscribe((result: Company[]) => {
      this.companies = result;
    }, (error) => {}));
  }

  private getAllSki() {
    this.subscriptions.add(this.skiService.getAll().subscribe((result: Ski[]) => {
      this.skis = result;
    }, (error) => {}));
  }

  private getAllUser() {
    this.subscriptions.add(this.userService.getAll().subscribe((result: User[]) => {
      this.users = result;
    }, (error) => {}));
  }

  private getAllProducers() {
    this.subscriptions.add(this.producerService.getAll().subscribe((result: Producer[]) => {
      this.producers = result;
    }, (error) => {}));
  }

}
