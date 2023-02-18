import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameVotingResultsPhaseComponent } from './game-voting-results-phase.component';

describe('GameVotingResultsPhaseComponent', () => {
  let component: GameVotingResultsPhaseComponent;
  let fixture: ComponentFixture<GameVotingResultsPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameVotingResultsPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameVotingResultsPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
