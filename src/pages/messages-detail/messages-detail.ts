import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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

  loading;
  message:Message;
  show_action_button = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private messageProvider: MessageProvider
  ) {

    this.message = <Message>(navParams.get('message'));

    if (this.message.action != MessageAction.none) {
      this.show_action_button = true;
    }
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

  ngOnInit(): void {
    if (this.message.unread) {
      this.messageProvider.markMessageRead(this.message)
      .subscribe(() => {
        this.message.unread = false;
      });
    }
  }

  confirmDelete(message:Message) {
    let alert = this.alertCtrl.create({
      title: 'Delete message?',
      cssClass: 'hp-alerts',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm clicked');
            this.deleteMessage(message);
          }
        }
      ]
    });
    alert.present();
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
    this.presentLoading();
    this.messageProvider.deleteMessage(message)
    .finally(
      () => {
        this.closeLoading();
      }
    )
    .subscribe(() => {
      this.navCtrl.pop();
    })
  }
}
