import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameJoinedUsersComponent } from './game-joined-users.component';

describe('GameJoinedUsersComponent', () => {
  let component: GameJoinedUsersComponent;
  let fixture: ComponentFixture<GameJoinedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameJoinedUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameJoinedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
