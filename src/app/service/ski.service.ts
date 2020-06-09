import { Injectable } from '@angular/core';
import { SetUpHttpService } from './../set-up-http.service';

@Injectable({
  providedIn: 'root'
})
export class SkiService {
  url = 'api/ski';
  constructor(private httpClient: SetUpHttpService) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  delete(ski) {
    return this.httpClient.delete(this.url, ski);
  }

  updateSki(ski) {
    return this.httpClient.put(this.url, ski);
  }

  addSki(ski) {
    return this.httpClient.post(this.url, ski);
  }
}
