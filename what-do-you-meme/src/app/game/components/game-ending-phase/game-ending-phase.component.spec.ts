import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEndingPhaseComponent } from './game-ending-phase.component';

describe('GameEndingPhaseComponent', () => {
  let component: GameEndingPhaseComponent;
  let fixture: ComponentFixture<GameEndingPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameEndingPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameEndingPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
