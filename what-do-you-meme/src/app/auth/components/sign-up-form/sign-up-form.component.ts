import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  
  signUpForm!: FormGroup;

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        'login': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'password': new FormControl('', [Validators.required]),
        'confirmPassword': new FormControl('', [Validators.required]),
      }
    )
  }

  onSubmit() {
    console.log(this.signUpForm.value);
  }

  get isPasswordEqual(): boolean {
    return this.signUpForm.value.password === this.signUpForm.value.confirmPassword;
  }

  get isFormValid(): boolean {
    return this.signUpForm.valid && this.signUpForm.dirty;
  }
}
