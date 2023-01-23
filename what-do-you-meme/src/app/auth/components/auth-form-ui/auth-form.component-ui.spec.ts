import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormComponentUi } from './auth-form.component-ui';

describe('AuthFormComponent', () => {
  let component: AuthFormComponentUi;
  let fixture: ComponentFixture<AuthFormComponentUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthFormComponentUi ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFormComponentUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
