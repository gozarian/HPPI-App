import { Component } from '@angular/core';

import { NavController, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MessagesDetailPage } from '../messages-detail/messages-detail';
import { MessageProvider } from '../../providers/message.provider';
import { Message } from '../../models/message';

@Component({
  selector: 'page-messages-inbox',
  templateUrl: 'messages-inbox.html',
  providers: [MessageProvider]
})
export class MessagesInboxPage {

  messages: Message[] = [];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private messageProvider: MessageProvider) {
      viewCtrl.willEnter.subscribe(() => {
        this.getMessages();
      });
    }

  getMessages(): void {
    this.messageProvider.getMessages().subscribe(
      messages => this.messages = messages
    );
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

  openMessage(message) {
    this.navCtrl.push(MessagesDetailPage, message);
  }
}
