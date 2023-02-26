import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameChooseSituationPhaseComponent } from './game-choose-situation-phase.component';

describe('GameChooseSituationPhaseComponent', () => {
  let component: GameChooseSituationPhaseComponent;
  let fixture: ComponentFixture<GameChooseSituationPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameChooseSituationPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameChooseSituationPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
