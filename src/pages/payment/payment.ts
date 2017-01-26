import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account.provider';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
  providers: [AccountProvider]
})
export class PaymentPage implements OnInit {

  loading;
  paymentForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private fb: FormBuilder,
    private accountProvider:AccountProvider
  ) {
    viewCtrl.willEnter.subscribe(() => {
      this.getAccount();
      this.viewCtrl.setBackButtonText('Cancel');
    })
  }

  ngOnInit() {
    this.paymentForm = this.fb.group({
      cc_num: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(20)]],
      cc_month: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cc_year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      cc_cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      billing_name: ['', [Validators.required]],
      billing_street: ['', [Validators.required]],
      billing_city: ['', [Validators.required]],
      billing_state: ['', [Validators.required, Validators.maxLength(2)]],
      billing_postal_code: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.savePaymentInfo();
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

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      cssClass: 'hp-toasts',
      showCloseButton: true,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  getAccount(): void {
    this.presentLoading();
    this.accountProvider.getAccountInfo().subscribe(
      (account) => {
        let contact = account.primary_contact;
        this.paymentForm.get('billing_name').setValue(contact.first_name + " " + contact.last_name);

        let address = account.billing_address;
        this.paymentForm.get('billing_street').setValue(address.street);
        this.paymentForm.get('billing_city').setValue(address.city);
        this.paymentForm.get('billing_state').setValue(address.state_province);
        this.paymentForm.get('billing_postal_code').setValue(address.postal_code);
        this.closeLoading();
      }
    )
  }

  savePaymentInfo() {
    this.presentLoading();

    this.accountProvider.updatePaymentInfo(
      this.paymentForm.value.cc_num,
      this.paymentForm.value.cc_month,
      this.paymentForm.value.cc_year,
      this.paymentForm.value.cc_cvv,
      this.paymentForm.value.billing_name,
      this.paymentForm.value.billing_street,
      this.paymentForm.value.billing_city,
      this.paymentForm.value.billing_state,
      this.paymentForm.value.billing_postal_code
    )
    .subscribe(
      (success) => {
        if (success) {
          this.navCtrl.pop();
          this.closeLoading();
          this.presentToast('Thank you for updating your payment information.')
        }
        else {
          this.closeLoading();
          this.presentToast('We are sorry there was a problem completing your request. Please try again.');
          // TODO: Handle Error
        }
      }
    );
  }
}
