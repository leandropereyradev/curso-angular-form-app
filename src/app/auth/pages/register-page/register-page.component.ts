import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/service/email.validator.service';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.firstNameAndLastnamePattern),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidatorService],
      ],
      username: [
        '',
        [Validators.required, this.validatorService.cantBeStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required]],
    },
    // Estos validadores pasan por TODO el formulario
    {
      validators: [
        this.validatorService.passwordCompare('password', 'passwordConfirm'),
      ],
    }
  );

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailValidatorService: EmailValidatorService
  ) {}

  isValidField(field: string) {
    return this.validatorService.isValidField(this.myForm, field);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();

      return;
    }

    console.log(this.myForm.value);
  }
}
