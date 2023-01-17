import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbiesComponent } from './lobbies.component';

describe('LobbiesComponent', () => {
  let component: LobbiesComponent;
  let fixture: ComponentFixture<LobbiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
