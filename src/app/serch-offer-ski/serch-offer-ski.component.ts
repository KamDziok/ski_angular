import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { OfferSkiService } from '../service/offer-ski.service';
import {Company} from '../interface/company';
import {OfferSki} from '../interface/offer-ski';
import {Ski} from '../interface/ski';
import {CompanyService} from '../service/company.service';
import {SkiService} from '../service/ski.service';
import {Producer} from '../interface/producer';
import {ProducerService} from '../service/producer.service';
import {UserService} from '../service/user.service';
import {User} from '../interface/user';
import {LoginComponent} from '../login/login.component';
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-serch-offer-ski',
  templateUrl: './serch-offer-ski.component.html',
  styleUrls: ['./serch-offer-ski.component.css']
})
export class SerchOfferSkiComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  searchOfferSkis = false;
  offerSkis: OfferSki[] = [];
  companies: Company[] = [];
  skis: Ski[] = [];
  producers: Producer[] = [];
  company: Company;
  producer: Producer;
  ski: Ski;
  offerSki: OfferSki;
  // startOffer = '';
  // stopOffer = '';
  startOffer: Date;
  stopOffer: Date;
  city = '';
  isUserLogin = false;
  currentUser: User = null;
  private loginComponent = null;
  constructor(private offerSkiService: OfferSkiService, private companyService: CompanyService,
              private skiService: SkiService, private producerService: ProducerService,
              public userService: UserService//, private loginComponent: LoginComponent
               ) {}

  ngOnInit(): void {
    this.getAllCompany();
    this.getAllProducers();
    this.getAllSki();
    if (this.userService.getCurrentUser() != null){
      this.currentUser = this.userService.getCurrentUser();
      this.isUserLogin = true;
      this.loginComponent = LoginComponent;
      // this.loginComponent = LoginComponent;
    }
  }

  getAllCompany() {
    this.subscriptions.add(this.companyService.getAll().subscribe((result: Company[]) => {
      this.companies = result;
      for (const company of this.companies) {
        for (const offerSki of this.offerSkis) {
          if (offerSki.company.id === company.id) {
            offerSki.company = company;
          }
        }
      }
      // console.log(result);
    }, (error) => {}));
  }

  getAllSki() {
    this.subscriptions.add(this.skiService.getAll().subscribe((result: Ski[]) => {
      this.skis = result;
      for (const ski of this.skis) {
        for (const offerSki of this.offerSkis) {
          if (offerSki.ski.id === ski.id) {
            offerSki.ski = ski;
          }
        }
      }
      // console.log(result);
    }, (error) => {}));
  }

  getAllProducers() {
    this.subscriptions.add(this.producerService.getAll().subscribe((result: Producer[]) => {
      this.producers = result;
      for (const producer of this.producers) {
        for (const ski of this.skis) {
          if (ski.producer.id === producer.id) {
            ski.producer = producer;
          }
        }
      }
      // console.log(result);
    }, (error) => {}));
  }

  getAllOfferSkiByCity(city) {
      this.offerSkiService.getAllFromCity(city).
        //   .pipe(take(1)).
        subscribe((result: OfferSki[]) => {
          this.offerSkis = result;
          if (this.offerSkis.length > 0){
            this.searchOfferSkis = true;
          } else {
            this.searchOfferSkis = false;
          }
        }, (error) => {
        });
  }

  getAllOfferSkiByDate(begin, end) {
    this.offerSkiService.getAllByData(begin, end)
      .subscribe((result: OfferSki[]) => {
        console.log(result);
        // console.log(result[0].stopOffer);
        // return result;
        this.offerSkis = result;
        if (this.offerSkis.length > 0){
          this.searchOfferSkis = true;
        } else {
          this.searchOfferSkis = false;
        }
        // return this.offerSkis;
      }, (error) => {
        return [];
      });
    return [];
  }

  addToBasket(id){
    this.userService.addOfferSki(this.offerSkis[id], this.startOffer, this.stopOffer);
    // this.userService.offerSkiListSize++;
    // this.loginComponent.basketSize++;
    // this.loginComponent.basket = this.userService.offerSkiList;
  }

  searchOfferSki(){
    // this.getAllOfferSkiByCity(this.city);
    this.getAllOfferSkiByDate(formatDate(this.startOffer, 'dd-MM-y', 'en-US'), formatDate(this.stopOffer, 'dd-MM-y', 'en-US'));
    // this.getAllOfferSkiByDate(this.startOffer, this.stopOffer);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
