import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbySearchComponent } from './lobby-search.component';

describe('LobbySearchComponent', () => {
  let component: LobbySearchComponent;
  let fixture: ComponentFixture<LobbySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
