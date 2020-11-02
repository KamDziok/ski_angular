import { SubscribeDataCompanyService } from './../service/subscribe-data-company.service';
import { OfferSki } from './../interface/offer-ski';
import { Ski } from './../interface/ski';
import { Company } from './../interface/company';
import { Price } from './../interface/price';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferSkiService } from '../service/offer-ski.service';
import { PriceService } from '../service/price.service';
import { CompanyService } from '../service/company.service';
import { SkiService } from '../service/ski.service';
import {UserService} from '../service/user.service';
import {User} from '../interface/user';

@Component({
  selector: 'app-company-add-offer-ski',
  templateUrl: './company-add-offer-ski.component.html',
  styleUrls: ['./company-add-offer-ski.component.css']
})
export class CompanyAddOfferSkiComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  user: User;
  prices: Price[] = [];
  companies: Company[] = [];
  skis: Ski[] = [];
  offerSkis: OfferSki[] =[];
  disabledEdit: boolean[] = [];
  startOffer = '';
  stopOffer = '';
  newOfferSki = {city: '', startOffer: null, stopOffer: null, company: null, priceForDay: null, ski: null};
  constructor(private offerSkiService: OfferSkiService, private subscribeDataCompanyService: SubscribeDataCompanyService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getAllOfferSki();
  }

  // getAllPrices() {
  //   this.prices = this.subscribeDataCompanyService.getPrices();
  //   // // @ts-ignore
  //   // this.subscriptions.add(this.priceService.getAll().subscribe((result: any[]) => {
  //   //   this.prices = result;
  //   //   for (const price of this.prices) {
  //   //     for (const offerSki of this.offerSkis) {
  //   //       // @ts-ignore
  //   //       if (offerSki.price.id === price.id) {
  //   //         // @ts-ignore
  //   //         offerSki.price = price;
  //   //       }
  //   //     }
  //   //   }
  //   //   console.log(result);
  //   //   this.disabledEdit = result.map(r => true);
  //   // }, (error) => {}));
  // }

  getAllCompany() {
    // // @ts-ignore
    // this.subscriptions.add(this.companyService.getAll().subscribe((result: any[]) => {
    //   this.companies = result;
    //   for (const company of this.companies) {
    //     for (const offerSki of this.offerSkis) {
    //       // @ts-ignore
    //       if (offerSki.company.id === company.id) {
    //         // @ts-ignore
    //         offerSki.company = company;
    //       }
    //     }
    //   }
    //   console.log(result);
    //   this.disabledEdit = result.map(r => true);
    // }, (error) => {}));
  }

  getAllSki() {
    this.skis = this.subscribeDataCompanyService.getSkis();
    // // @ts-ignore
    // this.subscriptions.add(this.skiService.getAll().subscribe((result: any[]) => {
    //   this.skis = result;
    //   for (const ski of this.skis) {
    //     for (const offerSki of this.offerSkis) {
    //       // @ts-ignore
    //       if (offerSki.ski.id === ski.id) {
    //         // @ts-ignore
    //         offerSki.ski = ski;
    //       }
    //     }
    //   }
    //   console.log(result);
    //   this.disabledEdit = result.map(r => true);
    // }, (error) => {}));
  }

  getAllOfferSki() {
    // this.getAllPrices();
      // this.getAllCompany();
      this.getAllSki();
    this.offerSkiService.getAllCompany(this.user.company).subscribe((result: OfferSki[]) => {
      console.log(result);
      this.offerSkis = result;
      for (const offerSki of this.offerSkis) {
        for (const ski of this.skis) {
          if (offerSki.ski.id === ski.id) {
            offerSki.ski = ski;
          }
        }
        // for (const price of this.prices) {
        //   if (offerSki.price.id === price.id) {
        //     offerSki.price = price;
        //   }
        // }
      }
      this.disabledEdit = result.map(r => true);
      
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
    // @ts-ignore
    this.offerSkis[id].startOffer = new Date(this.offerSkis[id].startOffer);
    // @ts-ignore
    if (this.offerSkis[id].stopOffer !== ''){
      // @ts-ignore
      this.offerSkis[id].stopOffer = new Date(this.offerSkis[id].stopOffer);
    }
    this.disabledEdit[id] = true;
    this.offerSkiService.updateOfferSki(this.offerSkis[id]).subscribe((success) => {
      console.log('Sukces');
      // this.getAllPrices();
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
