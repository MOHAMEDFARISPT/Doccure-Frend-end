import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);
  
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
  
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return null;
      }
  
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
  
      return null;
    };
  }
  


  export function noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { whitespace: true };
    };
  }

  export function DateOfBirthValidatorforUser(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
      const dateValue = control.value;
      if (!dateValue) {
      
        return null; 
      }
    
  
      const selectedDate = new Date(dateValue);
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
  
      if (selectedDate > today) {
        return { futureDate: true }; 
      }
  
      return null;
    };
  }

  // Custom validator for password strength
export function passwordStrengthValidator(control: { value: any; }) {
  const password = control.value;
  if (!password) return null;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLengthValid = password.length >= 8;

  return {
    hasUpperCase: !hasUpperCase,
    hasLowerCase: !hasLowerCase,
    hasNumber: !hasNumber,
    hasSpecialChar: !hasSpecialChar,
    isLengthValid: !isLengthValid,
  };
}


  