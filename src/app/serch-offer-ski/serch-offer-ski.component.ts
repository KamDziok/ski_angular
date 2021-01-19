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
import {MatDialog} from '@angular/material/dialog';
import {FormGroup, FormControl} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'dialog-allert',
  templateUrl: 'dialog-allert.html',
})
export class DialogAllert {}

@Component({
  selector: 'app-serch-offer-ski',
  templateUrl: './serch-offer-ski.component.html',
  styleUrls: ['./serch-offer-ski.component.css']
})
export class SerchOfferSkiComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  todayDate: any;
  searchOfferSkis = false;
  offerSkis: OfferSki[] = [];
  companies: Company[] = [];
  skis: Ski[] = [];
  producers: Producer[] = [];
  company: Company;
  producer: Producer;
  ski: Ski;
  offerSki: OfferSki;
  startOffer: Date;
  stopOffer: Date;
  city = '';
  isUserLogin = false;
  currentUser: User = null;
  constructor(private offerSkiService: OfferSkiService, private companyService: CompanyService,
              private skiService: SkiService, private producerService: ProducerService,
              public userService: UserService, public dialog: MatDialog
               ) {
                this.todayDate = moment(new Date()).format('YYYY-MM-DD');
               }

  ngOnInit(): void {
    this.getAllCompany();
    this.getAllProducers();
    this.getAllSki();
    if (this.userService.getCurrentUser() != null){
      this.currentUser = this.userService.getCurrentUser();
      this.isUserLogin = true;
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
    }, (error) => {}));
  }

  getAllOfferSkiByCity(city) {
      this.offerSkiService.getAllFromCity(city).
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
        this.offerSkis = result;
        if (this.offerSkis.length > 0){
          this.searchOfferSkis = true;
        } else {
          this.searchOfferSkis = false;
        }
      }, (error) => {
        return [];
      });
    return [];
  }

  getAllOfferSkiByDateAndCity(begin, end, city) {
    this.offerSkiService.getAllByDataAndCity(begin, end, city)
      .subscribe((result: OfferSki[]) => {
        console.log(result);
        this.offerSkis = result;
        if (this.offerSkis.length > 0){
          this.searchOfferSkis = true;
        } else {
          this.searchOfferSkis = false;
        }
      }, (error) => {
        return [];
      });
    return [];
  }

  openDialog() {
    this.dialog.open(DialogAllert);
  }

  addToBasket(id){
    this.offerSkis[id].quantity -= 1;
    this.userService.addOfferSki(this.offerSkis[id], this.range.get('start').value, this.range.get('end').value);
  }

  searchOfferSki(){
    if(this.city === null || this.city === '' || this.range.get('start').value == null || this.range.get('end').value == null){
      this.openDialog();
    } else {
      this.getAllOfferSkiByDateAndCity(formatDate(this.range.get('start').value, 'dd-MM-y', 'en-US'),
                                      formatDate(this.range.get('end').value, 'dd-MM-y', 'en-US'), this.city);
    }
  }

  calDays(start: Date, stop: Date){
    let startDate = new Date(start);
    let stopDate = new Date(stop);
    let time = Math.abs(startDate.getTime() - stopDate.getTime());
    return Math.ceil(time / (1000 * 3600 * 24));
  }

  sumPriceOfferSki(start: Date, stop: Date, offerSki: OfferSki){
    let days = this.calDays(start, stop);
    return offerSki.priceForDay * days;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
