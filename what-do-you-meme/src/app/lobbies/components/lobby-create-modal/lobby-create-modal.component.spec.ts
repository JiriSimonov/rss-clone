import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyCreateModalComponent } from './lobby-create-modal.component';

describe('LobbyCreateModalComponent', () => {
  let component: LobbyCreateModalComponent;
  let fixture: ComponentFixture<LobbyCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LobbyCreateModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LobbyCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
