import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { MessageProvider } from '../../providers/message.provider';
import { Message } from '../../models/message';

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
        debugger;
        this.message.unread = false;
      });
    }
  }
}
