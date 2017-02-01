import { Component } from '@angular/core';
import { Camera } from 'ionic-native';
import { Observable } from 'rxjs/Rx';
import { NavController, NavParams, ViewController, AlertController, Alert } from 'ionic-angular';
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
    public alertCtrl: AlertController,
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
    this.showPhotoInstructions()
  }

  deletePhoto(index: number) {
    this.photos.splice(index, 1);
  }

  showCamera() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      correctOrientation: true
    }).then((imageData) => {
     this.photos.push(imageData);
    }, (err) => {

    });
  }

  showPhotoInstructions() {

      // TODO: Check user decision to hide instructions and return
      var prompt = this.alertCtrl.create({
        title: 'New Claim',
        message: "Snap a photo of each page of the invoice you received from your veterinary hostpital. Place the invoice in a well-lit area and align the edges of the page with your screen.",
        buttons: [
            {
              text: 'Don\'t Show Again',
              handler: () => {
                // TODO: Store user decision to hide instructions
                prompt.dismiss().then(()=> {
                  this.showCamera()
                })
              }
            },
            {
              text: 'OK',
              handler: () => {
                prompt.dismiss().then(()=> {
                  this.showCamera()
                })
              }
            }
        ]
      });

      prompt.present();
  }
}
