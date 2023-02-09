import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyJoinModalComponent } from './lobby-join-modal.component';

describe('LobbyJoinModalComponent', () => {
  let component: LobbyJoinModalComponent;
  let fixture: ComponentFixture<LobbyJoinModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyJoinModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbyJoinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
