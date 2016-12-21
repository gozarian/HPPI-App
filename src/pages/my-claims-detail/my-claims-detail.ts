import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-my-claims-detail',
  templateUrl: 'my-claims-detail.html'
})
export class MyClaimsDetailPage {

  claim = {
    date: Date(),
    number: '',
    petName: '',
    petImage: '',
    status: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.claim = {
      petName: navParams.get('petName'),
      petImage: navParams.get('petImage'),
      number: navParams.get('number'),
      date: navParams.get('date'),
      status: navParams.get('statusMessage')
    }
  }

}
