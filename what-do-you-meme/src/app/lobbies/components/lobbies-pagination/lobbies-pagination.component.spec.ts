import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbiesPaginationComponent } from './lobbies-pagination.component';

describe('LobbiesPaginationComponent', () => {
  let component: LobbiesPaginationComponent;
  let fixture: ComponentFixture<LobbiesPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbiesPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbiesPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
