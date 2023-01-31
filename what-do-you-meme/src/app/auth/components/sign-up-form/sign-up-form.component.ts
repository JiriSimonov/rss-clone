import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { UserData } from './../../models/user-data.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
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

  get userData(): UserData {
    return {
      login: this.signUpForm.value.login,
      password: this.signUpForm.value.password,
    };
  }

  onSubmit() {
    this.authService.signUp(this.userData).pipe(catchError((error) => error)).subscribe(() => {
      this.router.navigate(['lobbies'], {replaceUrl: true});
      console.log('pepe');
    });
  }

  get isPasswordEqual(): boolean {
    console.log('pepe');
    
    return (
      this.signUpForm.value.password === this.signUpForm.value.confirmPassword
    );
  }

  get isFormValid(): boolean {
    return this.signUpForm.valid && this.signUpForm.dirty;
  }
}
