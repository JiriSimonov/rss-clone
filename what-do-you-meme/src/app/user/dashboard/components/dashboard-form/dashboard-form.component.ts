import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit {
  changeLoginForm!: FormGroup;
  changePasswordForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.changeLoginForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
}
