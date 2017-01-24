import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { MessageProvider } from '../../providers/message.provider';
import { Message, MessageAction } from '../../models/message';
import { PaymentPage } from '../payment/payment';
import { MyClaimsPage } from '../my-claims/my-claims';

@Component({
  selector: 'page-messages-detail',
  templateUrl: 'messages-detail.html',
  providers: [MessageProvider]
})
export class MessagesDetailPage implements OnInit {

  message:Message;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private messageProvider: MessageProvider
  ) {

    this.message = <Message>({
      id:navParams.get('id'),
      account_id:navParams.get('account_id'),
      title:navParams.get('title'),
      content:navParams.get('content'),
      unread:navParams.get('unread'),
      time_ago:navParams.get('time_ago'),
      date_created:navParams.get('date_created'),
    });
  }

  ngOnInit(): void {
    if (this.message.unread) {
      this.messageProvider.markMessageRead(this.message)
      .subscribe(() => {
        this.message.unread = false;
      });
    }
  }

  messageAction(message:Message) {
    if (message.action == MessageAction.payment) {
      this.navCtrl.push(PaymentPage);
    }
    else if (message.action == MessageAction.claims) {
      this.navCtrl.push(MyClaimsPage);
    }
  }

  deleteMessage(message:Message) {
    this.messageProvider.deleteMessage(message)
    .subscribe(() => {
      this.navCtrl.pop();
    })
  }
}
