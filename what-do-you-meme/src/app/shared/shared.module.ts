import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterLink } from '@angular/router';
import { UserProfileComponent } from './layout/header/components/user-profile/user-profile.component';
import { NavigationComponent } from './layout/header/components/navigation/navigation.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    NavigationComponent,
  ],
  imports: [CommonModule, RouterLink],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
