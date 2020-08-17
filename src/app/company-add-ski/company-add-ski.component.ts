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
  skis: object[] = [];
  producers: object[] = [];
  disabledEdit: boolean[] = [];
  newSki = {name: '', length: 0.0, type: '', producer: null};
  constructor(private producerService: ProducerService, private skiService: SkiService) { }

  ngOnInit(): void {
    this.getAllSki();
  }

  getAllProducers() {
    // @ts-ignore
    this.subscriptions.add(this.producerService.getAll().subscribe((result: any[]) => {
      this.producers = result;
      for (const producer of this.producers) {
        for (const ski of this.skis) {
          // @ts-ignore
          if (ski.producer.id === producer.id) {
            // @ts-ignore
            ski.producer = producer;
          }
        }
      }
      console.log(result);
      this.disabledEdit = result.map(r => true);
    }, (error) => {}));
  }

  getAllSki() {
    this.skiService.getAll().subscribe((result: object[]) => {
      this.skis = result;
      this.disabledEdit = result.map(r => true);
      this.getAllProducers();
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
