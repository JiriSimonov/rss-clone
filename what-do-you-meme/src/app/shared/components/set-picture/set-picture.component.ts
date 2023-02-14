import { BehaviorSubject } from 'rxjs';
import { AvatarService } from '../../services/user-avatar.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfigService } from '../../storage/services/config/config.service';

@Component({
  selector: 'app-set-picture',
  templateUrl: './set-picture.component.html',
  styleUrls: ['./set-picture.component.scss'],
})
export class SetPictureComponent implements OnInit {
  avatar = '';
  constructor(private avatarService: AvatarService) {}

  ngOnInit(): void {
    this.avatarService.avatar$.subscribe((avatar) => {
      this.avatar = avatar;
    });
  }

  changeAvatar() {
    this.avatarService.getRandomAvatar();
  }
}
