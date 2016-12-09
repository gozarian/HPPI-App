import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-personal-info',
  templateUrl: 'personal-info.html'
})
export class PersonalInfoPage {

  user = {
    name: 'Brian Jorgensen',
    phone: '454-678-0677',
    email: 'brian.jorgensen@live.com',
    streetAddress: '6806 Westminister Ave NE',
    aptUnit: '',
    city: 'Elensburg',
    state: 'WA',
    zip: '98117'
  }

  constructor(public navCtrl: NavController) {

  }

}
