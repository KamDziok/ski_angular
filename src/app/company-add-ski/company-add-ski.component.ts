import { SubscribeDataCompanyService } from './../service/subscribe-data-company.service';
import { Producer } from './../interface/producer';
import { Ski } from './../interface/ski';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProducerService } from '../service/producer.service';
import { SkiService } from '../service/ski.service';

@Component({
  selector: 'app-company-add-ski',
  templateUrl: './company-add-ski.component.html',
  styleUrls: ['./company-add-ski.component.css']
})
export class CompanyAddSkiComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  skis: Ski[] = [];
  producers: Producer[] = [];
  disabledEdit: boolean[] = [];
  newSki = {name: '', lengthSki: 0.0, type: '', producer: null};
  constructor(private subscribeDataCompanyService: SubscribeDataCompanyService, private skiService: SkiService) { }

  ngOnInit(): void {
    this.getAllSki();
  }

  getAllProducers() {
    this.producers = this.subscribeDataCompanyService.getProducers();
  }

  getAllSki() {
    this.getAllProducers();
    this.skiService.getAll().subscribe((result: Ski[]) => {
      this.skis = result;
      for (const producer of this.producers) {
        for (const ski of this.skis) {
          if (ski.producer.id === producer.id) {
            ski.producer = producer;
          }
        }
      }
      this.disabledEdit = result.map(r => true);
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addSki() {
    this.skiService.addSki(this.newSki).subscribe((success) => {
      console.log('Sukces');
      this.getAllSki();
    }, (error) => {
      console.log('Error');
    });
    this.subscribeDataCompanyService.getAllData();
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.skiService.updateSki(this.skis[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllSki();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.skiService.delete(this.skis[id]).subscribe((success) => {
        this.skis.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
