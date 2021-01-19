import { SubscribeDataCompanyService } from './../service/subscribe-data-company.service';
import { Producer } from './../interface/producer';
import { Component, OnInit } from '@angular/core';
import { ProducerService } from '../service/producer.service';

@Component({
  selector: 'app-company-add-producer',
  templateUrl: './company-add-producer.component.html',
  styleUrls: ['./company-add-producer.component.css']
})
export class CompanyAddProducerComponent implements OnInit {
  producers: Producer[] = [];
  disabledEdit: boolean[] = [];
  newProducer = {name: ''};
  constructor(private producerService: ProducerService, private subscribeDataCompanyService: SubscribeDataCompanyService) { }

  ngOnInit(): void {
    this.getAllProducers();
  }

  getAllProducers() {
    this.producerService.getAll().subscribe((result: Producer[]) => {
      this.producers = result;
      this.disabledEdit = result.map(r => true);
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addPrice() {
    this.producerService.addProducer(this.newProducer).subscribe((success) => {
      console.log('Sukces');
      this.getAllProducers();
    }, (error) => {
      console.log('Error');
    });
    this.subscribeDataCompanyService.getAllData();
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.producerService.updateProducer(this.producers[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllProducers();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.producerService.delete(this.producers[id]).subscribe((success) => {
        this.producers.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }
}
