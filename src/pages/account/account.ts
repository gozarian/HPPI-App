import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { PersonalInfoPage } from '../personal-info/personal-info';
import { BillingPage } from '../billing/billing';
import { PaymentPage } from '../payment/payment';
import { ReimbursementPage } from '../reimbursement/reimbursement';
import { ChangePasswordPage } from '../change-password/change-password';
import { PolicyPage } from '../policy/policy';
import { FAQPage } from '../faq/faq';
import { ContactPage } from '../contact/contact';
import { SignInPage } from '../sign-in/sign-in';

import { Session } from '../../providers/session';
import { AccountProvider } from '../../providers/account.provider';
import { PolicyProvider } from '../../providers/policy.provider';

import { Policy } from '../../models/policy';
import { Account } from '../../models/account';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  providers: [AccountProvider, PolicyProvider]
})
export class AccountPage {

  loading;

  account: Account;
  policies: Policy[];
  alert:string = '';

  errorMessage = '';
  display_name:string;
  display_email:string;
  display_address:string;

  billing_information_index = 1;
  information = [
    { title: 'Personal Info',
      component: PersonalInfoPage
    },
    { title: 'Policy and Billing Info',
      component: BillingPage,
      notification: this.alert ? true : false
    },
    { title: 'Edit Payment Method',
      component: PaymentPage
    },
    { title: 'Edit Reimbursement Info',
      component: ReimbursementPage
    },
    { title: 'Change Password',
      component: ChangePasswordPage
    }
  ];

  support = [
    { title: 'Help & FAQ\s',
      component: FAQPage
    },
    { title: 'Contact Healthy Paws',
      component: ContactPage
    }
  ];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private accountProvider: AccountProvider,
    private policyProvider: PolicyProvider,
    private session: Session
  ) {
    viewCtrl.willEnter.subscribe(() => {
      this.loadData();
    });
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });
    this.loading.present();
  }

  closeLoading() {
    if (this.loading == 'undefined') { return; };
    this.loading.dismiss();
  }

  loadData(): void {
    this.presentLoading();
    Observable.combineLatest(
      this.accountProvider.getAccountInfo().retry(1),
      this.policyProvider.getPolicies().retry(1),
      this.accountProvider.getAlerts().retry(1)
    )
    .finally(
      () => {
        this.closeLoading();
      }
    )
    .subscribe(
      (values) => {
        this.account = values[0];
        this.policies = values[1];
        let alerts = values[2];

        if (alerts.length > 0) {
          this.alert = alerts[0];
        }

        let contact = this.account.primary_contact;
        this.display_name = contact.first_name + " " + contact.last_name;
        this.display_email = contact.email;

        let address = this.account.billing_address;
        this.display_address = address.street + "  " + address.city + ", " + address.state_province + " " + address.postal_code;
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }

  openPolicy(policy) {
    this.navCtrl.push(PolicyPage, {policy:policy});
  }

  itemSelected(item) {
    this.navCtrl.push(item.component);
  }

  logout() {
    this.session.destroy();
    this.navCtrl.setRoot(SignInPage);
  }
}
