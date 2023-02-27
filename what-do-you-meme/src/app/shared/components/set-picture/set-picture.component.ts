import { AvatarService } from '../../services/avatar/avatar.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-set-picture',
  templateUrl: './set-picture.component.html',
  styleUrls: ['./set-picture.component.scss'],
})
export class SetPictureComponent {
  public avatar$ = this.avatarService.avatar$;
  constructor(private avatarService: AvatarService) {}

  changeAvatar() {
    this.avatarService.getRandomAvatar();
  }
}
