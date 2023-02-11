import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPictureComponent } from './set-picture.component';

describe('SetPictureComponent', () => {
  let component: SetPictureComponent;
  let fixture: ComponentFixture<SetPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPictureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
