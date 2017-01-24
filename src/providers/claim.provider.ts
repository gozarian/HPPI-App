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
    if (items) {
      return items.map(
        (item) => {

          let claim = <Claim>({
            id:item.ClaimID,
            account_id:item.AccountID,
            status:item.Status,
            date_of_incident:item.DateOfIncident,
            date_of_service:item.DateOfService,
            last_updated:item.LastUpdated,
            pet_id:item.PetID,
            eob_url:item.EOBURL,
            claim_number:item.ClaimNumber,
            primary_treatment:item.PrimaryTreatment,
            vet_hostpital:item.VetHospital,
            invoice_amount:item.InvoiceAmount,
            invoice_number:item.InvoiceNumber,
            amount_covered:item.AmountCovered,
            total_reimbursement:item.TotalReimbursement,
            missing_medical_records:item.MissingMedicalRecords,
            missing_claim_data:item.MissingClaimData,
            received_claim_data:item.ReceivedClaimData,
            date_submitted:item.DateSubmitted,
          });

          return claim;
        }
      );
    }
    return [];
  }
}
