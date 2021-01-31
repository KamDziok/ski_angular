import { OfferSki } from './../interface/offer-ski';
import { Picture } from './../interface/picture';
import { SubscribeDataAdminService } from './../service/subscribe-data-admin.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferSkiService } from '../service/offer-ski.service';
import { CompanyService } from '../service/company.service';
import { SkiService } from '../service/ski.service';
import {Company} from '../interface/company';
import {Ski} from '../interface/ski';

@Component({
  selector: 'app-admin-offer-ski-list',
  templateUrl: './admin-offer-ski-list.component.html',
  styleUrls: ['./admin-offer-ski-list.component.css']
})
export class AdminOfferSkiListComponent implements OnInit, OnDestroy {
  innerHeight = 0;
  subscriptions: Subscription = new Subscription();
  companies: Company[] = [];
  skis: Ski[] = [];
  offerSkis: OfferSki[] = [];
  disabledEdit: boolean[] = [];
  startOffer = '';
  stopOffer = '';
  selectedFile = undefined;
  newOfferSki = {} as OfferSki;
  // newOfferSki = {city: '', startOffer: null, stopOffer: null, quantity: 0, company: null, priceForDay: 0.0, ski: null};
  constructor( private subscribeDataAdminService: SubscribeDataAdminService, private offerSkiService: OfferSkiService
              ) { }

  ngOnInit(): void {
    this.innerHeight = window.innerHeight;
    this.getAllCompany();
    this.getAllSki();
    this.getAllOfferSki();
  }

  clearNewOfferSki(){
    this.newOfferSki.id=null;
    this.newOfferSki.city=null;
    this.newOfferSki.company=null;
    this.newOfferSki.pictures=null;
    this.newOfferSki.priceForDay=null;
    this.newOfferSki.quantity=null;
    this.newOfferSki.ski=null;
    this.newOfferSki.startOffer=null;
    this.newOfferSki.stopOffer=null;
  }

  refresh(){
    this.clearNewOfferSki();
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
    this.disabledEdit[id] = !this.disabledEdit[id];
    if(this.disabledEdit[id]==true){
      this.getAllOfferSki();
    }
  }

  onFileChanged(event){
    this.selectedFile = event.target.files[0];
  }

  addOfferSki() {
    this.offerSkiService.prepareToAddOfferSki(this.newOfferSki).subscribe((success2) => {
      console.log(success2);
      this.offerSkiService.addOfferSki(this.newOfferSki).subscribe((success) => {
        console.log('Sukces');
        this.refresh();
      }, (error) => {
        console.log('Error');
        this.refresh();
      });
    }, (error) => {
      console.log('Error_prepare');
    })
    
  }

  uploadImg(offerSki: OfferSki, id){
    let newImg = null;
    const file = this.selectedFile;
    const uploadImageData = new FormData();
    if(this.selectedFile !== undefined){
      uploadImageData.append('imageFile', file, file.name);
      this.offerSkiService.addImage(offerSki, uploadImageData).subscribe((success: Picture) =>{
        newImg = success;
        offerSki.pictures.push(newImg);
        this.offerSkis[id].startOffer = new Date(this.offerSkis[id].startOffer);
        if(this.offerSkis[id].stopOffer!=null){
          this.offerSkis[id].stopOffer = new Date(this.offerSkis[id].stopOffer);
        }     
        this.disabledEdit[id] = true;
        this.offerSkiService.updateOfferSki(this.offerSkis[id]).subscribe((success) => {
          console.log('Sukces');
        }, (error => {
          console.log('Error');
        }));
      }, (error) => {
        console.log('Error');
      })
    }
    this.selectedFile = undefined;
  }

  delImg(idOfferSki, indexImg){
    this.offerSkis[idOfferSki].pictures.splice(indexImg, 1);
  }

  save(id) {
    if(this.selectedFile!==undefined){
      this.uploadImg(this.offerSkis[id], id)
    }else{
      this.offerSkis[id].startOffer = new Date(this.offerSkis[id].startOffer);
      if(this.offerSkis[id].stopOffer!=null){
        this.offerSkis[id].stopOffer = new Date(this.offerSkis[id].stopOffer);
      }      
      this.disabledEdit[id] = true;
      this.offerSkiService.updateOfferSki(this.offerSkis[id]).subscribe((success) => {
        console.log('Sukces');
        this.refresh();
      }, (error => {
        console.log('Error');
        this.refresh();
      }));
    }
  }

  delete(id) {
    this.offerSkiService.delete(this.offerSkis[id]).subscribe((success) => {
        this.offerSkis.splice(id, 1);
        this.refresh();
      },
      (error) => {
        console.log('Error');
        this.refresh();
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = window.innerWidth;
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}