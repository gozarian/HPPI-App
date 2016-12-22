import { Component } from '@angular/core';
import { Camera } from 'ionic-native';

import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ClaimVerifyPage } from '../claim-verify/claim-verify';
// import { Camera } from 'ionic-native';

@Component({
  selector: 'page-claim-photo',
  templateUrl: 'claim-photo.html'
})
export class ClaimPhotoPage {
  public photos: Array<string> = [];

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
    Camera.getPicture({
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA
    }).then((imageData) => {
    //  let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.photos.push(imageData);
    }, (err) => {

    });
  }

  deletePhoto(index: number) {
    this.photos.splice(index, 1);
  }
}
