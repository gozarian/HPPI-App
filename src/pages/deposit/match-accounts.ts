import { AbstractControl } from '@angular/forms';

export const matchAccounts = (control: AbstractControl): {[key: string]: boolean} => {
  const accountNumber = control.get('accountNumber');
  const confirmAccountNumber = control.get('confirmAccountNumber');

  if (!accountNumber || !confirmAccountNumber) return null;
  return accountNumber.value === confirmAccountNumber.value ? null : { nomatch: true };
};
