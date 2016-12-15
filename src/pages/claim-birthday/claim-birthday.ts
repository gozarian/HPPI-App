import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ClaimPhotoPage } from '../claim-photo/claim-photo'

@Component({
  selector: 'page-claim-birthday',
  templateUrl: 'claim-birthday.html'
})
export class ClaimBirthdayPage {
  public myDate;

  chosenPet = {
    name: '',
    img: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.chosenPet = {
      name: navParams.get('name'),
      img: navParams.get('img')
    }
  }

  addPhoto(pet) {
    this.navCtrl.push(ClaimPhotoPage, pet);
  }
}
