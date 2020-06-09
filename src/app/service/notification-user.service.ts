import { Injectable } from '@angular/core';
import { SetUpHttpService } from './../set-up-http.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationUserService {
  url = 'api/notification-user';
  constructor(private httpClient: SetUpHttpService) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  delete(notificationUser) {
    return this.httpClient.delete(this.url, notificationUser);
  }

  updateNotificationUser(notificationUser) {
    return this.httpClient.put(this.url, notificationUser);
  }

  addNotificationUser(notificationUser) {
    return this.httpClient.post(this.url, notificationUser);
  }
}
