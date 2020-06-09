import { Injectable } from '@angular/core';
import { SetUpHttpService } from './../set-up-http.service';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  url = 'api/unit';
  constructor(private httpClient: SetUpHttpService) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  delete(unit) {
    return this.httpClient.delete(this.url, unit);
  }

  updateUnit(unit) {
    return this.httpClient.put(this.url, unit);
  }

  addUnit(unit) {
    return this.httpClient.post(this.url, unit);
  }
}
