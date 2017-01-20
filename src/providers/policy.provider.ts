import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { HpApi } from './hp-api';
import { Session } from './session';
import { Policy } from '../models/policy';

@Injectable()
export class PolicyProvider {

  constructor(
    private hpApi: HpApi,
    private session: Session
  ) {}

  public getPolicies(): Observable<Policy[]> {

    return this.session.getStoredCredentials()
    .flatMap(
      (credentials) => {
        return this.hpApi.getPolicies(credentials.email, credentials.password);
      }
    )
    .map(this.mapPolicys);
  }

  private mapPolicys(response: Response): Policy[] {
    let items = response.json().Items;
    return items.map(
      (item) => {

        let policy = <Policy>({
          policyNumber: item.PetPolicyNo,
          startDate: item.EnrollmentStartDate,
          reimbursement: item.Reimbursement,
          deductible: item.Deductible,
          premium: item.MonthlyPremium,
          petId: item.PetID,
          petName: item.Name,
          petImage: item.PetImageURL,
          petType: item.Type,
          petDate: item.DateJoinedFamily,
        });

        return policy;
      }
    );
  }
}
