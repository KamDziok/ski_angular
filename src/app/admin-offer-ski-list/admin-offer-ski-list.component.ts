import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferSkiService } from '../service/offer-ski.service';
import { PriceService } from '../service/price.service';
import { CompanyService } from '../service/company.service';
import { SkiService } from '../service/ski.service';
import {Price} from '../interface/price';
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
  prices: Price[] = [];
  companies: Company[] = [];
  skis: Ski[] = [];
  offerSkis: OfferSki[] = [];
  disabledEdit: boolean[] = [];
  startOffer = '';
  stopOffer = '';
  newOfferSki = {city: '', startOffer: null, stopOffer: null, quantity: 0, company: null, price: null, ski: null};
  constructor(private offerSkiService: OfferSkiService, private priceService: PriceService,
              private companyService: CompanyService, private skiService: SkiService) { }

  ngOnInit(): void {
    this.getAllOfferSki();
  }

  getAllPrices() {
    this.subscriptions.add(this.priceService.getAll().subscribe((result: Price[]) => {
      this.prices = result;
      for (const price of this.prices) {
        for (const offerSki of this.offerSkis) {
          if (offerSki.price.id === price.id) {
            offerSki.price = price;
          }
        }
      }
      console.log(result);
      this.disabledEdit = result.map(r => true);
    }, (error) => {}));
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
      console.log(result);
      this.disabledEdit = result.map(r => true);
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
      console.log(result);
      this.disabledEdit = result.map(r => true);
    }, (error) => {}));
  }

  getAllOfferSki() {
    this.offerSkiService.getAll().subscribe((result: OfferSki[]) => {
      this.offerSkis = result;
      this.disabledEdit = result.map(r => true);
      this.getAllPrices();
      this.getAllCompany();
      this.getAllSki();
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addOfferSki() {
    this.newOfferSki.startOffer = new Date(this.startOffer);
    if (this.stopOffer !== ''){
      this.newOfferSki.stopOffer = new Date(this.stopOffer);
    }
    this.offerSkiService.addOfferSki(this.newOfferSki).subscribe((success) => {
      console.log('Sukces');
      this.getAllOfferSki();
    }, (error) => {
      console.log('Error');
    });
  }

  save(id) {
    this.offerSkis[id].startOffer = new Date(this.offerSkis[id].startOffer);
    this.offerSkis[id].stopOffer = new Date(this.offerSkis[id].stopOffer);
    this.disabledEdit[id] = true;
    this.offerSkiService.updateOfferSki(this.offerSkis[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllPrices();
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
