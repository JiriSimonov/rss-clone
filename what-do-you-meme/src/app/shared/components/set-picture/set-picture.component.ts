import { UserAvatarService } from '../../services/user-avatar.service';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../storage/services/config/config.service';

@Component({
  selector: 'app-set-picture',
  templateUrl: './set-picture.component.html',
  styleUrls: ['./set-picture.component.scss'],
})
export class SetPictureComponent implements OnInit {
  public userAvatar: string = '';

  constructor(
    private userAvatarService: UserAvatarService
  ) {}

  ngOnInit(): void {
    this.randomizeAvatar()
  }

  randomizeAvatar() {
    console.log(this.userAvatarService.images);
    
    // this.avatarPath = `${this.path}/${randomize(0, this.avatarsLength)}`;
    // this.userAvatarService.setAvatarPath(this.avatarPath);
    // this.userAvatarService.getRandomAvatar().subscribe((avatar) => {
    //   console.log(avatar); 
    // })
  }
}
