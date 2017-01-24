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
  show_action_button = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private messageProvider: MessageProvider
  ) {

    this.message = <Message>(navParams.get('message'));

    if (this.message.action != MessageAction.none) {
      this.show_action_button = true;
    }
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
