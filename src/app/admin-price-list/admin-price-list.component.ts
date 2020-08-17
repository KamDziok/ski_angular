import { Component, OnInit, OnDestroy } from '@angular/core';
import { PriceService } from '../service/price.service';
import { UnitService } from '../service/unit.service';
import { Subscription } from 'rxjs';
import {Price} from '../interface/price';
import {Unit} from '../interface/unit';

@Component({
  selector: 'app-admin-price-list',
  templateUrl: './admin-price-list.component.html',
  styleUrls: ['./admin-price-list.component.css']
})
export class AdminPriceListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  prices: Price[] = [];
  units: Unit[] = [];
  disabledEdit: boolean[] = [];
  newPrice = {value: 0.0, unit: null};
  constructor(private priceService: PriceService, private unitService: UnitService) { }

  ngOnInit(): void {
    this.getAllPrices();
  }

  getAllUnits() {
    this.subscriptions.add(this.unitService.getAll().subscribe((result: Unit[]) => {
      this.units = result;
      for (const unit of this.units) {
        for (const price of this.prices) {
            if (price.unit.id === unit.id) {
              price.unit = unit;
            }
        }
      }
      console.log(result);
      this.disabledEdit = result.map(r => true);
    }, (error) => {}));
  }

  getAllPrices() {
    this.priceService.getAll().subscribe((result: Price[]) => {
      this.prices = result;
      this.disabledEdit = result.map(r => true);
      this.getAllUnits();
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addPrice() {
    this.priceService.addPrice(this.newPrice).subscribe((success) => {
      console.log('Sukces');
      this.getAllPrices();
    }, (error) => {
      console.log('Error');
    });
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.priceService.updatePrice(this.prices[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllPrices();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.priceService.delete(this.prices[id]).subscribe((success) => {
        this.prices.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
