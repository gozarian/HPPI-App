export interface Claim {
  id: string;
  account_id:string;
  status:string;
  date_of_incident:string;
  date_of_service:string;
  last_updated:string;
  pet_id:string;
  eob_url:string;
  claim_number:string;
  primary_treatment:string;
  vet_hostpital:string;
  invoice_number:string;
  invoice_amount:string;
  amount_covered:string;
  total_reimbursement:string;
  missing_medical_records:boolean;
  missing_claim_data:[string];
  received_claim_data:[string];
  date_submitted:string;
}
