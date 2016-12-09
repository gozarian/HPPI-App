import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonalInfoPage } from '../personal-info/personal-info';
import { BillingPage } from '../billing/billing';
import { PaymentPage } from '../payment/payment';
import { ChangePasswordPage } from '../change-password/change-password';
import { PolicyPage } from '../policy/policy';
import { FAQPage } from '../faq/faq';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  information = [
    { title: 'Personal Info',
      component: PersonalInfoPage,
      notification: false
    },
    { title: 'Policy and Billing Info',
      component: BillingPage,
      notification: true
    },
    { title: 'Edit Payment Method',
      component: PaymentPage,
      notification: false
    },
    { title: 'Change Password',
      component: ChangePasswordPage,
      notification: false
    }
  ];

  policies = [
    { title: 'Jackson\'s Policy',
      component: PolicyPage,
      notification: false
    },
    { title: 'Vincent\'s Policy',
      component: PolicyPage,
      notification: false
    }
  ];

  support = [
    { title: 'Help & FAQ\s',
      component: FAQPage,
      notification: false
    },
    { title: 'Contact Healthy Paws',
      component: ContactPage,
      notification: false
    }
  ];

  constructor(public navCtrl: NavController) {

  }

  itemSelected(item) {
    this.navCtrl.setRoot(item.component);
  }
}
