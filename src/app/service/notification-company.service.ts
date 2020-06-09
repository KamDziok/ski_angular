import { Injectable } from '@angular/core';
import { SetUpHttpService } from './../set-up-http.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationCompanyService {
  url = 'api/notification-company';
  constructor(private httpClient: SetUpHttpService) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  delete(notificationCompany) {
    return this.httpClient.delete(this.url, notificationCompany);
  }

  updateNotificationCompany(notificationCompany) {
    return this.httpClient.put(this.url, notificationCompany);
  }

  addNotificationCompany(notificationCompany) {
    return this.httpClient.post(this.url, notificationCompany);
  }
}
