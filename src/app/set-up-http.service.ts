import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetUpHttpService {
  host = 'http://localhost:8081/';
  constructor(private httpClient: HttpClient) { }

  makeFullUrl(url: string) {
    return this.host + url;
  }
  get(url) {
    url = this.makeFullUrl(url);
    return this.httpClient.get(url);
  }
  post(url, body) {
    url = this.makeFullUrl(url);
    return this.httpClient.post(url, body);
  }
  put(url, body) {
    url = this.makeFullUrl(url);
    return this.httpClient.put(url, body);
  }
  delete(url, body) {
    url = this.makeFullUrl(url);
    return this.httpClient.request('delete', url, {body});
  }
}
