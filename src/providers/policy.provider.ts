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
        return this.hpApi.getPolicies(credentials.email, credentials.password).retry(1);
      }
    )
    .map(this.mapPolicys);
  }

  public updatePolicyDatePetJoined(
    policy_id:string,
    date_pet_joined_family:string
  ): Observable<boolean> {

    return this.session.getStoredCredentials()
    .flatMap(
      (credentials) => {
        return this.hpApi.updatePolicyDatePetJoined(credentials.email, credentials.password, policy_id, date_pet_joined_family);
      }
    )
    .map(mapSuccess);
  }

  private mapPolicys(response: Response): Policy[] {
    let items = response.json().Items;
    if (items) {
      return items.map(
        (item) => {

          let policy = <Policy>({
            policy_number: item.PetPolicyNo,
            start_date: item.EnrollmentStartDate,
            reimbursement: item.Reimbursement,
            deductible: item.Deductible,
            remaining_deductible: item.CurrentYearRemainingDeductible,
            premium: item.MonthlyPremium,
            pet_id: item.PetID,
            pet_name: item.Name,
            pet_image: item.PetImageURL,
            pet_type: item.Type,
            pet_joined_family_date: item.DateJoinedFamily,
            status:item.Status,
            allow_claim:item.AllowClaim,
            missing_medical_records:item.PetMissingMedicalRecords,
          });

          return policy;
        }
      );
    }

    return [];
  }
}

function mapSuccess(response: Response): boolean {
  let errorCode = response.json().ErrorCode;
  return errorCode == 0;
}
