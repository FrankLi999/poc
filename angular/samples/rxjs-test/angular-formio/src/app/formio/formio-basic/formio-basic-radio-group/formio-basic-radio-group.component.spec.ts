import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioBasicRadioGroupComponent } from './formio-basic-radio-group.component';

describe('FormioRadioGroupBasicComponent', () => {
  let component: FormioBasicRadioGroupComponent;
  let fixture: ComponentFixture<FormioBasicRadioGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioBasicRadioGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioBasicRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
