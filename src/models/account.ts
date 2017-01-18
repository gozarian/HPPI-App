import { Address } from './address';
import { Contact } from './contact';

export interface Account {
  account_id: string;
  status: string;
  account_no: string;
  monthly_premium: string;
  billing_day: number;
  past_due_ammount: string;
  payment_method: string;
  credit_card_last4: string;
  password_reset: boolean;
  billing_address: Address;
  primary_contact: Contact;
  secondary_contact: Contact;
}
