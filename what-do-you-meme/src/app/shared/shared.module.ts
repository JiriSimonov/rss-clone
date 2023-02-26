import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {UserProfileComponent} from './layout/header/components/user-profile/user-profile.component';
import {NavigationComponent} from './layout/header/components/navigation/navigation.component';
import {SetPictureComponent} from './components/set-picture/set-picture.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ImageDirective} from "./directives/image.directive";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    NavigationComponent,
    SetPictureComponent,
    NotFoundComponent,
    ImageDirective
  ],
  imports: [CommonModule, RouterLink, RouterLinkActive],
  exports: [HeaderComponent, FooterComponent, SetPictureComponent, NotFoundComponent, ImageDirective],
})
export class SharedModule {
}
