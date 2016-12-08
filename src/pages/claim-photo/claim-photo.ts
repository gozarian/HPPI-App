import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
// import { Camera } from 'ionic-native';

@Component({
  selector: 'page-claim-photo',
  templateUrl: 'claim-photo.html'
})
export class ClaimPhotoPage {

  testdocs1 = [
    { path: 'assets/test-imgs/test-doc.png'
    },
    { path: 'assets/test-imgs/test-doc.png'
    }
  ]

  testdocs2 = [
    { path: 'assets/test-imgs/test-doc.png'
    },
    { path: 'assets/test-imgs/test-doc.png'
    },
    { path: 'assets/test-imgs/test-doc.png'
    },
    { path: 'assets/test-imgs/test-doc.png'
    },
    { path: 'assets/test-imgs/test-doc.png'
    }
  ]

  chosenPet = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.chosenPet = {
      name: navParams.get('name'),
      img: navParams.get('img')
    }
  }
}
