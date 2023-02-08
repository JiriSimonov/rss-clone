import { UserAvatarService } from '../../../auth/services/user-avatar.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { randomize } from 'src/app/utils/randomize';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-set-picture',
  templateUrl: './set-picture.component.html',
  styleUrls: ['./set-picture.component.scss'],
})
export class SetPictureComponent implements OnInit {
  readonly path = 'https://wdym-js-er-sd.onrender.com/file/images/avatars';
  private avatarsLength = 4;
  private avatarNumber = 1;
  avatarPath: string = `${this.path}/${this.avatarNumber}`;

  constructor(
    private authService: AuthService,
    private userAvatarService: UserAvatarService
  ) {
    this.getAvatarsArr();
  }

  ngOnInit(): void {}

  randomizeAvatar() {
    this.avatarPath = `${this.path}/${randomize(0, this.avatarsLength)}`;
    this.userAvatarService.setAvatarPath(this.avatarPath);
  }

  getAvatarsArr() {
    return this.authService.getAvatars().subscribe((data) => {
      this.avatarsLength = Object.keys(data).length;
      return EMPTY;
    });
  }
}
