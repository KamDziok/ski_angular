import { Component, OnInit } from '@angular/core';
import { UnitService } from './../service/unit.service';
import {Unit} from '../interface/unit';

@Component({
  selector: 'app-admin-unit-list',
  templateUrl: './admin-unit-list.component.html',
  styleUrls: ['./admin-unit-list.component.css']
})
export class AdminUnitListComponent implements OnInit {
  units: Unit[] = [];
  disabledEdit: boolean[] = [];
  newUnit = {name: ''};
  constructor(private unitService: UnitService) { }

  ngOnInit(): void {
    this.getAllUnits();
  }

  getAllUnits() {
    this.unitService.getAll().subscribe((result: Unit[]) => {
      this.units = result;
      this.disabledEdit = result.map(r => true);
    }, (error) => {});
  }

  makeEnabledEdit(id) {
    this.disabledEdit[id] = false;
  }

  addUnit() {
    this.unitService.addUnit(this.newUnit).subscribe((success) => {
      console.log('Sukces');
      this.getAllUnits();
    }, (error) => {
      console.log('Error');
    });
  }

  save(id) {
    this.disabledEdit[id] = true;
    this.unitService.updateUnit(this.units[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllUnits();
    }, (error => {
      console.log('Error');
    }));
  }
  delete(id) {
    this.unitService.delete(this.units[id]).subscribe((success) => {
        this.units.splice(id, 1);
      },
      (error) => {
        console.log('Error');
      });
  }
}
