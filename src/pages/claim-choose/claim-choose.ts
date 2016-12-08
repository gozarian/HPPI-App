import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ClaimBirthdayPage } from '../claim-birthday/claim-birthday'

@Component({
  selector: 'page-claim-choose',
  templateUrl: 'claim-choose.html'

})
export class ClaimChoosePage {

  chosenPet: boolean = false;

  pets = [
    { name: 'Jackson',
      img: 'assets/test-imgs/test-pet-1.png'
    },
    { name: 'Vincent Van Vurrball',
      img: 'assets/test-imgs/test-pet-2.png'
    }
  ];

  constructor(public navCtrl: NavController) {

  }

  choosePet(pet) {
    this.navCtrl.push(ClaimBirthdayPage, pet);
  }
}
