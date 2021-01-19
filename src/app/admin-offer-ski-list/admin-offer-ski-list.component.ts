import { SubscribeDataAdminService } from './../service/subscribe-data-admin.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferSkiService } from '../service/offer-ski.service';
import { PriceService } from '../service/price.service';
import { CompanyService } from '../service/company.service';
import { SkiService } from '../service/ski.service';
import {Company} from '../interface/company';
import {Ski} from '../interface/ski';
import {OfferSki} from '../interface/offer-ski';

@Component({
  selector: 'app-admin-offer-ski-list',
  templateUrl: './admin-offer-ski-list.component.html',
  styleUrls: ['./admin-offer-ski-list.component.css']
})
export class AdminOfferSkiListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  companies: Company[] = [];
  skis: Ski[] = [];
  offerSkis: OfferSki[] = [];
  disabledEdit: boolean[] = [];
  startOffer = '';
  stopOffer = '';
  newOfferSki = {city: '', startOffer: null, stopOffer: null, quantity: 0, company: null, priceForDay: 0.0, ski: null};
  constructor( private subscribeDataAdminService: SubscribeDataAdminService, private offerSkiService: OfferSkiService
              ) { }

  ngOnInit(): void {
    this.getAllCompany();
    this.getAllSki();
    this.getAllOfferSki();
  }

  getAllCompany() {
    this.companies = this.subscribeDataAdminService.getCompanies();
  }

  getAllSki() {
    this.skis = this.subscribeDataAdminService.getSkis();
  }

  getAllOfferSki() {
    this.offerSkiService.getAll().subscribe((result: OfferSki[]) => {
      this.offerSkis = result;
      for (const offerSki of this.offerSkis) {
        for (const company of this.companies) {
          if (offerSki.company.id === company.id) {
            offerSki.company = company;
            break;
          }
        }
        for (const ski of this.skis) {
          if (offerSki.ski.id === ski.id) {
            offerSki.ski = ski;
            break;
          }
        }
      }
      this.disabledEdit = result.map(r => true);
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addOfferSki() {
    this.offerSkiService.addOfferSki(this.newOfferSki).subscribe((success) => {
      console.log('Sukces');
      this.getAllOfferSki();
    }, (error) => {
      console.log('Error');
    });
    this.subscribeDataAdminService.getAllData();
  }

  save(id) {
    this.offerSkis[id].startOffer = new Date(this.offerSkis[id].startOffer);
    this.offerSkis[id].stopOffer = new Date(this.offerSkis[id].stopOffer);
    this.disabledEdit[id] = true;
    this.offerSkiService.updateOfferSki(this.offerSkis[id]).subscribe((success) => {
      console.log('Sukces');
    }, (error => {
      console.log('Error');
    }));
  }

  delete(id) {
    this.offerSkiService.delete(this.offerSkis[id]).subscribe((success) => {
        this.offerSkis.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
