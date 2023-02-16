import { AvatarService } from '../../services/user-avatar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-picture',
  templateUrl: './set-picture.component.html',
  styleUrls: ['./set-picture.component.scss'],
})
export class SetPictureComponent implements OnInit {
  avatar!: string;
  currentAvatar = this.avatarService.avatar$.subscribe((avatar) => {
    this.avatar = avatar;
  });
  constructor(private avatarService: AvatarService) {}

  ngOnInit(): void {}

  changeAvatar() {
    this.avatarService.getRandomAvatar();
  }
}
