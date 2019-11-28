import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';


export function match(matchControl: FormControl): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return matchControl.value === control.value ? null : {'notMatch': true};
  };
}
