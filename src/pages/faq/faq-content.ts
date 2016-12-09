import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-faq-content',
  templateUrl: 'faq-content.html'
})
export class FAQContentPage {

  faq = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.faq = {
      title: navParams.get('title'),
      content: navParams.get('content')
    }
  }
}
