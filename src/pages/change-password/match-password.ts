import { AbstractControl } from '@angular/forms';

export const matchPassword = (control: AbstractControl): {[key: string]: boolean} => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  let numCheck = newPassword.value.match(/\d/g);
  let letterCheck = newPassword.value.match(/[a-zA-Z]/g);
  let pwordValid = (numCheck && letterCheck) ? true : false;

  if (!newPassword || !confirmPassword) return null;
  return (newPassword.value === confirmPassword.value) && pwordValid ? null : { nomatch: true };
};
