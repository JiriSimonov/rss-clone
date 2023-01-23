import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth-form-ui',
  templateUrl: './auth-form.component-ui.html',
  styleUrls: ['./auth-form.component-ui.scss']
})
export class AuthFormComponentUi implements OnInit{

  @Input() formError = '';
  @Output() login = new EventEmitter();
  authForm = new FormGroup(
    {
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required]),
    }
  )

  constructor() { }

  ngOnInit(): void {
    this.authForm  = new FormGroup(
      {
        'login': new FormControl('', Validators.required),
        'password': new FormControl('', [Validators.required]),
      }
    )
  }

  onFormChange() {
    this.formError = '';
  }

  onSubmit() {
    this.login.emit(this.authForm.value);
    console.log('ui',  this.authForm.value)
  }
}
