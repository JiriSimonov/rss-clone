import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePreparePhaseComponent } from './game-prepare-phase.component';

describe('GamePreparePhaseComponent', () => {
  let component: GamePreparePhaseComponent;
  let fixture: ComponentFixture<GamePreparePhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamePreparePhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePreparePhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
