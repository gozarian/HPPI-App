import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { Account } from '../models/account';
import { HpApi } from './hp-api';

@Injectable()
export class Session {
  account = null;

  constructor(private storage: Storage, private api: HpApi) {

  }

  public new(email: string, password: string): Observable<Account> {
    let login = this.api.login(email, password);

    login.subscribe((account: Account) => {
      this.account = account;
      this.setStoredCredentials(email, password);
    },
    error => {
      this.clearStoredCredentials();
    });

    return login;
  }

  private setStoredCredentials(email: string, password: string) {
    return true;
  }

  private clearStoredCredentials() {
    console.log('clearing stored credentials');
  }

  // private getStoredCredentials() {
  //   return this.storage.get('credentials');
  // }

}
