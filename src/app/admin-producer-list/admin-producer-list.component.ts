import { SubscribeDataAdminService } from './../service/subscribe-data-admin.service';
import { Component, OnInit } from '@angular/core';
import { ProducerService } from '../service/producer.service';
import {Producer} from '../interface/producer';

@Component({
  selector: 'app-admin-producer-list',
  templateUrl: './admin-producer-list.component.html',
  styleUrls: ['./admin-producer-list.component.css']
})
export class AdminProducerListComponent implements OnInit {
  producers: Producer[] = [];
  disabledEdit: boolean[] = [];
  newProducer = {} as Producer;
  constructor(private producerService: ProducerService, private subscribeDataAdminService: SubscribeDataAdminService) { }

  ngOnInit(): void {
    this.getAllProducers();
  }

  clear(){
    this.newProducer = {} as Producer;
  }

  refresh(){
    this.clear();
    this.getAllProducers();
  }

  getAllProducers() {
    this.producerService.getAll().subscribe((result: Producer[]) => {
      this.producers = result;
      this.disabledEdit = result.map(r => true);
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = !this.disabledEdit[id];
    if(this.disabledEdit[id] == true){
      this.getAllProducers();
    }
  }

  addPrice() {
    this.producerService.addProducer(this.newProducer).subscribe((success) => {
      console.log('Sukces');
      this.refresh();
    }, (error) => {
      console.log('Error');
    });
    this.subscribeDataAdminService.getAllData();
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.producerService.updateProducer(this.producers[id]).subscribe((success) => {
      console.log('Sukces');
      this.refresh();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.producerService.delete(this.producers[id]).subscribe((success) => {
        this.producers.splice(id, 1);
        this.refresh();
      },
      (error) => {
        console.log('Error');
      });
  }
}
