import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthPageComponent } from './user-auth-page.component';

describe('UserAuthPageComponent', () => {
  let component: UserAuthPageComponent;
  let fixture: ComponentFixture<UserAuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAuthPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
