import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ClaimVerifyPage } from '../claim-verify/claim-verify';
// import { Camera } from 'ionic-native';

@Component({
  selector: 'page-claim-photo',
  templateUrl: 'claim-photo.html'
})
export class ClaimPhotoPage {
  public photoTotal: number = 0;

  testdoc = 'assets/test-imgs/test-doc.png';
  photoArray = Array;

  chosenPet = {
    img: '',
    name: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.chosenPet = {
      name: navParams.get('name'),
      img: navParams.get('img')
    }
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('Choose Date');
  }

  submitClaim(pet) {
    this.navCtrl.push(ClaimVerifyPage, pet);
  }

  addPhoto() {

    if (this.photoTotal < 11) {
      this.photoTotal++;
    }
  }

  deletePhoto() {
    this.photoTotal--;
  }
}
