import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FAQContentPage } from './faq-content';

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html'
})
export class FAQPage {

  constructor(public navCtrl: NavController) {

  }
}
