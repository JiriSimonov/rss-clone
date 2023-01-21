import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbiesPageComponent } from './lobbies-page.component';

describe('LobbiesPageComponent', () => {
  let component: LobbiesPageComponent;
  let fixture: ComponentFixture<LobbiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbiesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
