import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../../auth/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  public readonly DEFAULT_USERNAME = 'RAK';
  userName: string | undefined = this.DEFAULT_USERNAME;

  constructor(private httpService: AuthService) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.subs.add(
      this.httpService.user$.subscribe(
        (data) => (this.userName = data?.username ?? this.DEFAULT_USERNAME)
      )
    );
  }

  signOut() {
    //посылать запрос на выход и редиректить
  }

  get isNotDefaultUsername() {
    return this.DEFAULT_USERNAME !== this.userName;
  }
}
