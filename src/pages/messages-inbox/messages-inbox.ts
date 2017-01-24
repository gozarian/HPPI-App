import { Component } from '@angular/core';

import { NavController, ViewController, LoadingController } from 'ionic-angular';
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

  loading;
  messages: Message[] = [];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private messageProvider: MessageProvider
  ) {
    viewCtrl.willEnter.subscribe(() => {
      this.getMessages();
    });
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });
    this.loading.present();
  }

  closeLoading() {
    if (this.loading == 'undefined') { return; };
    this.loading.dismiss();
  }

  getMessages(): void {
    this.presentLoading();
    this.messageProvider.getMessages().subscribe(
      messages => this.messages = messages
    );
    this.closeLoading();
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

  openMessage(message) {
    this.navCtrl.push(MessagesDetailPage, {message:message});
  }
}
