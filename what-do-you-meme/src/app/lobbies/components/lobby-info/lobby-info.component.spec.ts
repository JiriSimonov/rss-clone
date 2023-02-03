import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyInfoComponent } from './lobby-info.component';

describe('LobbyInfoComponent', () => {
  let component: LobbyInfoComponent;
  let fixture: ComponentFixture<LobbyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
