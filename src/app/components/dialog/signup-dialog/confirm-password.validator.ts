import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
  } from '@angular/forms';
  
  export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    // return control.value.password === control.value.repassword ? null : { PasswordNoMatch: true };
    if(control.value.password === control.value.repassword){
        console.log("igual")
        return null
    } else {
        console.log("diferente");
        return { PasswordNoMatch: true }
    }
  };