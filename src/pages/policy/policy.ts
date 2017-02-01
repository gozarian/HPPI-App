import { Component } from '@angular/core';
import { Camera } from 'ionic-native';

import { NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { ClaimBirthdayPage } from '../claim-birthday/claim-birthday';
import { ClaimPhotoPage } from '../claim-photo/claim-photo';
import { PolicyProvider } from '../../providers/policy.provider';
import { Policy } from '../../models/policy';

@Component({
  selector: 'page-policy',
  templateUrl: 'policy.html',
  providers:[PolicyProvider]
})
export class PolicyPage {

  policy;
  previousPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    public policyProvider: PolicyProvider
  ) {
    this.policy = <Policy>(navParams.get('policy'));
    this.previousPage = this.navCtrl.last();

    viewCtrl.willEnter.subscribe(
      () => {
        this.reloadPolicy();
      }
    );
  }

  changePetImage() {

    var imageSourceSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text:"Take Photo",
          handler: () => {
            imageSourceSheet.dismiss().then(
              () => {
                this.showImagePicker(Camera.PictureSourceType.CAMERA)
              }
            )
          }
        },
        {
          text:"Choose Existing",
          handler: () => {
            imageSourceSheet.dismiss().then(
              () => {
                this.showImagePicker(Camera.PictureSourceType.PHOTOLIBRARY)
              }
            )
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            imageSourceSheet.dismiss();
          }
        }
      ]
    });

    imageSourceSheet.present();
  }

  showImagePicker(sourceType) {
    Camera.getPicture({
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      correctOrientation: true,
      allowEdit: true,
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    })
    .then(
      (imageData) => {
        this.policyProvider.updatePetImage(this.policy.pet_id, imageData)
        .finally(() => {
          this.reloadPolicy();
        })
        .subscribe();
      },
      (err) => {

      }
    );
  }

  reloadPolicy() {
    this.policyProvider.getPolicies()
    .subscribe(
      (policies) => {
      for (var p of policies) {
        if (p.pet_id == this.policy.pet_id) {
          this.policy = p;
        }
      }
    });
  }

  newClaim() {
    if (this.policy.pet_joined_family_date == null) {
      this.navCtrl.push(ClaimBirthdayPage, {policy:this.policy, prev_page_name:'Policy'});
    }
    else {
      this.navCtrl.push(ClaimPhotoPage, {policy:this.policy, prev_page_name:'Policy'});
    }
  }
}
