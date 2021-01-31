import { SubscribeDataCompanyService } from './../service/subscribe-data-company.service';
import { OfferSki } from './../interface/offer-ski';
import { Ski } from './../interface/ski';
import { Company } from './../interface/company';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferSkiService } from '../service/offer-ski.service';
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
  companies: Company[] = [];
  skis: Ski[] = [];
  offerSkis: OfferSki[] =[];
  disabledEdit: boolean[] = [];
  startOffer = '';
  stopOffer = '';
  newOfferSki = {} as OfferSki;
  constructor(private offerSkiService: OfferSkiService, private subscribeDataCompanyService: SubscribeDataCompanyService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getAllOfferSki();
  }

  clear(){
    this.newOfferSki = {} as OfferSki;
  }

  refresh(){
    this.clear();
    this.getAllCompany();
    this.getAllSki();
    this.getAllOfferSki();
  }

  getAllCompany() {
  }

  getAllSki() {
    this.skis = this.subscribeDataCompanyService.getSkis();
  }

  getAllOfferSki() {
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
      }
      this.disabledEdit = result.map(r => true);
      
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
    if(this.disabledEdit[id]==true){
      this.getAllOfferSki();
    }
  }

  addOfferSki() {
    this.newOfferSki.startOffer = new Date(this.newOfferSki.startOffer);
    if (this.stopOffer !== ''){
      this.newOfferSki.stopOffer = new Date(this.newOfferSki.stopOffer);
    }
    this.newOfferSki.company = this.user.company;
    console.log(this.newOfferSki);
    this.offerSkiService.addOfferSki(this.newOfferSki).subscribe((success) => {
      console.log('Sukces');
      this.refresh();
    }, (error) => {
      console.log('Error');
    });
    this.subscribeDataCompanyService.getAllData();
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
      this.refresh();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.offerSkiService.delete(this.offerSkis[id]).subscribe((success) => {
        this.offerSkis.splice(id, 1);
        this.refresh();
      },
      (error) => {
        console.log('Error');
      });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
