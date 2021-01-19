import { OfferSki } from './../interface/offer-ski';
import { Company } from './../interface/company';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { OfferSkiService } from '../service/offer-ski.service';
import { PriceService } from '../service/price.service';
import { CompanyService } from '../service/company.service';
import { SkiService } from '../service/ski.service';
import { UserService } from './user.service';
import { ProducerService } from './producer.service';
import {Price} from '../interface/price';
import {Ski} from '../interface/ski';
import { User } from './../interface/user';
import { Producer } from './../interface/producer';
import { LocalStorageKey } from '../static/local-storage-key';

@Injectable({
  providedIn: 'root'
})
export class SubscribeDataAdminService {

  // subscriptions: Subscription = new Subscription();
  // offerSkis: OfferSki[] = [];
  // prices: Price[] = [];
  // companies: Company[] = [];
  // skis: Ski[] = [];
  // users: User[] = [];
  // producers: Producer[] = [];
  offerSkis: boolean = false;
  prices: boolean = false;
  companies: boolean = false;
  skis: boolean = false;
  users: boolean = false;
  producers: boolean = false;

  constructor(private priceService: PriceService, private offerSkiService: OfferSkiService, 
              private companyService: CompanyService, private skiService: SkiService,
              private userService: UserService, private producerService: ProducerService) { }

  public getAllData() {
    this.getAllCompany();
    this.getAllOfferSki();
    this.getAllPrices();
    this.getAllProducers();
    this.getAllSki();
    this.getAllUser();
  }

  public getOfferSkis() {
    // if (this.offerSkis.length === 0) {
    // if (!this.offerSkis) {
      this.getAllOfferSki();
    // }
    // return this.offerSkis;
    return JSON.parse(localStorage.getItem(LocalStorageKey.OFFER_SKIS));
  }

  public getPrices() {
    // if (this.prices.length === 0) {
    // if (!this.prices) {
      this.getAllPrices();
    // }
    // return this.prices;
    return JSON.parse(localStorage.getItem(LocalStorageKey.PRICES));
  }

  public getCompanies() {
    // if (this.companies.length === 0) {
    // if (!this.companies) {
      this.getAllCompany();
    // }
    // return this.companies;
    return JSON.parse(localStorage.getItem(LocalStorageKey.COMPANIES));
  }

  public getSkis() {
    // if (this.skis.length === 0) {
    // if (!this.skis) {
      this.getAllSki();
    // }
    // return this.skis;
    return JSON.parse(localStorage.getItem(LocalStorageKey.SKIS));
  }

  public getUsers() {
    // if (this.users.length === 0) {
    // if (!this.users) {
      this.getAllUser();
    // }
    // return this.users;
    return JSON.parse(localStorage.getItem(LocalStorageKey.USERS));
  }

  public getProducers() {
    // if (this.producers.length === 0) {
    // if (!this.producers) {
      this.getAllProducers();
    // }
    // return this.producers;
    return JSON.parse(localStorage.getItem(LocalStorageKey.PRODUCERS));
  }

  public setOfferSkis(offerSkis: OfferSki[]) {
    // this.offerSkis = offerSkis;
    localStorage.setItem(LocalStorageKey.OFFER_SKIS, JSON.stringify(offerSkis));
    this.offerSkis = true;
  }

  public setPrices(prices: Price[]) {
    // this.prices = prices;
    localStorage.setItem(LocalStorageKey.PRICES, JSON.stringify(prices));
    this.prices = true;
  }

  public setCompanies(companies: Company[]) {
    // this.companies = companies;
    localStorage.setItem(LocalStorageKey.COMPANIES, JSON.stringify(companies));
    this.companies = true;
  }

  public setSkis(skis: Ski[]) {
    // this.skis = skis;
    localStorage.setItem(LocalStorageKey.SKIS, JSON.stringify(skis));
    this.skis = true;
  }

  public setUsers(users: User[]) {
    // this.users = users;
    localStorage.setItem(LocalStorageKey.USERS, JSON.stringify(users));
    this.users = true;
  }

  public setProducers(producers: Producer[]) {
    // this.producers = producers;
    localStorage.setItem(LocalStorageKey.PRODUCERS, JSON.stringify(producers));
    this.producers = true;
  }

  private getAllOfferSki() {
    // this.subscriptions.add(this.offerSkiService.getAll().subscribe((result: OfferSki[]) => {
    this.offerSkiService.getAll().pipe(map((result: OfferSki[]) => {
      this.setOfferSkis(result);
    }, (error) => {}));
    // }, (error) => {}));
  }

  private getAllPrices() {
    // this.subscriptions.add(this.priceService.getAll().subscribe((result: Price[]) => {
    this.priceService.getAll().subscribe((result: Price[]) => {
      this.setPrices(result);
    }, (error) => {});
    // }, (error) => {}));
  }

  private getAllCompany() {
    // this.subscriptions.add(this.companyService.getAll().subscribe((result: Company[]) => {
    this.companyService.getAll().subscribe((result: Company[]) => {
      this.setCompanies(result);
    }, (error) => {});
    // }, (error) => {}));
  }

  protected getAllSki() {
    // this.subscriptions.add(this.skiService.getAll().subscribe((result: Ski[]) => {
    this.skiService.getAll().subscribe((result: Ski[]) => {
      this.setSkis(result);
    }, (error) => {});
    // }, (error) => {}));
  }

  private getAllUser() {
    // this.subscriptions.add(this.userService.getAll().subscribe((result: User[]) => {
    this.userService.getAll().subscribe((result: User[]) => {
      this.setUsers(result);
    }, (error) => {});
    // }, (error) => {}));
  }

  protected getAllProducers() {
    // this.subscriptions.add(this.producerService.getAll().subscribe((result: Producer[]) => {
    this.producerService.getAll().subscribe((result: Producer[]) => {
      this.setProducers(result);
    }, (error) => {});
    // }, (error) => {}));
  }

}
