import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { HpApi } from './hp-api';
import { Session } from './session';
import { Claim } from '../models/claim';

@Injectable()
export class ClaimProvider {

  constructor(
    private hpApi: HpApi,
    private session: Session
  ) {}

  public getClaims(): Observable<Claim[]> {

    return this.session.getStoredCredentials()
    .flatMap(
      (credentials) => {
        return this.hpApi.getClaims(credentials.email, credentials.password);
      }
    )
    .map(this.mapClaims);
  }

  private mapClaims(response: Response): Claim[] {
    let items = response.json().Items;
    return items.map(
      (item) => {

        let claim = <Claim>({
          id:item.id,
        });

        return claim;
      }
    );
  }
}
