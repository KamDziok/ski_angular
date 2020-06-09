import { Injectable } from '@angular/core';
import { SetUpHttpService } from './../set-up-http.service';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {
  url = 'api/producer';
  constructor(private httpClient: SetUpHttpService) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  delete(producer) {
    return this.httpClient.delete(this.url, producer);
  }

  updateProducer(producer) {
    return this.httpClient.put(this.url, producer);
  }

  addProducer(producer) {
    return this.httpClient.post(this.url, producer);
  }
}
