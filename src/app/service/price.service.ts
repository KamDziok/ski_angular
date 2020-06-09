import { Injectable } from '@angular/core';
import { SetUpHttpService } from './../set-up-http.service';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  url = 'api/price';
  constructor(private httpClient: SetUpHttpService) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  delete(price) {
    return this.httpClient.delete(this.url, price);
  }

  updatePrice(price) {
    return this.httpClient.put(this.url, price);
  }

  addPrice(price) {
    return this.httpClient.post(this.url, price);
  }
}
