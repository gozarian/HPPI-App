import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
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
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.chosenPet = navParams.data;
  }

  noDateWarning() {
    let alert = this.alertCtrl.create({
      title: 'No Date Chosen',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('Choose Pet');
  }

  addPhoto(pet) {
    if (this.myDate == undefined) {
      this.noDateWarning();
      return;
    } else {
      this.navCtrl.push(ClaimPhotoPage, pet);
    }
  }
}
