import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameVotingPhaseComponent } from './game-voting-phase.component';

describe('GameVotingPhaseComponent', () => {
  let component: GameVotingPhaseComponent;
  let fixture: ComponentFixture<GameVotingPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameVotingPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameVotingPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
