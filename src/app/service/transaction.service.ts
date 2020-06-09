import { Injectable } from '@angular/core';
import { SetUpHttpService } from './../set-up-http.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  url = 'api/transaction';
  constructor(private httpClient: SetUpHttpService) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  delete(transaction) {
    return this.httpClient.delete(this.url, transaction);
  }

  updateTransaction(transaction) {
    return this.httpClient.put(this.url, transaction);
  }

  addTransaction(transaction) {
    return this.httpClient.post(this.url, transaction);
  }
}
