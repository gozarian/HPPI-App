import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MessagesDetailPage } from '../messages-detail/messages-detail';
import { MessageProvider } from '../../providers/message.provider';
import { Message } from '../../models/message';

@Component({
  selector: 'page-messages-inbox',
  templateUrl: 'messages-inbox.html',
  providers: [MessageProvider]
})
export class MessagesInboxPage implements OnInit {

  messages: Message[] = [];

  constructor(
    public navCtrl: NavController,
    private messageProvider: MessageProvider) {}

  getMessages(): void {
    this.messageProvider.getMessages().subscribe(
      messages => this.messages = messages
    );
  }

  ngOnInit(): void {
    this.getMessages();
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

  openMessage(message) {
    this.navCtrl.push(MessagesDetailPage, message);
  }
}
