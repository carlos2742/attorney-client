import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  messages: any[];
  constructor() {
    this.messages = [];
  }

  show(text: string, options: any = {}) {
    this.messages.push({ text, ...options });
  }

  remove(message) {
    this.messages = this.messages.filter(t => t !== message);
  }
}
