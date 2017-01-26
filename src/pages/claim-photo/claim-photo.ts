import { Component } from '@angular/core';
import { Camera } from 'ionic-native';

import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ClaimVerifyPage } from '../claim-verify/claim-verify';
import { Policy } from '../../models/policy';

@Component({
  selector: 'page-claim-photo',
  templateUrl: 'claim-photo.html'
})
export class ClaimPhotoPage {
  public photos: Array<string> = [];

  policy;
  prev_page_name = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.policy = <Policy>(navParams.get('policy'));
    this.prev_page_name = navParams.get('prev_page_name');
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(this.prev_page_name);
  }

  submitClaim(policy) {
    this.navCtrl.push(ClaimVerifyPage, {policy:policy, photos:this.photos, prev_page_name:'Uploads'});
  }

  addPhoto() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      correctOrientation: true
    }).then((imageData) => {
     this.photos.push(imageData);
    }, (err) => {

    });
  }

  deletePhoto(index: number) {
    this.photos.splice(index, 1);
  }
}
