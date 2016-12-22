import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MyClaimsDetailPage } from '../my-claims-detail/my-claims-detail';

@Component({
  selector: 'page-my-claims',
  templateUrl: 'my-claims.html'
})
export class MyClaimsPage {

  claims = [
    {
      petName: 'Jackson',
      petImage: 'assets/test-imgs/test-pet-1.png',
      number: 11123,
      date: '3/16/15',
      status: 'progress',
      statusMessage: 'In Progress'
    },
    {
      petName: 'Jackson',
      petImage: 'assets/test-imgs/test-pet-1.png',
      number: 10113,
      date: '1/19/15',
      status: 'warning',
      statusMessage: 'Your Action Needed'
    }
  ];

  constructor(public navCtrl: NavController) {

  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

  openClaim(claim) {
    this.navCtrl.push(MyClaimsDetailPage, claim);
  }

}
