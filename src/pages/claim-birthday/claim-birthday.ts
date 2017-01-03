import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ClaimPhotoPage } from '../claim-photo/claim-photo'

@Component({
  selector: 'page-claim-birthday',
  templateUrl: 'claim-birthday.html'
})
export class ClaimBirthdayPage {
  public myDate;

  chosenPet;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.chosenPet = navParams.data;
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('Choose Pet');
  }

  addPhoto(pet) {
    this.navCtrl.push(ClaimPhotoPage, pet);
  }
}
