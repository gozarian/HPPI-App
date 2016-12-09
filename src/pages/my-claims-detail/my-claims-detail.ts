import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-my-claims-detail',
  templateUrl: 'my-claims-detail.html'
})
export class MyClaimsDetailPage {

  claim = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.claim = {
      petName: navParams.get('petName'),
      petPicture: navParams.get('petPicture'),
      number: navParams.get('number'),
      date: navParams.get('date'),
      status: navParams.get('status')
    }
  }

}
