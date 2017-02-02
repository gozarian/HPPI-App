import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ClaimVerifyPage } from '../claim-verify/claim-verify';
import { Policy } from '../../models/policy';

@Component({
  selector: 'page-claim-photo',
  templateUrl: 'claim-photo.html',
  providers: [Storage]
})
export class ClaimPhotoPage {
  public photos: Array<string> = [];

  policy;
  prev_page_name = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public storage: Storage
  ) {
    this.policy = <Policy>(navParams.get('policy'));
    this.prev_page_name = navParams.get('prev_page_name');
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(this.prev_page_name);
  }

  submitClaim(policy) {
    if (this.photos.length < 1) {
      this.showMissingPhotosAlert();
    }
    else {
      this.navCtrl.push(ClaimVerifyPage, {policy:policy, photos:this.photos, prev_page_name:'Uploads'});
    }
  }

  showMissingPhotosAlert() {
    var alert = this.alertCtrl.create({
      title: 'Missing Invoice Pages',
      message: "Please add a photo of each page of the invoice you received from your veterinary hostpital before submitting your claim.",
      buttons: [
          {
            text: 'OK',
            handler: () => {
              alert.dismiss()
            }
          }
      ]
    });

    alert.present();
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
    // Check user decision to hide instructions and return
    this.storage.get('hidePhotoInstructions').then(hide => {
      if (hide) {
        this.showCamera();
      }
      else {
        var alert = this.alertCtrl.create({
          title: 'New Claim',
          message: "Snap a photo of each page of the invoice you received from your veterinary hostpital. Place the invoice in a well-lit area and align the edges of the page with your screen.",
          buttons: [
              {
                text: 'Don\'t Show Again',
                handler: () => {
                  // Store user decision to hide instructions
                  this.storage.set('hidePhotoInstructions', true);
                  alert.dismiss().then(()=> {
                    this.showCamera()
                  })
                }
              },
              {
                text: 'OK',
                handler: () => {
                  alert.dismiss().then(()=> {
                    this.showCamera()
                  })
                }
              }
          ]
        });

        alert.present();
      }
    });
  }
}
