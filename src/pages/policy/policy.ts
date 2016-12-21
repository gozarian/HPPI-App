import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ClaimBirthdayPage } from '../claim-birthday/claim-birthday';

@Component({
  selector: 'page-policy',
  templateUrl: 'policy.html'
})
export class PolicyPage {

  policy = {
    petImage: 'assets/test-imgs/test-pet-1.png',
    petName: 'Jackson',
    petType: 'dog',
    number: '193900',
    startDate: '1/31/2014',
    reimbursement: '80',
    deductible: '250',
    premium: '37.77'
  }

  constructor(public navCtrl: NavController) {

  }

  newClaim() {

    let pet = {
      name: this.policy.petName,
      img: this.policy.petImage
    };

    this.navCtrl.push(ClaimBirthdayPage, pet);
  }
}
