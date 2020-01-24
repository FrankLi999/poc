import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioBasicInputComponent } from './formio-basic-input.component';

describe('FormioInputBasicComponent', () => {
  let component: FormioBasicInputComponent;
  let fixture: ComponentFixture<FormioBasicInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioBasicInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioBasicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
