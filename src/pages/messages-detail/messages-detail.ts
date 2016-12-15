import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-messages-detail',
  templateUrl: 'messages-detail.html'
})
export class MessagesDetailPage {

  message = {
    date: Date(),
    title: '',
    content: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.message = {
      title: navParams.get('title'),
      content: navParams.get('content'),
      date: navParams.get('date')
    }
  }

}
