import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FAQContentPage } from './faq-content';

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html'
})
export class FAQPage {

  shownFaq: string;

  faqs = [
    {
      title: "What is covered",
      content: "<div class='faqAnswer' style='display: block;'><p>We cover the treatment of any new illness, injury or accident after your enrollment and waiting periods. Our plan also covers hereditary and congenital conditions. With unlimited lifetime benefits and no annual or per incident limits, we're ready to cover most anything unexpected that happens to your pet.</p><p>And our plan is customizable, with a choice of reimbursement level and deductible, so you can createa plan that's right for your budget and needs.<a href=''>Get your no-obligation pet insurance quote here.</a></p><p>If it's an accident or illness (and not a pre-existing condition), our plan covers the treatment. It'sthat simple. Use any licensed veterinarian, including emergency animal hospitals and specialists.This includes:</p><ul><li>Diagnostic testing such as x-rays and blood tests</li><li>Hospitalization, including any treatments while in the hospital</li><li>Surgeries</li><li>Prescription medications</li></ul></div>"
    },
    {
      title: "Do you cover Hip Dysplasia?",
      content: "<p>Text here...</p>"
    },
    {
      title: "What is not covered",
      content: "<p>Text here...</p>"
    },
    {
      title: "Why don't you cover the office visit (veterinary exam fee)?",
      content: "<p>Text here...</p>"
    },
    {
      title: "Is there a waiting period?",
      content: "<p>Text here...</p>"
    },
    {
      title: "How does the Annual Deductible work?",
      content: "<p>Text here...</p>"
    },
    {
      title: "Will my premiums increase over the life of my pet?",
      content: "<p>Text here...</p>"
    }
  ];

  constructor(public navCtrl: NavController) {

  }

  openFaq(faq) {
    this.navCtrl.push(FAQContentPage, faq);
  }
}
